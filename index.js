// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

const fakePrompt = "malmö"

let tableDiv = document.getElementById("cities");

function createAllCityBoxes() {
    for (let city of cities) {
        let eachCityName = document.createElement("div");
        tableDiv.appendChild(eachCityName);
        eachCityName.className = "cityBox";
        eachCityName.textContent = `${city.name}`;
        eachCityName.id = city.name; // unikt id med stadens namn, object city med värdet av nyckeln name
    }
};
createAllCityBoxes();

function markCityObject(cityObject, kindOfCity) {
    let promptObject = document.getElementById(cityObject.name); /* promptObject refererar till ett HTML-element med ID (argumentet.name), 
alltså argumentet som är ett objekt och objektets nyckel (name) = namnet på staden */
    if (kindOfCity == "target") {
        promptObject.style.backgroundColor = "black"
        promptObject.style.color = "white"
    } else if (kindOfCity == "closest") {
        promptObject.style.backgroundColor = "green" // Ändra till manuell style till css class
        promptObject.style.color = "white"
    } else if (kindOfCity == "furthest") {
        promptObject.style.backgroundColor = "blue"
        promptObject.style.color = "white"
    }
    console.log(cityObject.name) // Test om det fungerar
};

markCityObject(cities[2], "target")
console.log(tableDiv)