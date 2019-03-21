const { Client } = require('pg');



DataSource = function (){


const connectionData = {
    user: 'nomastrata',
    host: '',
    database: 'biblioteca',
    password: 'Kh@rt0um',
    port: 5432,
};

 this.executeQUERY = function (query , params , cb){
 const client = new Client(connectionData);
 var resultSet;
var intryset = Object.entries(params) ;
for (var nodo in intryset ){
console.log ("key ["+ intryset [nodo][0]+"] value :: " + intryset [nodo][1]);
  query = query.replace(intryset [nodo][0], intryset [nodo][1]);
}
console.log ( query );

client.connect()
client.query(query)
    .then(response => {
                  resultSet =response.rows ;
              console.log (" Query ["+query+"] \n Resultset :: "  + JSON.stringify (resultSet));
         cb (resultSet);

        client.end()
    })
    .catch(err => {
        client.end()
    })
 }

}

exports.DataSource = DataSource;


