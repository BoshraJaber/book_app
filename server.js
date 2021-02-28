// source code

// load the things we need/ importing packages
var express = require('express'); //1
// var bodyParser = require('body-parser');
const cors= require('cors') //2
// var path = require('path');
const superagent = require('superagent');
const { query } = require('express');
const bytes = require('bytes');


//config

var app = express();

// app.use(bodyParser());
app.use(cors());
require('dotenv').config();//3 we config it before writing any code
const PORT = process.env.PORT;


// set the view engine to ejs
app.set('view engine', 'ejs'); // to understand I am using ejs to render my values

// use res.render to load up an ejs view file

// index page/ endpoints/ routes 
app.get('/', handelHomeFun)
app.get('/search', handleSearchPage)
app.get('/show', handleBooksSearch)


const baseAPIurl = 'https://www.googleapis.com/books/v1/volumes?q'
//handeler functions

function handelHomeFun(req, res) {
	res.render('pages/index');
};

function handleSearchPage(req,res){
    res.render('pages/searches/new');
}

function handleBooksSearch(req,res){
    // get book data from API
    let searchQuery= req.query.searchquery; // the name of the field in the form
    console.log(searchQuery);
    let searchIn = req= query.searchby; // from the form
    let searchQueryConcat = searchQuery+ "+"+ searchIn;
let queryParams = {
    q: searchQueryConcat,
}
superagent.get(baseAPIurl).query(queryParams).then( data =>{
    console.log(data.body.items);

    res.render('pages/searches.new')
})


    res.render('pages/searches/show')
}
// // about page 
// app.get('/about', function(req, res) {
// 	res.render('pages/about',{arrayOfItems: list});
// });

app.listen(PORT, ()=>{
  console.log('Server is running on port', PORT);  
});//4


