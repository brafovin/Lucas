const cv=document.getElementById('game'),ctx=cv.getContext('2d');
const COLS=25,ROWS=19,T=28;cv.width=COLS*T;cv.height=ROWS*T;

const MAP=[
"#########################",
"#.......................#",
"#.......................#",
"#.......................#",
"############d############",
"#....#.........#........#",
"#....#.........#........#",
"#..............#........#",
"#....#..................#",
"#....#.........#........#",
"######.........##########",
"#.......................#",
"#.......................#",
"#.......................#",
"############D############",
"#.......................#",
"#.......................#",
"#.......................#",
"#########################"];

const S={px:12*T+T/2,py:2*T+T/2,dir:'down',keys:{},phase:'outside',
  sawBlood:false,broken:false,visited:new Set(),killer:null,
  inCloset:false,hideTime:0,needHide:7,killerLeft:false,
  msg:'',msgT:0,prompt:null,over:false,ended:false};

const P={
  living:{x:2.5*T,y:7*T},kitchen:{x:20*T,y:7*T},
  lockedDoor:{x:12*T+T/2,y:14*T+T/2},
  closet:{x:4*T,y:11*T+T/2},
  car:{x:12*T+T/2,y:2*T+T/2},
  frontDoor:{x:12*T+T/2,y:4*T+T/2}};

function dist(p){return Math.hypot(S.px-p.x,S.py-p.y)}
function tileAt(x,y){const c=Math.floor(x/T),r=Math.floor(y/T);
  if(r<0||r>=ROWS||c<0||c>=COLS)return'#';return MAP[r][c]}
function walk(x,y){const t=tileAt(x,y);if(t==='#')return false;
  if(t==='D'&&!S.broken)return false;return true}
function moveE(e,dx,dy,r=10){
  if(dx){const nx=e.x+dx;if(walk(nx-r,e.y-r)&&walk(nx+r,e.y-r)&&walk(nx-r,e.y+r)&&walk(nx+r,e.y+r))e.x=nx}
  if(dy){const ny=e.y+dy;if(walk(e.x-r,ny-r)&&walk(e.x+r,ny-r)&&walk(e.x-r,ny+r)&&walk(e.x+r,ny+r))e.y=ny}}
function msg(t,d=180){S.msg=t;S.msgT=d}

function updPlayer(){
  if(S.over||S.inCloset)return;
  let dx=0,dy=0,sp=2.0;
  if(S.keys.w||S.keys.arrowup)dy-=sp;
  if(S.keys.s||S.keys.arrowdown)dy+=sp;
  if(S.keys.a||S.keys.arrowleft)dx-=sp;
  if(S.keys.d||S.keys.arrowright)dx+=sp;
  if(dx&&dy){dx/=1.414;dy/=1.414}
  if(dy<0)S.dir='up';else if(dy>0)S.dir='down';
  else if(dx<0)S.dir='left';else if(dx>0)S.dir='right';
  const e={x:S.px,y:S.py};moveE(e,dx,dy);S.px=e.x;S.py=e.y;

  if(S.phase==='outside'&&S.py>5*T){S.phase='exploring';
    msg("Du betrittst das Haus. Die Luft ist stickig.",200)}
  if(S.phase==='exploring'){
    if(dist(P.living)<60&&!S.visited.has('l')){S.visited.add('l');
      msg("Wohnzimmer: leer. Fernseher flimmert ohne Ton. Zertretene Brille am Boden.",220)}
    if(dist(P.kitchen)<60&&!S.visited.has('k')){S.visited.add('k');
      msg("Küche: leer. Wasser kocht noch. Ein Messer fehlt aus dem Block.",220)}}
  if(S.phase==='breaking'&&S.py>15*T&&!S.killer){
    S.killer={x:12*T+T/2,y:17*T};S.phase='chase';
    msg("Der Killer sieht dich! LAUF! Versteck dich im KLEIDERSCHRANK (links im Flur)!",320)}
  if(S.phase==='escaping'&&S.py<4*T){S.phase='outsideEnd';
    msg("Draußen im Regen. Rufe Verstärkung am Streifenwagen!",240)}}

