## Nodejs Streams

<hr>
<br>

### 🎣 Introduction

<br>

Stream is not a new concept, it dates back long before most current languages. We have stream implementations starting with the .NET Framework 2.0.

A stream is a way of representing a sequence of bits. They can be understood as collections of data, just like Arrays or objects, but the difference is that the data in a stream may not be available all at once, besides, they don't need to use memory either, that is, it is not necessary. these bits to be stored in RAM.

This makes streams powerful tools for development focused on large amounts of data, as we can work in small pieces (chunks, as they are called) and continuously, without having to save anything in memory.

In resume, we received or send data on demand!

<br>
<hr>
<br>

### 🍹 Streams We Know

<br>

#### Writable streams:

- HTTP requests sent by the client
- HTTP responses sent by the server (yes, res.send() is a stream)
- In the fs module we can create a writableStream for any file and write to it
- The crypto module responsible for encryption algorithms also works with streams
- Every half duplex Socket type is a write or read stream
  process.stdout, process.stderr are examples of streams that are handled by a famous API called console.log and console.error that you may have used.

<br>

#### Readable streams:

- HTTP responses on the client, given by the server. That is, we write in a writable stream on the server and read in a readable stream on the client
- HTTP requests on the server, for the opposite reason of the previous item
- Likewise the fs module also allows the creation of readStreams for reading files
- process.stdin, the famous “command line entry”

<br>
<hr>
<br>

### 🐊 Types of Streams

<br>

- Readable, or read-only: are abstractions of a data source. It can be a file, a request, in general anywhere that can provide data that can be consumed. A classic and very visible example is the fs.createReadStream method of Node's fs package, which allows us to read the contents of a file from its stream. In this case, the abstracted source is the file.

- Writable or write-only, like Readable, are abstractions for data destinations where we can send information or write something. It can be a file, an HTTP response, among others. Likewise, the most visible model is fs.createWriteStream, which allows us to write to a file just by sending data to that stream.

- Duplex are streams that are both Writable and Readable at the same time. The most common example is TCP sockets, very used with socket.io, which allow the writing of information while reading is also allowed.

- Transform Streams, are basically Duplex-type streams that, in general, are used to modify the data transferred by them. For example, we can use a stream that receives a String in lowercase, convert all of it to uppercase and write it in another stream. An example of this model is Buffers and zlib.createGzip, which compress the data using the gzip format.

<br>
<hr>
<br>

### 🃏 Pipe

<br>

We can consume streams using the pipe method. With it, we can simply take all the data from an input of type Readable and pass it to a Writable target.

The great thing to remember about the types of streams, is to remember that everything that is destination must be Writable, while everything that is source must be Readable, but nothing prevents both sides from being Duplex.

Using the pipe method is as simple as:

<br>

```
sourceReadable.pipe(destinationWritable)
```

<br>

What we do in this line is basically take all the output data from our origin and forward it to the input of our destination, as if they were two pipes connected. The input must be Readable and the output must be Writable or both sides from being duplex streams.

<br>

```
sourceDuplex.pipe(destinationDuplex1).pipe(destinationDuplex2).pipe(destinationWritable)
```

<br>

Note that, in order for us to do this chaining, the pipe returns the destination stream (which is inside the parentheses), which makes the above command something like:

<br>

```
sourceDuplex.pipe(destinationDuplex1) // returns destinationDuplex1
destinationDuplex1.pipe(destinationDuplex2) // returns destinationDuplex2
destinationDuplex2.pipe(destinationWritable) // returns destinationWritable
```

<br>

To make an analogy, imagine that Readable streams are pipes that pump information out; you can't pump anything into it because the flow doesn't allow it. Writables, on the other hand, are suction pipes that do not pump any information out, they only consume what is being sent.

In this context, duplex would be a pipe open on both sides, without any pump or suction. Therefore, you can either pump information in (which would come out the other side in the form of suction) or you can pump information out.

<br>
<hr>
<br>

### 🌍 Events

<br>

#### Readable streams events (nodejs):

- data: fired whenever the stream passes a chunk of data to the consumer.
- end: fired whenever the stream has no more data to be consumed.
- error: triggered when an error is detected.
- close: fired when a stream is closed, indicating that no other events will be emitted.
- readable: triggered when there is data available to be read from the stream.

<br>

#### Writable streams events (nodejs):

- drain: triggered when the stream is ready to receive new content.
- finish: triggered when all received data has already been written.
- error: triggered when an error is detected.
- close: fired when a stream is closed, indicating that no other events will be emitted.
- pipe/unpipe: Triggered when the pipe or unpipe method is called on a read stream.

<br>
<hr>
<br>

### 🗡️ Usefull links and References

<br>

Study Providers:

- https://imasters.com.br/back-end/streams-no-node-js-o-que-sao-streams-afinal-parte-0{1/2/3}
- https://www.youtube.com/watch?v=pB5-QzabL2I&t=1125s

Nodejs docs: https://nodejs.org/api/stream.html
