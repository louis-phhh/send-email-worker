const dotenv = require('dotenv');
dotenv.config();

require('./projects/send-email-worker');

console.log('Load ended!!')