let bigbody = document.querySelector(".bigbogy");
let water = document.querySelector(".water");

setTimeout(function () {
    bigbody.classList.remove("hide")
    water.classList.add("hide")
    setFocus()
}, 10)


let search_inp = document.querySelector(".input");
let btn_srch = document.querySelector(".search");
let container = document.querySelector(".container");
let divName = document.querySelector(".fornameh1")
const ip_key = "3bad709d0b8b493242d8517df9c5aa89";

function secton_prnt(arr, array) {

    let openbtn = document.createElement("button")
    let iconInBtn = document.createElement("i")
    iconInBtn.classList.add("fas")
    iconInBtn.classList.toggle("fa-sort-down")
    openbtn.appendChild(iconInBtn)
    openbtn.classList.add("openbtn")

    let { pressure } = arr

    openbtn.addEventListener("click", () => {

        
        iconInBtn.classList.toggle("fa-sort-up")
        section.classList.toggle("mystyle");
        section2.classList.toggle("toggleTemp")



        section2.innerHTML = `
        <div class="inform"><h3>Time zone ${array.timezone}</h3></div>
		<div class="inform"><h3>Pressure ${Math.floor(pressure * 0.750062)} mmHg</h3></div>
		<div class="inform"><h2>Humidity  ${array.current.humidity}  %</h2></div>
	    `
    })

    let img = arr.weather[0].icon
    let imigurl = `https://openweathermap.org/img/wn/${img}.png`

    let sunrise = new Date(array.current.sunrise * 1000).toLocaleTimeString()
    let sunrset = new Date(array.current.sunset * 1000).toLocaleTimeString()
    let date = new Date(arr.dt * 1000)

    let section = document.createElement("div")
    section.classList.add("section")


    section.innerHTML = `
    <div class="inform"><h2>Data ${date.toLocaleDateString()}</div>
        <div class="inform"><h2>Day ${Math.round(arr.temp.day - 273.15) + "  " + "C " + "&#176"}   /     Nigth ${Math.round(arr.temp.night - 273.15) + "  " + "C<sup>o</sup>"}</h2></h2></div>
        <div class="inform ">

            <div class="inform3">       
            <img src=${imigurl}>        
            </div>  
            
            <div class="inform2">        
            <h2>${arr.weather[0].description}</h2>
            </div>     
        
        </div>  
       
		`

    divName.innerHTML = ` 
    <div class="inform"><h1>${search_inp.value} </div>
    <div class="inform"><h2>Sunrise ${sunrise} </div>
    <div class="inform"><h2>Sunrset ${sunrset}</div>
    <div class="inform"><h2>Humidity ${array.current.humidity} %</div>
    <div class="inform"><h2>Wind ${array.current.wind_speed} km</div>`

    let section2 = document.createElement("div")
    section2.classList.add("section2", "toggleTemp")

    section.appendChild(openbtn)
    container.appendChild(section)
    container.appendChild(section2)

}


async function fetch_fn(inp) {

    const result_data = [];

    const requestURL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${ip_key}& units=metric`)
  
    const req_url_for_lat_lon = await requestURL.json()

    let requestURL2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${req_url_for_lat_lon.coord.lat}&lon=${req_url_for_lat_lon.coord.lon}&exclude=hourly&appid=${ip_key}& units=metric`)
    
    let req_url2 = await requestURL2.json()

    result_data.push(req_url2)

    for (let i = 0; i < result_data[0].daily.length; i++) {

        secton_prnt(result_data[0].daily[i], result_data[0])

    }

    search_inp.value = "";
}

if (!search_inp.value) {
    search_inp.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {

            event.preventDefault();
            container.innerHTML = ""

            fetch_fn(search_inp.value)

            document.querySelector(".container").style.border = "2px solid white"
            document.querySelector(".container").style.borderRadius = "5px"
        }
    })
}

btn_srch.addEventListener("click", () => {

    container.innerHTML = ""
    fetch_fn(search_inp.value)

    document.querySelector(".container").style.border = "2px solid white"
    document.querySelector(".container").style.borderRadius = "5px"

})

function imgChang() {

    let curntdt = new Date();

    if (curntdt.getHours() >= 20 && curntdt.getHours() <= 24 || curntdt.getHours() >= 00 && curntdt.getHours() <= 06) {

        // document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundImage = "url('img/earth-11595.jpg')";

    }
    else if (curntdt.getHours() >= 07 && curntdt.getHours() <= 19) {
         document.body.style.backgroundSize = "cover";
        // document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundImage = "url('img/Africa-3d-1.jpg')";
    }
}
imgChang()

document.querySelector("body").addEventListener("onload", setFocus);

function setFocus() {
    document.getElementById("name").focus();
}