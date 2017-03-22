# zip-to-cloud

This is a library that will zip files from the cloud back to the cloud.

```javascript
const ZipToCloud = require('zip-to-cloud')
const AWS = require('aws-sdk')

const ztc = new ZipToCloud({
  s3: new AWS.S3(),
  bucket: 'mybucket'
});

/**
* Note, each object must be in the format
*  { 
*    s3:  'path/to/file/on/s3', 
*    zip: 'where/to/put/file/on/zip' 
*  }
*  If you want a custom file to be added,
*  {
*    file: 'This can be a String, ArrayBuffer, Uint8Array, Buffer, Blob, Promise or stream',
*    zip: 'where/to/put/file/on/zip'
*  }
*/

ztc.addFiles([
  {
    s3:  'myfile.png',
    zip: 'path/to/myfile.png'
  },
  {
    s3:  'myotherfile.png',
    zip: 'different/path/to/myotherfile.png'
  },
  {
    file: 'My final file',
    zip: 'path/to/my/best/file.txt'
  }
])
  .then(() => {
    return ztc.zipAndUpload('path/to/s3/file.zip')
  })
```

## Installation

`npm install zip-to-cloud`

## API
```javascript
ztc.addFile(file)
```
```javascript
ztc.addFiles(files)
```
```javascript
ztc.zipAndUpload(to)
```