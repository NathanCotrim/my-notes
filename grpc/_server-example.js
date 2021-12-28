const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader')
const protoFile = require('path').resolve(__dirname, './proto/example.proto')

const protoObject = protoLoader.loadSync(protoFile)
const protoDefinition = grpc.loadPackageDefinition(protoObject)

const notes = [
  { id: '1', title: 'Note 1', description: 'Content 1' },
  { id: '2', title: 'Note 2', description: 'Content 2' }
]

function List (_, callback) {
  return callback(null, notes)
}

function Find ({ request: { id } }, callback) {
  return callback(null, notes.find((note) => note.id === id))
}

const server = new grpc.Server()
server.addService(protoDefinition.Notes.service, { List, Find })

server.bindAsync(`0.0.0.0:${process.env.PORT || 50051}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    throw err
  }
    
  server.start()
  console.log(`Server listening on ${port}`)
})