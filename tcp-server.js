const net = require('net');
var util = require('util');
var decoder = new util.TextDecoder()

function is_digit(element) {
    if (isNaN(parseInt(element))) {
        return false 
    } else {
        return true
    }
        
}

function calc(formula) {
    console.log("formula", formula);
    var splited = formula.split(" ");
    console.log("formula length:",splited.length);
    console.log(splited);
    var stack = new Array();
    for (let i=0; i<splited.length; i++) {
        console.log(stack);
        element = splited[i];
        if (is_digit(element)) {
            stack.push(parseInt(element));
        } else {
            second_digit = stack.pop();
            first_digit = stack.pop(); 
            if (element.indexOf("+") !== -1) {
                console.log("debug+");
                console.log(first_digit, "+", second_digit);
                stack.push(first_digit + second_digit);
            } else if (element.indexOf("-") !== -1) {
                //console.log("debug-");
                stack.push(first_digit - second_digit);
            } else if (element.indexOf("*") !== -1) {
                //console.log("debug*");
                stack.push(first_digit * second_digit);
            } else if (element.indexOf("/") !== -1) {
                //console.log("debug/");
                stack.push(first_digit / second_digit);
            } else {}
        }
    }
    return stack[0];
}


const myhost = '127.0.0.1';
const myport = 30793;

//Create an instance of the server
const server = net.createServer(onClientConnection);

//Start listening with the server on given port and host.
server.listen(myport, myhost, function(){
   console.log(`Server started: IP address=${myhost} port number=${myport}`);
});

//Declare connection listener function
function onClientConnection(socket){
    //Log when a client connnects.
    console.log(`${socket.remoteAddress}:${socket.remotePort} Accepted a connection from a client`);
    
    socket.on('data', function(data){
        console.log(`${socket.remoteAddress}:${socket.remotePort} Received: ${data} `);
        console.log(typeof(data))
        var string = decoder.decode(data);
        if (string == "exit") {
            socket.write("debug");
            socket.destroy();
        }
        var ans = calc(string);
        console.log(ans);
        socket.write(`${ans}\n`);
        //socket.write(`Echo ${data}`);
    //socket.destroy()
    });

    socket.on('close',function(){
        console.log(`${socket.remoteAddress}:${socket.remotePort} The client closed the connection`);
    });

    socket.on('error',function(error){
        console.error(`${socket.remoteAddress}:${socket.remotePort} Connection Error ${error}`);
    });

};

