/** Browser acceptance + documentation capture of the CURRENT distributed card. Demo states only. */
const { chromium } = require('playwright');
const mdi = require('@mdi/js');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const out = path.resolve(__dirname,'../docs/screenshots');
fs.mkdirSync(out,{recursive:true});
const base = pathToFileURL(path.resolve(__dirname,'preview.html')).href;
const cases=[
['operation','operation',null,'en','dark','H15'],['status','status',null,'en','dark','H15'],
['maintenance','maintenance',null,'en','dark','H15'],
['cleaning-settings','operation','cleaning_settings','en','dark','H15'],
['wash-dry-settings','operation','wash_settings','en','dark','H15'],
['device-settings','operation','device_settings','en','dark','H15'],
['advanced-settings','operation','advanced','en','dark','H15'],
['operation-he','operation',null,'he','dark','H15'],['status-he','status',null,'he','dark','H15'],
['maintenance-he','maintenance',null,'he','dark','H15'],
['operation-light','operation',null,'en','light','H15'],
['operation-h14','operation',null,'en','dark','H14']
];
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
   for(const [name,tab,group,lang,theme,model] of cases){
     const page=await browser.newPage({viewport:{width:420,height:850},deviceScaleFactor:2});
     const errors=[];page.on('pageerror',e=>errors.push(e.message));
     await page.addInitScript(paths=>{window.__mdi=paths},mdi);
     await page.goto(base+'?model='+model+'&lang='+lang+'&theme='+theme);
     await page.waitForFunction(()=>window.__ready?.(),null,{timeout:15000});
     const card=page.locator('dreame-device-card');
     if(tab!=='operation') await card.locator('button[data-tab="'+tab+'"]').click();
     if(group) await card.locator('button[data-group="'+group+'"]').click();
     const snap=await page.evaluate(()=>{
       const c=window.__demo.card,root=c.shadowRoot,img=root.querySelector('.dreame-brand img');
       return {view:c._tab,group:c._settings||null,title:root.querySelector('h2')?.textContent,
         background:getComputedStyle(img).backgroundColor,logoWidth:img.getBoundingClientRect().width,
         dark:root.querySelector('ha-card').getAttribute('data-dark-mode'),
         overflow:document.documentElement.scrollWidth>window.innerWidth+1,calls:window.__calls.length,
         pageText:root.textContent,hasControls:!!root.querySelector('button[data-command]'),iconCount:root.querySelectorAll('ha-icon').length,iconSvgCount:root.querySelectorAll('ha-icon svg').length,
         leftAligned:root.querySelector('.heading').getBoundingClientRect().left < root.querySelector('.device-badge').getBoundingClientRect().left};
     });
     assert.deepEqual(errors,[],name+' browser errors');
     assert.equal(snap.view,tab,name+' current tab');
     assert.equal(snap.group,group,name+' subsection');
     assert.equal(snap.title,model==='H14'?'H14 Dual':'H15 Pro Heat',name+' model');
     assert.equal(snap.background,'rgba(0, 0, 0, 0)',name+' logo has opaque background');
     assert(snap.logoWidth>80&&snap.logoWidth<=120.5,name+' logo sizing');
     assert.equal(snap.overflow,false,name+' horizontal overflow');
     assert.equal(snap.calls,0,name+' unintended device calls');
     assert(snap.leftAligned,name+' logo/model header is not physically on the left');
     assert(snap.iconCount>=2 && snap.iconSvgCount>=2,name+' visible icon SVGs missing');
     if(name==='operation')assert(snap.hasControls,'operation should include working UI controls');
     if(group)assert(snap.pageText.length>300,name+' setting group is empty');
     // Screenshot the complete component, not a synthetic reimplementation or outdated reference mockup.
     await page.locator('.capture').screenshot({path:path.join(out,name+'.png'),animations:'disabled'});
     console.log('PASS '+name+' · '+tab+' · '+(group||'root')+' · '+theme+' · '+lang);
     await page.close();
   }
   // Use actual event handlers and mock Home Assistant services to validate confirm/cancel semantics.
   const page=await browser.newPage();
   await page.addInitScript(paths=>{window.__mdi=paths},mdi);
   await page.goto(base+'?model=H15&lang=en&theme=dark');
   await page.waitForFunction(()=>window.__ready?.());
   const card=page.locator('dreame-device-card');
   await card.locator('button[data-group="cleaning_settings"]').click();
   await card.locator('button[data-setting="mode"]').click();
   await card.locator('button[data-option="Smart"]').click();
   assert.equal(await page.evaluate(()=>window.__calls.length),0,'draft selection must not change the real device');
   await card.locator('button[data-save-option]').click();
   assert.equal(await page.evaluate(()=>window.__calls.length),1,'confirmed selection must call HA service exactly once');
   await card.locator('button[data-tab="maintenance"]').click();
   await card.locator('button[data-command="reset_filter"]').click();
   assert.equal(await page.evaluate(()=>window.__calls.length),1,'maintenance reset without confirm');
   assert.equal(await card.locator('[role="alertdialog"]').count(),1,'confirmation modal must be visible');
   await card.locator('button[data-cancel]').click();
   assert.equal(await page.evaluate(()=>window.__calls.length),1,'cancel must not reset anything');
   console.log('PASS browser interaction safety: select draft, select confirm, reset confirmation and cancel');
   await page.close();
   console.log('PASS 12 current-source real UI screenshots (synthetic device state)');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});