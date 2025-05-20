// generateToken.js
import jwt from 'jsonwebtoken';

// 替换成你自己的用户ID和密钥
const userId = '68275578a46859b374e48f49'; // e.g., '60f1b2c3d4e5f67890abcdef'
const secret = 'A4Ox9lDzAsQRlpW3UKhzu+eYSnjnhXeauHv/IqfGS4s=';   // 确保和服务器端使用的一致

// 创建 token，有效期可调整
const token = jwt.sign(
    { id: userId },           // 载荷 payload，通常包含 userId
    secret,                   // 密钥
    { expiresIn: '15d' }       // Token 15天后过期
);

console.log('Generated JWT Token:\n');
console.log(token);
