import $ from 'jquery';
import bookmarks from './bookmarks';
import api from './api';
import store from './store';
import '../index.css';

function main() {

   api.getBookmark()
   .then(res => {
      if(!res.ok){
         return bookmarks.generateErrorMessage(`<h2 class='error-header'>Bookmarks could not be found</h2><p class='error-message'> Please try adding a bookmark</p>`)
      } else {
         store.store.error='null';
          return res.json()
      }
  })
  .then(data => bookmarks.renderFromApi(data))
  .catch(err => {
     store.store.error = "fetchBookmarks";
     bookmarks.generateErrorMessage(`<h2 class='error-header'>Bookmarks could not be found</h2><p>${err}</p>`)
   });

}

$(main);