const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use("/", router)
app.use("/assets", express.static("app/view/assets"))

// Configure the Database connection
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
  console.log('Could not connect to database. Exiting now...');
  process.exist();
});

mongoose.connection.once('on', function() {
  console.log('Successfully connected to the database.');
});

const student = require('./app/controllers/students.controller.js');

router.get('/api', function(req,res) {
  res.json({
    'message': 'Welcome to Students application REST-ful API.'
  })
})
// Create a new Student
router.post('/student', student.createNew);
// View all the existing Students
router.get('/students', student.findAll);
// Find by Subject
router.get('/search/subject/:subject', student.findBySubject);
// Find by Gender
router.get('/search/gender/:gender', student.findByGender);
// Find by Age
router.get('/search/age/:age', student.findByAge);
// View one student by providing an ID
router.get('/student/:id', student.findOne);
// Updating a Student by providing a ID
router.put('/student/:id', student.updateStudent);
// Delete a Student by providing a ID
router.delete('/student/:id', student.deleteStudent);

router.get('/', function(req, res) {
  res.sendFile('index.html', {root: 'app/view'});
});

app.listen(3000, function() {
  console.log('app listening on port 3000');
});