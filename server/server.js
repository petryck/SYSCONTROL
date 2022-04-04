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
const port = 6050



const server = http.Server(app);

const io = geckos()

app.use(cors())
app.use('/', express.static(path.join(__dirname, '../public')))


var connection = mysql.createConnection({
  host: "ads-con.csvfil6euj3s.sa-east-1.rds.amazonaws.com",
  user: "ads",
  port: "3286",
  password: "99659819aA",
  database: "db",
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




app.post('/cotacao_moedas_hoje', function (req, res) {
  let id = req.query.id;
  var data = new Date();
  var dia  = data.getDate().toString().padStart(2, '0');
  var mes  = (data.getMonth()+1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
  var ano  = data.getFullYear();

  var datainicio = mes+'-'+dia+'-'+ano;
 

  var sql = `SELECT moedas.id as MoedaId,
              moedas.id as MoedaId,
              moedas.simbolo as MoedaSimbolo,
              cotacao_moedas.abertura as MoedaAbertura
              FROM vz_moedas 
              JOIN moedas ON moedas.id = vz_moedas.moeda
              JOIN cotacao_moedas ON moedas.id = cotacao_moedas.moeda
              WHERE cotacao_moedas.data = '${datainicio}'`;

  connection.query(sql, function(err2, results){

       res.json(results);
  })

});





server.listen(port, function () {
    console.log(`Servidor Carregado http://localhost:${server.address().port}`);
});