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


//let hide dropdown = false
//have property that toggles if this.hideDropDown 






export default{
  store,
  showDropDown
};