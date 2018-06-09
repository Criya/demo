//reload
let hexFlag = $('input[name=system]:checked').val() === 'hex' ? true : false 
$('input[name=system]').click(function () {
    hexFlag = $(this).val() === 'hex' ? true : false
})
$('.color-item').each(function () {
    //获取十六进制颜色
    let color = $(this).html().split('#')[1];
    //将ID设置为 color-xxxxxx
    let colorId = `color-${color}`;
    let colorSelector = `#${colorId}`
    $(this).attr('id', colorId)
        .attr('data-clipboard-target', colorSelector)
        .css('background-color', '#' + color).click(() => {
            new toast("复制成功", 1000, '#' + color);
            console.log(parseInt(color, 10))
        })

    new ClipboardJS(colorSelector, {
        text: function () {
            if (hexFlag) {
                return '#' + color;
            } else {
                return hex2rgb(color);
            }

        }
    });
})

function hex2rgb(hex) {
    return `rgb(${parseInt(hex.slice(0, 2), 16)},`
        + `${parseInt(hex.slice(2, 4), 16)},`
        + `${parseInt(hex.slice(4, 6), 16)})`
}