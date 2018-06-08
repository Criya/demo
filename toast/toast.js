//require("less/toast.less")
function toast(message, time){
    this.message = message
    this.missTime = time || 1000
    this.createToast(message)
    this.disToast(missTime)
}

toast.prototype.createToast = function (message) {
    let tpl = `<div class="toast">${message}</div>"`
    this.$tpl = $(tpl)
    $('body').append(this.$tpl)  
}

toast.prototype.disToast = function (missTime) {
    var $tpl = this.$tpl
    $tpl.fadeIn(300, ()=>{
        setTimeout(() => {
            $tpl.fadeOut(300, ()=>{
                $tpl.remove()
            })
        }, this.missTime);
    })
}

function Toast(message, time) {
    return new toast(message, time)
}

module.exports.Toast = Toast
