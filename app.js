'use strict';
const express = require("express");
const path = require("path");
const app = express()
const port = 8005;
const fs = require("fs");
var songDeleted = true;
if(fs.existsSync(__dirname + '/public/geburtstag_jan.mp3')){
  songDeleted = false;
}

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/aufgaben', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/aufgaben.html'));
});

app.get('/song', (req,res) => {
  setTimeout(function(){
    const file = __dirname + '/public/geburtstag_jan.mp3'
    const stat = fs.statSync(file);
    fs.renameSync(__dirname + '/public/geburtstag_jan.mp3', __dirname + '/public/geburtstag_jan_deleted.mp3');
    console.log("renamed");
    songDeleted = true;
  }, 15 * 60 * 1000);
   
  if(fs.existsSync(__dirname + '/public/geburtstag_jan.mp3')){
    try {
      const file = __dirname + '/public/geburtstag_jan.mp3'
      const stat = fs.statSync(file);
      const total = stat.size;
      if (req.headers.range) {
  
      }
      fs.exists(file, (exists) => {
          if (exists) {
              const range = req.headers.range;
              const parts = range.replace(/bytes=/, '').split('-');
              const partialStart = parts[0];
              const partialEnd = parts[1];
  
              const start = parseInt(partialStart, 10);
              const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
              const chunksize = (end - start) + 1;
              const rstream = fs.createReadStream(file, {start: start, end: end});
  
              res.writeHead(206, {
                  'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                  'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
                  'Content-Type': 'audio/mpeg'
              });
              rstream.pipe(res);
  
          } else {
              res.send('Error - 404');
              res.end();
              // res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
              // fs.createReadStream(path).pipe(res);
          }
      });
    } catch (error) {
      console.log(error);
    }
  }else{
    res.status(404);
    res.end();
  }
 
});

app.get('/songdeleted', (req,res) => {
  console.log("songdeleted");
  if(songDeleted){
    res.status(404);
    res.end();
  }else{
    res.status(200);
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
