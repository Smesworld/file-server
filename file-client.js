const net = require('net');
const readline = require('readline');
const fs = require('fs');

const conn = net.createConnection({ 
  host: 'localhost', // change to IP address
  port: 4000
});

conn.on('connect', () => {
  conn.setEncoding('utf8');
  let fileName = "";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.on('line', (input) => {
    conn.write(input);
    fileName = input;
  });

  conn.on('data', (data) => {
    if (data === "404") {
      console.log("No such file");
      return;
    }

    // conn.setEncoding('audio/mpeg-3');
    let writeStream = fs.createWriteStream(fileName);
    writeStream.write(data);
    
    writeStream.on('error', (err) => {
      console.log('error:', err.message);
    });
  
    writeStream.on('finish', (err) => {
      if (err) {
        console.log("error:", err)
      } else {
        console.log(`Downloaded and saved ${writeStream.bytesWritten} to ${fileName}`);
      }
    });
  
    writeStream.end();
  });

});

