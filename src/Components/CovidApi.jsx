import { useState } from "react";
import axios from "axios";
import styles from "./CovidApi.module.css"
const payload = {
    pin: "",
    date: ""
}

const CovidApi = () => {
    const [state, setState] = useState(payload);
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(false);
    const handleChange = (e) => {
        //console.log(e.target.value)
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("state:", state)
        state.date = state.date.split("-").reverse().join("-");
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${state.pin}&date=${state.date}`).then((res) => {
            console.log("res: ", res)
            setData(res.data);
            setLoading(true)
        })
            .catch(err => console.log("err: ", err))
        //     .finally(setState({
        //         pin: "",
        //         date:""
        // }))
    }
    const { pin, date } = state;
    return (
        <div>
            <form action="" onSubmit={handleSubmit} className={styles.apiForm} id="form-Api">
                <div>
                    <label htmlFor="">Enter your pincode: </label>
                <input type="number" id="pincode" name="pin" value={pin} onChange={handleChange} placeholder="Enter You Pincode"/>
                </div>
                <div>
                    <label htmlFor="">Enter Prefered Date: </label>
                <input type="date" name="date" id="" min="01-01-1977" max="31-12-3121" value={date} onChange={handleChange} />
                </div>
                <button type="submit" >Search Vaccine Availability</button>
            </form>
            {
                //console.log("length: ",data.sessions.length)
            }
            {isLoading && <div>
                {
                    data.sessions.length > 0 ? <div>
                        {
                            data.sessions.map((vaccineData) => {
                                return <div key={vaccineData.center_id} className={styles.centerDetails}>
                                    <h2><span style={{ fontWeight: "300" }}>Center Name: </span> {vaccineData.name}</h2>
                                    <h2><span style={{ fontWeight: "300" }}>Block Name: </span> {vaccineData.block_name}</h2>
                                    <h2><span style={{ fontWeight: "300" }}>District Name: </span> {vaccineData.district_name}</h2>
                                    <h2><span style={{ fontWeight: "300" }}>Age Limit: </span> {vaccineData.min_age_limit}</h2>
                                    <h2><span style={{ fontWeight: "300" }}>Vaccine Name: </span> {vaccineData.vaccine}</h2>
                                    <h2><span style={{ fontWeight: "300" }}>Total Capacity Available: </span> {vaccineData.available_capacity}</h2>
                                    <h2><span style={{ fontWeight: "300" }}>Dose1 : </span> {vaccineData.available_capacity_dose1}</h2>
                                    <h2><span style={{ fontWeight: "300" }}>Dose2 : </span> {vaccineData.available_capacity_dose2}</h2>
                                </div>
                            })
                        }
                    </div>: <div><img src="https://vinoroc.com/static/app/images/no-record-found.76d6bd93c23b.gif" alt="" /></div>
            }
            </div>}
        </div>
    )
}

export default CovidApi;