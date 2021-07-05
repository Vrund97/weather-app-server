const request = require('request')

const geoCode = (address, callback) =>{


    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidnJ1bmQyNSIsImEiOiJja3ByaHRzdWswNDZzMnZvNjQ3MGkyNnVnIn0.JtkZzyRauSvRkQYzKRv3Nw&limit=1'

    request({url, json:true}, (error, {body})=> {
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length ===0){
            callback('Unable to find location. Try another search. ', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location_name : body.features[0].place_name
            })
        }
    })
}

const forecast = (lat, long, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=cd95e020c70631adc4c4c31aad8ab5d6&query=' + lat +', ' +  long + '&units=f'

    request({url:url, json:true}, (error, response) =>{

        if (error){
            callback('Unable to connect', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, response.body.current.temperature)
        }
    })
}


module.exports = geoCode


