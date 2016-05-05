var soundContext = new AudioContext();

var sounds = {
  "dead" : {
    buffer : null,
    url : "sounds/dead.wav"
  },
  "smash" : {
    buffer : null,
    url : "sounds/smash.mp3"
  },
  "ping" : {
    buffer : null,
    url : "sounds/ping.mp3"
  },
  "bump" : {
    buffer : null,
    url : "sounds/bump.mp3"
  },
  "jump" : {
    buffer : null,
    url : "sounds/jump.wav"
  },
  "coin" : {
    buffer : null,
    url : "sounds/coin.mp3"
  }
};

for(var key in sounds) {
  loadSound(key);
}

function loadSound(name){
  var sound = sounds[name];

  var url = sound.url;
  var buffer = sound.buffer;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // First - we try to load the file with an AJAX request...
  request.onload = function() {
    soundContext.decodeAudioData(request.response, function(newBuffer) {
      sound.type = "buffer";
      sound.buffer = newBuffer;
    });
  }

  // If that fails, we instead create an Audio element
  request.onerror = function(e){
    sound.type = "element";
    sound.element = document.createElement('audio');
    sound.element.src = sound.url;
  }

  request.send();
}

function playSound(name){

  var sound = sounds[name];

  if(sound.type == "buffer") {
    var buffer = sound.buffer;
    if(buffer){
      var source = soundContext.createBufferSource();
      source.buffer = buffer;
      source.connect(soundContext.destination);
      source.start(0);
    }
  } else {
    sound.element.pause();
    sound.element.currentTime = 0;
    sound.element.play();
  }
}
