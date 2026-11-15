import http from 'node:http';
import path from 'node:path';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const projectRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const production=process.argv.includes('--production');
const root=production?path.join(projectRoot,'dist'):projectRoot;
const portArgument=process.argv.find(argument=>argument.startsWith('--port='));
const port=Number(portArgument?.split('=')[1]||process.env.PORT||4187);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8','.png':'image/png','.json':'application/json; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end('Method not allowed');return;}
  try{
    const url=new URL(req.url,'http://localhost');
    const decoded=decodeURIComponent(url.pathname);
    const pathname=decoded==='/'?'/index.html':decoded==='/providers'?'/providers.html':decoded;
    const target=path.resolve(root,`.${pathname}`);
    const relative=path.relative(root,target);
    if(relative.startsWith('..')||path.isAbsolute(relative)||relative.split(path.sep).some(part=>part.startsWith('.'))){res.writeHead(403);res.end('Forbidden');return;}
    if(!production && !['index.html','providers.html','assets'].includes(relative.split(path.sep)[0])){res.writeHead(404);res.end('Not found');return;}
    const info=await stat(target);if(!info.isFile())throw new Error('not-file');
    const data=await readFile(target);
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Content-Length':data.length,'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});
    res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found');}
});
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Integrail ${production?'production':'development'} preview: http://127.0.0.1:${port}`));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>server.close(()=>process.exit(0)));
