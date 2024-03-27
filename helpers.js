// get the delimiter based on the type of file provided
// ',' for CSV ';' for TSV
function getDelimiter(filename) {
    const parts = filename.split('.');

    // look at the characters after the fullstop to determine csv or tsv
    if (parts.length && parts[parts.length - 1].toLowerCase() === 'csv') {
        return ',';
    }
    else if (parts.length && parts[parts.length - 1].toLowerCase() === 'tsv') {
        return ';';
    }
    else {
        return '';
    }
}

function createHeadersMap(headers) {
    // validate the headers
    if (!headers || headers.length > 26) {
        console.error('Invalid Headers. No more than 26 integers can be accepted.');
        process.exit(1);
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const result = {};

    // create the map of letters to headers
    for (let i = 0; i < headers.length; i++) {
        if (headers[i]) result[alphabet[i]] = headers[i];
    }

    return result;
}

function evaluateExpression(expression, integersMap) {
    if (!expression) return '';

    // Create a regular expression pattern to match all letters in the replacement map
    if (Object.keys(integersMap).length) {
        const pattern = new RegExp(Object.keys(integersMap).join('|'), 'g');

        // Replace all occurrences of letters with corresponding numbers from the map
        // We aren't worried about the validity of the letters in the expression
        // An error will be thrown by eval() and caught below
        expression = expression.toUpperCase().replace(pattern, match => integersMap[match]);
    }

    try {
        // evaluate the expression
        return eval(expression);
    } catch (error) {
        return '#ERR';
    }
}


exports.getDelimiter = getDelimiter;
exports.createHeadersMap = createHeadersMap;
exports.evaluateExpression = evaluateExpression;

