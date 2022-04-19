import geckos from '@geckos.io/server'
import mysql from 'mysql'
import express from 'express'
const app = express()
import path from 'path'
import cors from 'cors'
import http from 'http'


import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const port = 3265



const server = http.Server(app);

const io = geckos()

app.use(cors())
app.use('/', express.static(path.join(__dirname, '../public')))


var connection = mysql.createConnection({
  host: "144.22.225.253",
  user: "aplicacao",
  port: "3306",
  password: "conline@2510A",
  database: "SIRIUS",
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


server.lastPlayderID = 0;
var players = [];

io.addServer(server)

io.onConnection(channel => {
    
  channel.on('ready', data => {

    channel.player = {
      id: data.id,
      nome: data.nome,
      token:data.token
  }; 



  
  })

    

    channel.on('SendMessege', data => {

      var saida_player = {
        id: channel.player.id,
        msg: data,
        name: channel.player.name
    };
    console.log(saida_player)

    channel.broadcast.emit('SendMessege',saida_player);
    })


    

    channel.onDisconnect(() => {
      // console.log(channel)
   
      console.log(channel.player.id+' removido')

   
      io.emit('remove',channel.player.id);
    

     players = players.filter((item) => item.id !== channel.player.id);
  
      
    })

      channel.emit('ready') 

})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  })


app.get('/app', (req, res) => {
  
  res.sendFile(path.join(__dirname, '../public/apps/'+req.query.pagina+'.html'))
})

app.get('/app_janela', (req, res) => {
  
  res.sendFile(path.join(__dirname, '../public/janelas/'+req.query.pagina+'.html'))
})

app.post('/QueryListaEstoque', function (req, res) {
  
  var arrayLiteral2 = [];

  var sql = `SELECT ANALUA.estoque.idEstoque as IdEstoque,
            ANALUA.categorias.nome as NomeCategoria,
            ANALUA.modelo.nome as NomeModelo,
            ANALUA.estoque.modelo as IdModelo,
            ANALUA.tamanho.nome as NomeTamanho,
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

      var objeto = {
        id: e.IdEstoque,
        nome: e.NomeModelo,
        categoria: e.NomeCategoria,
        tamanho: e.NomeTamanho,
        cor: e.NomeCor,
        quantidade: e.Quantidade
        
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