import React, {useState, useRef } from 'react'
import axios from 'axios'
import image from '../assets/free-file-icon-1453-thumb.png'
import plaeho from '../assets/gold-border-coton-tulear-breeder-puppies-for-sale-texas-1.png'
let qr,link;
function Fpick() {
  const inputref=useRef(null);
  let [loading,setloading]=useState("QR Code");
  let [lablete,setlabelte]=useState("Select files to share");
  let [scantodownload,setscantodownload]=useState('');
  let imgref=useRef(null);

  function filetoserve(file)
  {
    if(file.size<99*1024*1024 && !(file.name.endsWith(".pdf")|| file.name.endsWith(".js")|| file.name.endsWith(".exe")|| file.name.endsWith(".sh")|| file.name.endsWith(".bat")|| file.name.endsWith(".ps1")|| file.name.endsWith(".py")|| file.name.endsWith(".php")|| file.name.endsWith(".pl")|| file.name.endsWith(".rb")))
    {
      setscantodownload('');
      setloading("loading....");
    imgref.current.style.opacity=0;
    const formdata=new FormData();
    formdata.append('file',file);
    axios({
      method:'post',
      url:'https://bytesend.onrender.com/fapi',
      data:formdata,
      
    }).then(async (response)=>
      {
        imgref.current.style.opacity=1;
        let filep=`${response.data.files[0].url}`;
        let proxdownlo=`https://bytesend.onrender.com/download?url=${encodeURIComponent(filep)}`
        qr=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${proxdownlo}`;
        imgref.current.src=qr
        setscantodownload('scan to download your file');
      }).catch((err)=>
      {
        setloading("QR Code");
        setscantodownload(err.response.data);
      })
   
    }
    else
      setscantodownload("file > 99 mb/ not supported.....select another")
    
  }

  function filein()
  {
    if(inputref.current&&inputref.current.files&&inputref.current.files[0])
    {
    setlabelte(inputref.current.files[0].name);
    
    filetoserve(inputref.current.files[0]);
    }
    else
    {
      setlabelte("no file selected, choose again");
    }
  }

  return (
    <div className='bg-gray-50  h-[629px] w-[90vw] lg:w-[40vw] drop-shadow-2xl rounded-2xl flex flex-col p-10'>
        <div id="form" className=' mb-1 h-[300px] rounded-2xl bg-gray-50 '>
          <form>
           <label className='block  text-gray-500 text-2xl  my-3 h-10 text-center font-bold text-nowrap overflow-hidden'>{lablete}</label>
           <label  className='text-center block my-1'>(script or pdf not allowed)</label>
           <div className='flex flex-row justify-center items-center'>
            <input type="file" id="input" onChange={filein} ref={inputref} hidden/>
           <label onClick={()=>(inputref.current.click())} className=' relative block h-40 w-40 bg-gray-100 text-center py-10  border-dashed border-1  rounded-2xl border-gray-500'>click to choose a file
            <br/>

            <img src={image} className='absolute h-10 w-10 left-1/2 -translate-x-1/2 p-1 mt-2' alt="" />
            </label>
           </div>
           
          </form>
        </div>
        <label className='w-full text-center p-0 m-0 text-red-700'>{scantodownload}</label>
        <div id="qrshow" className=' relative h-[300px] mt-1 flex flex-row  justify-center  rounded-2xl items-center bg-gray-200'>
          <label className='absolute mt-1 text-2xl'>{loading}</label>
          <div className='h-40 w-40 bg-white'>

          </div>
            <img  ref={imgref} alt=""  className='absolute '/>
        </div>

    </div>
  )
}

export default Fpick
