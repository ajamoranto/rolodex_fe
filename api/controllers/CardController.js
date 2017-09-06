/**
 * CardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/card";
const demoData = [
  {
    "id": 1,
    "firstName": "AJ",
    "lastName": "Amoranto"
  },
  {
    "id": 2,
    "firstName": "Lyndsay",
    "lastName": "Buban"
  },
  {
    "id": 3,
    "firstName": "Nick",
    "lastName": "Poole"
  },
  {
    "id": 4,
    "firstName": "Jean",
    "lastName": "Stam"
  }
  ];


module.exports = {

  /**
   * `StudentController.create()`
   */
  create: function (req, res) {

        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };

        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                req.addFlash("error", data.message.substring(data.message.indexOf("•")));
                return res.redirect('/create');
            }

            req.addFlash("success", "Record created successfully");
            return res.redirect('/create');

        })

  },


  /**
   * `StudentController.read()`
   */
  read: function (req, res) {

    // client.get(endpoint, function (data, response) {
        return res.view('read', {cards: demoData});
    // }).on('error', function (err) {
    //     return res.view('read', {error: { message: "There was an error getting the cards"}});
    // });

  },


   /**
   * `StudentController.update()`
   */
  update: function (req, res) {

    if(req.method != "POST"){

      client.get(endpoint, function (data, response) {
        return res.view('update', {cards: data});
      }).on('error', function (err) {
          return res.view('update', {error: { message: "There was an error getting the cards"}});
      });

    }else{

      var args = {
          data: req.body,
          headers: { "Content-Type": "application/json" }
      };

      client.put(endpoint + "/" + req.body.id, args, function (data, response) {

        if(response.statusCode != "200"){
            req.addFlash("error", data.message);
            return res.redirect('/update');
        }

        req.addFlash("success", "Record updated successfully");
        return res.redirect('/update');

      })

    }
  },

  /**
   * `StudentController.delete()`
   */
  delete: function (req, res) {

    if(req.method != "POST"){

      client.get(endpoint, function (data, response) {
        return res.view('delete', {cards: data});
      }).on('error', function (err) {
          return res.view('delete', {error: { message: "There was an error getting the cards"}});
      });

    }else{

      client.delete(endpoint + "/" + req.body.student_id, function (data, response) {

        if(response.statusCode != "200"){
            req.addFlash("error", data.message);
            return res.redirect('/delete');
        }

        req.addFlash("success", "Record deleted successfully");
        return res.redirect('/delete');

      })
    }

  }

};
