var winWidth = $(window).outerWidth();
var chkMobile = false;
var menuOpened = false;

$(document).ready(function(){
/*
  if(winWidth<=1024){
    chkMobile = true;
    mobileEvent(); // mobile only
  }else{
    pcEvent(); // pc only
  }
*/
pcEvent();
  if($(".datepicker").length != 0){
    $(".datepicker").datepicker({
    	changeYear: true,
      changeMonth: true,
    	showOn: "both",
    	buttonImage: "../images/button_calendar.gif",
    	yearSuffix: "년",
    	showMonthAfterYear: true,
    	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    	monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
      monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    	dateFormat: 'yy-mm-dd',
    	nextText: '다음 달',
    	prevText: '이전 달'
    });
  }

  if($(".popup").length != 0){
    $(".close_popup").on("click",function(e){
      e.preventDefault();
      closePopup();
    });
  }

  if($(".tit_faq").length != 0){
    $(".tit_faq>a").on("click",function(e){
      e.preventDefault();
      var $target = $(this).parent();

      if($target.hasClass("is-opened")){
        $(".tit_faq").removeClass("is-opened");
        $(".faq_detail").slideUp(300);
      }else{
        $(".tit_faq").removeClass("is-opened");
        $(".faq_detail").slideUp(300);

        $target.addClass("is-opened");
        $target.next().slideDown(300);
      }
    })
  }

  if($(".opendepth").length !== 0){
    $(".opendepth").on("click",function(e){
      e.preventDefault();
      var $btn = $(this);
      if($btn.hasClass("is-opened")){
        $btn.removeClass("is-opened");
        $(".depth03").slideUp(300);
      }else{
        $(".opendepth").removeClass("is-opened");
        $btn.addClass("is-opened");
        $btn.next().slideDown(300);
      }
    })
  }
	// 인쇄
	$(".print").on("click",function(e){
		e.preventDefault();
		window.print();
	})

	// font 크기 조정
	$(".zoomIn").on("click",function(e){
		e.preventDefault();
		var $cont = $(".contents .right");
		var fontSize = $cont.attr("id");
		if(fontSize == undefined){
			fontSize = "font_16";
		}
		
		if(fontSize != "font_19"){
			var changeSize = parseInt(fontSize.split("_")[1])+1;
			$cont.attr("id","font_"+changeSize);
		}
	})

	$(".zoomOut").on("click",function(e){
		e.preventDefault();
		var $cont = $(".contents .right");
		var fontSize = $cont.attr("id");
		if(fontSize == undefined){
			fontSize = "font_16";
		}
		
		if(fontSize != "font_13"){
			var changeSize = parseInt(fontSize.split("_")[1])-1;
			$cont.attr("id","font_"+changeSize);
		}
	})
})

$(window).resize(function(){
  /*
  winWidth = $(window).outerWidth();
  if(winWidth<=1024 && chkMobile === false){// mobile only
    chkMobile = true;
    clearMobileEvent();
    mobileEvent();
  }else if(winWidth>1024 && chkMobile === true){// pc only
    chkMobile = false;
    clearMobileEvent();
    pcEvent();
  }
  */
})

// openPopup
function openPopup(popupName){
  var topPosition = $(window).scrollTop();
  $(".dim").fadeIn(300);
  $("#"+popupName).css("top",topPosition).fadeIn(300);
}

// close popup
function closePopup(){
  $(".dim").hide();
  $(".popup").hide();
}

function pcEvent(){
  $(".menu .gnb>li>a").on("mouseenter",function(){
    $(".depth02").hide();
    $(this).next().show();
    $(this).addClass("on");
  })

  $(".menu .gnb>li").on("mouseleave",function(){
    $(".menu .gnb>li>a").removeClass("on");
    $(".depth02",this).hide();
  })
}

function mobileEvent(){
  TweenMax.set(".menu", {x:"-100%"});
  TweenMax.set(".btn_closeGnb", {x:"100%"});

  //gnb event
  var menu = new TimelineMax({paused:true}).to(".menu", 0.5, {x:"0%", boxShadow:"1px 1px 6px rgba(0,0,0,0.75)", ease: Power1.easeInOut});
  var closeMenu = new TimelineMax({paused:true}).to(".btn_closeGnb", 0.5, {x:"0%", ease: Power1.easeInOut});

  function menuFunction(){
    if(menu.progress() === 0 ){
      $(".dim").fadeIn(300);
      $("section").css("overflow","hidden");
      menu.play();
      closeMenu.play();
      menuOpened = true;
    }else{
      $(".dim").fadeOut(300);
      $("section").css("overflow","auto");
      menu.reverse();
      closeMenu.reverse();
      menuOpened = false;
    }
  }

  //closed menu
  $(".btn_openGnb,.btn_closeGnb").on("click",function(e){
    e.preventDefault();
    menuFunction();
  });

  //folded menu
  $(".menu .gnb>li>a").on("click",function(e){
    e.preventDefault();
    var $target = $(this);
    if($target.hasClass("is-opened")){
      $target.removeClass("is-opened");
      $(".depth02").slideUp(300);
    }else{
      $(".menu .gnb>li>a").removeClass("is-opened");
      $target.addClass("is-opened");
      $(".depth02").slideUp(300);
      $target.next().slideDown(500);
    }
  })
}

//clear pc event
function clearPcEvent(){
  $(".menu .gnb>li>a").off("mouseenter");
  $(".menu .gnb>li").off("mouseleave");
}

//clear mobile event
function clearMobileEvent(){
  if(menuOpened){
    $(".dim").hide();
  }
  TweenMax.set(".menu", {x:"0%", boxShadow:"0px 0px 0px rgba(0,0,0,0)"});
  TweenMax.set(".btn_closeGnb", {x:"0%"});
  $(".depth02").hide();
  $(".menu .gnb>li>a").off("click").removeClass("is-opened");
}
