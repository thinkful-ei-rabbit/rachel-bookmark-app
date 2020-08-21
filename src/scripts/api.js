const BASE_URL = 'https://thinkful-list-api.herokuapp.com/rachel/bookmarks'

//READ
const getBookmark = (() => fetch(BASE_URL));

//CHECK BOOKMARK VALIDIDTY THROUGH TEXTING UPI

const validateUrl = (url => {
   return fetch(url)
        .then(res => console.log(res.ok))

})

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


const createBookmark = (name => {
    const newBookmark = JSON.stringify({ name });
    console.log(newBookmark);
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    })
        .then(res => res.json())
        .then(data => data())

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