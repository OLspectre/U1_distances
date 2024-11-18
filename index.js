// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code


let tableDiv = document.getElementById("cities");

function createAllCityBoxes() {
    for (let city of cities) {
        let eachCityName = document.createElement("div");
        tableDiv.appendChild(eachCityName);
        eachCityName.className = "cityBox";
        eachCityName.textContent = `${city.name}`

    }
}
createAllCityBoxes();

console.log(tableDiv)