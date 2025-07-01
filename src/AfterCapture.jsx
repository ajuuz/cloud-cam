import React from 'react'

const AfterCapture = ({photoURL,setPhotoURL}) => {
  return (
    <div className={`${photoURL?'block':'hidden'} h-full w-full relative overflow-hidden flex flex-col justify-center items-center`}>
      <img src={photoURL} alt="captured photo" className='absolute left-0 top-0 h-full w-full object-cover' />
      <div className='flex justify-around absolute bottom-10 gap-5'>
        <button onClick={()=>setPhotoURL(null)} className='p-5 rounded-4xl bg-white text-black'>Retake</button>
        <button  className='p-5 rounded-4xl bg-white text-black'>Save</button>
        <button  className='p-5 rounded-4xl bg-white text-black'>Upload</button>
      </div>
    </div>
  )
}

export default AfterCapture
