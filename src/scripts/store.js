import cuid from 'cuid';

let showDropDown = true;
let filtered = false;
const store = {
    
    bookmarks: [
      {
        id: 'x56w',
        title: 'Chicken Cacciatore',
        rating: 2,
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

const createBookmark = (arr => {
    arr.forEach(item => {
       let each =  this.create(title, url, description);
       console.log(each);
       this.store.bookmarks.push();
        

        
      bookmarks.generateListView()
    });
});

const create =  function(title, url, description){
  return {
    id: cuid(),
    title,
    rating: 4,
    url,
    description,
    expanded: false,
  }
}


export default{
  store,
  filtered,
  addBookmark,
  findAndUpdate,
  findById,
  showDropDown,
  create
};



