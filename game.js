const cv=document.getElementById('game');
const rn=new THREE.WebGLRenderer({canvas:cv,antialias:false});
rn.setPixelRatio(window.devicePixelRatio);rn.setSize(innerWidth,innerHeight);
const sc=new THREE.Scene();sc.background=new THREE.Color(0x000000);
sc.fog=new THREE.Fog(0x000000,2,28);
const cam=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,60);sc.add(cam);
sc.add(new THREE.AmbientLight(0x8a8880,1.2));
const moon=new THREE.DirectionalLight(0x88aaff,0.8);moon.position.set(10,30,10);sc.add(moon);
const fl=new THREE.SpotLight(0xfff1c0,6,22,Math.PI/5,0.4,1.2);
cam.add(fl);fl.target.position.set(0,0,-1);cam.add(fl.target);

const MAP=["#########################","#.......................#","#.......................#","#.......................#","############d############","#....#.........#........#","#....#.........#........#","#..............#........#","#....#..................#","#....#.........#........#","######.........##########","#.......................#","#.......................#","#.......................#","############D############","#.......................#","#.......................#","#.......................#","#########################"];
const COLS=25,ROWS=19,H=3;

const fMat=new THREE.MeshLambertMaterial({color:0x6a5a44});
const oMat=new THREE.MeshLambertMaterial({color:0x2a3050});
const bMat=new THREE.MeshLambertMaterial({color:0x4a2222});
const cMat=new THREE.MeshLambertMaterial({color:0x5a5044});
const wMat=new THREE.MeshLambertMaterial({color:0xa09890});
const dMat=new THREE.MeshLambertMaterial({color:0x7a4a1a});
const pg=new THREE.PlaneGeometry(1,1);
const bg=new THREE.BoxGeometry(1,H,1);

for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
  const m=new THREE.Mesh(pg,r<4?oMat:(r>=15?bMat:fMat));
  m.rotation.x=-Math.PI/2;m.position.set(c+0.5,0,r+0.5);sc.add(m);
  if(r>=4){const cm=new THREE.Mesh(pg,cMat);cm.rotation.x=Math.PI/2;cm.position.set(c+0.5,H,r+0.5);sc.add(cm)}
}
const lockedMeshes=[];
for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
  const t=MAP[r][c];
  if(t==='#'){const m=new THREE.Mesh(bg,wMat);m.position.set(c+0.5,H/2,r+0.5);sc.add(m)}
  else if(t==='D'){const m=new THREE.Mesh(bg,dMat);m.position.set(c+0.5,H/2,r+0.5);sc.add(m);lockedMeshes.push(m)}
}

const S={px:12.5,pz:2.5,py:1.6,yaw:Math.PI,pitch:0,keys:{},phase:'outside',sawBlood:false,broken:false,visited:new Set(),killer:null,inCloset:false,hideTime:0,needHide:7,killerLeft:false,msg:'',msgT:0,over:false};
cam.position.set(S.px,S.py,S.pz);cam.rotation.order='YXZ';

const P={living:{x:2.5,z:7},kitchen:{x:20,z:7},lockedDoor:{x:12.5,z:14.5},closet:{x:4,z:11.5},frontDoor:{x:12.5,z:4.5},car:{x:12.5,z:2}};
function D(p){return Math.hypot(S.px-p.x,S.pz-p.z)}

// Closet
const cg=new THREE.Group();
const cb=new THREE.Mesh(new THREE.BoxGeometry(0.9,2.3,0.6),new THREE.MeshLambertMaterial({color:0x3a2418}));
cb.position.y=1.15;cg.add(cb);
const cd=new THREE.Mesh(new THREE.BoxGeometry(0.02,2.2,0.55),new THREE.MeshLambertMaterial({color:0x120700}));
cd.position.set(0,1.15,0);cg.add(cd);
cg.position.set(P.closet.x,0,P.closet.z);sc.add(cg);

// Car
const carG=new THREE.Group();
const carB=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.55,1.8),new THREE.MeshLambertMaterial({color:0x1d3470}));
carB.position.y=0.27;carG.add(carB);
const carT=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.4,1),new THREE.MeshLambertMaterial({color:0x0d2050}));
carT.position.y=0.75;carG.add(carT);
const carL1=new THREE.PointLight(0xff0000,1,4);carL1.position.set(0,1.1,0);carG.add(carL1);
const carL2=new THREE.PointLight(0x0066ff,1,4);carL2.position.set(0,1.1,0);carG.add(carL2);
carG.position.set(P.car.x,0,P.car.z);sc.add(carG);

