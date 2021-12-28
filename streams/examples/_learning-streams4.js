const http = require('http')

const { readFileSync, createReadStream } = require('fs')

http.createServer(async (req, res) => {
    // ! Without streams, we wait node process file and return it all:

    // const file = readFileSync('../resources/teste.txt')
    // res.write(file)
    // res.end()

    // ! With streams, we create a readable stream from file and do the pipe with http response, that is also a stream, this way we return the processed file on demand:

    createReadStream("../resources/teste.txt")
        .pipe(res)

}).listen(3000, () => console.log('running at 3000'))
