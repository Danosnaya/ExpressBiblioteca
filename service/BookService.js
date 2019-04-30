//var bookPersistence = new BookPersistence();

var DataSource = require('./../config/DataBaseConfig.js').DataSource;
var dataSource = new DataSource();

var BookPersistance = require('./../persistence/BookPersistence.js').BookPersistance;
var bookPersistance = new BookPersistance();


BookService = function () {


    this.getListauto = function (id, cb) {
       return bookPersistance.getAuthorByBook(id).then(res => cb(res));
    }


    this.getList = function (cb ) {
       return bookPersistance.getBookList().then(res => cb(res));
    }

    this.findById = function (idparam, cb) {
        return bookPersistance.idfind(idparam).then(res => cb(res));
    }

    this.deleteBook = function (idnew,indx, cb) {
        return bookPersistance.deleteBookcont(indx).then(res => cb(res));
    }


    this.editBook = function (idparam, titlenew, editnew, pagnew, resumnew,libro_edit_id,cb) {
        console.log(idparam);
        console.log(titlenew);
        console.log(editnew);
        console.log(pagnew);
        console.log(resumnew);
        console.log(libro_edit_id);
        bookPersistance.editBooksAllb(titlenew, idparam).then(res => {
            bookPersistance.editBooksAllT(pagnew,idparam).then(res => {
                bookPersistance.editBooksAllTR(resumnew,idparam).then(res => {
                    bookPersistance.editBooksAllEdito(editnew,libro_edit_id).then(res => {cb (res)});
                cb (res)});
            cb (res)});
        cb (res)});

    }

    this.addBook = function (bookscomplete, titlenew, editnew, numpagina, resumnew , authornew , apellpat , apellmat, cb) {
        var ids = [];
        var idposibles = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

            for (var y = 0; y < bookscomplete.length; y++) {
                ids.push(bookscomplete[y].id);
            }
            var idnum = bookscomplete.length + 1;
            var idnumlibr = idnum + 1;
            for (var x = 0; x < 27; x++) {
                var cletra = idposibles[Math.floor(Math.random() * idposibles.length)];
                if (ids != cletra && !ids.includes(cletra)) {
                    break;
                }
            }
            var caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var curp = "";
            var max = caracteres.length-1;
            for (var i = 0; i<15; i++) {
                curp += caracteres[ Math.floor(Math.random() * (max+1)) ];
            }
            var meseposibles = new Array('15 de Enero 1988', '12 de Febrero 1976', '21 de Marzo 1983', '30 de Abril 1991', '10 Mayo de 1989', '29 de Junio 1985', '31 de Julio 1975', '1 de Agosto 1982', '6 de Septiembre 1987', '15 de Octubre 1978', '21 de Noviembre 1984', '24 de Diciembre 1980');
            for (var x = 0; x < 1; x++) {
                  var randmese = meseposibles[Math.floor(Math.random() * idposibles.length)];
            }

            var mesepubli = new Array('15 de Enero 2001', '12 de Febrero 2002', '21 de Marzo 2004', '30 de Abril 2000', '10 Mayo de 1999', '29 de Junio 2006', '31 de Julio 1998', '1 de Agosto 2004', '6 de Septiembre 2001', '15 de Octubre 2007', '21 de Noviembre 2010', '24 de Diciembre 1998');
            for (var x = 0; x < 1; x++) {
                 var fecha = mesepubli[Math.floor(Math.random() * idposibles.length)];
            }

        bookPersistance.addbookPerEdito(idnum,editnew).then(res =>{
                bookPersistance.addbookPerBook(cletra,titlenew,numpagina,resumnew,idnum).then(res =>{
                        bookPersistance.addbookPerPerson(curp, authornew , apellmat , apellpat, randmese).then(res =>{
                                bookPersistance.addbookPerAuthor(idnum, curp, fecha ).then(res => {
                                        bookPersistance.addbookPerBookAuthor(idnumlibr,idnum, cletra).then(res => {cb (res)});
                                cb (res)});
                        cb (res)});
                cb(res)});

        cb(res)});

    }

    this.BuscaBook = function (bookscomplete,id, edit, title,author, cb) {

            var libroResponse = [];
            var liboritem = null;
            var listTemp = bookscomplete;
            var istrueid = true;
            var istrueedit = true;
            var istruetitle = true;

            for (var item in listTemp) {
                listTemp[item].title = listTemp[item].title.toLowerCase();
                listTemp[item].edit = listTemp[item].edit.toLowerCase();
                liboritem = listTemp[item];

                if (id != false) {
                    if (liboritem.id != id) {
                        istrueid = false;

                    }
                    else {
                        istrueid = true;
                    }
                }

                if (edit != false) {

                    if (liboritem.edit.toLowerCase() != edit && !liboritem.edit.toLowerCase().includes(edit) && liboritem.edit.trim() != edit) {
                        istrueedit = false;

                    } else {
                        istrueedit = true
                    }
                }

                if (title != false) {

                    if (liboritem.title.toLowerCase() != title && !liboritem.title.toLowerCase().includes(title) && liboritem.title.trim() != title) {
                        istruetitle = false;

                    } else {
                        istruetitle = true
                    }
                }

                if (istrueid || istrueedit || istruetitle ) {
                    if (liboritem) {
                        libroResponse.push(bookscomplete[item]);
                    }
                    else {
                        break;
                    }
                } else {
                    liboritem = null;
                }

            }
            cb(libroResponse);
    }

}
exports.BookService = BookService;



