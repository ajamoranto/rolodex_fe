/**
 * Use the jQuery Validate plugin to add validation to the form
 *
 * Here's what this you will need to do:
 *
 * 1. Include the following jQuery Validate JavaScript in layout.ejs
 *    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
 *
 * 2. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 3. Use a custom message for one validation
 *
 * 4. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 *
 */

(function() {

  $(function() {

    $('#create').click(e => {
      e.preventDefault()
      let cardObj = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        title: $('#title').val(),
        addresses: [
          { type: $('option').val(), street: $('#street').val(), city: $('#city').val(), state: $('#state').val(), zipCode: $('#zipCode').val()
         }
       ],
        phoneNumbers: [
          { type: $('#phoneType').val(), number: $('#phoneNumber').val()}
        ]
      }
      let payload = {
        method: 'POST',
        data: JSON.stringify(cardObj),
        contentType: 'application/json'
      }
      // let cardObj = {
      //   '\"firstName\"': $('#firstName').val(),
      //   '\"lastName\"': $('#lastName').val(),
      //   '\"title\"': $('#title').val()
      // }
      $.ajax("/create", payload, function(response) {console.log(response)})
      console.log(cardObj)
    })

    // $("#create").click(function(e) {
    //   e.preventDefault()
    //   // $.post("https://fierce-forest-94846.herokuapp.com/cards", $("#addCard").val(), function(data){
    //   console.log($("#addCard").serialize())
    //   // }) // closes $.post
    // }) //closes .click



    $("#addCard").validate({
      errorClass: "text-danger",
      rules: {
        firstName: {
          required: true,
          minlength: 2
          // type: 'string'
        },
        lastName: {
          required: true,
          minlength: 2
          // type: 'string'
        },
        title: {
          required: true,
          maxlength: 100
          // type: 'string'
        }
        // company: {
        //   maxlength: 100
        //   // type: 'string'
        // },
        // street: {
        //   required: true,
        //   maxlength: 100
        //   // type: 'string'
        // },
        // city: {
        //   required: true,
        //   maxlength: 50
        //   // type: 'string'
        // },
        // state: {
        //   required: true,
        //   maxlength: 2,
        //   minlength: 2
        //   // type: 'string'
        // },
        // zipCode: {
        //   required: true,
        //   minlength: 5,
        //   maxlength: 5
        //   // type: 'integer'
        // },
        // phoneNumber: {
        //   required: true,
        //   maxlength: 10,
        //   minlength: 10
        //   // type: 'integer'
        // }
      },
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
        }
        // street: {
        //   required: jQuery.validator.format("This field is required.")
        // },
        // city: {
        //   required: jQuery.validator.format("This field is required.")
        // },
        // state: {
        //   required: jQuery.validator.format("This field is required."),
        //   minlength: jQuery.validator.format("Please use the two letter state abbreviation."),
        //   maxlength: jQuery.validator.format("Please use the two letter state abbreviation.")
        // },
        // zipCode: {
        //   required: jQuery.validator.format("This field is required."),
        //   minlength: jQuery.validator.format("Field must contain 5 digits"),
        //   maxlength: jQuery.validator.format("Field must contain 5 digits")
        // },
        // phoneNumber: {
        //   required: jQuery.validator.format("This field is required."),
        //   minlength: jQuery.validator.format("Field must contain 10 digits."),
        //   maxlength: jQuery.validator.format("Field must contain 10 digits.")
        // }
      }
    })
  })
})()
