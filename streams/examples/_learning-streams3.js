// const stdin = process.stdin
//     .on('data', msg => console.log('terminal input', msg.toString()))

// const stdout = process.stdout
//     .on('data', msg => console.log('terminal output', msg.toString()))

// stdin.pipe(stdout)

// ! note that just terminal output is printed, because pipe send all received data to stdout

const stdin = process.stdin.on('data', (data) => console.log(`input - ${data.toString()}`))

stdin.pipe(process.stdout)