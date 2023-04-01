export default class AddPost extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

    <h1 class="title">New post</h1>
    <form class="addForm" method='POST' action='/admin'>
    <label>
        <p>Title</p>
        <input type='text' name='title' required>
    </label>
    <label>
        <p>Created at:</p>
        <input type='date' name='createdAt'>
    </label>
    <label>
        <p>Last edit at:</p>
        <input type='date' name='lastEditAt'>
    </label>
    <label>
        <p>Content:</p>
        <textarea name='text'></textarea>
    </label>
    <label>
        <p>Url to photo</p>
        <input name='picUrl'>
    </label>
    <button type='submit'>Save</button>
</form> 
    `;
  }
}
