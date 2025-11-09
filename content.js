// NOTE: This script relies on Gmail's internal CSS class names to identify and manipulate
// email elements in the DOM. These class names are not a stable API and are subject to change
// without warning whenever Google updates the Gmail interface. As a result, this extension
// is fragile and may break in the future. A more robust solution would require a more
// resilient method for selecting elements, but this is a common challenge for extensions
// that modify third-party websites.

function getEmailData(emailRow) {
    const subjectEl = emailRow.querySelector('.bqe');
    const bodyEl = emailRow.querySelector('.y2');

    return {
        subject: subjectEl ? subjectEl.innerText : '',
        body: bodyEl ? bodyEl.innerText : '',
    };
}

function displayCategory(emailRow, category) {
    // Avoid adding duplicate labels
    if (emailRow.querySelector('.email-category-label')) {
        return;
    }

    const categoryEl = document.createElement('span');
    categoryEl.className = 'email-category-label';
    categoryEl.innerText = category;
    categoryEl.style.backgroundColor = getCategoryColor(category);
    categoryEl.style.color = 'white';
    categoryEl.style.padding = '2px 6px';
    categoryEl.style.borderRadius = '4px';
    categoryEl.style.marginLeft = '10px';
    categoryEl.style.fontSize = '12px';

    const subjectContainer = emailRow.querySelector('.yX');
    if (subjectContainer) {
        subjectContainer.appendChild(categoryEl);
    }
}

function getCategoryColor(category) {
    switch (category) {
        case categories.WORK:
            return '#3498db'; // Blue
        case categories.PERSONAL:
            return '#2ecc71'; // Green
        case categories.BILLS_FINANCE:
            return '#f1c40f'; // Yellow
        case categories.PROMOTIONS:
            return '#e74c3c'; // Red
        case categories.URGENT_FOLLOW_UP:
            return '#9b59b6'; // Purple
        default:
            return '#95a5a6'; // Gray
    }
}

function processEmails() {
    const emailRows = document.querySelectorAll('tr.zA');
    emailRows.forEach(row => {
        const emailData = getEmailData(row);
        if (emailData.subject && emailData.body) {
            const category = categorizeEmail(emailData);
            displayCategory(row, category);
        }
    });
}

const observer = new MutationObserver(() => {
    processEmails();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// Initial run
processEmails();
