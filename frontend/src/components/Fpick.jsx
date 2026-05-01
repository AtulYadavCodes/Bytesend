import React, { useRef, useState } from "react";
import axios from "axios";

const API_BASE = "/api";

function Fpick() {
  const inputref = useRef(null);
  const imgref = useRef(null);

  const [lablete, setlabelte] = useState("Select files to share");
  const [loading, setloading] = useState("QR Code");
  const [scantodownload, setscantodownload] = useState("");

  const filetoserve = async (file) => {
    if (
      file.size < 99 * 1024 * 1024 &&
      !(file.name.endsWith(".sh") || file.name.endsWith(".bat"))
    ) {
      setscantodownload("");
      setloading("loading...");

      const formdata = new FormData();
      formdata.append("file", file);

      try {
        const res = await axios.post(`${API_BASE}/fapi`, formdata);

        const filep = res.data.url;
        const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${filep}`;

        imgref.current.src = qr;
        setloading("ready");
        setscantodownload("scan to download your file");
      } catch (err) {
        setloading("QR Code");
        setscantodownload(err?.response?.data || "upload failed");
      }
    } else {
      setscantodownload("file > 99MB / unsupported");
    }
  };

  const filein = () => {
    const file = inputref.current?.files?.[0];
    if (file) {
      setlabelte(file.name);
      filetoserve(file);
    } else {
      setlabelte("no file selected");
    }
  };

  return (
    <div className="
      bg-[var(--term-bg)] border border-[var(--term-border)]
      w-[90vw] lg:w-[40vw]
      min-h-[80svh] md:min-h-[80dvh] max-h-[85dvh]
      rounded-md flex flex-col p-4 font-mono text-[var(--term-text)]
    ">

      {/* Upload */}
      <div className="flex flex-col items-center justify-center flex-1 min-h-0">

        <div className="text-sm mb-2 truncate">
          $ {lablete}
        </div>

        <div
          onClick={() => inputref.current.click()}
          className="
            w-32 h-32 sm:w-40 sm:h-40
            border border-dashed border-[var(--term-green-dim)]
            flex items-center justify-center
            cursor-pointer hover:bg-[var(--term-panel)]
            transition
          "
        >
          <span className="text-xs text-[var(--term-green)] text-center px-2">
            click_to_upload()
          </span>
        </div>

        <input type="file" ref={inputref} onChange={filein} hidden />

        <div className="text-xs text-zinc-500 mt-2 text-center">
          ! .sh / .bat blocked
        </div>

      </div>

      {/* Status */}
      <div className="text-center text-red-400 text-sm flex-shrink-0">
        {scantodownload}
      </div>

      {/* QR */}
      <div className="
        relative flex items-center justify-center
        bg-black border border-[var(--term-border)]
        flex-[0.8] min-h-[120px]
        mt-2 overflow-hidden
      ">

        <div className="absolute text-sm text-[var(--term-green-dim)]">
          {loading}
        </div>

        <img
          ref={imgref}
          className="absolute max-h-full max-w-full object-contain"
        />

      </div>

      {/* Footer */}
      <div className="text-center text-xs text-zinc-500 mt-2 flex-shrink-0">
        expires_in: 3h
      </div>

    </div>
  );
}

export default Fpick;