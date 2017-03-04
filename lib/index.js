const AWS = require('aws-sdk')
const Promise = require('bluebird')
AWS.config.setPromisesDependency(Promise) // use promises

const JSZip = require('jszip')

const fs = require('fs')

class zipToCloud {
  /**
   * Constructs a new zipToCloud instance
   *
   * @param {object} options
   */
  constructor (options) {
    this.options = options || {}
    this.s3 = options.s3Client || new AWS.S3(options.s3Options)
    this.bucket = options.bucket || false
    this.zip = new JSZip()

    if (!this.bucket) {
      throw new Error('Bucket not specified')
    }
  }

  /**
   * Adds a file to the zip
   *
   * @param {object} file
   * @returns {Promise}
   */
  addFile (file) {
    if (!file.hasOwnProperty('s3')) {
      throw new Error('Does not contain property s3')
    }
    if (!file.hasOwnProperty('zip')) {
      throw new Error('Does not contain property zip')
    }

    // get the object and return promise
    return this.s3.getObject({
      Bucket: this.bucket,
      Key: file.s3
    })
      .promise()
      .then((data) => {
        return this.zip.file(
          file.zip,
          data.Body
        )
      })
  }

  /**
   * Adds multiple files to the zip
   *
   * @param {array} files
   * @returns {Promise}
   */
  addFiles (files) {
    return Promise
      .all(files.map((file) => this.addFile(file)))
      .then((err) => {
        return !err
      })
  }

  /**
   * Finalizes the zip and uploads to s3
   *
   * @param {string} to
   * @returns {Promise}
   */
  zipAndUpload (to) {
    return this.zip.generateAsync({ type: 'nodebuffer' })
      .then((buffer) => {
        return this.s3.putObject({
          Bucket: this.bucket,
          Key: to,
          Body: buffer
        })
          .promise()
          .then((data) => {
            if (!data) {
              throw new Error('Something went wrong')
            } else {
              return true
            }
          })
      })
  }
}

module.exports = zipToCloud
