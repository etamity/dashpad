

process.send({ text: process.pid, a:'1111' });
// // process.on(message => {
// //     console.log('pid', process.pid, message);
// //     process.send('hahahahahaahahahahahahah!!!!!!!');
// // });
// setInterval(() => {
//     process.send({ text: process.pid, a:'hahshdh' });

// } ,2000);

console.log(process.execArgv);
console.log(process.argv);