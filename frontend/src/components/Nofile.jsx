import React, { useRef, useState } from 'react'
import axios from 'axios';
function Nofile() {
  let [get,setget]=useState("hidden");
  let [send,setsend]=useState("visible");
  let inputref=useRef(null);
  let inputsen=useRef(null);
  let getbut=useRef(null);
  let getinput=useRef(null);

  let [v,setv]=useState("");



  let formsubmit=(event)=>
  {
    event.preventDefault();
   // inputref.current.value="sdafkjbaljkfafanafaf\naf\naf\na\nfa\nfa\nf";
    axios.post('https://bytesend.onrender.com/ftex',inputref.current.value,{headers:{'Content-Type':'text/plain'}}).then((Response)=>{setv(Response.data.files[0].url.charAt(8));inputsen.current.value=Response.data.files[0].url.charAt(8)+Response.data.files[0].url.substring(18).split(".")[0]})
  }
  let gtext=(event)=>{
    axios.get(`https://bytesend.onrender.com/gtext?url=https://${getinput.current.value.charAt(0)}.uguu.se/${getinput.current.value.substring(1)}.txt`).then((res)=>{inputref.current.value=res.data;})
  }

  
  return (
    <div className='bg-gray-100 h-[80vh] w-[90vw] lg:w-[40vw] drop-shadow-2xl rounded-2xl flex flex-col p-10'>
        <div>
          <form onSubmit={formsubmit}>
            <textarea ref={inputref} placeholder='Enter text here' className=' border-1 text-2xl text-left  h-[50vh] w-full bg-gray-20 text-nowrap resize-none'/>
            <div className='h-[20vh] w-full rounded-2xl flex flex-row'>
              <div className='h-[20vh] w-[45vw] lg:w-[20vw] flex flex-col items-start '>
                <div className= {`h-[20vh] w-[20vw] flex flex-col items-start ${get}`}>
                <input ref={getinput} type='text' placeholder='enter code' className='h-[30%] w-[80%] bg-gray-100 border-1 my-1'/>
                <button  onClick={gtext} type='button' ref={getbut} className='h-[30%] w-[80%] bg-blue-300 '>Get</button>
              </div>
              <label onClick={()=>(setget("visible"),setsend("hidden"))} className={`${send}`}>or get data</label>
              </div>
             <div className='flex flex-col items-end h-[20vh] w-[45vw] lg:w-[20vw]'>
               <div className={` h-[20vh] w-[45vw] lg:w-[20vw] flex flex-col items-end ${send}`} >
                <input ref={inputsen} type="text" disabled className='h-[30%] w-[80%] bg-gray-100 border-1 my-1'/>
                <button type="submit" className='h-[30%] w-[80%] bg-gray-400'>send</button>
              </div>
              <label onClick={()=>(setsend("visible"),setget("hidden"))} className={`${get}`}>or send data</label>
             </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Nofile