import React, {useState, useRef } from 'react'
import axios from 'axios'
import image from '../assets/free-file-icon-1453-thumb.png'
import plaeho from '../assets/gold-border-coton-tulear-breeder-puppies-for-sale-texas-1.png'

const API_BASE='/api';
let qr,link;

function Fpick() {
  const inputref=useRef(null);
  let [loading,setloading]=useState("QR Code");
  let [lablete,setlabelte]=useState("Select files to share");
  let [scantodownload,setscantodownload]=useState('');
  let imgref=useRef(null);

  function filetoserve(file)
  {
    if(file.size<99*1024*1024 && !(file.name.endsWith(".sh")|| file.name.endsWith(".bat")))
    {
      setscantodownload('');
      setloading("loading....");
      imgref.current.style.opacity=0;

      const formdata=new FormData();
      formdata.append('file',file);

      axios({
        method:'post',
        url:`${API_BASE}/fapi`,
        data:formdata,
      }).then(async (response)=>
      {
        imgref.current.style.opacity=1;
        let filep=`${response.data.url}`;
        qr=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${filep}`;
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
    <div className="bg-[var(--term-bg)] border border-[var(--term-border)]
    w-[90vw] lg:w-[40vw]
    max-h-[85vh] overflow-auto
    rounded-md flex flex-col p-4 font-mono text-[var(--term-text)]">

      {/* Upload */}
      <div className="flex flex-col items-center justify-start md:justify-center flex-1 min-h-0">

        <div className="text-sm mb-2">
          $ {lablete}
        </div>

        <div
          onClick={() => inputref.current.click()}
          className="w-40 h-40 border border-dashed border-[var(--term-green-dim)] flex items-center justify-center cursor-pointer hover:bg-[var(--term-panel)] transition"
        >
          <span className="text-xs text-[var(--term-green)]">
            click_to_upload()
          </span>
        </div>

        <input type="file" ref={inputref} onChange={filein} hidden />

        <div className="text-xs text-zinc-500 mt-2">
          ! .sh / .bat blocked
        </div>

      </div>

      {/* Status */}
      <div className="text-center text-red-400 text-sm">
        {scantodownload}
      </div>

      {/* QR */}
      <div className="relative flex items-center justify-center bg-black border border-[var(--term-border)] h-40 md:h-48 mt-2 flex-shrink-0">

        <div className="absolute text-sm text-[var(--term-green-dim)]">
          {loading}
        </div>

        <img ref={imgref} className="absolute" />

      </div>

      <div className="text-center text-xs text-zinc-500 mt-2">
        expires_in: 3h
      </div>

    </div>
  )
}

export default Fpick