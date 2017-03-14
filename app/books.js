'use strict';

var inquirer = require('inquirer');
var unirest = require('unirest');

module.exports = {
	getBooks: function(callback) {
		var questions = {
			name: 'title',
			type: 'input',
			message: 'Enter the book name you want to Look up:',
			validate: function( value ) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter a valid book name:';
				}
			}
		};

		inquirer.prompt(questions).then(callback);
	},

	printBookDetails: function(booksURL) {
		unirest.get(booksURL)
		.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.send({})
		.end(function (response) {
			console.log("The Author of this book is " + response.body.data.author + "\n" 
				+"This published date of this book is "+ response.body.data.publishedDate + 
				"Book Description " + response.body.data.Description);
		});
	}
}