import React, { useEffect, useRef, useState } from 'react'
import BeforeCapture from './BeforeCapture'
import AfterCapture from './AfterCapture'
const App = () => {
  const [photoURL,setPhotoURL]=useState(null)
  const [lastPhotos,setLastPhotos]=useState([])
  const videoRef = useRef()
  const imageCaptureRef = useRef()

  useEffect(()=>{
    if(!photoURL){
      startCamera()
    }else{
      stopCamera()
    }
  },[photoURL])

  
  const startCamera=()=>{
    navigator.mediaDevices.getUserMedia({video:'environment'})
    .then(gotMedia)
    .catch(error=>console.log("error occured during setting camera",error))
  }

  const gotMedia=(stream)=>{
      videoRef.current.srcObject = stream;
      const videoTrack = stream.getVideoTracks()[0]
      imageCaptureRef.current = new window.ImageCapture(videoTrack)
  }

  const stopCamera=()=>{
    const video = videoRef.current;
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
      video.srcObject = null; // optional: release the reference
    }
  }

  const handleCapture=async()=>{
    try{
      const blob =await imageCaptureRef.current.takePhoto();
      console.log(blob);
      const url = URL.createObjectURL(blob)
      setPhotoURL(url)
      stopCamera()
    }
    catch(error){
        console.error('Error taking photo:', error);
    }
  }

  return (
    <div  className='bg-white w-screen h-screen flex flex-col items-center justify-center'>
      <BeforeCapture  photoURL={photoURL} videoRef={videoRef} handleCapture={handleCapture}/>
      <AfterCapture photoURL={photoURL} setPhotoURL={setPhotoURL}/>
    </div>
  )
}

export default App
