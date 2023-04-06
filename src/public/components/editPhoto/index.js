let list
const photoList = async () => {
  try {
    let response = await fetch('admin/getAll');
    let parsedList = await response.json();
    list = parsedList
  } catch (err) {
    console.error(err)
  }
}
photoList()
export default class EditPhoto extends HTMLElement {
  static observedAttributes() {
    return ["id"];
  }

  async connectedCallback() {
    const id = this.getAttribute("id");
    console.log(id)
    if (id && id !== null) {
      let photo = list.find(e => e.id === id);
      this.innerHTML = `
      <style>
      .addForm {
        color: #ddd;
        text-align: center;
        width: 100vw;
        max-width: 500px;
        margin: 0 auto;
        padding: 1vh 2vh;
        background: rgba(102, 102, 102, 0.5);
        border-radius: 3px;

      }
      
      label p {
        font-size: 1rem;
      }
      
      input,
      select,
      textarea,
      button,
      form button {
        width: 100%;
        padding: 0.5vh;
        margin-bottom: 0.5;
        box-sizing: border-box;
        font-size: 0.8rem;
        border-radius: 3px;
        text-shadow: 1px 1px 1px #00000060;
      }
      
      input[type="submit"] {
        background-color: #333;
        border: 1px solid #666;
        cursor: pointer;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 0;
      }
      
      
      </style>
      <h1 class="title">Edit ${photo.title}</h1>
      <form class="addForm" method='POST' action='/admin/${photo.id}?_method=PUT'>
      <label>
      <p>Title</p>
      <input type='text' name='title' required value="${photo.title}">
  </label>
  <label>
      <p>Created at:</p>
      <input value="${photo.createdAt}" type='date' name='createdAt'>
  </label>
  <label>
      <p>Details:</p>
      <textarea name='text'>${photo.text}</textarea>
  </label>
          <label>
          <p>Photo ID on my Google Drive</p>
          <input value="${photo.picId}" name='picUrl'>
      </label>
          <button type='submit'>Update</button>
      </form>
      <form style="margin-bottom:20px;" class="addForm">
    <button type="button" onclick="javascript:history.back()">Back to photos</button>
    </form>
      `;
    }
  }
}
