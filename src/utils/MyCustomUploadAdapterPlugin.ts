import webServiceProvider from 'helpers/webServiceProvider';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';


interface MyUploadAdapter {
  loader: any 
}

class MyUploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {

                const toBase64 = file => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
                
                return toBase64(file).then(cFile=>{
                    return  webServiceProvider.post("images/upload", {
                        imageBinary: cFile
                    }).then((d) => {
                      console.log(d.response.url);
                        if (d.status) {
                            this.loader.uploaded = true;
                            resolve( {
                                default: d.response.url
                            } );
                        } else {
                            reject(`Couldn't upload file: ${ file.name }.`)
                        }
                    });
                })
                
            } ) );
    }

   
}

export default function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter( loader );
    };
}