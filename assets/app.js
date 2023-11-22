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
    function handlePasteEvent(modalForm) {
        let maxRow = 3;
        let maxColumn = 2;
        modalForm.querySelectorAll('input').forEach(function (node) {
            node.addEventListener('paste', function (e) {
                e.preventDefault();
                let paste =
                    (e.clipboardData || window.clipboardData)
                        .getData('text')
                        .replaceAll("\r\n", "\n")
                        .replaceAll("\r", "\n");
                let rows = paste.split("\n");
                let data = [];
                rows.forEach(function (row) {
                    let cleanRow = row.replaceAll("\r", '');
                    if (cleanRow) {
                        let cells = cleanRow.split("\t");
                        data.push(cells);
                    }
                });
                let currentRow = parseInt(node.dataset.row);
                let currentColumn = parseInt(node.dataset.column);
                let dataRowIndex = 0;
                let dataColumnIndex = 0;
                for (let row = currentRow; row <= maxRow; row++) {
                    dataColumnIndex = 0;
                    for (let column = currentColumn; column <= maxColumn; column++) {
                        if (data[dataRowIndex] !== undefined) {
                            if (data[dataRowIndex][dataColumnIndex] !== undefined) {
                                let input = modalForm.querySelector('input[data-row="' + row + '"][data-column="' + column + '"]');
                                input.value = data[dataRowIndex][dataColumnIndex];
                            }
                        }
                        dataColumnIndex++;
                    }
                    dataRowIndex++;
                }
            });
        });
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
    document.querySelectorAll('.modal').forEach(function (modalForm) {
        modalForm.addEventListener('show.bs.modal', beforeModalOpen);
        modalForm.addEventListener('hidden.bs.modal', afterModalClose);
        modalForm.querySelector('.btn-primary').addEventListener('click', function () {
            applyRequired = true;
            let modal = bootstrap.Modal.getInstance(modalForm);
            modal.hide();
        });
        modalForm.querySelector('.btn-light').addEventListener('click', function () {
            modalForm.querySelectorAll('input').forEach(function (node) {
                node.value = '';
            });
        });
    });
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.modal').forEach(function (modalForm) {
            highlightActiveFilters(modalForm);
            handlePasteEvent(modalForm);
        });
    });
}