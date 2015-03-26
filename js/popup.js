window.onload = OnWindowLoad;

function OnWindowLoad()
{

    $('#readingPageButton').click(function(){
      SetNewReadingPage();
    });

    $('#goBackButton').click(function(){
      GoBackToReadingPage();
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
    console.log(currentUrl);
    chrome.storage.local.get("readingPages", function(val)
    {
        
        if (currentUrl == lastReadingPageUrl) val.readingPages.pop();

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

function OnNewWikiPage(visited)
{
  //We have just loaded a new wiki page
  //If we haven't visited this page yet, or not [determines what data is sent to the graph]

  //End the last timer (if set) and record the time for the previous page in the graph
  //Start a timer for how long the user stays on the page
}


