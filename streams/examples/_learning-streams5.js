const { pipeline, Readable, Transform } = require('stream')
const { promisify } = require('util')
const { createWriteStream } = require('fs')

const pipelineAsync = promisify(pipeline)

const readableStream = new Readable({
    read() {
        for(let index = 0; index <= 1e2; index++) {
            const person = { id: Date.now() + index, name: `Nathan-${index}`}
            const data = JSON.stringify(person)
            this.push(data)
        }
        // avisa que acabaram os dados
        this.push(null)
    }
})

const writableMapToCSV = new Transform({
    transform(chunk, enconding, cb) {
        const data = JSON.parse(chunk)
        const result = `${data.id},${data.name.toUpperCase()}\n`

        cb(null, result)
    }
})

const setHeader = new Transform({
    transform(chunk, enconding, cb) {
        this.counter = this.counter ?? 0
        if(this.counter) {
            return cb(null, chunk)    
        }

        this.counter += 1

        cb(null, "id,name\n".concat(chunk))
    }
})

function execPipeline() {
    return new Promise(async (resolve, reject) => {
        await pipelineAsync(readableStream,
            writableMapToCSV,
            setHeader,
            createWriteStream('../resources/my.csv')
        )
        resolve('finish write csv')
    })
}

execPipeline().then((resolvedValue) => console.log(resolvedValue))