import mongoose from 'mongoose'

const citySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true}
})

const City = mongoose.model('cities', citySchema)

export default City;