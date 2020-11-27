interface IStyle {
  height: string;
  width: string;
}

export function getGeogebraStyle(url: string):IStyle{
    // extract url out of iframe url
    const segments = url.split('/');
    let style = {width: '100%', height: '500px'}
    segments.forEach((item, index, array) => {
      if (item === 'width') {
        const width = array[index+1];
        style = {...style, width: width}
      }
      if (item === 'height') {
        const height = array[index+1];
        style = {...style, height: height}
      }
    })
    return style;
}