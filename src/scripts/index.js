import $ from 'jquery';
import bookmarks from './bookmarks';
import api from './api';
import store from './store';
import '../index.css';

function main() {
    console.log(store.store.adding);
    console.log(7);
    console.log();
    bookmarks.generateListView();

}

$(main);