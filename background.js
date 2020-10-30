chrome.webNavigation.onDOMContentLoaded.addListener(function({tabId, url}){
    if (!!url && url.match(/^https\:\/\/(.+\.)?medium\.com\/.+$/)){
        chrome.tabs.executeScript(null, {
            code: 'document.all[0].innerText',
            allFrames: false,
        }, function(results){
            var content = results[0];
            if (content.match(/Read the rest of this story with a free account/)){
                chrome.windows.create({url: url, incognito: true});
                chrome.tabs.remove(tabId);
            }
        });
    }
});
