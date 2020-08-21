import $ from 'jquery';
import store from './store';
import api from './api'
import item from './item';






//GENERATE BUTTONS AND HEADER CONTENT
const generateTitle = (() => {
    const title = '<h1>Bookmarks</h1>';
    return title;
});

const generateAddButton = function () {
    const add = '<button type="button" class = "button add-button" id="add"> + </button>';
    return add;
};

const generateFilterWithDropDown = function () {
    const filter =
        `<div class = 'drop-down'><button type="button" class="button filter">Filter</button>
    <ul class="dropdown">
    <li class = 'five-star rating'><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class='fill'>☆</span></li>
    <li class = 'four-star rating'><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'empty'>☆</span></li>
    <li class = 'three-star rating'><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span></li>
    <li class = 'two-star rating'><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span></li>
    <li class = 'one-star rating'><span class = 'fill'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span></li>
    </ul></div>`;

    return filter;
};

const generateFilterButton = function () {
    const filter = `
        <button type="button" class="button filter">Filter</button>
        `;
    return filter;
};

const generateSubmitButton = function () {
    const submit = '<button type="submit" class = "submit button">Submit</button>';
    return submit;
};

const generateCxlButton = function () {
    const cxl = '<button type="button" id="cxl" class = "cancle button"> X </button>';
    return cxl;
};

const generateDeleteButton = function () {
    const del = '<button type="button" class = "add delete button">Delete</button>';
    return del;
};
















//COMBINES PIECES AND RUNS RENDER
const addPage = function () {
    const title = generateTitle();
    const cxl = generateCxlButton();

    const header = `${title}<div class ='header-buttons'>${cxl}</div>`;
    const form = generateForms();

    const html = `${form}`;
    
    render(header, html);
}

//generateFORMS for addPage
const generateForms = function () {
    //add submit and delete to form function
    const cxl = generateCxlButton();
    const submit = generateSubmitButton();

    const forms = ` <form>
    <div class = 'form-item'>
    <label for="name">Title:</label>
    <input id="name" type="text" name="name" class="input-name" required />
    </div>
    <div class = 'form-item'>
    <label for="url">Url:</label>
    <input type="text" id="url" name="url" class="input-url" required />
    </div>
    <div class = 'form-item'>
    <lable for="rating">Rating:</lable>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        </div>
    <input type="text" id="description" name="description" class="input-description" placeholder="Add a description of your bookmark (optional)">
   <div class = "row">${cxl}${submit}</div>

</form>

    
</section>`;
    return forms;
}

const submit = function () {
    const title = $('#title').val();
    const rating = $('#rating').val();
    const url = $('#url').val();
    const description = $('#description').val();
    //api.validateUrl(url)

}




const handleAddBookmarkSubmit = function () {
    $('main').on('submit', 'input', submit);
    $('header').on('click', '.submit', submit);
}

/*$( "form" ).submit(function( event ) {
  console.log( $( this ).serializeArray() );
  event.preventDefault();
});*/



const generateListView = function () {
    const title = generateTitle();
    const add = generateAddButton();
    let filter = "";

    if (store.showDropDown === false) {
        filter = generateFilterWithDropDown();
    } else {
        filter = generateFilterButton();
    };

    const header = `${title}<div class ='header-buttons'>${add}${filter}</div>`;
    const bookmarks = generateBookmarks();

    render(header, bookmarks);
};






const generateBookmarks = function () {
    const bookmarks = [];
    store.store.bookmarks.forEach(bookmark => {
        const rating = generateStarRating(bookmark.rating);
        const html = `
        <section class = "bookmark-section">
           <div class = "js-bookmark-each" data-id = "${bookmark.id}"> <div class = 'collapsed bookmark'>
            <h3>${bookmark.title}</h3>
                <div class="rating">
                   ${rating}
                </div>
            </div>`;

        if (bookmark.expanded === false) {
            const closedBookmark = `${html}</div></section>`;
            bookmarks.push(closedBookmark);
        } else {
            const expanded = `<div class= "bookmark-full">
            <div class='description'><p>${bookmark.description}</p></div>
               <a target = "_blank" href=${bookmark.url}><button class = 'visit' type = 'button'>Visit site</button></a>
            
        </div></div>
        </section>`;

            const expandedBookmark = `${html}${expanded}`;
            bookmarks.push(expandedBookmark);

        }

    });
    const htmlString = bookmarks.join('');
    return htmlString;
    //ADD EVENT HANDLER THAT TOGGLES BOOKMARK.EXPANDED 
};


const generateStarRating = function (num) {

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

    const html = `<div class = 'rating'>${rating}</div>`;
    return html;
};


//START FUNCTIONS THAT WORK WITH FORM ELEMENTS AND EVENTS
//make favroty function that takes in values and pushes
//to store.store.bookmarks
//store.create()
//store.addBookmark();





















//RENDER
const render = ((header, main) => {
    $('header').html(header);
    $('main').html(main);
});













//EXPERIMENTAL

const getIdFromBookmark = function (bookmark) {
console.log(bookmark);
    const h = $(bookmark)
        .closest('.')
        .data('id');

    console.log(h);
};

getIdFromBookmark(store.store.bookmarks[0]);


























//EVENT LISTENERS

//event listner to toggle dropdown
$('header').on('click', '.filter', event => {
    store.showDropDown = !store.showDropDown;
    generateListView();
});




$('main').on('click', '.bookmark-section', event => {
    let id = getIdFromBookmark();
    console.log(id);
    let bookmark = store.findById(id);

    console.log(bookmark);

})


const bindEventListeners = function () {
    // handleFilterToggle();

    //EVENTS
    //click store.store.expanded = true; 
    //then remove class of hidden in this function

    //click stars and sort
    //FUNCTION TO SORT
    //forEach(bookmark){
    //if bookmark.rating < variable (of the value captured)
    //how do I capture this value like a form? 
    //add id for each
    //const shown = []
    //add and render, replacing current


    handleAddBookmarkSubmit();
    //make new page with form when plus is clicked
    //switch + to x transition in css and change other 
    //button to delete
    //form in place of main
};

const toAddPage = function () {

}
const handleAddPage = function () {

}
$('header').on('click', '#add', addPage);
$('header').on('click', '#cxl', generateListView);




export default {
    generateListView,
    render,
    bindEventListeners
};

//NEXT STEPS
//ADD EVENT LISTENER TO DIV THAT TOGGLES OPEN AND CLOSED

//FIGURE OUT HOW TO DO THE SAME WITH THE STARS
//on the filter button
//write function that filters by number of stars or greater
//fill in the stars at the top of the screen
//remove class of hidden on click

//write function that takes star rating from the number in STORE.js 
//fills in that amount of stars
//by adding css class to stars
//for loop for i=0; i<rating; i++
//add class to span???

//make sure store matches api

//add functionality to form
//get value for url input
//send to store
//send to api
//render on page

//add functionality to second form 

//add delete button beneath form 

