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
        div1.appendChild(kbd1)
    }
    mainWrapper.appendChild(div1)
}

/*监听用户按下按键然后打开对应的网站*/
document.onkeypress = function (kbdPress) {
    key = kbdPress.key
    website = 'http://' + hash[key]
    window.open(website, '_blank')
}