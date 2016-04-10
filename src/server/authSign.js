'use strict';

const jwt = require('jsonwebtoken');

const websiteUrl = process.env.WEBSITE_URL;
const appSecret = process.env.APP_SECRET;


function getPayload(user) {
  return {
    facebookId: user.id,
    name: user.name,
    email: user.email,
    issuer: websiteUrl
  }
}

function sign(user) {
  return jwt.sign(getPayload(user), appSecret);
}

function readJWT(token) {
  return jwt.verify(token, appSecret);
}

module.exports = {
  sign,
  readJWT
};
