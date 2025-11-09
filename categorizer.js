const categories = {
    WORK: 'Work',
    PERSONAL: 'Personal',
    BILLS_FINANCE: 'Bills & Finance',
    PROMOTIONS: 'Promotions',
    URGENT_FOLLOW_UP: 'Urgent / Follow-up',
    UNCATEGORIZED: 'Uncategorized',
};

const keywords = {
    [categories.WORK]: ['project', 'meeting', 'deadline', 'team', 'report'],
    [categories.PERSONAL]: ['family', 'friends', 'personal', 'catch up', 'dinner'],
    [categories.BILLS_FINANCE]: ['invoice', 'payment', 'receipt', 'bill', 'statement'],
    [categories.PROMOTIONS]: ['sale', 'discount', 'offer', 'promotion', 'coupon'],
    [categories.URGENT_FOLLOW_UP]: ['urgent', 'important', 'action required', 'follow-up', 'asap'],
};

function categorizeEmail(email) {
    const subject = email.subject.toLowerCase();
    const body = email.body.toLowerCase();

    if (keywords[categories.URGENT_FOLLOW_UP].some(keyword => subject.includes(keyword) || body.includes(keyword))) {
        return categories.URGENT_FOLLOW_UP;
    }

    if (keywords[categories.WORK].some(keyword => subject.includes(keyword) || body.includes(keyword))) {
        return categories.WORK;
    }

    if (keywords[categories.BILLS_FINANCE].some(keyword => subject.includes(keyword) || body.includes(keyword))) {
        return categories.BILLS_FINANCE;
    }

    if (keywords[categories.PROMOTIONS].some(keyword => subject.includes(keyword) || body.includes(keyword))) {
        return categories.PROMOTIONS;
    }

    if (keywords[categories.PERSONAL].some(keyword => subject.includes(keyword) || body.includes(keyword))) {
        return categories.PERSONAL;
    }

    return categories.UNCATEGORIZED;
}
