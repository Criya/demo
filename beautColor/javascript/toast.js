function toast(message, time, color) {
    this.message = message
    this.missTime = time || 1000
    this.createToast(message, color)
    this.disToast(this.missTime)
}

toast.prototype.createToast = function (message, color) {
    let tpl = `<div class="toast">${message}</div>"`
    this.$tpl = $(tpl)
    this.$tpl.css('color', color)
    $('body').append(this.$tpl)
}

toast.prototype.disToast = function (missTime) {
    var $tpl = this.$tpl
    $tpl.fadeIn(300, () => {
        setTimeout(() => {
            $tpl.fadeOut(300, () => {
                $tpl.remove()
            })
        }, this.missTime);
    })
}

function Toast(message, time) {
    return new toast(message, time)
}
