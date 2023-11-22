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
        e.target.querySelectorAll('input').forEach(function (node) {
            filterData[node.getAttribute('name')] = node.value;
        });
    }
    function highlightActiveFilters(modalForm) {
        let counter = 0;
        modalForm.querySelectorAll('input').forEach(function (node) {
            if (node.value) {
                counter++;
            }
        });
        let extendedButton = document.querySelector('button[data-form="' + modalForm.id + '"]');
        if (counter) {
            extendedButton.classList.remove('btn-light');
            extendedButton.classList.add('btn-warning');
        } else {
            extendedButton.classList.add('btn-light');
            extendedButton.classList.remove('btn-warning');
        }
    }
    function restoreInputValues(modalForm) {
        for (const [key, value] of Object.entries(filterData)) {
            let input = modalForm.querySelector('input[name="' + key + '"]');
            input.value = value;
        }
    }
    function afterModalClose(e) {
        if (applyRequired) {
            highlightActiveFilters(e.target);
        } else {
            restoreInputValues(e.target);
        }
        filterData = {};
        applyRequired = false;
    }
    function saveAndCloseModal(e) {
        applyRequired = true;
        let modalForm = e.target.closest('.modal');
        let modal = bootstrap.Modal.getInstance(modalForm);
        modal.hide();
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
    let filterData = {};
    let applyRequired = false;
    document.querySelectorAll('.modal').forEach(function (node) {
        node.addEventListener('show.bs.modal', beforeModalOpen);
        node.addEventListener('hidden.bs.modal', afterModalClose);
        node.querySelector('.btn-primary').addEventListener('click', saveAndCloseModal);
    });
    document.addEventListener('DOMContentLoaded', function () {
        console.log('dom');
    });
}