
var channel;
var user_info;
top.index = 1;

var infos = {
  id:1,
  nome:'Petryck',
  token: 'dsadsadsa'
}

var req = new XMLHttpRequest();   
req.onprogress = function(evt) 
{
  console.log(evt)
   
        var progress = (evt.loaded / evt.total) * 100; 
      

        if(progress == '100'){

          carregamento()
         
        }
        
   
};
req.open('GET', '/', true);  
req.onreadystatechange = function (aEvt) {  
    if (req.readyState == 4 && req.status == 200) 
    {  

    }  
};  
req.send(); 


conta_carregamento = 0;
function carregamento(){

  $('.loading .carregamento').css('width', conta_carregamento+'%')


conta_carregamento++;

if(conta_carregamento != 100){
  setTimeout(() => {
    carregamento()
  }, 15);
}else{
  $('.loading').css('display', 'none') 
}
  
}

localStorage.setItem( 'info_usuario', JSON.stringify(infos) );

const info_users = JSON.parse(localStorage.getItem("info_usuario"));

if(localStorage.getItem('theme')){

  document.querySelector('body').classList.remove('dark');
  document.querySelector('body').classList.remove('light');
  theme = localStorage.getItem('theme');


  localStorage.setItem('theme', theme)
  document.querySelector('body').classList.add(theme);

}








if(localStorage.getItem('color_theme')){

  $('body').removeClass('color1')
  $('body').removeClass('color2')
  $('body').removeClass('color3')
  $('body').removeClass('color4')
  $('body').removeClass('color5')
  $('body').removeClass('color6')
  $('body').removeClass('color7')

  
  color_theme = localStorage.getItem('color_theme');
  localStorage.setItem('color_theme', color_theme)
  $('body').addClass(color_theme)
  console.log($('#'+color_theme))

  var certo = '<svg class="certo" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"></path></svg>'
  
  $('#'+color_theme).html(certo)

}else{

  $('body').removeClass('color1')
  $('body').removeClass('color2')
  $('body').removeClass('color3')
  $('body').removeClass('color4')
  $('body').removeClass('color5')
  $('body').removeClass('color6')
  $('body').removeClass('color7')


  localStorage.setItem('color_theme', 'color4')


  

  $('body').addClass('color4')

  var certo = '<svg class="certo" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"></path></svg>'
  
  $('#color4').html(certo)

}

  


  











document.querySelector('.button_opt_dark').addEventListener('click',function(e){

  body = document.querySelector('body').classList.contains("dark");

  if(body){
      document.querySelector('body').classList.remove('dark');
      document.querySelector('body').classList.add('light');
      localStorage.setItem('theme', 'light')
  }else{
      document.querySelector('body').classList.remove('light');
      document.querySelector('body').classList.add('dark');
      localStorage.setItem('theme', 'dark')

  }

})



//---------------------


// let header2 = document.querySelector('.envolve_btn');

// document.querySelector('body').addEventListener('click',function(e){

//     button_header = e.target;
//     var fora = !header2.contains(e.target);
//     console.log(fora)

//     if(fora){
   
//         // document.getElementById('menu_opt').style.visibility = 'hidden';
//         console.log('fora')
//         $('#menu_opt').css('visibility', 'visible')

//     }else{
        
//         // atualizar_cotacao_moedas();
//         console.log('dentro')
//         $('#menu_opt').css('visibility', 'visible')
//         // document.getElementById('menu_opt').style.visibility = 'visible';
    

//     }
 
    
// })




// $(document).on('click', '.button_opt', function(e){
//   $('#menu_opt').css('display', 'block')
 
// })


// $(document).on('click',function(e){


//   const filho = $('.box_opt').find(e.target)
 

//   if(filho.length > 0 ){

//   }else{
   
//       if($('#menu_opt').css('display') == 'block'){
//         $('#menu_opt').css('display', 'none')
//       }
    
//   }
 
// });




//----------------------


user_info = JSON.parse(localStorage.getItem("info_usuario"));



$('body').on('click','.menu-link',function(e){
  $('.menu-link').removeClass("is-active");
  $(this).addClass('is-active');
});

$(document).on('click','.configA',function(e){
  $('.configA').removeClass("sideActive");
  $(this).addClass('sideActive');
});

$(document).on('click','.menu-circle_minimize',function(e){
  
  // $(".app").hide("slow");

});




// $(document).on('click',function(e){

//   console.log(e.target)
  
//   // const pai = document.getElementsByClassName("app");
//   // const filho = pai.querySelector(e.target);


