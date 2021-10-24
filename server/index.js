const express = require('express');
const cors = require('cors');
const fs = require('fs');

const data = `./data/world.json`;

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.send('Hello Linux Day');
});

app.get('/world', (req, res) => {
    const world = JSON.parse(fs.readFileSync(data));
    res.send(world);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
