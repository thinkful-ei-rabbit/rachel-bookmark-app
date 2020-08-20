const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rachel/bookmarks'

//READ
const getBookmark = (() => fetch(BASE_URL));

const getLink = ((url) => fetch(url));

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
    getLink,
    createBookmark,
    updateBookmark,
}