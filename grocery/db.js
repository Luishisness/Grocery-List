/* jshint undef: true, unused: true */


var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');
	

// my schema goes here!

var Item = new mongoose.Schema({
	name: String,
	quantity: Number,
	checked: Boolean
	
});

var List = new mongoose.Schema({
	name: String,
	createdBy: String,
	items: [Item] //name, quantity, checked 
});

var user = new mongoose.Schema({
	userName: String,
	userPassword: String,
	userList: [List]
});

List.plugin(URLSlugs('name'));

mongoose.model('List', List);
mongoose.model('Item', Item);

mongoose.connect('mongodb://localhost/grocerydb');

