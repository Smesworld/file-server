const net = require('net');
const readline = require('readline');
const fs = require('fs');


const server = net.createServer(function() {
});

server.listen(4000, () => {
  console.log('Server listening on port 4000!');
});

server.on('connection', (client) => {
  console.log('New client connected!');
  // client.write('Request a file.');

  client.setEncoding('utf8'); // interpret data as text
  client.on('data', data => {
    console.log('Message from client: ', data);
    let filePath = './data/' + data;

    // client.setEncoding('audio/mpeg-3'); // interpret data as text
    let readStream = fs.createReadStream(filePath);
    
    console.log(readStream.readableEncoding);

    readStream.on('error', (err) => {
      console.log('error:', err.message);
      client.write("404");
    });

    readStream.pipe(client);
    
  });

  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });
  
  // rl.on('line', (input) => {
  //   client.write(input);
  // });
});
