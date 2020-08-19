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
    return title;
});

const generateAddButton = function () {
    const add = '<button type="button" class = "start button"> + </button>';
    return add;
};

const generateFilterButton = function () {
    const filter = '<button type="button" class="button filter">Filter</button><ul class="hidden"><li>*</li><li>**</li><li>***</li><li>****</li><li>*****</li></ul>';
    return filter;
};



//this function should run on page load
//when hidden is removed change flex of place
const generateBookmarks = function () {
    const bookmarks = [];
    const bookmarkHtml = store.store.bookmarks.forEach(bookmark => {
        let html = `<section><div><h3>${bookmark.title}</h3><span>${bookmark.rating}</span></div>
    <div class='hidden'>
        <a href = ${bookmark.link}>
            <button class = 'visit' type = 'button'>Visit site</button>
        </a>
        <div class='description'><p>${bookmark.description}</p></div>
    </div></section>`;
        bookmarks.push(html);

    });
   const htmlString = bookmarks.join(',');
   const html = `<main>${htmlString}</main>`;
   return html;

};

const generateForm = function () {

};



const generateListView = function(){
    const title = generateTitle();
    const add = generateAddButton();
    const filter = generateFilterButton();
    console.log(filter);

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