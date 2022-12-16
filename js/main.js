'use strict'

// User's search
let displayTerm = "";

// Lists for,
let pokeList; // Objects
let pokeNameList = []; // Name
let pokeUrlList = []; // URLs
let tempPokeNameList = [];
let tempPokeUrlList = [];

// Hold page data for searching with limit
let currentPageIndex = 0;
let pageLimit;

// Will hold state if a selected Pokemon is being viewed
let isViewingEntry = false;

// Holds temporary screen content when viewing entry
let tempLine = "";

// Saves search status
let searching = false;

// Saves page control elements
let searchBar;
let types;
let pageLimits;
let info;
let search; 
let resultText;
let poke_url;
// Local storage
const prefix = "sdh5898-";
const searchKey = prefix + "search";
const typeKey = prefix + "type";
const limitKey = prefix + "limit";

const storedSearch = localStorage.getItem(searchKey);
const storedType = localStorage.getItem(typeKey);
const storedLimit = localStorage.getItem(limitKey);

// Once page loads, add data
window.onload = (e) => {
    document.querySelector("#submit").onclick = searchClicked;
    getList();

    // Save neccessary page elements
    info = document.querySelector("#info");
    searchBar = document.querySelector("#searchBar");
    types = document.querySelector("#type");
    pageLimits = document.querySelector("#limit");
    resultText = document.querySelector("#result");

    // Tie onchange events to controls to save to webstorage
    searchBar.onchange = e => { localStorage.setItem(searchKey, e.target.value); };
    types.onchange = e => { localStorage.setItem(typeKey, e.target.value); };
    pageLimits.onchange = e => { localStorage.setItem(limitKey, e.target.value); };

    // If search controls have saved local storage values display them
    if (storedSearch) { searchBar.value = storedSearch; }
    else { searchBar.value = ""; }

    if (storedType) { types.querySelector("option[value='" + storedType + "']").selected = true; }

    if (storedLimit) { pageLimits.querySelector("option[value='" + storedLimit + "']").selected = true; }
};

// Gets data of all Pokemon from PokeAPI to store for later use
function getList() {
    // URL to access list of all Pokemon names and URLs from PokeAPI
    const pokeAPI = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=964";

    // Get data
    getData(pokeAPI);
}

// Use XMLHttpRequest to attempt connection
function getData(url) {
    let xhr = new XMLHttpRequest();

    if (url.includes("?")) { xhr.onload = initialDataLoaded; } // Initially loads all basic Pokemon info into lists
    else if (isViewingEntry) { xhr.onload = specificDataLoaded; }   // Accesses specific Pokemon stats
    else if (url.includes("type")) { xhr.onload = typeDataLoaded; } // Accesses Pokemon type lists for searching by type
    else { xhr.onload = dataLoaded; }

    xhr.onerror = dataError;

    xhr.open("GET", url);
    xhr.send();
}

// Error caught if XMLHttpRequest fails
function dataError(e) {
    resultText.innerHTML = "Error accessing Pokemon data!";
}

// Builds list of all Pokemon from data gained from PokeAPI
function initialDataLoaded(e) {
    let xhr = e.target;

    // Creates object containing all pokemon names and URLs from PokeAPI
    let pokeListObj = JSON.parse(xhr.responseText);

    // Exit function if there is no data
    if (pokeListObj.results == 0 || !pokeListObj) {
        resultText.innerHTML = "Error accessing Pokemon data!";
        return;
    }

    // Create list of all Pokemon objects, names, and URLs
    pokeList = pokeListObj.results;

    for (let pokemon in pokeList) {
        pokeNameList.push(pokeList[pokemon].name);
        pokeUrlList.push(pokeList[pokemon].url);
    }
}

// Obtains thumbnails and name of Pokemon for displaying results
function dataLoaded(e) {
    let xhr = e.target;

    tempPokeNameList = []; // Resets temporary Pokemon lists
    tempPokeUrlList = [];

    // Creates object containing all pokemon stats
    let pokemonObj = JSON.parse(xhr.responseText);

    // Exit function if there is no data
    if (pokemonObj.name == 0 || !pokemonObj) {
        resultText.innerHTML = "Error accessing Pokemon data!";
        return;
    }

    // Update screen to display pokemon information
    // Give every element in every result same class so any element clicked in div references same name
    let line = "<div class='result' onClick='entryClicked(event);' id='" + pokemonObj.name + "'>";
    line += "<p class='" + pokemonObj.name + "'>" + pokemonObj.name.toUpperCase() + "</p>";

    if (pokemonObj.sprites.front_default) {  // Checks if image exists before displaying it
        line += "<img src='" + pokemonObj.sprites.front_default;
        line += "' title='" + pokemonObj.name + " sprite' class='" + pokemonObj.name + "'/>";
    }
    else {
        line += "<br> No Image Avliable "}

    line += "</div>";

    // Checks if pokemon is already in results, exits if is
    if (info.innerHTML.includes(line)) {
        return;
    }

    // Checks if limit has been set, populates page data if it has
    if (pageLimit == "all") {
        info.innerHTML += line; // Add to screen
        tempLine += line;
        return;
    }
    else {
        if (currentPageIndex >= pageLimit) {
            return;
        } else {
            info.innerHTML += line; // Add to screen
            tempLine += line;
            currentPageIndex++;
        }
    }
}

