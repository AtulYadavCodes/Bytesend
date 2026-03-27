import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
export const healthCheck = (req, res) => {
  res.send('hi');
};

export const getTextContent = (req, res) => {
  const pathToFile = path.join(process.cwd(), 'upload', req.query.path + '.txt');
  if (!fs.existsSync(pathToFile)) {
    return res.status(404).send('File not found');
  }
  res.sendFile(pathToFile);
};

export const uploadText = (req, res) => {
  let form = new FormData();
  const textContent = req.body;
  const filename = `${Date.now()}.txt`;
  const pathToFile = path.join(process.cwd(), 'upload', filename);
  fs.promises.writeFile(pathToFile, textContent)
    .then( res.send(filename.slice(0, -4)))
    .catch((error) => {
      res.status(error.response?.status || 500).send('Error uploading the file,' + error.message);
    });
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No file uploaded');
    }
    const uploadfile=req.files?.file;
    const uploadfilen=`${Date.now()}name${uploadfile.name}`;
    const uploadpath=path.join(process.cwd(),'uploads',uploadfilen);
    uploadfile.mv(uploadpath,(err)=>
    {
      if(err)      {
        return res.status(500).send('Error saving the file');
      }
      res.json({url:`https://bytesend.live/api/download?path=${(uploadfilen)}`});
    });
    
  } catch (error) {
    res.status(415).send('Error uploading the file, unsupported media type');
  }
};

export const downloadFile = async (req, res) => {
  try {
    const fileUrl = req.query.path;
    if (!fileUrl) {
      return res.status(400).send('Miss path query parameter');
    }

    const uploadpath=path.join(process.cwd(),'uploads',fileUrl);
    if(!fs.existsSync(uploadpath))
    {
      return res.status(404).send('File not found');
    }

    return res.download(uploadpath, fileUrl);
  } catch (error) {
    res.status(500).send('Error downloading the file');
  }
};
