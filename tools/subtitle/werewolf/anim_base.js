<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="/fonts/node_modules/@fontsource/jua/index.css"><link rel="stylesheet" href="/fonts/node_modules/@fontsource/black-han-sans/index.css">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#1a1410}
svg{display:block}
</style></head><body>
<svg id="s" width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg"></svg>
<script>
const F=+(new URLSearchParams(location.search).get('f')||1);
const S=document.getElementById('s');
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
// --- defs: paper grain, drop shadows, brass pin gradient
const defs=`<defs>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0.55 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
<filter id="fiber" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.08" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.10 0"/></filter>
<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="9" dy="12" stdDeviation="7" flood-color="#1b120a" flood-opacity=".42"/></filter>
<filter id="shs" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="5" dy="7" stdDeviation="4" flood-color="#1b120a" flood-opacity=".38"/></filter>
<filter id="shd" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="14" dy="18" stdDeviation="12" flood-color="#000" flood-opacity=".5"/></filter>
<radialGradient id="brass" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff3c2"/><stop offset=".45" stop-color="#d9a93c"/><stop offset="1" stop-color="#7d5a14"/></radialGradient>
<linearGradient id="stick" x1="0" x2="1"><stop offset="0" stop-color="#b98a52"/><stop offset=".5" stop-color="#e2bd86"/><stop offset="1" stop-color="#a9783f"/></linearGradient>
<radialGradient id="spot" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset=".6" stop-color="#fff6d8" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
<pattern id="board" width="1080" height="70" patternUnits="userSpaceOnUse"><rect width="1080" height="70" fill="#9a6a3c"/><rect y="66" width="1080" height="4" fill="#5e3d1f"/><rect x="310" width="4" height="70" fill="#6e4825"/><rect x="760" width="4" height="70" fill="#6e4825"/></pattern>
</defs>`;
// --- helpers
const cut=(inner,f='sh',t='')=>`<g filter="url(#${f})" ${t?`transform="${t}"`:''}>${inner}</g>`;
const rim=(d,fill,w=9,extra='')=>`<path d="${d}" fill="${fill}" stroke="#fbf5e6" stroke-width="${w}" stroke-linejoin="round" paint-order="stroke" ${extra}/>`;
const pin=(x,y,r=9)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#brass)" stroke="#5a3e0c" stroke-width="1.5"/><circle cx="${x-2.5}" cy="${y-2.5}" r="${r*0.28}" fill="#fff8dc" opacity=".8"/>`;
const ink='#2b2320';
function blob(cx,cy,rx,ry,n=18,j=0.05){let p='';for(let i=0;i<=n;i++){const a=i/n*Math.PI*2;const k=1+(rnd()-0.5)*j*2;const x=cx+Math.cos(a)*rx*k,y=cy+Math.sin(a)*ry*k;p+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}return p+'Z';}
function wob(pts,j=3){return 'M'+pts.map(([x,y])=>(x+(rnd()-.5)*j).toFixed(1)+' '+(y+(rnd()-.5)*j).toFixed(1)).join('L')+'Z';}
// paper puppet person. o: {x,y,s,skin,hair,shirt,pants,hairStyle,eyes:'open'|'closed'|'shock'|'smirk'|'worry',mouth,armL,armR (deg),stick:true}
function person(o){
 seed=o.seed||7;const s=o.s||1,sk=o.skin,hr=o.hair;let g='';
 // stick (behind)
 if(o.stick!==false) g+=`<rect x="-11" y="150" width="22" height="900" rx="6" fill="url(#stick)" stroke="#7a532a" stroke-width="2"/>`;
 // legs
 g+=cut(rim(wob([[-58,150],[-8,150],[-12,300],[-62,300]],4),o.pants)+rim(wob([[8,150],[58,150],[62,300],[12,300]],4),o.pants)+rim(blob(-40,305,34,16,12,.08),'#3a2c25')+rim(blob(40,305,34,16,12,.08),'#3a2c25'),'shs');
 // arms helper
 const arm=(side,deg,hold)=>{const sx=side*78,sy=-22;const L=170;let a=rim(`M${-17} 0 L17 0 L15 ${L} Q0 ${L+18} -15 ${L} Z`,o.shirt,8)+rim(blob(0,L+14,22,22,14,.07),sk,7);
   if(hold)a+=hold(L);
   return `<g transform="translate(${sx},${sy}) rotate(${deg})">${cut(a,'shs')}${pin(0,8,10)}</g>`;};
 const back=[],front=[];
 (o.armL!==undefined?front:back).push(arm(-1,o.armL??14,o.holdL));
 (o.armR!==undefined?front:back).push(arm(1,o.armR??-14,o.holdR));
 g+=back.join('');
 // torso
 g+=cut(rim(wob([[-82,-40],[82,-40],[96,160],[-96,160]],5),o.shirt,10)+(o.collar?rim(`M-30 -40 L0 0 L30 -40 Z`,o.collar,0):'')+`<path d="M-70 40 Q0 52 70 40" stroke="#000" stroke-opacity=".08" stroke-width="5" fill="none"/>`);
 g+=front.join('');
 // neck + head
 let h='';
 if(o.hairStyle==='long') h+=rim(wob([[-112,-150],[112,-150],[124,30],[70,40],[-70,40],[-124,30]],6),hr,9);
 h+=rim(blob(0,-150,112,122,22,.035),sk,10);
 // hair top
 if(o.hairStyle==='bob') h+=rim(`M-122 -120 Q-128 -262 0 -272 Q128 -262 122 -120 L118 -40 L78 -40 L80 -150 Q20 -188 -40 -186 Q-80 -170 -84 -150 L-78 -40 L-118 -40 Z`,hr,9);
 else if(o.hairStyle==='short') h+=rim(`M-118 -150 Q-120 -270 0 -276 Q122 -270 116 -150 Q90 -205 30 -210 Q-30 -228 -80 -196 Q-104 -176 -118 -150 Z`,hr,9);
 else if(o.hairStyle==='long') h+=rim(`M-120 -120 Q-126 -266 0 -276 Q126 -266 120 -120 Q92 -200 0 -206 Q-92 -200 -120 -120 Z`,hr,9);
 else if(o.hairStyle==='spiky') h+=rim(wob([[-116,-150],[-110,-230],[-80,-262],[-50,-246],[-20,-284],[12,-250],[46,-282],[70,-246],[106,-250],[116,-150],[80,-200],[0,-214],[-80,-200]],3),hr,9);
 if(o.bun) h+=rim(blob(0,-290,46,42,16,.06),hr,9);
 // face (ink marker)
 const masked=o.mask&&(o.maskY||0)<60;const e=masked?'none':(o.eyes||'open');const ey=-148;
 if(e==='none'){}
 else if(e==='closed') h+=`<path d="M-58 ${ey} q18 14 36 0 M22 ${ey} q18 14 36 0" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
 else if(e==='shock') h+=`<circle cx="-40" cy="${ey}" r="22" fill="#fff" stroke="${ink}" stroke-width="6"/><circle cx="40" cy="${ey}" r="22" fill="#fff" stroke="${ink}" stroke-width="6"/><circle cx="-40" cy="${ey+3}" r="7" fill="${ink}"/><circle cx="40" cy="${ey+3}" r="7" fill="${ink}"/>`;
 else if(e==='smirk') h+=`<path d="M-62 ${ey} q20 -10 40 0" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M22 ${ey} q20 -10 40 0" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-66 ${ey-34} l40 12 M66 ${ey-34} l-40 12" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>`;
 else if(e==='peek') h+=`<path d="M-58 ${ey} q18 14 36 0" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="40" cy="${ey}" rx="13" ry="16" fill="${ink}"/>`;
 else h+=`<ellipse cx="-40" cy="${ey}" rx="12" ry="16" fill="${ink}"/><ellipse cx="40" cy="${ey}" rx="12" ry="16" fill="${ink}"/>`;
 if(e!=='none'&&(e==='worry'||o.brow==='worry')) h+=`<path d="M-66 ${ey-36} l40 -12 M66 ${ey-36} l-40 -12" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>`;
 h+=`<ellipse cx="-70" cy="${ey+38}" rx="22" ry="12" fill="#ff8a8a" opacity=".45"/><ellipse cx="70" cy="${ey+38}" rx="22" ry="12" fill="#ff8a8a" opacity=".45"/>`;
 const m=o.mouth||'smile';
 if(m==='o') h+=`<ellipse cx="0" cy="${ey+62}" rx="20" ry="26" fill="#5a2320" stroke="${ink}" stroke-width="6"/>`;
 else if(m==='wave') h+=`<path d="M-34 ${ey+62} q8 -12 17 0 t17 0 t17 0 t17 0" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
 else if(m==='grin') h+=`<path d="M-44 ${ey+44} Q0 ${ey+100} 50 ${ey+38}" stroke="${ink}" stroke-width="7" fill="#fff" stroke-linejoin="round"/>`;
 else if(m==='flat') h+=`<path d="M-24 ${ey+60} l48 0" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>`;
 else h+=`<path d="M-30 ${ey+52} Q0 ${ey+76} 30 ${ey+52}" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
 if(o.mask){const my=o.maskY||0;if(my>0)h+=`<path d="M0 ${-300-my} L0 -3000" stroke="#d8d2c4" stroke-width="4"/>`;h+=`<g transform="translate(${o.maskX||0},${-my}) rotate(${o.maskR||0} 0 -190)">`+(o.mask==='wolf'?wolfMaskSVG():robberMaskSVG())+'</g>';}
 if(o.sweat) h+=rim(`M118 -230 q20 32 0 48 q-20 -16 0 -48 Z`,'#8fd3ff',6)+rim(`M-128 -190 q14 24 0 36 q-14 -12 0 -36 Z`,'#8fd3ff',5);
 g+=cut(rim(wob([[-26,-46],[26,-46],[24,-6],[-24,-6]],2),sk,0))+cut(h)+pin(0,-30,9);
 return `<g transform="translate(${o.x},${o.y}) scale(${s}${o.flip?',1':''}) rotate(${o.rot||0} 0 ${o.pivot??260})">${g}</g>`;
}

function wolfMaskSVG(){return rim('M-120 -150 L-114 -238 L-100 -306 L-58 -252 L58 -252 L100 -306 L114 -238 L120 -150 Q82 -112 30 -120 L0 -100 L-30 -120 Q-82 -112 -120 -150 Z','#8d93a0',9)
 +'<path d="M-96 -262 L-92 -292 L-70 -258Z M96 -262 L92 -292 L70 -258Z" fill="#d79aa2"/>'
 +'<path d="M-40 -150 Q0 -166 40 -150 L26 -116 L0 -100 L-26 -116Z" fill="#cfd3da"/>'
 +'<path d="M-82 -186 L-28 -176 L-32 -154 L-78 -162Z M82 -186 L28 -176 L32 -154 L78 -162Z" fill="#ffd23f" stroke="#1d1d1d" stroke-width="5"/><path d="M-54 -182 l0 24 M54 -182 l0 24" stroke="#1d1d1d" stroke-width="8"/>'
 +'<path d="M-92 -204 L-26 -186 M92 -204 L26 -186" stroke="#1d1d1d" stroke-width="9" stroke-linecap="round"/>'
 +'<path d="M-16 -128 L16 -128 L0 -110Z" fill="#1d1d1d"/>'
 +'<path d="M-120 -160 L-132 -158 M120 -160 L132 -158" stroke="#1d1d1d" stroke-width="4"/>';}
function robberMaskSVG(){return rim('M-124 -178 Q0 -200 124 -178 L122 -128 Q0 -148 -122 -128 Z','#1d1d1d',7)
 +'<ellipse cx="-42" cy="-156" rx="26" ry="18" fill="#fffaf0"/><ellipse cx="42" cy="-156" rx="26" ry="18" fill="#fffaf0"/><circle cx="-36" cy="-155" r="9" fill="#1d1d1d"/><circle cx="48" cy="-155" r="9" fill="#1d1d1d"/>'
 +rim('M118 -168 q34 -14 40 8 q-20 4 -40 6Z M118 -150 q30 16 22 38 q-16 -12 -26 -30Z','#1d1d1d',5);}
// generic bust for cards (head coords like person head)
function bust(o){let h='';
 h+=`<path d="M-200 340 L-200 70 Q-120 -6 0 0 Q120 -6 200 70 L200 340Z" fill="${o.shirt}" stroke="#fbf5e6" stroke-width="8"/>`;
 if(o.stripes) for(let y=50;y<340;y+=46) h+=`<path d="M-200 ${y} L200 ${y}" stroke="${o.stripes}" stroke-width="20" opacity=".9"/>`;
 h+=`<rect x="-34" y="-50" width="68" height="100" fill="${o.skin}"/><path d="M-34 30 Q0 44 34 30" stroke="#000" stroke-opacity=".15" stroke-width="6" fill="none"/>`;
 h+=rim(blob(0,-150,112,122,22,.035),o.skin,9);
 if(o.hat==='beanie') h+=rim('M-118 -168 Q-118 -290 0 -292 Q118 -290 118 -168 Q60 -186 0 -186 Q-60 -186 -118 -168Z',o.hatc||'#2a2a2e',8)+rim('M-124 -176 Q0 -204 124 -176 L124 -150 Q0 -176 -124 -150Z',o.hatc2||'#3c3c44',6);
 else if(o.hair) h+=rim(`M-118 -150 Q-120 -270 0 -276 Q122 -270 116 -150 Q90 -205 30 -210 Q-30 -228 -80 -196 Q-104 -176 -118 -150 Z`,o.hair,9);
 if(o.mask!=='wolf') h+=`<ellipse cx="-40" cy="-148" rx="12" ry="16" fill="${ink}"/><ellipse cx="40" cy="-148" rx="12" ry="16" fill="${ink}"/>`;
 h+=`<path d="M-42 -92 Q0 -58 46 -96" stroke="${ink}" stroke-width="8" fill="#fff" stroke-linejoin="round"/>`;
 if(o.mask==='wolf') h+=wolfMaskSVG(); if(o.mask==='robber') h+=robberMaskSVG();
 return h;}
// pointing hand on stick
function pointer(x,y,deg,sleeve,skin,len=420){
 const g=cut(rim(`M${-len} -34 L-40 -34 L-40 34 L${-len} 34 Z`,sleeve,9)+rim(`M-46 -40 Q20 -48 34 -26 L130 -26 Q152 -24 150 -6 Q148 10 128 10 L40 10 Q46 26 36 40 Q10 52 -46 40 Z`,skin,9)+
 `<path d="M24 -12 L120 -12" stroke="#000" stroke-opacity=".15" stroke-width="4"/><path d="M-10 22 q16 6 30 0" stroke="#000" stroke-opacity=".18" stroke-width="4" fill="none"/>`)+pin(-40,0,10);
 return `<g transform="translate(${x},${y}) rotate(${deg})">${g}</g>`;
}
// card (paper) faceDown or with label
let CID=0;
const LANG=(new URLSearchParams(location.search).get('lang')||'ko');
const RN={wolf:{ko:'늑대인간',en:'WEREWOLF'},robber:{ko:'강도',en:'ROBBER'}};
function cardFace(role,id){
 const W=140,H=200;let bg,p='';
 if(role==='wolf'){bg=['#5b7286','#24303d'];p+='<g transform="translate(0,12)">';
  p+=`<path d="M-70 100 L-70 62 Q-40 30 0 34 Q40 30 70 62 L70 100Z" fill="#3b3f4a"/><path d="M-30 40 L0 74 L30 40" fill="none" stroke="#2a2d35" stroke-width="5"/>`;
  p+=`<path d="M-52 -40 L-44 -92 L-16 -58 L16 -58 L44 -92 L52 -40 L46 10 L20 40 L-20 40 L-46 10Z" fill="#8d93a0" stroke="#fbf5e6" stroke-width="4" stroke-linejoin="round"/>`;
  p+=`<path d="M-42 -50 L-40 -80 L-24 -60Z M42 -50 L40 -80 L24 -60Z" fill="#d79aa2"/>`;
  p+=`<path d="M-26 -6 Q0 -20 26 -6 L22 30 Q0 44 -22 30Z" fill="#cfd3da"/>`;
  p+=`<path d="M-36 -30 L-12 -24 L-14 -14 L-34 -18Z M36 -30 L12 -24 L14 -14 L34 -18Z" fill="#ffd23f" stroke="#1d1d1d" stroke-width="3"/><path d="M-23 -27 l0 12 M23 -27 l0 12" stroke="#1d1d1d" stroke-width="4"/>`;
  p+=`<path d="M-40 -40 L-10 -30 M40 -40 L10 -30" stroke="#1d1d1d" stroke-width="5" stroke-linecap="round"/>`;
  p+=`<path d="M-8 -2 L8 -2 L0 8Z" fill="#1d1d1d"/><path d="M-20 18 Q0 30 20 18" fill="#5a1e22" stroke="#1d1d1d" stroke-width="3"/><path d="M-16 19 l4 8 l4 -8Z M-8 19 l4 8 l4 -8Z M0 19 l4 8 l4 -8Z M8 19 l4 8 l4 -8Z" fill="#fff" stroke="#1d1d1d" stroke-width="1.5" stroke-linejoin="round"/></g>`;}
 else if(role==='robber'){bg=['#4f7f78','#1b2e2c'];p+=`<g transform="translate(0,52) scale(0.44)">${bust({skin:'#f2cfae',shirt:'#2a2a2e',stripes:'#e9e4d8',hat:'beanie',mask:'robber'})}</g>`;}
 let g=`<defs><clipPath id="cc${id}"><rect x="-64" y="-94" width="128" height="188" rx="10"/></clipPath><radialGradient id="cg${id}" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></radialGradient></defs>`;
 g+=`<g clip-path="url(#cc${id})"><rect x="-70" y="-100" width="140" height="200" fill="url(#cg${id})"/>${p}</g>`;
 g+=`<rect x="-64" y="-94" width="128" height="188" rx="10" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3"/>`;
 const nm=RN[role][LANG];const fs=LANG==='en'?19:30;
 g+=`<text x="0" y="-62" text-anchor="middle" font-family="Black Han Sans, Jua" font-size="${fs}" fill="#fffaf0" stroke="#1a1414" stroke-width="7" paint-order="stroke" letter-spacing="1">${nm}</text>`;
 const num=role==='wolf'?2:6;
 g+=`<circle cx="-48" cy="78" r="13" fill="#1a1414" opacity=".75"/><text x="-48" y="85" text-anchor="middle" font-family="Black Han Sans, Jua" font-size="19" fill="#fffaf0">${num}</text>`;
 return g;
}
function cardBack(id){
 let g=`<defs><clipPath id="cc${id}"><rect x="-64" y="-94" width="128" height="188" rx="10"/></clipPath></defs><g clip-path="url(#cc${id})"><rect x="-70" y="-100" width="140" height="200" fill="#232a5c"/>`;
 g+=`<path d="M-70 60 Q-30 40 0 54 Q40 70 70 48 L70 100 L-70 100Z" fill="#161b3d"/>`;
 g+=`<path d="M20 -48 a32 32 0 1 1 -10 50 a26 26 0 1 0 10 -50Z" fill="#f6e7b6"/>`;
 g+=`<path d="M-30 60 L-30 30 L-22 22 L-24 10 L-16 18 L-10 8 L-8 22 L0 30 L4 44 L-6 46 L-8 60Z" fill="#0e1129"/>`;
 for(const [x,y,r] of [[-40,-60,3],[-20,-30,2],[40,-70,2.5],[-48,-10,2],[48,10,2]]) g+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd166"/>`;
 g+=`</g><rect x="-58" y="-88" width="116" height="176" rx="8" fill="none" stroke="#e9c46a" stroke-width="3" stroke-dasharray="1 7" stroke-linecap="round"/>`;
 return g;
}
function card(x,y,deg,role,s=1){seed=5;
 const id=CID++;
 const inner=role?cardFace(role,id):cardBack(id);
 const g=`<rect x="-70" y="-100" width="140" height="200" rx="14" fill="#fbf5e6"/>`+`<g>${inner}</g>`;
 return `<g transform="translate(${x},${y}) rotate(${deg}) scale(${s})">${cut(g)}</g>`;
}
// caption on paper strips (ransom-cut style, one strip per line)
function tw(t,fs){let w=0;for(const ch of t.replace(/<[^>]+>/g,'')){const c=ch.codePointAt(0);w+= (c>=0xAC00&&c<=0xD7A3)?0.95:(c>0x2000?1.05:(ch===' '?0.3:0.55));}return w*fs;}
function caption(lines,y,col='#fffaf0',ex=''){
 let out='';seed=11+lines.length*7+lines[0].t.length;lines.forEach((ln,i)=>{const t=ln.t,fs=ln.fs||76;const w=tw(t,fs)+70;const x=540-w/2;const yy=y+i*(fs+46);const r=(i%2?1.6:-1.4);
  out+=`<g transform="rotate(${r} 540 ${yy})" filter="url(#sh)"><path d="${wob([[x,yy-fs*0.9],[x+w,yy-fs*0.9],[x+w,yy+fs*0.42],[x,yy+fs*0.42]],6)}" fill="${ln.bg||col}"/><text x="540" y="${yy+fs*0.12}" text-anchor="middle" font-family="Jua" font-size="${fs}" fill="${ln.c||ink}">${t}</text></g>`;});
 return out;
}
// proscenium (cardboard frame + curtains)
function proscenium(curtain='#b8322a'){
 let g='';
 // side curtains
 const drape=(x0,dir)=>{let p=`M${x0} 0 `;for(let i=0;i<=8;i++){const y=i*240;p+=`L${x0+dir*(64+(i%2?16:0))} ${y}`;}p+=`L${x0} 1920 Z`;return p;};
 g+=cut(`<path d="${drape(0,1)}" fill="${curtain}"/>`+`<path d="M18 0 L18 1920 M40 0 L40 1920" stroke="#000" stroke-opacity=".18" stroke-width="6"/>`,'sh');
 g+=cut(`<path d="${drape(1080,-1)}" fill="${curtain}"/>`+`<path d="M1062 0 L1062 1920 M1040 0 L1040 1920" stroke="#000" stroke-opacity=".18" stroke-width="6"/>`,'sh');
 // scalloped valance
 let v='M0 0 L1080 0 L1080 120 ';for(let i=12;i>=0;i--){const x=i*90;v+=`Q${x+45} 190 ${x} 120 `;}v+='Z';
 g+=cut(`<path d="${v}" fill="${curtain}" stroke="#fbf5e6" stroke-width="8" paint-order="stroke"/>`+`<path d="M0 92 L1080 92" stroke="#e9c46a" stroke-width="10" stroke-dasharray="2 26" stroke-linecap="round"/>`,'shd');
 // stage lip
 g+=cut(`<path d="M0 1730 L1080 1730 L1080 1920 L0 1920 Z" fill="#6b3f1e"/><path d="M0 1730 L1080 1730" stroke="#e9c46a" stroke-width="12"/><path d="M0 1758 L1080 1758" stroke="#3d2310" stroke-width="4"/>`,'shd');
 for(const x of [90,330,540,750,990])g+=pin(x,1800,11);
 return g;
}
function floor(){return `<rect x="0" y="1470" width="1080" height="270" fill="url(#board)"/><rect x="0" y="1470" width="1080" height="18" fill="#000" opacity=".18"/>`;}
function grainAll(){return `<image href="grain.png" x="0" y="0" width="1080" height="1920"/>`;}
function grainAllOld(){return `<rect width="1080" height="1920" filter="url(#grain)" opacity=".35" style="mix-blend-mode:multiply"/><rect width="1080" height="1920" filter="url(#fiber)" style="mix-blend-mode:screen"/>`;}
function bubble(x,y,w,txt,fs=54,tail='l'){seed=31+txt.length;
 if(!w){w=tw(txt,fs)+64;if(tail==='r')x=x-w;}
 const h=fs+56;const tx=tail==='l'?x+80:x+w-110;
 const d=wob([[x,y],[x+w,y],[x+w,y+h],[tx+40,y+h],[tx+(tail==='l'?-30:60),y+h+50],[tx,y+h],[x,y+h]],3);
 return cut(rim(d,'#fffaf0',10)+`<text x="${x+w/2}" y="${y+h/2+fs*0.36}" text-anchor="middle" font-family="Jua" font-size="${fs}" fill="${ink}">${txt}</text>`);
}
// ---------- characters
const JIA={skin:'#f2c9a0',hair:'#1f1a1d',shirt:'#e6a93a',pants:'#3c4f7a',hairStyle:'bob',collar:'#fffaf0'};
const MIN={skin:'#8a5634',hair:'#17110e',shirt:'#3f9a6b',pants:'#4b3a2c',hairStyle:'short'};
const SOFI={skin:'#f6d9c0',hair:'#8a4a24',shirt:'#4f7fd1',pants:'#3a2f40',hairStyle:'long'};
const ROB={skin:'#d9a27a',hair:'#c99a3c',shirt:'#7b56c9',pants:'#2e2a35',hairStyle:'spiky'};

