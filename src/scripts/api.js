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
        // .then(res => console.log(res.ok))

})


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
    .then(data => console.log(data))
    .catch(error => console.log(error))
    //modal popup
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
    validateUrl,
    deleteBookmark
}



//buttons on edit form
//button at top of the screen shrinking
//text wrapping in description: text-feild??? can that be used with form elements?
//switching to radio buttons on form
//