    // $(document).ready(function(){ -> 
    //도큐먼트 레디를 적은 이유 : script를 html에 상단에 적으면 그 바로 아래에 적힌 코드들이 먼저 안읽힘 (근데 보통 script를 상단에 적음...) "그래서 도큐먼트 읽을 준비가되면 효과가 적용 돼라" 라고 적어준 것
$(document).ready(function(){       //->헤더 메뉴 연결하는 거 (function은 서브메뉴랑 언어선택이 안떠서)
    $('header').load('include/header.html',function(){
        $('html').click(function(e) {
            console.log(e.target)

            if (!$(e.target).hasClass('choice')) {
                $('.languge').hide();
            }
            if (!$(e.target).hasClass('title')) {
                $('.title_list').slideUp();
            }
        });
        
        
        
        
        $('.lang').click(function(e){
            $('.language').toggle();
            return false
            e.preEventDefault
        }) 
    
        $('.language li').click(function(){
            let langChoice = $(this).text();      /* text 뒤에 괄호를 비워두면 글자를 구한다는 뜻 */
            $('.choice').text(langChoice);        /* text 글씨쓰는 명령어 */
        })
    
        // 로고이미지 src 값 글자 변경
        $('header h1').mouseover(function(){
            $('header h1 img').attr('src','images/k_logo.png')
            // let h1img = $('header h1 img').attr('src')    /* attr 속성의 값을 구한다,준다 의미 */
            // console.log(h1Img)      //images/h_logo.png 가 구해짐
        
            // let h1ImgOver = h1Img.replace('.png','_o.png')    
            // console.log(h1ImgOver)
        
            // $('header h1 img').attr('src',h1ImgOver)     ->> 주석처리된 태그들로만 적어서도 할 수 있음
        })
    
    
        // 메뉴 부드럽게 떴다가 사라지게 하기 2가지 
            //ㄴ(여기 다 지우고 그 주석처리부분 살리면됨)- css header .gnb에 주석처리한 부분 
        // $('.gnb').mouseenter(function(){
        //     $('.lnb').stop().fadeIn(200)
        // });
        // $('.gnb').mouseleave(function(){
        //     $('.lnb').stop().fadeOut(200)              
        // })       
            // ㄴ메인 메뉴 부드럽게 떴다가 사라지게끔 (메뉴 전체)
           
        $('.gnb li').mouseover(function(){
            $(this).find('.lnb').stop().fadeIn(200)
        })
        $('.gnb li').mouseout(function(){
            $('.lnb').stop().fadeOut(200)              
        })
        
        /* ㄴ메인 메뉴 부드럽게 떴다가 사라지게끔 (메뉴 하나씩)*/
        // mouseenter, mposeleave(본인만)
        // mouseover, mouseout (자식도)
    
    
        $('header h1').mouseout(function(){
            $('header h1 img').attr('src','images/w_logo.png')
        })
    
        $(window).scroll(function(){
            let scrT = $(window).scrollTop();   
            console.log(scrT)
            
            $('#visual').css({backgroundSize:100+scrT/10+'%'})   /* 천천히 늘어나게 /10 함 (나누기) - 숫자가 클 수록 빠름 */
            $('#visual .model').css({top:100-scrT/5+'px'})   
    
            if(scrT >= 100){
                $('header nav').addClass('on')
            } else {
                $('header nav').removeClass('on')
            }
        });

        /* 현재페이지 표시 스크립트 */
        let url = window.location.href;

        /* 중간 gnb 메뉴에 주황색 하단 바가 안생겨서 다시 나오게끔 하기 */
        /* nav-.gnb-.lnb-li-a 안에 span 태그로 묶어야함 */
        $('.gnb a').each(function(){
            let gnbText = $(this).text();
            $(this).html('<span>'+gnbText+'</span>')
        })

        
        $('.gnb a').each(function(){
            let gnbHref = $(this).attr('href')   //sub01_01.html

            if(url.indexOf(gnbHref) > -1){
                $(this).css({color:''});
                $(this).parent('li').addClass('on');

                let gnbHtml = $(this).parents('.lnb').html();
                                // ㄴ parent = 바로 위 아빠 / parents = 더 위에 아빠(할아버지..)
                let h2Text = $(this).text();
                let gnbPage = $(this).parents('.lnb').siblings('a').text();
                let gnbEng = $(this).parents('.lnb').siblings('a').attr('data-eng')
                //찾은 a의 할아버지 lnb의 형제 a에 들어있는 글자


                $('#visual_sub .text strong').text(gnbPage) 
                $('#visual_sub .text p').text(gnbEng) 


                $('.snb').html(gnbHtml)
                $('#content_box h2').text(h2Text)       
                                // ㄴ 제목을 자동으로 써지게끔 (다른 메뉴 눌러도 자동으로 뜸)
            }
        })

        


        /*  snb 새로고침시 메뉴 주황색 하단 바 시작 위치 <span class="line"></span>을 ul 안에 넣기*/
        function snbAction(){
            let snbOnW = $('.snb li.on span').width()
            let snbOnL = $('.snb li.on span').position().left
            $('.snb_box .line').css({left:snbOnL, width:snbOnW})    
        }
        snbAction();       // ->이걸 써야지 위에가 실행됨 

        $(window).resize(function(){    // ->윈도우 사이즈에 맞춰서 따라올 수 있게 해줌 
            snbAction();
        })

        /*  snb 메뉴 주황색 하단 바 - 마우스 커서에 따라가기 */
        $('.snb li').mouseenter(function(){
            let snbLiW = $(this).find('span').width();
            let snbLiL = $(this).find('span').position().left ;

            $('.snb_box .line').css({left:snbLiL, width:snbLiW})
        })

        $('.snb').mouseleave(function(){
            snbAction();
        })

        // $('.snb_box .line').css({left:snbLiL}) 
        // ㄴ 뜻 : $(대상).css({속성:값})
        // 위치좌표값 알아내기

        // .position().left -> 부모로부터의 왼쪽거리 값
        // .position().top  -> 부모로부터의 위쪽거리 값
        // .offset().left   -> 브라우져로부터의 왼쪽거리 값
        // .offset().top    -> 브라우져로부터의 위쪽거리 값


    })

        // * notice 롤링
        // setInterval()           /* setInterval(함수,반복시간) =실행하라는뜻 */
        // clearInterval()         /* clearInterval(변수) =setInterval을 멈춰라는뜻 */
    
        // setTimeout()            /* setTimeout(함수,예약시간) */
        // clearTimeout()          /* setTimeout을 멈추라는 뜻 */
    
    let notiRoll = setInterval(noticeRolling, 3000)         
                            /* ㄴ noticeRolling = 이름 임의로 지은것 / 2000 = 2초 */

    function noticeRolling(){
        $('.notice ul').animate({top:'-100%'}, function(){
            $('.notice ul li').eq(0).appendTo($('.notice ul'))
            $('.notice ul').css({top:0})
        })    
    }

    $('.notice').mouseenter(function(){
        clearInterval(notiRoll)
    });
    $('.notice').mouseleave(function(){
        notiRoll = setInterval(noticeRolling, 3000)
    })
    
    // informaion 상자 안 숫자 넣기 방법1 -> for문
    // for(let i=0; i<9; i++){      //-> let 글자는 생략 가능
    //     $('#section5 li').eq(i).find('span.num').text('0'+(i+1))
    // }
    
    // informaion 상자 안 숫자 넣기 방법2 -> each()
    // $('#section5 li').each(function(){
    //     let liIndex = $(this).index()
    //     $(this).find('.num').text('0'+(liIndex+1))
    // })


    
        


    // informaion 상자 안 숫자 넣기 방법3 -> each()
    $('#section5 li').each(function(index, item){    /* index 는 순서 번호를 의미함 */
        if(index+1 < 10){       /* if(index+1 < 10) = 이 조건이 참일 경우 라는 뜻 */
            $(item).find('.num').text('0'+(index+1)) 
            //  $(item).append('<span class="num></span>"')    
            //     ㄴ html li에 span 태그로 num을 안적고 이걸 적어주면 숫자 생기게 할 수 있음
        } else {
            $(item).find('.num').text(index+1)
        }
    });


    // 서브페이지 부분

    // 밑에 상단으로 바꾸려면 <span class="line"></span>을 html-> ul에서 body로 빼줘야함

    /* 연습 - 주황색 하단 바 메인 로고 위치로 옮겨보기 - 방법1 / h1에 class=on 줘야함 */
    // let h1Posi = $('h1.on').position().left;
    // let h1PosiT = $('h1.on').position().top;
    // let h1PosiW = $('h1.on').width();
    // $('.line').css({left:h1Posi, width:h1PosiW, top:h1PosiT+50})
                                            /* ㄴ 50은 픽셀로 적용되는데 퍼센트로 하고 싶을 경우
                                             top:(h1PosiT+숫자)+'%' 이렇게 적어주기 */

    /* 연습 - 주황색 하단 바 메인 로고 위치로 옮겨보기 - 방법2 / h1에 class=on 안줘도됨 */
    // function snbAction(){
    //     let snbPosi = $('h1').offset().left;
    //     let snbPosiT = $('h1').offset().top;
    //     let snbPosiW = $('h1').width();
    //     let snbPosiH = $('h1').height();
    //     $('.line').css({left:snbPosi, width:snbPosiW, top:snbPosiT+snbPosiH})
    // }
    // snbAction()

    // $(window).resize(function(){   /* 윈도우 사이즈에 맞춰서 따라올 수 있게 해줌 */
    //     snbAction()
    // })





    /* 로그인 페이지 현재페이지 표시 */
    let url = window.location.href

    $('.member a').each(function(){
        let memHref = $(this).attr('href');

        if(url.indexOf(memHref) > -1){
            $(this).css({color:'#f37021'}).parent('li').addClass('on')
            let memH2 = $(this).text()
            $('#content_box h2').text(memH2)
        } else if(url.indexOf('join') > -1){
            $('.member a').eq(2).css({color:'#f37021'}).parent('li').addClass('on')
            let memH2 = $('.member a').eq(2).text()
            $('#content_box h2').text(memH2)
        }
    })

    /* 로그인 패스워드 눈 아이콘 */
    // $('.eye_on').click(function(){
    //     $(this).hide()
    //     $('.eye_off').show()
    //     $('.login_box input[name=pw]').attr('type','text')
    // })
    // $('.eye_off').click(function(){
    //     $(this).hide()
    //     $('.eye_on').show()
    //     $('.login_box input[name=pw]').attr('type','password')
    // })
       
    $('.eye_box').click(function(){
        let $eyeInput = $(this).prev('input')
        $eyeInput.toggleClass('active');

        if($eyeInput.hasClass('active')){
            $('.eye_off').show()
            $('.eye_on').hide()
            $('.login_box input[name=pw]').attr('type','text')
        } else {
            $('.eye_off').hide()
            $('.eye_on').show()
            $('.login_box input[name=pw]').attr('type','password')
        
        }
    })


    
    /* 회원가입페이지 구분 */
    if(url.indexOf('join_people') > -1){
        $('.join_people').show()
    }
    if(url.indexOf('join_company') > -1){
        $('.join_company').show()
    }
                // =주소에서 join_people을 찾으면 보이게 끔 해라
                // =주소에서 join_company을 찾으면 보이게 끔 해라
                // ㄴ indexOf = 찾고싶은 글자의 첫자가 전체 글자중 몇번째 글자인지 순서를 알아내는 메소드 (있으면 -1보다 무조건 크고 없으면 무조건 -1)
                // -1을 적은 이유 : 스크립트는 0부터 숫자를 세기때문에 저 join_people과 company를 찾기위해서는 > 0 라고 적는게 아니라 > -1 라고 적어야 0부터 숫자를 세면서 찾을 수 있음



    /* 회원가입 버튼 */
    $('.join_ok').click(function(){
        let joinAgree = $('#rule_agree').is(':checked')
        let ruleAgreeTop = $('.rule_box').offset().top;

        if(!joinAgree){
            //alert('이용약관에 동의해 주셔야 합니다.')
            $('html').animate({scrollTop:ruleAgreeTop})
            $('.rule_box label').css({border:'2px dotted #f37021'})
            return false
        }
    })



    /* 게시판 */
    $('.board_page .title').click(function(){
        $('.title_list').slideToggle(200);
        $('.selectbox').toggleClass('on')
    })

    const urlSearch = new URLSearchParams(location.search);
    if(urlSearch.get('board_num') == '01'){
        $('.board_page h2').text('자유게시판')
    }

    $('#file_select').change(function() {
        var fileName = $(this).val().split('\\').pop();
        $('.filezone').text(fileName || '파일을 선택해주세요');
    });
});

