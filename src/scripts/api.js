import store from './store'
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rachel'

//READ
const getBookmark = (() => {
   return fetch(`${BASE_URL}/bookmarks`, {
    mode: 'cors'
   })
      
    });



//CHECK BOOKMARK VALIDIDTY THROUGH TEXTING UPI
const validateUrl = (url => {
   return fetch(url)
        .then(res => console.log(res.ok))

})


const createBookmark = (content => {
    const newBookmark = JSON.stringify(content);
    return fetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    })
        .then(res => res.json())
        .then(data => console.log(data));

});


//UPDATE
const updateBookmark = ((id, updateData) => {
    const newData = JSON.stringify({ updateData });
    return fetch(BASE_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newData
    })
    .then(res => res.json())
    .then(data => console.log(data));;
});



//DELETE FUNCTION
//write delete function





export default {
    getBookmark,
    createBookmark,
    updateBookmark,
    validateUrl
}