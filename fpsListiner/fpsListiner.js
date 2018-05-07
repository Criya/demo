var requestAnimationFrame = function(){
    return (requestAnimationFrame ||
        webkitRequestAnimationFrame||
        function (callback) {
            setTimeout(callback, 1000/60);
        });
}();

//记录上一帧数的时间
var lastFrameTime = Date.now();
//帧数记录器的时间，每秒刷新一次
var lastTime = Date.now();
//1秒内帧数
var frameCount = 0;
var allFrameCount = 0;

function animate(){
    var nowTime = Date.now();
    lastFrameTime = nowTime;
    frameCount++;
    allFrameCount++;
    if(nowTime - lastTime > 1000){
        var fps = Math.round((frameCount * 1000) / (nowTime - lastTime));
        console.log("目前帧数：" + fps);
        lastTime = nowTime;
        //1秒后fps计数器清零
        frameCount = 0;
    }

    requestAnimationFrame(animate);
}

animate();