"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
// ✅ PORT AYARI (Dinamik Port Seçimi)
const PORT = process.env.PORT || 3001;
// ✅ Statik Dosyalar için Public Klasörü Ayarı
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// ✅ Ana Sayfa Route'u
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
// ✅ Socket.io Bağlantısı
io.on('connection', (socket) => {
    console.log('Yeni bir kullanıcı bağlandı:', socket.id);
    socket.on('chat message', (msg) => {
        console.log('Mesaj:', msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('Bir kullanıcı ayrıldı:', socket.id);
    });
});
// ✅ Sunucu Başlatma
httpServer.listen(PORT, () => {
    console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
});
