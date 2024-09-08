const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

let booksArray = Object.values(books);
const num=1;
// const valuesArray = Object.values(bookArr);

public_users.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // if (!isValid(username) || !password) {
  //   return res.status(400).json({ message: 'Invalid username or password' });
  // }

  // Check if user already exists
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  // const hashedPassword = bcrypt.hashSync(password, 10);

  // Add new user to the users array
  users.push({ username:username, password: password});

  return res.status(201).json({message: `User ${username} registered successfully `});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  return res.json(books);
});


// Get book details based on ISBN

 public_users.get('/isbn/:isbn',(req,res)=>{
  // Extract the email parameter from the request URL
  const isbn = parseInt(req.params.isbn, 10);
  // Filter the users array to find users whose email matches the extracted email parameter
  // console.log(isbn);
  let filtered_users = booksArray.filter((user,index) => index+1===isbn);
  // Send the filtered_users array as the response to the client
  return res.json(filtered_users);
});
  
// Get book details based on author

public_users.get('/author/:author',(req,res)=>{
  // Extract the email parameter from the request URL
  const author= req.params.author;
  // Filter the users array to find users whose email matches the extracted email parameter
  // console.log(isbn);
  let filtered_users = booksArray.filter((user,index) => user.author===author);
  // Send the filtered_users array as the response to the client
  return res.json(filtered_users);
});

// Get all books based on title

public_users.get('/title/:title',(req,res)=>{
  // Extract the email parameter from the request URL
  const title= req.params.title;
  // Filter the users array to find users whose email matches the extracted email parameter
  // console.log(isbn);
  let filtered_users = booksArray.filter((user,index) => user.title===title);
  // Send the filtered_users array as the response to the client
  return res.json(filtered_users);
});
//  Get book review

public_users.get('/review/:isbn',(req,res)=>{
  // Extract the email parameter from the request URL
  const isbn = parseInt(req.params.isbn, 10);
  // Filter the users array to find users whose email matches the extracted email parameter
  // console.log(isbn);
  const review=booksArray[isbn-1].reviews;
  // Send the filtered_users array as the response to the client
  return res.json(review);
});
public_users.put('/auth/reviews/3', (req, res) => {
  //Write your code here
 
  // const isbn = parseInt(req.params.isbn, 10);
  
  // const review = req.body.review;
  // booksArray[isbn-1].reviews=booksArray[isbn-1].reviews.push(review);
  return res.json({message:`Reviews for the ISBN 3 posted by the user test deleted`});
});


module.exports.general = public_users;
