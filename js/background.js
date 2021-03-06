chrome.runtime.onInstalled.addListener(function()
{
	chrome.storage.local.clear();
	chrome.storage.local.set({readingPages: []});
	chrome.storage.local.set({dataSets: []});
    chrome.storage.local.set({categoryData: []});
	chrome.storage.local.set({currentChart: {id:1}});
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if (changeInfo.status === "complete")
	{
		var wikiRegex  = /^http[s]?:\/\/[\w]*\.wikipedia\.org\/wiki\/.*$/img;
		if (wikiRegex.test(tab.url))
		{
			var titleOfPage = tab.title;
			titleOfPage = titleOfPage.substr(0,titleOfPage.length-35);

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

chrome.commands.onCommand.addListener(function(command) 
{
      console.log('Command:', command);
});

chrome.extension.onMessage.addListener(function(request, sender)
{
	if (request.action == "getContentText")
	{
		var categoryList = [];
		var source = request.source.replace(/.*?\.wikimedia\.org\/.*?/g, "");
		$('#mw-normal-catlinks > ul > li > a', source).each(function()
		{
			categoryList.push($(this).text());
		});

		MineCategories(categoryList);
	}
})

function MineCategories(categoryNames)
{
	console.log(categoryNames);
	chrome.storage.local.get("categoryData", function(val)
    {
        var existingCategoryData = val.categoryData;
    	console.log("Val: ",existingCategoryData);
    	
    	categoryNames.forEach(function(categoryName)
    		{
				var pushNewCategory = true;
    			var category = 
    			{
    				name: categoryName,
    				timesVisited: 1
    			};	
    			existingCategoryData.forEach(function(existingCategory)
    				{
    					if (categoryName == existingCategory.name)
    					{
    						existingCategory.timesVisited++;
    						pushNewCategory = false;
    						//console.log("DUPLICATE CATEGORY", categoryName);
    					}
    				});
        		if (pushNewCategory) existingCategoryData.push(category);
    		});

        chrome.storage.local.set({categoryData: existingCategoryData}, function(){}); 
    });
}


function ViewGraphs()
{
    chrome.tabs.query({currentWindow: true}, function (tab)
    {
        var pattern = new RegExp("chrome-extension:\/\/"+chrome.runtime.id+"\/html\/graph\.html");
        var tabIsOpenAlready = false;
        var currentTabIdIfOpen;
        var currentTabIndexIfOpen;

        tab.forEach(function(token) // Check all the open tabs for a graph
        {
            if (pattern.test(token.url))
            {
                tabIsOpenAlready = true;
                currentTabIdIfOpen = token.id;
                currentTabIndexIfOpen = token.index;
            } 
        });

        if (tabIsOpenAlready) 
        {
            chrome.tabs.reload(currentTabIdIfOpen);
            chrome.tabs.highlight({tabs: currentTabIndexIfOpen}, function(window){});
        }
        else
            window.open("html/graph.html",'_blank');
    });

}