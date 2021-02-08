import React from "react";
import YouTube from "react-youtube";
import SlideShow from "container/SlideShow";
import Hide from "container/Hide";
import MathJax from "react-mathjax2";
import HtmlToReact from "html-to-react";
import HtmlToReactParser from "html-to-react/lib/parser";

const opts = {
  minHeight: "144px",
  maxWidth: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
  },
};

const isValidNode = function () {
  return true;
};

// Order matters. Instructions are processed in the order they're defined
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const processingInstructions = [
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
      return <iframe title={node.attribs.url} src={node.attribs.url}></iframe>;
    },
  },
  {
    // Custom <Youtube> processing
    shouldProcessNode: function (node) {
      return (
        node.type === "tag" &&
        node.name === "figure" &&
        node.attribs.class === "youtube"
      );
    },
    processNode: function (node, children) {
      let url = "";
      let caption = <></>;
      children.forEach((child) => {
        console.log(child);
        if (child.type === "iframe") {
          url = child.props.src;
        }
        if (child.type === "figcaption") {
          caption = child;
        }
      });
      return (
        <figure style={{ margin: "auto" }}>
          <YouTube videoId={url.split("v=").pop()} opts={opts} />
          {caption}
        </figure>
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
  {
    // Custom <Hide> processing
    replaceChildren: true,
    shouldProcessNode: function (node) {
      return (
        node.type === "tag" &&
        node.name === "div" &&
        node.attribs.class === "Hide"
      );
    },
    processNode: function (node, children) {
      return <Hide hidden={children} />;
    },
  },
  {
    // Custom <Hide> processing
    replaceChildren: true,
    shouldProcessNode: function (node) {
      return node.type === "tag" && node.name === "latex";
    },
    processNode: function (node, children) {
      return (
        <MathJax.Context input="ascii">
          <div>
            <MathJax.Node>{children}</MathJax.Node>
          </div>
        </MathJax.Context>
      );
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
const htmlToReactParser = new HtmlToReactParser();

export { htmlToReactParser, isValidNode, processingInstructions };
