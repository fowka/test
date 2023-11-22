/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
// window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import './app.scss';

let nameSuggestion = document.getElementById('name_suggestion');
if (nameSuggestion) {
    function debounce(callee, timeoutMs) {
        return function perform(...args) {
            let previousCall = this.lastCall
            this.lastCall = Date.now()
            if (previousCall && this.lastCall - previousCall <= timeoutMs) {
                clearTimeout(this.lastCallTimer)
            }
            this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
        }
    }
    function searchSuggestions(e) {
        if (nameSuggestionStatus) {
            if (searchField.value) {
                let url = encodeURI('/search?search=' + searchField.value);
                fetch(url)
                    .then(function (response) {
                        return response.text()
                    })
                    .then(function (html) {
                        searchResult.innerHTML = html;
                        addSearchResultListeners();
                    });
            } else {
                searchResult.innerHTML = '';
            }
        }
    }
    function addSearchResultListeners() {
        searchResult.querySelectorAll('td a').forEach(function (node) {
            node.addEventListener('click', function (e) {
                e.preventDefault();
                let nameField = document.getElementById('MAKTX');
                nameField.value = node.innerHTML;
                searchResult.innerHTML = '';
            });
        });
    }
    function beforeModalOpen(e) {
        // TODO Set filterData from fields
        console.log('open ' + e.target.id)
    }
    function afterModalClose(e) {
        console.log('close ' + e.target.id)
        // TODO If cancelled, restore fields from filterData
        // TODO If applied and fields is not empty, mark extended button as color
        // TODO If applied and fields is empty, unmark extended button
   }
    let nameSuggestionStatus = false;
    nameSuggestion.addEventListener('input', function (e) {
        nameSuggestionStatus = nameSuggestion.checked;
        if (!nameSuggestionStatus) {
            searchResult.innerHTML = '';
        }
    });
    let searchResult = document.getElementById('search-result');
    let searchField = document.getElementById('MAKTX');
    const debouncedHandle = debounce(searchSuggestions, 1000)
    searchField.addEventListener('input', debouncedHandle);
    let filterData = [];
    document.querySelectorAll('.modal').forEach(function (node) {
        node.addEventListener('show.bs.modal', beforeModalOpen);
        node.addEventListener('hidden.bs.modal', afterModalClose);
    });
}