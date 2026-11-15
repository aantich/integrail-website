import {cp,mkdir,readdir,rm,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'dist');
// Only the generated output is replaced. Source files and QA evidence are untouched.
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
for(const item of ['index.html','providers.html','assets'])await cp(path.join(root,item),path.join(output,item),{recursive:true});
async function size(dir){let total=0;for(const item of await readdir(dir,{withFileTypes:true})){const target=path.join(dir,item.name);total+=item.isDirectory()?await size(target):(await stat(target)).size;}return total;}
console.log(`Built static site in dist/ (${Math.round(await size(output)/1024)} KiB). No runtime dependencies or external assets.`);
