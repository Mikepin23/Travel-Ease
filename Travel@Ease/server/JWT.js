// Importing the 'sign' and 'verify' functions from the 'jsonwebtoken' library
const { sign, verify } = require("jsonwebtoken");

// Function to create JWT (JSON Web Token) for a user
const createTokens = (user) => {
  // Generating an access token with the user's username and id, using a secret key
  const accessToken = sign(
    { email: user.email, id: user.id },
    "jwtsecretplschange"
  );

  // Returning the generated access token
  return accessToken;
};

// Middleware function to validate the JWT in the request's cookies
const validateToken = (req, res, next) => {
  // Extracting the access token from the cookies in the request
  const accessToken = req.cookies["access-token"];

  // If no access token is present, sending an error response
  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    // Verifying the access token using the secret key
    const validToken = verify(accessToken, "jwtsecretplschange");

    // If the token is valid, setting 'req.authenticated' to true and proceeding to the next middleware
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    // If an error occurs during token verification, sending an error response
    return res.status(400).json({ error: err });
  }
};

// Exporting the functions for use in other files
module.exports = { createTokens, validateToken };
