const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const p1 = document.getElementById('1')
const p2 = document.getElementById('2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = searchTerm.value

  p2.textContent = ''
  p1.textContent = 'Loading Result...'

  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          p1.textContent = data.error
        } else {
          p1.textContent = 'Location: ' + data.location
          p2.textContent = 'Forecast: ' + data.forecast
        }
      })
    }
  )
})
