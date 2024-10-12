import React, { Component } from "react";

export default class ColorImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], // Store the list of selected files
    };
  }

  handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const fileArray = Array.from(selectedFiles);
    this.setState((prevState) => ({
      files: [...prevState.files, ...fileArray], // Append new files to the existing list
    }));
    console.log(this.props.color);
    this.props.handleMultipleColorImages(fileArray, this.props.color);
  };

  uploadFiles = () => {
    // You can access this.state.files to work with all selected files
    console.log(this.state.files);
  };

  render() {
    const { files } = this.state;

    return (
      <form>
        <div className="form-group multi-preview" style={{ display: "flex" }}>
          {files.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                marginRight: "5px",
              }}
            />
          ))}
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={this.handleFileChange}
            multiple
          />
        </div>
        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      </form>
    );
  }
}
