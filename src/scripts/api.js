const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rachel/bookmarks'

//READ
const getBookmark = (() => fetch(BASE_URL));

//CHECK BOOKMARK VALIDIDTY THROUGH TEXTING UPI

const validateUrl = (url => {
        return fetch(url);
});
//ifresponse ok

const createBookmark = (name => {
    const newBookmark = JSON.stringify({ name });
    console.log(newBookmark);
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    });
});


//UPDATE
const updateBookmark = ((id, updateData) => {
    const newData = JSON.stringify({ updateData0});
    return fetch(BASE_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newData
    });
});



//DELETE FUNCTION
//write delete function





export default {
    getBookmark,
    createBookmark,
    updateBookmark,
    validateUrl
}