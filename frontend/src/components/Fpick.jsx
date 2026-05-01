import React, { useRef, useState } from "react";
import axios from "axios";

const API_BASE = "/api";

function Fpick() {
  const inputref = useRef(null);
  const imgref = useRef(null);

  const [label, setLabel] = useState("Select file to share");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState("QR Code");
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file) => {
    if (
      file.size < 99 * 1024 * 1024 &&
      !(file.name.endsWith(".sh") || file.name.endsWith(".bat"))
    ) {
      setStatus("");
      setLoading("uploading...");
      setProgress(0);

      const formdata = new FormData();
      formdata.append("file", file);

      try {
        const res = await axios.post(`${API_BASE}/fapi`, formdata, {
          onUploadProgress: (e) => {
            setProgress(Math.round((e.loaded * 100) / e.total));
          },
        });

        const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${res.data.url}`;
        imgref.current.src = qr;

        setLoading("ready");
        setStatus("scan to download");
      } catch (err) {
        setLoading("QR Code");
        setStatus(err?.response?.data || "upload failed");
      }
    } else {
      setStatus("file too large / unsupported");
    }
  };

  const handleFile = (file) => {
    if (file) {
      setLabel(file.name);
      handleUpload(file);
    }
  };

  return (
    <div className="
      bg-[var(--term-bg)] border border-[var(--term-border)]
      w-[90vw] lg:w-[40vw]
      h-[85vh]
      rounded-md flex flex-col p-4 font-mono text-[var(--term-text)]
    ">

      {/* HEADER */}
      <div className="text-xs text-[var(--term-green-dim)] mb-3 truncate">
        $ {label}
      </div>

      {/* MAIN STAGE */}
      <div className="flex flex-col flex-1 gap-4">

        {/* UPLOAD ZONE */}
        <div
          onClick={() => inputref.current.click()}
          className="
            flex-1
            border border-dashed border-[var(--term-green-dim)]
            flex items-center justify-center
            cursor-pointer
            hover:bg-[var(--term-panel)]
            transition
          "
        >
          <span className="text-sm text-[var(--term-green)]">
            click_or_upload()
          </span>
        </div>

        <input
          type="file"
          ref={inputref}
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {/* QR ZONE */}
        <div className="
          flex-1
          relative
          flex items-center justify-center
          bg-black border border-[var(--term-border)]
        ">
          <div className="absolute text-xs text-[var(--term-green-dim)]">
            {loading}
          </div>

          <img
            ref={imgref}
            className="absolute opacity-90 transition-opacity duration-300"
          />
        </div>
      </div>

      {/* CONTROL PANEL */}
      <div className="mt-3 flex flex-col gap-2 text-sm">

        {/* Progress */}
        {progress > 0 && progress < 100 && (
          <div className="w-full">
            <div className="h-1 bg-[var(--term-border)]">
              <div
                className="h-1 bg-[var(--term-green)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-[var(--term-green-dim)] mt-1">
              uploading {progress}%
            </div>
          </div>
        )}

        {/* Status */}
        <div className="text-center text-[var(--term-green-dim)]">
          {status || "! .sh / .bat blocked"}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[var(--term-green-dim)]">
          expires_in: 3h
        </div>
      </div>
    </div>
  );
}

export default Fpick;