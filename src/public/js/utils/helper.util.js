let list
let listPerPage = 6;

let getOffset = (page) => {
  return (page - 1) * [listPerPage];
};

const photoList = async (id) => {
  try {
    let response = id ? await fetch('/admin/' + id) : await fetch('/admin/getAll');
    let parsedList = await response.json();
    list = parsedList
    return list

  } catch (err) {
    console.error(err)
    return
  }
};

export {
  getOffset,
  photoList,
  listPerPage
};
