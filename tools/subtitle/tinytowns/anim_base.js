<!doctype html><html><head><meta charset="utf-8">
<style>
@font-face{font-family:Galmuri;src:url(/fonts/node_modules/galmuri/dist/Galmuri11-Bold.woff2)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#000;font-family:Galmuri;-webkit-font-smoothing:none}
#gl{position:absolute;inset:0}
.ov{position:absolute;font-family:Galmuri;-webkit-font-smoothing:none}
.out6{text-shadow:6px 0 #1b1b1b,-6px 0 #1b1b1b,0 6px #1b1b1b,0 -6px #1b1b1b,6px 6px #1b1b1b,-6px 6px #1b1b1b,6px -6px #1b1b1b,-6px -6px #1b1b1b,0 12px #1b1b1b}
#cap{left:0;right:0;top:300px;text-align:center;font-size:84px;color:#FFE14D;line-height:1.25}
#cap .w{color:#fff}
.ov{display:none}
#rew{inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.2) 0 4px,transparent 4px 10px);}
#rew .tag{position:absolute;left:60px;top:560px;font-size:70px;color:#fff}
#rew .bar{position:absolute;left:0;right:0;top:1100px;height:40px;background:rgba(255,255,255,.35);filter:blur(2px)}
#lab{left:50%;top:560px;transform:translateX(-50%);background:#FFD84D;border:6px solid #3b2a12;border-radius:999px;padding:14px 36px;font-size:48px;color:#3b2a12;white-space:nowrap;box-shadow:0 8px 0 #3b2a12}
#info{left:70px;right:70px;top:560px;background:#FFF8E6;border:8px solid #3b2a12;border-radius:44px;padding:40px 40px 36px;text-align:center;color:#3b2a12;box-shadow:0 14px 0 rgba(59,42,18,.4)}
#info .k{font-size:36px;color:#8a6a2a}
#info .t{font-size:96px;margin:10px 0 18px;color:#2a2a2a}
#info .m{font-size:48px;line-height:1.6}
#info .st{color:#e8a400}
#info hr{border:0;border-top:6px dashed #d8c39a;margin:26px 0}
#info .shop{display:flex;align-items:center;justify-content:center;gap:22px;font-size:48px}
#info img{width:120px;height:120px}
.bub{position:absolute;font-family:Galmuri;-webkit-font-smoothing:none;background:#FFF8E6;border:6px solid #3b2a12;border-radius:34px;padding:16px 30px 14px;font-size:60px;color:#2a2a2a;white-space:nowrap;box-shadow:0 8px 0 rgba(59,42,18,.35)}
.bub .who{position:absolute;left:22px;top:-40px;color:#fff;font-size:30px;padding:4px 16px;border:5px solid #3b2a12;border-radius:999px}
.bub.small{font-size:48px;padding:10px 22px}
.bub:after{content:'';position:absolute;left:var(--tx,40px);bottom:-30px;border-left:16px solid transparent;border-right:16px solid transparent;border-top:28px solid #3b2a12}
.r{color:#e0393e}.b{color:#2f6fe0}.y{color:#b8860b}.gy{color:#6b6b6b}
.pop{position:absolute;font-family:Galmuri;font-size:48px;color:#ff4d4d;transform:translate(-50%,-50%)}
#score{left:60px;right:60px;bottom:300px;background:#FFF8E6;border:7px solid #3b2a12;border-radius:30px;padding:26px 40px;color:#2a2a2a;font-size:48px}
#score .row{display:flex;justify-content:space-between;margin:8px 0}
#name{left:0;right:0;top:560px;text-align:center}
#name span{display:inline-block;background:#FFD84D;border:6px solid #3b2a12;border-radius:999px;padding:10px 32px;font-size:48px;color:#3b2a12}
#talk{left:70px;right:70px;bottom:300px;background:#FFF8E6;border:7px solid #3b2a12;border-radius:40px;padding:40px 40px 34px;font-size:60px;color:#2a2a2a;text-align:center;box-shadow:0 10px 0 rgba(59,42,18,.35)}
#talk .who{position:absolute;left:50%;transform:translateX(-50%);top:-46px;background:#8a5cf6;color:#fff;font-size:36px;padding:6px 26px;border:6px solid #3b2a12;border-radius:999px}
#talk:after{content:'';position:absolute;left:120px;top:-34px;border-left:18px solid transparent;border-right:18px solid transparent;border-bottom:30px solid #3b2a12;display:none}
</style>
<script type="importmap">{"imports":{"three":"/fonts/node_modules/three/build/three.module.js"}}</script>
</head><body>
<div id="rew" class="ov"><div class="tag out6">◀◀ REWIND</div><div class="bar"></div></div>
<div id="cap" class="ov out6"></div>
<div id="lab" class="ov"></div>
<div id="score" class="ov"></div>
<div id="name" class="ov"><span>🧱 타이니타운</span></div>
<div id="pops"></div><div id="bubs"></div>
<div id="info" class="ov"><div class="k">오늘의 게임</div><div class="t">🧱 타이니타운</div><div class="m">👥 1~6인 · ⏱ 45분<br>난이도 <span class="st">★★</span></div><hr><div class="shop"><span>📍 멜팅다이스 보드게임카페</span></div></div>
<div id="talk" class="ov"><div class="who" id="twho"></div><div id="ttxt"></div></div>
<script type="module">
import * as THREE from 'three';
const W=1080,H=1920;
const R=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
R.setSize(W,H);R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;R.outputColorSpace=THREE.SRGBColorSpace;
R.domElement.id='gl';document.body.prepend(R.domElement);
const S=new THREE.Scene();
let seed=5;const rand=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
const rnd=a=>a[Math.floor(rand()*a.length)];
function tex(w,h,draw,rep){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);
 const t=new THREE.CanvasTexture(c);t.magFilter=t.minFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;
 if(rep){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rep[0],rep[1]);}return t;}
const px=(g,x,y,c)=>{g.fillStyle=c;g.fillRect(x,y,1,1);};
const L=(o)=>new THREE.MeshLambertMaterial(o);
const OUTM=new THREE.MeshBasicMaterial({color:0x15120f,side:THREE.BackSide});
// box with black inverted-hull outline (pixel-game edge)
function box(w,h,d,mat,x,y,z,par,t=0.045,out=true){t*=0.65;const g=new THREE.BoxGeometry(w,h,d);const m=new THREE.Mesh(g,mat);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;
 if(out){const o=new THREE.Mesh(g,OUTM);o.scale.set((w+2*t)/w,(h+2*t)/h,(d+2*t)/d);m.add(o);}
 if(par)par.add(m);return m;}

// ---------- block textures (16px, darker rim like voxel games)
function blockTex(cols,rim){return tex(16,16,(g)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)px(g,x,y,rnd(cols));
 if(rim){g.fillStyle=rim;g.globalAlpha=0.35;g.fillRect(0,15,16,1);g.fillRect(15,0,1,16);g.globalAlpha=1;}});}
const T={};
T.grassTop=blockTex(['#7cbd4a','#71b343','#86c652','#6aa83e','#79b94a']);
T.grassSide=tex(16,16,(g)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)px(g,x,y,rnd(['#8b5e34','#7a5230','#94673c','#6f4a2a']));
 for(let x=0;x<16;x++){const d=3+Math.floor(rand()*3);for(let y=0;y<d;y++)px(g,x,y,rnd(['#7cbd4a','#71b343','#86c652']));}});
T.path=tex(16,16,(g)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)px(g,x,y,rnd(['#b08a52','#a27e4a','#bb955c','#99764a','#c19b62']));});
T.cobble=tex(16,16,(g)=>{g.fillStyle='#5d5d5d';g.fillRect(0,0,16,16);
 const stones=[[0,0,5,4],[5,0,6,3],[11,0,5,5],[0,4,4,5],[4,3,5,5],[9,3,3,4],[12,5,4,4],[0,9,6,4],[6,8,4,5],[10,9,6,3],[0,13,4,3],[4,13,7,3],[11,12,5,4]];
 for(const [x,y,w,h] of stones){const c=rnd(['#8f8f8f','#9b9b9b','#848484','#a5a5a5']);g.fillStyle=c;g.fillRect(x+0.5,y+0.5,w-1,h-1);
  g.fillStyle='rgba(255,255,255,.18)';g.fillRect(x+1,y+1,w-2,1);g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x+1,y+h-2,w-2,1);}});
