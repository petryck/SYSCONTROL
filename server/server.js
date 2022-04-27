import mysql from 'mysql'
import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'
import http from 'http'
// import compress from 'compression'
import bodyParser from 'body-parser'
import formidable from 'formidable'
import fs from 'fs'


import ejs from 'ejs';
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const port = 3265



const server = http.Server(app);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/', express.static(path.join(__dirname, '../public')))



app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

// app.use(express.compress());


var connection = mysql.createConnection({
  host: "144.22.225.253",
  user: "aplicacao",
  port: "3306",
  password: "conline@2510A",
  database: "ANALUA",
  charset: "utf8mb4"
});



connection.connect(function(err) {

  if(err){
    console.log('ERRO AO ACESSAR DB --> MYSQL')
    setTimeout(incia_conexao, 2000);
  }else{
      console.log('CONECTADO DB --> MYSQL')
  }

}); 

// connection.incia_conexao();



app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../public/home.html'))
  })

  app.get('/loading', (req, res) => {

    res.sendFile(path.join(__dirname, '../public/home.html'))
  })

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })


app.get('/app', (req, res) => {

  console.log(req.query.variavel)
  
  res.render(path.join(__dirname, '../public/apps/'+req.query.pagina+'.html'), {id_variavel:req.query.variavel})
})

app.get('/app_janela', (req, res) => {
  
  res.sendFile(path.join(__dirname, '../public/janelas/'+req.query.pagina+'.html'))
})


app.post('/login_query', (req, res) => {
  var login = req.body.email;
  console.log(login)


  var sql = `SELECT * FROM usuarios WHERE login = '${login}' LIMIT 1`;
  connection.query(sql, function(err2, results){
    console.log(err2)

    if(results.length > 0){
      res.json(results);
    }else{
      res.json('error');
    }

})
})

app.post('/QueryUmProduto', (req, res) => {
  var id = req.body.id;

  var sql = `SELECT ANALUA.estoque.*,
                    ANALUA.modelo.nome as NomeModelo,
                    ANALUA.modelo.categoria as IdCategoria,
                    ANALUA.modelo.img as ImgModelo
                     FROM ANALUA.estoque 
  JOIN ANALUA.modelo ON ANALUA.modelo.id_modelo = ANALUA.estoque.modelo 
  WHERE ANALUA.estoque.idEstoque = '${id}'`;

  connection.query(sql, function(err2, results){
    console.log(err2)

    if(results.length > 0){
      res.json(results);
    }else{
      res.json('error');
    }

})
})




app.post('/login_senha', (req, res) => {
  var email = req.body.email;
  var senha = req.body.senha;

  var sql = `SELECT * FROM usuarios WHERE login = '${email}' AND senha = '${senha}' LIMIT 1`;
  connection.query(sql, function(err2, results){

    if(results.length > 0){
      res.json(results);
    }else{
      res.json('error');
    }

  })

})

