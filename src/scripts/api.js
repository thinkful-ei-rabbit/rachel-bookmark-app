const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rachel'

//READ
const getBookmark = (() => fetch(`${BASE_URL}/bookmarks`));

//CHECK BOOKMARK VALIDIDTY THROUGH TEXTING UPI
const validateUrl = (url => {
   return fetch(url)
        .then(res => console.log(res.ok))

})


//if res.ok
//initiate push to database
//do not push if not
//if not ok, add to bookmark view bottom
//invalid url, bookmark will not be saved

//practice post request with postman


/*const validateUrl = function (url) {
    console.log(url)
    return fetch(url)
        .then(res => res(json())
        .then(data => console.log(data))
        .then(res => {
            if (res.ok) {
                console.log('Valid url')
            } else {
                console.log('notValid')
            }
        })
};*/


const createBookmark = (content => {
    const newBookmark = JSON.stringify(content);
    console.log(newBookmark);
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