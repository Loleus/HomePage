export default class AddPost extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

    <h1>New post</h1>
    <form class="addForm" method='POST' action='/client'>
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
        <input type='date' name='lastEdit'>
    </label>
    <label>
        <p>Content:</p>
        <textarea name='post'></textarea>
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
