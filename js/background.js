chrome.omnibox.onInputChanged.addListener(  function(text, suggest) {
    if(text.length > 0){
        chrome.bookmarks.search(text, function(results){
            var suggests = [];
            for(var i=0, limit = results.length > 10 ? 10 : results.length; i < limit; i++){
                suggests.push({
                    content: results[i].url,
                    description: results[i].title
                });
            }               
            suggest(suggests);
        });
    }
    updateDefaultSuggestion(text);   
});

function resetDefaultSuggestion() {
    chrome.omnibox.setDefaultSuggestion({
        description: ' '
    });
}

resetDefaultSuggestion();
var searchLabel = chrome.i18n.getMessage('search_label');
function updateDefaultSuggestion(text) {
    chrome.omnibox.setDefaultSuggestion({
        description: searchLabel + ': %s'
    });
}

chrome.omnibox.onInputStarted.addListener(function() {
    updateDefaultSuggestion('');
});

chrome.omnibox.onInputCancelled.addListener(function() {
    resetDefaultSuggestion();
});

chrome.omnibox.onInputEntered.addListener(function(text) {
    // assume that urls or bookmarkslets contains colon
    if(text.indexOf(':') == -1){
        chrome.tabs.update(null, {url: 'http://www.google.com/search?q=' + text});
    } else{
        chrome.tabs.update(null, {url: text});
    }
});
    
 var _gaq = _gaq || [];
 _gaq.push(['_setAccount', 'UA-7218577-45']);
 _gaq.push(['_trackPageview']);

 (function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = 'https://ssl.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();