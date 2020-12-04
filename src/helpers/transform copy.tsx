import React from "react";
import YouTube from "react-youtube";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { RevealJS, Slide, H } from "revealjs-react";
import RevealHighlight from "revealjs-react/plugins/highlight";
import { MathComponent } from "mathjax-react";
import { getGeogebraStyle } from "helpers/Geogebra";
import SlideShow from "container/SlideShow";
import { getPlainObjectKeys } from "mobx/dist/internal";

// function getObject(el) {
//   try {
//     if (!el.children[0].data) {
//       el.children.forEach((child) => {
//         return (
//           `<${el.name}>${el.children[0].data}</${el.name}>` + getObject(child)
//         );
//       });
//     } else {
//       return `<${el.name}>${getObject(el.children[0])}</${el.name}>`;
//     }
//   } catch {
//     try {
//       return `<${el.name}>${getObject(el.children[0])}</${el.name}>`;
//     } catch {
//       return `<${el.name}></${el.name}>`;
//     }
//   }

//   const text = `<${el.name}>${el.children[0].data}</${el.name}>`;

//   return text;
// }

const opts = {
  minHeight: "390px",
  minWidth: "640px",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
  },
};

function transform(node) {
  // change render of youtube videos
  if (
    node.type === "tag" &&
    node.name === "oembed" &&
    node.attribs.url.includes("yout")
  ) {
    return <YouTube videoId={node.attribs.url.split("/").pop()} opts={opts} />;
  }
  // change render of falstad simulations
  if (
    node.type === "tag" &&
    node.name === "oembed" &&
    node.attribs.url.includes("falstad")
  ) {
    return (
      <iframe
        title={node.attribs.url}
        src={node.attribs.url}
        style={{ width: "100%", minHeight: "400px" }}
      />
    );
  }
  // change render of geogebra
  if (
    node.type === "tag" &&
    node.name === "oembed" &&
    node.attribs.url.includes("geogebra.org")
  ) {
    const style = getGeogebraStyle(node.attribs.url);
    return (
      <iframe
        title={node.attribs.url}
        src={node.attribs.url}
        height={style.height}
        width={style.width}
      ></iframe>
    );
  }
  //change display of revealjs
  if (
    node.type === "tag" &&
    node.name === "div" &&
    node.attribs.class === "reveal"
  ) {
    let steps: string[] = [];
    node.children.forEach((el, index) => {
      el.children.forEach((child) => {
        if (!steps[index]) {
          steps.push(
            `<${child.name}>${child.children[0].data}</${child.name}>`
          );
        } else {
          steps[index] = steps[index].concat(
            `<${child.name}>${child.children[0].data}</${child.name}>`
          );
        }
      });
    });
    return <SlideShow steps={steps} />;
  }

  //change display of math
  if (node.type === "tag" && node.name === "math") {
    //let text = `<math xmlns="http://www.w3.org/1998/Math/MathML">`;
    // node.children.forEach((el) => {
    //   if (el.children[0].data) {
    //     text = text.concat(`<${el.name}>${el.children[0].data}</${el.name}>`);
    //   } else {
    //     text = text.concat(`<${el.name}>${el.children[0].data}<${el.name}>`);
    //     el.children[0].children.forEach((child) => {
    //       text = text.concat(
    //         `<${child.name}>${child.children[0].data}<${child.name}>`
    //       );
    //     });
    //   }
    // });

    // node.children.forEach((el) => {
    //   text = text.concat(getObject(el)!);
    // });

    // text = text.concat(`</math>`);
    // console.log(text);
    // console.log(node.children);
    // return <MathComponent mathml={text} />;
    return;
  }

  //change design of table
  // if (node.type === "tag" && node.name === "table") {
  //   return (
  //     <Table size="small">
  //       <TableBody>
  //         {node.children[0].children.map((tr) => {
  //           return (
  //             <TableRow key={String(Math.random())}>
  //               {tr.children.map((td) => {
  //                 return (
  //                   <TableCell key={String(Math.random())}>
  //                     {td.children[0].data}
  //                   </TableCell>
  //                 );
  //               })}
  //             </TableRow>
  //           );
  //         })}
  //       </TableBody>
  //     </Table>
  //   );
  // }

  return;
}

export default transform;
