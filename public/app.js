// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      '<div class="col-12 col-md-8 col-lg-6 col-xl-4 mt-3 mb-3 bg-light border-0 article-card">' +
        '<div class="card" data-id="' + data[i]._id + '">' +
          '<img class="card-img-top" alt="..." src="' + data[i].image + '">' +
          '<div class="card-body">' +
            '<h5 class="card-title">' + data[i].title + '</h5>' +
            '<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>' +
          '</div>' +
          '<div class="card-footer text-center">' +
            '<button class="btn btn-primary show-comments">Show Comments</button>' +
          '</div>' +
          '<div class="card-body border-top d-none" id="comments">No comments left...yet' +
          '</div>' +
          '<div class="card-footer text-center d-none" id="addComment">' +
            '<button class="btn btn-primary" id="addCommentButton">Add Comment</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    
    );
    if (data[i].note && data[i].note.length > 0) {
      $("#comments").empty();
      for (var x = 0; x < data[i].note.length; x++) {
        $("#comments").append(
          '<p>' + 
          data[i].note[x] + 
          '<button class="btn btn-danger float-right">X</button>' +
          '</p>'
        );
      }
    }
  }
});


$(document).on("click", "button.show-comments", function() {
  if ($(this).text() === "Show Comments") {
    $(this).text("Hide Comments");
  } else {
    $(this).text("Show Comments");
  }
  $(this).parents("div.card").find("div#comments").toggleClass("d-none");
  $(this).parents("div.card").find("div#addComment").toggleClass("d-none");
});

$(document).on("click", "button#addCommentButton", function() {
  if ($(this).text() === "Add Comment") {
    $(this).parent().prepend(
      '<textarea class="form-control mb-3" id="commentText" aria-label="With textarea"></textarea>'
    );
    $(this).toggleClass("btn-primary btn-success");
    $(this).text("Add");
  } else if ($("#commentText").val() !== "") {
    $(this).toggleClass("btn-primary btn-success");
    $(this).text("Add Comment");
    var thisId = $(this).parents("div.card").attr("data-id");
    console.log(thisId);
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#commentText").remove();
    });
  }
});

// // Whenever someone clicks a p tag
// $(document).on("click", "p", function() {
//   // Empty the notes from the note section
//   $("#notes").empty();
//   // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   })
//     // With that done, add the note information to the page
//     .then(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
// });
