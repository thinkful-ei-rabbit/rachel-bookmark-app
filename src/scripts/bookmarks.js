import $ from 'jquery';
import store from './store';
import api from './api';





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
    const five = generateStarRating(5);
    const four = generateStarRating(4);
    const three = generateStarRating(3);
    const two = generateStarRating(2);
    const one = generateStarRating(1);
    const filter =
        `<div class = 'drop-down'><button type="button" class="button filter">Filter</button>
    <ul class="dropdown">
    <li data-id="5" class = 'five-star rating drop-down-five drop-down-item'>${five}</li>
    <li data-id="4" class = 'four-star rating drop-down-four drop-down-item'>${four}</li>
    <li data-id="3" class = 'three-star rating drop-down-three drop-down-item'>${three}</li>
    <li data-id=2 class = 'two-star rating drop-down-two drop-down-item'>${two}</li>
    <li data-id=1 class = 'one-star rating drop-down-one drop-down-item'>${one}</li>
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

const generateEditButton = () => {
    const edit = '<button type="button" id="edit" class = "edit button">Edit</button>';
    return edit;
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

    const forms = ` <form id="new">
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
    <lable for="description"></lable>
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
    const bookmarks = generateBookmarks(store.store.bookmarks);
    render(header, bookmarks);
};




const filterStars = (event) => {
    store.store.filtered = !store.store.filtered;
    const selected = $(event.currentTarget)
        .closest('li')
        .data('id');
    const filter = store.store.bookmarks.filter(bookmark => bookmark.rating >= selected);
    generateFilteredView(filter);
    //return function and pass in filtered

}

const generateFilteredView = function (arr) {
    const title = generateTitle();
    const add = generateAddButton();
    let filter = "";

    if (store.showDropDown === false) {
        filter = generateFilterWithDropDown();
    } else {
        filter = generateFilterButton();
    };

    const header = `${title}<div class ='header-buttons'>${add}${filter}</div>`;
    const bookmarks = generateBookmarks(arr);
    render(header, bookmarks);
};




const generateBookmarks = function (arr) {
    const bookmarks = [];

    arr.forEach(bookmark => {
        const rating = generateStarRating(bookmark.rating);
        const edit = generateEditButton();
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
               <div class='row'><a target = "_blank" href=${bookmark.url}><button class = 'visit button' type = 'button'>Visit site</button></a>
                ${edit}
        </div></div></div>
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

const renderFromApi = function(arr){
    const toPush = store.store.bookmarks;
    const object = arr.forEach(obj => {
       let news = store.create(obj.title, obj.url, obj.description);
       toPush.push(news);
    })

    generateListView();
}


const submit = function (event) {
    const arr = ($(event.target).serializeArray());
    console.log(arr);
    event.preventDefault();

    const url = arr[1].value;
    api.validateUrl(url);

    const title = arr[0].value;
    const desc = arr[2].value;


    const obj = store.create(title, url, desc);
    store.addBookmark(obj);
    console.log(obj);
    api.createBookmark(obj);

    generateListView();
}





//RENDER
const render = ((header, main) => {
    $('header').html(header);
    $('main').html(main);
});













//EXPERIMENTAL

const generateEditForm = function (object) {

    let currentTitle = object.title;
    console.log(currentTitle);
    let currentUrl = object.url;
    const cxl = generateCxlButton();
    const submit = generateSubmitButton();

    const forms = ` <form id="edit">
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
    <lable for="description"></lable>
    <input type="text" id="description-edit" name="description" class="input-description" placeholder="Add a description of your bookmark (optional)">
   <div class = "row">${cxl}${submit}</div>

</form>

    
</section>`;
    return forms;
}


const handleBookmarkEdit = (event) => {
    console.log(event);
    const e = $(event.target).closest('.js-bookmark-each').data('id');
    console.log(e)
    const object = store.store.bookmarks.find(bookmark => (bookmark.id === e));

    editPage(object);
    
}


const editPage = ((object) => {
    const title = generateTitle();
    const cxl = generateCxlButton();

    const header = `${title}<div class ='header-buttons'>${cxl}</div>`;
    const form = generateEditForm(object);
    console.log(form);

    const html = `${form}`;

    render(header, html);
});
//make different function to handle click and transport
$('main').on('click', '#edit', handleBookmarkEdit)

//HANDLE EVENTS

//toggles bookmarks open and shut
const handleBookmarkToggle = function (event) {
    const e = $(event.target).closest('.js-bookmark-each').data('id');
    const toggle = store.store.bookmarks.find(bookmark => (bookmark.id === e));

    if (toggle.expanded === true) {
        toggle.expanded = false;
    } else { toggle.expanded = true };
    generateListView();

};

$('header').on('click', '.filter', event => {
    store.showDropDown = !store.showDropDown;
    generateListView();
});

$('main').submit('#new', submit);

$('header').on('click', 'span', filterStars)

$('header').on('click', '#add', addPage);
$('header').on('click', '#cxl', generateListView);

$('main').on('click', 'section', handleBookmarkToggle);


export default {
    generateListView,
    render,
    renderFromApi
}
