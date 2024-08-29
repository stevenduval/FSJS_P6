const express = require('express');
const router = express.Router();
// call in data json file so we can work with
const data = require('./data.json');
// get length of projects
const dataLen = data.projects.length;

// when get request is direct to root
router.get('/', (req, res) => {
    // send project data via locals
    res.locals.projects = data.projects;
    // render the index template file
    res.render('index')
});

// when request is to about
router.get('/about', (req, res) => {
    // render the index template file
    res.render('about')
});

// when request is to a project/id path
// added regex to ensure we only allow users to view projects we have data for
// otherwise since there will be no match it will cause 404 error
router.get(`/project/:id([0-${dataLen - 1}]$)`, (req, res) => {
    // get id paramter from request
    const { params: { id } } = req;
    // set locals equal to which project data we need
    res.locals.project = data.projects[id];
    // render the project template file
    res.render('project')
});

// ########## ERROR HANDLING ##########

// middleware to create 404 errors
router.use((req, res, next) => {
    // create new error object
    const err = new Error();
    // set status and message for error
    err.statusCode = 404;
    err.message = 'not found';
    // pass error to next so it can be handled
    next(err);
})

// middleware to catch the errors and take action on them
router.use((err, req, res, next) => {
    // if its is not a 404 error create 500 error
    if ( err.statusCode != 404 ) {
        // set statuscode and message
        err.statusCode = 500;
        err.message = 'Internal Server Error';
    }
    // log error to the console
    console.error(err.statusCode, err.message);
    // set locals for error page
    res.locals.err = err;
    // render appropriate error pages
    res.render(((err.statusCode === 404)? 'page-not-found' : 'error'));
})

// export so we can include/use in another file
module.exports = router;