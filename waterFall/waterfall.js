/**
 * 瀑布流
 *  使用方式:
 *      const waterfall = require('Waterfall')
 *      waterfall.init(selector)
 */

var Waterfall = (function () {

    function waterfall(s) {

        let $cont = $(s)
        let $items = $($cont.children())
        //瀑布列数
        let colNum = parseInt($(window).width() / $items.outerWidth(true), 10)
        let fallHeightArray = []

        for (let i = 0; i < colNum; i++) {
            fallHeightArray.push(40)
        }

        $items.each(function () {
            $cur = $(this)
            //寻找插入列
            let minHight = Math.min.apply(null, fallHeightArray)
            let minIndex = fallHeightArray.indexOf(minHight)

            //插入
            $cur.css({
                left: minIndex * $cur.outerWidth(true),
                top: fallHeightArray[minIndex]
            })

            fallHeightArray[minIndex] += $cur.outerHeight(true)

        })
    }
    return {
        init: waterfall
    }
})()

module.exports = Waterfall
