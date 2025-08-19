import express, { application, response } from 'express'
import fileupload from 'express-fileupload'
import axios from 'axios'
import fs from 'fs'
import cors from 'cors'
import FormData from 'form-data'

const app=express();
const port =process.env.PORT||3000;
app.use(express.text());
app.use(cors({origin:'*'}));
app.use(fileupload());
// async function fapi(form) {

//     // try {
//     //     let res= await axios({
//     //         method:'post',
//     //         url:'https://upload.gofile.io/uploadfile',
//     //         data:form,
//     //         headers:
//     //             form.getHeaders()
            
//     //     })
//     //         return res;
//     // } catch (error) {
//     //     console.log(error);
//     // }
// }

app.get('/gtext',(req,res)=>{
//  console.log(req.query.url);
    axios.get(req.query.url)
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    if(error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    console.error('Error fetching text:', error);
    res.status(404).send('Error fetching text..mistake in code');
    }
    else if(error.request) {
      // The request was made but no response was received
      //console.error('No response received:', error.request);
      res.status(502).send('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      res.status(400).send('Error in request setup');
    }
  });
})
app.post('/ftex',(req,res)=>{
//   console.log(req.body);
// fs.writeFileSync('file.txt',req.body)
  //let f='file.txt'
//  let data=fs.createReadStream('file.txt')
//  console.log(data.length);
  let form=new FormData();
  form.append('files[]',req.body,'file.txt');
// //  console.log(form.getlength)

//   console.log(form.getHeaders());
  try {
    axios({
    method:'post',
        url:'https://uguu.se/upload',
        data:form,
        headers:
            form.getHeaders()
  })
  .then(response=>res.send(response.data))
  } catch (error) {
     res.status(error.status).send('Error uploading the file,'+error.message);
  }
})


app.get('/download', async (req, res) => {
  try {
    const fileUrl = req.query.url;
    if (!fileUrl) {
      return res.status(400).send('Miss url query parameter');
    }

    // Fetch the file stream from the URL
    const response = await axios.get(fileUrl, {
      responseType: 'stream',
    });

    // Extract filename from URL or fallback
    let filename = fileUrl.split('/').pop().split('?')[0] || 'file';

    // Set headers to force download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');

    // Pipe the file stream to the client
    response.data.pipe(res);
  } catch (error) {
    console.error('Download error:', error.message);
    res.status(500).send('Error downloading the file');
  }
});

app.post('/fapi',async (req,res)=>{
//     let form=new FormData();
//     form.append('file',req.files.file.data,req.files.file.name)
//    let response= await fapi(form);
//    res.json(response.data);
//    console.log(response.data);
try 
  {let form=new FormData();
form.append('files[]',req.files.file.data,req.files.file.name);
console.log(req.files.file.name);
      let response=await axios({
        method:'post',
        url:'https://uguu.se/upload',
        data:form,
        headers:
            form.getHeaders()
      })
      if(response.ok){
        res.send (response.data);
      }
    } catch (error) {
      res.status(415).send('Error uploading the file, unsupported media type');
}
})
app.get('/',(req,res)=>{
    res.send("hi");
})
app.listen(port,()=>{
     console.log("live");
})