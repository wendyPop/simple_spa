// server.js
const express = require("express");
const path = require("path");

const app = express();

// 정적 파일을 제공하기 위한 미들웨어
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
})

// port 생성 서버 실행
app.listen(process.env.PORT || 3000, () => console.log("server running"));
