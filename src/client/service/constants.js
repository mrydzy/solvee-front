const clientId = "1701796373392975";
const clientSecret = process.env.APP_SECRET;
const authUrl="/auth/login";
const maxChildren = 3;
const maxDepth = 6;

module.exports = {
  clientId: clientId,
  clientSecret: clientSecret,
  authUrl: authUrl,
  maxChildren: maxChildren,
  maxDepth: maxDepth

};