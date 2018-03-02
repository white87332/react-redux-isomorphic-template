import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'spdy';
import middlewareMain from './src/middleware/main';
import middlewareApiRoutes from './src/middleware/routes';
import reactRender from './src/middleware/render';
import globalSet from './src/middleware/globalSet';

const app = express();

globalSet();
middlewareMain(app);
reactRender(app);
middlewareApiRoutes(app);

// port
const httpPort = process.env.PORT || 80;
const httpsPort = process.env.HTTPS_PORT || 443;

// http
const server = http.createServer(app).listen(httpPort, () => {
    if (process.env.NODE_ENV === 'development')
    {
        server.keepAliveTimeout = 0;
    }
});

/* eslint no-console: ["error", { allow: ["log"] }] */
console.log(`http happens on port ${httpPort}`);

// https
if (fs.existsSync('./cert/server.pfx'))
{
    const options = {
        pfx: fs.readFileSync('../cert/server.pfx'),
        passphrase: 'password',
    };

    https.createServer(options, app).listen(httpsPort);
    console.log(`http happens on port ${httpsPort}`);
}

// mkfir logs
if (!fs.existsSync('./logs'))
{
    fs.mkdir('./logs');
}

// mkfir uploads
if (!fs.existsSync('./public/asset/uploads'))
{
    fs.mkdir('./public/asset/uploads');
}

process.on('uncaughtException', (evt) =>
{
    console.log('uncaughtException: ', evt);
});
