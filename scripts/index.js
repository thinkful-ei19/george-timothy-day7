'use strict';
const API_KEY = 'AIzaSyAdDHddiRP4SYxg-WeRCY5M37UMo6N_s3A';

/*
  We want our store to hold a `videos` array of "decorated" objects - i.e. objects that
  have been transformed into just the necessary data to display on our page, compared to the large
  dataset Youtube will deliver to us.  Example object:
  
  {
    id: '98ds8fbsdy67',cd
    title: 'Cats dancing the Macarena',
    thumbnail: 'https://img.youtube.com/some/thumbnail.jpg'
  }
*/
const store = {
  videos: [],
};

// TASK: Add the Youtube Search Base URL here:
// Documentation is here: https://developers.google.com/youtube/v3/docs/search/list#usage
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

// TASK:
// 1. Create a `fetchVideos` function that receives a `searchTerm` and `callback`
// 2. Use `searchTerm` to construct the right query object based on the Youtube API docs
// 3. Make a getJSON call using the query object and sending the provided callback in as the last argument
// TEST IT! Execute this function and console log the results inside the callback.
const fetchVideos = function (searchTerm, callback) {
  console.log('`fetchVideos` ran');
  const query = {
    q: `${searchTerm}`,
    key: API_KEY,
    part: 'snippet'


  };
  $.getJSON(BASE_URL, query, callback);
};
// fetchVideos('cats', function(response){
//   let decorateObjects = decorateResponse(response);
//   addVideosToStore(decorateObjects);
//   render();
//   let htmlObjects =  decorateObjects.map(generateVideoItemHtml);
//   console.log(htmlObjects.join(''));
// });

// TASK:
// 1. Create a `decorateResponse` function that receives the Youtube API response
// 2. Map through the response object's `items` array
// 3. Return an array of objects, where each object contains the keys `id`, `title`, 
// `thumbnail` which each hold the appropriate values from the API item object. You 
// WILL have to dig into several nested properties!
// TEST IT! Grab an example API response and send it into the function - make sure
// you get back the object you want.
function decorateResponse(response){
  console.log('`decorateResponse` ran');
  console.log('global response', response);
  const decorateObjects = response.items.map(item => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    };
  });
  console.log(JSON.stringify(decorateObjects, null, 4));
  addVideosToStore(decorateObjects);
  render();
}

// TASK:
// 1. Create a `generateVideoItemHtml` function that receives the decorated object
// 2. Using the object, return an HTML string containing all the expected data
// TEST IT!
const generateVideoItemHtml = function (video) {
  console.log('`generateVideoItemHtml` ran');
  return `
      <div>
      <h2>
      ${video.title}
      </h2>
      </div>
  `;
};

// TASK:
// 1. Create a `addVideosToStore` function that receives an array of decorated video 
// objects and sets the array as the value held in store.items
// TEST IT!
const addVideosToStore = function (videos) {
  videos.forEach(video => store.videos.push(video));
};

// TASK:
// 1. Create a `render` function
// 2. Map through `store.videos`, sending each `video` through your `generateVideoItemHtml`
// 3. Add your array of DOM elements to the appropriate DOM element
// TEST IT!
const render = function () {
  console.log('`render` ran');
  let videoString = store.videos.map(video => {
    return generateVideoItemHtml(video);
  }).join('');
  console.log(videoString);
  $('.results').html(videoString);
};

// TASK:
// 1. Create a `handleFormSubmit` function that adds an event listener to the form
// 2. The listener should:
//   a) Prevent default event
//   b) Retrieve the search input from the DOM
//   c) Clear the search input field
//   d) Invoke the `fetchVideos` function, sending in the search value
//   e) Inside the callback, send the API response through the `decorateResponse` function
//   f) Inside the callback, add the decorated response into your store using the `addVideosToStore` function
//   g) Inside the callback, run the `render` function 
// TEST IT!
const handleFormSubmit = function () {
  $('#submit-btn').on('click', function(event){
    event.preventDefault();
    const searchTerm = $('#search-term').val();
    console.log('This is the Search term',searchTerm);
    fetchVideos(searchTerm, decorateResponse);
  });
};

// When DOM is ready:
$(function () {
  handleFormSubmit();
  // TASK:
  // 1. Run `handleFormSubmit` to bind the event listener to the DOM
});