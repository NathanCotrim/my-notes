const { Writable } = require('stream')
const { createReadStream } = require('fs')

const readableStream = createReadStream('../resources/teste.txt')

let counter = 0

const writableStream = new Writable({
    write: function (chunk, encoding, next) {
        counter++
        console.log(chunk.toString());
        next()
        console.log(counter);
    }
})

readableStream.pipe(writableStream)
