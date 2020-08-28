import cuid from 'cuid';

const store = {
    
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0,
    showDropDown: true,
    filtered: false
};



const findById = function (id) {
  return this.store.bookmarks.find(currentBookmark => currentBookmark.id === id);
}



const addBookmark = function (bookmark){
  this.store.bookmarks.push(bookmark);
}

const findAndUpdate = function (id, newData){
  const currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
}


const create =  function(title, rating, url, desc){
  return {
    id: cuid(),
    title,
    rating,
    url,
    desc,
    expanded: false,
  }
}


export default{
  store,
  addBookmark,
  findAndUpdate,
  findById,
  create
};



