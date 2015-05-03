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
        if (val.readingPages.length == 0) alert('This is your only reading page right now!');

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
    var backgroundPage = chrome.extension.getBackgroundPage();
    backgroundPage.ViewGraphs();
}

function MineData(tabData)
{
    console.log("Mining data: ",tabData);
}

function OnNewWikiPage(visited)
{
  //We have just loaded a new wiki page
  //If we haven't visited this page yet, or not [determines what data is sent to the graph]

  //End the last timer (if set) and record the time for the previous page in the graph
  //Start a timer for how long the user stays on the page
}


