let active_src = null;

function stopActiveSource() {
    if (active_src) {
        active_src.onended = null; //manual stop, no event
        active_src.stop(0);
    }
}

let buffers = {}; // Storing ArrayBuffer in a dictionary
let context = new (window.AudioContext || window.webkitAudiocontext)();

function playTrack(url) {
    console.log("in playTrack", url);
    // get url from dictionary
    let buffer = buffers[url];
    // stop active audio if any
    stopActiveSource();
    // create new BufferSource
    let source = context.createBufferSource();
    // active audio
    active_src = source;
    source.onended = function () {
        active_src = null;
    };

    source.buffer = buffer;
    source.connect(context.destination);

    source.start(0);
}

// getting all audiobuffers
const tracks = document.querySelectorAll('audio');
// console.log(tracks);
const addTrack = e => {
    e.preventDefault();
}

tracks.forEach(track => {
    // console.log(track.src);
    playTrack(track.src); 
    addTrack;
    getBuffer(track.src);
});



function getBuffer(url) {
    console.log("In getBuffer", url);
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    //request.setRequestHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/');
    //request.setRequestHeader('Content-Type', 'application/xml');
    request.responseType = 'arraybuffer';
    request.onload = function (e) {
        context.decodeAudioData(request.response, store);
    }; 
    request.send();

    function store(buffer) {
        buffers[url] = buffer;
    }
    
}





