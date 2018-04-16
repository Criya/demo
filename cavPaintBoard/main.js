var cav = document.getElementById("cav")

//自动设置画板尺寸
autoSetSize()

if (cav) {
    ctx = cav.getContext("2d")
    var using = false
    var beginPoint = {}
    listenMouse(cav)


}


function autoSetSize(){
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

function listenMouse(cav){
    cav.onmousedown = function (omd) {
        beginPoint = {x:omd.clientX,y:omd.clientY}
        if(eraserEnable){
            using = true
            ctx.clearRect(beginPoint.x-3, beginPoint.y-3, 6, 6)
        }
        else{
            using = true
        }

    }

    cav.onmousemove = function (omm) {
        var latestPoint = {x:omm.clientX,y:omm.clientY}
        if (eraserEnable){
            if(using){
                ctx.clearRect(latestPoint.x-3, latestPoint.y-3, 6, 6)
            }
        }
        else {
            if (using) {
                //

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

    }

    cav.onmouseup = function () {
        using = false
    }
}

var eraserEnable = false
document.getElementById("eraser").onclick = function () {
    eraserEnable = !eraserEnable
}

