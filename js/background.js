


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if (changeInfo.status === "complete")
	{
		var wikiRegex  = /^http[s]?:\/\/[\w]*\.wikipedia\.org\/wiki\/.*$/img;
		if (wikiRegex.test(tab.url))
		{
			//console.log(tab);
			var titleOfPage = tab.title;
			//console.log("Sending data to graphs..");
			titleOfPage = titleOfPage.substr(0,titleOfPage.length-35);
			//console.log("Title of Page: ", titleOfPage);

			chrome.tabs.executeScript(tabId, {
			    code: "chrome.extension.sendMessage({action: 'getContentText', source: document.body.innerHTML, location: window.location});"
			}, function() 
			{
				if (chrome.extension.lastError)
			 	console.log(chrome.extension.lastError.message);
			});
		}
	}
});


chrome.extension.onMessage.addListener(function(request, sender)
{
	if (request.action == "getContentText")
	{
		console.log(request.source);
	}
})

chrome.runtime.onInstalled.addListener(function()
{
	chrome.storage.local.clear();
	chrome.storage.local.set({readingPages: []});
	chrome.storage.local.set({dataSets: []});
})