//   const filho = $('.app').find(e.target)


//   // const pai = filho.offsetParent().attr('id');

//   if(filho.length > 0 ){

//     pai = filho.parents().parents();
//     top.index = top.index+1
//   $(pai).css("z-index", index)
//     console.log(pai)
//     console.log('não tem classe')

// // console.log('dentro')
// // var pai = filho.parents().find('.app')
// // pai = $(pai)[0];
// // console.log(pai)

// //     // top.index = top.index+1
// //     $(pai).css("z-index", index)
//   }
 



 
// });






$(document).on('click','.stretch-light',function(e){

  id_janela = $(this).data('janela_id');

  janela = $('#'+id_janela);

  if (janela.css('width') == '1100px')
  {
    janela.css('top', '0px');
    janela.css('left', '0px');
    janela.css('width', '100%');
    janela.css('height', '100%');
    
    $(function() {
      janela.draggable("destroy");
    });

    janela.css('transition', '0.3s');
  }
  else
  {
    janela.css('top', '0px');
    janela.css('left', '0px');
    janela.css('width', '1100px');
    janela.css('height', '800px');
    janela.css('transition', '0.3s');

    $(function() {
      janela .draggable();
    });

    janela.css('transition', '0s');
  }
});


function time_system(){

  var data = new Date();
  // dia  = data.getDate().toString().padStart(2, '0'),
  // mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
  // ano  = data.getFullYear();

  day = ["Domingo", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][data.getDay()];
  date = data.getDate();
  month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][data.getMonth()];
  year = data.getFullYear();
  hours = data.getHours();
  min = data.getMinutes();

  if(min < 10){
    min = '0'+min;
  }



  document.getElementById('time').innerHTML = `${day}, ${date} de ${month} de ${year} ${hours}:${min} `;
  

}

time_system()
setInterval(() => {
  time_system()
}, 5000);



//---------------------

let header = document.querySelector('._container');

document.querySelector('body').addEventListener('click',function(e){

  button_header = e.target;
  var fora = !header.contains(e.target);

  console.log(fora)

  if(fora){
   

      document.querySelectorAll('.menuParent').forEach(element => {
          element.style.visibility = 'hidden';
        });

        document.querySelectorAll('.menuButton').forEach(element => {
          element.style.cssText = '--scale:0;';
        });

        document.getElementById('menu_opt').style.visibility = 'hidden'
   

  }else{
      

        document.querySelectorAll('.menuParent').forEach(element => {
          element.style.visibility = 'hidden';
        });

        document.querySelectorAll('.menuButton').forEach(element => {
          element.style.cssText = '--scale:0;';
        });
  
      
      let menu = button_header.getAttribute("data-menu");

      if(menu != null ){
        button_header.style.cssText = '--scale:1;';
        document.getElementById(menu).style.visibility = 'visible';
      }
     
 
      
  }

  
})



let header2 = document.querySelector('.envolve_btn');

document.querySelector('body').addEventListener('click',function(e){

    button_header = e.target;
    var fora = !header2.contains(e.target);

    if(fora){
   
        document.getElementById('menu_opt').style.visibility = 'hidden';

       

    }else{
        
        atualizar_cotacao_moedas();
        document.getElementById('menu_opt').style.visibility = 'visible';
    

    }
 
    
})



function atualizar_cotacao_moedas(){

  $.ajax({
      url : "/cotacao_moedas_hoje",
      type : 'post',
      data: {
          id:info_users.id
        },
      beforeSend : function(){
           // CARREGANDO REQUISIÇÃO 
      }
  })
  .done(function(pag){
      $('.cotacao_moedas').html('<center> <h6>Cotações de Hoje</h6></center>')
      if(pag.length == 0){
          $('.cotacao_moedas').append('<div>VALORES </div><div>NÃO</div><div>ATUALIZADOS</div>')  
      }else{
          console.log(pag.length)
       
          $('.cotacao_moedas').css('--row-span', pag.length);
      }

      pag.forEach(element => {
          $('.cotacao_moedas').append('<div>'+element.MoedaSimbolo+': <span id="gbp">'+element.MoedaAbertura+'</span></div>')
      });
   

      $('.cotacao_moedas').append('<center style="margin-top: 11px;"> <h6>Ver histórico</h6></center>')
      
  })
  
  
}
//---------------------


$(document).on('click', '.close-light', function(e){

  id_janela = $(this).data('janela_id');

   $('#'+id_janela).remove();


})



