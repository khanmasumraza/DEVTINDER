// Add checks to your schema 
// By doing check you make your database more secure.
// Also add custom valdiation like we add in gender.
// Your validation function will only work when you craete new document 
&& You can enable it for update also  runValidators:true by righting this

// use timestamps 

47.30

Episode:8

- This all about data sanetization make checks to your all things
before entering data to database.
- You can add  schema level validation && api level validation.
- Practice

// put a api level validation by doing thisdo avoid change email once registered
// Add Api level valdiation on patch and post
// Add Api validation for each field
//data sanetization - you are sanetizing the data before sending data to database
//You can add  schema level validation && api level validation
// Never trust req.body adding malecious data

*** Not working validation of all impreove


// Episode 9

// build signup api & login api
// Add validation for email and name 
// Encrype pasword
// save to databse

// login
// find mail and compare


// Episode 10 

Session 1
// Install cookie-parser
// Just send a dummy cookie to user
// create get profile and check if you get the cookie back
// Install jsonwebtoken
// In Login API after email and password validation, create a JWT Token and send it to user
// read the cookies inside your post file API and find the logged in user.

Session 2

// Create user auth middleware
// Add the user auth middleware in profileapi and Sendconnection req
// Set the expiry of jwt token and cookies for 7 days
// Create userSchema method to getJWT()
// Create userSchema method to comparepassword(passwordInputByUser)



// Episode 11 33:20
Explore Tinder Api
Create a list all Api you can think of in devtinder
Group multiple routes under repsective routes



# Adding a custom domain name 

-Purchasing domain name from godaddy
-signup on cloudfare & add a new domain name
-change the nameservers on godaddy and point it to cloudfare
-wait for sometime  till your  namservers are update ~ 15 minutes
-DNS record:A devtinder.in 43.204.96.49
-Enable SSL for website

