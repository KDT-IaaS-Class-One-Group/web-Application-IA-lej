const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('front'))
app.get("/",(req,res)=>{
    fs.sendFild("/front/index.html",(err,data)=>{
        if(err){
            res.writeHead('Internal Server Error');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
          } 
})})
const PORT = 8000;
app.listen (PORT, () => {
    console.log(
      `cli 창에서 컨트롤 누른후  옆에 포트 누르면 편리하게 확인 -> http://localhost:${PORT}/`
    );
  });

