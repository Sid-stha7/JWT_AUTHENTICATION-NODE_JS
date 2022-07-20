const mongoose = require("mongoose")

 connectDb = async()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)

        console.log(`MongoBD connected : ${conn.connection.host}`.cyan.underline.bgGreen);
    } catch (error) {
        
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDb

