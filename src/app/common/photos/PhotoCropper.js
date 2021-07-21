import React, { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export default function PhotoCropper({ setImage, imagePreview }) {
  const cropperRef = useRef(null)
  const onCrop = () => {
    if (typeof cropperRef.current.getCroppedCanvas() === 'undefined') {
      return
    }
    // const imageElement = cropperRef?.current;
    // const cropper = imageElement?.cropper;
    // cropperRef?.current.cropper.getCroppedCanvas().toBlob(blob => {
    //     setImage(blob)
    // }, 'image/jpeg');
    // const imageElement = cropperRef?.current;
    // const cropper = imageElement?.cropper;
    cropperRef.current.getCroppedCanvas().toBlob((blob) => {
      setImage(blob)
    }, 'image/jpeg')
  }

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      scalable
      crop={onCrop}
      dragMode="move"
      cropBoxMovable
      cropBoxResizable
    />
  )
}
