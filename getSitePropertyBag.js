// Function to get property bag for a site
async function getSitePropertyBag() {
    // Construct the REST API endpoint URL using _spPageContextInfo
    var siteUrl = getCurrentSiteUrl();
    var url = siteUrl + "/_api/web/allproperties";


    await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(function (data)
    {
        data.text().then(function (response) {
            prompt("Site Property Bag", response);
        })
        
    });
}
function getCurrentSiteUrl() {
    var pathArray = window.location.pathname.split('/');
    var siteUrl = window.location.protocol + "//" + window.location.host;

    // Assuming the site is under the managed path "/sites" or "/teams"
    var managedPaths = ["/sites/", "/teams/"];

    // Find the managed path in the URL
    var managedPath = managedPaths.find(function (path) {
        return pathArray.includes(path.replace(/\//g, ''));
    });

    if (managedPath) {
        var pathIndex = pathArray.indexOf(managedPath.replace(/\//g, '')) + 1;
        var sitePath = pathArray.slice(0, pathIndex + 1).join('/');
        siteUrl += sitePath;
    } else {
        // If no managed path is found, assume the site is the root site
        siteUrl += "/";
    }

    return siteUrl;
}

getSitePropertyBag();
