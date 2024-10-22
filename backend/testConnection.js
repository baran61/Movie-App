// testConnection.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://baran99:njUrFCtfD19cfAYw@localhost:27017/movie';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI,);
        console.log('MongoDB’ye bağlandı.');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error);
    }
};

connectDB();
