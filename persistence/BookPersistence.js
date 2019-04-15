var DataSource2 = require('./../config/DBConfiguration.js').DataSource2;
var dataSource = new DataSource2();


var SELECT_LIBROS_DATA_LIST = " select L.isbn as id, L.titulo as title,  L.numpaginas as pag , L.resumen as resu, E.id as edit_id, E.nombre as edit "
    + " from libros as L"
    + " join editorial as E on L.editorial_id = E.id "
    + " order by  L.isbn ";

var SELECT_LIBROS_DATA_LIST_AUTOR = " select L.isbn, P.nombre as author , P.apellido_paterno as author2 , P.apellido_materno as author3 "
    + " from libros as L"
    + " join libros_autores as LA on  LA.libros_id = L.isbn"
    + " join autores as A on A.id = LA.autor_id"
    + " join personas as P on p.curp = A.persona_curp"
    + " where L.isbn = $1 ";


var SELECT_LIBROS_DATA_LIST_ID = " select L.isbn as id, L.titulo as title,  L.numpaginas as pag , L.resumen as resu, E.id as edit_id, E.nombre as edit, "
        + " P.nombre as author , P.apellido_paterno as author2 , P.apellido_materno as author3 "
        + " from libros as L"
        + " join libros_autores as LA on  LA.libros_id = L.isbn"
        + " join autores as A on A.id = LA.autor_id"
        + " join personas as P on p.curp = A.persona_curp"
        + " join editorial as E on L.editorial_id = E.id "
        + " where L.isbn = $1 ";

BookPersistance = function () {

    const queryOptions = {
        text: "query",
        values: []
     }

    this.getBookList = function () {
        queryOptions.text=SELECT_LIBROS_DATA_LIST;
        queryOptions.values=[];
        return   dataSource.query(queryOptions );
    }


    this.getAuthorByBook = function (id) {
        queryOptions.text=SELECT_LIBROS_DATA_LIST_AUTOR;
        queryOptions.values=[id]
        return dataSource.query(queryOptions );
    }

    this.idfind = function (idparam) {
        queryOptions.text=SELECT_LIBROS_DATA_LIST_ID;
        queryOptions.values=[idparam]
        return   dataSource.query(queryOptions );
    }


 }

exports.BookPersistance =BookPersistance;
