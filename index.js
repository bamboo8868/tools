const http = require("http");
const fs = require('fs');


const server = http.createServer((req,res)=>{
	if(req.url != '/favicon.ico') {
		let chunk = Buffer.alloc(0);
		req.on('data',(data)=>{
			chunk = Buffer.concat([chunk,data]);
			console.log(chunk.toString('utf-8'))
		})
		req.on('end',()=>{
			let str = Date.now();
			str+=':URL：'+ req.url+"\r\n";
			fs.appendFile('./app.log',str,()=>{

			});
			let str2 = `${Date.now()}:HEADERS:${JSON.stringify(req.headers)}\r\n`;
			fs.appendFile('./app.log',str2,()=>{

			});
			let str3 = `${Date.now()}:RAWBODY:${chunk.toString('utf-8')}\r\n`;
			fs.appendFile('./app.log',str3,()=>{

			})
		})

		res.end('hello world');

	}

});

server.listen(8888,()=>{

})