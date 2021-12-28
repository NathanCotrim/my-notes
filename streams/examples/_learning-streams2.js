const { Readable } = require('stream')

const test = ['1', '2', '3', '4', '5']

const readableStream = new Readable({
    read: function () {
        for (const number of test) {
            this.push(number)
        }
        this.push(null)
    }
})


readableStream.on("data", (chunk) => {
    console.log(chunk.toString() + ' stream piece - readable received data') // will be called once with `"input string"`
})

