(function() {

  $(function() {
    //Upon click of the create button, navigate to the /create page and show a form.
    $('#create').click(e => {
    //prevent form from completing it's default behavior of submitting
      e.preventDefault()
    //Assign the fields in the form to Jquery so that you can capture and send the value of those fields later. Make sure to use the same naming conventions and nesting structure as the backend.
      let cardObj = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        title: $('#title').val(),
        company: $('#company').val(),
        addresses: [
          { type: $('#addressType').val(), street: $('#street').val(), city: $('#city').val(), state: $('#state').val(), zipCode: $('#zipCode').val()
         }
       ],
        phoneNumbers: [
          { type: $('#phoneType').val(), number: $('#phoneNumber').val()}
        ]
      }
      //Use "Post" to create a new card. Stringify the JSON object so that the backend API receives it in the proper JSON format.
      let payload = {
        method: 'POST',
        data: JSON.stringify(cardObj),
        contentType: 'application/json'
      }
      //Use a JQuery ajax request and pass the payload variable.
      $.ajax("/create", payload)
        .fail(err => console.error(err))
      //Reset the page when complete.
        .done(() => document.querySelector('#addCard').reset());
      //Use a console.log to ensure you're sending the appropriate JSON object upon click of the button.
      console.log(cardObj)
    })

    //validations on the UI to ensure clean data is sent to the backend.
    $("#addCard").validate({
      errorClass: "text-danger",
      rules: {
        firstName: {
          required: true,
          minlength: 2
        },
        lastName: {
          required: true,
          minlength: 2
        },
        title: {
          required: true,
          maxlength: 100
        },
        company: {
          maxlength: 100
        },
        street: {
          required: true,
          maxlength: 100
        },
        city: {
          required: true,
          maxlength: 50
        },
        state: {
          required: true,
          maxlength: 2,
          minlength: 2
        },
        zipCode: {
          required: true,
          minlength: 5,
          maxlength: 5
        },
        phoneNumber: {
          required: true,
          maxlength: 10,
          minlength: 10
        }
      },
      //messages to the user.
      messages: {
        firstName: {
          minlength: jQuery.validator.format("At least 2 characters required!"),
          required: jQuery.validator.format("This field is required.")
        },
        lastName: {
          minlength: jQuery.validator.format("At least 2 characters required!"),
          required: jQuery.validator.format("This field is required.")
        },
        title: {
          required: jQuery.validator.format("This field is required.")
        },
        street: {
          required: jQuery.validator.format("This field is required.")
        },
        city: {
          required: jQuery.validator.format("This field is required.")
        },
        state: {
          required: jQuery.validator.format("This field is required."),
          minlength: jQuery.validator.format("Please use the two letter state abbreviation."),
          maxlength: jQuery.validator.format("Please use the two letter state abbreviation.")
        },
        zipCode: {
          required: jQuery.validator.format("This field is required."),
          minlength: jQuery.validator.format("Field must contain 5 digits"),
          maxlength: jQuery.validator.format("Field must contain 5 digits")
        },
        phoneNumber: {
          required: jQuery.validator.format("This field is required."),
          minlength: jQuery.validator.format("Field must contain 10 digits."),
          maxlength: jQuery.validator.format("Field must contain 10 digits.")
        }
      }
    })
  })
})()
