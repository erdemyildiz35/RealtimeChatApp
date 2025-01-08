import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// ✅ PORT AYARI (Dinamik Port Seçimi)
const PORT = process.env.PORT || 3002;

// ✅ Statik Dosyalar için Public Klasörü Ayarı
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Ana Sayfa Route'u
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
