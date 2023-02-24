let sc, yt, info, blog;
fetch("/components/modal/soundcloud/sc.html").then(stream => stream.text()).then(text => sc = text);
fetch("/components/modal/youtube/yt.html").then(stream => stream.text()).then(text => yt = text);
fetch("/components/modal/aboutMe/info.html").then(stream => stream.text()).then(text => info = text);
fetch("/components/modal/blog/blog.html").then(stream => stream.text()).then(text => blog = text);
const getHTML = (id) => {
  let retTemp;
  switch (id) {
    case "about": retTemp = `${info}`;
      break;
    case "music": retTemp = `${sc}`;
      break;
    case "video": retTemp = `${yt}`;
      break;
    case "blog": retTemp = `${blog}`;
      break;
    case "admin": retTemp =  window.location.href = "/home";
      break;
    default: retTemp = "I have never heard of that link...";
  }
  return retTemp;
}
 const getTemp = (vis, id, text) => {
  if (vis) {
    return `
      <section class="container">
        <article id="content" class="content">
          ${getHTML(id)}
        </article>
      </section>
      `
  }
  return `
      <button>${text}</button>
      `
}
export default getTemp;