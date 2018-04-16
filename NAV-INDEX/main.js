/*初始化数据*/
var HASH = init()
var keys = HASH.key
var hash = HASH.hash

/*创建键盘*/
createKeyboard(keys, hash)

/*从浏览器中获取用户之前保存的网站*/
getLocalStorage(hash)

/*监听用户按下按键然后打开对应的网站*/
listenKeyboardPress(hash)


function createKeyboard(keys, hash) {
    for (var i = 0; i < keys.length; i++) {
        var rows = keys[i]  /*模拟键盘的一二三排*/

        div1 = tag('div', {className:'row'})

        for (var j = 0; j < rows.length; j++) {
            /*添加按键字母*/
            kbd1 = tag('kbd', {className: 'kbd1'})
            span1 = tag('span', {className: 'text', textContent: rows[j]})

            /*显示网站图标*/
            var icon = createIcon(hash, rows[j])

            /*添加编辑按键*/
            var editButton = createEditButton(rows[j], hash)

            kbd1.appendChild(span1)
            kbd1.appendChild(icon)
            kbd1.appendChild(editButton)

            div1.appendChild(kbd1)
        }
        mainWrapper.appendChild(div1)
    }
}

function listenKeyboardPress(hash){
    document.onkeypress = function (kbdPress) {
        var key = kbdPress.key.toLowerCase()
        var website
        /*只打开保存了的网站*/
        if(website = hash[key])
            window.open('http://'+website, '_blank')
    }
}

function getLocalStorage(hash) {
    /*null解决当浏览器没有数据时的bug*/
    var hashGeiInLocal = localStorage.getItem('userEdit' || 'null')
    if(hashGeiInLocal)
        hash = JSON.parse(hashGeiInLocal)
}

function tag(tagName, attribute) {
    var element = document.createElement(tagName)
    for (var key in attribute){
        element[key] = attribute[key]
    }

    return element
}

function createEditButton(id, hash){
    /*添加编辑按键*/
    var editButton = tag('button', {id: id,textContent: '编辑'})

    /*实现编辑功能*/
    editButton.onclick = function (editButtonPress) {
        var key = editButtonPress.target
        var siteInput = prompt('请输入你想保存的网站')
        hash[key.id] = siteInput

        key.previousSibling.src = 'http://' + siteInput + '/favicon.ico'

        /*将用户输入的网站保存的浏览器中*/
        var hashInLocal = JSON.stringify(hash)
        localStorage.setItem('userEdit',hashInLocal)
    }

    return editButton
}

function createIcon(hash, key){
    var icon = tag('img', {className: 'icon'})
    if(hash[key]){
        icon.src = 'http://' + hash[key] + '/favicon.ico'
    }else{
        icon.src = './img/point.png'
    }
    icon.onerror = function(error){
        error.target.src = './img/404.png'
    }

    return icon
}

function init() {

    /*遍历kyes，生成相应数量的kbd标签*/
    var keys = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm',]
    ]

    var hash = {
        q: 'qq.com',
        w: 'zh.wikipedia.org',
        e: 'www.ele.me',
        z: 'zhihu.com',
        g: 'github.com',
        f: 'game.granbluefantasy.jp',
        d: 'www.dilidili.wang',
        b: 'bilibili.com',
        t: 'taobao.com',
        y: 'music.163.com',
    };

    return {
        key: keys,
        hash: hash
    }
}
