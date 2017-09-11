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


    $("#addAddress :input").prop("disabled", true);

    $("#card_id").on("change", function() {
      //enable input fields after we fill out the form
      $("#addAddress :input").prop("disabled", false);

      //Define selected as the value of the button you select in the dropdown.
      selected = $(this).find("option:selected").val();


      $.get("http://fierce-forest-94846.herokuapp.com/cards/" + selected, function(card) {

        // Curtis thinks this is great. You don't have to, also.
        // $('#firstName').val(card.firstName);

        //loop over the card we got back from the API
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

        //If a card exists, populate the associated addresses or, if there is an empty address, do nothing.
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
          } //closes switch
        }); //closes $.each
      }) //closes $.get function
    }) //closes JQuery function


    $("#create").on("submit", function(e) {

      //prevents default behavior of form submitting
      e.preventDefault()

      $.ajax({
        url: "http://fierce-forest-94846.herokuapp.com/cards/" + selected + "/address/0",
        method: "DELETE",
        success: function(data) {
          //reload card table on success
          //disable form fields again
          $("#addAddress :input").prop("disabled", true);

          //reset form back to empty fields
          $("#addAddress")[0].reset()
        } //closes success function
      }) //closes .ajax request
    }) //closes submit function
  }); //closes Jquery function

})(); //closes self-invoking function
