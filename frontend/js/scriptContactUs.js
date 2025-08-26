$(document).ready(function() {
  

  $("#submitButton").on("click", function() {
  var fullName = document.getElementById("fullName").value;
  var areaCode = document.getElementById("areaCode").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  
  var formData = {
    nameC: fullName,
    phone: areaCode + phone,
    email: email,
    message: message,
  };

  // Send the data to the server using AJAX without local storage or redirection
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/api/contactUs",
    data: JSON.stringify(formData),
    contentType: "application/json",
    success: function(response) {
      // Assuming your server responds with the saved data
      console.log("Response from server:", response);

      // Check if the server response contains a success message or data
      if (response && response._id) {
        alert("Data successfully sent to the server!");

         // Add the server-assigned ID to the formData
         formData._id = response._id;

        var storedFormData = localStorage.getItem("contactFormDatas");

      if (storedFormData) {
        var formDatas = JSON.parse(storedFormData);
        formDatas.push(formData);
        localStorage.setItem("contactFormDatas", JSON.stringify(formDatas));
      } else {
        localStorage.setItem("contactFormDatas", JSON.stringify([formData]));
      }

        // Redirect to another page or perform other actions as needed
        // Example redirection to a "success.html" page
        window.location.href = "forms.html";
      } else {
        alert("Error: Data not saved on the server.");
      }
    },
    error: function(error) {
      alert("Error occurred while trying: " + error.responseText);
      // You can add additional error handling code here if needed
    },
  });
});


});
