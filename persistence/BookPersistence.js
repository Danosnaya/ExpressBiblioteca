
var bookList =[];

getlist();


function addBook(titlenew, authornew, editnew){
  var titlenew = req.body.Titlenew;
  var authornew = req.body.Authornew;
  var editnew = req.body.Editorialnew;


   var maxID =getMAx(myobj.libros);
  console.log("Id mayor ::" + JSON.stringify(maxID.id));
  console.log("Nuevo Author :: " + authornew);
  console.log("Nuevo Titulo :: " + titlenew);
  console.log("Nuevo Editorial :: " + editnew);
   for(var idx = maxID.id; idx < (maxID.id + 2); ++idx){
        var newid = idx;
        }
    console.log("Nuevo ID :: " + newid);
  myobj.libros.push({id: newid, "title":titlenew, "author":authornew, "edit": editnew});
  res.render('libros',myobj);
    //{libros :[{"title": titlenew, "author": authornew, "edit": editnew}]};
};

function findBook(idparam ){
 console.log("param id :: " +  req.params.id );
 var idparam = req.params.id;
 var listTemp =myobj.libros;
 var libroResponse = null ;
 for (var item in listTemp){
 console.log("comparando con  " + listTemp[item].id);

    if (listTemp[item].id == idparam){
    console.log("ya lo encontre");
      libroResponse = listTemp[item];
      break;
    }
   }
 if(libroResponse != null){
    res.send(libroResponse);
    //res.render()
   }
 else{
   res.status(404);
   }


};

function filter(parameters){
console.log("data " + JSON.stringify(req.query));
    var libroResponse = null ;

    if(req.query.author != undefined || req.query.id != undefined || req.query.edit!= undefined ){

        var id = req.query.id!== undefined  ? req.query.id : false;
        var author = req.query.author!== undefined ? req.query.author : false;
        var edit = req.query.edit!== undefined? req.query.edit:false;
        var listTemp = myobj.libros;


       var istrueid = true  ;
       var istruesuthor = true  ;
       var istrueedit = true  ;

       for (var item in listTemp){
       libroResponse =listTemp[item];
       if (id != false ){
          if (libroResponse.id != id  ){
             istrueid = false;
          }
           else {
              istrueid = true ;
           }
       }

        if (author != false ){
                 if (libroResponse.author != author  ){
                                 istruesuthor = false;
                 } else {}
                 istruesuthor= true ;
              }


        if (edit != false ){
                 if (libroResponse.edit != edit  ){
                    istrueedit = false;
                 } else {
                    istrueedit = true
                 }
              }


          if ( istrueid && istruesuthor && istrueedit){
                    break;

          } else {
            libroResponse = null ;
          }

        }


        res.send(libroResponse);


} else {
        res.send(libroResponse);

}
}

delete(id ){}