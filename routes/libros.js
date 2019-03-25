var express = require('express');
var router = express.Router();

var BookService = require('./../service/BookService.js').BookService;
var bookService = new BookService();

/*
client.connect()
  client.query('SELECT * FROM table')
    .then(response => {
        console.log(response.rows)
        client.end()
    })

    .catch(err => {
        client.end()
    })

*/
/* GET home page. */
//bookService.getListauto(function(author){
     // console.log("result es :: " +JSON.stringify(result))
    //  var result2 = {};
    //  result2.author = author;
       //  } );
router.get('/', function(req, res, next) {
    var result = {};
    var result2 = [];
    bookService.getList(function(books){

    console.log(" los libros son :: " + JSON.stringify(books));
/*
        for (var x = 0 ; x < books.length ; ++x){
            bookService.getListauto(books[x].id, function(authors){
               result2.push(authors);
                console.log("--------------- Authoress ------------:: " + JSON.stringify(result2));
            });

        }
        console.log("Esta linea Imprime result2 ------------:: " + JSON.stringify(result2));*/
            result.title ="Libros ";
            result.books = books;
       //     result.author = result2;
       //     console.log("--------------- libros ------------:: " + JSON.stringify(result));
            res.render('libros',result);
} );

});

// ejemple de path params   :::   libros/1    libros/2
router.get('/:id/detail', function (req, res, next) {
     var idparam = req.params.id;
    bookService.findById(idparam,function (libroResponse){
    console.log ("estoy aqui..." +JSON.stringify(libroResponse));
    res.render('detail',libroResponse);
    });
    });

// query params   libros/search?author="fulanito"  or libros/search?id=3&editorial=""
router.get('/search', function (req, res, next) {
  console.log("data " + JSON.stringify(req.query));
    var libroResponse = null ;

    if( req.query.id != undefined || req.query.author != undefined || req.query.edit!= undefined ){

        var id = req.query.id!== undefined  ? req.query.id : false;
        var author = req.query.author!== undefined ? req.query.author : false;
        var edit = req.query.edit!== undefined? req.query.edit:false;
            bookService.findBook(id,author,edit,function(libroResponse){
            var result = {};
            result.libroResponse = libroResponse;
            res.render('search',result);
            //res.send(libroResponse);
        });
} else {
        res.status(404).send('Not Found');
}
});

router.get('/busqueda', function(req, res, next) {
           res.render('busca', { Name: 'Busqueda de un libro' });
         });

router.post('/busqueda', function(req, res, next){
    req.body.ParamBus = req.body.ParamBus.toLowerCase();
    var id = req.body.ParamBus;
    var title = req.body.ParamBus;
    //var author = req.body.ParamBus;
    var edit = req.body.ParamBus;

    console.log("XD :: " + id);
    console.log("XD :: " + title);
   // console.log("XD :: " + author);
    console.log("XD :: " + edit);
    if (id == "" /*&& author == ""*/ && edit == "" && title == ""){
            res.status(404).send('Ningun Parametro se escribio para la busqueda');
    }
    else {    bookService.BuscaBook(id,edit,title,function(libroResponse){
                    var result = {};
                    result.libroResponse = libroResponse;
                    res.render('search',result);
                });
    }
});

  router.get('/agregar', function(req, res, next) {
    res.render('agregar', { title: 'Formulario para agregar un Libro' });
  });

  router.post('/agregar', function(req, res){
  var titlenew = req.body.Titlenew;
  var authornew = req.body.Authornew;
  var editnew = req.body.Editorialnew;
      console.log("aqui ::")

  bookService.addBook(titlenew,authornew,editnew,function(){
  });
    res.render('redirecc', {formName:'Redireccionando a la pagina principal'});
  /*bookService.getList(function(books){
   var result = {};
   result.title ="Libros ";
   result.books = books;
   res.render('libros',result);
   });*/

   });

   /*
 get   /libros/{id}/edit
   find (id)

    existe  render.(edit,{libro})
    no existe  error


put /libros/{id}/edit?athor & edith? title

  update

   redirect  /libors /id/detail */




router.get('/:id/edit', function(req, res, next){
        var idparam = req.params.id;
            bookService.findById(idparam,function (libroResponse){
            console.log ("Este libro se va a editar :: " +JSON.stringify(libroResponse));
            libroResponse.formName='Formulario para Editar un Libro';
            res.render('Editor',libroResponse);

         });

});

router.post('/:id/edit', function(req, res){
        var idparam = req.params.id;
   //   console.log("libro a editar :: " +JSON.stringify(libroResponse));
         var titlenew = req.body.Newtit;//!== undefined  ? req.body.Newtit : false;
         var editnew = req.body.Newedito;//!== undefined  ? req.body.Newedito : false;
         var authornew = req.body.Newauth;//!== undefined  ? req.body.Newauth : false;

         var flag = false ;
         flag = bookService.editBook(idparam,titlenew,authornew,editnew,function(itscorrect ){
         return  itscorrect;
         });

         console.log("value "+ flag);
         res.render('Princip', {formName:'Redireccionando a la pagina principal',idpag : idparam});
      /*   bookService.getList(function(books){
            var result = {};
            result.title ="Libros ";
            result.books = books;
            res.render('libros',result);
            });*/
});

router.get('/:id/eliminar', function(req, res, next){
    var idnew = req.params.id;
      bookService.findById(idnew,function (libroResponse){
      if (libroResponse != null){
        bookService.DeleteBook(idnew,function(){});
        res.render('redirecc', {formName:'Redireccionando a la pagina principal'});
         }
      else {
            res.status(404).send('Not Found');
      }
    });
});

/*
router.get('/eliminar', function(req, res, next){
    res.render('Eliminar', { title: 'Eliminar un libro'});
});

router.post('/eliminar', function(req, res){
  var idnew = req.body.IDnew;
  bookService.findById(idnew,function (libroResponse){
  if (libroResponse != null){
    bookService.DeleteBook(idnew,function(){});
    res.render('redirecc', {formName:'Redireccionando a la pagina principal'});
     }
  else {
        res.status(404).send('Not Found');
  }
});
});*/
module.exports = router;