T.plank=tex(16,16,(g)=>{for(let r=0;r<4;r++){const base=rnd(['#b8945f','#ad8a56','#c29d66']);for(let y=r*4;y<r*4+4;y++)for(let x=0;x<16;x++)px(g,x,y,rand()<0.12?'#9c7a48':base);
 g.fillStyle='#7d5f36';g.fillRect(0,r*4+3,16,1);g.fillRect(r%2?4:11,r*4,1,3);}});
T.log=tex(16,16,(g)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)px(g,x,y,(x%4===0)?'#4e3a22':rnd(['#6b5030','#5e4529','#735535']));});
T.logTop=tex(16,16,(g)=>{g.fillStyle='#6b5030';g.fillRect(0,0,16,16);g.fillStyle='#b8945f';g.fillRect(1,1,14,14);g.strokeStyle='#9a7a4a';g.strokeRect(3.5,3.5,9,9);g.strokeRect(6.5,6.5,3,3);});
T.leaf=tex(16,16,(g)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)px(g,x,y,rnd(['#3f8f2f','#4a9e37','#357d28','#56ad40','#2e6e22']));});
T.brick=tex(16,16,(g)=>{g.fillStyle='#b8ada0';g.fillRect(0,0,16,16);for(let r=0;r<4;r++){const off=r%2?4:0;for(let c=-1;c<3;c++){g.fillStyle=rnd(['#9e4a36','#a8523c','#934330']);g.fillRect(c*8+off,r*4,7,3);}}});
T.roof=tex(16,16,(g)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)px(g,x,y,rnd(['#b33a2c','#a63426','#c04232']));g.fillStyle='#7d2219';for(let y=3;y<16;y+=4)g.fillRect(0,y,16,1);});
T.glass=tex(16,16,(g)=>{g.fillStyle='#cfefff';g.fillRect(0,0,16,16);g.fillStyle='#ffffff';g.fillRect(0,0,16,1);g.fillRect(0,0,1,16);g.fillStyle='#e8f8ff';g.fillRect(3,3,3,1);g.fillRect(3,4,1,2);g.fillRect(10,10,1,3);g.fillStyle='#8fbfd6';g.fillRect(15,0,1,16);g.fillRect(0,15,16,1);});
T.door=tex(16,32,(g)=>{for(let y=0;y<32;y++)for(let x=0;x<16;x++)px(g,x,y,rnd(['#7a5530','#704d2b','#835c34']));g.fillStyle='#5a3d20';g.fillRect(0,0,16,1);g.fillRect(0,15,16,1);g.fillRect(0,31,16,1);g.fillStyle='#cfefff';g.fillRect(3,3,4,4);g.fillRect(9,3,4,4);g.fillStyle='#333';g.fillRect(12,18,2,2);});
T.wool=(c)=>blockTex([c,new THREE.Color(c).offsetHSL(0,0,-0.04).getStyle(),new THREE.Color(c).offsetHSL(0,0,0.03).getStyle()]);
T.lantern=tex(8,8,(g)=>{g.fillStyle='#2b2b2b';g.fillRect(0,0,8,8);g.fillStyle='#ffd36b';g.fillRect(2,2,4,4);g.fillStyle='#fff3c4';g.fillRect(3,3,2,2);});
T.fence=T.plank;
const sky=tex(1,64,(g)=>{const gr=g.createLinearGradient(0,0,0,64);gr.addColorStop(0,'#6cb6f5');gr.addColorStop(1,'#cbe9ff');g.fillStyle=gr;g.fillRect(0,0,1,64);});
S.background=sky;S.fog=new THREE.Fog(0xcbe9ff,45,120);
S.add(new THREE.HemisphereLight(0xffffff,0x9cc070,1.7));
const sun=new THREE.DirectionalLight(0xfff1d6,2.1);sun.position.set(-14,26,18);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-25,right:25,top:25,bottom:-25,far:120});sun.shadow.bias=-0.0006;S.add(sun);

