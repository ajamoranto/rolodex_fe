(function() {

  $(function() {
    var cardID;
    var firstName;
    var lastName;
    var title;
    var company;
    var addresses;
    var street;
    var city;
    var state;
    var zipCode;
    var number;
    var card;

    //Default bootstrap table code
    $('table').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      colReorder: true,
      "scrollX": true
    });
  });


  //Modal to show card details upon click of "view details" on UI.
  $('.view-card').click(function() {
    $('#cardWindow').modal('show');
  //Use the $this to specifiy which card is being targeted.
    cardID = $(this).parents('tr').data('id');
  //Pull the First Name and Last Name associated with each card.
    firstName = $('.card-first-name', $(this).parents('tr')).html();
    lastName = $('.card-last-name', $(this).parents('tr')).html();

    function renderModal() {
  //use the $.get function to directly call the backend. Add the CardID to the URL.
      $.get("https://fierce-forest-94846.herokuapp.com/cards/" + cardID, data => {
        details = data
  //when "view details" is clicked, the modal will populate the ID, Title, Company associated with the chosen ID.
        $("#blah").html('')
        $("#blah2").html('')
        $("#blah3").html('')
        $(".modal-title").html('')
        $(".modal-title").append(firstName + " " + lastName)
  //show the details of the card and add button to delete the entire card.
        $("#blah").append(`
                   <div class="dialog">
                    <p><b>ID:</b> ${details.id}</p>
                    <p><b>TITLE:</b> ${details.title}</p>
                    <p><b>Company</b>: ${details.company}</p>
                    <button data-delete-card-id="${details.id}" type="button" class="btn btn-danger delete-card">Delete Card</button>
                    <BR><BR><BR>
                    `)
   //Loop over the addresses and show additional addresses associated with each ID.
        for (let i = 0; i < details.addresses.length; i++) {
          $("#blah2").append(`
                    <div id="${details.addresses[i].id}">
                    <p><b>Address Type:</b> ${details.addresses[i].type}</p>
                    <p><b>Address:</b> ${details.addresses[i].street}</p>
                    <p><b>City:</b> ${details.addresses[i].city}</p>
                    <p><b>State:</b> ${details.addresses[i].state}</p>
                    <p><b>Zip:</b> ${details.addresses[i].zipCode}</p>
                    <button data-delete-address-id="${details.addresses[i].id}" type="button" class="btn btn-danger delete-address">Delete Address</button>
                    <BR><BR><BR><BR>
                    </div>
                    `)
        }
    //loop over the phone numbers and show additional phone numbers associated with each ID.
        for (let i = 0; i < details.phoneNumbers.length; i++) {
          $("#blah3").append(`
                          <div>
                          <p><b>Phone Type:</b> ${details.phoneNumbers[i].type}</p>
                         <p><b>Phone:</b> ${details.phoneNumbers[i].number}</p>

                         <button data-delete-phone-id="${details.phoneNumbers[i].id}" type="button" class="btn btn-danger delete-phone">Delete Phone</button>
                         <BR><BR><BR><BR>
                         </div>
                         `)
        }
      })
    }
    renderModal();

    //When the "delete address" button is clicked, use an $.ajax request and append the associated card ID and address ID to the URL.
    $(document).on("click", "[data-delete-address-id]", function(e) {
      $.ajax({
          url: `http://fierce-forest-94846.herokuapp.com/cards/${details.id}/address/${$(this).data('deleteAddressId')}`,
          contentType: 'application/json',
          type: "DELETE" //this is a callback function
        })
        .done(data => renderModal())
        .fail()
      console.log("button clicked")
      //reload the form after request is complete.
      window.location.reload();
    })

    //When the "delete address" button is clicked, use an $.ajax request and append the associated card ID and address ID to the URL.
    $(document).on("click", "[data-delete-phone-id]", function(e) {
      $.ajax({
          url: `http://fierce-forest-94846.herokuapp.com/cards/${details.id}/phone/${$(this).data('deletePhoneId')}`,
          contentType: 'application/json',
          type: "DELETE" //callback
        })
        .done(data => renderModal())
        .fail()
      console.log("button clicked")
      //reload the form after request is complete.
      window.location.reload();
    })
    //When the "delete card" button is clicked, use an $.ajax request and append the associated card ID.
    $(document).on("click", "[data-delete-card-id]", function(e) {
      //what happens when delete is clicked
      $.ajax({
          url: `http://fierce-forest-94846.herokuapp.com/cards/${details.id}`,
          contentType: 'application/json',
          type: "DELETE" //callback
        })
        .done(data => renderModal())
        .fail()
      console.log("button clicked")
      //reload the form after request is complete.
      window.location.reload();
    })
  })
})();
