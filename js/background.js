


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if (changeInfo.status === "complete")
	{
		var wikiRegex  = /^http[s]?:\/\/[\w]*\.wikipedia\.org\/wiki\/.*$/img;
		if (wikiRegex.test(tab.url))
		{
			console.log(tab);
			var titleOfPage = tab.title;
			console.log("Sending data to graphs..");
			titleOfPage = titleOfPage.substr(0,titleOfPage.length-35);
			console.log("Title of Page: ", titleOfPage);
		}
	}
});


chrome.runtime.onInstalled.addListener(function()
{
	chrome.storage.local.clear();
	chrome.storage.local.set({readingPages: []});
})