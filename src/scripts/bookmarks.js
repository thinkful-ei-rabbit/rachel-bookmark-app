import $ from 'jquery';
import cuid from 'cuid';

import store from './store';
import api from './api';


//GENERATE BUTTONS AND HEADER CONTENT
const generateTitle = (() => {
    const title = '<h1 tabindex="-1">Bookmarks</h1>';
    return title;
});

const generateAddButton = function () {
    const add = '<button type="button" class = "button add-button" id="add"> + </button>';
    return add;
};

const generateFilterButton = function () {
    const filter = `
        <button type="button" class="button filter">Filter</button>
        `;
    return filter;
};

const generateSubmitButton = function () {
    const submit = '<button type="submit" class = "button">Submit</button>';
    return submit;
};

const generateCxlButton = function () {
    const cxl = '<button type="button" id="cxl" class="cancle button">Cancel</button>';
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

const generateFilterWithDropDown = function () {
    const five = generateStarRating(5);
    const four = generateStarRating(4);
    const three = generateStarRating(3);
    const two = generateStarRating(2);
    const one = generateStarRating(1);
    const filterButton = generateFilterButton();
    const filter =
        `<div class = 'drop-down'>${filterButton}
    <ul class="dropdown">
    <li data-id="5" class = 'five-star rating drop-down-five drop-down-item' tabindex="0">${five}</li>
    <li data-id="4" class = 'four-star rating drop-down-four drop-down-item' tabindex="0">${four}</li>
    <li data-id="3" class = 'three-star rating drop-down-three drop-down-item' tabindex="0">${three}</li>
    <li data-id="2" class = 'two-star rating drop-down-two drop-down-item' tabindex="0">${two}</li>
    <li data-id="1" class = 'one-star rating drop-down-one drop-down-item' tabindex="0">${one}</li>
    </ul></div>`;

    return filter;
};


//FORMS FOR ADD PAGE
const generateForms = function () {
    const submit = generateSubmitButton();

    const five = generateStarRating(5);
    const four = generateStarRating(4);
    const three = generateStarRating(3);
    const two = generateStarRating(2);
    const one = generateStarRating(1);

    const forms = ` <form id="new">
    <div class = 'form-item'>
    <label for="name">Title:</label>
    <input autofocus="on" id="name" type="text" name="name" class="input-name" required />
    </div>
    <div class = 'form-item'>
    <label for="url">Url:</label>
    <input type="text" id="url" name="url" class="input-url" required />
    </div>
    <div class = 'form-rating'>
    
        <div class="rating-section">
        <input name="rating" type="radio" value="1">
        <label for="one-star">${one}</label>
        </div>

        <div class="rating-section">
        <input name="rating" type="radio" value="2">
        <label for="two-star">${two}</label>
        </div>

        <div class="rating-section">
        <input name="rating" type="radio" value="3">
        <label for="three-star">${three}</label>
        </div>

        <div class="rating-section">
        <input name="rating" type="radio" value="4">
        <label for="four-star">${four}</label>
        </div>

        <div class="rating-section">
        <input name="rating" type="radio" value="5">
        <label for="five-star">${five}</label>
        </div>
    
        </div>
    <div class="form-item">
    <lable for="desc"></lable>
    <input type="text" id="desc" name="desc" class="desc-input" placeholder="Add a description of your bookmark (optional)"></div>
   <div class = "row">${submit}</div>

</form>
</section>`;
    return forms;
}

//GENERATE EDIT PAGE
const editPage = ((object, id) => {
    const title = generateTitle();
    const cxl = generateCxlButton();

    const header = `${ title } <div class='header-buttons'>${cxl}</div>`;
    const form = generateEditForm(object);

    const html = `<div id="getId" data-id=${id} ${ form }</div> `;
    console.log(html)

    render(header, html);
});


//FORM FOR EDIT PAGE
const generateEditForm = function (object) {

    let currentTitle = object.title;
    let currentUrl = object.url;
    let currentDesc = object.desc;
    const submit = generateSubmitButton();
    const del = generateDeleteButton();

    const forms = `<form id = "edit">
    <div class='form-item'>
        <label for="name">Title:</label>
        <input autofocus="on" id="name" type="text" name="name" class="input-name" value="${currentTitle}" required />
    </div>
    <div class='form-item'>
        <label for="url">Url:</label>
        <input type="text" id="url" name="url" class="input-url" value="${currentUrl}" />
    </div>
    <div class='form-item'>
    </div>
    <lable for="desc"></lable>
    <input type="text" id="desc-edit" name="desc" class="desc-input" value="${currentDesc}">
       <div class = 'form-item'>${submit}${del}</div></div>
        
</form>

`;
    return forms;
}


//GENERATE LIST VIEW
const generateListView = function (arr) {
    const title = generateTitle();
    const add = generateAddButton();
    let filter = "";

    if (store.store.showDropDown === false) {
        filter = generateFilterWithDropDown();
    } else {
        filter = generateFilterButton();
    };

    const header = `${title}<div class ='header-buttons'>${add}${filter}</div>`;
    const bookmarks = generateBookmarks(store.store.bookmarks);
    render(header, bookmarks);
};

const filterStars = (event) => {
    store.store.filtered = true;
    store.store.showDropDown = !store.store.showDropDown;
    const selected = $(event.currentTarget)
        .closest('li')
        .data('id');
    const filter = store.store.bookmarks.filter(bookmark => bookmark.rating >= selected);
    generateFilteredView(filter);
}

//LIST VIEW WITH FILTER

const generateFilteredView = function (arr) {
    const title = generateTitle();
    const add = generateAddButton();
    let filter = "";

    if (store.store.showDropDown === false) {
        filter = generateFilterWithDropDown();
    } else {
        filter = generateFilterButton();
    };

    const header = `${title}<div class ='header-buttons'>${add}${filter}</div>`;
    const bookmarks = generateBookmarks(arr);
    render(header, bookmarks);
};


//GENERATE BOOKMARKS IN LIST VIEW
//BOTH EXPANDED AND NOT
const generateBookmarks = function (arr) {

    const bookmarks = arr.map(bookmark => {
        const num = parseInt(bookmark.rating);

        const rating = generateStarRating(num);
        const edit = generateEditButton();

        let expandedContent = '';
        
            if (bookmark.expanded === false) {
                expandedContent = "";
            } else {
                expandedContent = `<div class= "bookmark-full">
                <div class='desc'><p>${bookmark.desc}</p></div>
                <div class='expanded-buttons'><a target = "_blank" href=${bookmark.url}><button class = 'visit button' type = 'button'>Visit site</button></a>
                    ${edit}
            </div></div>`
            }
            
        
        return `
        <section class = "bookmark-section" tabindex="0">
           <div data-id="${bookmark.id}" class ="js-bookmark-each" >
            <h2>${bookmark.title}</h2>
                <div class="rating">
                ${rating}
            </div>
                ${expandedContent}
            </div></section>`;

        }

    );
    const htmlString = bookmarks.join('');
    return htmlString;
};





























///////////////////////////////////////////////////////
//SHOULD I MOVE THIS SECTION TO ANOTHER PAGE????
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

////////////////////////////////////////////////////////








//RENDER PAGES TO SCREEN
const render = ((header, main) => {
    $('header').html(header);
    $('main').html(main);
});


//RENDER DATA FROM API
const renderFromApi = function (arr) {
    const toPush = store.store.bookmarks;
    arr.forEach(obj => {
        let news = store.create(obj.id, obj.title, obj.rating, obj.url, obj.desc);
        toPush.push(news);
    })

    generateListView(store.store.bookmarks);
}


















//EVENT HANDLER FUNCTIONS

//DELETES FROM API AND REMAKES STORE
$('main').on('click', '.delete', e => {
    e.preventDefault();
    e.stopPropagation();


    const id = $(e.target).parents('#getId').data('id');

    const newStore = store.store.bookmarks.filter(bookmark => (bookmark.id !== id))
    
    store.store.bookmarks = [...newStore];
    api.deleteBookmark(id)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => generateErrorMessage(error))
    
    ;
    
    generateListView();
    
})



