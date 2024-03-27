const fs = require("fs");
// const csv = require('csv-parser'); // not needed for synchronous file read


const { 
    getDelimiter, 
    createHeadersMap, 
    evaluateExpression, 
} = require('./helpers.js');


const args = process.argv.slice(2);

// File name is a required argument
// Error if it is not provided
if (args.length === 0) {
    console.error('Please provide the file path as an argument.');
    process.exit(1);
}

const filePath = args[0]; 


readFile(filePath, getDelimiter(filePath))
    .then((data) => {
        // transform the headers (integers in our case) to a map for quick access
        let headersMap = createHeadersMap(data.headers);

        const rows = data.data;
        let evaluatedExpressions = [];

        // evaluate all the expressions
        rows.forEach(expressions => {
            let results = [];

            expressions.forEach(expression => {
                results.push(evaluateExpression(expression, headersMap));
            });

            evaluatedExpressions.push(results)

        });

        // create the output file with the evaluated expressions
        createOutputFile(data.headers, evaluatedExpressions);

    })
    .catch((error) => {
        console.error('Error:', error);
    });

function readFile(filePath, delimiter) {
    return new Promise((resolve, reject) => {
        // file read performed synchronously to preserve the order of the expressions from the file
        try {
            // Check if the file exists and we have permission to access it
            fs.accessSync(filePath, fs.constants.F_OK);

            const data = [];
            let headers = [];

            const fileContents = fs.readFileSync(filePath, 'utf8');
            const rows = fileContents.split('\n');

            for (let i = 0; i < rows.length; i++) {
                const rowData = rows[i].trim().split(delimiter);
                // first row is the headers
                if (i === 0) {
                    headers = rowData;
                }
                else {
                    data.push(rowData);
                }
            }
            resolve({ headers, data });

        } catch (error) {
            reject('File not found or invalid file name.');
        }


        // asynchronous version of the file read that doesn't maintain the order of the rows in the file
        // // Check if the file exists and we have permission to access it
        // fs.access(filePath, fs.constants.F_OK, (err) => {
        //     if (err) {
        //         reject(new Error('File not found or invalid file name.'));
        //         return;
        //     }
        //     const data = [];
        //     let headers = [];
        //     fs.createReadStream(filePath)
        //         .pipe(csv({ delimiter }))
        //         .on('headers', (headersList) => {
        //             headers = headersList;
        //         })
        //         .on('data', (row) => {
        //             const rowData = Object.values(row);
        //             data.push(rowData);
        //         })
        //         .on('end', () => {
        //             resolve({headers, data});
        //         })
        //         .on('error', (error) => {
        //             reject(error);
        //         });
        // });
    });
}

    
function createOutputFile(headers, data) {
    const fileName = 'output.csv';
    const delimiter = ','; // ',' for csv as is asked for in the breif. ';' for TSV if desired

    let fileContent = '';

    // add the header row
    fileContent += headers.join(delimiter) + '\n';

    // add all the data rows
    data.forEach(row => {
        fileContent += row.join(delimiter) + '\n';
    });

    // create the file
    fs.writeFileSync(fileName, fileContent.trim());

    console.log('Output file created succesfuly: ' + fileName);
}