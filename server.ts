import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { Request, Response } from 'express';
var cluster = require('cluster');

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {

  if (cluster.isMaster) {
    const server = express();
    // const distFolder = '/var/www/html/aliceblue-website/dist/aliceblue-website/browser';
    // const distFolder = 'E:/git/aliceblue-website/dist/aliceblue-website/browser';
    const distFolder = 'D:/git-project/Working-website/aliceblue-website/aliceblue-website/dist/aliceblue-website/browser';

    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine('html', ngExpressEngine({
      bootstrap: AppServerModule,
    }));

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // sitemap
    server.get('/sitemap.xml', ssrSitemap);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get('*.*', express.static(distFolder, {
      maxAge: '1y'
    }));

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
      res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    });

    // All regular routes use the Universal engine
  //   server.get('*', (req, res) => {
  //     // req.originalUrl in this object we can read the requested URL
  //   if(req.originalUrl == 'http://localhost:4200'){
  //     res.redirect(301, 'http://localhost:4100');
  //   }else{
  //     res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  //   }
  //  });

    return server;

  } else {

    const server = express();
    const distFolder = '/var/www/html/aliceblue-website/dist/aliceblue-website/browser';
    const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine('html', ngExpressEngine({
      bootstrap: AppServerModule,
    }));

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // sitemap
    server.get('/sitemap.xml', ssrSitemap);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get('*.*', express.static(distFolder, {
      maxAge: '1y'
    }));

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
      res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
    });

    return server;
  }
}

async function ssrSitemap(req: Request, res: Response) {
  res.sendFile(`/var/www/html/aliceblue-website/src/assets/sitemap.xml`)
}

function run(): void {
  const port = process.env.PORT || 6100;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}



// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
// if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
// }


export * from './src/main.server';
