    const initer = async (index, name) => {
        const resp = await fetch(`/components/pages/${name}/template.html`, {mode: "cors",});
        const html = await resp.text();
        const base = html;
      
        let htmlToElement = () => {
          const temp = document.createElement("template");
          temp.innerHTML += base;
          return temp.content;
        };
        const tmp = htmlToElement(base);
        return index(tmp);
      };

export { initer }