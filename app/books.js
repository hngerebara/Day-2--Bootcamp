'use strict';

var inquirer = require('inquirer');
var unirest = require('unirest');
var chalk = require('chalk');

module.exports = {
	getBooks: function(callback) {
		var questions = {
			name: 'title',
			type: 'input',
			message: 'Enter the keywords you want to Look up:',
			validate: function( value ) {
				if (value.length) {
					return true;
				} else {
					return 'Please enter a valid search query:';
				}
			}
		};

		inquirer.prompt(questions).then(callback);
	},

	printBookDetails: function(booksURL) {
		unirest.get(booksURL)
		.headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
		.end(function (response) {
			var books = response.body.items;
			for (var i = 0; i < books.length; i++) {
				console.log(chalk.red.bold.underline(books[i].volumeInfo.title));
				console.log(chalk.yellow("Author: " + books[i].volumeInfo.authors.join(', ')));
				console.log("Description: " + books[i].volumeInfo.description);
				console.log(chalk.green("Publisher: " + books[i].volumeInfo.publisher));
				console.log(chalk.cyan("Published: " + books[i].volumeInfo.publishedDate + "\n\n\n"));
			}
		});
	}
}