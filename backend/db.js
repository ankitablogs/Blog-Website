const mongoose = require('mongoose');


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to the database');
    }
}

module.exports = connect;