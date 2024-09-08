const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
let booksArray = Object.values(books);
console.log(booksArray  )
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
};



//only registered users can login
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(user => user.username === username);

  if (user && user.password === password) {
    // Successful login
    return res.status(200).json({ message: `User ${username} logged in successfully` });
  } else {
    // Authentication failed
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Add a book review
regd_users.put('auth/review/:isbn', (req, res) => {
  //Write your code here
 
  const isbn = parseInt(req.params.isbn, 10);
  
  const review = req.body.review;
  booksArray[isbn-1].reviews.push(review);
  return res.json({message:`The review for the book with ISBN ${isbn} has been added/updated`});
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
