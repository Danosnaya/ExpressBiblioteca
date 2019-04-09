const {Client} = require('pg');


DataSource2 = function () {


    const connectionData = {
        user: 'postgres',
        host: 'localhost',
        database: 'biblioteca',
        password: 'docker',
        port: 5432,
    };


    this.query = function (queryOptions) {
        const client = new Client(connectionData);
        client.connect();
        return client.query(queryOptions)
            .then(res => this.customReturn(res.rows))
            .catch(e => console.error(e.stack))
    }


    this.customReturn = function (data){
        console.log(data);
        return data;
    }

}
    exports.DataSource2 = DataSource2;
