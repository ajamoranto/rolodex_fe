(function() {

  $(function() {
    let selected;
    //  const emptyAddress = {
    //    type: '',
    //    street: '',
    //    city: '',
    //    state: '',
    //    zipCode: ''
    //  }

    $("#card_id_for_update").addClass("selectpicker").attr("data-live-search", "true");
    // $("option").addClass("glyphicon glyphicon-user");
    $("select").attr("data-header", "Select a card");

    $('.selectpicker').selectpicker({
      title: "Select a card",
      style: 'btn-info',
      size: 4,
      tickIcon: "glyphicon glyphicon-user",
      showTick: true
    });


    $(".phoneForm :input").prop("disabled", true);

    $("#card_id_for_update").on("change", function() {
      //enable input fields after we fill out the form
      $(".phoneForm :input").prop("disabled", false);


      selected = $(this).val();
      console.log('selected: ' + selected)


      $.get("http://fierce-forest-94846.herokuapp.com/cards/" + selected, function(card) {

        console.log("card: " + JSON.stringify(card))

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
        }) //each
      }) //get

    })//on change


    $("#addPhoneBtn").click(function(e) {

      //prevents default behavior of form submitting
      e.preventDefault()
      let cardObj = {
          type: $('#phoneType').val(),
          number: $('#phoneNumber').val(),
      }
      console.log(cardObj)

      $.ajax({
        url: "http://fierce-forest-94846.herokuapp.com/cards/" + selected + "/phone/",
        data: JSON.stringify(cardObj),
        contentType: 'application/json',
        type: "POST" //callback
      }).then(() => {

                  //reload student table on success

                  //disable form fields again
                  $("#addPhone :input").prop("disabled", true);

                  //reset form back to empty fields
                  $("#addPhone")[0].reset()

      }) //ajax
    }) //on submit

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
