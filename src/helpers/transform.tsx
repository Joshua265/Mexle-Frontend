import React from "react";
import YouTube from "react-youtube";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

function transform(node) {
  // change render of youtube videos
  if (node.type === "tag" && node.name === "oembed") {
    return (
      <YouTube
        videoId={node.attribs.url.replace(
          "https://www.youtube.com/watch?v=",
          ""
        )}
      />
    );
  }
  //change design of table
  if (node.type === "tag" && node.name === "table") {
    return (
      <Table size="small">
        <TableBody>
          {node.children[0].children.map((tr) => {
            return (
              <TableRow key={String(Math.random())}>
                {tr.children.map((td) => {
                  return (
                    <TableCell key={String(Math.random())}>
                      {td.children[0].data}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  return;
}

export default transform;
