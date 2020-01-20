const siteUrl = "https://internshala.com/internships/";
const axios = require("axios");
const express = require("express");
const cheerio = require('cheerio');
const bodyParser =  require('body-parser');
const cors = require('cors');

let app = express()
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    axios.get(siteUrl+req.query.url+'-internship')
    .then((response) => {
        if(response.status === 200) {
             const $ = cheerio.load(response.data)
             let result = [];
            
            

             $('.individual_internship').each(function(i, elem) {
                if(i>4)
                    return;
                
                result.push( {
                    title: $(this).find('h4').text().trim().split('                \n')[0],
                    url: 'https://internshala.com'+$(this).find('a').attr('href'),
                    img: makeURL($(this).find('img').attr('src'))
                })
            });

             res.send(JSON.stringify(result))
    }
    }, (error) => console.log(err) );
})

function makeURL(url){
    if(!url.split('https://cdn.internshala.com/')[1])
        return "https://internshala.com" + url
    else
        return url
}

app.listen(4001, (err) => {
    if (err)
        throw err
    else
        console.log(`APP running on 4000`)
})