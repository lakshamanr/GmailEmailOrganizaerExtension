const assert = require('assert');
const { categorizeEmail, categories } = require('../src/categorizer');

function runTest(description, testFunction) {
  try {
    testFunction();
    console.log(`✔ ${description}`);
  } catch (error) {
    console.error(`✖ ${description}`);
    console.error(error);
    process.exit(1);
  }
}

runTest('should categorize an email as Work', () => {
    const email = { from: 'test@work.com', subject: 'Project meeting', body: 'Team meeting at 2pm' };
    assert.strictEqual(categorizeEmail(email), categories.WORK);
});

runTest('should categorize an email as Work (case-insensitive)', () => {
    const email = { from: 'test@work.com', subject: 'PROJECT MEETING', body: 'Team meeting at 2pm' };
    assert.strictEqual(categorizeEmail(email), categories.WORK);
});

runTest('should categorize an email as Bills & Finance', () => {
    const email = { from: 'test@finance.com', subject: 'Your invoice', body: 'Payment due' };
    assert.strictEqual(categorizeEmail(email), categories.BILLS_FINANCE);
});

runTest('should categorize an email as Promotions', () => {
    const email = { from: 'test@promo.com', subject: 'Big sale!', body: '50% off everything' };
    assert.strictEqual(categorizeEmail(email), categories.PROMOTIONS);
});

runTest('should categorize an email as Urgent / Follow-up', () => {
    const email = { from: 'test@urgent.com', subject: 'Urgent action required', body: 'Please reply ASAP' };
    assert.strictEqual(categorizeEmail(email), categories.URGENT_FOLLOW_UP);
});

runTest('should categorize an email as Personal', () => {
    const email = { from: 'friend@personal.com', subject: 'Dinner?', body: 'Are you free for dinner this weekend?' };
    assert.strictEqual(categorizeEmail(email), categories.PERSONAL);
});

runTest('should categorize an email as Uncategorized', () => {
    const email = { from: 'test@personal.com', subject: 'Hi', body: 'How are you?' };
    assert.strictEqual(categorizeEmail(email), categories.UNCATEGORIZED);
});

console.log('All tests passed!');
