import $ from 'jquery';
import store from './store';





//create html for each page in generate functions
//generate title in one function
//generate bookmarks
//how do I get these to drop down in the html?
//generate add button 
//generate filter button 

const generateTitle = (() => {
    const title = '<h1>Bookmarks</h1>';
});

const generateAddButton = function () {
    //create button that calls function to switch html to
    //adding page
    //render to page somehow
    //call render from here? 
};

const generateFilterButton = function () {
    //creates a button that returns a function (filter)
    //that filters items through click on hidden drop-down
    //remove class hidden from menu
    //in CSS this should show on hover as well
};



//this function should run on page load
//when hidden is removed change flex of place
const generateBookmarks = function () {
    const bookmarks = [];
    console.log(store.bookmarks);
    const bookmarkHtml = store.bookmarks.forEach(bookmark => {

        let html = `<section><div><h3>${this.title}</h3><span>${this.rating}</span></div>
    <div class='hidden'>
        <a href = ${this.link}>
            <button class = 'visit' type = 'button'>Visit site</button>
        </a>
        <div class='description'><p>${this.description}</p></div>
    </div></section>`;
        bookmarks.push(html);

    });

};

const generateForm = function () {

};



const generateListView = function(){
    const title = generateTitle();
    const add = generateAddButton();
    const filter = generateFilterButton();

    const header = `<header>${title}<div class ='header-buttons'>${add}${filter}</div>
    </header>`;

    const bookmarks = generateBookmarks();

    const html = `${header}<main>${bookmarks}</main>`;
  
    render(html);
};


const render = (str => {
    $('body').html(str);
});


export default {
    generateListView,
    render
};