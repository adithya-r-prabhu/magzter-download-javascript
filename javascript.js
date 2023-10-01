var factories = [
    function() { return new ActiveXObject("Microsoft.XMLHTTP"); }, // for old IE
    function() { return new XMLHttpRequest(); }
];

function XHRMaker() {
    var xhr = false,
        i = factories.length;
    while (0 <= --i) {
        try {
            xhr = factories[i]();
            break;
        } catch (e) { }
    }
    return xhr;
}

function getSource(cb) {
    var xhr = XHRMaker();
    if (!xhr) return false;
    xhr.open('GET', window.location.href, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            delete xhr.onreadystatechange;
            cb(xhr.responseText);
        }
    };
    xhr.send(null);
}

var retrievedHTML;  // Variable to store the retrieved HTML

getSource(function(html) {
    // Store the retrieved HTML in the variable
    retrievedHTML = html;

    // Use regex to extract imgUrls
    var pattern = /"svgUrl":\s*"([^"]+)"/g;
    var imgUrls = [];
    var match;

    while ((match = pattern.exec(retrievedHTML)) !== null) {
        imgUrls.push(match[1]);
    }

    console.log("Extracted imgUrls:");
    console.log(imgUrls);

    // Open each image in a new tab/window
    imgUrls.forEach(function(url) {
        var newWindow = window.open(url);
        newWindow.focus();
    });
});
