var text = 'Savor  the  delightful  flavor  of  Bubba-Cola',
    canvasWidth = 620,
    canvasHeight = 200,
    rightEdgeBuffer = 50;

WebFont.load({  // Web Font Loader: https://github.com/typekit/webfontloader
  google: {
    families: ['Source Sans Pro']
  },
  active: function () {  // Gets called when font loading is done.
    var canvas = document.getElementsByTagName('canvas')[0],
        context = canvas.getContext('2d'),
        yZero = canvasHeight / 2,      // Set axis position and amplitude
        amplitude = canvasHeight / 4,  // according to canvas dimensions.
        textColor ='#fff',
        backgroundColor = '#000';
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.font = "32px 'Source Sans Pro', monospace";

    var pos = canvasWidth;  // Split the text into characters.
    var units = text.split('').map(function (char) {
      var width = context.measureText(char).width,
          unit = { char: char, width: width, pos: pos };
      pos += width;  // Calculate the pixel offset of each character.
      return unit;
    });

    var running = true,
        lapTime;  // Set this before the first animation call.

    function animate() {
      var currentTime = Date.now(),
          dp = (currentTime - lapTime) / 15;  // Displacement in pixels.
      lapTime = currentTime;
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvasWidth, canvasHeight);
      units.forEach(function (unit) {
        unit.pos -= dp;  // Update char position.
        if (unit.pos < -unit.width) {  // Wrap around from left to right.
          unit.pos += canvasWidth + rightEdgeBuffer;
        }
        var y = Math.sin(unit.pos / 45) * amplitude;
        context.fillStyle = textColor;
        context.fillText(unit.char, unit.pos, yZero + y);
      });
      if (running) {
        requestAnimationFrame(animate);
      }
    }

    document.getElementById('stopButton').onclick = function () {
      running = false;
    };

    lapTime = Date.now();
    requestAnimationFrame(animate);
  }
})