const {Client} = require('pg');


DataSource = function () {


    const connectionData = {
        user: 'postgres',
        host: 'my_postgres',
        database: 'biblioteca',
        password: '1234567',
        port: 5432,
    };

    this.executeQUERY = function (query, params, cb) {
        const client = new Client(connectionData);
        var resultSet;
        const query2 = {
            name: 'get-name',
            text: query,
            values: params,
            rowMode: 'Array'
        }
        console.log(query2);

        client.connect()
        client.query(query2)
            .then(response => {
            resultSet = response.rows;
        console.log("\n \n>  Query [" + query + "] \n \n>  Resultset :: " + JSON.stringify(resultSet));
        cb(resultSet);
        client.end()
    })
    .
        catch(e => console.error(e.stack)
    )
    .
        then(() => client.end()
    )

    }

    this.consumeComplete = function (data) {
        console.log(data);
        return data;
    }

}


exports.DataSource = DataSource;