$(document).on('click', '.open_app', function(e){

  var id = $(this).data('janela_id')
  var url = $(this).data('url')


  if($('#'+id).length > 0){
      top.index = top.index+1
      $('#'+id).css("z-index", index)

      if($(document).find('.app_active').length > 0){
        $('.app').removeClass('app_active')
        $('#'+id).addClass('app_active')
      }else{
        $('#'+id).addClass('app_active')
      }
        
      

  }else{
      janela_system(id,url)
  }

  // document.getElementById('menu_opt').style.visibility = 'hidden';


  // janela_system(url)
  


})


$(document).on('click', '.menu-circle_close', function(e){

  var target = $(this).parent().parent().parent();

  $(target).hide({ 
    complete: function() {
      target.remove()
    } 
  });



})






function janela_system(id, url){


    
  $.ajax({
      url : "/app",
      type : 'get',
      data: {
          pagina:url},
      beforeSend : function(){
           // CARREGANDO REQUISIÇÃO 
      }
 })
 .done(function(pag){

  

  // console.log(pag)


  if(pag == 'acesso_error'){
      alert('você nao tem acesso')
      return false
  }else{

    $('.corpo_apps').append(pag);

    top.index = top.index+1
    $("#"+id).css("z-index", index)


    if($(document).find('.app_active').length > 0){
      $('.app').removeClass('app_active')
      $('#'+id).addClass('app_active')
    }else{
      $('#'+id).addClass('app_active')
    }

    $('#'+id).draggable({
      containment: ".corpo_apps",
      drag: function(event) {
    
        top.index = top.index+1
        $(event.target).css("z-index", index)
       
    }
    });


    $('#'+id).resizable({
      minHeight: 616,
      minWidth: 1000
    });





  }


  



})

}





$(document).on('mouseover', '.container .svelte-ds4wcb', function(e){

$('.svelte-ds4wcb button').css('transform', 'scale(1.2)')

$('.svelte-ds4wcb svg').css('opacity', '1')
console.log('passou')

})

$(document).on('mouseout', '.container .svelte-ds4wcb', function(e){

  $('.svelte-ds4wcb button').css('transform', 'scale(1)')

$('.svelte-ds4wcb svg').css('opacity', '0')
console.log('saiu')
  
})



$(document).on('click', '.btn_color', function(e){

  color = $(this).data('color');

  var certo = '<svg class="certo" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"></path></svg>'
  
  $('.certo').remove();

  $(this).html(certo)

  $('body').removeClass('color1')
  $('body').removeClass('color2')
  $('body').removeClass('color3')
  $('body').removeClass('color4')
  $('body').removeClass('color5')
  $('body').removeClass('color6')
  $('body').removeClass('color7')


  $('body').addClass(color)
  localStorage.setItem('color_theme', color)

 
})



$(document).keyup(function(e) { 
  if (e.keyCode === 27){
    $('.search_app').css('display', 'none');
  }

  if (e.keyCode === 113){
    if($('.search_app').css('display') == 'none'){
      $('.search_app').css('display', 'flex');
      $('.search_app input').focus()
    }else{
      $('.search_app').css('display', 'none');
    }
    
  }


   

  // if(e.which == 17){
  //   e.preventDefault();
  
  //   pressedCtrl = true;
  //   console.log('ctrl')
  //   if(e.which == 82 && pressedCtrl == true) {
      
  //     $('.search_app').css('display', 'flex');
  //     return true;
  //   }
  // }
  
  

  
      
}); 


window.addEventListener('keydown', function (e) {
  var code = e.which || e.keyCode;
  if (code == 112) e.preventDefault();
  else return true;
  // fazer algo aqui para quando a tecla F5 for premida
});


// window.addEventListener('keydown', function (e) {
//   var code = e.which || e.keyCode;
//   if (code == 112) e.preventDefault();
//   else return true;
//   // fazer algo aqui para quando a tecla F5 for premida
// })



$(document).on('click', '.CancelarRegistro', function(e){

  var idJanela = $(this).data('idjanela');

  $('#'+idJanela).remove();

})



$(document).on('click', '.btn_menu', function(e){
  e.preventDefault()

  janela = $(this).data('janela');
  local = $(this).data('local');


  app = $(this).parents();

  app.find('.svelte-bwjt80 a').removeClass('active');
  $(this).addClass('active');


  
  
    $.ajax({
      url : "/app_janela",
      type : 'get',
      data: {pagina:janela},
      beforeSend : function(){
           // CARREGANDO REQUISIÇÃO 
      }
  })
  .done(function(pag){
  $('.'+local).html(pag)
  })
  
  
  
  });
  