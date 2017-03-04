# zip-to-cloud

This is a library that will zip files from the cloud back to the cloud.

```javascript
const zipToCloud = require('zip-to-cloud')
const AWS = require('aws-sdk')

const ztc = new zipToCloud({
  s3: new AWS.S3(),
  bucket: 'mybucket'
});

/**
* Note, files must be in the format
*  { 
*    s3:  'path/to/file/on/s3', 
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
  }
])
  .then(() => {
    return ztc.zipAndUpload('path/to/s3/file.zip')
  })
```

## Installation

`npm install zip-to-cloud`