function createAllCityBoxes() {
    for (let city of cities) {
        let cityBoxWithName = document.createElement("div");
        cityListDiv.appendChild(cityBoxWithName);
        cityBoxWithName.className = "cityBox";
        cityBoxWithName.textContent = `${city.name}`;
        cityBoxWithName.id = city.name;
    };
};

function markCityBox(cityObject, kindOfCity) {
    let isCityBox = document.getElementById(cityObject.name);
    if (kindOfCity == "target") {
        isCityBox.classList.add("target");
    } else if (kindOfCity == "closest") {
        isCityBox.classList.add("closest");
    } else if (kindOfCity == "furthest") {
        isCityBox.classList.add("furthest");
    };
};

function getClosestCity(targetCityObject) {
    let closestConnection = null;
    for (let distanceData of distances) {
        if (distanceData.city1 === targetCityObject.id || distanceData.city2 === targetCityObject.id) {
            if (closestConnection == null || distanceData.distance < closestConnection.distance) {
                closestConnection = distanceData;
            };
        };
    };

    let closestCityId = null;
    for (let cityId of [closestConnection.city1, closestConnection.city2]) {
        if (cityId !== targetCityObject.id) {
            closestCityId = cityId;
        };
    };

    let closestCity = null;
    for (let city of cities) {
        if (city.id === closestCityId) {
            closestCity = city;
        };
    };

    return { name: closestCity.name, distance: closestConnection.distance };
};

function getFurthestCity(targetCityObject) {
    let furthestConnection = null;
    for (let distanceData of distances) {
        if (distanceData.city1 === targetCityObject.id || distanceData.city2 === targetCityObject.id) {
            if (furthestConnection == null || distanceData.distance > furthestConnection.distance) {
                furthestConnection = distanceData;
            };
        };
    };

    let furthestCityId = null;
    for (let cityId of [furthestConnection.city1, furthestConnection.city2]) {
        if (cityId !== targetCityObject.id) {
            furthestCityId = cityId;
        };
    };

    let furthestCity = null;
    for (let city of cities) {
        if (city.id === furthestCityId) {
            furthestCity = city;
        };
    };

    return { name: furthestCity.name, distance: furthestConnection.distance };
};

function getCityByName(userPromptInput) {
    for (let city of cities) {
        if (city.name === userPromptInput) {
            return city;
        };
    };
    return null;
};

function updateBoxDistance(closestResultObject, furthestResultObject) {
    const closestDiv = document.querySelector(".closest");
    const furthestDiv = document.querySelector(".furthest");
    closestDiv.textContent =
        `${closestResultObject.name} ligger 
    ${closestResultObject.distance / 10} mil bort`;
    furthestDiv.textContent =
        `${furthestResultObject.name} ligger 
    ${furthestResultObject.distance / 10} mil bort`;
};

function createDistancesTable(citiesArray, distancesArray) {
    const emptyCornerCell = document.createElement("div");
    emptyCornerCell.classList.add("cell", "corner_cell");
    emptyCornerCell.innerHTML = "&nbsp;";
    table.appendChild(emptyCornerCell);

    for (const city of citiesArray) {
        const headColCell = document.createElement("div");
        headColCell.classList.add("cell", "head_column");
        headColCell.textContent = city.id;
        table.appendChild(headColCell);
    };
    for (const currentRowCity of citiesArray) {
        const rowHeader = document.createElement("div");
        rowHeader.classList.add("cell", "head_row");
        rowHeader.textContent = `${currentRowCity.id}-${currentRowCity.name}`;
        table.appendChild(rowHeader);

        for (const currentColumnCity of citiesArray) {
            const distanceCell = document.createElement("div");
            distanceCell.classList.add("cell");

            if (currentColumnCity.id % 2 === 0) {
                distanceCell.classList.add("even_col");
            };

            let distance = null;
            for (const distanceData of distancesArray) {
                if (
                    (distanceData.city1 === currentRowCity.id && distanceData.city2 === currentColumnCity.id) ||
                    (distanceData.city1 === currentColumnCity.id && distanceData.city2 === currentRowCity.id)
                ) {
                    distance = distanceData.distance;
                    break;
                };
            };

            if (currentRowCity.id === currentColumnCity.id) {
                distanceCell.innerHTML = "&nbsp;";
            } else {
                distanceCell.textContent = distance / 10;
            };

            if (currentRowCity.id % 2 === 0) {
                distanceCell.classList.add("even_row");
                rowHeader.classList.add("even_row");
            };
            table.appendChild(distanceCell);
        };
    };
};

const h2_BigTitle = document.querySelector("h2");
const h3_InfoText = document.querySelector("h3");
const cityListDiv = document.getElementById("cities");
const table = document.getElementById("table");

createAllCityBoxes();

const targetCityName = prompt("En stad");
const targetCityObject = getCityByName(targetCityName);

if (targetCityObject != null) {
    const targetCity = targetCityObject.name;
    const targetCountry = targetCityObject.country;
    let closestCityResult = getClosestCity(targetCityObject);
    let furthestCityResult = getFurthestCity(targetCityObject);
    document.title = `${targetCityName}`;
    h2_BigTitle.textContent = `${targetCity} (${targetCountry})`;
    h3_InfoText.textContent = `Av städerna i databasen ligger ${closestCityResult.name} närmast och ${furthestCityResult.name} längst bort`;
    markCityBox(targetCityObject, "target");
    markCityBox(closestCityResult, "closest");
    markCityBox(furthestCityResult, "furthest");
    updateBoxDistance(closestCityResult, furthestCityResult);
} else {
    document.title = "Not Found";
    h2_BigTitle.textContent = "";
    h3_InfoText.textContent = `${targetCityName} finns inte i databasen`;
};

createDistancesTable(cities, distances);
