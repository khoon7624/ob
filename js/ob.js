$(function(){
    //스크롤 이벤트 ================================     
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop(); //변하는 값
        var sectionH = $('section').height(); // 컨텐츠의 하나의 높이
        var nowIndex ; //현재 내가 스크롤을 해서 보고있는 영역을 인덱스로 구하기
        
        if(scrollTop > 0){//스크롤을 함
            $('body').addClass('scroll');
        }else{//가장 위쪽에 스크롤이 있는 상태
            $('body').removeClass('scroll');
        }
        for (let index = 0; index < 5; index++) { //5번 반복
            if(scrollTop >= sectionH*index && scrollTop < sectionH*(index+1)){
                nowIndex = index;
            }
        }
        
        $('#quick-nav button').removeClass('active');
        $('#quick-nav button').eq(nowIndex).addClass('active')
    }).scroll();

    //리사이즈 이벤트 ================================
    $(window).resize(function(){
        var windowWidth=$(window).width();
        $('section').off('mousewheel');
        $('.gnb').off('click')
        if(windowWidth>=1100){
            // 마우스 휠 이벤트 ===================================      
            
            $('section').on('mousewheel',function(e, delta){
                var i = $(this).index();
                if(delta > 0){
                    if(i==0){
                        return ;
                    }
                    var prev = $(this).prev().offset().top;
                    $('html,body').stop(true).animate({
                        scrollTop:prev
                    })
                }else if(delta < 0){
                    if(i==7){
                    return ;
                    }      
                    var next = $(this).next().offset().top;
                    $('html,body').stop(true).animate({
                        scrollTop:next
                    })
                }
            })

             // pc버전 메뉴창 펼치기 =====================================
            $('.gnb').on('click',function(e){
                e.preventDefault();
                $('.gnb-bg').slideDown();
                $('.gnb .sub').slideDown();
                $('.util').hide();
                $('.gnb>li>a').css('color','#013b90');
            })
        }
        

        //슬라이드 이미지 변경
        var windowH=$(this).height()-40;
        if(windowH < windowWidth/2){           
            $('.main .swiper-container').addClass('change');
        }else{
            $('.main .swiper-container').removeClass('change');
        }

        //뉴스 슬라이드 재생버튼 위치 
        setTimeout(function(){
            var newsPageWidth=$('.news-room .swiper-pagination').width();
            $('#play-state').css('margin-left',-(newsPageWidth/2+20));
        })
        
    }).resize();
    
    // pc버전 메뉴창 닫기
    $('.top-arrow').on('click',function(){
        $('.gnb-bg, .gnb .sub').slideUp();        
        $('.util').show();
        $('.gnb>li>a').css('color','white');
    })

    // 모바일메뉴버튼 
    var btnFlag=true;
    $('#btn-menu').click(function(){
        $('body').toggleClass('open');
        if(btnFlag){
            btnFlag=false;
            $(this).find('i').text('close')
        }else{
            btnFlag=true;
            $(this).find('i').text('menu');
        }
    })

    // 모바일 gnb - 아코디언 방식
    $('.gnb i').click(function(e){
        e.preventDefault();
        if($(this).parents('li').hasClass('active')){
            $('.gnb > li').removeClass('active');
            $('.gnb .sub').slideUp();
        }else{
            $('.gnb > li').removeClass('active');
            $('.gnb .sub').slideUp();
            $(this).parents('li').addClass('active');
            $(this).parents('li').find('.sub').slideDown();
        }
    })

    // 검색창 pc 버전 
    $('.util button').click(function(){
        $('.search-box').css('display','block')
    })
    $('.search-box .close').click(function(){
        $('.search-box').css('display','none')
    })

    // 슬라이드 ================================
    var mainSwiper=new Swiper('.main .swiper-container',{
        loop:true,
        pagination:{
           el:'.main .swiper-pagination',
           clickable:true,
        },
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.main .swiper-button-next',
            prevEl: '.main .swiper-button-prev',
          }
    });

    // brands 슬라이드 효과 ===================================
    var brandsSwiper=new Swiper('.brands .swiper-container',{
        loop:true,
        slideToClickedSlide:true,
        centeredSlides:true,
        slidesPerView:'auto',
        spaceBetween:50,
        breakpoints:{
            768:{
                slidesPerView:3,
            },
            1200:{
                slidesPerView:5,
            }
        }
    });

    $('.brands a').click(function (e) { 
        e.preventDefault();   
    });

      // history 탭메뉴 효과 =====================================
      $('.tab>ul>li>a').click(function(e){
          e.preventDefault();
          $('.tab>ul>li>a').removeClass('active')
          $(this).addClass('active')
          var index=$(this).index('.tab>ul>li>a');
          $('.img-box img').removeClass('active').eq(index+1).addClass('active')
          $('.sub-title div').removeClass('active').eq(index).addClass('active')
          $('.graph .graph-box').removeClass('active').eq(index).addClass('active')
      })

      // history 스크롤 
      $('.scrollbar-inner').scrollbar();

      // newsroom 슬라이드 효과 ===================================
      var newsSwiper=new Swiper('.news-room .swiper-container',{
        loop:true,
        slidesPerView:1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.news-room .swiper-pagination',
            clickable: true,
        },
        breakpoints:{
            768:{
                slidesPerView:2,
                spaceBetween: 30,
                slidesPerGroup: 2
            },
            1100:{
                slidesPerView:3,
                spaceBetween: 30,
                slidesPerGroup: 3
            }
        },
        on:{
            //사용자가 슬라이드 화면을 움직일 때 이벤트발생
            sliderMove:function(){
              $('#play-state').removeClass('fa-pause').addClass('fa-play');           
              newsSwiper.autoplay.stop();
            }
        }
    });
    
    $('.news-room a').click(function (e) { 
        e.preventDefault();
        
    });

     //재생정지버튼의 위치 잡기 
      //1.페이지네이션 전체 넓이 구하기 
      var paginationW=$('.news-room .swiper-pagination').width();
      
      //2.재생정지버튼의 위치잡기 (페이지네이션넓이/2 + 여백)
      $('#play-state').css('margin-right',paginationW/3 + 10)

      // 재생정지 상태 변경 
      $('#play-state').click(function(){
        if($(this).hasClass('fa-pause')){
          $(this).removeClass('fa-pause').addClass('fa-play');
          newsSwiper.autoplay.stop();
        }else{
          $(this).removeClass('fa-play').addClass('fa-pause');
          newsSwiper.autoplay.start();
        }
      })

      // 페이지네이션, 네비게이션을 누르면 재생정지버튼 상태를 재생상태로 변경
      $('[role="button"').click(function(){
        $('#play-state').removeClass('fa-pause').addClass('fa-play');
      })

    // #quick-nav pagination =============================
    $('#quick-nav button').click(function(){
        //내가 누른 버튼의 인덱스 구하기
        var i = $(this).index();
        var sectionH = $('section').height();
        $('html,body').stop(true).animate({
            scrollTop:sectionH*i
        })  
     })

    
    // footer site-map =======================
    $('.site-map button').click(function(){
        $(this).next().slideToggle();
    })
})