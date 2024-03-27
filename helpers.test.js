const { 
    getDelimiter, 
    createHeadersMap, 
    evaluateExpression, 
} = require('./helpers.js');


test('getdelimiter() Valid CSV - lower case', () => {
    expect(getDelimiter('test.csv')).toBe(',');
});
test('getdelimiter() Valid CSV - upper case', () => {
    expect(getDelimiter('test.CSV')).toBe(',');
});
test('getdelimiter() Valid CSV - multiple fullstops', () => {
    expect(getDelimiter('test.test.CSV')).toBe(',');
});
test('getdelimiter() Valid CSV - no fullstops', () => {
    expect(getDelimiter('CSV')).toBe(',');
});

test('getdelimiter() Valid TSV - lower case', () => {
    expect(getDelimiter('test.tsv')).toBe(';');
});
test('getdelimiter() Valid TSV - upper case', () => {
    expect(getDelimiter('test.TSV')).toBe(';');
});
test('getdelimiter() Valid TSV - multiple fullstops', () => {
    expect(getDelimiter('test.test.TSV')).toBe(';');
});
test('getdelimiter() Valid TSV - no fullstops', () => {
    expect(getDelimiter('TSV')).toBe(';');
});


test('getdelimiter() Invalid file type - .txt', () => {
    expect(getDelimiter('test.txt')).toBe('');
});
test('getdelimiter() Invalid file type - blank', () => {
    expect(getDelimiter('')).toBe('');
});


test('createHeadersMap() Valid Headers - empty array', () => {
    expect(createHeadersMap([])).toStrictEqual({});
});
test('createHeadersMap() Valid Headers - ordered integer array', () => {
    expect(createHeadersMap([1,2,3,4])).toStrictEqual({ A: 1, B: 2, C: 3, D: 4 });
});
test('createHeadersMap() Valid Headers - reversed integer array', () => {
    expect(createHeadersMap([4,3,2,1])).toStrictEqual({ A: 4, B: 3, C: 2, D: 1});
});
test('createHeadersMap() Valid Headers - string array', () => {
    expect(createHeadersMap(['RED','BLUE','GREEN'])).toStrictEqual({ A: 'RED', B: 'BLUE', C: 'GREEN'});
});
// Need an additional library to test for process.exit - have manually tested these two cases instead
// test('createHeadersMap() Invalid Headers - null', () => {
//     expect(createHeadersMap(null));
// });
// test('createHeadersMap() Invalid Headers - > 26', () => {
//     expect(createHeadersMap([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]));
// });


let map = { A: 1, B: 2, C: 3, D: 4 };

let validTestExpressions = {
    '1 + 2': { result: 3, includeMap: false},
    '1 + A': { result: 2, includeMap: true },
    'A + A': { result: 2, includeMap: true },
    'A': { result: 1, includeMap: true },
    '': { result: '', includeMap: true },
}

let invalidTestExpressions = {
    '1 ++ 2': { result: '#ERR', includeMap: false },
    '1 + Z': { result: '#ERR', includeMap: true },
    '1 + A': { result: '#ERR', includeMap: false },
    'BLUE': { result: '#ERR', includeMap: true }
}


Object.keys(validTestExpressions).forEach(expression => {
    test('evaluateExpression() Valid Expression: ' + expression, () => {
        let includeMap = validTestExpressions[expression].includeMap;
        let expectedResult = validTestExpressions[expression].result

        expect(evaluateExpression(expression, includeMap ? map : {})).toBe(expectedResult);
    });
})

Object.keys(invalidTestExpressions).forEach(expression => {
    test('evaluateExpression() Invalid Expression: ' + expression, () => {
        let includeMap = invalidTestExpressions[expression].includeMap;
        let expectedResult = invalidTestExpressions[expression].result

        expect(evaluateExpression(expression, includeMap ? map : {})).toBe(expectedResult);
    });
})