import axios from 'axios';
import FormData from 'form-data';

export const healthCheck = (req, res) => {
  res.send('hi');
};

export const getTextContent = (req, res) => {
  axios
    .get(req.query.url)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      if (error.response) {
        res.status(404).send('Error fetching text..mistake in code');
      } else if (error.request) {
        res.status(502).send('No response received from the server');
      } else {
        res.status(400).send('Error in request setup');
      }
    });
};

export const uploadText = (req, res) => {
  let form = new FormData();
  form.append('files[]', req.body, 'file.txt');
  axios({
    method: 'post',
    url: 'https://uguu.se/upload',
    data: form,
    headers: form.getHeaders(),
  })
    .then((response) => res.send(response.data))
    .catch((error) => {
      res.status(error.response?.status || 500).send('Error uploading the file,' + error.message);
    });
};

export const uploadFile = async (req, res) => {
  try {
    let form = new FormData();
    form.append('files[]', req.files.file.data, req.files.file.name);
    let response = await axios({
      method: 'post',
      url: 'https://uguu.se/upload',
      data: form,
      headers: form.getHeaders(),
    });
    res.send(response.data);
  } catch (error) {
    res.status(415).send('Error uploading the file, unsupported media type');
  }
};

export const downloadFile = async (req, res) => {
  try {
    const fileUrl = req.query.url;
    if (!fileUrl) {
      return res.status(400).send('Miss url query parameter');
    }

    const response = await axios.get(fileUrl, {
      responseType: 'stream',
    });

    let filename = fileUrl.split('/').pop().split('?')[0] || 'file';

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');

    response.data.pipe(res);
  } catch (error) {
    res.status(500).send('Error downloading the file');
  }
};
