//theme
function setTheme(){
  //set toggle theme
  if($("input").is(':checked')){
    $("#linkTheme").attr("href", "https://renatofringuello.github.io/renatofringuello-base/css/utils/light-theme.css");
  }
  else{
    $("#linkTheme").attr("href", "https://renatofringuello.github.io/renatofringuello-base/css/utils/dark-theme.css");
  }
}

function calcAge(startDate){
  var d = new Date();
  var birthDate = new Date(startDate);
  var age = d.getFullYear() - birthDate.getFullYear();
  var m = d.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && d.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

//doc READY
$(document).ready(function() {
  //slick carousel
   $('.slide-container').slick({
    arrows: false,
    initialSlide:0,
    centerPadding: '55px',
    slidesToShow: 4,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          centerMode:true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1000,
        settings: {
          centerMode:true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 900,
        settings: {
          centerMode:true,
          slidesToShow: 1
        }
      }
    ]
  });

  //smooth-scroll
  var scroll = new SmoothScroll('a[href*="#"]');
  window.location.href = "#home";

  //change theme input
  $("input").on("click",setTheme);

  //on scoll
  $(".progressBar").css("width", window.pageYOffset + "%");
  $(window).scroll(function(){
    var pageMaxY = $(document).height() - $(window).height();
    $(".progressBar").css("width", (window.pageYOffset / pageMaxY * 100) + "%");
  });

  //portrait
  var isOpen = 0;
  function openNav(){
    if(!isOpen){
      //navBtn animation
      $("#b").slideUp(10,function(){
        $(".navBtn .line").css(
          {
            "position":"absolute",
            "transform":"translate(0%,-50%)",
            "top":"50%",
          }
        );
        $("#a").css("transform","rotate(-45deg)");
        $("#c").css("transform","rotate(45deg)");  
      });

      $("header").css(
        {
          "display" : "none",
          "height" : "100%",
          "background":"var(--ndColor)"
        }
      );
      //set html unscrollable
      $("html").css("overflow","hidden");
      
      $("header").slideDown("slow", function(){
        $(".navLinks, .socialSec").css("display","flex");
      });
      isOpen = 1;
    }
    else{
      //navBtn animation
      $("#a,#c").css("transform","rotate(0deg)");
      setTimeout(function(){
        $("#b").slideDown(10,function(){
          $(".navBtn .line").css(
            {
              "position":"static",
              "transform":"translate(0%,0%)",
              "top":"0%",
            }
          );
        });
      },500);
      $("header").slideUp("fast",function(){
        $("header").css(
          {
            "height":"auto",
            "display":"flex",
            "background" : "-webkit-linear-gradient(var(--ndColor), var(--ndColorGr))"
          }
        );
        //set html to scrollable
        $("html").css("overflow","visible");
        $(".navLinks, .socialSec").css("display","none");
      });
      isOpen = 0;
    }
  }

  //click links on portrait
  $(".link").on("click",function(){
    if(window.innerWidth < window.innerHeight){
      isOpen = 1;
      openNav();
    }
  });
  
  //handle the "portrait to landscape when nav is open" bug
  $(window).resize(function(){
    if(window.innerWidth > window.innerHeight){
      $(".navLinks, .socialSec").css("display","flex");
      isOpen = 0;//reset
    }
    else{
      $(".navLinks, .socialSec").css("display","none");
    }
    $("header").css(
      {
        "height":"auto",
        "background" : "-webkit-linear-gradient(var(--ndColor), var(--ndColorGr))"
      }
    );
  });
  $(".navBtn").on("click", function(){
    openNav();
  });

  //setAge
  $("#age").text(calcAge('1999-07-09T00:00:00'));
  //set copyright year
  var d = new Date();
  $("#copyyr").text(d.getFullYear());
});

//window LOAD
$(window).on("load", function(){
  var d = new Date();
                              /*summer*/                                                                                    /*autumn - winter - spring*/
  if((d.getMonth() >= 5 && d.getMonth() < 9 && d.getHours() < 20 && d.getHours() >= 8) || ((d.getMonth() >= 9 || d.getMonth() < 5) && d.getHours() < 18 && d.getHours() >= 6)){
    $("input").attr('checked','checked');
  } 
  setTheme();
  setTimeout(function(){
    $(".loader-wrapper").fadeOut('slow');
  },1000);
});
