var express = require('express');
var router = express.Router();

/* GET todos listing. */
router.get('/', function(req, res) {
    res.send('Show todo list with delete and update feature (RUD)');
});

/* render NEW To-do form page. todos/new is a route path*/

router.get('/new', function(req, res) {
    res.render('new_todo',{title:'Add new To-Do'});
});

/* Add To-do to database*/
router.post('/add_todo', function(req, res) {
    // Get the only one db instance in our app
    var db = req.db;
    // Get POST values, It's easy
    var title = req.body.title;
    var dueDate = req.body.dueDate;
    console.log('POST VALUES: ' + title + ' ' + dueDate);

   // Fetch from 'users' collection
    var todoCollection = db.get("todos");
    todoCollection.insert({
        'title' : title,
        'dueDate' : dueDate
    }, function(err, doc) {
        if(err) res.send('Problem occured when inserting in todo collection');
        else {
            console.log("Inserted");
            res.location('todos');
            res.redirect('/todos');
        }
    });
});

module.exports = router;