
var channel;
var user_info;
top.index = 1;

// var infos = {
//   id:1,
//   nome:'Petryck',
//   token: 'dsadsadsa'
// }

if(!localStorage.getItem("info_usuario_syscontrol_os")){
  window.location.href = "/login";
}else{
  info_users = JSON.parse(localStorage.getItem("info_usuario_syscontrol_os"));
  
}

var req = new XMLHttpRequest();   
req.onprogress = function(evt) 
{

  var contentLength;
  if (evt.lengthComputable) {
    contentLength = evt.total;
  } else {
    contentLength = parseInt(evt.target.getResponseHeader('x-decompressed-content-length'), 10);
  }




   
        var progress = (evt.loaded / contentLength) * 100; 
      

        if(progress == '100'){

          // carregamento()
         
        }
        
   
};
req.open('GET', '/assets/js/bootstrap/bootstrap.bundle.js', true);  
req.onreadystatechange = function (aEvt) {  

    if (req.readyState == 4 && req.status == 200) 
    {  
      carregamento()
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

// localStorage.setItem( 'info_usuario_syscontrol_os', JSON.stringify(infos) );

// const info_users = JSON.parse(localStorage.getItem("info_usuario_syscontrol_os"));

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


user_info = JSON.parse(localStorage.getItem("info_usuario_syscontrol_os"));



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






function janela_system(id, url, varialvel){

if(varialvel){
  var id_variavel = varialvel
}else{
  var id_variavel = false;
}
    
  $.ajax({
      url : "/app",
      type : 'get',
      data: {
          pagina:url,
        variavel:id_variavel},
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


})

$(document).on('mouseout', '.container .svelte-ds4wcb', function(e){

  $('.svelte-ds4wcb button').css('transform', 'scale(1)')

$('.svelte-ds4wcb svg').css('opacity', '0')

  
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





$(document).on('dblclick', '#tabela_estoque tr', function(e) {
e.preventDefault()
var id_produto = $(this).attr('id');
abrir_janela('AppVisualizaProduto','estoque/AppVisualizaProduto', id_produto)


})


function abrir_janela(janela_id,url, varialvel){


  var id = janela_id
  var url = url



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

    if(varialvel){
      janela_system(id,url,varialvel)
    }else{
      janela_system(id,url)
    }
      
  }

  // document.getElementById('menu_opt').style.visibility = 'hidden';


  // janela_system(url)
  
 
}



$(document).on('click', '.btn_cadastra_produto', function() {

  if($('.AdicionarProduto #seleciona_visitante').val() != null && $('.AdicionarProduto #seleciona_visitante').val() != ''){

    var id_produto = $('.AdicionarProduto #id_modelo').val()
    var nome_produto = $('.AdicionarProduto #seleciona_visitante').val()
    var categoria = $('.AdicionarProduto select[name=categorias]').val()
    var img = $("#fila_img").get(0).files[0];
    // var img_modelo = $('.AdicionarProduto #img_modelo').val()
    var formData = new FormData();



    formData.append('id_produto',id_produto);
    formData.append('nome_produto',nome_produto);
    formData.append('categoria',categoria);
    formData.append('sub_produto',JSON.stringify(lista_produtos_color));
    formData.append('img',img);
    


    $.ajax({
      url: '/cad_produto',
      type: 'POST',
      data: formData,
      dataType:'JSON',
      processData: false,
      contentType: false,
      success: function(response) {
        console.log(response)
        if(response == 'sucesso'){

          $('#AppAdicionarProduto').remove();
          
          lista_produtos_color = [];
          setTimeout(() => {
            lista_produtos_adds()
            tabela_estoque.ajax.reload();
          }, 2000);

        }

        
          
    
      },
      error: function() {
          console.log('fail');
      }
  });
  
  // var body = {
  //   id_produto:id_produto,
  //   nome_produt:nome_produto,
  //   categoria:categoria,
  //   sub_produto:sub_produto
  // }



  //   $.ajax({
  //     type: 'POST',
  //     url: '/cad_produto',
  //     data: body,
  //     success: function (data) {
  //       console.log(data)

  //       if(data == 'sucesso'){

  //         // $('#AdicionarVisitante').remove();
  //         tabela_estoque.ajax.reload();
  //         lista_produtos_color = [];
  //         lista_produtos_adds()

  //       }
      
  //     }
  
  //   })

  }

}); 

lista_produtos_color = [];
$(document).on('change', '#AppAdicionarProduto  #valor_custo', function(e){
    calcular_valor()
})
$(document).on('change', '#AppAdicionarProduto  #porcentagem_custo', function(e){
    calcular_valor()
})






$(document).on('click', '.btn_delete_tamanhos', function(e){
    e.preventDefault()
    id_produto = $(this).attr('id');

    // delete lista_produtos_color[id_produto]
    lista_produtos_color.splice(id_produto, 1);

    lista_produtos_adds()

})



function calcular_valor(){

    valor_custo = $('#AppAdicionarProduto #valor_custo').val(); 
    porcentagem_custo = $('#AppAdicionarProduto #porcentagem_custo').val(); 

    total_custo = parseFloat(((valor_custo / 100) * porcentagem_custo))+parseFloat(valor_custo);

    
    // var f = total_custo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    var b = total_custo.toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 3
})
    $('#AppAdicionarProduto #total_custo').val(b)



}

$(document).on('click', '#btn_add_color_produto', function(e){

  e.preventDefault()
  valor_custo = $('#valor_custo').val(); 
  porcentagem_custo = $('#porcentagem_custo').val(); 
  valor_total = $('#total_custo').val(); 
  qtd = $('#quantidade_produto').val(); 
  cor = $('#cor_produto').val(); 
  tamanho = $('#tamanho_produto').val(); 



  if(valor_total != '' && valor_custo != ''){
    produtos = {
      qtd:qtd,
      cor:cor,
      tamanho:tamanho,
      custo:valor_custo,
      lucro:porcentagem_custo+'%',
      valor_total:valor_total
  }

  lista_produtos_color.push(produtos)




  lista_produtos_adds()

$('#valor_custo').val(''); 
$('#porcentagem_custo').val(100); 
$('#total_custo').val(''); 
$('#quantidade_produto').val(1);
  }
  

})



function lista_produtos_adds(){
  


  cont_id = 0;
  $('#tabela_cores_tamanhos_add tbody').html('')

  lista_produtos_color.forEach(element => {

    valor_custo = element.custo
    valor_custo2 = valor_custo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    valor_total = element.valor_total
    valor_total2 = valor_total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    
    
    
    
    linha = `<tr>
       <th scope="row">`+element.cor+`</th>
       <td>`+element.tamanho+`</td>
       <td>`+element.qtd+`</td>
       <td>`+valor_custo2+`</td>
       <td>`+element.lucro+`</td>
       <td>`+valor_total2+`</td>
       <td><button id="`+cont_id+`" style="width: 20px;height: 20px;" class="btn btn-danger btn_delete_tamanhos">
         <svg style="width: 12px;margin-top: -22px;margin-left: -7px;"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16">
             <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"></path>
           </svg>
       </button></td>
     </tr>`;
    
     $('#tabela_cores_tamanhos_add tbody').append(linha)
     
    
     cont_id++;
    });





}


$(document).on('click', '#AppAdicionarProduto #img_modelo', function() {
  $('#AppAdicionarProduto #fila_img').click()
});


$(document).on('input', '#AppAdicionarProduto #seleciona_visitante', function() {

  
  var opt = $('#AppAdicionarProduto #lista_visitantes').find('option[value="'+$(this).val()+'"]');
  var id_visitante = opt.length ? opt.attr('id') : null;

  if(id_visitante != null){


    $.ajax({
      type: 'POST',
      data: {id_visitante:id_visitante},
      url: '/consulta_modelo',
      success: function (data) {

      

        $('#AppAdicionarProduto #id_modelo').val(id_visitante)
        

        if(data[0]['imgModelo']){
          $('#AppAdicionarProduto #img_modelo').attr('src', data[0]['imgModelo'])
        }else{
          $('#AppAdicionarProduto #img_modelo').attr('src', 'assets/image/produtos/noimage.gif')
          
        }
      
        $('#AppAdicionarProduto #fila_img').prop('disabled', true)
        
        $("#AppAdicionarProduto select[name=categorias]").prop( "disabled", true );
  
       
        $('#AppAdicionarProduto select[name=categorias] option[value='+data[0]['idCategoria']+']').attr('selected','selected');
        // $('#documento').prop( "readonly", true );


      }
  
    })
  }else{
    $('#AppAdicionarProduto #fila_img').prop('disabled', false)
    $('#AppAdicionarProduto #id_modelo').val(null)
    $('#AppAdicionarProduto #img_modelo').attr('src', 'assets/image/logo_sirius.png')
    $("#AppAdicionarProduto select[name=categorias]").prop( "disabled", false );
    // $('#documento').prop( "readonly", false );
  }



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


  function previewFile(input){
    var file = $("#fila_img").get(0).files[0];

    if(file){
        var reader = new FileReader();

        reader.onload = function(){
            $("#img_modelo").attr("src", reader.result);
        }

        reader.readAsDataURL(file);
    }
}
  