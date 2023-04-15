
const horas = document.querySelector('.horas')
const dtDia = document.querySelector('.dt-dia') 

// header  

function horario() {
    let hr = new Date().toLocaleTimeString("pt-br", {
      hour:'2-digit',
      minute:'2-digit'  
    })

    horas.innerHTML = hr
    setTimeout("horario()",1000)
}

function userDate () {
    
    let dt = new Date().toLocaleDateString("pt-br", {
        weekday:'long',
        day:'2-digit',
        month:'long'
    })
     
    dtDia.innerHTML=dt
}
    
horario()
userDate()



// Consumindo Api

const apikey = '27c6eb419786a1d7f7c078b3fab48908'
const cityInput = document.querySelector('input')
const btn = document.querySelector('button')
const containerElement = document.querySelector('.container-informations')
const tempElement = document.querySelector('#temp-graus')
const cityElement = document.querySelector('#name-city')
const descElement = document.querySelector('#cond-clima')
const iconElement = document.querySelector('#img-cond-clima')
const umidityElement = document.querySelector('#umidade')
const veloxElement = document.querySelector('#velox')

const getWeatherData = (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`
    
    fetch(apiWeatherURL)
    .then(resp => resp.json())
    .then(data => {
        cityElement.innerText = `${data.name}, ${data.sys.country}`
        tempElement.innerText = parseInt(data.main.temp)
        descElement.innerText = data.weather[0].description
        iconElement.setAttribute('src',` http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        umidityElement.innerText = `${data.main.humidity}%`
        veloxElement.innerText = `${data.wind.speed} km/h`

        containerElement.style.display='flex'
    })
    .catch(err => {
        alert('Digite o nome corretamente')
        containerElement.style.display='none'
    })
}


//eventos

btn.addEventListener('click',(e) => {
   e.preventDefault()
   const city = cityInput.value
         getWeatherData(city)
         
         
})

cityInput.addEventListener('keyup',(e) => {
    if(e.code === 'Enter'){
        const city = e.target.value
            getWeatherData(city)
    }

})

cityInput.addEventListener('keyup',(e) => {

    const value = e.currentTarget.value
    if(value.length < 3) {
        btn.disabled = true
    } else {
        btn.disabled = false
    }

})

