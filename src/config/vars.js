export {};


// import .env variables
require('dotenv')

const env = process.env; // this has ".env" keys & values
// let adminToken = '';

module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,

  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRATION_MINUTES: env.JWT_EXPIRATION_MINUTES,
  UPLOAD_LIMIT: 5, // MB
  logs: env.NODE_ENV === 'production' ? 'combined' : 'dev'
};
