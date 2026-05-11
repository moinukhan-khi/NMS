// NMS Backend - Main Server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// Express App اور HTTP Server
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// MongoDB سے رابطہ
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB سے کامیابی سے منسلک ہو گئے'))
.catch(err => console.log('❌ MongoDB کنکشن خرابی:', err));

// Routes شامل کریں
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/media', require('./routes/media'));

// Socket.io صارفین کو ٹریک کریں
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log(`🟢 صارف منسلک ہوا: ${socket.id}`);

  // صارف آن لائن ہوا
  socket.on('user:online', (data) => {
    onlineUsers.set(socket.id, {
      userId: data.userId,
      city: data.city,
      socketId: socket.id
    });
    
    // تمام صارفین کو بتائیں
    io.emit('user:online', {
      userId: data.userId,
      city: data.city,
      userName: data.userName || 'صارف'
    });
    
    console.log(`✅ ${data.userId} آن لائن ہے (${data.city})`);
  });

  // پیغام بھیجا گیا
  socket.on('message:send', (data) => {
    // موصول کنندہ یا گروپ کے تمام ارکان کو بھیجیں
    if (data.recipientId) {
      io.to(data.recipientId).emit('message:receive', data);
    } else if (data.groupId) {
      io.to(`group:${data.groupId}`).emit('message:receive', data);
    }
    
    console.log(`📨 پیغام بھیجا گیا: ${data.senderId} -> ${data.recipientId || data.groupId}`);
  });

  // ٹائپنگ اشارہ
  socket.on('user:typing', (data) => {
    if (data.userId) {
      socket.broadcast.emit('user:typing', {
        userId: data.userId
      });
    }
  });

  // گروپ میں شامل ہوں
  socket.on('group:join', (data) => {
    socket.join(`group:${data.groupId}`);
    console.log(`👥 صارف گروپ میں شامل: ${data.groupId}`);
  });

  // گروپ سے نکلیں
  socket.on('group:leave', (data) => {
    socket.leave(`group:${data.groupId}`);
    console.log(`👥 صارف گروپ سے نکلا: ${data.groupId}`);
  });

  // منقطع ہوا
  socket.on('disconnect', () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      onlineUsers.delete(socket.id);
      io.emit('user:offline', {
        userId: user.userId,
        userName: user.userName || 'صارف'
      });
      console.log(`🔴 صارف منقطع ہوا: ${user.userId}`);
    }
  });
});

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));

// خرابی سے نمٹیں
app.use((err, req, res, next) => {
  console.error('خرابی:', err);
  res.status(500).json({
    message: 'سرور میں خرابی',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// سرور شروع کریں
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🚀 NMS سرور شروع ہو گیا 🚀      ║
║                                        ║
║  پوری: ${PORT}                           ║
║  Database: MongoDB                     ║
║  Status: ✅ Active                      ║
╚════════════════════════════════════════╝
  `);
});

module.exports = { app, io };
