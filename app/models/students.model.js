var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  name: String,
  age: Number,
  subjects: Array,
  gender: String,
  updated: Date,
  address: Schema.Types.Mixed
});

studentSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated = currentDate;

  next();
});

var Student = mongoose.model('students', studentSchema);
module.exports = Student;