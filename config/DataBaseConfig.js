const { Client } = require('pg');



DataSource = function (){


const connectionData = {
    user: 'nomastrata',
    host: '',
    database: 'biblioteca',
    password: 'Kh@rt0um',
    port: 5432,
};
 const client = new Client(connectionData);



 this.executeQUERY = function (query , params , cb){
 var resultSet;
var intryset =Object.entries(params) ;
for (var nodo in intryset ){
console.log ("key ["+ intryset [nodo][0]+"] value :: " + intryset [nodo][1]);
  query = query.replace(intryset [nodo][0], intryset [nodo][1]);
}
console.log (query );

client.connect()
client.query(query)
    .then(response => {
        console.log(response.rows);
        resultSet =response.rows ;
        client.end()
    })
    .catch(err => {
        client.end()
    })

 cb (resultSet)
 }

 this.executeRESPONSE = function(respons, libros , cb ){

 }

}



 module.export = DataSource ;