const OUT=new THREE.Group();S.add(OUT);const ROOM=new THREE.Group();S.add(ROOM);
// ---------- ground
const G0=new THREE.Mesh(new THREE.PlaneGeometry(240,240),L({map:tex(16,16,(g)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)px(g,x,y,rnd(['#7cbd4a','#71b343','#86c652','#6aa83e','#79b94a']));},[240,240])}));
G0.rotation.x=-Math.PI/2;G0.receiveShadow=true;OUT.add(G0);

// ---------- village layout: 4x4 lots of 5 blocks, roads of 2 blocks
const LOT=5,RD=2,STEP=LOT+RD;const lp=(i,j)=>new THREE.Vector3((i-1.5)*STEP,0,(j-1.5)*STEP);
const span=4*STEP+RD;
const pathMat=L({map:T.path});
for(let k=0;k<=4;k++){const c=(k-2)*STEP;
 const a=new THREE.Mesh(new THREE.BoxGeometry(span,0.12,RD),pathMat);a.position.set(0,0.0,c);a.receiveShadow=true;OUT.add(a);
 const b=new THREE.Mesh(new THREE.BoxGeometry(RD,0.121,span),pathMat);b.position.set(c,0.0,0);b.receiveShadow=true;OUT.add(b);}
const grassMats=[L({map:T.grassSide}),L({map:T.grassSide}),L({map:T.grassTop}),L({map:T.grassSide}),L({map:T.grassSide}),L({map:T.grassSide})];
for(let i=0;i<4;i++)for(let j=0;j<4;j++){const p=lp(i,j);box(LOT,0.5,LOT,grassMats,p.x,0.25,p.z,OUT,0.03);}

