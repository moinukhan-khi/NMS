# 🚀 NMS - نیوز میسنجر سسٹم

ایک جدید، محفوظ اور لیکا چیٹ میسنجر جو **نیوز مینجمنٹ** کے لیے بنایا گیا ہے۔

## ✨ اہم خصوصیات

### 💬 چیٹنگ
- ✅ **براہ راست چیٹ** - ایک سے ایک پیغام رسانی
- ✅ **گروپ چیٹ** - متعدد صارفین کے ساتھ
- ✅ **رئیل ٹائم میسجنگ** - Socket.io کے ذریعے
- ✅ **ٹائپنگ اشارہ** - دیکھیں کہ کون ٹائپ کر رہا ہے
- ✅ **آن لائن/آف لائن سٹیٹس** - صارفین کی موجودگی کا اشارہ

### 📁 میڈیا شیئرنگ
- 📸 **تصویریں** - تمام فارمیٹس میں
- 🎬 **ویڈیو** - براہ راست شیئر کریں
- 📎 **فائلیں** - کسی بھی قسم کی فائل

### 🔐 سیکیورٹی
- 🔒 **End-to-End Encryption** - NaCl.js کے ذریعے
- 🔑 **JWT Authentication** - محفوظ لاگ ان
- 🛡️ **Bcrypt** - پاس ورڈ حفاظت
- 🔍 **CORS** - محفوظ CORS سیٹنگ

### 🔍 تلاش
- 🔎 **صارفین تلاش** - نام یا شہر سے
- 📝 **پیغامات تلاش** - Full-text search
- 🌍 **شہر کی بنیاد پر فلٹر** - علاقے کے حساب سے

### 👥 مختلف مقامات سے کام
- 🌐 **متعدد شہر** - ایک ہی وقت میں
- 📍 **مقام کی معلومات** - ہر صارف اپنا شہر ریکارڈ کرتا ہے
- 🚀 **Scalable** - بہت سارے صارفین سنبھال سکتا ہے

## 🛠️ ٹیکنالوجی

### Frontend
- **HTML5** - معنی خیز مارک اپ
- **CSS3** - خوبصورت اسٹائل
- **Vanilla JavaScript** - کوئی فریم ورک نہیں
- **Socket.io Client** - رئیل ٹائم کمیونیکیشن
- **TweetNaCl.js** - Encryption

### Backend
- **Node.js** - رن ٹائم
- **Express.js** - ویب فریم ورک
- **MongoDB** - ڈیٹابیس
- **Socket.io** - رئیل ٹائم سروس
- **JWT** - حکومت کاری
- **Bcrypt** - پاس ورڈ ہیشنگ
- **Multer** - فائل اپ لوڈ

## 📦 انسٹالیشن

### ضروری چیزیں
- Node.js (v14+)
- MongoDB (لوکل یا کلاؤڈ)
- npm یا yarn

### Backend سیٹ اپ

```bash
# Backend ڈائریکٹری میں جائیں
cd backend

# Dependencies انسٹال کریں
npm install

# .env.example کو .env میں رینیم کریں
cp .env.example .env

# اپنی MongoDB URI اور JWT Secret سیٹ کریں
# .env فائل میں ترمیم کریں

# سرور شروع کریں
npm start
```

### Frontend سیٹ اپ

```bash
# Frontend ڈائریکٹری میں جائیں
cd frontend

# ایک لوکل ویب سرور شروع کریں
# یا براہ راست browser میں index.html کھولیں
```

## 🎯 استعمال

### لاگ ان کریں
1. پہلے سائن اپ کریں
2. اپنا نام، ای میل، پاس ورڈ اور شہر درج کریں
3. سائن اپ کریں
4. اب آپ چیٹ کر سکتے ہیں!

### چیٹ شروع کریں
1. سائڈ بار سے کوئی صارف منتخب کریں
2. پیغام ٹائپ کریں
3. **Send** بٹن دبائیں یا Enter دبائیں

### گروپ بنائیں
1. **👫 نیا گروپ** بٹن دبائیں
2. گروپ کا نام درج کریں
3. ارکان منتخب کریں
4. **گروپ بنائیں** دبائیں

### میڈیا شیئر کریں
1. **📎** بٹن دبائیں
2. تصویر یا ویڈیو منتخب کریں
3. خودکار طور پر اپ لوڈ ہوگی

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - نیا صارف بنائیں
- `POST /api/auth/login` - لاگ ان کریں
- `POST /api/auth/logout` - لاگ آؤٹ کریں

### صارفین
- `GET /api/users` - تمام صارفین
- `GET /api/users/search?q=query` - صارفین تلاش کریں
- `GET /api/users/:id` - صارف کی معلومات

### پیغامات
- `POST /api/messages/send` - پیغام بھیجیں
- `GET /api/messages/history/:userId` - چیٹ کی تاریخ
- `GET /api/messages/search?q=query` - پیغامات تلاش کریں

### گروپز
- `POST /api/groups/create` - گروپ بنائیں
- `GET /api/groups/my-groups` - میری گروپز
- `POST /api/groups/:groupId/add-member` - صارف شامل کریں

### میڈیا
- `POST /api/media/upload` - میڈیا اپ لوڈ کریں

## 🌐 Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/nms
JWT_SECRET=your_secret_key_here
PORT=3000
NODE_ENV=development
UPLOADS_DIR=./uploads
```

## 📁 فائل کی ساخت

```
NMS/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Message.js
│   │   └── Group.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── messages.js
│   │   ├── groups.js
│   │   └── media.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── config.js
│   │   ├── api.js
│   │   ├── encryption.js
│   │   ├── auth.js
│   │   ├── chat.js
│   │   └── ui.js
└── README.md
```

## 🚀 آگے کی ترقی

- [ ] ویڈیو کال (WebRTC)
- [ ] آواز کال
- [ ] درست وقت میں ٹاپی مینجمنٹ
- [ ] خودکار ترجمہ
- [ ] ٹیمپلیٹ پیغامات
- [ ] Bot انضمام

## 🤝 تعاون

یہ منصوبہ کھلا ہے! اگر آپ بہتری کے تجاویز رکھتے ہیں تو براہ کرم ایک Issue یا Pull Request کھولیں۔

## 📞 رابطہ

سوالات یا تجاویز کے لیے رابطہ کریں:
- **GitHub**: [@moinukhan-khi](https://github.com/moinukhan-khi)
- **Email**: moinukhan@gmail.com

## 📄 لائسنس

یہ منصوبہ MIT لائسنس کے تحت ہے۔

---

**خوشی سے کوڈنگ کریں! 💻✨**
