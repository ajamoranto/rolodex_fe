/**
 * Use bootstrap-select to enhance the functionality of dropdown on this page.
 *
 *
 * Here's what this you will need to do:
 *
 * 1. Inlclude the following DataTables css in layout.ejs
 *    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/css/bootstrap-select.min.css">
 *
 * 2. Include the following bootstrap-select JavaScript in layout.ejs
 *    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.11.2/js/bootstrap-select.min.js"></script>
 *
 * 3. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 4. Use the live search functionality to make the dropdown searchable
 *
 * 5. Add the user glyphicons next to each student in the list
 *
 * 7. Add a menu header to the dropdown
 *
 * 8. Customize further with anything you find intersting
 *
 * Here's the documentation you need:
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 *
 */

(function() {

  $(function() {
    let selected;
    const emptyAddress = {
      type: '',
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }

    //code goes here

    $("#addAddress :input").prop("disabled", true);

    $("#card_id").on("change", function() {
      //enable input fields after we fill out the form
      $("#addAddress :input").prop("disabled", false);


      selected = $(this).find("option:selected").val();



      //store current student in variable for when we submit the form
      //we need this to know what student we are updating
      //variable declared on line 5


      $.get("http://fierce-forest-94846.herokuapp.com/cards/" + selected, function(card) {

        // Curtis thinks this is great. You don't have to, also.
        // $('#firstName').val(card.firstName);

        //loop over the student i got back from the api
        $.each(card, function(key, val) {
          if (val.pop) {
            return;
          }

          //find the input field that matches the name of the key
          let el = $('[name="' + key + '"]');
          //find the type of field that we selected
          let type = el.attr('type');

          //based on the type choose how we set the value
          switch (type) {
            case 'checkbox':
              el.attr('checked', 'checked');
              break;
            case 'radio':
              el.filter('[value="' + val + '"]').attr('checked', 'checked');
              break;
            default:
              el.val(val);
          }
        });


        $.each((card.addresses.length && card.addresses[0] && card.addresses[0]) || emptyAddress, function(key, val) {
          if (val.pop) {
            return;
          }

          //find the input field that matches the name of the key
          let el = $('[name="' + key + '"]');
          //find the type of field that we selected
          let type = el.attr('type');

          //based on the type choose how we set the value
          switch (type) {
            case 'checkbox':
              el.attr('checked', 'checked');
              break;
            case 'radio':
              el.filter('[value="' + val + '"]').attr('checked', 'checked');
              break;
            default:
              el.val(val);
          }
        });
      })

    })


    $("#create").on("submit", function(e) {

      //prevents default behavior of form submitting
      e.preventDefault()

      $.ajax({
        url: "http://fierce-forest-94846.herokuapp.com/cards/" + selected + "/address/0",
        // data: $("#addAddress").serialize(),
        method: "DELETE",
        success: function(data) {

          //reload student table on success


          //disable form fields again
          $("#addAddress :input").prop("disabled", true);

          //reset form back to empty fields
          $("#addAddress")[0].reset()

          //   console.log("http://fierce-forest-94846.herokuapp.com/cards/" + selected + "/address/2")
        }
      })
    })

    // $("#addCard").validate({
    //   errorClass: "text-danger",
    //   rules: {
    //     first_name: {
    //       required: true,
    //       minlength: 2
    //     },
    //     last_name: {
    //       required: true,
    //       minlength: 2
    //     },
    //     start_date: {
    //       dateISO: true
    //     }
    //   },
    //   messages: {
    //     first_name: {
    //       minlength: "At least 2 characters required!"
    //     },
    //     last_name: {
    //       minlength: "At least 2 characters required!"
    //     },
    //     start_date: {
    //       dateISO: "yyyy-mm-dd"
    //     }
    //   }

  });

})();
