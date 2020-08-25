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
    <li data-id="2" class = 'two-star rating drop-down-two drop-down-item'>${two}</li>
    <li data-id="1" class = 'one-star rating drop-down-one drop-down-item'>${one}</li>
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
    const cxl = '<button type="button" class="cxl cancle button"> X </button>';
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
    const submit = generateSubmitButton();

    //how to add secret form buttons
    //lable class has secret value that effects 
    //how stars re-render???
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
        <span class="star-item" data-id="1">☆</span><span class="star-item"  data-id="2">☆</span><span class="star-item"  data-id="3">☆</span><span class="star-item"  data-id="4">☆</span><span class="star-item"  data-id="5">☆</span>
        </div>
        </div>
    <lable for="desc"></lable>
    <input type="text" id="desc" name="desc" class="desc-input" placeholder="Add a description of your bookmark (optional)">
   <div class = "row">${submit}</div>

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
           <div data-id="${bookmark.id}" class = "js-bookmark-each bookmark" >
            <h3>${bookmark.title}</h3>
                <div class="rating">
                   ${rating}
            </div>`;

        if (bookmark.expanded === false) {
            const closedBookmark = `${html}</div></section>`;
            bookmarks.push(closedBookmark);
        } else {
            const expanded = `<div class= "bookmark-full">
            <div class='desc'><p>${bookmark.desc}</p></div>
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
       let news = store.create(obj.title, obj.rating, obj.url, obj.desc);
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

    const rating = arr[2].value
    const title = arr[0].value;
    const desc = arr[3].value;


    const obj = store.create(title, rating, url, desc);
    store.addBookmark(obj);
    console.log(obj);
    api.createBookmark(obj);

    generateListView();
}


const handleCxlButton = (event => {
    //for each, if 
    store.store.bookmarks.forEach(bookmark => {
        if (bookmark.expanded === true){
            bookmark.expanded = false;
        }
    })
    generateListView()
    
});

const editPage = ((object) => {
    const title = generateTitle();
    const cxl = generateCxlButton();

    const header = `${title}<div class ='header-buttons'>${cxl}</div>`;
    const form = generateEditForm(object);
    console.log(form);

    const html = `${form}`;

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

    //

    const forms = ` <form id="edit">
    <div class = 'form-item'>
    <label for="name">Title:</label>
    <input id="name" type="text" name="name" class="input-name" value= "${currentTitle}" required />
    </div>
    <div class = 'form-item'>
    <label for="url">Url:</label>
    <input type="text" id="url" name="url" class="input-url" value="${currentUrl}"/>
    </div>
    <div class = 'form-item'>
        </div>
    <lable for="desc"></lable>
    <input type="text" id="desc-edit" name="desc" class="desc-input" value ="${currentDesc}">
  <div>${del}${submit}</div>

</form>

    
</section>`;
    return forms;
}

//EVENT HANDLER FUNCTIONS
const handleBookmarkToggle = function (event) {
    const e = $(event.target).closest('.js-bookmark-each').data('id');
    const toggle = store.store.bookmarks.find(bookmark => (bookmark.id === e));

    if (toggle.expanded === true) {
        toggle.expanded = false;
    } else { toggle.expanded = true };
    generateListView();

};









































const selectRating = (event) => {
    const selected = $(event.currentTarget)
        .closest('span')
        .data('id');

    console.log(selected);



    $(event.currentTarget)
        .closest('span')
        .addClass('fill')

//how to get all to fill at same time???
//DIFFERENT TRAVERSAL METHOD

//how can I only have one valid selection at once???


//if (selected )
}

$('main').on('click', '.star-item', selectRating)


const handleDeleteButton = function(event){
    //get element id
    //find element by id
    //remove from store with filter item id ! current item 
}

$('main').on('click', '.delete', handleDeleteButton)



















































const handleBookmarkEdit = (event => {
    event.stopPropagation();
    const e = $(event.target).closest('.js-bookmark-each').data('id');
    console.log(e)
    const object = store.store.bookmarks.find(bookmark => (bookmark.id === e));

    editPage(object);
    
});






$('header').on('click', '.filter', event => {
    store.showDropDown = !store.showDropDown;
    generateListView();
});

//$('main').on('click', '#delete', handleDeleteBookmark)

$('main').on('click', '#edit', handleBookmarkEdit);

$('main').submit('#new', submit);

$('header').on('click', 'span', filterStars)

$('header').on('click', '#add', addPage);
$('header').on('click', '.cxl', handleCxlButton);

$('main').on('click', 'section', handleBookmarkToggle);


export default {
    generateListView,
    render,
    renderFromApi
}
