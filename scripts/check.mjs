import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let failures=0;
function fail(message){console.error(`FAIL: ${message}`);failures++;}
for(const file of ['assets/site.js',...(await readdir(path.join(root,'scripts'))).filter(name=>name.endsWith('.mjs')).map(name=>`scripts/${name}`)]){
  const result=spawnSync(process.execPath,['--check',path.join(root,file)],{encoding:'utf8'});
  if(result.status!==0)fail(`${file}: ${result.stderr}`);
}
for(const file of ['index.html','providers.html']){
  const html=await readFile(path.join(root,file),'utf8');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  if(new Set(ids).size!==ids.length)fail(`${file}: duplicate IDs`);
  if((html.match(/<h1[\s>]/g)||[]).length!==1)fail(`${file}: must have one primary heading`);
  for(const [,reference] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
    if(/^(?:https?:|mailto:|data:)/.test(reference))continue;
    const [target,hash]=reference.split('#');
    const targetPath=target||file;
    try{
      await access(path.join(root,targetPath));
      if(hash){const targetHTML=await readFile(path.join(root,targetPath),'utf8');if(!targetHTML.includes(`id="${hash}"`))fail(`${file}: missing anchor ${reference}`);}
    }catch{fail(`${file}: missing local asset ${reference}`);}
  }
}
const css=await readFile(path.join(root,'assets/styles.css'),'utf8');
for(const [,url] of css.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)){
  try{await access(path.join(root,'assets',url));}catch{fail(`Missing CSS asset: ${url}`);}
}
if(failures)process.exitCode=1;
else console.log('PASS: JavaScript syntax, page structure, local links, anchors and font assets.');
