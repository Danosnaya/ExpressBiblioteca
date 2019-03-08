
//var bookPersistence = new BookPersistence();

 BookService = function (){
 this.bookList= [
                             {id:1,"title": "Sistemas de Comunicaciones Electronicas","edit":"Prentice-Hall","author":"Tomasi"},
                             {id:2,"title": "Señales y Sistemas" ,"edit" : "Prentice", "author" : "Willsky"},
                             {id:3,"title": "Analisis de fourier" , "edit" : "Pearson", "author" : "Hsu"}
                             ]

this.getList= function (cb){
cb (this.bookList);
}

this.findById = function (idparam,cb){
 var libroResponse = null ;
 var listTemp = this.bookList;
 libroResponse  = this.bookList.find(book => book.id == idparam);

cb (libroResponse)
}

this.DeleteBook = function(idnew, cb){

    libroResponse  = this.bookList.find(book => book.id == idnew);
    var indx = libroResponse.id ;
            var listTemp = this.bookList;
            console.log("indx ::" +indx);
            console.log("El libro encontrado es ::" +JSON.stringify(libroResponse));
            //delete this.bookList[indx]
            this.bookList.splice(indx - 1,1);

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

this.BuscaBook = function (id,author,edit,title,cb){
    var libroResponse = [] ;
    var liboritem= null;
    var listTemp = this.bookList;
    var istrueid = true  ;
    var istrueauthor = true  ;
    var istrueedit = true  ;
    var istruetitle = true  ;

        console.log("libros :: " +JSON.stringify(this.bookList));
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

            if (author != false ){

                     if (liboritem.author.toLowerCase() != author && !liboritem.author.toLowerCase().includes(author) && liboritem.author.trim() != author){
                                     istrueauthor = false;

                     } else {
                     istrueauthor= true ;
                     }
                  }


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

              if ( istrueid || istrueauthor || istrueedit || istruetitle){
                        if (liboritem ){
                        libroResponse.push(this.bookList[item]);
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
}


exports.BookService = BookService;



