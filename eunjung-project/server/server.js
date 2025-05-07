//Node.js의 기본 HTTP 모듈 불러오기
import http from 'http';

//간단한 웹 서버 생성
const server = http.createServer((req,res) => {
    //HTTP 상태코드 와 헤더 설정정
    res.writeHead(201, {'Content-type': 'text/plain'});
    res.end('Hello from Node.js server');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});