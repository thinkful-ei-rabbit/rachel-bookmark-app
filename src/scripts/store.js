

let store = {
    
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


const create =  function(id, title, rating, url, desc){
  return {
    id,
    title,
    rating,
    url,
    desc,
    expanded: false,
  }
}

const generateStarRating = (num) => {

  const starFilled = '<span class = "fill">☆</span>';
  const starEmpty = '<span class = "empty">☆</span>';
  let rating = '';
  switch (num) {
      case 1:
          rating = `${starFilled}${starEmpty}${starEmpty}${starEmpty}${starEmpty}`;
          break;
      case 2:
          rating = `${starFilled}${starFilled}${starEmpty}${starEmpty}${starEmpty}`;
          break;
      case 3:
          rating = `${starFilled}${starFilled}${starFilled}${starEmpty}${starEmpty}`;
          break;
      case 4:
          rating = `${starFilled}${starFilled}${starFilled}${starFilled}${starEmpty}`;
          break;
      case 5:
          rating = `${starFilled}${starFilled}${starFilled}${starFilled}${starFilled}`;
          break;
  }

  return `<div class = 'rating'>${rating}</div>`;
};



export default{
  store,
  addBookmark,
  findAndUpdate,
  findById,
  create,
  generateStarRating
};