//BRING FOCUS TO ITEMS
$('li').focus();
$('button').focus();


//HIDE SHOW DROPDOWN
$('header').on('click', '.filter', event => {
    store.store.showDropDown = !store.store.showDropDown;
    generateListView();

});

//RUN FILTER FUNCTION WITH CLICK ON DROPDOWN MENU
$("header").on('keydown', 'li', (e) => {
    if(e.keyCode == 13){
        filterStars(e);
    }
});

$('header').on('click', 'span', filterStars);










//////////////////////////////////////////////////////////////////////////////////////////////////////////


    //get id of element needing to be deleted with parent method
    $('main').submit('#submit', e => {
        e.preventDefault();
        e.stopPropagation();
    
        const id = $(e.target).parents('#getId').data('id');
        //check for equivalent values
        //get values 
    
    });

///////////////////////////////////////////////////////////////////////////////////////////////

//SUBMIT NEW FORM AND SERIALIZE ARRAY
//GET VALUES FROM ARRAY TO CREATE BOOKMARK OBJECT
//SHOW ALL IN LIST VIEW
$('main').submit('#new',  event => {
    const arr = ($(event.target).serializeArray());
    event.preventDefault();

    const url = arr[1].value;
    const rating = arr[2].value;
    const title = arr[0].value;
    const desc = arr[3].value;
    const id = cuid();

    //go back to validating 

    const obj = store.create(id, title, rating, url, desc);
 
    api.createBookmark(obj)
    .then(res => {
            if(res.ok){
                const newArr = store.store.bookmarks.push(obj);
                return generateListView(newArr);
            } else {
                return res.json()
            }
        })
    .then(data => generateErrorMessage(`<h2 class='error-header'>Bookmark could not be saved: </h2><p class='error-message'> ${data.message}</p>`))
    .catch(err => console.log(err));
    

});

