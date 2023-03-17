export default class Login extends HTMLElement {
  submitForm(e) {
    console.log("prevent")
    e.preventDefault()

  }
  connectedCallback() {
    this.innerHTML = `
    <form class="form" action="/login" method="POST">
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="submit" value="LOGIN">
    </form>
    `;

    this.form.addEventListener("submit", this.submitForm)
  }
}
