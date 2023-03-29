/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
            //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            console.log(searchResults)
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function ////////////FINISHED//////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function /////////////////FINISHED/////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function ////////////FINISHED//////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            displayPeople(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `gender: ${person.gender}\n`;
    personInfo += `dob: ${person.dob}\n`;
    personInfo += `height: ${person.height}\n`;
    personInfo += `weight: ${person.weight}\n`;
    personInfo +=  `Eye Color: ${person.eyeColor}\n`;
    personInfo +=  `occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////FINISHED///
    alert(personInfo);
}
// End of displayPerson()

function findPersonSpouse(poi, people){
let personSpouse = people.filter(function(person){
    if (poi.currentSpouse === person.id) {
        return true
    }
})
return personSpouse;
}
/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
function findSiblings(poi, people){
    let personSiblings = people.filter(function(person){
        let sharedParents = poi.parents.filter(function(parents){
            if (person.parents.includes(parents) )
                return true
            })
            //&& make sure it doesn't post themselves as a sibling in the prompt 
    if(sharedParents.length>0&&poi.id!=person.id)  
        return true
        //if (poi.parents === parents.id) {
    //     return true
    // }
})
return personSiblings;
}

function findParents(poi, people){
    let personParents = people.filter(function(person){
            if (poi.parents.includes(person.id))
                return true
    })
        return personParents
    }

function findPersonDescendants(poi, people){
    let personDescendants = people.filter(function(person){
        if (person.parents.includes(poi.id))
            return true
    })

    return personDescendants
}

function findPersonFamily(poi, people){
    let personParents = findParents(poi, people)
    let personSpouse = findPersonSpouse(poi, people)
    let personSiblings = findSiblings(poi, people)
  displayPeople(personSpouse)
  displayPeople(personSiblings)
  displayPeople(personParents)
}

// function searchByTraits(people = []){
//     let response = prompt("Please type in search criteria without spaces then value.\n'Separate multiple cruiteria by a semicolon (no spaces around semicolon).\n Can also select 'restart' or 'quit'.\n (example one criteria - eyecolor brown)\n (example multiple criteria - eyecolor brown; gender female)",); 

//     let criteria = response.split('; ').map(criterion => criterion.split(' '));
    
//     let matchedPeople = people.filter(person => {
//         let matches = criteria.filter(criterion => {
//             let trait = criterion[0]
//             let searchValue = criterion[1]
//             if (person[trait] === searchValue) return true;
//         });

//         if (matches.length === criteria.length) return true;
//     });
//     displayPeople(matchedPeople);
// }

function searchByTraits(people=[{}]) {
    let response = 'yes';
    while (response === 'yes') {
        let trait = prompt("Please type in search criteria without spaces then value.\n'Separate multiple cruiteria by a semicolon (no spaces around semicolon).\n Can also select 'restart' or 'quit'.\n (example one criteria - eyeColor brown)\n (example multiple criteria - eyeColor brown; gender female)");
        let searchValue = prompt(`Enter a value for ${trait}`);
  
        people = people.filter(person => {
            if(person[trait] === searchValue) return true;
        });

        response = promptFor('Would you like to search by another trait?', yesNo);
    }
    displayPeople(people);
}
