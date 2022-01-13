import City from "../models/City.js"


export const getCities = async (req, res) => {
    try {
        const cities = await City.find()
        res.status(200).json({ success:true, result: cities })
    } catch (error) {
        console.log(error)
        res.status(501).json( { success:false, err: error.message } )
    }
}

export const createCity = async (req, res) => {
    const city = req.body;
    try {

        const existedCity = await City.findOne(city);
        if (existedCity) return res.status(400).json({success: false, msg:"City already exists!"})
        
        const newCity = new City (city)
        await newCity.save();
        res.status(200).json({ success:true, newCity})
    } catch (error) {
        console.log(error);
        res.status(409).json({ success:false, err: error.message })
    }
}