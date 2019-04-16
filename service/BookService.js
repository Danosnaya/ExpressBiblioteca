//var bookPersistence = new BookPersistence();

var DataSource = require('./../config/DataBaseConfig.js').DataSource;
var dataSource = new DataSource();

var BookPersistance = require('./../persistence/BookPersistence.js').BookPersistance;
var bookPersistance = new BookPersistance();

var SELECT_LIBROS_DELETE_LIST = " delete from libros "
    + " where isbn = 'IDX'; "
    + " select L.isbn , L.titulo, E.id, E.nombre "
    + " from libros as L "
    + " join editorial as E on L.editorial_id = E.id "

var SELECT_LIBROS_ADD_LIST = " insert into editorial(id,nombre) values(IDSN,'EDITOR');"
    + " insert into libros(isbn,titulo,resumen,numpaginas,editorial_id) values('ISBNAU','TITULO','RESE',NOPAG, IDNS);"

var SELECT_LIBROS_EDIT_LIST = " UPDATE libros SET titulo = 'TITLEEDIT', numpaginas = PAGEDIT, resumen = 'RESUEDIT' WHERE isbn = 'IDORI'; "
    + " UPDATE Editorial SET nombre = 'EDITEDIT' WHERE id = EDIDORI;"


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

    this.DeleteBook = function (idnew) {
        dataSource.executeQUERY(SELECT_LIBROS_DATA_LIST, {}, function (bookList) {
            libroResponse = bookList.find(book => book.id == idnew
        )
            ;
            console.log("El ID del libro a eliminar es :: " + JSON.stringify(libroResponse.title));
            console.log("ELiminar-------------------------------------------------------------------------------------------------");
            var indx = libroResponse.id;
            var listTemp = bookList;
            console.log("indx ::" + indx);
            console.log("El libro encontrado es ::" + JSON.stringify(libroResponse));
            dataSource.executeQUERY(SELECT_LIBROS_DELETE_LIST, {IDX: indx}, function (bookList) {
            });

            console.log("Los libros actuales son : " + JSON.stringify(bookList));

        });
    }

    this.addBook = function (titlenew, editnew, numpagina, resumnew) {
        console.log("aqui Llego ::");
        var ids = [];
        var idposibles = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
        dataSource.executeQUERY(SELECT_LIBROS_DATA_LIST, {}, function (bookList) {
            for (var y = 0; y < bookList.length; y++) {
                console.log("----------------------------------------------------los id son: " + JSON.stringify(bookList[y].id));
                ids.push(bookList[y].id);
            }
            var idnum = bookList.length + 1;
            console.log("El numero de id es :: " + idnum);
            for (var x = 0; x < 27; x++) {
                var cletra = idposibles[Math.floor(Math.random() * idposibles.length)];
                if (ids != cletra && !ids.includes(cletra)) {
                    break;
                }
            }
            console.log("-----------------el aleatorio es ::" + cletra);

            dataSource.executeQUERY(SELECT_LIBROS_ADD_LIST, {
                IDSN: idnum,
                IDNS: idnum,
                EDITOR: editnew,
                ISBNAU: cletra,
                TITULO: titlenew,
                RESE: resumnew,
                NOPAG: numpagina
            }, function (bookList) {
            });

        });
    }

    this.editBook = function (idparam, titlenew, authornew, editnew, pagnew, resumnew) {
        console.log("IDparam ::" + idparam);
        this.findById(idparam, function (libroResponse) {
            console.log("estoy aqui..." + JSON.stringify(libroResponse));
            dataSource.executeQUERY(SELECT_LIBROS_EDIT_LIST, {
                TITLEEDIT: titlenew,
                EDITEDIT: editnew,
                PAGEDIT: pagnew,
                RESUEDIT: resumnew,
                IDORI: idparam,
                EDIDORI: libroResponse.edit_id
            }, function (bookList) {
            });

        });

    }

    this.BuscaBook = function (bookscomplete,id, edit, title, cb) {

            var libroResponse = [];
            var liboritem = null;
            var listTemp = bookscomplete;
            var istrueid = true;
            //var istrueauthor = true  ;
            var istrueedit = true;
            var istruetitle = true;

            for (var item in listTemp) {
              //  listTemp[item].author = listTemp[item].author.toLowerCase();
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

               /* if (author != false ){

                     if (liboritem.author.toLowerCase() != author && !liboritem.author.toLowerCase().includes(author) && liboritem.author.trim() != author){
                             istrueauthor = false;

                     } else {
                        istrueauthor= true ;
                     }
                }*/

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

                if (istrueid || istrueedit || istruetitle) {
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



