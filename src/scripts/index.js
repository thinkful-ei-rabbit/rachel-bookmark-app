import $ from 'jquery';
import bookmarks from './bookmarks';
import api from './api';
import store from './store';
import '../index.css';

function main() {
    bookmarks.generateListView();
    console.log(store.showDropDown);

}

$(main);



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
//list from filter needs to show too
//remove a class of hidden from the ul
//does it have an id??




//FUNCTION ON CLICK + BUTTON
//get header, switch plus to x
//get add button
//get generateForms
//get delete button

//render to page


//FUNCTION TAKES IN VALUES OF CLICKS AND UPFATES STORE
//makes new object from 


//when the div of an item is clicked, it should call
//a function that updates the store with class true
//forEach loop to find them 


//this should be tied together with header in function
//that renders html main differently

//SHOULD SWITCH VALUE OF STORE EVERY TIME AND THEN CALL 
//FUNC THAT BUILDS MAIN PAGE

