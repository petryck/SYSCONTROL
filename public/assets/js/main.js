$(function() {
  $(".app").draggable();
});

$(document).on('click','.menu-link',function(e){
  $('.menu-link').removeClass("is-active");
  $(this).addClass('is-active');
});

$(document).on('click','.configA',function(e){
  $('.configA').removeClass("sideActive");
  $(this).addClass('sideActive');
});

$(document).on('click','.menu-circle_minimize',function(e){
  
  $(".app").hide("slow");
});

$(document).on('click','.menu-circle_maximize',function(e){

  if ($('.app').css('width') == '1100px')
  {
    $('.app').css('top', '0px');
    $('.app').css('left', '0px');
    $('.app').css('width', '100%');
    $('.app').css('height', '100%');
    
    $(function() {
      $(".app").draggable("destroy");
    });

    $('.app').css('transition', '0.3s');
  }
  else
  {
    $('.app').css('top', '0px');
    $('.app').css('left', '0px');
    $('.app').css('width', '1100px');
    $('.app').css('height', '800px');
    $('.app').css('transition', '0.3s');

    $(function() {
      $(".app").draggable();
    });

    $('.app').css('transition', '0s');
  }
});

