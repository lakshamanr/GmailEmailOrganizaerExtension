const { processEmails } = require('./emailClient');

const categorizedEmails = processEmails();
console.log(categorizedEmails);
