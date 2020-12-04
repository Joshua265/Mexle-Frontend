import React from "react";
import YouTube from "react-youtube";
import { MathComponent } from "mathjax-react";
import { getGeogebraStyle } from "helpers/Geogebra";
import SlideShow from "container/SlideShow";

var HtmlToReact = require("html-to-react");
var HtmlToReactParser = require("html-to-react").Parser;

const opts = {
  minHeight: "390px",
  minWidth: "640px",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
  },
};

var isValidNode = function () {
  return true;
};

// Order matters. Instructions are processed in the order they're defined
var processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
var processingInstructions = [
  {
    // Custom <Geogebra> processing
    shouldProcessNode: function (node) {
      return (
        node.type === "tag" &&
        node.name === "oembed" &&
        node.attribs.url.includes("geogebra.org")
      );
    },
    processNode: function (node, children) {
      const style = getGeogebraStyle(node.attribs.url);
      return (
        <iframe
          title={node.attribs.url}
          src={node.attribs.url}
          height={style.height}
          width={style.width}
        ></iframe>
      );
    },
  },
  {
    // Custom <Youtube> processing
    shouldProcessNode: function (node) {
      return (
        node.type === "tag" &&
        node.name === "oembed" &&
        node.attribs.url.includes("yout")
      );
    },
    processNode: function (node, children) {
      return (
        <YouTube videoId={node.attribs.url.split("v=").pop()} opts={opts} />
      );
    },
  },
  {
    // Custom <Falstad> processing
    shouldProcessNode: function (node) {
      return (
        node.type === "tag" &&
        node.name === "oembed" &&
        node.attribs.url.includes("falstad")
      );
    },
    processNode: function (node, children) {
      return (
        <iframe
          title={node.attribs.url}
          src={node.attribs.url}
          style={{ width: "100%", minHeight: "400px" }}
        />
      );
    },
  },
  {
    // Custom <SlideShow> processing
    replaceChildren: true,
    shouldProcessNode: function (node) {
      return (
        node.type === "tag" &&
        node.name === "div" &&
        node.attribs.class === "reveal"
      );
    },
    processNode: function (node, children) {
      return <SlideShow steps={children} />;
    },
  },
  // {
  //   // Custom <Math> processing
  //   shouldProcessNode: function (node) {
  //     return (
  //       node.name === "math" &&
  //       node.attribs.xmlns === "http://www.w3.org/1998/Math/MathML"
  //     );
  //   },
  //   processNode: function (node, children) {
  //     console.log(String.raw`${children}`);
  //     // return React.createElement(MathComponent, { mathml: children });
  //     return children;
  //   },
  // },
  {
    // Anything else
    shouldProcessNode: function (node) {
      return true;
    },
    processNode: processNodeDefinitions.processDefaultNode,
  },
];
var htmlToReactParser = new HtmlToReactParser();

export { htmlToReactParser, isValidNode, processingInstructions };
