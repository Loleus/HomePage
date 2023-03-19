export default class AddPost extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

    <h1>Nowy post</h1>
    <form class="addForm" method='POST' action='/client'>
    <label>
        <p>e-mail:</p>
        <input type='email' name='mail'>
    </label>
    <label>
        <p>Imię:</p>
        <input type='text' name='name' required>
    </label>
    <label>
        <p>Data wizyty:</p>
        <input type='date' name='nextContactAt'>
    </label>
    <label>
        <p>Uwagi:</p>
        <textarea name='notes'></textarea>
    </label>
    <label>
        <p>Liga:</p>
        <select name='category'>
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
