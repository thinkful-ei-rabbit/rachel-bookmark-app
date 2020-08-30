const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rachel'

//GET BOOKMARKS FROM API
const getBookmark = (() => {
    return fetch(`${BASE_URL}/bookmarks`, {
        mode: 'cors'
    })

});

//CREATE NEW BOOKMARK
const createBookmark = (content => {
    const newBookmark = JSON.stringify(content);
    return fetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    })

});


//PATCH BOOKMARKS TITLE AND DESCRIPTION
const updateBookmark = ((id, updateData) => {
    const newData = JSON.stringify(updateData);
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newData
    });
});



//DELETE FUNCTION
const deleteBookmark = (id => {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE',
        mode: "cors"
    })
})





export default {
    getBookmark,
    createBookmark,
    updateBookmark,
    deleteBookmark
}
