const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo DB'ye bağlandı.")
    } catch(err){
        console.log("MongoDB Bağlantı Hatası", err)
        process.exit(1)
    }

}

module.exports = connectDB;