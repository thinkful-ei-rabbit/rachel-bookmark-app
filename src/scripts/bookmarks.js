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
    <li class = 'five-star rating drop-down-five drop-down-item'><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class='fill'>☆</span></li>
    <li class = 'four-star rating drop-down-four drop-down-item'><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'empty'>☆</span></li>
    <li class = 'three-star rating drop-down-three drop-down-item'><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span></li>
    <li class = 'two-star rating drop-down-two drop-down-item'><span class = 'fill'>☆</span><span class = 'fill'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span></li>
    <li class = 'one-star rating drop-down-one drop-down-item'><span class = 'fill'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span><span class = 'empty'>☆</span></li>
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
    const submit = '<input type="submit" class = "submit button">';
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
        <section class = "bookmark-section" >
           <div data-id="${bookmark.id}" class = "js-bookmark-each" > <div class = 'collapsed bookmark'>
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
               <a target = "_blank" href=${bookmark.url}><button class = 'visit button' type = 'button'>Visit site</button></a>
            
        </div></div>
        </section>`;

            const expandedBookmark = `${html}${expanded}`;
            bookmarks.push(expandedBookmark);

        }

    });
    const htmlString = bookmarks.join('');
    return htmlString;
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





//RENDER
const render = ((header, main) => {
    $('header').html(header);
    $('main').html(main);
});













//EXPERIMENTAL



const submit = function (event){
    const arr = ($(event.target).serializeArray());
    console.log(arr);
    event.preventDefault();

    const url = arr[1].value;
    api.validateUrl(url);

    const title = arr[0].value;
    const description = arr[3].value;

    const obj = store.create(title, url, description);
console.log(obj);
    
    
}
$('main').submit('form', submit);
/*$( "form" ).submit(function( event ) {
  console.log( $( this ).serializeArray() );
  event.preventDefault();
});

from api.js
 .then(res =>{
            if (res.ok) {
                console.log('Valid url')
            } else {
                console.log('notValid')
            }
        })
        


const submit = function () {
    const title = $('#title').val();
    const rating = $('#rating').val();
    const url = $('#url').val();
    const description = $('#description').val();
    //api.validateUrl(url)

}*/































































//EVENT LISTENERS

//event listner to toggle dropdown
$('header').on('click', '.filter', event => {
    store.showDropDown = !store.showDropDown;
    generateListView();
});



//toggles bookmarks open and shut
const handleBookmarkToggle = function (event) {
    const e = $(event.target).closest('.js-bookmark-each').data('id');
    const toggle = store.store.bookmarks.find(bookmark => (bookmark.id === e));

    if (toggle.expanded === true) {
        toggle.expanded = false;
    } else { toggle.expanded = true };
    generateListView();

};

const bindEventListeners = function () {


    handleAddBookmarkSubmit();
};

const toAddPage = function () {

}
const handleAddPage = function () {

}
$('header').on('click', '#add', addPage);
$('header').on('click', '#cxl', generateListView);

$('main').on('click', '.bookmark-section', handleBookmarkToggle);


export default {
    generateListView,
    render,
    bindEventListeners
};





//switching button to submit
//event.preventdefault
//handle form by serialize array
//run fuction that tests url
    //api.js

//post to url
//parse url and do with factory function
    //store.js






//after break, serialize form and start working with the APIS
