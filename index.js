var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require('underscore');
var dataUtil = require("./data-util");
var _DATA = dataUtil.loadData().students;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

app.get('/',function(req,res){
  // render an empty handlebar if _DATA is empty
  res.render('home',{
    data: _DATA
  });
});

// This getter renders the create handlebar.
app.get('/addStudent', function(req, res){
  res.render('create', {});
});


// This post method complements the create handlebar
app.post('/addStudent', function(req, res){
  var body = req.body;

  body.gpa = parseFloat(body.gpa);
  body.year = parseInt(body.year);

  body.courses = body.courses.split(",");
  for (var i = 0; i < body.courses.length; i++) {
  body.courses[i] = body.courses[i].toUpperCase();
  }

  _DATA.push(req.body);
  dataUtil.saveData(_DATA);
  res.redirect("/");
});


// This post method accesses an endpoint that stores data into the actual API.
app.post('/api/create', function(req, res){
  var body = req.body;

  body.gpa = parseFloat(body.gpa);
  body.year = parseInt(body.year);

  body.courses = body.courses.split(",");
  for (var i = 0; i < body.courses.length; i++) {
  body.courses[i] = body.courses[i].toUpperCase();
  }

  _DATA.push(req.body);
  dataUtil.saveData(_DATA);
  return res.send("Good job! You have been added");
});


// This getter returns the JSON handlebar that stores all the JSON
app.get('/api', function(req,res){
  // res.render('json', {
  //   json: JSON.stringify(_DATA)
  // })
  res.send(JSON.stringify(_DATA));
});


// This getter searches for the jack of all trades...students who are available to tutor in multiple (3 or more) classes.
app.get('/api/talented', function(req,res) {
  var talentPool = _.filter(_DATA, function(stud){
    if (stud.courses.length >= 3) {
      return stud;
    }
  });

  if (talentPool.length == 0) {
    res.render('404err', {});
  } else {
    res.render('talent', {talentPool});
    //res.send(talentPool);
  }
});


// This getter looks for the bad GPA tutors at our school
app.get('/api/math', function(req,res) {
  var mathem = _.filter(_DATA, function(stud){
    if (stud.gpa < 3.00) {
      return stud;
    }
  });

  if (mathem.length == 0) {
    res.render('404err', {});
  } else {
    res.render('badgpa', {mathem});
  }
});


// This get request gets all the students with good GPAs (above 3.5)
app.get('/api/goodgpa', function(req,res) {
  var goodstuds = _.filter(_DATA, function(stud){
    if (stud.gpa >= 3.5) {
      return stud;
    }
  });

  if (goodstuds.length == 0) {
    res.render('404err', {});
  } else {
    res.render('goodgpa', {goodstuds});
  }
});


// This get request gets all the students who can tutor for CMSC330
app.get('/api/cmsc330', function(req,res) {
  var tutors = _.filter(_DATA, function(stud){
    if (stud.courses.includes("CMSC330")) {
      return stud;
    }
  });

  if (tutors.length == 0) {
    res.render('404err', {});
  } else {
    res.render('cmsc330', {tutors});
  }
});


// Let's try getting all the junior and senior tutors...they have more experience, I guess.
app.get('/api/upper', function(req,res) {
  var tutors = _.filter(_DATA, function(stud){
    if (stud.year <= 2020) {
      return stud;
    }
  });

  if (tutors.length == 0) {
    res.render('404err', {});
  } else {
    res.render('upper', {tutors})
    //res.send(tutors);
  }
});



app.listen(process.env.PORT || 3000, function() {
  console.log('Listening!');
});


//name.search(new RegExp(word)) < 0



// Just 5 GET API endpoints for problem 3? Anything? : : : Yep...and you can use them for your nav handlebars
// Do we need to make seperate handlebars for each navigation, or just one? : : : Seperate handlebars for each navigation
// How to implement search: go through all json elements, if it does not contain that substring, don't include it
// ...