import cuid from 'cuid';

const showDropDown = false;
const store = {
    
    bookmarks: [
      {
        id: 'x56w',
        title: 'Chicken Cacciatore',
        rating: 5,
        url: 'https://cafedelites.com/chicken-cacciatore/',
        description: 'Chicken and vegetables cooked in a red wine tomato sauce',
        expanded: true
      },
      {
        id: '6ffw',
        title: 'Lemon Asparagus',
        rating: 5,
        url: 'https://natashaskitchen.com/baked-asparagus-with-lemon-butter-and-parmesan/',
        description: 'Baked asparagus with lemon and parmesean',
        expanded: true
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

//call in bookmark js and send to push function here
//function validate url = fetch url and check if 200
//else prevent resubmission







export default{
  store,
  addBookmark,
  findAndUpdate,
  findById,
  showDropDown,
  create
};