// Furniture
const sofa=new THREE.Mesh(new THREE.BoxGeometry(2,0.6,0.7),new THREE.MeshLambertMaterial({color:0x4a3a2a}));
sofa.position.set(2.5,0.3,5.8);sc.add(sofa);
const tv=new THREE.Mesh(new THREE.BoxGeometry(1.4,0.7,0.1),new THREE.MeshLambertMaterial({color:0x0a0a0a,emissive:0x223344,emissiveIntensity:0.8}));
tv.position.set(2.5,1,8.7);sc.add(tv);
const tvLight=new THREE.PointLight(0x4466aa,0.4,3);tvLight.position.set(2.5,1,8);sc.add(tvLight);
const counter=new THREE.Mesh(new THREE.BoxGeometry(5,0.9,0.8),new THREE.MeshLambertMaterial({color:0x5a4a3a}));
counter.position.set(19.5,0.45,5.8);sc.add(counter);
const stove=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.95,0.7),new THREE.MeshLambertMaterial({color:0x1a1a1a}));
stove.position.set(18,0.475,5.8);sc.add(stove);
const stoveL=new THREE.PointLight(0xff5522,0.6,2);stoveL.position.set(18,1.1,5.8);sc.add(stoveL);
const table=new THREE.Mesh(new THREE.BoxGeometry(1,0.8,0.6),new THREE.MeshLambertMaterial({color:0x4a3a2a}));
table.position.set(10,0.4,6);sc.add(table);
const cup=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.15,8),new THREE.MeshLambertMaterial({color:0xddccaa}));
cup.position.set(10,0.88,6);sc.add(cup);

// Body & blood
const body=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.35,1.8),new THREE.MeshLambertMaterial({color:0x666060}));
body.position.set(12.5,0.17,16);body.visible=false;sc.add(body);
const pool=new THREE.Mesh(new THREE.CircleGeometry(1.3,18),new THREE.MeshLambertMaterial({color:0x5a0505}));
pool.rotation.x=-Math.PI/2;pool.position.set(12.5,0.02,16);pool.visible=false;sc.add(pool);
const bloodTrail=[];
for(let i=0;i<6;i++){
  const b=new THREE.Mesh(new THREE.CircleGeometry(0.18,10),new THREE.MeshLambertMaterial({color:0x8a0000}));
  b.rotation.x=-Math.PI/2;b.position.set(12.5+Math.sin(i*0.8)*0.35,0.02,14.3-i*0.25);
  b.visible=false;sc.add(b);bloodTrail.push(b);
}

function spawnKiller(){
  const g=new THREE.Group();
  const b=new THREE.Mesh(new THREE.CapsuleGeometry(0.28,1.2,4,8),new THREE.MeshLambertMaterial({color:0x180808}));
  b.position.y=0.9;g.add(b);
  const h=new THREE.Mesh(new THREE.SphereGeometry(0.22,12,12),new THREE.MeshLambertMaterial({color:0x1a1000}));
  h.position.y=1.72;g.add(h);
  const k=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.06,0.4),new THREE.MeshLambertMaterial({color:0xcccccc}));
  k.position.set(0.3,1,0.2);g.add(k);
  const tip=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.07,0.05),new THREE.MeshLambertMaterial({color:0x990000}));
  tip.position.set(0.3,1,0.4);g.add(tip);
  g.position.set(12.5,0,16);sc.add(g);return g;
}

function msg(t,d){S.msg=t;S.msgT=d||200}

function canMove(x,z,rad){
  rad=rad||0.3;
  for(const[dx,dz]of[[-rad,-rad],[rad,-rad],[-rad,rad],[rad,rad]]){
    const col=Math.floor(x+dx),row=Math.floor(z+dz);
    if(row<0||row>=ROWS||col<0||col>=COLS)return false;
    const t=MAP[row][col];
    if(t==='#')return false;
    if(t==='D'&&!S.broken)return false;
  }
  return true;
}
function canMoveK(x,z){
  const col=Math.floor(x),row=Math.floor(z);
  if(row<0||row>=ROWS||col<0||col>=COLS)return false;
  const t=MAP[row][col];if(t==='#')return false;return true;
}

