module.exports = {
  templateInterpolate: /{{([\s\S]+?)}}/g,
  emailTransporter: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use SSL
    requireTLS: true,
    pool: true,
    auth: {
      user: process.env.DEFAULT_EMAIL_USERNAME,
      pass: process.env.DEFAULT_EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  }  
};
