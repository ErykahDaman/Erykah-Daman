/* shared: nav + animated pixel background */
const PAGES=[["home.html","HOME"],["experience.html","EXPERIENCE"],["about.html","ABOUT"]];
const here=location.pathname.split('/').pop()||'index.html';
if(here!=='index.html'){
  document.body.insertAdjacentHTML('afterbegin','<nav class="bar"><b>'+ME.name+'</b>'+PAGES.map(p=>`<a href="${p[0]}" ${p[0]===here?'class="on"':''}>${p[1]}</a>`).join('')+'<a href="index.html">⏻ QUIT</a></nav>');
}
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const tags=a=>(a||[]).map(t=>`<span class="tag">${t}</span>`).join('');
/* background: uses assets/background.mp4 if present, else animated canvas */
(function(){
  const v=document.getElementById('bgvideo'), c=document.getElementById('bg');
  const useCanvas=()=>{ if(v)v.remove(); if(!c)return; const x=c.getContext('2d'),P=4;let W,H;
    const rs=()=>{W=c.width=innerWidth/P|0;H=c.height=innerHeight/P|0};rs();addEventListener('resize',rs);
    const stars=[...Array(70)].map(()=>[Math.random(),Math.random(),Math.random()*6]);
    const clouds=[...Array(6)].map((_,i)=>({x:Math.random()*400,y:20+i*22,w:20+Math.random()*20,s:.05+Math.random()*.12}));
    const still=matchMedia('(prefers-reduced-motion:reduce)').matches;let t=0;
    (function f(){t++;const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#07329B');g.addColorStop(.6,'#AB8BEE');g.addColorStop(1,'#ED0F87');x.fillStyle=g;x.fillRect(0,0,W,H);
      stars.forEach(s=>{if(Math.sin(t/20+s[2])>-.3){x.fillStyle='#FFF7F0';x.fillRect(s[0]*W|0,s[1]*H*.6|0,1,1)}});
      x.fillStyle='#FBEFFF';x.fillRect(W-40,14,10,10);x.fillStyle='#07329B';x.fillRect(W-37,13,9,9);
      clouds.forEach(k=>{k.x=(k.x+k.s)%(W+60);x.fillStyle='rgba(225,143,229,.6)';const px=k.x-30|0,py=k.y|0;x.fillRect(px,py,k.w,6);x.fillRect(px+4,py-4,k.w*.5,5);x.fillRect(px+k.w*.4,py-6,k.w*.35,7)});
      x.fillStyle='#07329B';for(let i=0;i<W;i+=8){x.fillRect(i,H-14-(i*7%5),8,20)}
      x.fillStyle='#1BB5FD';x.fillRect(0,H-8,W,8);
      if(!still)requestAnimationFrame(f)})();
  };
  if(v){v.addEventListener('error',useCanvas,true);v.querySelector('source').addEventListener('error',useCanvas)}else useCanvas();
})();
