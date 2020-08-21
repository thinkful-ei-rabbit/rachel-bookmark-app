import cuid from 'cuid';

const showDropDown = true;
const store = {
    
    bookmarks: [
      {
        id: 'x56w',
        title: 'Chicken Cacciatore',
        rating: 5,
        url: 'https://cafedelites.com/chicken-cacciatore/',
        description: 'Chicken and vegetables cooked in a red wine tomato sauce',
        expanded: false
      },
      {
        id: '6ffw',
        title: 'Lemon Asparagus',
        rating: 5,
        url: 'https://natashaskitchen.com/baked-asparagus-with-lemon-butter-and-parmesan/',
        description: 'Baked asparagus with lemon and parmesean',
        expanded: false
      },
      {
        id: '7ddr',
        title: 'Sweet Porato Chili',
        rating: 3,
        url: 'https://cookieandkate.com/sweet-potato-chili-recipe/',
        description: 'Vegetarian chili with sweet potatoes and beans',
        expanded: false
      }





    ],
    adding: false,
    error: null,
    filter: 0
};


//when promise of adding bookmark is kept,
//when added to database
//rerender page
const findById = function (id) {
  //returns bookmark
  return this.store.bookmarks.find(currentBookmark => currentBookmark.id === id);
}
//call when ready to add to store
//factory function that creates then calls this
const addBookmark = function (bookmark){
  this.store.bookmarks.push(bookmark);
}

const findAndUpdate = function (id, newData){
  const currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
}

const create =  function(title, rating, url, description){
  return {
    id: cuid(),
    title,
    rating,
    url,
    description,
    expanded: false
  }
}

export default{
  store,
  addBookmark,
  findAndUpdate,
  findById,
  showDropDown,
  create
};

//TOMORROW
//wrap text feilds
//rating in form can be dupicated in add 
//with dropdown stars

//check url before adding to store.store.bookmarks
//.then 
//run function that adds bookmark to store
//.then 
//run func that post to database
//post added json to url


//patch name change to server
//delete from server

//retrieve values from form
//put into favrory function store.create
//run to store with function store.pushINTO STORE
//render main to reflect the changes
//just call function that generates list view again?

//HOW DO I CHECK THAT THE STORE AND SERVER MATCH???

//FILTER
//on.click of each of the different areas
//should it be a button??
//make function with array
//that passes shown into first function


