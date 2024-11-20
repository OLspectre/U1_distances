// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements
const targetCityName = prompt("En stad");
const cityListDiv = document.getElementById("cities");
// Recommended: Ask for the city name and then the rest of the code


function createAllCityBoxes() {
    for (let city of cities) {
        let eachCityName = document.createElement("div");
        cityListDiv.appendChild(eachCityName);
        eachCityName.className = "cityBox";
        eachCityName.textContent = `${city.name}`;
        eachCityName.id = city.name; // unikt id med stadens namn, object city med värdet av nyckeln name
    }
};
createAllCityBoxes();

function markCityBox(cityObject, kindOfCity) {
    let isCityBox = document.getElementById(cityObject.name); /* isCityBox refererar till ett HTML-element med ID (argumentet.name), 
alltså argumentet som är ett objekt och objektets nyckel (name) = namnet på staden */
    if (kindOfCity == "target") {
        isCityBox.classList.add("target");
    } else if (kindOfCity == "closest") {
        isCityBox.classList.add("closest");
    } else if (kindOfCity == "furthest") {
        isCityBox.classList.add("furthest");
    }
    console.log(cityObject.name) // Test om det fungerar
};

markCityBox(cities[2], "closest")



function getClosestCity(targetCityName) {
    let closest = null;
    for (let d of distances) {
        // Kontrollera om staden finns i distansobjektet
        if (d.city1 === targetCityName.id || d.city2 === targetCityName.id) {
            // Om ingen närmaste stad hittats eller om den nya distansen är mindre, uppdatera
            if (!closest || d.distance < closest.distance) {
                closest = d; // Spara distansobjektet tex { city1: 3, city2: 5, distance 450}
            }
        }
    }
    // Hitta ID för den närmaste staden
    let closestCityId = null;
    for (let cityId of [closest.city1, closest.city2]) {
        if (cityId !== targetCityName.id) {
            closestCityId = cityId;
        }
    }

    // Hitta stadsobjektet manuellt med en loop
    let closestCity = null;
    for (let city of cities) {
        if (city.id === closestCityId) {
            closestCity = city; // Spara stadsobjektet
        }
    }
    // Returnera den närmaste stadens objekt och avstånd
    return { name: closestCity.name, distance: closest.distance };
}


