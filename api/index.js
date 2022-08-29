const express = require('express');
const axios = require('axios');

const app = express();

let data = {};

function makerequest(){
    axios.get("https://api.lanyard.rest/v1/users/441221465019514881").then((res) => {
        data = res.data;
        makerequest();
    }).catch((err) => {
        makerequest();
    });
};

makerequest();

app.get('/@me',(req,res) => {
    res.json(data);
});

module.exports = app;