// ---------- pieces
const M={cobble:L({map:T.cobble}),plank:L({map:T.plank}),leaf:L({map:T.leaf}),brick:L({map:T.brick}),roof:L({map:T.roof}),glass:L({map:T.glass}),door:L({map:T.door}),lantern:L({map:T.lantern,emissive:0x664400})};
const logM=[L({map:T.log}),L({map:T.log}),L({map:T.logTop}),L({map:T.logTop}),L({map:T.log}),L({map:T.log})];
function stonePile(i,j){const p=lp(i,j);const G=new THREE.Group();
 const h=[[1,2,2,1,0],[2,3,3,2,1],[2,3,3,3,1],[1,2,3,2,1],[0,1,1,1,0]];
 for(let a=0;a<5;a++)for(let b=0;b<5;b++){const n=Math.max(0,h[a][b]+(rand()<0.25?1:0)-(rand()<0.2?1:0));for(let y=0;y<n;y++)box(1,1,1,M.cobble,a-2,0.5+0.5+y,b-2,G,0.035);}
 G.position.set(p.x,0,p.z);G.rotation.y=rand()<0.5?0:Math.PI/2;return G;}
function cottage(i,j){const p=lp(i,j);const G=new THREE.Group();
 // walls (planks) with log corners
 for(let y=0;y<3;y++)for(let a=-1;a<=1;a++){for(const z of [-1.5,1.5])box(1,1,0.01+1,M.plank,a,1+y,z*1,G,0.03);for(const x of [-1.5,1.5])box(1,1,1,M.plank,x,1+y,a,G,0.03);}
 for(const [x,z] of [[-2,-2],[2,-2],[-2,2],[2,2]])for(let y=0;y<3;y++)box(1,1,1,logM,x,1+y,z,G,0.03);
 // door & window
 box(1,2,0.15,M.door,-0.6,1.5,2.52,G,0.03);box(1,1,0.15,M.glass,1,2,2.52,G,0.03);
 // stepped roof
 for(let s=0;s<3;s++){box(5.4-s*1.6,0.6,6.0,M.roof,0,4.0+s*0.6,0,G,0.04);}
 box(1,1.6,1,M.brick,1.4,5.6,-1.2,G,0.035);
 G.position.set(p.x,0,p.z);return G;}
function tree(x,z,s=1){const G=new THREE.Group();for(let y=0;y<4;y++)box(1,1,1,logM,0,0.5+y,0,G,0.035);
 box(5,2,5,M.leaf,0,4.6,0,G,0.05);box(3,1,3,M.leaf,0,6.1,0,G,0.05);G.position.set(x,0,z);G.scale.setScalar(s);OUT.add(G);}
function lampPost(x,z){const G=new THREE.Group();for(let y=0;y<3;y++)box(0.35,1,0.35,M.plank,0,0.5+y,0,G,0.03);box(0.7,0.7,0.7,M.lantern,0,3.35,0,G,0.04);G.position.set(x,0,z);OUT.add(G);}
function fenceRow(x0,z0,len,alongX){for(let k=0;k<=len;k+=1){const x=alongX?x0+k:x0,z=alongX?z0:z0+k;box(0.3,1.2,0.3,M.plank,x,0.6,z,OUT,0.03);
  if(k<len){const mx=alongX?x+0.5:x,mz=alongX?z:z+0.5;box(alongX?1:0.18,0.18,alongX?0.18:1,M.plank,mx,0.85,mz,OUT,0.02);box(alongX?1:0.18,0.18,alongX?0.18:1,M.plank,mx,0.45,mz,OUT,0.02);}}}

