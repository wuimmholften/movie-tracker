const {Movie} = require('../models/movie');
let controller ={};

controller.read = function(req, res, next){
   

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
    
      
   
};

module.exports = controller