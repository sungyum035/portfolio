var winWidth = $(window).outerWidth();
var chkMobile = false;
var menuOpened = false;

$(document).ready(function(){
  if(winWidth<=1024){
    chkMobile = true;
    mobileEvent(); // mobile only
  }else{
    pcEvent(); // pc only
    loadPopup();
  }
/*
  if($(".dropdown").length != 0){
    $(".dropdown .is-selected a").on("click",function(e){
      e.preventDefault();
      var $target = $(this).parents("ul");
      if($target.hasClass("is-opended")){
        $target.removeClass("is-opended");
      }else{
        $target.addClass("is-opended");
      }
    });
  }
*/
/*
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
 */ 
  if($(".datepicker").length != 0){
	    $(".datepicker").datepicker({
	    	changeYear: true,
	      changeMonth: true,
	    	showOn: "both",
	    	buttonImage: "/resources/images/button_calendar.gif",
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
  
  $(document).on('click', '.popup-close', function(){
      var code = $(this).data('code');
      var idx = $(this).data('idx');
      if ($('#popup-'+code+'-'+idx).prop('checked')) {
          var cookieKey = 'popup-'+code+'-'+idx;
          setCookie(cookieKey, 'Y');
      }
      $(this).parent().parent().remove();
  });
  
})

$(window).resize(function(){
  winWidth = $(window).outerWidth();
  if(winWidth<=1024 && chkMobile === false){// mobile only
    chkMobile = true;
    clearPcEvent();
    mobileEvent();
  }else if(winWidth>1024 && chkMobile === true){// pc only
    chkMobile = false;
    clearMobileEvent();
    pcEvent();
  }
})

function pcEvent(){
  $(".menu").on("mouseenter",function(){
    $(".depth02").stop().slideDown(300);
  })

  $(".menu").on("mouseleave",function(){
    $(".depth02").stop().slideUp(300);
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
  $(".menu .gnb>li>a").off().on("click",function(e){
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

    console.log("1111")
  })
}

//clear pc event
function clearPcEvent(){2017-10-13
  $(".menu").off("mouseenter");
  $(".menu").off("mouseleave");
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

function loadPopup() {
    if (location.pathname != '/') {
        return;
    }
    $.ajax({type:"GET", url : '/api/board/popup', cache:false
        , success : function(data) {
            if (data.error == 0) {
                console.log(data.data);
                
                var template = $("#popup-item").html();
                Mustache.parse(template);
                for (var i = 0; i < data.data.length; i++) {
                    var d = data.data[i];
                    var cookieKey = 'popup-'+d.code+'-'+d.idx;
                    d.is_popup_url = d.popup_url != '' && d.popup_url != undefined;
                    if (getCookie(cookieKey) != 'Y') {
                        $('body').append(Mustache.render(template, d));
                    }
                }
            } else {
                alert(data.message);
            }
        }
        , error : function(data) {
            alert(data.responseJSON.error);
        }
    });
}

function checkDropdownUl(tap)
{
	 var w = $('body').width();
	 if(w <= 1024)
	 {
	  var $target = $('.dropdown').children("ul");
	     if($target.hasClass("is-opended")){
	   	$target.removeClass("is-opended");
	   	changeTap(tap);
	     }else{
	       $target.addClass("is-opended");
	     }
	 }
	 else
		 changeTap(tap);
 
}