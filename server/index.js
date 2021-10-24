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
app.get('/world/:nation', (req, res) => {
    nation = req.params.nation
    const place = JSON.parse(fs.readFileSync(`./data/children/${nation}/${nation}.json`));
    res.send(place);
})
app.get('/world/:nation/:region', (req, res) => {
    nation = req.params.nation
    region = req.params.region
    const place = JSON.parse(fs.readFileSync(`./data/children/${nation}/children/${region}/${region}.json`));
    res.send(place);
})
app.get('/world/:nation/:region/:city', (req, res) => {
    nation = req.params.nation
    region = req.params.region
    city = req.params.city
    const place = JSON.parse(fs.readFileSync(`./data/children/${nation}/children/${region}/children/${city}/${city}.json`));
    res.send(place)
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
