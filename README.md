# Clipboard_CSV_Parser
A Node.js project for parsing a CSV or TSV file containing algebraic expressions and outputting the value of each expression into an
`output.csv` file.

## Installation

*These instructions assume you already have Node and Git installed. - Node is availiable [here](https://nodejs.org/en/download) - Git is availiable [here](https://git-scm.com/downloads)*
  
1. Clone the repository to your local machine:
```
git clone https://github.com/georginamurphy/Clipboard_CSV_Parser.git
```

2. Navigate into the project directory:
```
cd Clipboard_CSV_Parser
```

3. Install dependencies:
```
npm install
```

## Usage
To run the project, use the following command:

```
node app.js <file-path-to-input-csv-file>
```
Replace `<file-path-to-input-csv-file>` with the actual file path to your input CSV file. This will parse the CSV file and output the result to `output.csv`.
An example input file can be found [here](https://drive.google.com/file/d/10yBg7aHlyMHpYvGfKXUj7yu-1nB984zJ/view).

**Example:**

```
node app.js input.csv
```

## Tests
Tests for this project are written using Jest. To run the tests, use the following command:

```
npm test
```
This will execute all the test cases and display the results.







