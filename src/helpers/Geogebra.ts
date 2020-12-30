interface IStyle {
  height: string;
  width: string;
}

export function getGeogebraStyle(url: string): IStyle {
  // extract url out of iframe url
  const segments = url.split("/");
  let style = { width: "100%", height: "100%" };
  let width;
  segments.forEach((item, index, array) => {
    // if (item === "width") {
    //   const width = parseInt(array[index + 1]);
    //   style = {
    //     ...style,
    //     width: `${width - 20}`,
    //   };
    // }
    if (item === "height") {
      const height = parseInt(array[index + 1]);
      style = {
        ...style,
        height: `${height}`,
      };
    }
  });
  return style;
}
