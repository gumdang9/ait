(function ($) {
    'use strict';
    $(function() {
        var $window = $(window),
            $html = $('html'),
            $head = $('head'),
            $screen = $.screen;
        
        // header ajax
        $.ajax({
            url : './common/header.html', // 읽어올 파일의 경로 (클라이언트가 요청을 보낼 서버의 URL 주소)
            async : false, // 서버 호출 방식 설정 (true(비동기식), false(동기식))(기본값 true)
            success : function (data) { // 데이터 주고받기 성공했을 경우
                $('#header').prepend(data);
            },
            error : function (request, status, error) {
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        })
        // footer ajax
        $.ajax({
            url : './common/footer.html', // 읽어올 파일의 경로 (클라이언트가 요청을 보낼 서버의 URL 주소)
            async : false, // 서버 호출 방식 설정 (true(비동기식), false(동기식))(기본값 true)
            success : function (data) { // 데이터 주고받기 성공했을 경우
                $('#footer').prepend(data);
            },
            error : function (request, status, error) {
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        })
        
        // start class - S
        setTimeout(function(){
            $html.addClass('start')
        }, 10);
        // start class - E
        
        // tab menu - S
        $('.tabWrap').each(function(){
            var $this = $(this),
                $tabMenu = $this.children('.tabMenu'),
                $tabItem = $tabMenu.find('.tabList .tabItem'),
                $tabActive = $tabMenu.find('.tabList .tabItem.active'),
                $tabBtn = $tabItem.find('button.btn'),
                $tabContents = $this.children('.tabContents'),
                $contentActive = $tabContents.children('.contentItem.active');
            $tabBtn.removeAttr('title');
            $tabActive.find('.btn').attr('title','선택됨');
            if($tabMenu.is('.effectFade') === true){$contentActive.addClass('on');}
            $tabBtn.on('click',function(){
                var $thisBtn = $(this),
                    $thisIndex = $thisBtn.attr('data-number');
                $thisBtn.attr('title','선택됨').parent().addClass('active').siblings().removeClass('active').children('.btn').removeAttr('title');
                if($tabMenu.is('.effectFade') === true){
                    $tabContents.children('.contentItem[data-number="'+$thisIndex+'"]').addClass('active').siblings().removeClass('on');
                    setTimeout(function(){
                        $tabContents.children('.contentItem[data-number="'+$thisIndex+'"]').addClass('on');
                    },1);
                    setTimeout(function(){
                        $tabContents.children('.contentItem[data-number="'+$thisIndex+'"]').siblings().removeClass('active');
                    },300);
                }else{
                    $tabContents.children('.contentItem[data-number="'+$thisIndex+'"]').addClass('active').siblings().removeClass('active');
                }
                $tabContents.children('.contentItem[data-number="'+$thisIndex+'"]').find('.slick-slider').each(function(){$(this).slick('setPosition');});
            });
        });
        // tab menu - E
        
        // wheel event - S
        $window.on('mousewheel',function(e){
            var wheel = e.originalEvent.wheelDelta;
            if(wheel > 0){
                $html.removeClass('wheelDown');
            }else{
                $html.addClass('wheelDown');
            }
        });
        // wheel event - E
        
        // theme - S
        var $themeBox = $('.headerWrap .headerRight .themeBox'),
            egg = 0;
        $themeBox.find('.themeOpen').on('click',function(){
            $themeBox.stop().toggleClass('active');
            egg++;
        });
        $themeBox.find('.themeList .themeItem .btn').on('click',function(){
            var $themeIndex = $(this).parent().index();
            window.name = 'theme'+$themeIndex;
            egg = 0;
            $html.addClass('changeOn');
            $themeBox.removeClass('active');
            setTimeout(function(){
                $html.removeClass('theme0 theme1 theme2 theme3 theme4 theme5').addClass('theme' + $themeIndex);
            }, 1000);
            setTimeout(function(){
                $html.removeClass('changeOn');
            }, 1500);
            // 테마 클릭 시 탭메뉴
            $('.tabWrap').each(function(){
                var $tabItem = $(this).find('.tabMenu .tabList .tabItem'),
                    $tabTheme = $tabItem.filter('.themeInBlock'+$themeIndex || '.themeInBlockAll').first(),
                    $themeNumber = $tabTheme.find('.btn').attr('data-number'),
                    $tabContents = $(this).find('.tabContents');
                setTimeout(function(){
                    $tabItem.removeClass('active');
                    $tabContents.find('.contentItem').removeClass('active on');
                    $tabTheme.addClass('active');
                    $tabContents.find('.contentItem[data-number="'+$themeNumber+'"]').addClass('active on');
                }, 1000);
            });
        });
        $html.removeClass('theme0 theme1 theme2 theme3 theme4 theme5').addClass(window.name);
        // theme - E
        
        // easter egg - S
        $('.headerWrap .headerLeft .logo .link').on('click',function(e){
            if(egg > 9){
                e.preventDefault();
                $html.addClass('themeEgg');
                egg = 0;
            }
        });
        if(window.name !== 'theme4'){
            $('.themeSecurity').remove();
        }
        // easter egg - E
    });
})(jQuery);