// Obtains specific stats of Pokemon clicked
function specificDataLoaded(e) {
    let xhr = e.target;

    // Creates object containing all pokemon stats
    let pokemonObj = JSON.parse(xhr.responseText);

    // Exit function if there is no data
    if (!pokemonObj) {
        return;
    }

    // Update screen to show specific pokemon stats
    info.innerHTML = ""; // Clears screen

    let line = "<div class='entry'>";
    // NAME
    line += "<div id='pokemon'><p id='name'>" + pokemonObj.name.toUpperCase() + "</p>";


    // Checks if image exists
    // add an image for the front and back face
    // also add shiny version
    if (pokemonObj.sprites.front_default) {
        line += "<img src='" + pokemonObj.sprites.front_default;
        line += "' title='" + pokemonObj.name + " sprite'/>";
    }

    if (pokemonObj.sprites.back_default) {
        line += "<img src='" + pokemonObj.sprites.back_default;
        line += "' title='" + pokemonObj.name + " back facing sprite'/>";
    }

    if (pokemonObj.sprites.front_shiny) {
        line += "<img src='" + pokemonObj.sprites.front_shiny;
        line += "' title='" + pokemonObj.name + " shiny sprite'/>";
    }

    if (pokemonObj.sprites.back_shiny) {
        line += "<img src='" + pokemonObj.sprites.back_shiny;
        line += "' title='" + pokemonObj.name + " back facing shiny sprite'/>";
        line += "<br>";
    }

    line += "</div><div id='stats'><div>";

    // TYPES
    let types = pokemonObj.types    

    line += "</div><div><br><p id='types'>Types:";

    // Loops through all types
    for (let type of types) {    
        line += "  " + type.type.name.toUpperCase() + "  ";
    }


    // STATS
    let stats = pokemonObj.stats    
    line += "</div><div><br><p id='types'>Stats:";

     // Loops through all stats
    for (let stat of stats) {   
        line += "<p>" + stat.stat.name.toUpperCase() + ": ";
        line += stat.base_stat + "</p><br>";
    }

    // RETURN
    line += "<div id='input'><button type='button' onClick='backClicked();'>";
    line += "Return" + "</button></div>";

    line += "</div></div>";

    info.innerHTML += line;
}

// Loads list of pokemon of specific type to sort through
function typeDataLoaded(e) {
    let xhr = e.target;

    // Creates object containing all pokemon with selected type
    let pokemonOfType = JSON.parse(xhr.responseText).pokemon;

    // Add names and urls of Pokemon that fit type to temporary lists to be scanned
    for (let pokemonIndex of pokemonOfType) {
        tempPokeNameList.push(pokemonIndex.pokemon.name);
        tempPokeUrlList.push(pokemonIndex.pokemon.url);
    }

    // Scan smaller, type filtered list of Pokemon names for matching substring
    // Gets data for matching Pokemon
    let resultFound = false;

    for (let i = 0; i < tempPokeNameList.length; i++) {
        if (tempPokeNameList[i].startsWith(searchBar.value.trim().replace(" ", "-"))) {
            resultFound = true;

            if (i == tempPokeNameList.length - 1) { getData(tempPokeUrlList[i], true); }
            else { getData(tempPokeUrlList[i]); }
        }
    }

    if (!resultFound) {
        resultText.innerHTML = "No Pok&#233;mon found!";
    }

    searching = false;
}

// Executes search of list based on control values
function searchClicked() {
    isViewingEntry = false;

    if (searching == true) { return; }
    else { searching = true; }

    // Resets results
    info.innerHTML = "";
    tempLine = ""; // Resets displayed search results
    currentPageIndex = 0;

    // Save and trim search term
    let searchTerm = searchBar.value.trim();
    let tempSearchTerm = searchTerm.replace(" ", "-"); //Replace any spaces with dash for use in search

    // Save selected type value
    let typeValue = types[types.selectedIndex].value;

    // Save selected search limit
    pageLimit = pageLimits[pageLimits.selectedIndex].value;

    if (tempSearchTerm == "" && pageLimit == "all" && typeValue == "all") {
        resultText.innerHTML = "Please select at least 1 filter!";
        searching = false;
        return;
    }

    // Displays state to user
    resultText.innerHTML = "";


    // Checks if user has selected type, will then scan shorter list of Pokemon and get results
    if (typeValue != "all") {
        getData("https://pokeapi.co/api/v2/type/" + typeValue);

        return; // Exits function as search is completed on smaller list
    }

    let resultFound = false;

    // Scan global Pokemon list for any Pokemon names with a substring that matches the term
    for (let i = 0; i < pokeNameList.length; i++) {
        if (pokeNameList[i].startsWith(tempSearchTerm)) {
            resultFound = true;
            getData(pokeUrlList[i]);
        }
    }

    if (!resultFound) {
        resultText.innerHTML = "No Pokémon found!";
    }

    searching = false;
}

// Updates page to display specific Pokemon info when an entry is clicked.
function entryClicked(event) {
    poke_url = "https://pokeapi.co/api/v2/pokemon/"; // We will add target url to this
    isViewingEntry = true; // Changes state to track how long user is viewing entry

    // Gets data for the specific Pokemon clicked
    if (pokeNameList.indexOf(event.target.className) == -1) {

        poke_url += adjustIndex(pokeNameList.indexOf(event.target.id));      // If div is clicked use id (already has class)
    }
    else {
        poke_url += adjustIndex(pokeNameList.indexOf(event.target.className)); // Uses class (Pokemon Name) of div clicked
    }

    getData(poke_url);
}

// Re-displays search results saved in tempList when done viewing entry
function backClicked() {
    info.innerHTML = tempLine;

    isViewingEntry = false; // Sets state back so program knows player is done viewing entry
}

// If pokemon is a special type or mega evolution, their index must be shifted to use proper url
// Returns shifted index
function adjustIndex(index) {
    if (index > 806) { // Any index after 806 is when PokeAPI starts numbering pokemon starting with 10001
        index -= 806;
        index += 10000;
        return index;
    }

    return index + 1;
}