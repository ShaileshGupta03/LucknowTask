const http=require('http')
const server=http.createServer();
const app=require('./app')

app.listen(6000,console.log("server is running 6000"))