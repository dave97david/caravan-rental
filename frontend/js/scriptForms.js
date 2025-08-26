window.onload = function () {
  if (typeof Storage !== "undefined") {
    var storedFormData = localStorage.getItem("contactFormDatas");

    if (storedFormData) {
      var formDatas = JSON.parse(storedFormData);
      var formDataList = document.getElementById("formDataList");

      formDatas.forEach(function (formData, index) {
        var card = document.createElement("div");
        card.className = "card mb-2";

        var cardBody = document.createElement("div");
        cardBody.className = "card-body";

        var removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger float-end";
        removeButton.textContent = "X";
        removeButton.addEventListener("click", function () {
          deleteFormData(formData._id, index); // Pass the form ID to the delete function
        });

        var fullName = document.createElement("h5");
        fullName.className = "card-title";
        fullName.textContent = "Full Name: " + formData.nameC;

        var phone = document.createElement("p");
        phone.className = "card-text";
        phone.textContent = "Phone: " + formData.phone;

        var email = document.createElement("p");
        email.className = "card-text";
        email.textContent = "Email: " + formData.email;

        var message = document.createElement("p");
        message.className = "card-text";
        message.textContent = "Message: " + formData.message;

        cardBody.appendChild(removeButton);
        cardBody.appendChild(fullName);
        cardBody.appendChild(phone);
        cardBody.appendChild(email);
        cardBody.appendChild(message);
        card.appendChild(cardBody);

        formDataList.appendChild(card);
      });
    } else {
      var formDataList = document.getElementById("formDataList");
      var listItem = document.createElement("div");
      listItem.textContent = "No form data found.";
      formDataList.appendChild(listItem);
    }
  } else {
    console.log("Sorry, your browser does not support Web Storage.");
  }
};

function deleteFormData(formId, index) {
  if (typeof Storage !== "undefined") {
    $.ajax({
      url: "http://127.0.0.1:3000/api/contactUs/" + formId,
      type: "DELETE",
      success: function () {
        var formDataList = document.getElementById("formDataList");
        formDataList.removeChild(formDataList.children[index]);
      },
      error: function () {
        console.error("Failed to delete form data");
      },
    });
  } else {
    console.log("Sorry, your browser does not support Web Storage.");
  }

  var storedFormData = localStorage.getItem("contactFormDatas");
  
      if (storedFormData) {
        var formDatas = JSON.parse(storedFormData);
        formDatas.splice(index, 1);
        localStorage.setItem("contactFormDatas", JSON.stringify(formDatas));
        location.reload();
      }
      
}
