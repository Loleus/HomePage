export default class Contact extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
  h1 {
  pointer-events: none;
  margin: 1vh 0;
  padding: 0.3em 0 0.5em;
  color: #ffa70480;
  line-height: 1em;
  font-size: 0.8em;
  text-shadow: 1px 1px 2px #272727;
  background-image: linear-gradient(to left, #fff0, #53360080 50%, #fff0);
  box-shadow: 0px 0px 3px 0px #cc0b0b;
  transition: color 0.24s linear;
}
h1:hover {
  color: #b99700;
}
h1 a {
  pointer-events: auto;
  text-decoration: none;
  display: inline-block;
  text-shadow: 1px 2px 1px #272727;
  color: #d6b212;
}
h1 a:hover {
  color: #96c42d;
}
</style>
    <h1>Feel free to <adress><a href="mailto:07zglossie@wp.pl?subject=aboutCode">mail me</a></adress></h1>

    `;
  }
}