function updKiller(){
  if(!S.killer)return;const k=S.killer,sp=1.4;
  if(S.killerLeft){
    const dx=P.frontDoor.x-k.x,dy=2*T-k.y,d=Math.hypot(dx,dy);
    if(d<16){S.killer=null;msg("Die Haustür schlägt zu. Stille.",240);return}
    moveE(k,(dx/d)*sp,(dy/d)*sp)}
  else if(S.inCloset){
    if(!k.t||Math.hypot(k.x-k.t.x,k.y-k.t.y)<8)
      k.t={x:(6+Math.random()*14)*T,y:(11+Math.random()*3)*T};
    const dx=k.t.x-k.x,dy=k.t.y-k.y,d=Math.hypot(dx,dy)||1;
    moveE(k,(dx/d)*sp*0.6,(dy/d)*sp*0.6);
    if(S.hideTime>=S.needHide){S.killerLeft=true;
      msg("Schritte entfernen sich. Ein Reißverschluss. Die Haustür...",240)}}
  else{
    const dx=S.px-k.x,dy=S.py-k.y,d=Math.hypot(dx,dy);
    if(d<15){S.over=true;S.phase='dead';
      msg("Der Killer hat dich erwischt. GAME OVER. (Neustart klicken)",99999);return}
    moveE(k,(dx/d)*sp,(dy/d)*sp)}}

let lastE=0;
function interact(){
  if(Date.now()-lastE<300||S.over)return;lastE=Date.now();
  if(dist(P.closet)<32&&S.phase==='chase'){S.inCloset=true;S.phase='hiding';
    msg("Du schließt die Schranktür. Dein Herz dröhnt.",200);return}
  if(S.inCloset&&S.killerLeft){S.inCloset=false;S.phase='escaping';
    msg("Du trittst vorsichtig aus dem Schrank. Zur Haustür!",200);return}
  if(dist(P.lockedDoor)<50&&(S.phase==='exploring'||S.phase==='sawBlood')){
    if(!S.sawBlood){S.sawBlood=true;S.phase='sawBlood';
      msg("Tür abgeschlossen. BLUTSTREIFEN am Boden, frisch. E erneut = eintreten.",360)}
    else if(!S.broken){S.broken=true;S.phase='breaking';
      msg("Du trittst die Tür ein! Sie kracht nach innen!",200);
      setTimeout(()=>msg("Eine Leiche. Darüber ein Mann mit blutiger Klinge. Er dreht sich zu dir!",260),1800)}
    return}
  if(dist(P.car)<40&&S.phase==='outsideEnd'){S.phase='ending';S.ended=true;S.over=true;
    msg("★ VERSTÄRKUNG! Blaulicht im Regen. Ihr durchsucht das Haus — der Killer ist entkommen. Er läuft noch frei herum. ★",99999);return}}

function drawTile(c,r){const t=MAP[r][c],x=c*T,y=r*T;
  if(r<4){ctx.fillStyle='#0d1018';ctx.fillRect(x,y,T,T);
    if((c+r)%2)ctx.fillRect(x,y,T,T);
    ctx.fillStyle='rgba(120,140,160,0.1)';
    ctx.fillRect(x+(Date.now()/30+c*7)%T,y+(Date.now()/20+r*11)%T,1,4)}
  else if(r>=15){ctx.fillStyle='#2a1212';ctx.fillRect(x,y,T,T)}
  else{ctx.fillStyle='#2b211a';ctx.fillRect(x,y,T,T);
    ctx.strokeStyle='rgba(0,0,0,0.25)';ctx.beginPath();
    ctx.moveTo(x,y+T/2);ctx.lineTo(x+T,y+T/2);ctx.stroke()}
  if(t==='#'){const g=ctx.createLinearGradient(x,y,x,y+T);
    g.addColorStop(0,'#4a4a4a');g.addColorStop(1,'#252525');
    ctx.fillStyle=g;ctx.fillRect(x,y,T,T);
    ctx.strokeStyle='#111';ctx.strokeRect(x,y,T,T)}
  else if(t==='d'){ctx.fillStyle='#6b3a1a';ctx.fillRect(x,y,T,T);
    ctx.fillStyle='#3a1a0a';ctx.fillRect(x+3,y+3,T-6,T-6);
    ctx.fillStyle='#d4a060';ctx.fillRect(x+T-8,y+T/2-1,3,3)}
  else if(t==='D'){if(S.broken){ctx.fillStyle='#150505';ctx.fillRect(x,y,T,T);
      ctx.fillStyle='#5a3525';ctx.fillRect(x,y,4,T);ctx.fillRect(x+T-4,y,4,T);
      ctx.fillRect(x+5,y,3,T/3);ctx.fillRect(x+T-9,y+T*2/3,3,T/3)}
    else{ctx.fillStyle='#2a1a0a';ctx.fillRect(x,y,T,T);
      ctx.fillStyle='#7a4a1a';ctx.fillRect(x+2,y+2,T-4,T-4);
      ctx.fillStyle='#000';ctx.fillRect(x+T/2-1,y+T/2-1,3,5)}}}

