const jwt = require("jsonwebtoken");
console.log(jwt.sign({ userId: 363 }, 'top_secret'));