const express = require('express');
const app = express();
const path = require('path');
const cwd = process.cwd();
const https = require('https');
const fs = require('fs');
const os = require('os');
const proxyMiddleWare = require('http-proxy-middleware');
const cors = require('cors');

const projectPath = os.type().includes('Windows') ? 'z:\\Coding Projects\\BoF2Editor' : '/opt/bof2editor'
const configFile = 'config.prop';
const configPath = os.type().includes('Windows') ? path.join(projectPath, 'config') : '/etc/opt/bof2editor';
const hostPath = 'front-end\\build';

const backEndPortDefault = 6000;
const frontEndPortDefault = 443;
const backEndHostDefault = 'localhost';
const frontEndHostDefault = 'localhost';


let buildPath = path.join(projectPath, os.type().includes('Windows') ? 'bin\\build' : 'bin/build');
let indexFile = 'index.html';

let backEndPort = backEndPortDefault;
let frontEndPort = frontEndPortDefault;
let backEndHost = backEndHostDefault;
let frontEndHost = frontEndHostDefault;

let logLevel = -1;

let config = {};

/**
 * Logs the msg to the console, in the format time, [level], message
 * @param {String} level Logging level, lowest to highest, from DEBUG, INFO, WARN, ERROR
 * @param {String} msg The log message
 */
const writeLog = (level, msg) => {
    if (getLogLevel(level) >= logLevel) {
        console.log(`${new Date().toUTCString()} [${level}] ${msg}`)
    }
}

const setLogLevel = (level) => {
    writeLog('INFO', `Setting logging level to ${level}`);
    logLevel = getLogLevel(level);
    if(logLevel === -1){
        writeLog('WARN', 'Logging level is either undefined or invalid! All debug information will be printed.');
    }
}

/**
 * Loads the config from the props file
 */
const loadConfig = () => {
    //The raw input from the config file
    let resolvedConfigFile = path.join(configPath, configFile);
    writeLog('INFO', `Attempting to open the config file from ${resolvedConfigFile}`);
    let rawString = fs.readFileSync(resolvedConfigFile, { encoding: 'utf-8' });

    const setConfig = () => {
        setLogLevel(config['loggingLevel'])

        backEndHost = config['backEndHost'];
        frontEndHost = config['frontEndHost'];

        backEndPort = Number.parseInt(config['backEndPort']);
        writeLog('DEBUG', `backEndPort parsed, value = ${backEndPort}`);
        writeLog('DEBUG', `isNaN(backEndPort)? ${Number.isNaN(backEndPort)}`);
        if(!backEndPort || Number.isNaN(backEndPort) || backEndPort < 1024 || backEndPort > 65535){
            writeLog('WARN', `backEndPort was not set or is invalid, using default of ${backEndPortDefault}`)
            backEndPort = backEndPortDefault;
        }

        frontEndPort = Number.parseInt(config['frontEndPort']);
        writeLog('DEBUG', `frontEndPort parsed, value = ${frontEndPort}`);
        writeLog('DEBUG', `isNaN(frontEndPort)? ${Number.isNaN(frontEndPort)}`);
        if(!frontEndPort || Number.isNaN(frontEndPort) || (frontEndPort < 1024 && frontEndPort !== 443) || frontEndPort > 65535){
            writeLog('WARN', `frontEndPort was not set or is invalid, using default of ${frontEndPortDefault}`)
            frontEndPort = frontEndPortDefault;
        }
    }

    rawString.split(/[\r\n]/)
        .filter(s => !s.startsWith('#') && s !== '')
        .forEach(s => config[s.substring(0, s.indexOf('='))] = s.substring(s.indexOf('=') + 1))

    setConfig();

    writeLog('INFO', 'File opened, printing variable values');
}

const writeConfig = () => {
    writeLog('INFO', `backEndPort=${backEndPort}`)
    writeLog('INFO', `backEndHost=${backEndHost}`)
    writeLog('INFO', `frontEndPort=${frontEndPort}`)
    writeLog('INFO', `frontEndHost=${frontEndHost}`)
}

const getLogLevel = (level) => {
    if(level === 'DEBUG'){
        return 0;
    } else if(level === 'INFO'){
        return 1;
    } else if(level === 'WARN'){
        return 2;
    } else if(level === 'ERROR'){
        return 255;
    } else {
        writeLog('WARN', 'Attempting to assign an unknown value to a log! This info may not be printed!');
        return -1;
    }
}

const proxyOptions = {
    origin: `https://${frontEndHost}:${frontEndPort}/rom`,
    target: `http://${backEndHost}:${backEndPort}/rom`,
    changeOrigin: true,
}

app.use(express.static(buildPath));

// app.use(['*'], (_req, res) => {
//     writeLog('DEBUG', 'Serving file from app.use')
//     res.status(200);
//     res.send('Hello World!');
// })

proxyMiddleWare.createProxyMiddleware(proxyOptions),
app.get(['/', '/rom'], (req, res) => {
    if(req.path === '/rom'){

    }
    let indexPath = path.join(buildPath, indexFile);
    let options = {
        root: path.join(buildPath),
    }
    writeLog('INFO', `Serving files from ${options.root}`);
    writeLog('DEBUG', 'Setting type and status to 200');
    res.status(200);
    writeLog('DEBUG', `Sending file from ${indexPath}`);
    res.sendFile(indexFile, options);
})

let httpsOptions = {
    port: frontEndPort,
    //ca: ca,
    //cert: cert,
    //key: key,
}

//app.use()

loadConfig();
writeConfig();

app.listen(frontEndPort);

// app.listen(() => {
//     writeLog('INFO', `Listening on port ${frontEndPort}`);
// });

https.createServer(app).listen(httpsOptions, () => {
    writeLog('INFO', `Listening on port ${frontEndPort}`);
});