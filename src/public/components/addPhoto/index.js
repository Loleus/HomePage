export default class AddPhoto extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
    form.addForm {
        color: #ddd;
        text-align: center;
        width: 100vw;
        max-width: 500px;
        margin: 0 auto;
        padding: 1vh 2vh;
        background: rgba(102, 102, 102, 0.5);
        border-radius: 3px;
      }
      form.addForm input, form.addForm button, form.addForm textarea {
        width: 100%;
        padding: 0.5vh;
        margin-bottom: 0.5;
        box-sizing: border-box;
        font-size: 0.8rem;
        border: 1px solid #666;
        cursor: pointer;
        font-weight: bold;
        color: #ffffff;
        border-radius: 3px;
      }
      form.addForm p {
        font-size:1rem;
      }
    </style>
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
  }
}