app.post('/cad_produto', (req, res) => {

let form = new formidable.IncomingForm();

//Process the file upload in Node
form.parse(req, function (error, fields, file) {


  if(fields.id_produto != null && fields.id_produto != ''){
    // JA TEM UM PRODUTO CADASTRADO COM O ID RECEBIDO
    
    
    if(JSON.parse(fields.sub_produto)){
 
    
    
      JSON.parse(fields.sub_produto).forEach(element => {
        
      var sql = `INSERT INTO ANALUA.estoque
                  (quantidade, cor, tamanho, custo,valor_venda, modelo) 
                  VALUES 
                  (${element.qtd}, ${element.cor}, ${element.tamanho}, '${element.custo}', '${element.valor_total}', ${fields.id_produto});`;
      connection.query(sql, function(err2, results){
       
      })
    
      });
     
    
    
    }

    res.json('sucesso');
    }else{
    // NÃO TEM UM PRODUTO CADASTRADO COM O ID RECEBIDO

   
    
  var sql = `INSERT INTO ANALUA.modelo
            (nome, categoria) 
            VALUES 
            ('${fields.nome_produto}', ${fields.categoria})`;

            connection.query(sql, function(err2, results){
             
              var id_novo_cadastro =  results.insertId;

              if(results){
        

                if(file.img != undefined){

                  let filepath = file.img.filepath;
                  let newpath = path.join(__dirname, '../public/assets/image/produtos/');
                  let regex = /[^.]*/;
                  newpath += file.img.originalFilename.replace(regex, results.insertId);
                //Copy the uploaded file to a custom folder
                fs.rename(filepath, newpath, function () {
  
                  var caminho_img = 'assets/image/produtos/'+file.img.originalFilename.replace(regex, results.insertId);
  
                  var sql = `UPDATE ANALUA.modelo SET img = '${caminho_img}' WHERE (id_modelo = ${results.insertId})`;
                  connection.query(sql)
                  
                });
                }

                



              if(JSON.parse(fields.sub_produto)){
    
    
                JSON.parse(fields.sub_produto).forEach(element => {
                  
                var sql = `INSERT INTO ANALUA.estoque
                            (quantidade, cor, tamanho, custo,valor_venda, modelo) 
                            VALUES 
                            (${element.qtd}, ${element.cor}, ${element.tamanho}, '${element.custo}', '${element.valor_total}', ${id_novo_cadastro});`;
                connection.query(sql, function(err2, results){
                  
                  if(results){
                   
                  }
                })
              
                });
               
              
              
              }

              

              }else{

                // res.json('error');
              }
              
              
            })

 

            


            res.json('sucesso');
    }
});







})

app.post('/lista_modelos', (req, res) => {
  
  var sql = `SELECT 
  ANALUA.modelo.id_modelo as idModelo,
  ANALUA.modelo.nome as NomeModelo,
  ANALUA.modelo.img as imgModelo,
  ANALUA.categorias.nome as NomeCategoria,
  ANALUA.categorias.id_categoria as idCategoria
FROM ANALUA.modelo
JOIN ANALUA.categorias ON ANALUA.categorias.id_categoria = ANALUA.modelo.categoria`;
  connection.query(sql, function(err2, results){
    res.json(results);
  })
})


app.post('/lista_categorias', (req, res) => {
  
  var sql = `SELECT * FROM ANALUA.categorias`;
  connection.query(sql, function(err2, results){
    res.json(results);
  })
})

app.post('/lista_cores', (req, res) => {
  
  var sql = `SELECT * FROM ANALUA.cores`;
  connection.query(sql, function(err2, results){
    res.json(results);
  })

})

app.post('/lista_tamanhos', (req, res) => {
  
  var sql = `SELECT * FROM ANALUA.tamanho`;
  connection.query(sql, function(err2, results){
    res.json(results);
  })
})






app.post('/consulta_modelo', (req, res) => {
  var id_modelo = req.body.id_visitante;
  
  var sql = `SELECT 
  ANALUA.modelo.id_modelo as idModelo,
  ANALUA.modelo.nome as NomeModelo,
  ANALUA.modelo.img as imgModelo,
  ANALUA.categorias.nome as NomeCategoria,
  ANALUA.categorias.id_categoria as idCategoria
FROM ANALUA.modelo
JOIN ANALUA.categorias ON ANALUA.categorias.id_categoria = ANALUA.modelo.categoria WHERE ANALUA.modelo.id_modelo = ${id_modelo}`;
  connection.query(sql, function(err2, results){
    res.json(results);
  })
})


