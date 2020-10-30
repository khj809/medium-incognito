var loginRequired = "Read the rest of this story with a free account";
var membershipRequired = "Become a member to get unlimited access";

chrome.webNavigation.onCompleted.addListener(function({tabId, url, frameId}){
    if (frameId !== 0) return;
    if (url.match(/^chrome\:\/\//)) return;

    chrome.tabs.executeScript(tabId, {
        code: `document.head.querySelector("meta[property='og:site_name']").getAttribute("content")`
    }, function(results){
        if (!results) return;
        var siteName = results[0];
        if (siteName === "Medium"){
            chrome.tabs.executeScript(tabId, {
                code: 'document.all[0].innerText',
            }, function(results){
                if (!results) return;
                var content = results[0];
                if (content.match(`${loginRequired}|${membershipRequired}`)){
                    chrome.windows.create({url, incognito: true});
                    chrome.tabs.remove(tabId);
                }
            });
        }
    });
});
