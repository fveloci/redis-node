const express = require('express');
const axios = require('axios')
const responseTime = require('response-time')
const redis = require('redis')

const app = express();

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
})

app.use(responseTime())

app.get('/character', async (req, res, next) => {
    try {
        const reply = await client.get('characters')
        
        if(reply) {
            console.log('using cached data');
            return res.send(JSON.parse(reply));
        };

        const response = await axios.get(
            'https://rickandmortyapi.com/api/character'
        );

        const saveResult = await client.set(
            "characters",
            JSON.stringify(response.data),
            {
                EX: 10
            }
        )
        console.log('Save Result: ', saveResult)
        res.send(response.data);
    } catch (error) {
        res.send(error.message);
    }
})

app.get("/character/:id", async (req, res, next) => {
    try {
      const reply = await client.get(req.params.id);
  
      if (reply) {
        console.log("using cached data");
        return res.send(JSON.parse(reply));
      }
  
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character/" + req.params.id
      );
      const saveResult = await client.set(
        req.params.id,
        JSON.stringify(response.data),
        {
          EX: 15,
        }
      );
  
      console.log("saved data:", saveResult);
  
      res.send(response.data);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  });

async function main() {
    await client.connect();
    app.listen(3000);
    console.log('Server listen on port 3000');
}

main();