app.post('/QueryListaEstoque', function (req, res) {
  
  var arrayLiteral2 = [];

  var sql = `SELECT ANALUA.estoque.idEstoque as IdEstoque,
  ANALUA.categorias.nome as NomeCategoria,
  ANALUA.modelo.nome as NomeModelo,
  ANALUA.modelo.img as imgModelo,
  ANALUA.estoque.modelo as IdModelo,
  ANALUA.tamanho.nome as NomeTamanho,
  ANALUA.estoque.valor_venda as ValorVenda,
  ANALUA.tamanho.idTamanho as IdTamanho,
  ANALUA.cores.nome as NomeCor,
  ANALUA.cores.idCores as IdCor,
  (SELECT SUM(ANALUA.estoque.quantidade) FROM ANALUA.estoque 
  WHERE ANALUA.estoque.cor = IdCor
  AND ANALUA.estoque.tamanho = IdTamanho
  AND ANALUA.estoque.modelo = IdModelo) as Quantidade
  FROM ANALUA.estoque
INNER JOIN ANALUA.modelo ON ANALUA.modelo.id_modelo = ANALUA.estoque.modelo
INNER JOIN ANALUA.categorias ON ANALUA.modelo.categoria = ANALUA.categorias.id_categoria
INNER JOIN ANALUA.tamanho ON ANALUA.tamanho.idTamanho = ANALUA.estoque.tamanho
INNER JOIN ANALUA.cores ON ANALUA.cores.idCores = ANALUA.estoque.cor
GROUP BY IdTamanho,IdCor,IdModelo

`;

  connection.query(sql, function(err2, results){

              
    results.forEach(e => {

      if(!e.imgModelo){
        var img = 'assets/image/produtos/noimage.gif';
      }else{
        var img = e.imgModelo;
      }

      var objeto = {
        id: e.IdEstoque,
        img:'<span style="display:none;">'+e.IdEstoque+'</span><img src="'+img+'" style="width: 45px;border-radius: 17%;">',
        codigo:e.IdEstoque+'-'+e.IdTamanho+'-'+e.IdCor,
        nome: '<span style="display:none;">'+e.IdModelo+'</span>'+e.NomeModelo,
        categoria: e.NomeCategoria,
        tamanho: e.NomeTamanho,
        cor: e.NomeCor,
        quantidade: e.Quantidade,
        ValorVenda: 'R$ '+e.ValorVenda
        
    }
  
          arrayLiteral2.push(objeto);
        })

        let saida = {
          "draw": 1,
          "recordsTotal": results.length,
          "recordsFiltered": results.length,
          "data": arrayLiteral2
        } 


        res.json(saida)

      })
})

function padLeft(nr, n, str){
  return Array(n-String(nr).length+1).join(str||'0')+nr;
}


app.post('/QueryPessoasVisitantes', function (req, res) {

  var arrayLiteral2 = [];

  var sql = `SELECT * FROM SIRIUS.cad_visitantes`;


  
          connection.query(sql, function(err2, results){
              
            results.forEach(e => {


              var btn = ``;


             var data_entrou = new Date(parseInt(e.data_cadastro));
      
              var dia  = data_entrou.getDate().toString().padStart(2, '0');
              var mes  = (data_entrou.getMonth()+1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
              var ano  = data_entrou.getFullYear();

              var hour   = data_entrou.getHours();
              var minute = data_entrou.getMinutes();
              var ap = "AM";
              if (hour   > 11) { ap = "PM";             }
              if (hour   > 12) { hour = hour - 12;      }
              if (hour   == 0) { hour = 12;             }
              if (hour   < 10) { hour   = "0" + hour;   }
              if (minute < 10) { minute = "0" + minute; }
            
            
            
              var data_cadastro = dia+'-'+mes+'-'+ano+' '+hour + ':' + minute + ' ' + ap;

           
              
              

             var objeto = {
                id: e.id_cad_visitantes,
                nome: e.nome,
                documento: e.documento,
                data_cadastro: data_cadastro,
                acao: btn
                
            }
          

            



            arrayLiteral2.push(objeto);
            })
            
            
            
            let saida = {
              "draw": 1,
              "recordsTotal": results.length,
              "recordsFiltered": results.length,
              "data": arrayLiteral2
            } 


            res.json(saida)
          })
})


server.listen(port, function () {
    console.log(`Servidor Carregado http://localhost:${server.address().port}`);
});