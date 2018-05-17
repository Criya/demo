var $images = $(".slideShow img");
var $slideShow = $(".slideShow")
let $firstImg = $images.eq(0).clone(true);
let $lastImg = $images.eq($images.length-1).clone(true);

$slideShow.prepend($lastImg);
$slideShow.append($firstImg);

let timer = setInterval(()=>{
    slideTo(current+1)
}, 3000)

$(".window").on("mouseenter",()=>{
    window.clearInterval(timer);
})
$(".window").on("mouseleave",()=>{
    timer = setInterval(()=>{
        slideTo(current+1)
    }, 3000)
})

var current = 0;
var $buttons = $(".slideShowButton button")

$(".slideShowButton").on("click", "button", (e)=>{
    let index = $(e.currentTarget).index();
    slideTo(index);

})

function slideTo(index) {
    if(index > $images.length-1){
        index = 0;
    }
    //从最后一张到第一张
    if(index === 0 && current === $buttons.length-1){
        $slideShow.css({transform:`translateX(${-500*(current+2)}px)`})
            .one("transitionend", ()=>{
                $slideShow.hide();
                $slideShow.offset();
                $slideShow.css({transform:"translateX(-500px)"}).show()
            });


    }
    //从第一张到最后一张
    else if(index === $buttons.length-1 && current === 0 ){
        $slideShow.css({"transform":`translateX(${0}px)`})
            .one("transitionend", ()=>{
                $slideShow.hide();
                $slideShow.offset();
                $slideShow.css({transform:`translateX(${($images.length) * -500}px)`}).show()
            });

    }
    else{
        $slideShow.css({"transform":`translateX(${-500*(index+1)}px)`});
    }

    current = index;
}