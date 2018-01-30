const Student = require('./../models/students.model');
// Updating a Student by providing a ID
exports.createNew = function(req, res) {
  if(!req.body) {
    res.status(400).send({message: 'Student cant be empty!'})
  }
  // create statement
  var newStudent = new Student(req.body);

  newStudent.save(function(err) {
    if(err) {
      return res.send(err);
    };
    return res.send({message: 'newStudent has been saved successfully'});
  });
};

exports.findAll = function(req, res, next) {
  Student.find(function(err, data) {
    console.log(data);
    if(err) {
      res.status(500).send({message: "Some error occured while retrieving students"})
    } else {
      return res.send(data);
    }
  });
};

exports.findOne = function(req, res) {
  console.log(req.params.id);
  Student.findById(req.params.id, function(err, data) {
    if (err) {
      res.status(500).send({message: "Could not retrieve student with id "} + req.params.id)
    }
    else if(!data) {
      return res.send({err: 'student not found'});
    }
    else {
      console.log(data);
      return res.send(data);
    }
  });
};


exports.findBySubject = function(req, res) {
  console.log(req.params.subject);
  Student.find({"subjects": req.params.subject}, function(err, data) {
    
    if (err) {
      res.status(500).send({message: "Could not find student with subject "} + req.params.subject)
    }
    else if(!data) {
      return res.send({err: 'student not found'});
    }
    else {
      console.log(data);
      return res.send(data);    
    }
  });
};

exports.findByGender = function(req, res) {
  console.log(req.params.gender);
  Student.find({"gender": req.params.gender}, function(err, data) {
    
    if (err) {
      res.status(500).send({message: "Could not find student with subject "} + req.params.gender)
    }
    else if(!data) {
      return res.send({err: 'student not found'});
    }
    else {
      console.log(data);
      return res.send(data);    
    }
  });
};

exports.findByAge = function(req, res) {
  console.log(req.params.age);
  Student.find({"age": req.params.age}, function(err, data) {
    
    if (err) {
      res.status(500).send({message: "Could not find student with subject "} + req.params.age)
    }
    else if(!data) {
      return res.send({err: 'student not found'});
    }
    else {
      console.log(data);
      return res.send(data);    
    }
  });
};

exports.updateStudent = function(req, res, next){
  Student.findById(req.params.id, function(err, data) {
    if(!data) {
      return res.send({err: 'student not found'});
     }
    // check all parameters that are sent with the body
    // and attach/ overwrm ite the student object
    for(attr in req.body) {
      data[attr] = req.body[attr];
    }
    // then save the data in the database
    data.save(function(err) {
      if(err) {
        return res.send(err);
      };
      console.log('student updated');
      return res.send(data);
    });
  }); // end findByID
} // end Update

exports.deleteStudent = function(req, res, next) {
  // ID is required
  Student.findById(req.params.id, function(err, data) {
    data.remove(function(err) {
      if(err) throw err;
      else {
        res.send({message: 'Student deleted successfully!'})
      }
    });
  }); // end findByID
};