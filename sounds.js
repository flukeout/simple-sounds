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
  var url = sounds[name].url;
  var buffer = sounds[name].buffer;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    soundContext.decodeAudioData(request.response, function(newBuffer) {
      sounds[name].buffer = newBuffer;
    });
  }
  request.send();
}

function playSound(name){
  var buffer = sounds[name].buffer;
  if(buffer){
    var source = soundContext.createBufferSource();
    source.buffer = buffer;
    source.connect(soundContext.destination);
    source.start(0);
  }
}
