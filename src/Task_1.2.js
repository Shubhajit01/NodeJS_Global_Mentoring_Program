const path = require('path');
const {createWriteStream, createReadStream, existsSync} = require('fs');
const {writeFile} = require('fs/promises');
const {pipeline} = require('stream');

const csv = require('csvtojson');

const convert = async ({input, output}) => {
	const outputExists = existsSync(input);
	if (!outputExists) {
		await writeFile(output);
	}
	pipeline(createReadStream(input), csv(), createWriteStream(output), (error) => {
		if (error) {
			console.error(error);
		} else {
			console.log('Operation successful');
		}
	});
};

convert({
	input: path.resolve(__dirname, '../assets/nodejs-hw1-ex1.csv'),
	output: path.resolve(__dirname, 'task2_output.txt')
});
