import { uuid } from "uuidv4";

export default function editParser(htmlString) {
  const parser = new DOMParser();
  const DOM = parser.parseFromString(htmlString, "text/html");

  const body = DOM.querySelector("body");
  let lastOpenedTag = null;
  const json = Array.from(body.children).map((element, i) => {
    console.log(Array.from(element.children).toString());
    if (
      element.tagName === "FIGURE" &&
      Array.from(element.children).filter((el) => el.tagName === "IMG")
        .length === 1
    ) {
      lastOpenedTag = null;
      const image = Array.from(element.children).filter(
        (el) => el.tagName === "IMG"
      )[0];
      const caption = Array.from(element.children).filter(
        (el) => el.tagName === "FIGCAPTION"
      )[0];
      return {
        key: uuid(),
        html: "",
        type: "image",
        props: {
          src: image.src,
          width: Number(image.style.width.slice(0, -1)),
          id: element.id,
          content: caption.textContent,
        },
      };
    }
    if (element.tagName === "P") {
      lastOpenedTag = null;
      return {
        key: uuid(),
        html: "",
        type: "paragraph",
        props: { content: element.textContent },
      };
    }
    if (["H1", "H2", "H3", "H4", "H5"].includes(element.tagName)) {
      lastOpenedTag = null;
      return {
        key: uuid(),
        html: "",
        type: "header",
        props: {
          content: element.textContent,
          headerType: element.tagName.toLowerCase(),
        },
      };
    }
  });
  console.log(DOM);
  console.log(json);
  return json;
}
