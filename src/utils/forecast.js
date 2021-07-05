const request = require('request')

const forecast = (lat, long, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=cd95e020c70631adc4c4c31aad8ab5d6&query=' + long + ',' + lat + '&units=f'

    request({url, json:true}, (error, {body}) =>{

        if (error){
            callback('Unable to connect', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] +'.It is currently ' + body.current.temperature+' degrees out. It feels like '+ body.current.feelslike +' degrees out.')
        }
    })
}


module.exports = forecast