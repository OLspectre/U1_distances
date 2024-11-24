// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements
const h2_BigTitle = document.querySelector("h2");
const h3_InfoText = document.querySelector("h3");
const cityListDiv = document.getElementById("cities");
const tableContainer = document.getElementById("table");

const targetCityName = prompt("En stad");
const targetCityObject = getCityByName(targetCityName);



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
};


//CLOSEST FUNKTION
function getClosestCity(targetCityObject) {
    let closest = null;
    for (let d of distances) {
        // Kontrollera om staden finns i distansobjektet
        if (d.city1 === targetCityObject.id || d.city2 === targetCityObject.id) {
            // Om ingen närmaste stad hittats eller om den nya distansen är mindre, uppdatera
            if (!closest || d.distance < closest.distance) {
                closest = d; // Spara distansobjektet tex { city1: 3, city2: 5, distance 450}
            }
        }
    }
    // Hitta ID för den närmaste staden
    let closestCityId = null;
    for (let cityId of [closest.city1, closest.city2]) {
        if (cityId !== targetCityObject.id) {
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

//FURTHEST FUNKTION
function getFurthestCity(targetCityObject) {
    let furthest = null;
    for (let d of distances) {
        // Kontrollera om staden finns i distansobjektet
        if (d.city1 === targetCityObject.id || d.city2 === targetCityObject.id) {
            // Om ingen närmaste stad hittats eller om den nya distansen är mindre, uppdatera
            if (!furthest || d.distance > furthest.distance) {
                furthest = d; // Spara distansobjektet
            }
        }
    }
    // Hitta ID för staden längst bort 
    let furthestCityId = null;
    for (let cityId of [furthest.city1, furthest.city2]) {
        if (cityId !== targetCityObject.id) {
            furthestCityId = cityId;
        }
    }

    // Hitta stadsobjektet manuellt med en loop
    let furthestCity = null;
    for (let city of cities) {
        if (city.id === furthestCityId) {
            furthestCity = city; // Spara stadsobjektet
        }
    }
    // Returnera staden längst bort och avstånd
    return { name: furthestCity.name, distance: furthest.distance };
}


// Omvandlar promptet som är en STRING till ett OBJEKT
// Kan nu nå specifika nycklars värde för att ändra inom HTML-element 
function getCityByName(nameOfCity) {

    for (let city of cities) {

        if (city.name === nameOfCity) {
            console.log(city)
            return city;
        }
    }
    return null;  // Om staden inte hittas
}

function updateBoxDistance(closestResultObject, furthestResultObject) {
    const closestDiv = document.querySelector('.closest');
    const furthestDiv = document.querySelector('.furthest');
    closestDiv.textContent =
        `${closestResultObject.name} ligger 
    ${closestResultObject.distance / 10} mil bort`;
    furthestDiv.textContent =
        `${furthestResultObject.name} ligger 
    ${furthestResultObject.distance / 10} mil bort`;
}


if (targetCityObject != null) {
    const targetCity = targetCityObject.name;
    const targetCountry = targetCityObject.country;
    let closestCityResult = getClosestCity(targetCityObject);
    let furthestCityResult = getFurthestCity(targetCityObject);
    document.title = `${targetCityName}`;
    h2_BigTitle.textContent = `${targetCity} (${targetCountry})`;
    h3_InfoText.textContent = `Av städerna i databasen ligger ${closestCityResult.name} närmast och ${furthestCityResult.name} längst bort `
    markCityBox(targetCityObject, "target");
    markCityBox(closestCityResult, "closest");
    markCityBox(furthestCityResult, "furthest");
    updateBoxDistance(closestCityResult, furthestCityResult);
} else {
    document.title = "Not Found";
    h2_BigTitle.textContent = "";
    h3_InfoText.textContent = `${targetCityName} finns inte i databasen `
}

function createDistanceTable(cities, distances) {
    const headerRow = document.createElement("div");
    headerRow.classList.add("head_row");

    const emptyCell = document.createElement("div");
    emptyCell.classList.add("cell");
    headerRow.appendChild(emptyCell);

    for (let city of cities) {
        const isCityHeader = document.createElement("div");
        isCityHeader.classList.add("cell", "head_column");
        isCityHeader.textContent = `${city.id}-${city.name}`;
        headerRow.appendChild(isCityHeader);
    }
    tableContainer.appendChild(headerRow);
}

createDistanceTable(cities, distances)


