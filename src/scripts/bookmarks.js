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
    const add = '<button type="button" class = "button" id="add"> + </button>';
    return add;
};

const generateFilterWithDropDown = function () {
    const filter = 
    `<div class = 'drop-down'><button type="button" class="button filter">Filter</button>
    <ul class="dropdown">
    <li class = 'one-star'><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
    <li class = 'two-star'><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
    <li class = 'three-star'><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
    <li class = 'four-star'><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
    <li class = 'five-star'><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
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
    const submit = '<button type="button" class = "submit button">Submit</button>';
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
    const submit = generateSubmitButton();

    const header = `${title}<div class ='header-buttons'>${cxl}${submit}</div>`;

    const del = generateDeleteButton();
    const form = generateForms();

    const html = `${form}${del}`;

    render(header, html);
}

//generateFORMS for addPage
const generateForms = function () {
    const forms = ` <form>
    <label>Add a new bookmark</label>
    <input type="text" name="link-address" class="input-link">
</form>
<section class="bookmarks">
    <h3>link name</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
    <div class="container">
        <form>
            <input type="text" name="description" class="input-description" placeholder="Add a description of your bookmark (optional)">
        </form>
    </div>
</section>`;
    return forms;
}




//generates bookmarks
//add conditional based on store.store.bookmarks[x].expanded === true
//render those differently
//add this inside forEach loop, running function that generates open 
//html and adds to 
const generateBookmarks = function () {
    const bookmarks = [];
    store.store.bookmarks.forEach(bookmark => {
    const html = `
        <section class = "bookmark-section">
            <div class = 'collapsed bookmark'>
            <h3>${bookmark.title}</h3>
                <div class="rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
            </div>`;

        if (bookmark.expanded === false) {
            const closedBookmark = `${html}</section>`;
            bookmarks.push(closedBookmark); 
        } else {
            console.log(bookmark.url);
            const link = bookmark.link;
            const getLink = api.getLink(link);
            const expanded = `<div class= "bookmark-full">
               <a target = "_blank" href=${bookmark.url}><button class = 'visit' type = 'button'>Visit site</button></a>
            <div class='description'><p>${bookmark.description}</p></div>
        </div>
        </section>`;

            const expandedBookmark = `${html}${expanded}`;
            bookmarks.push(expandedBookmark);
            
        }

    });
    const htmlString = bookmarks.join('');
    return htmlString;
    //ADD EVENT HANDLER THAT TOGGLES BOOKMARK.EXPANDED 
};


//make speperate function and event handler for 
//taking in the visit button
//calling api.getLink with link from forEach
//this.link

//generates main view with list of bookmarks
const generateListView = function () {
    const title = generateTitle();
    const add = generateAddButton();
    let filter = "";
    
        if (store.showDropDown === false){
            filter = generateFilterWithDropDown();
        } else {
            filter = generateFilterButton();
        };

    const header = `${title}<div class ='header-buttons'>${add}${filter}</div>`;
    const bookmarks = generateBookmarks();

    render(header, bookmarks);
};

const openLink = function(event){
    //get link of item by finding where to get item
    //api.getLink(link)
}
//render function that renders header and main seperately
const render = ((header, main) => {
    $('header').html(header);
    $('main').html(main);
});



 $('header').on('click', '.filter', event =>{
     console.log(store.showDropDown);
        store.showDropDown = !store.showDropDown;
        generateListView();    
    });

//$('main').on('click', '.visit', );
//get this to work with link that calls 
//api.getLink(this.link)




const toggleExpanded = function(event){
    //how to target specific section
    //switch expanded in stire
    //
}




const bindEventListeners = function () {
    handleFilterToggle();

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



    //make new page with form when plus is clicked
    //switch + to x transition in css and change other 
    //button to delete
    //form in place of main
};

const toAddPage = function (){

}
const handleAddPage = function (){

}
$('header').on('click', '#add', addPage);
$('header').on('click', '#cxl', generateListView);

$('main').on('click', 'section', toggleExpanded);



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

