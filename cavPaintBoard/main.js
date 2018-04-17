var cav = document.getElementById("cav")


autoSetSize()
var eraserEnable = false
if (cav) {
    //canvas初始化
    ctx = cav.getContext("2d")
    //鼠标是否按下
    var using = false
    var beginPoint = {}

    listenMouse(cav)
    listenAction()
}

//监听鼠标点击移动
function listenMouse(cav) {
    cav.onmousedown = function (omd) {
        using = true
        beginPoint = {x: omd.clientX, y: omd.clientY}
        if (eraserEnable) {

            ctx.clearRect(beginPoint.x - 3, beginPoint.y - 3, 6, 6)
        }
    }

    cav.onmousemove = function (omm) {
        var latestPoint = {x: omm.clientX, y: omm.clientY}
        if (!using) {
            return
        }
        if (eraserEnable) {

            ctx.clearRect(latestPoint.x - 5, latestPoint.y - 5, 10, 10)

        }
        else {
            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.moveTo(beginPoint.x, beginPoint.y)
            ctx.lineTo(latestPoint.x, latestPoint.y)
            ctx.stroke()
            beginPoint = latestPoint

        }



    }
    cav.onmouseleave = function () {
        using = false
    }

    cav.onmouseup = function () {
        using = false
    }
}

//监听左下角橡皮檫和画笔按钮点击
function listenAction() {
    eraser.onclick = function () {
        action.className = "actEra"
        eraserEnable = true
    }

    paint.onclick = function () {
        action.className = "actPaint"
        eraserEnable = false
    }


}

//自动设置画板尺寸
function autoSetSize() {
    resizeBoard()
    window.onresize = function () {
        resizeBoard()
    }
}

function resizeBoard() {
    var cav = document.getElementById("cav")
    cav.width = document.documentElement.clientWidth
    cav.height = document.documentElement.clientHeight
}
