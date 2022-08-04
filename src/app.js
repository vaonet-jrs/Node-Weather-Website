const path = require('path')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jake Stewart',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jake Stewart',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Jake Stewart',
    helpText: 'This is the help page!',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address.',
    })
    return
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return ressend({ error })
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        })
      })
    }
  )
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term.',
    })
    retur
  }
  console.log(req.query)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Article Not Found',
    name: 'Jake Stewart',
    errMess:
      'The entered page cannot be found. Please navigate back to help page.',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page Not Found',
    name: 'Jake Stewart',
    errMess:
      'Page not found. Please navigate back to home or enter a valid URL.',
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
