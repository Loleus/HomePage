const fetchJson = async () => {
  try {
    let response = await fetch('/client/getAll');
    let parsedList = await response.json();
    return parsedList
  } catch (err) {
    console.error(err)
  }
}
const output = ({ name }) => {
  return `<li> ${name} </li>`
}

const renderList = async (post) => {

    post.forEach(function (item) {
      ul.innerHTML += output(item);
    });

}
const renderMenu = async () => {
  let posts = [];
  try {
    let getList = await fetchJson();
    for (let obj of getList) {
      posts.push(obj)
    }
    renderList(post);
  } catch (err) {
    console.error(err)
  }
}
ul.innerHTML = '';
renderMenu();
