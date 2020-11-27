import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import GeogebraIcon from './Geogebra.svg';


class Geogebra extends Plugin {
  init() {
    const editor = this.editor;

    // initialize button
    editor.ui.componentFactory.add('insertGeogebra', (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: 'Insert Geogebra',
        icon: GeogebraIcon,
        tooltip: true
      });

      // Callback executed once the image is clicked.
      view.on('execute', () => {
        const geogebraUrl = prompt('Geogebra file URL');

        editor.model.change( writer => {
                    const geogebraElement = writer.createElement('iframe', {
                      title: geogebraUrl,
                      src: geogebraUrl
                    });

                    // Insert the image in the current selection location.
                    editor.model.insertContent( geogebraElement, editor.model.document.selection );
      });

      return view;
    });
  })
}

}

export default Geogebra;