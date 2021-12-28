const net = require('net')
net.createServer(socket => socket.pipe(process.stdout)).listen(1338)

// ! run this way:
// node -e "process.stdin.pipe(require('net').connect(1338))"

// if you input anything the data will be received by this net server