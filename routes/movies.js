var express = require('express');
var router = express.Router();


const moviesController = require('./../controllers/movies.controller');
const {Movie} = require('../models/movie');

/* GET movies listing. */
/* GET games listing. */
router.get('/', moviesController.read);

//games/delete/?
router.post('/delete/:id', (req, res, next) => {
   let id = req.params.id;

  Movie.destroy({
       where: {
             id: id 
        }
    }).then(() => {
        res.redirect('/movies/');
     }).catch((err) => {
        console.error('Error trying to delete Movie', err);
        res.redirect('/movies/');
    });
   //TODO: Handle Promise
 });

 //GET movie/create
router.get('/create', (req,res,next) => {

    res.render('movies/form', {
        title: 'Create Movie',
        action:'create'
    });
});

router.post('/create', (req,res,next) => {
    console.log(req.body);

    let name = req.body.name;

    if  (name === undefined || name === null || name === ''){
       return res.render('movies/form',{errorMessage: 'Please type a valid name.'})
    }

    let movie = {
      //name:name
      name,  
    };

    //Crear nuevo Movie y guarar en la base de datos
    Movie.create(movie)
    //caso de exito
    .then(() => {
        res.redirect('/movies')
    })
    //caso de error
    .catch((err) => {
        //imprimir que ocurrio un error
        console.error('Error trying to create Movie')
        //volver a enviar el formulario con HMTL
        res.render('movies/form')
    });
    

    // res.send('Hola')
});

router.get('/update/:id', (req, res, next) => {

    let id = req.params.id;
    
    //SELECT * FROM games WHERE id = 4;
    Movie.findAll({
        where: {
            id: id
        }
    }).then((movies) => {
        let movie = movies[0];

        res.render('movies/form', {
            movie: movie,
            title: 'Update Movie',
            action: 'update'
        });
    }).catch(() => {
        console.error('Error trying to render update form', err);
        res.redirect('/games');
    });
    
});

router.post('/update', (req, res, next) => {
    let id = req.body.id;
    let name = req.body.name;

    //game.name
    //game.id

    //UPDATE games SET name = 'Super Smash Bros. Ultimate' WHERE id = 4;
    Movie.update({
        name: name
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/movies');
    }).catch((err) => {
        console.error('Error trying to update Movie', err);
        res.redirect('/movies');
    })
});
module.exports = router;