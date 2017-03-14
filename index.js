#!usr/bin/env node

'use strict'; 
var books= require('./app/books.js');

var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');

clear();
console.log(
  chalk.red(
    figlet.textSync('Books Look Up', { horizontalLayout: 'half' })
  )
);


books.getBooks(function(){
  console.log("Getting book details...");
  var booksURL= "https://www.googleapis.com/books/v1/volumes?q=" +arguments[0].title;
  books.printBookDetails(booksURL);
});

