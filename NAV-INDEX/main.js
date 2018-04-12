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
/*从浏览器中获取用户之前保存的网站*/
/*null解决当浏览器没有数据时的bug*/
var hashGeiInLocal = localStorage.getItem('userEdit' || 'null')
if(hashGeiInLocal)
    hash = JSON.parse(hashGeiInLocal)

for (var i = 0; i < keys.length; i++) {
    rows = keys[i]  /*模拟键盘的一二三排*/
    div1 = document.createElement('div')
    div1.className = 'row'
    for (var j = 0; j < rows.length; j++) {
        /*添加上的字母*/
        kbd1 = document.createElement('kbd')
        span1 = document.createElement('span')
        span1.className = 'text'
        span1.textContent = rows[j]
        kbd1.className = 'kbd1'
        kbd1.appendChild(span1)

        /*显示网站图标*/
        img1 = document.createElement('img')
        img1.className = 'icon'
        if(hash[rows[j]]){
            img1.src = 'http://' + hash[rows[j]] + '/favicon.ico'
        }else{
            img1.src = './img/point.png'
        }
        img1.onerror = function(error){
            error.target.src = './img/404.png'
        }

        kbd1.appendChild(img1)
        /*添加编辑按键*/
        butEdit = document.createElement('button')
        butEdit.textContent = '编辑'
        butEdit.id = rows[j]
        kbd1.appendChild(butEdit)
        /*实现编辑功能*/
        butEdit.onclick = function (butEditPress) {
            var key = butEditPress.target
            var siteInput = prompt('请输入你想保存的网站')
            hash[key.id] = siteInput

            key.previousSibling.src = 'http://' + siteInput + '/favicon.ico'
            console.log (key.previousSibling)

            /*将用户输入的网站保存的浏览器中*/
            var hashInLocal = JSON.stringify(hash)
            localStorage.setItem('userEdit',hashInLocal)
        }


        div1.appendChild(kbd1)
    }
    mainWrapper.appendChild(div1)
}

/*监听用户按下按键然后打开对应的网站*/
document.onkeypress = function (kbdPress) {
    key = kbdPress.key
    /*只打开保存了的网站*/
    if(website = hash[key])
        window.open('http://'+website, '_blank')
}