const generateErrorMessage = (error) => {
    const header = '';
    const cxl = generateCxlButton();
    const html = `${error}${cxl}`;

    render(header, html);
     
    // setTimeout(generateListView(store.store.bookmarks), 2000);
     // $('main').on('click', '.cxl', clearTimeout(timeout));
 

 
 }


//GENERATE LIST VIEW ON CLICK OF CANCLE BUTTON
//SWITCH EXPANDED TO FALSE SO ALL ARE CLOSED
$('body').on('click', '#cxl', (e => { 

    //I RUN THIS CODEE OVER AND OVER> I CAN PUT THIS IN STORE AND USE IT AGAIN
    store.store.bookmarks.forEach(bookmark => {
        if (bookmark.expanded === true) {
            bookmark.expanded = false;
        }
    });
    ///////////////////////////////////////

    generateListView(store.store.bookmarks);
  
}))


//ADD BUTTON TO NEW BOOKMARK PAGE
$('header').on('click', '#add', e => {
    
    const title = generateTitle();
    const cxl = generateCxlButton();

    const header = `${title}<div class ='header-buttons'>${cxl}</div>`;
    const form = generateForms();

    const html = `${form}`;

    render(header, html);
});

//EDIT BUTTON TO EDIT PAGE
$('main').on('click', '#edit', event => {
    event.stopPropagation();
    const id = $(event.target).closest('.js-bookmark-each').data('id');
    const object = store.store.bookmarks.find(bookmark => (bookmark.id === id));
    console.log(id);
    editPage(object, id);
});


//TOGGLE TO EXPANDED BOOKMARK
$('main').on('click', '.bookmark-section', e => {
    const id = $(event.target).closest('.js-bookmark-each').data('id');
    const toggle = store.store.bookmarks.find(bookmark => (bookmark.id === id));

    if (toggle.expanded === true) {
        toggle.expanded = false;
    } else { toggle.expanded = true };
    generateListView(store.store.bookmarks);
});


//PRESS ENTER TO EXPAND BOOKMARK
$("main").on('keydown', '.bookmark-section', (e) => {
    if (e.keyCode == 13) {
        const id = $(e.target).children().first().data('id');

        const toggle = store.store.bookmarks.find(bookmark => (bookmark.id === id));
        if (toggle.expanded === true) {
            toggle.expanded = false;
        } else { toggle.expanded = true };
        generateListView(store.store.bookmarks);
    };
    }
);



export default {
    render,
    renderFromApi,
    generateErrorMessage,
};