function upd(){
  if(S.msgT>0)S.msgT--;
  if(!S.over&&!S.inCloset){
    let dx=0,dz=0;const sp=0.065;
    if(S.keys.w||S.keys.arrowup){dx-=Math.sin(S.yaw)*sp;dz-=Math.cos(S.yaw)*sp}
    if(S.keys.s||S.keys.arrowdown){dx+=Math.sin(S.yaw)*sp;dz+=Math.cos(S.yaw)*sp}
    if(S.keys.a||S.keys.arrowleft){dx-=Math.cos(S.yaw)*sp;dz+=Math.sin(S.yaw)*sp}
    if(S.keys.d||S.keys.arrowright){dx+=Math.cos(S.yaw)*sp;dz-=Math.sin(S.yaw)*sp}
    if(canMove(S.px+dx,S.pz))S.px+=dx;
    if(canMove(S.px,S.pz+dz))S.pz+=dz;
    cam.position.set(S.px,S.py,S.pz);
    cam.rotation.set(S.pitch,S.yaw,0);

    if(S.phase==='outside'&&S.pz>5){S.phase='exploring';msg("Du betrittst das Haus. Die Luft ist stickig.",220)}
    if(S.phase==='exploring'){
      if(D(P.living)<2.5&&!S.visited.has('l')){S.visited.add('l');msg("WOHNZIMMER: leer. Fernseher flimmert ohne Ton. Eine zertretene Brille auf dem Teppich.",240)}
      if(D(P.kitchen)<2.5&&!S.visited.has('k')){S.visited.add('k');msg("KÜCHE: leer. Wasser kocht noch. Ein Messer fehlt aus dem Block.",240)}
    }
    if(S.phase==='breaking'&&S.pz>15&&!S.killer){
      S.killer=spawnKiller();S.phase='chase';
      msg("Der Killer dreht sich zu dir! LAUF! Kleiderschrank links im FLUR!",360);
    }
    if(S.phase==='escaping'&&S.pz<4){S.phase='outsideEnd';msg("Draußen im Regen. Rufe Verstärkung am STREIFENWAGEN!",260)}
  }

  if(S.killer){
    const k=S.killer,sp=0.045;
    if(S.killerLeft){
      const dx=P.frontDoor.x-k.position.x,dz=2-k.position.z,d=Math.hypot(dx,dz);
      if(d<0.5){sc.remove(k);S.killer=null;msg("Die Haustür schlägt zu. Stille.",260)}
      else{const nx=k.position.x+(dx/d)*sp,nz=k.position.z+(dz/d)*sp;
        if(canMoveK(nx,k.position.z))k.position.x=nx;
        if(canMoveK(k.position.x,nz))k.position.z=nz;
        k.rotation.y=Math.atan2(dx,dz);}
    }else if(S.inCloset){
      if(!k.userData.t||Math.hypot(k.position.x-k.userData.t.x,k.position.z-k.userData.t.z)<0.3)
        k.userData.t={x:6+Math.random()*14,z:11+Math.random()*3};
      const dx=k.userData.t.x-k.position.x,dz=k.userData.t.z-k.position.z,d=Math.hypot(dx,dz)||1;
      const nx=k.position.x+(dx/d)*sp*0.6,nz=k.position.z+(dz/d)*sp*0.6;
      if(canMoveK(nx,k.position.z))k.position.x=nx;
      if(canMoveK(k.position.x,nz))k.position.z=nz;
      k.rotation.y=Math.atan2(dx,dz);
      if(S.hideTime>=S.needHide){S.killerLeft=true;msg("Schritte entfernen sich. Ein Reißverschluss. Die Haustür...",260)}
    }else{
      const dx=S.px-k.position.x,dz=S.pz-k.position.z,d=Math.hypot(dx,dz);
      if(d<0.7){S.over=true;S.phase='dead';msg("Der Killer hat dich erwischt. GAME OVER. Klicke 'Neustart' (F5).",99999);}
      else{const nx=k.position.x+(dx/d)*sp,nz=k.position.z+(dz/d)*sp;
        if(canMoveK(nx,k.position.z))k.position.x=nx;
        if(canMoveK(k.position.x,nz))k.position.z=nz;
        k.rotation.y=Math.atan2(dx,dz);}
    }
  }

  if(S.inCloset&&!S.killerLeft)S.hideTime+=1/60;

  // Animations
  const t=Date.now()*0.005;
  carL1.intensity=Math.sin(t)>0?1:0.1;
  carL2.intensity=Math.sin(t)<0?1:0.1;
  tvLight.intensity=0.3+Math.random()*0.2;
  stoveL.intensity=0.5+Math.sin(Date.now()*0.01)*0.1;
}

