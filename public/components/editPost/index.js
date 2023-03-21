let list
const userList = async () => {
  try {
    let response = await fetch('client/getAll');
    let parsedList = await response.json();
    console.log(parsedList)
    list = parsedList
  } catch (err) {
    console.error(err)
  }
}
userList()
console.log(list)
export default class EditPost extends HTMLElement {
  static observedAttributes() {
    return ["id"];
  }

  async connectedCallback() {
    const id = this.getAttribute("id");
    console.log(id)
    if (id && id !== null) {
      let post = list.find(e => e.id === id);
      this.innerHTML = `
      <h1>Edytujesz ${post.title}</h1>
      <form class="form" method='POST' action='/client/${post.id}?_method=PUT'>
          <label>
              <p>Imię:</p>
              <input type='text' name='name' value='${post.title}'>
          </label>
          <label>
              <p>Data wizyty:</p>
              <input type='date' name='nextContactAt' value='${post.date}'>
          </label>
          <label>
              <p>Uwagi:<p>
              <textarea name='notes'>${post.text}</textarea>
          </label>
          <label>
              <p>Liga:</p>
              <select name='category'>
                  <option value="" selected disabled>${post.category}</option>
                  <option value="BIZNES">BIZNES</option>
                  <option value="WOJSKO">WOJSKO</option>
                  <option value="POLITYKA">POLITYKA</option>
              </select>
          </label>
          <button disabled="true" type='submit'>Zapisz</button>
      </form>
      `;
    }
  }
}

customElements.define("wc-editpost", EditPost);
