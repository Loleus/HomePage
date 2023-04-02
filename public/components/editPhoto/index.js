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
