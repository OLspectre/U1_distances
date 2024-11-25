// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements
const h2_BigTitle = document.querySelector("h2");
const h3_InfoText = document.querySelector("h3");
const cityListDiv = document.getElementById("cities");
const table = document.getElementById("table");

// Recommended: Ask for the city name and then the rest of the code
const targetCityName = prompt("En stad");
const targetCityObject = getCityByName(targetCityName);

function createAllCityBoxes() {
    for (let city of cities) {
        let eachCityName = document.createElement("div");
        cityListDiv.appendChild(eachCityName);
        eachCityName.className = "cityBox";
        eachCityName.textContent = `${city.name}`;
        eachCityName.id = city.name;
    }
};
createAllCityBoxes();

function markCityBox(cityObject, kindOfCity) {
    let isCityBox = document.getElementById(cityObject.name);
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
        if (d.city1 === targetCityObject.id || d.city2 === targetCityObject.id) {
            if (!closest || d.distance < closest.distance) {
                closest = d;
            }
        }
    }
    let closestCityId = null;
    for (let cityId of [closest.city1, closest.city2]) {
        if (cityId !== targetCityObject.id) {
            closestCityId = cityId;
        }
    }
    let closestCity = null;
    for (let city of cities) {
        if (city.id === closestCityId) {
            closestCity = city;
        }
    }
    return { name: closestCity.name, distance: closest.distance };
}

//FURTHEST FUNKTION
function getFurthestCity(targetCityObject) {
    let furthest = null;
    for (let d of distances) {
        if (d.city1 === targetCityObject.id || d.city2 === targetCityObject.id) {
            if (!furthest || d.distance > furthest.distance) {
                furthest = d;
            }
        }
    }

    let furthestCityId = null;
    for (let cityId of [furthest.city1, furthest.city2]) {
        if (cityId !== targetCityObject.id) {
            furthestCityId = cityId;
        }
    }

    let furthestCity = null;
    for (let city of cities) {
        if (city.id === furthestCityId) {
            furthestCity = city;
        }
    }
    return { name: furthestCity.name, distance: furthest.distance };
}

function getCityByName(nameOfCity) {

    for (let city of cities) {

        if (city.name === nameOfCity) {
            console.log(city)
            return city;
        }
    }
    return null;
}

function updateBoxDistance(closestResultObject, furthestResultObject) {
    const closestDiv = document.querySelector(".closest");
    const furthestDiv = document.querySelector(".furthest");
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

function createDistancesTable(cities, distances) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("cell", "corner_cell");
    emptyCell.innerHTML = "&nbsp;"
    table.appendChild(emptyCell);

    for (const city of cities) {
        const headColCell = document.createElement("div");
        headColCell.classList.add("cell", "head_column");
        headColCell.textContent = city.id;
        table.appendChild(headColCell);
    }
    for (const rowCity of cities) {
        const rowHeader = document.createElement("div");
        rowHeader.classList.add("cell", "head_row");
        rowHeader.textContent = `${rowCity.id}-${rowCity.name}`;
        table.appendChild(rowHeader);

        for (const colCity of cities) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (colCity.id % 2 === 0) {
                cell.classList.add("even_col");
            }

            let distance = null;
            for (const dist of distances) {
                if (
                    (dist.city1 === rowCity.id && dist.city2 === colCity.id) ||
                    (dist.city1 === colCity.id && dist.city2 === rowCity.id)
                ) {
                    distance = dist.distance;
                    break;
                }
            }
            if (rowCity.id === colCity.id) {
                cell.innerHTML = "&nbsp;"
            } else {
                cell.textContent = distance / 10;
            }

            if (rowCity.id % 2 === 0) {
                cell.classList.add("even_row");
                rowHeader.classList.add("even_row");
            }
            table.appendChild(cell);
        }
    }
}
createDistancesTable(cities, distances);