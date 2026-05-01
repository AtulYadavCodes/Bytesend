import React, { useRef, useState } from 'react'
import axios from 'axios';

const API_BASE='/api';

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
    inputsen.current.value="loading....";
    axios.post(`${API_BASE}/ftex`,inputref.current.value,{headers:{'Content-Type':'text/plain'}})
    .then((Response)=>{
      setv(Response.data);
      inputsen.current.value=Response.data
    })
  }

  let gtext=(event)=>{
    inputref.current.value="loading....";
    if(getinput.current.value.length>0)
    {
      axios.get(`${API_BASE}/gtext?path=${getinput.current.value}`)
      .then((res)=>{inputref.current.value=res.data;})
      .catch((err)=>{inputref.current.value=err.response.data;})
    };
  }

  return (
   <div className="
   bg-[var(--term-bg)] border border-[var(--term-border)]
   w-[90vw] lg:w-[40vw]
   max-h-[85vh] overflow-auto
   rounded-md flex flex-col p-4 font-mono text-[var(--term-text)]">

  <form onSubmit={formsubmit} className="flex flex-col flex-1 min-h-0">

    <textarea
      ref={inputref}
      placeholder="$ enter text..."
      className="flex-1 min-h-[150px] bg-black border border-[var(--term-border)] p-3 text-sm resize-none focus:outline-none"
    />

    <div className="mt-3 flex gap-3 text-sm flex-shrink-0">

      <div className="w-full">
        <div className={`${get} space-y-2`}>
          <input
            ref={getinput}
            placeholder="> enter code"
            className="w-full bg-black border border-[var(--term-border)] px-2 py-1"
          />
          <button
            type="button"
            onClick={gtext}
            className="w-full border border-[var(--term-green)] text-[var(--term-green)] hover:bg-[var(--term-green)] hover:text-black transition py-1"
          >
            run get
          </button>
        </div>

        <div
          onClick={() => (setget("visible"), setsend("hidden"))}
          className={`${send} mt-2 text-xs text-[var(--term-green-dim)] cursor-pointer`}
        >
          $ switch to GET
        </div>
      </div>

      <div className="w-full text-right">
        <div className={`${send} space-y-2`}>
          <input
            ref={inputsen}
            disabled
            className="w-full bg-black border border-[var(--term-border)] px-2 py-1 text-right"
          />
          <button className="w-full border border-[var(--term-green)] text-[var(--term-green)] hover:bg-[var(--term-green)] hover:text-black transition py-1">
            send
          </button>
        </div>

        <div
          onClick={() => (setsend("visible"), setget("hidden"))}
          className={`${get} mt-2 text-xs text-[var(--term-green-dim)] cursor-pointer`}
        >
          $ switch to SEND
        </div>
      </div>

    </div>

  </form>
</div>
  )
}

export default Nofile