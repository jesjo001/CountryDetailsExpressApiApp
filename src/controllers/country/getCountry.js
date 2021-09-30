import axios from 'axios';

export const searchByName = async (req, res, next) => {

    if(!req.params.name) return res.status(500).send("Invalid query parameters")

    const { name } = req.params;

    try {
        const response = await axios.get(`${process.env.COUNTRY_API_BASE_URL}/name/${name}?access_key=${process.env.COUNTRY_API_KEY}&FullText=true`);
        console.log(response.data);
        console.log(response.status);

        if(response.status !== 200) return res.status("404").json({
            status: response.status,
            message: response.message
        })
        let data = response.data[0]
        const { altSpellings, region, callingCodes } = data
        const fullname = altSpellings[altSpellings.length - 1];

        console.log(`region ${region} calling ${callingCodes} fullname ${fullname}`)

        return res.status(200).json({
            status: response.status,
            region,
            fullname,
            callingCodes,
            // country: response.data[0],
            message: "success"
        })
    } catch (e) {
        console.log(e)
    }

}