const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3003; // 원하는 포트 번호로 변경

// 파일 업로드를 위한 multer 미들웨어 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/music'); // 파일이 업로드될 경로 설정
    },
    filename: function (req, file, cb) {
        // 파일명 중복을 피하기 위해 고유한 파일명 생성
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 파일 업로드 처리 라우트
app.post('/upload', upload.single('file'), (req, res) => {
    // 업로드된 파일에 대한 정보는 req.file에서 확인할 수 있습니다.
    console.log('Uploaded:', req.file);
    res.send('File uploaded successfully');
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
