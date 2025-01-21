(function ($) {
    'use strict';
    $(function() {
        // section2 - card slide
        var $cardWrap = $('.card .cardWrap'),
            $cardList = $cardWrap.find('.cardList'),
            $cardItem = $cardList.find('.cardItem'),
            $cardLength = $cardItem.length,
            $cardCount = 0,
            $cardBtn = $cardItem.find('.btn');
        function cardAuto() {
            $cardCount = $cardList.attr('style').replace(/[^0-9]/g,'');
            if($cardCount > $cardLength-1){
                setTimeout(function(){
                    $cardList.addClass('paused').attr('style','--i:0;');
                },2950);
            }
            $cardCount++;
            $cardList.attr('style','--i:'+$cardCount+';');
            $cardList.removeClass('paused');
        }
        var $cardAuto = setInterval(cardAuto,3000);
        $cardBtn.on('click',function(){
            clearInterval($cardAuto);
            $cardCount = $cardList.attr('style').replace(/[^0-9]/g,'');
            var $this = $(this),
                $thisItem = $this.parent(),
                $thisIndex = $thisItem.index(),
                $cardInterval = $cardCount - $thisIndex,
                $cardAbsolute = Math.abs($cardInterval),
                $cardBase = $cardLength - $cardAbsolute,
                $basePlus = $thisIndex + $cardBase,
                $baseMinus = $thisIndex - $cardBase;
            if($cardAbsolute < $cardLength/2){
                $cardList.attr('style','--i:'+$thisIndex+';');
            }else if($cardAbsolute > $cardLength/2 && $cardInterval < 0){
                $cardList.addClass('paused').attr('style','--i:'+$basePlus+';');
                setTimeout(function(){
                    $cardList.removeClass('paused').attr('style','--i:'+$thisIndex+';');
                },5);
            }else if($cardAbsolute > $cardLength/2 && $cardInterval > 0){
                $cardList.addClass('paused').attr('style','--i:'+$baseMinus+';');
                setTimeout(function(){
                    $cardList.removeClass('paused').attr('style','--i:'+$thisIndex+';');
                },5);
            }
            if($cardCount == $thisIndex){
                $thisItem.addClass('active').siblings().removeClass('active');
            }else{
                setTimeout(function(){
                    $thisItem.addClass('active').siblings().removeClass('active');
                },1000);
            }
        });
        $cardWrap.on('focusout mouseleave',function(){
            clearInterval($cardAuto);
            $cardAuto = setInterval(cardAuto,3000);
            $cardItem.removeClass('active');
        });
        // section3 - notice
        $('.notice .noticeWrap .noticeBox .noticeList').slick({
            accessibility: true,
            variableWidth: true,
            slidesToShow: 3,
            speed: 1000,
            arrows: true,
            prevArrow: $('.notice .noticeWrap .noticeBox .buttonWrap .buttonBox.prev .btn'),
            nextArrow: $('.notice .noticeWrap .noticeBox .buttonWrap .buttonBox.next .btn'),
            infinite: true,
        });
        
    });
})(jQuery);