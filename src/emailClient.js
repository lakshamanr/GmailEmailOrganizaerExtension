const { categorizeEmail } = require('./categorizer');

const emails = [
    { from: 'project.manager@work.com', subject: 'Project Update', body: 'Here is the latest report on the project.' },
    { from: 'billing@finance.com', subject: 'Your monthly invoice', body: 'Your invoice for the last month is attached.' },
    { from: 'promo@shopping.com', subject: 'Big sale!', body: 'Don\'t miss our summer sale.' },
    { from: 'boss@work.com', subject: 'Urgent: Action Required', body: 'Please review this document ASAP.' },
    { from: 'friend@personal.com', subject: 'Catching up', body: 'Let\'s catch up next week.' },
];

function processEmails() {
    return emails.map(email => {
        const category = categorizeEmail(email);
        return { ...email, category };
    });
}

module.exports = {
    processEmails,
};
