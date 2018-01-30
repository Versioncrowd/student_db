function updateView() {
  // Load default
  $.ajax({
    url: "/students"
  }).done(((data) => {
    renderView(data)
  }));
}

function renderView(data) {
  $('tbody').empty();
    $.each(data, function(index, student) {

      let subjects = '';
      $.each(student.subjects, function(i, s) {
        subjects += `<button class="btn btn-sm btn-outline-info subject" data-subject="${s}">${s}</button> `;
      });

      $('tbody').append(`<tr><th scope="row">${index+1}</th><td>${student.name}</td><td id="age">${student.age}</td>
       <td id="gender">${student.gender}</td><td>${student._id}</td>
       <td class="subjects">${subjects}</td>
       <td><button class="btn btn-sm btn-outline-secondary edit" data-id="${student._id}">edit</button>
       <button class="btn btn-sm btn-outline-danger remove" data-id="${student._id}">delete</button></td></tr>`);
    });
  };

$(document).ready(() => {
  updateView();
});

// Delete a user event
$(document).on("click", "button.remove", function() {
  const studentId = $(this).attr("data-id");
  $.ajax({
    url: '/student/' + studentId,
    type: 'DELETE'
  }).done(((data) => {
    updateView();
    console.log("deleted");
  }));
});

// Edit a user event
$(document).on("click", "button.edit", function() {
  const studentId = $(this).attr("data-id");
  $.ajax({
      url: '/student/' + studentId
    })
    .done(((student) => {
      $('#theModal').modal('show');
      $('#newStudent input[name=name]').val(student.name);
      $('#newStudent input[name=age]').val(student.age);
      $('#newStudent input[name=subjects]').val(student.subjects.join(' '));
      $(`#newStudent input[name=gender][value="${student.gender}"]`).attr('checked', 'checked');
      $('#newStudent input[name=studentId]').val(student._id);
    }));

});

$(document).on("click", "button.new", function() {
  $('#theModal').modal('show');
  //to avoid overwriting we force this empty
  $('#newStudent input[name=studentId]').val('');
});

$(document).on("click", "button.find", function(event) {
  event.preventDefault();
  console.log(event);
  const id = $('#search input[name=id]').val();
  console.log(id);
  $.ajax('/student/' + id)
    .done(function(data) {
      console.log(data);
      renderView([data]);
    });
});

$(document).on("keyup", "input[name=subjects]", function() {
  var subjectsCapitalize = $('#newStudent input[name=subjects]').val();
  $('#newStudent input[name=subjects]').val(subjectsCapitalize.replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); }));
});

$('#newStudent').on("submit", function(event) {
  event.preventDefault();
  $('#theModal').modal('hide');

  const subjects = $('#newStudent input[name=subjects]').val();
  const subjectsArr = subjects.split(" ");
  const studentId = $('#newStudent input[name=studentId]').val();
  const gender = $('input[name=gender]:checked').val();

  if (studentId === '') {
    $.ajax({
        url: '/student/',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          name: $('#newStudent input[name=name]').val(),
          age: $('#newStudent input[name=age]').val(),
          gender: gender,
          subjects: subjectsArr
        })
      })
      .done(() => {
        console.log('This is done!')
        updateView();
      });

  } else {

    $.ajax({
        url: '/student/' + studentId,
        type: 'PUT',
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          name: $('#newStudent input[name=name]').val(),
          age: $('#newStudent input[name=age]').val(),
          gender: gender,
          subjects: subjectsArr
        })
      })
      .done((() => {
        updateView();
      }));
  }
});

$(document).on("click", "button.subject", function() {
  let subject = $(this).text();
  console.log(subject);
  $.ajax({
    url: "/search/subject/" + subject,
    type: "GET",
    dataType: "json",
    contentType: "application/json"
  })
  .done(((data) => {
    console.log(data);
    renderView(data);
  }));
});

$(document).on("click", "#gender", function() {
  let gender = $(this).text();
  console.log(gender);
  $.ajax({
    url: "/search/gender/" + gender,
    type: "GET",
    dataType: "json",
    contentType: "application/json"
  })
  .done(((data) => {
    console.log(data);
    renderView(data);
  }));
});

$(document).on("click", "#age", function() {
  let age = $(this).text();
  console.log(age);
  $.ajax({
    url: "/search/age/" + age,
    type: "GET",
    dataType: "json",
    contentType: "application/json"
  })
  .done(((data) => {
    console.log(data);
    renderView(data);
  }));
});

$(document).ready(function() {
  //set initial state.
  $('input[name=gender]').change(function() {
    console.log("changed: " + $('input[name=gender]:checked').val());
    console.log("try: " + $('input[name=gender]:checked').prop("value"));
  });
});