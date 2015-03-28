// Recherche de bookmarks
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    search(request.query).then(function(bookmarks) {
        console.log(bookmarks);

        // Envoi des bookmarks pour rechargement de la popup
        chrome.extension.getViews({"type": "popup"})[0].refreshBookmarks(bookmarks);
    });
});

/**
 *  Lance la recherche de bookmark sous forme de promesse car chrome.bookmarks est async.
 */
function search(query) {
    return new Promise(function(resolve, reject) {
        chrome.bookmarks.search(query, function(results) {
            var matchingItem = $.map(results, function(el, i) {
                var item; // On ne renvoie que les bookmarks et non les folder qui n'ont pas d'url
                if (el.url && el.url.length !== 0) {
                    item = {
                        id: el.id,
                        url: el.url,
                        title: el.title
                    };
                }
                return item;
            });

            resolve(matchingItem);
        });
    });
}