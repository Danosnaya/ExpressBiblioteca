
//var bookPersistence = new BookPersistence();

var DataSource = require('./../config/DataBaseConfig.js').DataSource;
var dataSource = new DataSource();

function callbackReturn(object ){
return object ;}

 BookService = function (){

var SELECT_LIBROS_DATA_LIST = "select L.isbn as id, L.titulo as title, E.id as edit_id, E.nombre as edit"
                                 + " from libros as L"
                                 + " join editorial as E on L.editorial_id = E.id "


var SELECT_LIBROS_DATA_LIST_AUTOR = " select L.isbn, P.nombre as author , P.apellido_paterno as author2 , P.apellido_materno as author3 "
                                   +" from libros as L"
                                   +" join libros_autores as LA on  LA.libros_id = L.isbn"
                                   +" join autores as A on A.id = LA.autor_id"
                                   +" join personas as P on p.curp = A.persona_curp"
                                   +" where L.isbn = 'IDX' "
                                   //+"order by  L.isbn"

var SELECT_LIBROS_DELETE_LIST = " delete from libros "
                                 + " where isbn = 'IDX'; "
                                 + " select L.isbn , L.titulo, E.id, E.nombre "
                                 + " from libros as L "
                                 + " join editorial as E on L.editorial_id = E.id "

this.getList= function (cb){
//var temporalLis = [];
    dataSource.executeQUERY(SELECT_LIBROS_DATA_LIST,{},function(bookList){
    for (var x = 0 ; x < bookList.length ; ++x){
        dataSource.executeQUERY(SELECT_LIBROS_DATA_LIST_AUTOR ,{IDX:bookList[x].id},function(autorList){
            bookList[x].author = autorList;
            //temporalLis.push(autorList);
           // console.log(" <<<<< Lista de libros >>>>>" +  JSON.stringify(bookList.title));
        });
    }
    //console.log("  --------------------- Regreso al For --------------------" +  JSON.stringify( bookList.author ));
    cb (bookList);
    });
}


this.getListauto = function (id,cb){
    dataSource.executeQUERY(SELECT_LIBROS_DATA_LIST_AUTOR ,{IDX:id},function(autorList){
    cb(autorList);
    }  );
}



this.findById = function (idparam,cb){
 dataSource.executeQUERY(SELECT_LIBROS_DATA_LIST,{},function(bookList){
 var libroResponse = null ;
 var listTemp = bookList;
 libroResponse  = bookList.find(book => book.id == idparam);

cb (libroResponse)
});
}

this.DeleteBook = function(idnew){
dataSource.executeQUERY(SELECT_LIBROS_DATA_LIST,{},function(bookList){
    libroResponse  = bookList.find(book => book.id == idnew);
    console.log("El ID del libro a eliminar es :: " + JSON.stringify(libroResponse.title));
    console.log("ELiminar-------------------------------------------------------------------------------------------------");
    var indx = libroResponse.id ;
            var listTemp = bookList;
            console.log("indx ::" +indx);
            console.log("El libro encontrado es ::" +JSON.stringify(libroResponse));
           dataSource.executeQUERY(SELECT_LIBROS_DELETE_LIST,{IDX:indx},function(bookList){});

            console.log("Los libros actuales son : " + JSON.stringify(bookList));
           //bookList.splice(indx - 1,1);

    });
}

this.findBook = function (id,author,edit,cb){
    var libroResponse = [] ;
    var liboritem= null ;
    var listTemp = this.bookList;
    var istrueid = true  ;
    var istrueauthor = true  ;
    var istrueedit = true  ;
           for (var item in listTemp){
           liboritem =listTemp[item];

           console.log("compare :: " + liboritem.author.includes(author));


           if (id != false ){
              if (liboritem.id != id  ){
                 istrueid = false;
              }
               else {
                  istrueid = true ;
               }
           }

            if (author != false ){
                     if (liboritem.author != author && !liboritem.author.includes(author) ){
                                     istrueauthor = false;
                     } else {
                     istrueauthor= true ;
                     }
                  }


            if (edit != false  ){
                     if (liboritem.edit != edit && !liboritem.edit.includes(edit)  ){
                        istrueedit = false;
                     } else {
                        istrueedit = true
                     }
                  }


              if ( istrueid && istrueauthor && istrueedit){
                        if (liboritem ){
                        libroResponse.push(liboritem);
                        }
                        else{
                        break;
              }
              } else {
                liboritem = null ;
              }

            }
            cb (libroResponse);
}

this.addBook = function (titlenew,authornew,editnew){
function getMAx( array){
    return array.reduce(function (a, b){
      var val =  Math.max(a.id, b.id);
      return  a.id == val ? a:b;

    });
  };
    var maxID = getMAx(this.bookList);
    console.log("Id mayor ::" + JSON.stringify(maxID.id));
    console.log("Nuevo Author :: " + authornew);
    console.log("Nuevo Titulo :: " + titlenew);
    console.log("Nuevo Editorial :: " + editnew);
     for(var idx = maxID.id; idx < (maxID.id + 2); ++idx){
          var newid = idx;
          }
      console.log("Nuevo ID :: " + newid);
    this.bookList.push({id: newid, "title":titlenew, "author":authornew, "edit":editnew});
}

this.editBook = function(idparam,titlenew,authornew,editnew, cb){

   // idguar= idparam;
   // console.log("Conservando id original :: " +JSON.stringify(idguar));

    var itscorrect = false ;
    for ( var iter in this.bookList ){
      if (this.bookList[iter].id == idparam){

      if (titlenew!= null && titlenew.trim() != "" ){
                  this.bookList[iter].title = titlenew;
            }

             if (authornew!= null && authornew.trim() != "" ){
                        this.bookList[iter].author = authornew;
                  }
                  if (editnew!= null && editnew.trim() != "" ){
                               this.bookList[iter].edit = editnew;
                         }


      itscorrect =true;
      }




      }
      cb(itscorrect);

    }

this.BuscaBook = function (id,edit,title,cb){
dataSource.executeQUERY(SELECT_LIBROS_DATA_LIST,{},function(bookList){
    var libroResponse = [] ;
    var liboritem= null;
    var listTemp = bookList;
    var istrueid = true  ;
  //  var istrueauthor = true  ;
    var istrueedit = true  ;
    var istruetitle = true  ;

        console.log("libros :: " +JSON.stringify(bookList));
            for (var item in listTemp){
        /*   listTemp[item].author = listTemp[item].author.toLowerCase();
           listTemp[item].title = listTemp[item].title.toLowerCase();
           listTemp[item].edit = listTemp[item].edit.toLowerCase();*/
            liboritem = listTemp[item];

           if (id != false ){
              if (liboritem.id != id  ){
                 istrueid = false;

              }
               else {
                  istrueid = true ;
               }
           }
/*
            if (author != false ){

                     if (liboritem.author.toLowerCase() != author && !liboritem.author.toLowerCase().includes(author) && liboritem.author.trim() != author){
                                     istrueauthor = false;

                     } else {
                     istrueauthor= true ;
                     }
                  }
*/
            console.log("la lista temporal es:: -------------------------------------------------------------------------------------\n" );
            if (edit != false  ){

                     if (liboritem.edit.toLowerCase() != edit && !liboritem.edit.toLowerCase().includes(edit) && liboritem.edit.trim() != edit) {
                        istrueedit = false;

                     } else {
                        istrueedit = true
                     }
                  }

            if (title != false  ){

                                 if (liboritem.title.toLowerCase() != title && !liboritem.title.toLowerCase().includes(title) &&liboritem.title.trim() != title ){
                                    istruetitle = false;

                                 } else {
                                    istruetitle = true
                                 }
                              }

              if ( istrueid || istrueedit || istruetitle){
                        if (liboritem ){
                        libroResponse.push(bookList[item]);
                        }
                        else{
                        break;
              }
              } else {
                liboritem = null ;
              }

            }
            console.log("el libro es: " +libroResponse)
            cb (libroResponse);
            });
}

}
exports.BookService = BookService;



