// Recommended: All functions declared here

// Recommended: constants with references to existing HTML-elements

// Recommended: Ask for the city name and then the rest of the code

const fakePrompt = "malmö"

const cityListDiv = document.getElementById("cities");

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

function markCityObject(cityObject, kindOfCity) {
    let promptObject = document.getElementById(cityObject.name); /* promptObject refererar till ett HTML-element med ID (argumentet.name), 
alltså argumentet som är ett objekt och objektets nyckel (name) = namnet på staden */
    if (kindOfCity == "target") {
        promptObject.classList.add("target");
    } else if (kindOfCity == "closest") {
        promptObject.classList.add("closest");
        promptObject.textContent += ` ligger ${cityObject.name} mil bort` // temporär variabel till senare operation för avstånd.
    } else if (kindOfCity == "furthest") {
        promptObject.classList.add("furthest");
        promptObject.textContent += ` ligger ${cityObject.name} mil bort`
    }
    console.log(cityObject.name) // Test om det fungerar
};

markCityObject(cities[2], "furthest")
console.log(cityListDiv)