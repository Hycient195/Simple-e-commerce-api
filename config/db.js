import mongoose from 'mongoose'

const connect = async () =>{

    try {
        const response = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        })
        console.log(`Database is connected on ${response.connection.host}`)
    } catch (error) {
        console.log(`An error occoured in connection ${error.message}`)
        process.exit(1)
    }
  
}
export default connect