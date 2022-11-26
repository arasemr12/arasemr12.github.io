const express = require('express');
const axios = require('axios');

const app = express();

let data = {};
let posts = [];

function makerequest(){
    axios.get("https://api.lanyard.rest/v1/users/441221465019514881").then((res) => {
        data = res.data;
        makerequest();
    }).catch((err) => {
        makerequest();
    });
};

makerequest();

function getposts(){
    axios.get("http://185.250.241.83/api/users/6317ab9fe62c7d0d87d1c387").then((res) => {
        posts = res.data;
        setTimeout(() => {
            getposts();
        }, 10000);
    }).catch((err) => {
        setTimeout(() => {
            getposts();
        }, 10000);
    });
};

getposts();

app.get('/me',(req,res) => {
    res.json(data);
});

app.get('/posts',(req,res) => {
    res.json(posts);
});

module.exports = app;
