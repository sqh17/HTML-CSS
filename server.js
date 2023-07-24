let http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    zlib = require('zlib');
let process = require('process')

let server = http.createServer((req, res) => {
    let {pathname} = url.parse(req.url),
        acceptEncoding = req.headers['accept-encoding'] || '',
        referer = req.headers['Referer'] || '',
        raw;
    process.title = '12312313123'
    console.log('Request: ', req.url);

    try {
        raw = fs.createReadStream(path.resolve(__dirname, pathname.replace(/^\//, '')));

        raw.on('error', (err) => {
            console.log(err);

            if (err.code === 'ENOENT') {
                res.writeHeader(404, {'content-type': 'text/html;charset="utf-8"'});
                res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
                res.end();
            }
        });
        
        if(req.url.match(/.js$/)) {
            // console.log('111',path.resolve(__dirname,pathname),req.url)
            // f = '/ThreeJS/learnTest'+req.url;
            res.setHeader('content-Type','text/javaScript;charset:utf-8')
            raw.pipe(res)
        }

        else if (acceptEncoding.match(/\bgzip\b/)) {
            res.writeHead(200, { 'Content-Encoding': 'gzip' });
            raw.pipe(zlib.createGzip()).pipe(res);
        } else if (acceptEncoding.match(/\bdeflate\b/)) {
            res.writeHead(200, { 'Content-Encoding': 'deflate' });
            raw.pipe(zlib.createDeflate()).pipe(res);
        } else {
            res.writeHead(200, {});
            raw.pipe(res);
        }
    } catch (e) {
        console.log(e);
    }

    // fs.readFile(path.resolve(__dirname, pathname.replace(/^\//, '')), (err, data) => {
    //     if (err) {
    //         res.writeHeader(404, {'content-type': 'text/html;charset="utf-8"'});
    //         res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
    //         res.end();
    //     } else {
            // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8088');

            // res.writeHead(200, {
            //     // 'content-type': 'text/html;charset="utf-8"',
            //     // 'Access-Control-Allow-Origin': '*',
            //     // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            //     // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
            // });
            // res.write(data);
            // res.end();
    //     }
    // });
})
server.listen('80',()=>{
    process.title = '123123'
    console.log('服务器开启成功', 'localhost:80/');
})