// ---------- characters (blocky, Minecraft-like proportions but chibi)
function faceTex(skin,hair,eye,mood){return tex(16,16,(g)=>{g.fillStyle=skin;g.fillRect(0,0,16,16);
 g.fillStyle=hair;g.fillRect(0,0,16,3);g.fillRect(0,3,2,3);g.fillRect(14,3,2,3);g.fillRect(4,3,3,1);g.fillRect(10,3,2,1);
 const k='#1d1d1d';g.fillStyle=k;
 if(mood==='sad'){g.fillRect(4,7,2,3);g.fillRect(10,7,2,3);g.fillRect(5,5,1,1);g.fillRect(3,6,2,1);g.fillRect(10,5,1,1);g.fillRect(11,6,2,1);g.fillStyle='#fff';g.fillRect(4,7,1,1);g.fillRect(10,7,1,1);
  g.fillStyle=k;g.fillRect(6,12,4,1);g.fillRect(5,13,1,1);g.fillRect(10,13,1,1);g.fillStyle='#5fb6f2';g.fillRect(12,10,1,2);}
 else if(mood==='shock'){g.fillRect(4,6,2,3);g.fillRect(10,6,2,3);g.fillStyle='#fff';g.fillRect(4,6,1,1);g.fillRect(10,6,1,1);g.fillStyle='#7a2b2b';g.fillRect(6,11,4,3);g.fillStyle='#e86a6a';g.fillRect(7,13,2,1);}
 else if(mood==='happy'){g.fillRect(3,8,1,1);g.fillRect(4,7,2,1);g.fillRect(6,8,1,1);g.fillRect(9,8,1,1);g.fillRect(10,7,2,1);g.fillRect(12,8,1,1);g.fillStyle='#7a2b2b';g.fillRect(6,11,4,2);g.fillStyle='#e86a6a';g.fillRect(7,12,2,1);}
 else{g.fillRect(4,7,2,2);g.fillRect(10,7,2,2);g.fillRect(6,12,4,1);}
 g.fillStyle='#f29a9a';g.fillRect(2,10,2,1);g.fillRect(12,10,2,1);});}
function sideTex(skin,hair){return tex(8,8,(g)=>{g.fillStyle=skin;g.fillRect(0,0,8,8);g.fillStyle=hair;g.fillRect(0,0,8,3);g.fillRect(5,3,3,3);});}
function solid(c){return tex(8,8,(g)=>{for(let y=0;y<8;y++)for(let x=0;x<8;x++)px(g,x,y,rand()<0.3?new THREE.Color(c).offsetHSL(0,0,0.04).getStyle():c);});}
function armTex(shirt,skin){return tex(4,12,(g)=>{for(let y=0;y<12;y++)for(let x=0;x<4;x++)px(g,x,y,y<7?(rand()<0.25?new THREE.Color(shirt).offsetHSL(0,0,-0.05).getStyle():shirt):skin);});}
function legTex(pants,shoe){return tex(4,12,(g)=>{for(let y=0;y<12;y++)for(let x=0;x<4;x++)px(g,x,y,y<9?(rand()<0.25?new THREE.Color(pants).offsetHSL(0,0,-0.05).getStyle():pants):shoe);});}
function shirtTex(shirt){return tex(8,12,(g)=>{for(let y=0;y<12;y++)for(let x=0;x<8;x++)px(g,x,y,rand()<0.25?new THREE.Color(shirt).offsetHSL(0,0,-0.05).getStyle():shirt);
 g.fillStyle=new THREE.Color(shirt).offsetHSL(0,0,-0.15).getStyle();g.fillRect(2,0,4,1);g.fillRect(3,1,2,1);g.fillStyle='#4a3524';g.fillRect(0,8,8,1);});}
function villager({shirt,pants='#3c5a8a',hair='#4a2f1c',skin='#e9b48a',eye='#3a7bd5',mood='sad',sweat=false,ry=0,seated=false}){
 const G=new THREE.Group();const s=0.25;// 1 px = 0.25 block-ish units
 const legM=L({map:legTex(pants,'#3a3a3a')});
 for(const x of [-0.27,0.27]){if(seated){box(0.5,0.5,0.95,legM,x,0.72,0.3,G,0.03);box(0.5,0.75,0.5,legM,x,0.35,0.78,G,0.03);}else box(0.5,0.95,0.5,legM,x,0.475,0,G,0.03);}
 const sm=L({map:shirtTex(shirt)});box(1.05,1.15,0.55,sm,0,0.95+0.575,0,G,0.035);
 const am=L({map:armTex(shirt,skin)});const arms=[];
 for(const sx of [-1,1]){const A=new THREE.Group();A.position.set(sx*0.78,2.0,0);box(0.48,1.15,0.48,am,0,-0.5,0,A,0.03);G.add(A);arms.push(A);}
 const sk=L({map:sideTex(skin,hair)}),top=L({map:solid(hair)}),fc=L({map:faceTex(skin,hair,eye,mood)}),bot=L({map:solid(skin)});
 const head=box(1.4,1.4,1.4,[sk,sk,top,bot,fc,top],0,2.1+0.7,0,G,0.045);
 // hair overlay layer (hat layer)
 const hm=L({map:solid(hair)});box(1.52,0.32,1.52,hm,0,2.1+1.4-0.1,0,G,0.035);box(1.52,0.9,0.14,hm,0,2.1+0.95,-0.71,G,0.03);
 if(sweat){box(0.16,0.26,0.1,L({color:0x7fd0ff}),0.8,3.15,0.5,G,0.02);}
 G.userData.arms=arms;G.rotation.y=ry;return G;}


