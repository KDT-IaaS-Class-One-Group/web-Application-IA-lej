const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('front'));
app.use(express.json()); // JSON 파서 사용
app.use(express.urlencoded({ extended: false }));

const DATA_FILE = path.join(__dirname, 'data.json'); // 데이터를 저장할 JSON 파일

// 초기화: 데이터 파일이 없으면 빈 객체로 초기화
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({ mainContent: { inputRecords: [] } }, null, 2)
  );
}

// POST 요청 처리
app.post('/message', (req, res) => {
  const userMessage = req.body.message;
  const timestamp = new Date().toLocaleTimeString();

  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }

    // GET 요청 처리
    app.get('/message', (req, res) => {
      fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).json(JSON.parse(data));
        }
      });
    });

    const jsonData = JSON.parse(data);
    jsonData.mainContent.inputRecords.push({
      type: 'user',
      message: userMessage,
      timestamp: timestamp,
    });

    fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Message saved successfully');
      }
    });
  });
});

// GET 요청 처리
app.get('/message', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행 중입니다.`);
});
