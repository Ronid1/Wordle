
const PORT = 8000
const axios = require("axios").default;
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const app = express()
app.use(cors())


app.get('/word', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '2', wordLength: req.query.length},
        headers: {
          'X-RapidAPI-Key': process.env.RAPIT_API_KEY,
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      };
      
      axios.request(options).then((response) => {
          console.log(response.data);
          res.json(response.data[0])
      }).catch((error) => {
          console.error(error);
      });
})

// app.get('/check', async (req, res) => {
//     const options = {
//     method: 'GET',
//     url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
//     params: {entry: req.query.word},
//     headers: {
//         'X-RapidAPI-Key': process.env.RAPIT_API_KEY,
//         'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
//     }
//     };

//     axios.request(options).then((response) => {
//         console.log(response.data);
//         res.json(response.data.result_msg)
//     }).catch((error) => {
//         console.error(error);
//     });
// })

app.listen(PORT, () => console.log('server running on port ', PORT))