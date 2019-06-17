'use strict';

// This function displays the results in the DOM
function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the repos array, stopping at the max number of results
    for (let i = 0; i < responseJson.length; i++){
      // for each object in the repos array, add a list to
      //the results list with the repo title and url
      $('#results-list').append(
        `<li><h3>${responseJson[i].name}</h3><p><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a></p></li>`
      )};
    //display the results section
    $('#results').removeClass('hidden');
};

function getRepos(username) {
    console.log('getRepos ran');
    //Take username param and add to url
    const url = `https://api.github.com/users/${username}/repos`
    console.log(url);

    //Request to github api
    fetch(url)
    //If response is good, return results in json format
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            //If response is not ok, then throw an error
            throw new Error(response.statusText);
        })
        //If response is good, then we pass json results into the displayResults funuction
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-github-user').val();
        getRepos(searchTerm);
    });
}

$(watchForm);