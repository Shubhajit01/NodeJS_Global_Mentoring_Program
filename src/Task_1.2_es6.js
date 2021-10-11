import { resolve } from 'path';
import { createWriteStream, createReadStream, existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { pipeline } from 'stream';

import csv from 'csvtojson';

const convert = async ({input, output}) => {
	const outputExists = existsSync(input);
	if (!outputExists) {
		await writeFile(output, null);
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
	input: resolve(__dirname, '../assets/nodejs-hw1-ex1.csv'),
	output: resolve(__dirname, 'task2_output_es6.txt')
});
