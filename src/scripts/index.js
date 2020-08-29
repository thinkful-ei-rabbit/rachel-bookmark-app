import $ from 'jquery';
import bookmarks from './bookmarks';
import api from './api';
import store from './store';
import '../index.css';

function main() {

   api.getBookmark()
   .then(res => res.json())
   .then(data => bookmarks.renderFromApi(data))
   .catch(error => bookmarks.generateErrorMessage(error));

}

$(main);