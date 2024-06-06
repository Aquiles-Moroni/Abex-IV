const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {

var sqlserver = require('mssql');

var con = sqlserver.createConnection({
    user: "sa",
    server: "localhost\\SQLEXPRESS", 
    database: "Teste_Tech_Cadastro",
    port: "1433"
});

 con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM dbo.Categoria", function (err, result) {
    if (err) throw err;
    for(let i=0;i<2;i++){
        console.log(result[i].nome);}
    res.setHeader('Content-Type', 'text/html');
    res.write('<table border = 2><tr><td>Id:</td><td>Nome </td><td>Idade:</td></tr>');
    for (let i =0; i < 2; i++) {
        res.write('<h3><tr><td>' +  result[i].id + '</td><td>' + result[i].nome + '</td><td>' + result[i].idade + '</td></tr></h3>');
      }
      res.write('</table>');
    res.end();
  con.end();
  console.log("Conexão fechada!!");
  });

});
});
app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}')
  })