for(const [a,b] of [[-1,1],[0,1],[1,1],[-1,0],[0,0],[1,0],[-1,-1],[0,-1]])lampPost(a*STEP+1.45,b*STEP+1.45);
fenceRow(-span/2,span/2+0.8,span,true);fenceRow(-span/2-0.8,-span/2,span,false);fenceRow(span/2+0.8,-span/2,span,false);fenceRow(-span/2,-span/2-0.8,span,true);
seed=21;for(let k=0;k<22;k++){const a=rand()*Math.PI*2,r=22+rand()*18;tree(Math.cos(a)*r,Math.sin(a)*r,0.9+rand()*0.4);}
tree(-9,-22,0.9);tree(10,-24,1.0);
// ================= v3 scenes =================
const DYN={g:new THREE.Group()};S.add(DYN.g);
const add=(o)=>{DYN.g.add(o);return o;};
function hayTex(){return tex(16,16,(g)=>{g.fillStyle='#d9b23c';g.fillRect(0,0,16,16);for(let x=0;x<16;x+=2){g.fillStyle=rnd(['#c79f2c','#e6c457','#b8901f']);g.fillRect(x,0,1,16);}g.fillStyle='#8a6a1c';g.fillRect(0,4,16,1);g.fillRect(0,11,16,1);});}
M.hay=L({map:hayTex()});
function lotGroup(i,j){const p=lp(i,j);const G=new THREE.Group();G.position.set(p.x,0,p.z);return G;}
function hayPile(i,j){const G=lotGroup(i,j);for(const [a,b,y] of [[-1,-1,0],[0,-1,0],[1,-1,0],[-1,0,0],[0,0,0],[1,0,0],[0,0,1],[-1,1,0],[0,1,0]])box(1,1,1,M.hay,a,1+y,b,G,0.035);return G;}
function glassPile(i,j){const G=lotGroup(i,j);for(let a=-1;a<=1;a++)for(let y=0;y<2;y++)box(1,1,0.25,M.glass,a,1+y,0,G,0.03);box(3.4,0.3,1.2,M.plank,0,0.65,0,G,0.03);return G;}
function logPile(i,j){const G=lotGroup(i,j);for(let r=0;r<3;r++)for(let c=0;c<3-r;c++)box(1,1,3,logM,(c-(2-r)/2)*1.0,1+r,0,G,0.035);return G;}
function brickPile(i,j){const G=lotGroup(i,j);for(let a=-1;a<=1;a++)for(let b=-1;b<=0;b++)box(1,1,1,M.brick,a,1,b+0.5,G,0.035);box(1,1,1,M.brick,0,2,0,G,0.035);return G;}
function chapel(i,j){const G=lotGroup(i,j);for(let y=0;y<4;y++)for(let a=-2;a<=2;a++)for(const b of [-2,2]){box(1,1,1,M.cobble,a,1+y,b,G,0.03);box(1,1,1,M.cobble,b,1+y,a,G,0.03);}
 for(let s=0;s<3;s++)box(5.4-s*1.7,0.7,5.4-s*1.7,L({map:tex(16,16,(g)=>{for(let y=0;y<16;y++)for(let x=0;x<16;x++)px(g,x,y,rnd(['#3b5fa8','#34539a','#4569b5']));})}),0,5.0+s*0.7,0,G,0.04);
 box(1,2,0.2,M.door,0,1.5,2.55,G,0.03);box(1,1,0.2,M.glass,-1.4,3,2.55,G,0.03);box(1,1,0.2,M.glass,1.4,3,2.55,G,0.03);return G;}
