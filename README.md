## Some JS to play sounds!

This code uses the Web Audio API to play sounds in the browser.

### Usage


To get started, include the ``sounds.js`` file in your project. Then, edit the ``sounds`` object to add your own sounds. Each sound has a ``name`` and ``url`` attribute.


** Sample Sound**

```
  "dead" : {
    url : "sounds/dead.wav"
  },
```

All of the sounds in the ``sounds`` object will be loaded and you can play them with the ``playSound(soundName)`` method...

**Playing a Sounds**

```
playSound("dead");
```

### How it works

First, it tries to make an AJAX request to grab the audio file from the provided ``url``. If that fails (which will happen when used on a local filesystem due to a CORS error) it creates dynamically creates a new ``<audio/>`` element and uses that instead.
