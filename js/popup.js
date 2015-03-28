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
  console.log('This is the reading button.');
  //Get current URL
  //Get title of webpage
  //Add to stack
  chrome.tabs.query({active: true}, function (tab)
  {
    console.log(tab);
    var readingPage = 
    {
    title: tab[0].title.substr(0,tab[0].title.length-35),
    url: tab[0].url
    };

    $("#titleOfPage").html(readingPage.title);
    chrome.storage.local.get("readingPages", function(val)
    {
        console.log(val);
        var existingReadingPages = val.readingPages;
        if (!_.find(existingReadingPages, function(e){
            if (e.url == readingPage.url) return true;
        })) existingReadingPages.push(readingPage);
        console.log("Check order here: ", existingReadingPages);
        chrome.storage.local.set({readingPages: existingReadingPages});
    });

    
    MineData(tab[0].url.length);

  });

  //Add data to the graphs
}

function GoBackToReadingPage()
{
    //If we are on a reading page, pop that page and go to reading pages.length - 1
    //else go to reading pares.length -1 
  //Pop the stack
  //Go to that url [it is the last reading page we were on]

  var currentUrl;
  var lastReadingPageUrl;
  chrome.tabs.query({active: true}, function (tab)
  {
    currentUrl = tab[0].url;
    //window.open(tab[0].url,'_blank');
    console.log(currentUrl);
    MineData(tab[0].title.length);
    chrome.storage.local.get("readingPages", function(val)
    {
    //if (val.readingPages.length > 2) lastReadingPageUrl = val.readingPages[val.readingPages.length-2].url;
        
        if (currentUrl == val.readingPages[val.readingPages.length-1].url) 
            {
                val.readingPages.pop();
            }

        if (val.readingPages.length == 0)
        {
            alert('my alert');
        }
        lastReadingPageUrl = val.readingPages[val.readingPages.length-1].url;
        chrome.tabs.update(tab[0].id, {url: lastReadingPageUrl});
        chrome.storage.local.set({readingPages: val.readingPages});
        $("#titleOfPage").html(val.readingPages[val.readingPages.length-1].title);
        console.log("After button click.", val.readingPages);
    });
  });
  
  //Add data to the graphs
}

function ViewGraphs()
{

    chrome.storage.local.get("dataSets", function(val)
    {
        console.log("Data sets: ",val);
    });
    window.open("graph.html",'_blank');
}

function MineData(tabData)
{
    var dataSet = tabData;
    chrome.storage.local.get("dataSets", function(val)
    {
        var existingDataSets = val.dataSets;
        existingDataSets.push(dataSet);
        console.log("Data sets: ",existingDataSets);
        chrome.storage.local.set({dataSets: existingDataSets});
    });
}

function OnNewWikiPage(visited)
{
  //We have just loaded a new wiki page
  //If we haven't visited this page yet, or not [determines what data is sent to the graph]

  //End the last timer (if set) and record the time for the previous page in the graph
  //Start a timer for how long the user stays on the page
}


