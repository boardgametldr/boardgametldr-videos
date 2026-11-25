// ================= ANIMATION =================
const FPS_STEP=15; // paper cut-out "on twos"
const cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));const lerp=(a,b,u)=>a+(b-a)*u;
const eio=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;const eo=u=>1-Math.pow(1-u,3);const ei=u=>u*u*u;
const oB=u=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(u-1,3)+c1*Math.pow(u-1,2);};
const prog=(t,a,d)=>cl((t-a)/d);
const pop=(t,a,d=.22)=>t<a?0:(t>a+d?1:oB((t-a)/d));
// damped swing (string / pin pendulum)
const swing=(t,a,amp,f=1.6,k=2.6)=>t<a?0:amp*Math.exp(-(t-a)*k)*Math.sin((t-a)*f*6.283);
// rod-puppet idle: bob + sway (hand holding rod from below)
const BT=0.6;
const idle=(t,ph,a=1,half=false)=>{const L=half?2*BT:BT;const u=((t+1e-6)/L)%1;return {dy:-Math.sin(u*Math.PI)*(half?7:6)*a,rot:Math.sin(((t/L)+ph)*Math.PI)*1.8*a};};
// slide along rod from below (enter) with landing bounce
const rise=(t,a,d=.35)=>t<a?1:(t>a+d+.3?0:(t<a+d?1-eo((t-a)/d):-0.05*Math.sin((t-a-d)/.3*Math.PI)));
// line drop on string from above, lands with damped bounce -> offset px
const drop=(t,a,h=900,d=.35)=>t<a?h:(t<a+d?h*(1-ei((t-a)/d)):Math.abs(swing(t,a+d,40,2.2,5)));
function slapLine(line,y,t,a,outT){if(t<a)return '';const u=t-a;const sc=u<.16?lerp(1.45,0.95,eo(u/.16)):(u<.3?lerp(.95,1,(u-.16)/.14):1);
 let dy=0;if(outT!==undefined&&t>outT){dy=-700*ei(cl((t-outT)/.3));}
 return `<g transform="translate(540,${y+dy}) scale(${sc}) translate(-540,${-y})">${caption([line],y)}</g>`;}
function caps(lines,y0,t,a,gap=.45,outT){let o='',y=y0;lines.forEach((ln,i)=>{o+=slapLine(ln,y,t,a+i*gap,outT);y+=(ln.fs||76)+46;});return o;}
function bub(t,a,args,outT){if(t<a||(outT&&t>outT))return '';const [x,y,w,txt,fs,tail]=args;const s=pop(t,a,.2);const ax=tail==='r'?x:x;const ay=y+fs+90;
 return `<g transform="translate(${ax},${ay}) scale(${s}) translate(${-ax},${-ay})">${bubble(x,y,w,txt,fs,tail)}</g>`;}
function popG(t,a,cx,cy,inner,d=.22){if(t<a)return '';const s=pop(t,a,d);return `<g transform="translate(${cx},${cy}) scale(${s}) translate(${-cx},${-cy})">${inner}</g>`;}
// curtains: p=0 open, 1 closed
function drapes(p,col='#b8322a'){if(p<=0.001)return '';const w=560*p;const one=(x0,dir)=>{const xe=dir>0?x0+w:x0-w;let g=`<path d="M${x0} 0 L${xe} 0 L${xe+dir*(-10)} 1740 L${x0} 1740Z" fill="${col}"/>`;for(let k=1;k<6;k++){const xx=x0+dir*w*k/6;g+=`<path d="M${xx} 0 L${xx} 1740" stroke="#000" stroke-opacity=".16" stroke-width="10"/>`;}return g;};
 return cut(one(0,1)+one(1080,-1),'shd');}
