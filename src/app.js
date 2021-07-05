const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const forecast = require('./utils/forecast.js')
const geoCode = require('./utils/geocode.js')


const app = express()
//Express configs 
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Vrund Shah'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Vrund Shah'
    })
})

app.get('/help', (req,res)=>{

    res.render('help',{
        message: "This is the help message",
        title: 'Help',
        name: 'Vrund Shah '
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location_name}= {})=>{
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location_name,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'Sunny',
    //     location:'Toronto',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Vrund Shah',
        error: 'Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:'404 page',
        name: 'Vrund Shah',
        error:'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
