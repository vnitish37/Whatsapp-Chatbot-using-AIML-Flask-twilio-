const express = require('express');
const browser = require('browser-detect');
const si = require('systeminformation');
const path = require('path')


//userdetails
const Userdetails = require('../models/user');

//express Routes
const Routes = express();

const { ensureauth } = require('../config/Auth');


Routes.get('/UserDetails', async(req, res, next) => {
    const coustomer = await Userdetails.find({});
    res.json({
        teamblack: {
            persons: {
                coustomer
            }
        }
    })
});


Routes.get('/token/apikey=:apikey1', async(req, res, next) => {
    const coustomer = await Userdetails.findOne({
        apikey: req.params.apikey1
    });
    if (coustomer) {
        res.sendFile(path.join(__dirname + '/models/face-api.js'))

    } else {
        res.json({
            APIKEY: {
                ERROR_CODE: 403,
                MESSAGE: 'KEY INVALID'
            }
        })

    }
})

Routes.get('/dashboard', ensureauth, async(req, res, next) => {
    const coustomer = Userdetails.find({})
    const result = browser(req.headers['user-agent']);
    console.log(result);
    console.log(req.ip);
    const brosername = result.name;
    const os = result.os;


    const data = await si.cpu();
    console.log('CPU Information:');
    console.log('- manufucturer: ' + data.manufacturer);
    console.log('- brand: ' + data.brand);
    console.log('- speed: ' + data.speed);
    console.log('- cores: ' + data.cores);
    console.log('- physical cores: ' + data.physicalCores);
    console.log('...');


    res.render('dashboard', {
        APIKEY: req.user.apikey,
        UUID: req.user.UUID,
        NAME: req.user.name,
        browser: brosername,
        os: os,
        brand: data.brand,
        cors: data.cores

    })
});

Routes.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'you are logout');
    res.redirect('/login');
});

module.exports = Routes;