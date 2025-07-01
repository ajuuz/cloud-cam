import React, { useEffect, useRef, useState } from 'react';

const ImageCaptureComponent = () => {
  const videoRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(null);
  const imageCaptureRef = useRef(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // back camera if available
        });

        const videoTrack = stream.getVideoTracks()[0];
        videoRef.current.srcObject = stream;
        imageCaptureRef.current = new window.ImageCapture(videoTrack);

        // Log capabilities if needed
        const photoCapabilities = await imageCaptureRef.current.getPhotoCapabilities();
        console.log('Photo Capabilities:', photoCapabilities);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initCamera();
  }, []);

  const handleCapture = async () => {
    try {
      const blob = await imageCaptureRef.current.takePhoto();
      const imageURL = URL.createObjectURL(blob);
      setPhotoURL(imageURL);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  return (
    <div>
      <h2>Camera Preview</h2>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }} />
      <br />
      <button onClick={handleCapture}>Take High-Res Photo</button>

      {photoURL && (
        <>
          <h2>Captured Photo</h2>
          <img src={photoURL} alt="Captured" style={{ width: '100%', maxWidth: '600px' }} />
        </>
      )}
    </div>
  );
};

export default ImageCaptureComponent;