const curtainAt=(t,b,h=.22)=>cl(1-Math.abs(t-b)/h);
// world-space flying mask
function flyMask(type,x,y,s,rot){return `<g transform="translate(${x},${y}) scale(${s}) rotate(${rot})">`+cut(type==='wolf'?wolfMaskSVG():robberMaskSVG(),'shs')+`</g>`;}
function headPos(o){return [o.x,o.y-190*o.s];}
const NUM=(n,rot)=>cut(rim(blob(0,0,120,110,20,.05),'#e63946',10)+`<text x="0" y="40" text-anchor="middle" font-family="Black Han Sans, Jua" font-size="120" fill="#fffaf0" stroke="#7a1f2b" stroke-width="8" paint-order="stroke">${n}</text>`);
const ZZ=(t,x,y,ph)=>{const u=((t*0.5+ph)%1);return `<text x="${x+u*40}" y="${y-u*120}" font-family="Jua" font-size="${40+u*20}" fill="#e7e0f5" opacity="${Math.sin(u*Math.PI)*0.9}">z</text>`;};

window.setT=(tt)=>{const t=Math.floor(tt*FPS_STEP+1e-6)/FPS_STEP;CID=0;let out=defs;
 // BEAT GRID: 100BPM, beat=0.6s. downbeats 0.6,3.0,5.4,7.8,10.2,12.6,15.0,17.4,19.8,22.2,24.6,27.0,29.4
 // ---------- CUT 1 : hook (0-3.0) ----------
 if(t<3){out+=dayBG();
  const I=idle(t,0.1,0.6);const sh=t>=1.8?Math.sin(t*40)*2.2:0;
  out+=person({...JIA,seed:21,x:540,y:1180+I.dy+rise(t,0,.3)*700,s:1.15,eyes:'shock',mouth:((t/0.3+1e-6)|0)%2?'wave':'o',sweat:t>=1.2,armL:28+swing(t,1.2,10),armR:-28-swing(t,1.2,10),rot:I.rot+sh});
  const pin_=(hit,x,y,deg,sl,sk,len,flip)=>{const a=hit-.18;if(t<a)return '';const u=eo(cl((t-a)/.18));const k=swing(t,hit,6,3,6);const g=pointer(x,y,deg+k,sl,sk,len);const off=(1-u)*500;
   return flip?`<g transform="translate(${1080+off},0) scale(-1,1)">${g}</g>`:`<g transform="translate(${-off*(deg>90?-0.6:1)},${deg>90?-off:0})">${g}</g>`;};
  out+=pin_(1.2,170,840,12,MIN.shirt,MIN.skin,560);
  out+=pin_(1.5,170,930,6,SOFI.shirt,SOFI.skin,560,true);
  out+=pin_(1.8,770,600,120,ROB.shirt,ROB.skin,700);
  out+=proscenium();
  out+=caps(X.c1,300,t,0.0,.6);
  out+=drapes(curtainAt(t,3));}
 // ---------- CUT 2+3 : night (3.0-12.6) ----------
 else if(t<12.6){out+=nightBG();
  const P={sofi:{x:190,y:1220,s:.78},jia:{x:410,y:1270,s:.9},rob:{x:720,y:1250,s:.92},min:{x:890,y:1230,s:.78}};
  const lean=t<9.0?0:(t<9.4?-10*eo((t-9.0)/.4):(t<11.4?-10:-10*(1-eo(cl((t-11.4)/.4)))));
  const reach=t<9.0?14:(t<9.4?lerp(14,66,eo((t-9.0)/.4)):(t<11.4?66:lerp(66,20,eo(cl((t-11.4)/.4)))));
  const I1=idle(t,.3,.5,true),I2=idle(t,.6,.5,true),I3=idle(t,.9,.5,true),I4=idle(t,.15,.5,true);
  const jiaMaskY=t<5.05?2000:(t<10.8?drop(t,5.05,700):2000);
  let jiaLook=0;
  if(t>=6.0&&t<7.8){const k=Math.floor((t-6.0)/0.6+1e-6),u=(t-6.0)/0.6-k;const pos=j=>j%2?-7:7;const prev=k===0?0:pos(k-1);jiaLook=lerp(prev,pos(k),eo(Math.min(1,u/0.35)));}
  else if(t>=7.8&&t<8.2) jiaLook=lerp(7,0,eo((t-7.8)/.3));
  const robMaskY=t<8.05?2000:(t<10.8?drop(t,8.05,700):2000);
  out+=person({...SOFI,seed:31,x:P.sofi.x,y:P.sofi.y+I1.dy,s:P.sofi.s,eyes:'closed',mouth:'flat',rot:I1.rot});
  out+=person({...MIN,seed:41,x:P.min.x,y:P.min.y+I4.dy,s:P.min.s,eyes:'closed',mouth:'flat',rot:I4.rot});
  const swapped=t>=11.4;
  out+=person({...JIA,seed:21,x:P.jia.x,y:P.jia.y+I2.dy,s:P.jia.s,eyes:(t>=5.4&&t<7.8)?'open':'closed',mouth:'smile',armL:20,armR:-10,rot:I2.rot+jiaLook,
    mask:swapped?'robber':(t>=5.05&&t<10.8?'wolf':undefined),maskY:swapped?drop(t,11.4,0):jiaMaskY,
    holdL:t<9.6?((L)=>`<g transform="translate(0,${L+30}) rotate(-20)">${card(0,0,0,'wolf',0.62)}</g>`):(t>=10.2?((L)=>`<g transform="translate(0,${L+30}) rotate(-20)">${card(0,0,0,'',0.62)}</g>`):undefined)});
  out+=person({...ROB,seed:51,x:P.rob.x,y:P.rob.y+I3.dy,s:P.rob.s,eyes:t>=8.4?'peek':'closed',mouth:t>=8.4?'grin':'flat',rot:I3.rot+lean,armL:reach,armR:-40,
    mask:swapped?'wolf':(t>=8.05&&t<10.8?'robber':undefined),maskY:swapped?drop(t,11.4,0):robMaskY,
    holdR:t<9.6?((L)=>`<g transform="translate(0,${L+44}) rotate(40)">${card(0,0,0,'',0.62)}</g>`):(t>=10.2?((L)=>`<g transform="translate(0,${L+44}) rotate(40)">${card(0,0,0,'wolf',0.62)}</g>`):undefined)});
  if(t>=9.6&&t<10.2){const u=eio((t-9.6)/.6);const ax=470,ay=1400,bx=830,by=1390;
   out+=card(lerp(ax,bx,u),lerp(ay,by,u)-Math.sin(u*Math.PI)*220,lerp(-20,40,u),'wolf',0.6);
   out+=card(lerp(bx,ax,u),lerp(by,ay,u)-Math.sin(u*Math.PI)*120,lerp(40,-20,u),'',0.6);}
  if(t>=10.8&&t<11.4){const u=eio((t-10.8)/.6);const [jx,jy]=[P.jia.x,P.jia.y-190*P.jia.s],[rx,ry]=[P.rob.x,P.rob.y-190*P.rob.s];
   out+=flyMask('wolf',lerp(jx,rx,u),lerp(jy,ry,u)-Math.sin(u*Math.PI)*260,P.jia.s,u*360);
   out+=flyMask('robber',lerp(rx,jx,u),lerp(ry,jy,u)-Math.sin(u*Math.PI)*160,P.rob.s,-u*360);}
  const cy=1560+rise(t,3.0,.35)*400;out+=centerCards(cy);
  if(t>=4.8) out+=popG(t,4.8,540,1670,cut(rim(wob([[540-tw(X.c2s,34)/2-24,1640],[540+tw(X.c2s,34)/2+24,1640],[540+tw(X.c2s,34)/2+24,1700],[540-tw(X.c2s,34)/2-24,1700]],3),'#fffaf0',6)+`<text x="540" y="1682" text-anchor="middle" font-family="Jua" font-size="34" fill="${ink}">${X.c2s}</text>`,'shs'));
  if(t<5.4){for(const [x,y,ph] of [[240,960,0],[470,1000,.3],[770,990,.6],[930,980,.85]])out+=ZZ(t,x,y,ph);}
  if(t>=5.4&&t<7.8) out+=`<ellipse cx="410" cy="1050" rx="230" ry="340" fill="#ffe9a8" opacity="${.13*cl((t-5.4)/.2)}"/>`;
  if(t>=8.4) out+=`<ellipse cx="700" cy="1100" rx="380" ry="520" fill="#9fb6ff" opacity="${.11*cl((t-8.4)/.2)}"/>`;
  if(t>=9.0&&t<11.4) out+=`<path d="M520 1250 q90 -150 300 -40" stroke="#ffd166" stroke-width="7" fill="none" stroke-dasharray="4 18" stroke-linecap="round" opacity="${cl((t-9.0)/.2)}"/>`;
  out+=proscenium('#4a2357');
  out+=caps(X.c2,300,t,3.6,.6,7.8);
  out+=caps(X.c3,300,t,8.4,1.8,12.3);
  out+=drapes(Math.max(curtainAt(t,3),curtainAt(t,12.6)),'#4a2357');}
 // ---------- CUT 4 : day discussion (12.6-17.4) ----------
 else if(t<17.4){out+=dayBG();
  const I=k=>idle(t,k,.6);const talking=t>=13.8&&t<15.0;const talk=talking?Math.sin(Math.PI*(((t+1e-6)/0.3)%1))*14:0;
  const P={sofi:{x:190,y:1260,s:.82},jia:{x:420,y:1240,s:1},rob:{x:730,y:1300,s:.78},min:{x:900,y:1260,s:.82}};
  out+=person({...SOFI,seed:31,x:P.sofi.x,y:P.sofi.y+I(.3).dy,s:P.sofi.s,eyes:'open',mouth:'flat',brow:t>=15.0?'worry':'',rot:I(.3).rot});
  out+=person({...MIN,seed:41,x:P.min.x,y:P.min.y+I(.15).dy,s:P.min.s,eyes:'open',mouth:'flat',rot:I(.15).rot});
  out+=person({...ROB,seed:51,x:P.rob.x,y:P.rob.y+I(.9).dy,s:P.rob.s,eyes:t>=16.2?'smirk':'open',mouth:t>=16.2?'smile':'flat',rot:I(.9).rot});
  out+=person({...JIA,seed:21,x:P.jia.x,y:P.jia.y+I(.6).dy-talk,s:P.jia.s,eyes:'open',mouth:(talking&&((t/0.3+1e-6)|0)%2)?'o':'grin',sweat:t>=15.0,armL:28,armR:t>=13.8?-150+swing(t,13.8,25,2.5,3):-20,rot:I(.6).rot+(talking?Math.sin(Math.PI*(t/0.3))*3:0)});
  out+=proscenium();
  out+=caps(X.c4,300,t,12.6,.6);
  out+=bub(t,13.8,[LANG==='en'?110:250,640,0,X.b4,LANG==='en'?44:62,'l']);
  out+=popG(t,14.4,540,828,cut(rim(wob([[150,800],[930,800],[930,856],[150,856]],3),'#2b2320',0)+`<text x="540" y="840" text-anchor="middle" font-family="Jua" font-size="38" fill="#ffd166">${X.n4}</text>`,'shs'));
  out+=bub(t,15.0,[290,900,0,X.b4a,48,'r']);
  out+=bub(t,15.6,[790,900,0,X.b4b,48,'l']);
  out+=bub(t,16.2,[640,950,0,'😏',48,'r']);
  out+=drapes(curtainAt(t,12.6),'#4a2357');}
 // ---------- CUT 5 : vote (17.4-22.2) ----------
 else if(t<22.2){out+=dayBG();
  const enter=k=>rise(t,17.4+k*.075,.3)*600;const point=t>=19.8;const pa=(base,tgt)=>point?tgt+swing(t,19.8,14,2.6,4):base;
  const sh=point?Math.sin(t*38)*3:0;
  out+=`<path d="M540 0 L540 ${560-drop(t,17.65,560)}" stroke="#d8d2c4" stroke-width="3"/>`;
  const n=t<18.6?3:(t<19.2?2:1);const flipU=Math.min(Math.abs(t-18.6),Math.abs(t-19.2));const fx=flipU<.12?flipU/.12:1;
  out+=`<g transform="translate(540,${650-drop(t,17.65,560)}) rotate(${swing(t,18.0,8,1.4,1.5)} 0 -90) scale(${fx},1)">${NUM(n)}</g>`;
  out+=person({...JIA,seed:21,x:540,y:1130+enter(0),s:.9,eyes:'shock',mouth:point?'wave':'o',sweat:true,armL:28,armR:-28,rot:sh});
  out+=person({...SOFI,seed:31,x:190,y:1380+enter(1),s:.9,eyes:'open',mouth:point?'o':'flat',armR:pa(-20,-132),holdR:point?FING(SOFI.skin):undefined});
  out+=person({...MIN,seed:41,x:890,y:1380+enter(2),s:.9,eyes:'open',mouth:point?'o':'flat',armL:pa(20,132),holdL:point?FING(MIN.skin):undefined});
  out+=person({...ROB,seed:51,x:690,y:1470+enter(3),s:.8,eyes:point?'smirk':'open',mouth:'flat',armL:pa(20,150),holdL:point?FING(ROB.skin):undefined});
  if(X.s5&&point) X.s5.forEach((tx,k)=>{out+=popG(t,20.4+k*.3,60,910+k*86,cut(rim(wob([[40,880+k*86],[40+tw(tx,44)+60,880+k*86],[40+tw(tx,44)+60,940+k*86],[40,940+k*86]],3),'#fffaf0',6)+`<text x="70" y="${926+k*86}" font-family="Jua" font-size="44" fill="#c0392b">${tx}</text>`,'shs'));});
  out+=proscenium();
  out+=caps(X.c5,320,t,17.4,.5);
  const bo=t>=21.6?cl((t-21.6)/.15):0;if(bo>0)out+=`<rect width="1080" height="1920" fill="#000" opacity="${bo}"/>`;}
 // ---------- CUT 6 : reveal (22.2-27.0) ----------
 else if(t<27.0){const lit=t<22.4?((((t*15+1e-6)|0)%2)?.35:1):1;
  out+=`<rect width="1080" height="1920" fill="#2a1d1a"/><path d="M380 120 L700 120 L1000 1600 L80 1600 Z" fill="#fff1c9" opacity="${.16*lit}"/><rect width="1080" height="1920" fill="url(#spot)" opacity="${lit}"/>`;
  out+=floor();
  const flipU=cl((t-22.625)/.35);const fx=Math.abs(Math.cos(flipU*Math.PI));const shown=flipU>=.5;
  const jShake=(t>=23.4&&t<24.6)?Math.sin(t*36)*4:0;
  const robRaise=t<24.35?-40:lerp(-40,-100,eo(cl((t-24.35)/.25)));
  const RI=idle(t,.4,.5);
  out+=person({...ROB,seed:51,x:720,y:1160+RI.dy,s:.72,eyes:'open',mouth:'grin',rot:RI.rot,mask:t>=24.25?'wolf':undefined,maskY:drop(t,24.25,700),armR:robRaise,
   holdR:(L)=>`<g transform="translate(0,${L+60}) rotate(${-robRaise})">${card(0,0,0,t>=24.35?'wolf':'',0.95)}</g>`});
  out+=person({...JIA,seed:21,x:280,y:1250,s:1.12,eyes:shown?'shock':'open',mouth:shown?'o':'flat',brow:shown?'worry':'',mask:t>=23.05?'robber':undefined,maskY:drop(t,23.05,700),armL:22,armR:-128,rot:jShake,
   holdR:(L)=>`<g transform="translate(0,${L+70}) rotate(128) scale(${fx},1)">${card(0,0,4,shown?'robber':'',1.05)}</g>`});
  if(t>=23.4) out+=`<g stroke="#ffd166" stroke-width="10" stroke-linecap="round" opacity="${((t-23.4+1e-6)%0.3)<0.15?1:.4}"><path d="M390 900 l-40 -44"/><path d="M480 850 l0 -60"/></g>`;
  out+=bub(t,25.2,[1000,690,0,X.b6r,LANG==='en'?56:46,'r']);
  out+=bub(t,24.0,[60,560,0,X.b6j,LANG==='en'?46:50,'l']);
  out+=proscenium('#7a1f2b');
  out+=caps(X.c6,300,t,22.8,.6);
  out+=slapLine({t:X.r6,fs:52,bg:'#fffaf0'},1640,t,25.8);
  out+=drapes(t>26.78?eo(cl((t-26.78)/.22)):0,'#b8322a');}
 // ---------- CUT 7 : end card (27.0-31.8) ----------
 else {out+=`<rect width="1080" height="1920" fill="#2a1d1a"/>`;
  const cur=(x0,w)=>{let p=`M${x0} 0 L${x0+w} 0 L${x0+w} 1740 L${x0} 1740Z`;let g=`<path d="${p}" fill="#b8322a"/>`;for(let k=1;k<6;k++)g+=`<path d="M${x0+k*w/6} 0 L${x0+k*w/6} 1740" stroke="#000" stroke-opacity=".16" stroke-width="10"/>`;return g;};
  out+=cut(cur(0,560)+cur(520,560),'sh');
  const dy=drop(t,27.2,1200,.4);const sw=swing(t,27.6,3,1.2,2);
  out+=`<path d="M200 0 L200 ${620-dy} M880 0 L880 ${620-dy}" stroke="#d8d2c4" stroke-width="4"/>`;
  out+=`<g transform="translate(0,${-dy}) rotate(${sw} 540 0)">`+cut(`<rect x="70" y="620" width="940" height="560" rx="44" fill="#fffaf0" stroke="#3b2a12" stroke-width="8"/>`+
   `<text x="540" y="720" text-anchor="middle" font-family="Jua" font-size="40" fill="#8a6a2a">${X.info[0]}</text>`+
   `<text x="540" y="840" text-anchor="middle" font-family="Black Han Sans, Jua" font-size="${LANG==='en'?54:104}" fill="${ink}">${X.info[1]}</text>`+
   `<text x="540" y="940" text-anchor="middle" font-family="Jua" font-size="${LANG==='en'?44:50}" fill="${ink}">${X.info[2]}<tspan fill="#e8a400">★★</tspan></text>`+
   `<path d="M130 1010 L950 1010" stroke="#d8c39a" stroke-width="6" stroke-dasharray="14 12"/>`+
   `<text x="540" y="1100" text-anchor="middle" font-family="Jua" font-size="48" fill="${ink}">${X.info[3]}</text>`,'shd')+`</g>`;
  out+=popG(t,27.6,160,620,card(160,620,-14,'wolf',0.9))+popG(t,27.9,930,640,card(930,640,12,'robber',0.9));
  const bow=k=>t>=30.0?Math.sin(cl((t-30.0-k*.15)/.6)*Math.PI)*14:0;const EI=idle(t,.2,.5);
  out+=person({...JIA,seed:21,x:330,y:1500+rise(t,27.25,.35)*600+(t>27.9?EI.dy:0),s:.62,eyes:'closed',mouth:'wave',mask:'robber',rot:bow(0)});
  out+=person({...ROB,seed:51,x:760,y:1500+rise(t,27.33,.35)*600+(t>27.9?EI.dy:0),s:.62,eyes:'open',mouth:'grin',mask:'wolf',armR:-150+swing(t,28.2,20,1.667,1),rot:bow(1)});
  out+=proscenium();
  out+=caps(X.c7,300,t,28.2,.6);
  out+=popG(t,29.4,540,1247,cut(rim(wob([[110,1212],[970,1212],[970,1282],[110,1282]],3),'#fffaf0',6)+`<text x="540" y="1260" text-anchor="middle" font-family="Jua" font-size="${LANG==='en'?40:42}" fill="${ink}">${X.k7}</text>`,'shs'));
  out+=drapes(t<27.22?1-eo(cl((t-27.0)/.22)):0,'#b8322a')+'';}
 out+=grainAll();S.innerHTML=out;};
document.fonts.load('70px Jua').then(()=>document.fonts.load('30px "Black Han Sans"')).then(()=>document.fonts.ready).then(()=>{window.ready=true;});
</script></body></html>
