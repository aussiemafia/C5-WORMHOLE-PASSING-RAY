/* Shared GoatCounter service; Expanse has its own fixed path, never TOTAL. */
(()=>{
 'use strict';
 const total=document.getElementById('expanseVisits'), note=document.getElementById('expanseVisitNote');
 if(!total||!note)return;
 const path='/C5-WORMHOLE-PASSING-RAY/';
 const live=location.hostname==='aussiemafia.github.io'&&location.pathname.startsWith(path);
 if(!live){note.textContent='Preview / offline · visits not counted';return;}
 const script=document.createElement('script');
 script.async=true;script.src='https://gc.zgo.at/count.js';
 script.dataset.goatcounter='https://aussiemafia.goatcounter.com/count';
 script.dataset.goatcounterSettings=JSON.stringify({path,title:'The Expanse — website visits'});
 document.head.append(script);
 async function showCount(){
  try{
   const r=await fetch('https://aussiemafia.goatcounter.com/counter/'+encodeURIComponent(path)+'.json',{signal:AbortSignal.timeout(12000)});
   if(r.status===404){note.textContent='Waiting for first recorded visits';return;}
   if(!r.ok)throw Error('Counter unavailable');
   const data=await r.json();const count=Number(String(data.count).replaceAll(',',''));
   if(!Number.isSafeInteger(count)||count<0)throw Error('Invalid count');
   total.textContent=count.toLocaleString('en-AU');
   note.textContent='Since 3 Nov 2026 · updates within 4 hours';
  }catch{note.textContent='Visit total temporarily unavailable';}
 }
 showCount();
})();
