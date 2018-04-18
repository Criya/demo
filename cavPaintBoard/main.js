
var cav = document.getElementById("cav")
autoSetSize()
var eraserEnable = false
if (cav) {
    //canvas初始化
    ctx = cav.getContext("2d")
    //鼠标是否按下
    var using = false
    var beginPoint = {}

    //设备动作监听
    listenUser(cav)

    //画刷和橡皮、颜色的监听
    listenAction()

    var mo=function(e){e.preventDefault();}

    /***禁止滑动***/

    function stop(){
        document.addEventListener("touchmove",mo,false);//禁止页面滑动

    }
    stop()

}


function listenUser(cav) {
    //特性检测

    //触摸屏设备判断
    if ('ontouchstart' in document.body) {
        cav.ontouchstart = function (ots) {
            using = true
            beginPoint = {x: ots.touches[0].clientX, y: ots.touches[0].clientY}
            if (eraserEnable) {
                ctx.clearRect(beginPoint.x - 3, beginPoint.y - 3, 6, 6)
            }
        }

        cav.ontouchmove = function (otm) {
            var latestPoint = {x: otm.touches[0].clientX, y: otm.touches[0].clientY}
            draw(latestPoint)
        }

        cav.ontouchend = function () {
            using = false
        }
    }
    //非触摸屏设备
    else {
        cav.onmousedown = function (omd) {
            using = true
            beginPoint = {x: omd.clientX, y: omd.clientY}
            if (eraserEnable) {
                ctx.clearRect(beginPoint.x - 3, beginPoint.y - 3, 6, 6)
            }
        }

        cav.onmousemove = function (omm) {
            var latestPoint = {x: omm.clientX, y: omm.clientY}
            draw(latestPoint)
        }
        cav.onmouseleave = function () {
            using = false
        }

        cav.onmouseup = function () {
            using = false
        }
    }

}

function listenAction() {
    //默认颜色
    ctx.strokeStyle = "red"

    //画刷和橡皮点击监听
    brush.onclick = function () {
        eraserEnable = false
        //激活画刷，取消橡皮
        brush.classList.add("active")
        eraser.classList.remove("active")

        //点击画刷后恢复颜色选择
        colorBox.classList.remove("disabled")

        //默认颜色为红色
        redButton.classList.add("active")
    }

    eraser.onclick = function () {
        eraserEnable = true
        //激活橡皮，取消画刷
        eraser.classList.add("active")
        brush.classList.remove("active")


        //将颜色激活状态取消
        blueButton.classList.remove("active")
        greenButton.classList.remove("active")
        redButton.classList.remove("active")

        //点击橡皮后静止点击颜色
        colorBox.classList.add("disabled")
    }

    //颜色激活监听
    redButton.onclick = function () {
        redButton.classList.add("active")
        greenButton.classList.remove("active")
        blueButton.classList.remove("active")

        ctx.strokeStyle = "red"
    }

    greenButton.onclick = function () {
        greenButton.classList.add("active")
        redButton.classList.remove("active")
        blueButton.classList.remove("active")

        ctx.strokeStyle = "green"
    }

    blueButton.onclick = function () {
        blueButton.classList.add("active")
        greenButton.classList.remove("active")
        redButton.classList.remove("active")

        ctx.strokeStyle = "blue"
    }

}

//画
function draw(latestPoint) {
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
