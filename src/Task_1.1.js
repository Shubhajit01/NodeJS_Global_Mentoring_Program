const reverseString = (str) => [...str].reverse().join('');

process.stdin.on('data', (data) => {
	const input = data.toString().trim();
	const output = reverseString(input);
	console.log(output);
});