const pileOf={stone:(i,j)=>stonePile(i,j),wood:logPile,wheat:hayPile,glass:glassPile,brick:brickPile};
function village(layout,builds){const G=new THREE.Group();for(const [t,i,j] of layout)G.add(pileOf[t](i,j));for(const [k,i,j] of builds)G.add(k==='chapel'?chapel(i,j):cottage(i,j));return add(G);}
function person(o,x,z,sc=0.52){const v=villager(o);v.scale.setScalar(sc);v.position.set(x,0.06,z);return add(v);}
// player hand from the sky (blocky, outlined)
function hand(sleeve,x,y,z,s=1){const G=new THREE.Group();const sk=L({color:0xe9b48a});
 box(2.0,5,2.0,L({map:solid(sleeve)}),0,3.6,0,G,0.05);box(2.2,0.5,2.2,L({color:0xf4f4f4}),0,1.0,0,G,0.04);
 box(1.9,1.4,1.4,sk,0,0.05,0,G,0.04);for(let k=0;k<4;k++)box(0.4,1.0,0.45,sk,(k-1.5)*0.48,-1.1,0.35,G,0.03);
 const th=box(0.45,0.85,0.5,sk,-1.1,-0.25,0.3,G,0.03);th.rotation.z=0.6;
 G.position.set(x,y,z);G.scale.setScalar(s);return add(G);}
function sparkle(c,n=20,r=3.2){for(let k=0;k<n;k++){const a=k/n*Math.PI*2;const m=box(0.35,0.35,0.35,L({color:k%2?0xffe14d:0xffffff,emissive:k%2?0x886600:0x777777}),c.x+Math.cos(a)*r*(0.8+rand()*0.4),1.5+rand()*4,c.z+Math.sin(a)*r*(0.8+rand()*0.4),DYN.g,0.03);m.rotation.set(rand(),rand(),rand());}}
// ---- room (block style)
(function(){
 const fl=new THREE.Mesh(new THREE.PlaneGeometry(60,60),L({map:tex(16,16,(g)=>{for(let r=0;r<4;r++){const base=rnd(['#a8743f','#9c6a38','#b47d46']);for(let y=r*4;y<r*4+4;y++)for(let x=0;x<16;x++)px(g,x,y,rand()<0.1?'#8a5a30':base);g.fillStyle='#6e4626';g.fillRect(0,r*4+3,16,1);g.fillRect(r%2?5:12,r*4,1,3);}},[30,30])}));
 fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;ROOM.add(fl);
 const wp=tex(16,16,(g)=>{g.fillStyle='#efe0bf';g.fillRect(0,0,16,16);for(let k=0;k<26;k++)px(g,Math.floor(rand()*16),Math.floor(rand()*16),rnd(['#e6d3ad','#f5e8cc']));g.fillStyle='#e2cb9c';g.fillRect(0,0,1,16);g.fillRect(8,0,1,16);},[16,8]);
 const wl=new THREE.Mesh(new THREE.PlaneGeometry(40,20),L({map:wp}));wl.position.set(0,10,-6);ROOM.add(wl);
 for(let x=-20;x<20;x+=1)box(1,0.6,0.3,M.plank,x+0.5,0.3,-5.85,ROOM,0.02);
 // window
 box(5.2,4.2,0.3,M.plank,4.5,6.4,-5.9,ROOM,0.04);const wg=new THREE.Mesh(new THREE.PlaneGeometry(4.4,3.4),L({map:sky,emissive:0x335577}));wg.position.set(4.5,6.4,-5.7);ROOM.add(wg);
 box(0.25,3.4,0.2,M.plank,4.5,6.4,-5.65,ROOM,0.02);box(4.4,0.25,0.2,M.plank,4.5,6.4,-5.65,ROOM,0.02);
 // shelf + boxes
 const sh=new THREE.Group();for(let r=0;r<3;r++){box(5,0.25,1.2,M.plank,0,r*1.6,0,sh,0.03);let x=-2.3;while(x<2.1){const w=0.4+rand()*0.4,hh=0.9+rand()*0.5;box(w,hh,1.0,L({color:new THREE.Color().setHSL(rand(),0.5,0.55)}),x+w/2,r*1.6+0.12+hh/2,0,sh,0.025);x+=w+0.05;}}
 box(0.25,5,1.2,M.plank,-2.6,2.0,0,sh,0.03);box(0.25,5,1.2,M.plank,2.6,2.0,0,sh,0.03);sh.position.set(-5,1.0,-5.2);ROOM.add(sh);
 // table
 box(5.6,0.3,4.0,M.plank,0,1.55,0.6,ROOM,0.04);for(const [x,z] of [[-2.5,-1.1],[2.5,-1.1],[-2.5,2.3],[2.5,2.3]])box(0.35,1.4,0.35,M.plank,x,0.7,z,ROOM,0.03);
})();
function chair(x,z,ry){const G=new THREE.Group();box(1.4,0.22,1.3,M.plank,0,0.72,0,G,0.03);box(1.4,1.4,0.2,M.plank,0,1.5,-0.58,G,0.03);
 for(const [a,b] of [[-0.55,-0.5],[0.55,-0.5],[-0.55,0.5],[0.55,0.5]])box(0.16,0.72,0.16,M.plank,a,0.36,b,G,0.02);G.position.set(x,0,z);G.rotation.y=ry;return add(G);}