function dayBG(){seed=7;let out='';
 out+=`<rect width="1080" height="1920" fill="#9fd3e6"/>`;
 // paper sun + clouds on strings
 out+=`<path d="M230 0 L230 560 M780 0 L780 610" stroke="#d8d2c4" stroke-width="3"/>`;
 out+=cut(rim(blob(230,640,70,70,20,.04),'#ffd166',10)+(()=>{let r='';for(let i=0;i<12;i++){const a=i/12*Math.PI*2;r+=rim(wob([[230+Math.cos(a)*86,640+Math.sin(a)*86],[230+Math.cos(a+.13)*120,640+Math.sin(a+.13)*120],[230+Math.cos(a+.26)*86,640+Math.sin(a+.26)*86]],2),'#ffb703',0);}return r;})());
 out+=cut(`<g transform="translate(-20,350)">${rim(`M680 300 Q690 240 750 250 Q780 200 840 230 Q900 220 905 280 Q950 300 920 330 L690 330 Q650 320 680 300Z`,'#fffaf0',9)}</g>`);
 // back village flats
 out+=cut(rim('M60 1180 L60 900 L200 790 L340 900 L340 1180Z','#e07a5f',9)+rim('M250 1180 L250 960 L420 840 L590 960 L590 1180Z','#f2cc8f',9)+rim('M560 1180 L560 930 L700 820 L840 930 L840 1180Z','#81b29a',9)+rim('M800 1180 L800 980 L930 870 L1060 980 L1060 1180Z','#e5989b',9),'sh');
 for(const [x,y] of [[160,1010],[400,1040],[660,1020],[900,1060]]) out+=rim(`M${x} ${y} l60 0 l0 70 l-60 0Z`,'#3d405b',5);
 out+=cut(rim('M0 1200 Q270 1120 540 1190 Q800 1250 1080 1170 L1080 1500 L0 1500Z','#7cb26a',10),'sh');
 out+=floor();return out;}
