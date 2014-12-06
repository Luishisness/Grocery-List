/* jshint undef: true, unused: true */


var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
//var db = require('./db');

var List = mongoose.model('List');
var Item = mongoose.model('Item');


/* GET list page. list of grocery lists*/
router.get('/list', function(req, res) {
List.find(function(err,name,count){
  res.render('list', { List: name, title: 'Shoppy Shoperson' });
  });
});

/* GET list/create  page. list of grocery lists */
router.get('/list/create', function(req, res) {
  res.render('create', { title: 'Shoppy Shoperson' });
});

//GET list/create  page. list of grocery lists 
router.post('/list/create', function(req, res){
  	new List({
		name: req.body.name,
		createdBy : req.body.createdBy
	}).save(function(err, list, count){
		res.redirect('/list');
	});
});

router.get('/list/:slug', function(req, res) {
	var current = req.params.slug;
	List.findOne({slug: current}, function(err, list, count){
			res.render('items', {title: list.name,items: list.items});
	});
});

router.post('/list/:slug', function(req, res){
	req.body.slug = req.params.slug;

	var newItem = new Item({
		name: req.body.name,
		quantity: req.body.quantity,
		checked: false
	});

	List.findOneAndUpdate({slug: req.body.slug}, {$push:{items:newItem}}, function(err, list, count){
		res.redirect('/list/'+req.body.slug);
	});
});


module.exports = router;
