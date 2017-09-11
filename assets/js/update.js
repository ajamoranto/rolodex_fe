(function() {

  $(function() {
    let selected;

    $("#card_id_for_update").addClass("selectpicker").attr("data-live-search", "true");

    $("select").attr("data-header", "Select a card");
    //bootstrap code for dropdown
    $('.selectpicker').selectpicker({
      title: "Select a card",
      style: 'btn-info',
      size: 4,
      tickIcon: "glyphicon glyphicon-user",
      showTick: true
    });

    //Disable the form fields until a user selects a card to add an address to from the dropdown
    $(".addressForm :input").prop("disabled", true);

    $("#card_id_for_update").on("change", function() {
      //enable input fields after we fill out the form
      $(".addressForm :input").prop("disabled", false);

      //define "selected" as the value of the input that you click on.
      selected = $(this).val();

      console.log('selected: ' + selected)

      //use a $.get request to call the backend url and add the selected value.
      $.get("http://fierce-forest-94846.herokuapp.com/cards/" + selected, function(card) {

        console.log("card: " + JSON.stringify(card))

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
        }) //each
      }) //get
    })//on change


    $("#add").click(function(e) {

      //prevents default behavior of form submitting
      e.preventDefault()
      let cardObj = {
          type: $('#addressType').val(),
          street: $('#street').val(),
          city: $('#city').val(),
          state: $('#state').val(),
          zipCode: parseInt($('#zipCode').val())
      }
      console.log(cardObj)

      $.ajax({
        url: "http://fierce-forest-94846.herokuapp.com/cards/" + selected + "/address/",
        data: JSON.stringify(cardObj),
        contentType: 'application/json',
        type: "POST", //callback
        success: function(data){
                  //reload card table on success

                  //disable form fields again
                  $("#addAddress :input").prop("disabled", true);

                  //reset form back to empty fields
                  $("#addAddress")[0].reset()
        }
      }) //ajax
    }) //on submit

  });

})();
