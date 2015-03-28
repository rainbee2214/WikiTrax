window.onload = OnWindowLoad;

function OnWindowLoad()
{
    $('#readingPageButton').click(function(){
      SetNewReadingPage();
    });

    $('#goBackButton').click(function(){
      GoBackToReadingPage();
    });

    $('#viewGraphsButton').click(function(){
      ViewGraphs();
    });

    chrome.storage.local.get("readingPages", function(val)
    {
        if (val.readingPages.length == 0)
        {
            $("#titleOfPage").html("No Reading Page Selected");
        }
        else
        {
            $("#titleOfPage").html(val.readingPages[val.readingPages.length-1].title);
            console.log(val.readingPages[val.readingPages.length-1].title);
        }
    })
}

function SetNewReadingPage()
{
  chrome.tabs.query({active: true}, function (tab)
  {
    MineData(tab[0]);
    console.log(tab);
    var readingPage = 
    {
    title: tab[0].title.substr(0,tab[0].title.length-35),
    url: tab[0].url
    };

    $("#titleOfPage").html(readingPage.title);
    chrome.storage.local.get("readingPages", function(val)
    {
        var existingReadingPages = val.readingPages;
        if (!_.find(existingReadingPages, function(e)
        {
            if (e.url == readingPage.url) return true;
        })) 
        existingReadingPages.push(readingPage);
        chrome.storage.local.set({readingPages: existingReadingPages});
    });
  });
}

function GoBackToReadingPage()
{
  var currentUrl;
  var lastReadingPageUrl;
  chrome.tabs.query({active: true}, function (tab)
  {
    MineData(tab[0]);
    currentUrl = tab[0].url;
    chrome.storage.local.get("readingPages", function(val)
    {
        if (currentUrl == val.readingPages[val.readingPages.length-1].url) val.readingPages.pop();
        if (val.readingPages.length == 0) alert('my alert');

        lastReadingPageUrl = val.readingPages[val.readingPages.length-1].url;
        chrome.tabs.update(tab[0].id, {url: lastReadingPageUrl});
        chrome.storage.local.set({readingPages: val.readingPages});
        $("#titleOfPage").html(val.readingPages[val.readingPages.length-1].title);
    });
  });
  
  //Add data to the graphs
}

function ViewGraphs()
{
    chrome.tabs.query({currentWindow: true}, function (tab)
    {
        var pattern = new RegExp("chrome-extension:\/\/"+chrome.runtime.id+"\/html\/graph\.html");
        console.log("RegExp: ", pattern);

        var tabIsOpenAlready = false;
        var currentTabIdIfOpen;
        var currentTabIndexIfOpen;
        tab.forEach(function(token)
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
            window.open("graph.html",'_blank');
    });

}

function MineData(tabData)
{
    console.log("Mining data: ",tabData);
    // var dataSet = tabData;
    // chrome.storage.local.get("dataSets", function(val)
    // {
    //     var existingDataSets = val.dataSets;
    //     existingDataSets.push(dataSet);
    //     console.log("Data sets: ",existingDataSets);
    //     chrome.storage.local.set({dataSets: existingDataSets});
    // });
}

function OnNewWikiPage(visited)
{
  //We have just loaded a new wiki page
  //If we haven't visited this page yet, or not [determines what data is sent to the graph]

  //End the last timer (if set) and record the time for the previous page in the graph
  //Start a timer for how long the user stays on the page
}


