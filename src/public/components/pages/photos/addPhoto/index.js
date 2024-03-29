export default class AddPhoto extends HTMLElement {
  
  connectedCallback() {
    this.innerHTML = `
    <link rel="stylesheet" href="/components/pages/photos/addPhoto/style.css">
    <h1 class="title">New photo</h1>
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
        <p>Details:</p>
        <textarea name='text'></textarea>
      </label>
      <label>
        <p>Photo ID on Google Drive</p>
        <input name='picId'>
      </label>
      <button type='submit'>Save</button>
    </form> 
    `;
  };
};
