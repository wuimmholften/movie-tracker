var express = require('express');
var router = express.Router();

const {Movie} = require('../models/movie');

/* GET movies listing. */
router.get('/', function(req, res, next) {

    // let movies = [
    //     {name: 'Pulp Fiction'},
    //     {name: 'Whiplash'},
    //     {name: 'Akira'}
    // ];

    Movie.findAll()
        .then((movies) => {
            res.render('movies/index', {
                movies: movies
            });
        })
        .catch((err) => {
            console.error('Error trying to query games', err);
            res.render('movies/index', {
                movies: []
            });
        });

    // console.log(movies)

  
});

// router.post('/delete/:id', (req, res, next) => {
//     let id = req.params,id;

//     Gamepad.destroy({
//         where:{
//             id: id 
//         }
//     }).then(() => {
//         res.redirect('/movies/');
//     })
//     //TODO: Handle Promise
// });

router.get('/create', (req,res,next) => {
    res.render('movies/form')
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

module.exports = router;