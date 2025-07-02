const BeforeCapture = ({photoURL,videoRef,handleCapture}) => {
  return (
    <div className={`${photoURL?'hidden':'block'} h-full w-full flex flex-col justify-center items-center relative overflow-hidden`}>
      <video autoPlay playsInline  className='absolute top-0 left-0 w-full h-full object-cover' ref={videoRef}/>

      <div className='absolute bottom-10 z-10' onClick={handleCapture}>
        <div className='p-8 bg-white rounded-4xl relative flex items-center justify-center'>
            <div className='rounded-4xl absolute border-3 p-6'></div>
        </div>
      </div>

      <div className='p-9 rounded-md bg-white absolute bottom-10 right-5'>
      </div>
    </div>
  )
}

export default BeforeCapture
