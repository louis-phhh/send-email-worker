const _ = require('lodash');
const Path = require('path');
const HHFs = require('hh-common/util/Fs');
const EmailConfig = require('project/config/EmailConfig');

module.exports = async (path, data) => {
  _.templateSettings.interpolate = EmailConfig.templateInterpolate;
  path = `${Path.dirname(require.main.filename)}/projects/send-email-worker/view/email/${path}.html`;
  const template = await HHFs.readFileAsync(path, { encoding: 'utf8' });
  const render = _.template(template);
  const html = render(data);
  return html;
};