function nightBG(){seed=7;let out='';
 out+=`<rect width="1080" height="1920" fill="#1d2550"/><rect width="1080" height="1920" fill="url(#vig)"/>`;
 out+=`<path d="M800 0 L800 560 M180 0 L180 600 M420 0 L420 680 M610 0 L610 560" stroke="#8c8a99" stroke-width="2.5"/>`;
 out+=cut(rim(`M800 650 m-95 0 a95 95 0 1 0 190 0 a95 95 0 1 0 -190 0`,'#f6e7b6',10)+`<circle cx="770" cy="630" r="16" fill="#e6d49a"/><circle cx="830" cy="690" r="10" fill="#e6d49a"/>`);
 const star=(x,y,r)=>{let p='';for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2;const rr=i%2?r*0.45:r;p+=(i?'L':'M')+(x+Math.cos(a)*rr).toFixed(1)+' '+(y+Math.sin(a)*rr).toFixed(1);}return p+'Z';};
 out+=cut(rim(star(180,630,34),'#ffd166',7)+rim(star(420,700,26),'#ffd166',7)+rim(star(610,590,22),'#ffd166',7));
 // hills & dark houses
 out+=cut(rim('M0 1150 L0 1000 L150 900 L300 1000 L300 1150Z','#2c3a6b',8)+rim('M260 1150 L260 950 L430 850 L600 950 L600 1150Z','#34467d',8)+rim('M760 1150 L760 960 L910 860 L1080 960 L1080 1150Z','#2c3a6b',8),'sh');
 out+=`<rect x="110" y="1040" width="50" height="60" fill="#ffd166"/><rect x="400" y="1010" width="50" height="60" fill="#ffd166" opacity=".9"/>`;
 out+=cut(rim('M0 1180 Q300 1110 560 1170 Q820 1230 1080 1150 L1080 1500 L0 1500Z','#28456a',10),'sh');
 out+=floor();return out;}
