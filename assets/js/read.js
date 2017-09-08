/**
 * Use DataTables to enhance the functionality of the table on this page.
 *
 * ** NOTE ** All extentsions are availabile in your code already.
 *            You only need to include the javascript and css listed below
 *
 * Here's what this you will need to do:
 *
 * 1. Inlclude the following DataTables css in layout.ejs
 *    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/dt-1.10.12/b-1.2.2/b-print-1.2.2/cr-1.3.2/datatables.min.css"/>
 *
 * 2. Include the following DataTables JavaScript in layout.ejs
 *    <script type="text/javascript" src="https://cdn.datatables.net/v/bs/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/b-1.2.2/b-html5-1.2.2/b-print-1.2.2/cr-1.3.2/datatables.min.js"></script>
 *
 * 3. Using the DataTables plugin render the table on the page as a DataTable
 *
 * 4. Use the buttons extention to enable the copy, csv, excel, pdf, and print
 *
 * 5. Use the colReorder Plugin to add the ability to reorder columns
 *
 * 6. The table should be able to scroll horizontal
 *
 * 7. Use any other features you find interesting
 *
 * Here's the documentation you need:
 * https://datatables.net/
 * https://datatables.net/extensions/buttons/examples/
 * https://datatables.net/extensions/colreorder/examples/
 * https://datatables.net/examples/basic_init/scroll_x.html
 *
 */

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

     //code goes here
     $('table').DataTable({
       dom: 'Bfrtip',
       buttons: [
         'copy', 'csv', 'excel', 'pdf', 'print'
       ],
       colReorder: true,
       "scrollX": true
     });
   });

   $('.view-card').click(function() {
     $('#cardWindow').modal('show');
     cardID = $(this).parents('tr').data('id');
     firstName = $('.card-first-name', $(this).parents('tr')).html();
     lastName = $('.card-last-name', $(this).parents('tr')).html();
   //   title = $('.card-title', $(this).parents('tr')).html();
   //   company = $('.card-company', $(this).parents('tr')).html();
   //   street = $('.card-street', $(this).parents('tr')).html();

     $.get("https://fierce-forest-94846.herokuapp.com/cards/" + cardID, data => {
             details = data

            $("#blah").html('')
            $(".modal-title").html('')
            $(".modal-title").append(firstName +" "+ lastName)

             $("#blah").append(`
                   <div class="dialog">
                    <p>ID: ${details.id}</p>
                    <p>Company: ${details.company}</p>`)

            for (let i = 0; i < details.addresses.length; i++){
                  $("#blah2").append(`
                     <p>Address Type: ${details.addresses[i].type}</p>
                    <p>Address: ${details.addresses[i].street}</p>
                    <p>City: ${details.addresses[i].city}</p>
                    <p>State: ${details.addresses[i].state}</p>
                    <p>Zip: ${details.addresses[i].zipCode}</p>
                    </div>
                    `)
                 }

                 for (let i = 0; i < details.phoneNumbers.length; i++){
                       $("#blah3").append(`
                          <p>Phone Type: ${details.phoneNumbers[i].type}</p>
                         <p>Phone: ${details.phoneNumbers[i].number}</p>
                         </div>
                         `)
                      }
            //  $(".phoneDialog").append(`
            //        <p>${details.phoneNumbers[0].type}: ${details.phoneNumbers[0].phoneNumber}</p>
            //        `)
             //  let cardAddress=addresses[0].id
           })

         //   $.get("https://fierce-forest-94846.herokuapp.com/cards/" + cardID + "/addresses/"  data => {
         //          addresses = data
           //
         //         $("#blah2").html('')
           //
         //          $("#blah2").append(`
         //                <div class="dialog">
         //                 <p>Street: ${addresses.street}</p>
           //
         //                 </div>
         //                 `)
                 //  $(".phoneDialog").append(`
                 //        <p>${details.phoneNumbers[0].type}: ${details.phoneNumbers[0].phoneNumber}</p>
                 //        `)
                  //  let cardAddress=addresses[0].id
               //  })




   //   $("#blah").append("ID: "+cardID)
   //   $("#blah").append('<BR><BR>')
   //   $("#blah").append(title)
   //   $("#blah").append('<BR>')
   //   $("#blah").append(company)
   //   $("#blah").append('<BR>')
   //   $("#blah").append("Address: " + addresses.street)
   //   $("#blah").append('<BR>')
   })




 })();
