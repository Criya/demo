/*遍历kyes，生成相应数量的kbd标签*/
var keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm',]
]

var hash = {
    q: 'qq.com'
}

for (var i = 0; i < keys.length; i++) {
    rows = keys[i]
    div1 = document.createElement('div')
    for (var j = 0; j < rows.length; j++) {
        kbd1 = document.createElement('kbd')
        kbd1.textContent = rows[j]
        /*添加编辑按键*/
        butEdit = document.createElement('button')
        butEdit.textContent = '编辑'
        butEdit.id = rows[j]
        kbd1.appendChild(butEdit)
        div1.appendChild(kbd1)
        /*实现编辑功能*/
        butEdit.onclick = function (butEditPress) {
            var key = butEditPress.target
            var siteInput = prompt('请输入你想保存的网站')
            hash[key.id] = siteInput
            console.log(hash)
        }
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