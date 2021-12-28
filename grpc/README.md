## Grpc

<hr>
<br>

### 🌄 What is?

<br>

gRPC was created by Google as a open code project at 2015, as a improvement in a communication architecture called RPC(Remote Procedure Call).

Obs: the letter g in "gRPC" not means Google, in reality, it has not a unique meaning, it change according the releases of gRPC engine

The main idea to the gRPC was be fastier than REST, using HTTP/2 and the Buffer Protocol(protobuf), this possibilities gRPC to be used in many languages with an awesome performace

<br>
<hr>
<br>

### 🔸 HTTP/2

<br>

Among the many advantages of HTTP / 2 (which was also created by Google) is the fact that it is much faster than HTTP / 1.1 due to several factors that we will understand.

<br>

#### Multiplexing of requests and responses:

Traditionally, HTTP cannot send more than one request at a time to a server, or receive more than one response on the same connection, this makes HTTP / 1.1 slower as it needs to create a new connection for each request.

We do not have HTTP/2 we have what is called multiplexing, which consists of being able to precisely receive several responses and send several calls in the same connection. This is only possible due to the creation of a new frame in the HTTP package called Binary Framing. This frame essentially separates the two parts (headers and payload) of the message into two separate frames, but contained in the same message within a specific encoding.

<br>

#### Compression of headers:

Another factor that makes HTTP/2 a faster protocol is header compression. In some cases the headers of an HTTP call can be larger than its payload, so HTTP/2 has a technique called HPack that does a pretty interesting job.

Initially everything in the call is compressed, including the headers, this helps in performance because we can pass the binary data when releasing text. Also, HTTP/2 maps the headers that come and go on each side of the call, so you can tell if the headers have changed or if they are the same as the last call.

If headers have changed, only the changed headers are sent, and those that have not changed provide an index to the previous header value, preventing headers from being sent repeatedly.

<br>
<hr>
<br>

### ✡️ Protocol Buffers (protobuf)

<br>

Protocol buffers (or just protobuf) are a data serialization and deserialization method that works through an interface definition language (IDL).

It was created by Google in 2008 to facilitate communication between different microservices. The big advantage of protobuf is that it's platform agnostic, so you could write the specification in a neutral language (the proto itself) and compile this contract for several other services, so Google managed to unify the development of several microservices using one unique language of contracts between its services.

The protobuf itself does not contain any functionality, it is just a description of a service. The service in gRPC is a set of methods, think of it as a class. So we can describe each services with its parameters, inputs and outputs.

Each method (or RPC) of a service can only receive a single input and an output parameter, so it's important to be able to compose the messages so that they form a single component.

Furthermore, every message serialized with protobuf is sent in binary format, so its transmission speed to its receiver is much higher than plain text, as binary takes up less bandwidth and as the data is compressed over HTTP/2, the CPU usage is also much lower.

Another big advantage that contributes to the speed increase of the protobuf is the separation of context and content. When we're using formats like JSON, the context comes along with the message, for example:

```
{
    "name": "Lucas",
    "age": 26
}
```

<br>

When we convert this to a message in protobuf format, we will have the following file:

```
syntax = "proto3";

message Name {
  string name = 1;
  int32 age = 2;
}
```

<br>

Note that we don't have the message header with the message, just an index informing where that field should be.

<br>
<hr>
<br>

### 🍸 Implementation

<br>

We use the proto file (extension: .proto) to define all our API as simple way, access the example.proto file at this repo to see an example!

To up the server we implement the services defined in proto with the function: addService, that receives the interface from proto and the implementation object, that contains the methods equal is defined in proto, for example:

<br>

example.proto:

```
service NoteService {
  rpc List (Void) returns (NoteList);
  rpc Find (NoteId) returns (Note);
}
```

<br>

implementation object:

```
{
    List: () => [...notes],
    Find: () => note
}
```

<br>

server implementation:

```
server.addService(NotesDefinition.NoteService.service, implementationObject)
```

<br>

Note: To get this proto definitions, is easy, we use the package @grpc/proto-loader.load, and pass the .proto file path to this function, then, use grpc.loadPackageDefinition passing to it the result os the load.

<br>

The final step is start the server, to this, we use a gRPC bind passing the port and the server credentials, then we start the server, see it:

```
server.bindAsync(`0.0.0.0:${process.env.PORT || 50051}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        throw err
    }
    server.start()
    console.log(`Server listening on ${port}`)
})
```

OBS: createInsecure just works at localhost, to production prefer use createSsl.

<br>

To see a complete server example access the file \_server-example.js!

<br>
<hr>
<br>

### 🌱 Client

<br>

See a simple client implementation based in this server at file \_client-example.js

<br>
<hr>
<br>

### 🏔️ Advantages & Problems

<br>

#### Advantages:

- Lighter and faster by using binary encoding and HTTP/2
- Multi platform with the same contract interface
- Works on many platforms with little or no overhead
- The code is self-documenting.
- Relatively easy implementation after initial development
- Excellent for working between teams that won't meet, especially to define contracts for open source projects.

<br>

#### Problems:

- Protobuf does not have a package manager to be able to manage dependencies between interface files
- Requires a small paradigm shift from the ReST model
- Initial learning curve is more complex
- Not a specification known to many.
- Because it is not well known, the documentation is sparse.
- The architecture of a system using gRPC can become a little more complex

<br>
<hr>
<br>

### 🕍 Use cases

<br>

- Real-time communication services where you deal with streaming calls.
- When efficient communication is a goal.
- In multi-language environments.
- For internal APIs where you don't have to force technology choices on clients.
- Microservices and related communications.

<br>
<hr>
<br>

### 🍜 Typescript

<br>

To use typescript and type our functions with the gRPC types we need to compile proto to as .js file and then generate declarations from it.

<br>
<hr>
<br>

### 🎨 Usefull Links and References

<br>

RPC: https://searchapparchitecture.techtarget.com/definition/Remote-Procedure-Call-RPC
<br>
Study Provider: https://blog.lsantos.dev/ and https://www.altexsoft.com/blog/what-is-grpc/
