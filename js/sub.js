(function ($) {
    'use strict';
    $(function() {
        var $body = $('body');
        // url replace
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        var menuType = getParameterByName('page');
        var comicsDetail = getParameterByName('detail');
        var viewNumber = getParameterByName('view');
        // menu type
        if(!comicsDetail && !viewNumber){
            $.ajax({
                url : './sub/'+menuType+'/subLayout.html',
                async: false,
                success : function (data) {
                    $('#main .contents .contentsWrap').prepend(data);
                },
                error:function(request, status, error){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        }else if(menuType === 'co' && comicsDetail && !viewNumber){
            $.ajax({
                url : './sub/co/details/'+comicsDetail+'.html',
                async: false,
                success : function (data) {
                    $('#main .contents .contentsWrap').prepend(data);
                },
                error:function(request, status, error){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        }else if(menuType === 'co' && comicsDetail && viewNumber){
            $.ajax({
                url : './sub/co/comicsView.html',
                async: false,
                success : function (data) {
                    $('#main .contents .contentsWrap').prepend(data);
                },
                error:function(request, status, error){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
            // comics view link href
            var intNumber = parseInt(viewNumber),
                numberPlus = intNumber + 1,
                numberMinus = intNumber - 1,
                $prevLink = $('.controlButtons .buttonBox.prev .link'),
                $nextLink = $('.controlButtons .buttonBox.next .link'),
                $backLick = $('.bottomButtons .buttonBox .link');
            $prevLink.attr('href','./sub.html?page=co&detail='+comicsDetail+'&view='+numberMinus);
            $nextLink.attr('href','./sub.html?page=co&detail='+comicsDetail+'&view='+numberPlus);
            $backLick.attr('href','./sub.html?page=co&detail='+comicsDetail);
        }
        // view number
        if(menuType === 'co'  && comicsDetail && viewNumber){
            $body.addClass('view');
            $.ajax({
                url : './sub/co/contents/'+comicsDetail+'/'+viewNumber+'.html',
                async: false,
                success : function (data) {
                    $('#main .contents .contentsWrap .comicsView').prepend(data);
                },
                error:function(request, status, error){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        }
        // body class
        $body.addClass(menuType);
        // sub visual text
        if(menuType === 'wo'){
            $('.subVisual .visualWrap .pageTitle').text('world');
        }else if(menuType === 'ch'){
            $('.subVisual .visualWrap .pageTitle').text('character');
        }else if(menuType === 'co'){
            $('.subVisual .visualWrap .pageTitle').text('comics');
        }
        
    });
})(jQuery);