let lastE=0;
function interact(){
  if(Date.now()-lastE<300||S.over)return;lastE=Date.now();
  if(D(P.closet)<1.2&&S.phase==='chase'){S.inCloset=true;S.phase='hiding';msg("Du schließt die Schranktür. Dein Herz dröhnt.",240);return}
  if(S.inCloset&&S.killerLeft){S.inCloset=false;S.phase='escaping';msg("Du trittst vorsichtig aus dem Schrank. Zur Haustür!",220);return}
  if(D(P.lockedDoor)<2&&(S.phase==='exploring'||S.phase==='sawBlood')){
    if(!S.sawBlood){S.sawBlood=true;S.phase='sawBlood';
      bloodTrail.forEach(m=>m.visible=true);
      msg("Die Tür ist abgeschlossen. BLUTSTREIFEN am Boden — frisch. Drücke E erneut zum EINTRETEN.",380);
    }else if(!S.broken){S.broken=true;S.phase='breaking';
      lockedMeshes.forEach(m=>m.visible=false);
      body.visible=true;pool.visible=true;
      msg("Du trittst die Tür ein! Sie kracht nach innen!",200);
      setTimeout(()=>msg("Eine Leiche. Darüber ein Mann mit blutiger Klinge. Geh hinein.",280),1800);
    }
    return;
  }
  if(D(P.car)<2&&S.phase==='outsideEnd'){S.phase='ending';S.over=true;
    msg("★ VERSTÄRKUNG! Blaulicht im Regen. Der Killer ist entkommen. Er läuft noch frei herum. ★",99999);return;
  }
}

document.addEventListener('mousemove',e=>{
  if(document.pointerLockElement===cv){
    S.yaw-=e.movementX*0.002;
    S.pitch-=e.movementY*0.002;
    S.pitch=Math.max(-Math.PI/2+0.1,Math.min(Math.PI/2-0.1,S.pitch));
  }
});
addEventListener('keydown',e=>{S.keys[e.key.toLowerCase()]=true;if(e.key.toLowerCase()==='e')interact()});
addEventListener('keyup',e=>{S.keys[e.key.toLowerCase()]=false});
addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();rn.setSize(innerWidth,innerHeight)});

const startOv=document.getElementById('start-overlay');
document.getElementById('start-btn').addEventListener('click',()=>{
  startOv.classList.add('hidden');cv.requestPointerLock();
  if(!S.msg)msg("22:47 — Lindenstraße 13. Finde die Person, die angerufen hat.",360);
});
document.addEventListener('pointerlockchange',()=>{
  if(document.pointerLockElement!==cv&&!S.over)startOv.classList.remove('hidden');
});

const msgEl=document.getElementById('message'),promptEl=document.getElementById('prompt'),phaseEl=document.getElementById('phase'),closetEl=document.getElementById('closet-view'),closetStat=document.getElementById('closet-status'),hideFill=document.getElementById('hide-fill');
const labels={outside:'Ankunft',exploring:'Durchsuche das Haus',sawBlood:'Blutspur entdeckt',breaking:'Tür aufgebrochen',chase:'FLIEHE!',hiding:'Versteckt',escaping:'Raus hier!',outsideEnd:'Am Streifenwagen',ending:'Fall offen',dead:'Tot'};

function ui(){
  if(S.msg&&S.msgT>0&&!S.inCloset){msgEl.textContent=S.msg;msgEl.style.display='block'}else msgEl.style.display='none';
  let pr=null;
  if(!S.over){
    if(D(P.closet)<1.2&&S.phase==='chase')pr='[E] Im Schrank verstecken';
    else if(S.inCloset&&S.killerLeft)pr='[E] Herauskommen';
    else if(D(P.lockedDoor)<2&&S.phase==='exploring')pr='[E] Tür untersuchen';
    else if(D(P.lockedDoor)<2&&S.phase==='sawBlood')pr='[E] Tür EINTRETEN';
    else if(D(P.car)<2&&S.phase==='outsideEnd')pr='[E] Verstärkung rufen';
  }
  if(pr){promptEl.textContent=pr;promptEl.style.display='block'}else promptEl.style.display='none';
  phaseEl.textContent=labels[S.phase]||S.phase;
  if(S.inCloset){closetEl.classList.add('active');
    if(S.killerLeft){closetStat.textContent='Er ist weg. Drücke E zum Herauskommen.';hideFill.style.width='100%'}
    else{closetStat.textContent='Halte still. Kein Geräusch. ('+S.hideTime.toFixed(1)+'s / '+S.needHide+'s)';hideFill.style.width=Math.min(100,(S.hideTime/S.needHide)*100)+'%'}
  }else closetEl.classList.remove('active');
}

function loop(){upd();rn.render(sc,cam);ui();requestAnimationFrame(loop)}
loop();
