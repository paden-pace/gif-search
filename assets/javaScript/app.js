console.log("JavaScript set up.");

var topics = [
  "Lebron James",
  "Tim Duncan",
  "Kevin Durant",
  "Peyton Manning",
  "John Elway", 
  "Tom Brady",
  "Serena Williams",
  "Venus Williams",
  "Cristiano Ronaldo",
  "Wayne Rooney",
  "Wayne Gretzky",
  "Ronda Rousey",
  ];

$(document).ready(function(){ 

  var person;
  console.log(topics);

  function buttonMaker() {
      $("#button-location").empty();
      for (var i = 0; i < topics.length; i++) {
        $('<button/>',{
          id: 'button'+i,
          class: 'topic-button',
          text: topics[i],
          value: topics[i],
          click: function (){person = this.value}
        }).appendTo("#button-location");
      };
      $(".topic-button").on("click", function(){
      topicClick();
      });
  };

  buttonMaker();

  $("#new-person-add").on("click", function(event) {
    event.preventDefault();

    // Get the to-do "value" from the textbox and store it a variable
    var newPerson = $("#new-person-input").val().trim();
    topics.push(newPerson);
    buttonMaker();
  });

  

  

  function topicClick(){
      console.log(person);
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
          person + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
      url: queryURL,
      method: "GET"
      }).done(function(response) {
          console.log(response);
          $("#gif-location1").empty();
          $("#gif-location2").empty();

          for (var k = 0; k < response.data.length; k++) {
              // response.data[k]
              // console.log(response.data[k].rating);
              if (k <= 4) {
                  $("<div/>", {
                      class: "imageAndRatingDiv",
                      id: "imageAndRatingDiv" + k,
                  }).appendTo("#gif-location1");
              } else if (k > 4) {
                  $("<div/>", {
                      class: "imageAndRatingDiv",
                      id: "imageAndRatingDiv" + k,
                  }).appendTo("#gif-location2");
              }


              var personImage = $("<img>");
              personImage.attr({
                  "src": response.data[k].images.fixed_width_still.url,
                  "data-still": response.data[k].images.fixed_width_still.url,
                  "data-animated": response.data[k].images.fixed_width.url,
                  "movement": "still",
                  "class": "gifImage",
                  "id": "gifImage"+k
              });

              $("#imageAndRatingDiv"+k).prepend(personImage);
              $("#imageAndRatingDiv"+k).prepend("<p> Rating: "+response.data[k].rating+"</p>");

              $("#gifImage"+k).on("click", function(){

                  var active = $(this).attr("movement");

                  if (active === ("still")) {
                      $(this).attr("src", $(this).attr("data-animated"));
                      $(this).attr("movement", "animated");
                  } else if (active === ("animated")) {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("movement", "still");
                  };

              });

          };
      });



  };



  // var animal = $(this).attr("data-animal");

//        // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
//        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

//        console.log(response);



//        // Step 2: since the image information is inside of the data key,
//        // make a variable named results and set it equal to response.data

//        // =============== put step 2 in between these dashes ==================
//        var results = response.data;
//        // ========================

//        for (var i = 0; i < results.length; i++) {

//        // Step 3: uncomment the for loop above and the closing curly bracket below.
//        // Make a div with jQuery and store it in a variable named animalDiv.
//        var animalDiv = $("<div>");
      

//        // Make a paragraph tag with jQuery and store it in a variable named p.
//        // Set the inner text of the paragraph to the rating of the image in results[i].
//        var p = $("<p>").text("rating: " + results[i].rating);
//        // Make an image tag with jQuery and store it in a variable named animalImage.
//        // Set the image's src to results[i]'s fixed_height.url.
//        var animalImage = $("<img>");
//        animalImage.attr("src", results[i].images.fixed_height.url);
//        // Append the p variable to the animalDiv variable.
//        animalDiv.append(p);
//        // Append the animalImage variable to the animalDiv variable.
//        animalDiv.append(animalImage);
//        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
//        $("#gifs-appear-here").prepend(animalDiv)
//        // ============= put step 3 in between these dashes ======================

//        // ==================================
//        }

//      });





  

});