const Queue = require('bull');
const RedisConfig = require('project/config/RedisConfig');
const WorkerConfig = require('project/config/WorkerConfig');
const SendEmailService = require('project/service/SendEmailService')();

const sendEmailQueue = new Queue(
  WorkerConfig.email.queueName,
  {
    redis: RedisConfig
  }
);

sendEmailQueue.process(async (job) => {
  const data = job.data;
  await SendEmailService.sendEmail(data.template, data.data);
});

console.log('SendEmailWorker loaded!!');