export default function animate(msg) {
  const message = msg;
  const container = this.shadowRoot.querySelector('#target');
  let n;
  function rerun() {
    container.textContent = '';
    n = 0;
    typist(message, container);
  };
  rerun();
  function interval(letter) {
    if (letter == ';' || letter == '.' || letter == ',') {
      return Math.floor((Math.random() * 300) + 300);
    } else {
      return Math.floor((Math.random() * 100) + 5);
    }
  }
  function typist(text, target) {
    if (typeof (text[n]) != 'undefined') {
      target.textContent += text[n];
    }
    n++;
    if (n < text.length) {
      setTimeout(function () {
        typist(text, target)
      }, interval(text[n - 1]));
    }
    if (n === message.length) {
      console.log("interwal");
      // return setTimeout(() => { rerun() }, 2000)
    }
  }
}