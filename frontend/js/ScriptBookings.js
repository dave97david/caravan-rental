$(document).ready(function() {
  // Sample Caravans
  var caravans = [
    { title: "Caravan with 2 passengers", location: "Haifa", price: "$250", photoFront: "photos/Haifa.jpg", photoModal: "photos/caravan-2-seats.jpg" },
    { title: "Caravan with 2 passengers", location: "Tel Aviv", price: "$100", photoFront: "photos/tel-aviv.jpg", photoModal: "photos/caravan-2-seats.jpg" },
    { title: "Caravan with 2 passengers", location: "Dead Sea", price: "$175", photoFront: "photos/photo5.jpg", photoModal: "photos/8-seats.jpg" },
    { title: "Caravan with 4 passengers", location: "Haifa", price: "$150", photoFront: "photos/haifa.jpg", photoModal: "photos/4-seats.jpg" },
    { title: "Caravan with 6 passengers", location: "Haifa", price: "$250", photoFront: "photos/haifa.jpg", photoModal: "photos/6-seats.jpg" },
    { title: "Caravan with 4 passengers", location: "Dead Sea", price: "$225", photoFront: "photos/photo5.jpg", photoModal: "photos/4-seats.jpg" },
    { title: "Caravan with 4 passengers", location: "Tel Aviv", price: "$200", photoFront: "photos/tel-aviv.jpg", photoModal: "photos/4-seats.jpg" },
    { title: "Caravan with 2 passengers", location: "Jerusalem", price: "$220", photoFront: "photos/Jerusalem.jpg", photoModal: "photos/caravan-2-seats.jpg" },
    { title: "Caravan with 4 passengers", location: "Jerusalem", price: "$300", photoFront: "photos/Jerusalem.jpg", photoModal: "photos/4-seats.jpg" },
    { title: "Caravan with 4 passengers", location: "Tiberias", price: "$200", photoFront: "photos/Tiberias.jpg", photoModal: "photos/4-seats.jpg" },
    { title: "Caravan with 6 passengers", location: "Tel Aviv", price: "$275", photoFront: "photos/tel-aviv.jpg", photoModal: "photos/6-seats.jpg" },
    { title: "Caravan with 6 passengers", location: "Jerusalem", price: "$250", photoFront: "photos/Jerusalem.jpg", photoModal: "photos/6-seats.jpg" },
    { title: "Caravan with 8 passengers", location: "Tel Aviv", price: "$350", photoFront: "photos/tel-aviv.jpg", photoModal: "photos/8-seats.jpg" },
    { title: "Caravan with 8 passengers", location: "Jerusalem", price: "$350", photoFront: "photos/Jerusalem.jpg", photoModal: "photos/8-seats.jpg" },
    { title: "Caravan with 6 passengers", location: "Dead Sea", price: "$250", photoFront: "photos/photo5.jpg", photoModal: "photos/6-seats.jpg" },
    { title: "Caravan with 8 passengers", location: "Tiberias", price: "$275", photoFront: "photos/Tiberias.jpg", photoModal: "photos/8-seats.jpg" }
  ];

  // Function to render caravans
  function renderCaravans(caravanList) {
    var caravansRow = $("#caravansRow");
    caravansRow.empty(); // Clear previous cards

    caravanList.forEach(function(caravan, index) {
      var column = $("<div>").addClass("col-lg-3 col-md-6 col-sm-12");
      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      $("<h5>").addClass("card-title").text(caravan.title).appendTo(cardBody);
      $("<img>").addClass("card-img-top").attr("src", caravan.photoFront).appendTo(cardBody);
      $("<p>").addClass("card-text").text("Location: " + caravan.location).appendTo(cardBody);
      $("<p>").addClass("card-text").text("Price: " + caravan.price).appendTo(cardBody);
      cardBody.appendTo(card);
      card.appendTo(column);
      column.appendTo(caravansRow);

      // Clearfix after every 4th card
      if ((index + 1) % 4 === 0) {
        $("<div>").addClass("clearfix").appendTo(caravansRow);
      }

      // Add margin-bottom between rows
      caravansRow.children().addClass("mb-2");

      // Add click event listener to the card
      card.on("click", function() {
        $("#bookingModalLabel").text(caravan.title);
        $("#modalCaravanPhoto").attr("src", caravan.photoModal);
        $("#modalCaravanPrice").text("Price: " + caravan.price);
        $("#modalCaravanLocation").text("Location: " + caravan.location);
        $("#modalCaravanInsidePhoto").attr("src", caravan.photoFront); 
        $("#bookingModal").modal("show");
      });
    });
  }

  // Render initial caravans
  renderCaravans(caravans);

  // Search Functionality
  var searchInput = $("#searchInput");
  var defaultText = "Search by number of passengers, location or price...";

  searchInput.on("focus", function() {
    if (searchInput.val() === defaultText) {
      searchInput.val("");
    }
  });
  
  searchInput.on("blur", function() {
    if (searchInput.val() === "") {
      searchInput.val(defaultText);
    }
  });
  
  // Search Functionality
searchInput.on("input", function() {
  var searchTerm = $(this).val().toLowerCase();
  var filteredCaravans = caravans.filter(function(caravan) {
    var title = caravan.title.toLowerCase();
    var location = caravan.location.toLowerCase();
    var price = parseInt(caravan.price.replace("$", ""));
    return title.includes(searchTerm) || location.includes(searchTerm) || price <= parseInt(searchTerm);
  });

  renderCaravans(filteredCaravans);
});


  // Clear Button
  $("#clearButton").on("click", function() {
    searchInput.val("");
    renderCaravans(caravans);
  });

// Book Button
$("#bookButton").on("click", function() {
  var name = $("#nameInput").val();
  var date = $("#dateInput").val();

  if (name !== "" && date !== "") {
    var caravanTitle = $("#bookingModalLabel").text();
    var caravanPrice = $("#modalCaravanPrice").text().replace("Price: ", "");
    var caravanLocation = $("#modalCaravanLocation").text().replace("Location: ", "");

    // Create a data object to send to the server
    var bookingData = {
      title: caravanTitle,
      price: caravanPrice,
      location: caravanLocation,
      name: name,
      date: date,
    };

    // Send a POST request to your server to save the booking
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:3000/api/caravans",
      data: JSON.stringify(bookingData),
      contentType: "application/json",
      success: function(response) {
        alert("Booking Successful!\nName: " + response.name + "\nDate: " + response.date);
        $("#bookingModal").modal("hide");
      },
      error: function(error) {
        alert("Error occurred while booking: " + error.responseText);
      },
    });
  } else {
    alert("Please fill in all the fields.");
  }
});



});
