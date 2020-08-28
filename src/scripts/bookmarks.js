import $ from 'jquery';
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
    const submit = '<button type="submit" class = "button">';
    return submit;
};

const generateCxlButton = function () {
    const cxl = '<button type="button" class="cxl cancle button">Cancel</button>';
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
    const submit = generateSubmitButton();

    const five = generateStarRating(5);
    const four = generateStarRating(4);
    const three = generateStarRating(3);
    const two = generateStarRating(2);
    const one = generateStarRating(1);

    const forms = ` <form id="new" method="post">
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

const generateListView = function () {
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
    //return function and pass in filtered

}

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

const generateBookmarks = function (arr) {
    const bookmarks = [];

    arr.forEach(bookmark => {

        const rating = generateStarRating(bookmark.rating);
        const edit = generateEditButton();

        let expandedContent = '';
        if (bookmark.expanded === false) {
            expandedContent = "";
        } else {
            expandedContent = `<div class= "bookmark-full">
            <div class='desc'><p>${bookmark.desc}</p></div>
               <div class='row'><a target = "_blank" href=${bookmark.url}><button class = 'visit button' type = 'button'>Visit site</button></a>
                ${edit}
        </div></div>`
        }
            const html = `
        <section class = "bookmark-section" tabindex="0">
           <div data-id="${bookmark.id}" class = "js-bookmark-each bookmark" >
            <h2>${bookmark.title}</h2>
                <div class="rating">
                   ${rating}
            </div>
                ${expandedContent}
            
            </section>
            </div>`;

            bookmarks.push(html);

        }

    );
    const htmlString = bookmarks.join('');
    return htmlString;
};




const renderFromApi = function (arr) {
    const toPush = store.store.bookmarks;
    arr.forEach(obj => {
        let news = store.create(obj.title, obj.rating, obj.url, obj.desc);
        toPush.push(news);
    })

    generateListView();
}


const handleCxlButton = (event => { 
    store.store.bookmarks.forEach(bookmark => {
        if (bookmark.expanded === true) {
            bookmark.expanded = false;
        }
    })
    generateListView()

});

const editPage = ((object) => {
    const title = generateTitle();
    const cxl = generateCxlButton();

    const header = `${ title } <div class='header-buttons'>${cxl}</div>`;
    const form = generateEditForm(object);
    console.log(form);

    const html = `${ form } `;

    render(header, html);
});


//RENDER
const render = ((header, main) => {
    $('header').html(header);
    $('main').html(main);
});













//EXPERIMENTAL

const generateEditForm = function (object) {

    let currentTitle = object.title;
    let currentUrl = object.url;
    let currentDesc = object.desc;
    const submit = generateSubmitButton();
    const del = generateDeleteButton();

    const forms = ` < form id = "edit" method = "patch" >
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
        <div>${del}${submit}</div>

</form>

    
</section > `;
    return forms;
}











const submit =  event => {
    const arr = ($(event.target).serializeArray());
    event.preventDefault();

    const url = arr[1].value;
    api.validateUrl(url);

    const rating = arr[2].value
    const title = arr[0].value;
    const desc = arr[3].value;

    const obj = store.create(title, rating, url, desc);
    store.store.bookmarks.push(obj);
    api.createBookmark(obj);

    generateListView();

}



























$('main').on('click', '.delete', e => {
    console.log('delete button pressed')
})


$('header').on('click', '.filter', event => {
    store.store.showDropDown = !store.store.showDropDown;
    generateListView();

});


$("main").on('keydown', '.bookmark-section', (e) => {
    if (e.keyCode == 13) {
        const id = $(e.target).children().first().data('id');

        const toggle = store.store.bookmarks.find(bookmark => (bookmark.id === id));
        if (toggle.expanded === true) {
            toggle.expanded = false;
        } else { toggle.expanded = true };
        generateListView();
    };
    }
);

$("header").on('keydown', 'li', (e) => {
    if(e.keyCode == 13){
        filterStars(e);
    }
});


$('li').focus();
$('button').focus();


$('main').on('click', '#edit', event => {
    event.stopPropagation();
    const e = $(event.target).closest('.js-bookmark-each').data('id');
    console.log(e)
    const object = store.store.bookmarks.find(bookmark => (bookmark.id === e));

    editPage(object);
});

$('main').submit('#new', submit);

$('header').on('click', 'span', filterStars);

$('header').on('click', '#add', addPage);
$('header').on('click', '.cxl', handleCxlButton);

$('main').on('click', '.bookmark-section', e => {
    const id = $(event.target).closest('.js-bookmark-each').data('id');
    const toggle = store.store.bookmarks.find(bookmark => (bookmark.id === id));

    if (toggle.expanded === true) {
        toggle.expanded = false;
    } else { toggle.expanded = true };
    generateListView();
});


export default {
    generateListView,
    render,
    renderFromApi
}
