const express = require('express');
const app = express();
const path = require('path');
const cwd = process.cwd();

let buildPath = 'build';
let indexFile = 'index.html';

let port = 9000;

let logLevel = -1;

const writeLog = (level, msg) => {
    if(getLogLevel(level) > logLevel){
        console.log(`${new Date().toUTCString()}: [${level}] ${msg}`)
    }
}

const getLogLevel = (level) => {
    if(level === 'INFO') return 1;
    else if(level === 'WARN') return 2;
    else if(level === 'ERROR') return 3;
    return 0;
}

app.use(express.static(path.join(cwd, buildPath)));

app.get('/', (req, res) => {
    let indexPath = path.join(cwd, buildPath, indexFile);
    let options = {
        root: path.join(cwd, buildPath),
    }
    writeLog('INFO', `Serving files from ${buildPath}`);
    writeLog('DEBUG', 'Setting type and status to 200');
    res.status(200);
    writeLog('DEBUG', `Sending file from ${indexPath}`);
    res.sendFile(indexFile, options);
})

app.listen(port);
writeLog('INFO', `Listening on port ${port}`);