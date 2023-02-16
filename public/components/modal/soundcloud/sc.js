(function () {
  var widgetIframe = document.getElementById('sc-widget'),
    widget = SC.Widget(widgetIframe);
  widget.bind(SC.Widget.Events.READY, function () {
    widget.bind(SC.Widget.Events.PLAY, function () {
      widget.getCurrentSound(function (currentSound) {
        console.log('sound ' + currentSound.get('') + 'began to play');
      });
    });
    widget.getVolume(function (volume) {
      console.log('current volume value is ' + volume);
    });
    widget.setVolume(50);
  });
}());
