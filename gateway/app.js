const express = require('express')
const expressProxy =require('express-http-proxy')

const app = express()

app.use('/user', expressProxy('http://localhost:3001'))
app.use('/captain', expressProxy('http://localhost:3002'))
app.use('/ride', expressProxy('http://localhost:3003'))

// app.use(
//   "/user",
//   expresProxy("http://localhost:3001", {
//     proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
//       proxyReqOpts.headers["cookie"] = srcReq.headers.cookie || "";
//       return proxyReqOpts;
//     }
//   })
// );

app.listen(3000,()=>{
    console.log("Gateway server is runnning at 3000");
    
})