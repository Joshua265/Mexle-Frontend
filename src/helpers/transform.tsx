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
    return (
      // <div className="reveal">
      //   <RevealJS plugins={[RevealHighlight]}>
      //     {node.children.map((slide) => {
      //       return (
      //         <Slide>
      //           <P size="1">Hello World</P>
      //         </Slide>
      //       );
      //     })}
      //   </RevealJS>
      // </div>
      <div className="reveal">
        <RevealJS plugins={[RevealHighlight]}>
          <Slide>
            <H size="1">Hello, World!</H>
          </Slide>
          <Slide>
            <H size="1">Hello, World!</H>
          </Slide>
        </RevealJS>
      </div>
    );
  }

  //change display of math
  if (node.type === "tag" && node.name === "math") {
    let text = "";
    node.children.forEach((el) => {
      text = text.concat(`${el.children[0].data}`);
    });
    return <MathComponent tex={String.raw`${text}`} display={false} />;
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
