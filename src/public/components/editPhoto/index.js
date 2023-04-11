import { photoList } from "../../js/utils/helper.util.js";

export default class EditPhoto extends HTMLElement {

  static observedAttributes() {
    return ["id"];
  }

  async connectedCallback() {
    if (this.id && this.id !== null) {
      const photo = await photoList(this.id);
      this.innerHTML = `
      <link rel="stylesheet" href="/components/editPhoto/style.css">
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
      `
    };
  };
};
