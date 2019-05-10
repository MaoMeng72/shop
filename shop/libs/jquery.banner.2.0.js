;(function($){
    "use strict";
    $.fn.extend({
        banner:function(options){

            var bannerObj = {
                index:0,
                iPrev:options.items.length-1
            };

            if(options.list == undefined || options.list == true){
                bannerObj.list = true;
            }else{
                bannerObj.list = false;
            }

            if(options.autoPlay == undefined || options.autoPlay == true){
                bannerObj.autoPlay = true;
            }else{
                bannerObj.autoPlay = false;
            }

            bannerObj.delayTime = options.delayTime || 2000; 
            bannerObj.moveTime = options.moveTime || 200; 

            if(bannerObj.list){
                var $ul = $("<ul>");
                for(var i=0;i<options.items.length;i++){
                    $ul.append($("<li>"+ (i+1) +"</li>"))
                }
                this.append($ul)
                $ul.css({
                    width:"100%",
                    height:30,
                    lineHeight:"30px",
                    display:"flex",
                    justifyContent:"center",
                    position:"absolute",
                    bottom:0,
                    left:0,
                    right:0,
                    padding:0
                }).children("li").css({
                    width:"30px",
                    height:"30px",
                    borderRadius:"50%",
                    textAlign:"center",
                    listStyle:"none",
                    color:"#fff",
                    cursor:"pointer"
                }).eq(bannerObj.index).css({
                    background:"pink"
                })

                $ul.children("li").on("click",function(){
                    if($(this).index() > bannerObj.index){
                        bannerObj.listMove($(this).index(),1)
                    }
                    if($(this).index() < bannerObj.index){
                        bannerObj.listMove($(this).index(),-1)
                    }

                    bannerObj.index = $(this).index();
                    $(this).css({
                        background:"pink"
                    }).siblings().css({
                        background:""
                    })
                })
                bannerObj.listMove = function(iNow,type){
                    options.items.eq(bannerObj.index).css({
                        left:0
                    }).stop().animate({
                        left:-options.items.eq(0).width() * type
                    },bannerObj.moveTime)
                    options.items.eq(iNow).css({
                        left:options.items.eq(0).width() * type
                    }).stop().animate({
                        left:0
                    },bannerObj.moveTime)
                }

                

            }


            function rightClick(){
                if(bannerObj.index == options.items.length-1){
                    bannerObj.index = 0;
                    bannerObj.iPrev = options.items.length-1;
                }else{
                    bannerObj.index++;
                    bannerObj.iPrev = bannerObj.index - 1
                }
                bannerObj.btnMove(1)
            }
            function leftClick(){
                if(bannerObj.index == 0){
                    bannerObj.index = options.items.length-1;
                    bannerObj.iPrev = 0
                }else{
                    bannerObj.index--;
                    bannerObj.iPrev = bannerObj.index + 1;
                }
                bannerObj.btnMove(-1)
            }
            bannerObj.btnMove = function(type){
                options.items.eq(bannerObj.iPrev).css({
                    left:0
                }).stop().animate({
                    left:-options.items.eq(0).width() * type
                },bannerObj.moveTime)
                options.items.eq(bannerObj.index).css({
                    left:options.items.eq(0).width() * type
                }).stop().animate({
                    left:0
                },bannerObj.moveTime)
                
                if(bannerObj.list){
                    $ul.children("li").css({
                        background:""
                    }).eq(bannerObj.index).css({
                        background:"pink"
                    })
                }
            }

            if(options.left != undefined && options.left.length != 0 && options.right != undefined && options.right.length != 0){
                options.left.on("click",leftClick)
                options.right.on("click",rightClick)
            }

            if(bannerObj.autoPlay){
                bannerObj.timer = setInterval(() => {
                    rightClick()
                }, bannerObj.delayTime);
                this.hover(function(){
                    clearInterval(bannerObj.timer)
                },function(){
                    bannerObj.timer = setInterval(() => {
                        rightClick()
                    }, bannerObj.delayTime);
                })
            }
        }
    })

})(jQuery);