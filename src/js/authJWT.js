'use strict';

const Boom = require('boom');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const websiteUrl = process.env.WEBSITE_URL;
const appSecret = process.env.APP_SECRET;


function getPayload(user) {
  return {
    sub: user.id,
    iss: websiteUrl
  }
}

function sign(user) {
  return jwt.sign(getPayload(user), appSecret);
}

module.exports = {
  sign
};
