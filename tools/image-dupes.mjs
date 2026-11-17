// node tools/image-dupes.mjs [publicDir]  -> exits 1 on any repeated photo
import fs from 'fs'; import path from 'path';
const root = process.argv[2] || 'public';
const SKIP = /logo|favicon|apple-touch|og-image|icon/i;
const pages = [];
(function walk(d){ for (const f of fs.readdirSync(d)) { const p=path.join(d,f);
  if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html') && f!=='404.html') pages.push(p);} })(root);
const key = s => path.basename(s.split('?')[0]).replace(/\.(jpe?g|png|webp|avif)$/i,'').replace(/-(\d{3,4}w?)$/,'');
const uses = {}; let fail = 0;
for (const p of pages.sort()) {
  const h = fs.readFileSync(p,'utf8').replace(/<script[\s\S]*?<\/script>/g,'').replace(/<head[\s\S]*?<\/head>/,'');
  const srcs = [...h.matchAll(/<(?:img|source)\b[^>]*?\s(?:src|srcset|data-src)="([^"]+)"/g)].flatMap(m=>m[1].split(',').map(x=>x.trim().split(/\s+/)[0]))
    .concat([...h.matchAll(/url\((['"]?)([^'")]+)\1\)/g)].map(m=>m[2]));
  const page = '/'+path.relative(root,p).replace(/index\.html$/,'');
  const keys = [...new Set(srcs.filter(s=>/\.(jpe?g|png|webp|avif)/i.test(s) && !SKIP.test(s)).map(key))];
  console.log(page.padEnd(48), keys.join(', ') || '(no photos)');
  for (const k of keys) (uses[k] ||= []).push(page);
  const imgTags = [...h.matchAll(/<img\b[^>]*\ssrc="([^"]+)"/g)].map(m=>key(m[1])).filter(k=>!SKIP.test(k));
  const dupOnPage = imgTags.filter((k,i)=>imgTags.indexOf(k)!==i);
  if (dupOnPage.length) { console.log('  FAIL same photo twice on', page, dupOnPage); fail++; }
}
for (const [k,v] of Object.entries(uses)) if (v.length>1) { console.log(`FAIL ${k} used on ${v.length} pages: ${v.join(' ')}`); fail++; }
for (const f of fs.readdirSync(path.join(root,'assets')).filter(f=>f.endsWith('.css'))) {
  const m=[...fs.readFileSync(path.join(root,'assets',f),'utf8').matchAll(/url\((['"]?)([^'")]+\.(?:jpe?g|png|webp))\1\)/g)];
  if (m.length) console.log('NOTE css backgrounds in',f,m.map(x=>x[2]).join(' '));
}
console.log(fail ? `\n${fail} image repeat problem(s)` : '\nOK: every photo is used on one page only'); process.exit(fail?1:0);
