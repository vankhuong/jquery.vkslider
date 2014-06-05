/**
* jquery.vkslider 1.0
*
* Copyright 2012-2014, Van Khuong (www.sothichweb.com)
* Licensed under the MIT
* Released on: June 21, 2012
*
* Tut: http://sothichweb.com/article/slider_don_gian_voi_jQuery/03d05da
* Demo: http://sothichweb.com/Demos/Demo_slider_don_gian_voi_jQuery.html
*
* Git: https://github.com/vankhuong/jquery.vkslider
*/

function slideshow(prev){
    var slides = $('#slideshow li');
    var currElem = slides.filter('.current');
    var lastElem = slides.filter(':last');
    var firstElem = slides.filter(':first');

    var nextElem = (prev)? currElem.prev() : currElem.next();
    if(prev){
        if(firstElem.attr('class') == 'current') nextElem = lastElem;
    }else if(lastElem.attr('class') == 'current')nextElem = firstElem;

    fadeElem(currElem,nextElem);
    widegetStatus(slides);
}

function wideget(index){
    var slides = $('#slideshow li');
    var currElem = slides.filter('.current');
    var nextElem = slides.eq(index);

    fadeElem(currElem,nextElem);
    widegetStatus(slides);
}

function widegetStatus(slides){
    slides.each(function(index){
        if($(this).attr('class') == 'current')
            $('#controlNav a').removeClass('active').eq(index).addClass('active');
    });
}

function fadeElem(currElem,nextElem){
    if(!$.browser.msie){
        currElem.removeClass('current').find('img') .css({'z-index':'50'}) .end() .find('p') .css({'z-index':'50'});
        nextElem.addClass('current').find('img') .css({'opacity': '0','z-index':'100'}) .animate({opacity: 1}, 700, function(){
            currElem.find('img') .css({'z-index': '0'});
        }).end().find('p') .css({'height':'0','z-index':'100','opacity': '0'}).delay(500).animate({height: 60,opacity: 1},500, function(){
            currElem.find('p') .css({'z-index': '0'});
        });
    }else{
        currElem.removeClass('current').find('img') .css({'z-index':'50'}) .end() .find('p') .css({'z-index':'50'});
        nextElem.addClass('current').find('img') .css({'opacity': '0','z-index':'100'}) .animate({opacity: 1}, 700, function(){
            currElem.find('img') .css({'z-index': '0'});
        }).end().find('p') .css({'height':'0','z-index':'100'}).delay(500).animate({height: 60},500, function(){
            currElem.find('p') .css({'z-index': '0'});
        });
    }
}

function vk_slideshow(time){
    var liarr =$('#slideshow ul li');
    if(liarr.length <=1 ) return;
    $('#slideshow li:first-child').addClass('current');
    var idset =setInterval('slideshow()', time);
    var controlNav =$('#controlNav');
    var str='';
    for(var i=0; i<liarr.length; i++){
        str+='<a></a>';
    }
    controlNav.append(str);
    controlNav.children().each(function(index){
        $(this).click(function(){
            wideget(index);clearInterval(idset);
            idset =setInterval('slideshow()', time);
        });
    }).eq(0).addClass('active');

    $('#next').click(function(){
        slideshow(); clearInterval(idset);
        idset =setInterval('slideshow()', time);
    });
    $('#prev').click(function(){
        slideshow(true); clearInterval(idset);
        idset =setInterval('slideshow()', time);
    });
}