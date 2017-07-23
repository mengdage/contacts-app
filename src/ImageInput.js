import React, { Component } from 'react';

function readImageAsDataUrl(img) {
  const promise = new Promise((resolve) => {
  const fr = new FileReader();

  fr.onload = ()=>resolve(fr.result)
  fr.readAsDataURL(img);
  });
  return promise;
}

function resizeImageDataUrl(dataUrl, canvas, maxWidth) {
  const promise = new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      // clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // the width of the canvas must be <= maxWidth
      if(img.width > maxWidth) {
        img.height *= maxWidth/img.width;
        img.width = maxWidth;
      }
      // change the canvas size to fit the image
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);
      resolve(canvas.toDataURL('image/jpeg'));
    }
    img.src = dataUrl;
  });

  return promise;
}

class ImageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleFileChange(e) {
    const files = e.target.files;
    const len = files.length;
    if(len === 0) {
      // no file selected
      console.log('no file selected');
      return;
    }
    const file = files[0];
    const matcher = /^image\//;
    if(matcher.test(file.type)) {
      // the selected file is an image


      readImageAsDataUrl(file)
        .then(dataUrl => resizeImageDataUrl(dataUrl, this.canvas, this.props.maxWidth))
        .then(resizedDataUrl => this.setState({
          value: resizedDataUrl
        }));
    }
  }


  componentDidMount() {
    this.canvas = document.createElement('canvas');
  }

  render() {
    const { className, name} = this.props;
    const value = this.state.value;

    const style = {
      position: 'relative'
    };

    if(value) {
      style.backgroundImage = `url("${value}")`;
      style.backgroundRepeat = 'no-repeat';
      style.backgroundPosition = 'center';
      style.backgroundSize = 'cover';
    }

    return (
      <div className={className} style={style}>
        <input type="hidden" name={name} value={value} />
        <input type="file"
          onChange={(e)=>this.handleFileChange(e)}
          style={
            {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0
            }
          }
        />

      </div>
    );
  }
}

export default ImageInput;
