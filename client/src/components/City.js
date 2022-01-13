import { useEffect, useState } from "react"
import { getCities } from '../actions/roomActions'



const City = ({ filter, handleChange, cityValue}) => {
    const [cities, setCities] = useState([])
    useEffect(() => {
        const populateCityMenu = async () => {
            const cityList = await getCities();
            setCities(cityList)
        }
        populateCityMenu()
    }, [])

    return(
      (cities.length > 0) &&  <div className="form-group">
            <label htmlFor="city">City</label>
            <select id="city" name="city" className="form-control" onChange={handleChange} value={cityValue}>
                <option value='' >{filter ? 'All' : 'Select City'}</option>
                {cities.map( city => <option key={city._id} value={city.name}>{city.name}</option> )}
            </select>
        </div>
    )
}

export default City;