function miniBoard(layout,builds,x,z,ry=0){const G=new THREE.Group();box(2.0,0.08,2.0,L({color:0x3e6b2f}),0,0.04,0,G,0.02);
 const q=(i,j)=>[(i-1.5)*0.47,(j-1.5)*0.47];for(let i=0;i<4;i++)for(let j=0;j<4;j++){const [a,b]=q(i,j);box(0.4,0.03,0.4,L({map:T.grassTop}),a,0.095,b,G,0.0);}
 const col={stone:M.cobble,wood:M.plank,wheat:M.hay,brick:M.brick,glass:M.glass};
 for(const [t,i,j] of layout){const [a,b]=q(i,j);box(0.26,0.26,0.26,col[t],a,0.24,b,G,0.012);}
 for(const [k,i,j] of builds){const [a,b]=q(i,j);if(k==='chapel'){box(0.3,0.36,0.3,M.cobble,a,0.29,b,G,0.012);box(0.34,0.12,0.34,L({color:0x3b5fa8}),a,0.52,b,G,0.012);}
  else{box(0.3,0.24,0.3,M.plank,a,0.23,b,G,0.012);box(0.34,0.12,0.34,M.roof,a,0.41,b,G,0.012);}}
 G.position.set(x,1.72,z);G.rotation.y=ry;return add(G);}

// ---- overlays
function clear(){S.remove(DYN.g);DYN.g=new THREE.Group();S.add(DYN.g);document.querySelectorAll('.ov').forEach(e=>e.style.display='none');
 document.getElementById('pops').innerHTML='';document.getElementById('bubs').innerHTML='';const c=document.getElementById('cap');c.style.top='300px';c.style.fontSize='84px';}
function show(id,html){const e=document.getElementById(id);if(html!==undefined)e.innerHTML=html;e.style.display='block';return e;}
function bub(who,col,txt,x,y,small,tx){const d=document.createElement('div');d.className='bub'+(small?' small':'');d.innerHTML='<div class="who" style="background:'+col+'">'+who+'</div>'+txt;
 d.style.left=x+'px';d.style.top=y+'px';if(tx)d.style.setProperty('--tx',tx+'px');document.getElementById('bubs').appendChild(d);}
function pop(cam,v3,txt){const p=v3.clone().project(cam);const d=document.createElement('div');d.className='pop out6';d.textContent=txt;d.style.left=((p.x+1)/2*W)+'px';d.style.top=((1-p.y)/2*H)+'px';document.getElementById('pops').appendChild(d);}
function envOut(){OUT.visible=true;ROOM.visible=false;S.background=sky;S.fog=new THREE.Fog(0xcbe9ff,55,140);}
function envRoom(){OUT.visible=false;ROOM.visible=true;S.background=new THREE.Color(0x2a1d14);S.fog=null;}

const finalLayout=[['stone',0,0],['stone',1,0],['wood',2,0],['stone',3,0],['stone',0,1],['stone',2,1],['stone',3,1],['wheat',0,2],['stone',1,2],['stone',2,2],['glass',3,2],['stone',0,3],['stone',1,3],['stone',2,3],['stone',3,3]];
const finalBuild=[['cottage',1,1]];
const fALayout=[['brick',0,3],['wheat',3,3]],fABuild=[['chapel',1,1],['cottage',0,0],['cottage',2,0],['cottage',2,2],['cottage',0,2],['cottage',3,1],['cottage',1,3]];
const fBLayout=[['wood',3,3],['glass',0,0]],fBBuild=[['chapel',2,1],['cottage',1,0],['cottage',0,2],['cottage',2,3],['cottage',3,0]];
const CA='#f08a5b',CB='#3fa77f',CME='#8a5cf6';
const cam=new THREE.PerspectiveCamera(48,W/H,0.1,400);
const streetCam=()=>{cam.fov=48;cam.updateProjectionMatrix();cam.position.set(-1.2,6.2,24);cam.lookAt(0.3,1.6,3);};
const skyCam=()=>{cam.fov=44;cam.updateProjectionMatrix();cam.position.set(0,30,44);cam.lookAt(0,5.5,0);};
const P={};
