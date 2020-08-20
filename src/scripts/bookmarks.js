import $ from 'jquery';
import store from './store';


//check html and merge css
//add stars
//write function that gets the stars from the store
//store.
//give stars id that highlights the right amount of start. 



//create html for each page in generate functions
//generate title in one function
//generate bookmarks
//how do I get these to drop down in the html?
//generate add button 
//generate filter button 

const generateTitle = (() => {
    const title = '<h1>Bookmarks</h1>';
    return title;
});

const generateAddButton = function () {
    const add = '<button type="button" class = "button" id="add"> + </button>';
    return add;
};

//figure out how to fill in one, two, three etc stars
const generateFilterButton = function () {
    const filter = `<button type="button" class="button filter">Filter</button>
    <ul class="hidden">
    <li><li><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
    <li><li><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
    <li><li><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
    <li><li><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li>
    <li><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></li></ul>`;
    return filter;
};

const generateDeleteButton = function () {
    const del = '<button type="button" class = "add delete button">Delete</button>';
    return del;
};

const generateSubmitButton = function () {
    const submit = '<button type="button" class = "submit button">Submit</button>';
    return submit;
};

const generateCxlButton = function () {
    const cxl = '<button type="button" id="cxl" class = "cancle button"> X </button>';
    return cxl;
};

const addPage = function (){
    const title = generateTitle();
    const cxl = generateCxlButton();
    const submit = generateSubmitButton();

    const header = `${title}<div class ='header-buttons'>${cxl}${submit}</div>`;

    const form = generateForms();

    render(header, form);
}



//this function should run on page load
//when hidden is removed change flex of place
const generateBookmarks = function () {
    const bookmarks = [];
    //make function to make star rating variable, not static

    const bookmarkHtml = store.store.bookmarks.forEach(bookmark => {

//ADD CONDITIONAL TEXT CHECKING IF EXPANDED = FALSE
//IF TRUE, ADD REGULAR HTML
//IF FALSE RUN EXPANDED HTML
        let html = `
        <section class = "bookmark-section">
            <div class = 'collapsed bookmark'>
            <h3>${bookmark.title}</h3>
                <div class="rating">
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
            </div>
            
            <div class= "hidden bookmark-full">
                <a href = ${bookmark.link}>
                <button class = 'visit' type = 'button'>Visit site</button>
                </a>
            <div class='description'><p>${bookmark.description}</p></div>
        </div>
        </section>`;

        bookmarks.push(html);

    });
   const htmlString = bookmarks.join('');
   const html = `<main>${htmlString}</main>`;
   return html;

};


const generateListView = function(){
    const title = generateTitle();
    const add = generateAddButton();
    const filter = generateFilterButton();

    const header = `${title}<div class ='header-buttons'>${add}${filter}</div>`;
    const bookmarks = generateBookmarks();
  
    render(header, bookmarks);
};


const render = ((header, main)=> {
    $('header').html(header);
    $('main').html(main);
});


const generateForms = function(){
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
//list from filter needs to show too
//remove a class of hidden from the ul
//does it have an id??


const expanded = function(){
    const shown = [];
    const filtered = store.store.bookmarks.forEach(function(bookmark){
        if (bookmark.expanded === true){

        }
    })
    //store.store.bookmark
}



//FUNCTION ON CLICK + BUTTON
//get header, switch plus to x
//get add button
//get generateForms
//get delete button

//render to page


//FUNCTION TAKES IN VALUES OF CLICKS AND UPFATES STORE
//makes new object from 


const clickToggleOpen = function(){
    //get section tag and toggle hidden on 
    //class of div beneath title and rating
    //forEach bookmark if 
    //if store.store.bookmarks.id === id
    //this.expanded = true;


}

//on clicking puls button, render whole new page to the main
//taking over the whole view except
//change background color??


const newBookmarkForm = function (){

}











const bindEventListeners = function (){









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

//function that calls addPage
//renders add page on click of plus button
$('header').on('click', '#add',  addPage);
//renders list view back on x
$('header').on('click', '#cxl', generateListView);

//when the div of an item is clicked, it should call
//a function that updates the store with class true
//forEach loop to find them 


//this should be tied together with header in function
//that renders html main differently

//SHOULD SWITCH VALUE OF STORE EVERY TIME AND THEN CALL 
//FUNC THAT BUILDS MAIN PAGE




export default {
    generateListView,
    render,
    bindEventListeners
};