function drawObj(){
  if(!S.ended){const c=P.car;
    ctx.fillStyle='#1d3470';ctx.fillRect(c.x-20,c.y-10,40,22);
    ctx.fillStyle='#fff';ctx.fillRect(c.x-20,c.y-2,40,3);
    ctx.fillStyle='#aacdff';ctx.fillRect(c.x-15,c.y-8,30,6);
    const b=Math.floor(Date.now()/300)%2===0;
    ctx.fillStyle=b?'#00f':'#f00';ctx.fillRect(c.x-7,c.y-13,5,3);
    ctx.fillStyle=b?'#f00':'#00f';ctx.fillRect(c.x+2,c.y-13,5,3)}
  ctx.fillStyle='rgba(200,200,180,0.18)';
  ctx.font='bold 10px Courier New';ctx.textAlign='center';
  ctx.fillText('WOHNZIMMER',2.5*T,7.5*T);
  ctx.fillText('KÜCHE',20*T,7.5*T);
  ctx.fillText('FLUR',14*T,12.5*T);
  if(S.broken)ctx.fillText('MORDZIMMER',12*T,16.5*T);
  ctx.textAlign='left';
  // sofa
  ctx.fillStyle='#4a3a2a';ctx.fillRect(1.5*T,5.3*T,3*T,T*0.8);
  // tv
  const fl=Math.random()<0.5?'#4a4a6a':'#2a2a3a';
  ctx.fillStyle='#0a0a0a';ctx.fillRect(2*T,8.4*T,2*T,T*0.5);
  ctx.fillStyle=fl;ctx.fillRect(2.1*T,8.45*T,1.8*T,T*0.4);
  // kitchen counter
  ctx.fillStyle='#5a4a3a';ctx.fillRect(16.5*T,5.3*T,6.8*T,T*0.8);
  ctx.fillStyle='#2a2a2a';ctx.fillRect(18*T,5.5*T,T,T*0.5);
  ctx.fillStyle='#ff6633';ctx.fillRect(18.25*T,5.6*T,T*0.5,T*0.3);
  // closet
  const cl=P.closet;
  ctx.fillStyle='#3a2418';ctx.fillRect(cl.x-14,cl.y-16,28,32);
  ctx.strokeStyle='#120700';ctx.lineWidth=2;ctx.strokeRect(cl.x-14,cl.y-16,28,32);
  ctx.fillStyle='#120700';ctx.fillRect(cl.x-1,cl.y-14,2,28);
  ctx.fillStyle='#d4a060';ctx.fillRect(cl.x+8,cl.y-2,3,4);
  ctx.fillRect(cl.x-11,cl.y-2,3,4);
  ctx.lineWidth=1;
  // blood trail
  if(S.sawBlood){ctx.fillStyle='rgba(140,0,0,0.85)';
    const d=P.lockedDoor;
    for(let i=0;i<8;i++){ctx.beginPath();
      ctx.arc(d.x-2+Math.sin(i*1.3)*6,d.y-20-i*4,5-i*0.3,0,Math.PI*2);ctx.fill()}
    ctx.fillRect(d.x-5,d.y-14,10,16)}
  // body
  if(S.broken){ctx.fillStyle='#5a0505';ctx.beginPath();
    ctx.ellipse(12*T,16*T,22,12,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#888';ctx.fillRect(12*T-10,16*T-6,20,12);
    ctx.fillStyle='#e4c4a4';ctx.beginPath();
    ctx.arc(12*T+10,16*T,5,0,Math.PI*2);ctx.fill()}}

function drawChar(x,y,dir,col,evil){
  ctx.fillStyle='rgba(0,0,0,0.5)';ctx.beginPath();
  ctx.ellipse(x,y+9,11,4,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fill();
  let ox=0,oy=0;
  if(dir==='up')oy=-4;else if(dir==='down')oy=4;
  else if(dir==='left')ox=-4;else if(dir==='right')ox=4;
  ctx.fillStyle=evil?'#1a0000':'#fcd';
  ctx.beginPath();ctx.arc(x+ox,y+oy,4,0,Math.PI*2);ctx.fill();
  if(!evil){ctx.fillStyle='#1d3470';ctx.fillRect(x-7,y-11,14,3);
    ctx.fillStyle='#d4a02a';ctx.fillRect(x-1,y-10,2,2)}
  else{ctx.fillStyle='#ccc';ctx.fillRect(x+8,y-1,10,2);
    ctx.fillStyle='#a00';ctx.fillRect(x+16,y-1,2,2)}}

function drawFog(){
  const r=S.inCloset?0:(S.phase==='outside'?500:150);
  if(r===0)return;
  const g=ctx.createRadialGradient(S.px,S.py,30,S.px,S.py,r);
  g.addColorStop(0,'rgba(0,0,0,0)');
  g.addColorStop(0.65,'rgba(0,0,0,0.55)');
  g.addColorStop(1,'rgba(0,0,0,0.94)');
  ctx.fillStyle=g;ctx.fillRect(0,0,cv.width,cv.height)}

function draw(){
  ctx.fillStyle='#000';ctx.fillRect(0,0,cv.width,cv.height);
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)drawTile(c,r);
  drawObj();
  if(S.killer)drawChar(S.killer.x,S.killer.y,'down','#2a2a2a',true);
  if(!S.inCloset)drawChar(S.px,S.py,S.dir,'#3d5a8a',false);
  drawFog();
  if(S.inCloset){ctx.fillStyle='rgba(0,0,0,0.9)';
    ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle='#c00';ctx.font='bold 18px Courier New';ctx.textAlign='center';
    ctx.fillText('Im Kleiderschrank',cv.width/2,50);
    ctx.fillStyle='#aaa';ctx.font='13px Courier New';
    if(!S.killerLeft){ctx.fillText('Halte still. Kein Geräusch.',cv.width/2,80);
      ctx.fillText('Versteckt: '+S.hideTime.toFixed(1)+'s / '+S.needHide+'s',cv.width/2,110);
      const bw=200,bh=10;ctx.fillStyle='#222';ctx.fillRect(cv.width/2-bw/2,125,bw,bh);
      ctx.fillStyle='#c00';ctx.fillRect(cv.width/2-bw/2,125,bw*Math.min(1,S.hideTime/S.needHide),bh)}
    else{ctx.fillStyle='#5a5';ctx.fillText('Er ist weg. Drücke E zum Herauskommen.',cv.width/2,80)}
    ctx.textAlign='left'}}

function ui(){
  const m=document.getElementById('message'),p=document.getElementById('prompt'),
    ph=document.getElementById('phase-text');
  if(S.msg&&S.msgT>0){m.textContent=S.msg;m.style.display='block'}else m.style.display='none';
  S.prompt=null;
  if(!S.over){
    if(dist(P.closet)<32&&S.phase==='chase')S.prompt='E: Im Schrank verstecken';
    else if(S.inCloset&&S.killerLeft)S.prompt='E: Herauskommen';
    else if(dist(P.lockedDoor)<50&&S.phase==='exploring')S.prompt='E: Tür untersuchen';
    else if(dist(P.lockedDoor)<50&&S.phase==='sawBlood')S.prompt='E: Tür EINTRETEN';
    else if(dist(P.car)<45&&S.phase==='outsideEnd')S.prompt='E: Verstärkung rufen'}
  if(S.prompt){p.textContent=S.prompt;p.style.display='block'}else p.style.display='none';
  const lab={outside:'Ankunft',exploring:'Durchsuche das Haus',sawBlood:'Blutspur entdeckt',
    breaking:'Tür aufgebrochen',chase:'FLIEHE!',hiding:'Versteckt',
    escaping:'Raus hier!',outsideEnd:'Am Streifenwagen',ending:'Fall offen',dead:'Tot'};
  ph.textContent=lab[S.phase]||S.phase}

function loop(){
  if(S.msgT>0)S.msgT--;
  updPlayer();updKiller();
  if(S.inCloset&&!S.killerLeft)S.hideTime+=1/60;
  draw();ui();requestAnimationFrame(loop)}

window.addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();S.keys[k]=true;
  if(k==='e'||k===' ')interact();
  if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault()});
window.addEventListener('keyup',e=>{S.keys[e.key.toLowerCase()]=false});
document.getElementById('restart').addEventListener('click',()=>location.reload());

msg("22:47 — Lindenstraße 13. Fahre zum Haus. WASD/Pfeile = laufen, E = interagieren.",360);
loop();
