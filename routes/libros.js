var express = require('express');
var router = express.Router();

var BookService = require('./../service/BookService.js').BookService;
var bookService = new BookService();


router.get('/', function(req, res, next) {
       bookService.getList(function (books ){
           var result = {};
           result.title = "Libros ";
           result.books =  books;
           res.render('libros',result);
});
});


router.get('/:id/authors' ,function(req,res ,next) {
    var isbn = req.params.id;
    bookService.getListauto( isbn ,function (authors) {
        res.send(authors);
    });
});

// ejemple de path params   :::   libros/1    libros/2
router.get('/:id/detail', function (req, res, next) {
        var idparam = req.params.id;
        bookService.findById(idparam , function (libroResponse){
        res.render('detail',libroResponse[0]);
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

router.post('/busqueda', function(req, res, next){
    req.body.ParamBus = req.body.ParamBus.toLowerCase();
    var id = req.body.ParamBus;
    var title = req.body.ParamBus;
    var edit = req.body.ParamBus;
    if (id == "" && edit == "" && title == ""){
            res.status(404).send('Ningun Parametro se escribio para la busqueda');
    }
    else {
        bookService.getList(function (bookscomplete){
            bookService.BuscaBook(bookscomplete,id,edit,title, function(libroResponse){
                var result = {};
                result.title = "Resultado de busqueda";
                result.libroResponse =  libroResponse;
                res.render('search',result);
            });
        });
    }
});

  router.post('/agregar', function(req, res){
  var titlenew = req.body.Titlenew;
  var resumnew = req.body.Resume;
  var numpagina = req.body.Numpag;
  var authornew = req.body.Authornew;
  var apellpat = req.body.ApellPat;
  var apellmat = req.body.ApellMat;
  var editnew = req.body.Editorialnew;
  bookService.getList(function (bookscomplete){
    bookService.addBook(bookscomplete,titlenew,editnew,numpagina,resumnew,authornew,apellpat,apellmat, function (libros){});
    res.render('redirecc', {formName:'Redireccionando a la pagina principal'});
   });
});

router.post('/:id/edit', function(req, res){
         var idparam = req.params.id;
         var titlenew = req.body.Newtit;//!== undefined  ? req.body.Newtit : false;
         var editnew = req.body.Newedito;//!== undefined  ? req.body.Newedito : false;
         var authornew = req.body.Newauth;//!== undefined  ? req.body.Newauth : false;
         var pagnew = req.body.Newpag;
         var resumnew = req.body.Newres
         bookService.findById(idparam , function (libroResponse){
            var libro_edit_id = libroResponse[0].edit_id;
            bookService.editBook(idparam,titlenew,editnew,pagnew,resumnew,libro_edit_id,function(booksnew){
            });
            res.render('Princip', {formName:'Redireccionando a la pagina de detalle para ver cambios',idpag :idparam});
        });
});

router.get('/:id/eliminar', function(req, res, next){
    var idnew = req.params.id;
    bookService.getList(function (books ){
      bookService.findById(idnew,function (libroResponse){
      var indx = libroResponse[0].id;
              console.log(libroResponse);
              console.log("indx "  + indx);
          bookService.deleteBook(idnew, indx, function(booksnew){});
          res.render('redirecc', {formName:'Redireccionando a la pagina principal'});

    });
    });
});

module.exports = router;