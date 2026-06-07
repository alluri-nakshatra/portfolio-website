async function getWeather(){

    const city =
        document.getElementById("cityInput").value;

    const result =
        document.getElementById("weatherResult");

    try{

        const response =
        await fetch(
        `https://wttr.in/${city}?format=j1`
        );

        const data =
        await response.json();

        result.innerHTML = `
            <h3>${city}</h3>
            <p>
            Temperature:
            ${data.current_condition[0].temp_C}°C
            </p>

            <p>
            Humidity:
            ${data.current_condition[0].humidity}%
            </p>

            <p>
            Wind Speed:
            ${data.current_condition[0].windspeedKmph}
            km/h
            </p>
        `;

    }
    catch(error){

        result.innerHTML =
        "Unable to fetch weather data.";
    }
}