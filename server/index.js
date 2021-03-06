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

app.use('/images/:nation?/:region?/:city?/:asset', (req, res, next) => {
    req.url = req.params.asset;
    if(req.params.nation){
        express.static(__dirname + `/data/children/${req.params.nation}/images/`)(req, res, next);
    }else if(req.params.region){
        express.static(__dirname + `/data/children/${req.params.nation}/children/${req.params.region}/images/`)(req, res, next);
    }else if(req.params.city){
        express.static(__dirname + `/data/children/${req.params.nation}/children/${req.params.region}/children/${req.params.city}/images/`)(req, res, next);
    }else{
        express.static(__dirname + `/data/images/`)(req, res, next);
    }
  })

app.get('/world/:nation', (req, res) => {
    try {
        nation = req.params.nation
        const path = `./data/children/${nation}/`
        const place = JSON.parse(fs.readFileSync(path+nation+'.json'));
        res.send(place);
    }catch(e){
        res.send(e)
    }
})
app.get('/world/:nation/:region', (req, res) => {
    try {
        nation = req.params.nation
        region = req.params.region
        const place = JSON.parse(fs.readFileSync(`./data/children/${nation}/children/${region}/${region}.json`));
        res.send(place);
    }catch(e){
        res.send(e)
    }
})
app.get('/world/:nation/:region/:city', (req, res) => {
    try{
        nation = req.params.nation
        region = req.params.region
        city = req.params.city
        const place = JSON.parse(fs.readFileSync(`./data/children/${nation}/children/${region}/children/${city}/${city}.json`));
        res.send(place)
    }catch(e){
        res.send(e)
    }
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))