var bookmarks = new Ractive({
    el: $('#bookmark-extension'),
    template: $('#bookmark-template').val(),
    data: { bookmarks: [] }
});

// Ouverture des bookmarks qui seront ajoutés lors d'une recherche, dans un nouvel onglet
$('#bookmark-results').on('click', 'li > a', function(e) {
    e.preventDefault();
    chrome.tabs.create({ url: $(this).attr('href') });
});

// Lorsque la valeur de l'input change : https://gist.github.com/brandonaaskov/1596867
$('#bookmark-input')
.attr('autofocus', 'autofocus')
.bind('input', function() {
    chrome.runtime.sendMessage({ query: $(this).val() }, function(response) {
        bookmarks.set('bookmarks', request.bookmarks);
    });
});

// Permet de charger les bookmarks dans la popup
window.refreshBookmarks = function(res) {
    bookmarks.set('bookmarks', res);
};