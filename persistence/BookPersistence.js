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

var SELECT_LIBROS_ADD_LIST_EDITO = " insert into editorial(id,nombre) values($1, $2);";
var SELECT_LIBROS_ADD_LIST_BOOK = " insert into libros(isbn,titulo,resumen,numpaginas,editorial_id) values($1, $2, $3, $4, $5);" ;
var SELECT_LIBROS_ADD_LIST_PERSON = " insert into personas(curp,nombre,apellido_paterno,apellido_materno,fecha_nacimiento) values($1, $2, $3, $4, $5);";
var SELECT_LIBROS_ADD_LIST_AUTOR = " insert into autores(id,persona_curp,fechapubl,bibliografia) values ($1, $2, $3, 'Biografiy');";
var SELECT_LIBROS_ADD_LIST_BOOK_AUTOR = " insert into libros_autores(id,autor_id,libros_id) values ($1, $2, $3);";


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

    this.addbookPerEdito = function (idnum,editnew){
        queryOptions.text = SELECT_LIBROS_ADD_LIST_EDITO;
        queryOptions.values = [idnum, editnew]
    return   dataSource.query(queryOptions);
    }

    this.addbookPerBook = function (cletra,titlenew,numpagina,resumnew,idnum){
        queryOptions.text = SELECT_LIBROS_ADD_LIST_BOOK;
        queryOptions.values = [cletra, titlenew, resumnew, numpagina,idnum]
    return   dataSource.query(queryOptions);
    }

    this.addbookPerPerson = function (curp, authornew , apellpat , apellmat , randmese){
         queryOptions.text = SELECT_LIBROS_ADD_LIST_PERSON;
         queryOptions.values = [curp, authornew , apellpat , apellmat , randmese]
    return   dataSource.query(queryOptions);
    }

    this.addbookPerAuthor = function (idnum, curp, fecha){
         queryOptions.text = SELECT_LIBROS_ADD_LIST_AUTOR;
         queryOptions.values = [idnum, curp, fecha]
    return   dataSource.query(queryOptions);
    }

    this.addbookPerBookAuthor = function (idnumlibr,idnum, cletra){
         queryOptions.text = SELECT_LIBROS_ADD_LIST_BOOK_AUTOR;
         queryOptions.values = [idnumlibr,idnum, cletra]
    return   dataSource.query(queryOptions);
    }

 }

exports.BookPersistance =BookPersistance;
