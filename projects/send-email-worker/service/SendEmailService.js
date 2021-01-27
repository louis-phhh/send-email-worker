
const _ = require('lodash');
const Nodemailer = require('nodemailer');
const Util = require('project/util');
const EmailConfig = require('project/config/EmailConfig');

const SendEmailService = {
  sendEmail: async (transporter, template, data) => {
    const content = _.get(data, 'content') || {};
    const email = _.get(data, 'email') || {};

    const html = await Util.getHTML(template, content);
    const mailOptions = {
      from: email.from,
      to: email.to,
      bcc: email.bcc || '',
      subject: email.subject,
      html,
      generateTextFromHTML: true,
      attachments: email.attachments || []
    };
    if (email.cc) {
      mailOptions.cc = email.cc;
    }

    return transporter.sendMail(mailOptions);
  }
};

module.exports = function (auth) {
  let transporterConfig = EmailConfig.emailTransporter;
  if (_.isEmpty(auth) === false) {
    transporterConfig = {
      ...transporterConfig,
      auth
    }
  }
  const transporter = Nodemailer.createTransport(transporterConfig);
  return {
    sendEmail: async (template, data) => {
      if (data && data.email) {
        data.email.from = `${_.trim(data.email.from || '')} <${transporterConfig.auth.user}>`;
      }
      return SendEmailService.sendEmail(transporter, template, data);
    }
  }
};
