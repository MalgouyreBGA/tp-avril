//import http from 'http'
const http = require('http');
//import url from 'url'
const url = require('url');
const fs = require("fs");
const dotenv = require('dotenv').config().parsed
const utils = require('./utils.js')

let students = [
    { name : "Sonia", birth : "2019-14-05"},
    { name : "Antoine", birth : "2000-12-05"},
    { name : "Alice", birth : "1990-14-09"},
    { name : "Sophie", birth : "2001-10-02"},
    { name : "Bernard", birth : "1980-21-08"}
];
function users(res, htmlData){
    const home = fs.readFileSync("view/home.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home + utils.getHeader('users') + htmlData );
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toUpperCase();

    if (path === "/style") {
        res.writeHead(200, { "Content-Type": "text/css" });
        const css = fs.readFileSync("assets/css/style.css");
        res.write(css);
        res.end();
        return;
    }

    console.log(req.method)
    console.log(path)
    if (method === 'GET' && path.startsWith('/')) {
        if (path === '/') {
            const home = fs.readFileSync("view/home.html");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(home + utils.getHeader('home') + utils.form);
        } else if (path === '/users'){
            let htmlData = utils.lines(students)
            users(res, htmlData)
        }

    } else if (method === 'POST' && parsedUrl.pathname === '/users'){
        req.on('data', (chunk) => {
            f = chunk.toString().split('&')
            obj = {}
            f.forEach(d=>{
                d = d.split('=')
                obj[d[0]]=d[1]
            })
            console.log(obj);
            students.push(obj)
        });
        req.on('end', () => {
            let htmlData = utils.lines(students)
            users(res, htmlData)
            return 
        })



    } else if (req.method = 'DELETE' && req.url.startsWith('/users/')){
        req.on('data', (chunk) => {
           console.log(chunk.toString());
           /*
            console.log(req.method)
            console.log('post')
            let index = Number(path.replace('/users/', "")) || undefined
            if (index != undefined){
            students.splice(index,1)
            htmlData = utils.lines(students)
        }
           */
        });
        req.on('end', () => {
            let htmlData = utils.lines(students)
            users(res, htmlData)
            return 
        })

    }
    else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not found');
    res.end();
  }
});

server.listen(dotenv.APP_PORT, dotenv.APP_LOCALHOST, () => {
    console.log(`Server is running on ${dotenv.APP_LOCALHOST} port ${dotenv.APP_PORT}`);
});