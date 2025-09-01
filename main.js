let historyStack = [];
let historyIndex = -1;

// Open URL or search
function openURL(url){
    const container = document.getElementById('iframe-container');
    container.innerHTML = ''; // remove previous iframe

    // auto prepend https if not included
    if(!url.startsWith('http://') && !url.startsWith('https://')){
        if(url.includes(' ')) url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        else url = 'https://' + url;
    }

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.loading = 'lazy';
    container.appendChild(iframe);

    // history management
    historyStack = historyStack.slice(0, historyIndex+1);
    historyStack.push(url);
    historyIndex++;
}

// Go button
function goToURL(){
    const url = document.getElementById('url-bar').value;
    if(url) openURL(url);
}

// Back and forward
function back(){
    if(historyIndex > 0){
        historyIndex--;
        openURL(historyStack[historyIndex]);
    }
}
function forward(){
    if(historyIndex < historyStack.length-1){
        historyIndex++;
        openURL(historyStack[historyIndex]);
    }
}

// Optional: Enter key triggers search
document.getElementById('url-bar').addEventListener('keypress', function(e){
    if(e.key === 'Enter') goToURL();
});
