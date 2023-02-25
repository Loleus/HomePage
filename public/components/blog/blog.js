(function(){

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
        document.getElementById("posts").innerHTML += output(item);
      });
  
  }
  const renderMenu = async () => {
    let posts = [];
    try {
      let getList = await fetchJson();
      for (let obj of getList) {
        posts.push(obj)
      }
      console.log(posts)
      renderList(posts);
    } catch (err) {
      console.error(err)
    }
  }
  console.log("jeb")
  renderMenu();
})()
