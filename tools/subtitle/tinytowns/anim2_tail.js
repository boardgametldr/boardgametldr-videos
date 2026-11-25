// ================= ANIMATION =================
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));const ease=x=>{x=cl(x);return x*x*(3-2*x);};
const outBack=x=>{x=cl(x);const c=1.9;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);};
const lerp=(a,b,t)=>a+(b-a)*t;const V=(x,y,z)=>new THREE.Vector3(x,y,z);
function setCam(p,l,fov){cam.fov=fov;cam.updateProjectionMatrix();cam.position.copy(p);cam.lookAt(l);cam.updateMatrixWorld(true);}
// falling: held at h until t0, falls to 0 by t0+0.3 with small bounce
function fallY(lt,t0,h){if(lt<t0)return h;const u=(lt-t0)/0.3;if(u<1)return h*(1-u*u);const b=lt-t0-0.3;return b<0.18?Math.sin(b/0.18*Math.PI)*0.5:0;}
const landed=(lt,t0)=>lt>=t0+0.3;
function shake(lt,t0,amp=0.35){const d=lt-t0-0.3;if(d<0||d>0.25)return;const k=(1-d/0.25)*amp;cam.position.x+=(Math.random()-0.5)*k*2;cam.position.y+=(Math.random()-0.5)*k*2;}
function handY(lt,tin,tout,low){if(lt<tin)return 30;if(lt<tin+0.45)return lerp(30,low,ease((lt-tin)/0.45));if(lt<tout)return low;return lerp(low,32,ease((lt-tout)/0.5));}
const scr=(v)=>{const p=v.clone().project(cam);return {x:(p.x+1)/2*W,y:(1-p.y)/2*H};};
const popS=(lt,t0)=>lt<t0?0:outBack((lt-t0)/0.22);
const life=(lt,t0,t1)=>lt<t0||lt>t1?0:(lt>t1-0.15?cl((t1-lt)/0.15):popS(lt,t0));
function typed(str,lt,t0,cps){const n=Math.floor(cl((lt-t0)*cps,0,str.length));return str.slice(0,n);}
// overlay control
const OV={};['cap','lab','score','name','info','talk','rew'].forEach(k=>OV[k]=document.getElementById(k));
function hideAll(){for(const k in OV)OV[k].style.display='none';document.getElementById('pops').innerHTML='';document.getElementById('bubs').innerHTML='';}
function capShow(html,s,top=300,fs=84){const c=OV.cap;c.innerHTML=html;c.style.display='block';c.style.top=top+'px';c.style.fontSize=fs+'px';c.style.transform='scale('+s+')';}
function ovShow(k,s,html){const e=OV[k];if(html!==undefined)e.innerHTML=html;e.style.display='block';const base=(k==='lab')?'translateX(-50%) ':'';e.style.transform=base+'scale('+s+')';}
function bubAt(who,col,txt,x,y,s,small,tx){const d=document.createElement('div');d.className='bub'+(small?' small':'');d.innerHTML='<div class="who" style="background:'+col+'">'+who+'</div>'+txt;
 d.style.left=cl(x,20,W-470)+'px';d.style.top=y+'px';d.style.transform='scale('+s+')';d.style.transformOrigin='30% 100%';if(tx)d.style.setProperty('--tx',tx+'px');document.getElementById('bubs').appendChild(d);}
function popAt(v,txt,s){const p=scr(v);const d=document.createElement('div');d.className='pop out6';d.textContent=txt;d.style.left=p.x+'px';d.style.top=p.y+'px';d.style.transform='translate(-50%,-50%) scale('+s+')';document.getElementById('pops').appendChild(d);}
function sparkGroup(c){const G=new THREE.Group();for(let k=0;k<22;k++){const a=k/22*Math.PI*2;const m=box(0.35,0.35,0.35,L({color:k%2?0xffe14d:0xffffff,emissive:k%2?0x886600:0x777777}),c.x+Math.cos(a)*3.2*(0.8+rand()*0.4),1.5+rand()*3,c.z+Math.sin(a)*3.2*(0.8+rand()*0.4),G,0.03);m.userData.v=0.6+rand();}return G;}
function bobPeople(arr,lt,amp=0.06){arr.forEach((p,i)=>{p.position.y=0.06+Math.abs(Math.sin(lt*5+i*1.3))*amp;});}
function jump(p,lt,t0){const d=lt-t0;if(d>0&&d<0.35)p.position.y=0.06+Math.sin(d/0.35*Math.PI)*0.9;}
const TL=[['f1',0,2.5],['f2',2.5,4.0],['f3',4.0,7.0],['f4',7.0,10.0],['f5',10.0,13.0],['xc',13.0,15.0],['f6',15.0,17.5],['xf',17.5,19.5],['xa',19.5,22.5],['xb',22.5,24.5],['xd',24.5,26.5],['xe',26.5,28.0],['f7',28.0,29.5],['f8',29.5,32.5],['f9',32.5,35.0],['f10',35.0,37.5],['f11',37.5,41.5]];
const DUR=41.5;
const SC={};
function build(key,fn){S.remove(DYN.g);DYN.g=new THREE.Group();S.add(DYN.g);seed=5;const r=fn();r.g=DYN.g;S.remove(DYN.g);SC[key]=r;return r;}
const B={};
B.f1=()=>{const v=village(finalLayout,finalBuild);const ps=[person({shirt:'#d9607a',mood:'sad',sweat:true,ry:0.25},-0.4,13.2),person({shirt:'#4fae8f',hair:'#2b2b2b',mood:'shock',ry:-0.35},0.75,9.6),person({shirt:'#e8a33d',hair:'#7a4a22',mood:'sad',ry:0.1},-0.5,7.6)];return {v,ps};};
B.f2=()=>{const v=village(finalLayout,finalBuild);const ps=[person({shirt:'#d9607a',mood:'happy',ry:0.25},-0.4,13.2),person({shirt:'#4fae8f',hair:'#2b2b2b',mood:'happy',ry:-0.35},0.75,9.6)];return {v,ps};};
B.f3=()=>{village([],[]);const q=lp(2,0);const lg=add(logPile(2,0));const h=hand(CA,q.x,30,q.z,1.5);
 const ps=[person({shirt:'#d9607a',mood:'shock'},q.x-4.6,q.z+3.6),person({shirt:'#e8a33d',hair:'#7a4a22',mood:'shock'},q.x+3.4,q.z+3.8)];return {q,lg,h,ps};};
B.f4=()=>{village([['wood',2,0]],[]);const tgt=lp(1,1);const pl=[add(hayPile(1,0)),add(glassPile(1,1)),add(brickPile(0,1))];pl.forEach(p=>p.userData.o=p.position.clone());
 const ck=add(cottage(1,1));const sp=add(sparkGroup(tgt));const ps=[person({shirt:'#d9607a',mood:'happy',ry:0.2},tgt.x+0.2,tgt.z+3.4),person({shirt:'#e8a33d',hair:'#7a4a22',mood:'happy',ry:-0.3},tgt.x+1.6,tgt.z+3.3)];return {tgt,pl,ck,sp,ps};};
B.f5=()=>{village([['wood',2,0],['stone',0,0],['stone',3,0],['stone',0,1]],finalBuild);const a=lp(1,2),b=lp(3,1);
 const s1=add(stonePile(1,2)),s2=add(stonePile(3,1));const hA=hand(CA,a.x,30,a.z,1.5),hB=hand(CB,b.x,30,b.z,1.5);
 const p=person({shirt:'#d9607a',mood:'sad',sweat:true},lp(1,1).x,lp(1,1).z+3.5);return {a,b,s1,s2,hA,hB,p};};
B.f6=()=>{village([['wood',2,0],['stone',0,0],['stone',3,0],['stone',0,1],['stone',1,2],['stone',3,1]],finalBuild);const h0=lp(0,2),a=lp(2,2);
 const hp=add(hayPile(0,2));const hM=hand(CME,h0.x,30,h0.z,1.0);const s1=add(stonePile(2,2));const hA=hand(CA,a.x,30,a.z,1.5);
 const p=person({shirt:'#d9607a',mood:'sad',sweat:true},lp(1,1).x,lp(1,1).z+3.5);return {h0,a,hp,hM,s1,hA,p};};
B.f7=()=>{village(finalLayout,finalBuild);return {rest:[]};};
B.f7old=()=>{village([['wood',2,0],['stone',0,0],['stone',3,0],['stone',0,1],['stone',1,2],['stone',3,1],['wheat',0,2],['stone',2,2]],finalBuild);
 const rest=[['stone',1,0],['stone',2,1],['glass',3,2],['stone',0,3],['stone',1,3],['stone',2,3],['stone',3,3]].map(([t,i,j])=>add(pileOf[t](i,j)));return {rest};};
B.f8=()=>{miniBoard(finalLayout,finalBuild,-1.5,0.9,0.15);miniBoard(fALayout,fABuild,1.5,0.9,-0.15);miniBoard(fBLayout,fBBuild,0,-0.2,0);
 chair(-3.6,0.6,Math.PI/2);const me=add(villager({shirt:CME,hair:'#5a3a22',mood:'sad',sweat:true,seated:true}));me.position.set(-3.55,0,0.6);me.rotation.y=Math.PI/2-0.3;me.userData.arms[0].rotation.x=-1.1;me.userData.arms[1].rotation.x=-1.1;
 chair(3.6,0.6,-Math.PI/2);const fa=add(villager({shirt:CA,hair:'#c9873a',mood:'happy',seated:true}));fa.position.set(3.55,0,0.6);fa.rotation.y=-Math.PI/2+0.3;
 chair(0,-1.9,0);const fb=add(villager({shirt:CB,hair:'#2b2b2b',mood:'happy',seated:true}));fb.position.set(0,0,-1.85);return {me,fa,fb};};
B.f9=()=>{miniBoard(finalLayout,finalBuild,0,0.6,0);return {};};
B.f10=()=>{miniBoard(finalLayout,finalBuild,-0.3,1.2,0.1);chair(-0.3,-1.4,0);const me=add(villager({shirt:CME,hair:'#5a3a22',mood:'sad',sweat:true,seated:true}));me.position.set(-0.3,0,-1.35);return {me};};
B.f11=()=>{village([['brick',0,3]],[['chapel',1,1],['cottage',0,0],['cottage',2,0],['cottage',3,0],['cottage',0,1],['cottage',2,1],['cottage',3,1],['cottage',0,2],['cottage',2,2],['chapel',3,2],['cottage',1,3],['cottage',2,3],['cottage',3,3],['cottage',1,2]]);
 const ps=[person({shirt:'#d9607a',mood:'happy'},-0.4,12.6),person({shirt:'#4fae8f',hair:'#2b2b2b',mood:'happy'},0.9,11.0)];return {ps};};
const U={};
U.f1=(lt,o)=>{envOut();const z=lerp(26,22.6,ease(lt/2.5));setCam(V(-1.2,lerp(6.8,6.0,ease(lt/2.5)),z),V(0.3,1.6,3),48);bobPeople(o.ps,lt,0.04);
 const l1=typed('아니..',lt,0.25,8),l2=typed('이게 내 마을임…',lt,0.95,9);const done=lt>0.95+8/9;
 capShow('<span class="w">'+l1+'</span><br>'+l2.replace('이게','<span class="w">이게</span>')+(done?' 🪨':'')+'&nbsp;',lt<0.25?0:1);};
U.f2=(lt,o)=>{envOut();setCam(V(-1.2,6.0,22.6),V(0.3,1.6,3),48);
 o.v.children.forEach((c,i)=>{const d=cl((lt-0.05-i*0.035)/0.45);c.position.y=d*d*45;c.visible=d<1;});
 bobPeople(o.ps,lt,0.05);ovShow('rew',1);if(lt>0.45)capShow('<span class="w">어쩌다 이렇게</span><br>됐냐면…',popS(lt,0.45));};
U.f3=(lt,o)=>{envOut();setCam(V(0,lerp(30,28,ease(lt/3)),lerp(44,41,ease(lt/3))),V(0,5.5,0),44);
 const hy=handY(lt,0.05,1.25,10.5);o.h.position.y=hy;const ly=lt<0.95?hy-6.3:fallY(lt,0.95,4.2);o.lg.position.y=ly;
 o.ps.forEach(p=>{p.position.y=0.06;jump(p,lt,1.25);});shake(lt,0.95,0.5);
 capShow('<span class="w">누가 부른 자재든</span><br>무조건 내 마을에 놔야 함',popS(lt,0.0),300,72);
 {const s=life(lt,0.45,1.9);if(s>0){const p=scr(V(o.q.x,9.5,o.q.z));bubAt('친구A',CA,'<span class="y">목재!</span> 🪵',p.x+70,p.y-110,s,false,30);}}};
U.f4=(lt,o)=>{envOut();const t=o.tgt;setCam(V(t.x+lerp(-2,3,ease(lt/3)),lerp(14,10,ease(lt/3)),t.z+lerp(18,15,ease(lt/3))),V(t.x-0.6,1.8,t.z-0.6),46);
 const m=cl((lt-0.9)/0.35);o.pl.forEach(p=>{p.position.lerpVectors(p.userData.o,V(t.x,0,t.z),ease(m));p.scale.setScalar(1-0.9*ease(m));p.visible=m<1;});
 const cs=lt<1.25?0:outBack((lt-1.25)/0.3);o.ck.scale.setScalar(Math.max(0.001,cs));o.ck.visible=lt>=1.25;
 o.sp.visible=lt>1.25&&lt<2.6;o.sp.children.forEach(c=>{c.position.y+=0;c.rotation.x=lt*3;});if(o.sp.visible)o.sp.position.y=(lt-1.25)*1.2;
 o.ps.forEach((p,i)=>{p.visible=lt>1.6;p.position.y=0.06+Math.abs(Math.sin(lt*6+i))*0.12;});
 capShow('모양 맞추면<br><span class="w">집이 생김</span> 🏠',popS(lt,0.0));if(lt>1.55)ovShow('lab',popS(lt,1.55),'🏠 첫 집 완성!');};
U.f5=(lt,o)=>{envOut();setCam(V(0,29,43),V(0,5.5,0),44);
 const ya=handY(lt,0.0,0.95,10.5);o.hA.position.y=ya;o.s1.position.y=lt<0.6?ya-6.3:fallY(lt,0.6,4.2);
 const yb=handY(lt,1.05,2.0,10.9);o.hB.position.y=yb;o.s2.position.y=lt<1.65?yb-6.3:fallY(lt,1.65,4.6);
 o.p.position.y=0.06;jump(o.p,lt,0.9);jump(o.p,lt,1.95);shake(lt,0.6,0.5);shake(lt,1.65,0.5);
 capShow('<span class="w">근데 친구들이</span><br>짜고 돌만 부름',popS(lt,0.0));
 {const s=life(lt,0.35,1.35);if(s>0){const p=scr(V(o.a.x,9.5,o.a.z));bubAt('친구A',CA,'석재!',p.x-330,p.y-120,s,false,250);}}
 {const s=life(lt,1.4,2.9);if(s>0){const p=scr(V(o.b.x,9.9,o.b.z));bubAt('친구B',CB,'석재!!',p.x-330,p.y-120,s,false,250);}}};
U.f6=(lt,o)=>{envOut();setCam(V(-3.5,29,43),V(-3.5,5.5,0),44);
 const ym=handY(lt,0.0,0.95,6.5);o.hM.position.y=ym;o.hp.position.y=lt<0.75?Math.max(0,ym-5.6):0;
 const ya=handY(lt,1.0,2.05,10.7);o.hA.position.y=ya;o.s1.position.y=lt<1.6?ya-6.3:fallY(lt,1.6,4.4);
 o.p.position.y=0.06;jump(o.p,lt,1.95);shake(lt,1.6,0.8);
 capShow('<span class="w">겨우 내 차례…</span>',popS(lt,0.0));
 {const s=life(lt,0.35,1.25);if(s>0){const p=scr(V(o.h0.x,5.5,o.h0.z));bubAt('나',CME,'밀…',p.x+50,p.y-90,s,true,30);}}
 {const s=life(lt,1.25,2.45);if(s>0){const p=scr(V(o.a.x,9.7,o.a.z));bubAt('친구A',CA,'또 <span class="r">석재!!!</span> 🪨',p.x-160,p.y-125,s,false,180);}}};
U.f7=(lt,o)=>{envOut();const u=ease(lt/1.1);S.fog=u>0.4?null:S.fog;
 const pos=V(0,lerp(29,92,u),lerp(43,0.01,u)),lk=V(0,lerp(5.5,0,u),0);setCam(pos,lk,lerp(44,40,u));
 o.rest.forEach((g,i)=>{g.position.y=fallY(lt,0.05+i*0.11,30);});};
U.f8=(lt,o)=>{envRoom();const u=ease((lt-0.15)/1.3);
 const p0=V(-1.5,4.6,0.95),l0=V(-1.5,1.7,0.9);const p1=V(0,8.2,21),l1=V(0,2.2,0.2);
 setCam(V(lerp(p0.x,p1.x,u),lerp(p0.y,p1.y,u),lerp(p0.z,p1.z,u)),V(lerp(l0.x,l1.x,u),lerp(l0.y,l1.y,u),lerp(l0.z,l1.z,u)),lerp(40,44,u));
 o.fa.position.y=Math.abs(Math.sin(lt*5))*0.06;o.fb.position.y=Math.abs(Math.sin(lt*5+1))*0.06;
 o.fa.userData.arms[1].rotation.z=2.4+Math.sin(lt*8)*0.2;o.fb.userData.arms[0].rotation.z=-2.4-Math.sin(lt*8+1)*0.2;
 if(lt>1.1)capShow('<span class="w">참고로</span><br>이거 보드게임임 🧱',popS(lt,1.1));if(lt>1.4)ovShow('name',popS(lt,1.4));
 document.getElementById('flash').style.opacity=lt<0.3?(1-lt/0.3):0;};
U.f9=(lt,o)=>{envRoom();setCam(V(0,lerp(9.8,9.3,ease(lt/2.5)),lerp(3.4,3.1,ease(lt/2.5))),V(0,1.7,0.3),40);
 capShow('건물 없는 칸은<br><span class="r">전부 -1점</span>',popS(lt,0.0));
 finalLayout.forEach(([t,i,j],k)=>{const t0=0.35+k*0.07;if(lt>t0)popAt(V((i-1.5)*0.47,2.15,0.6+(j-1.5)*0.47),'-1',popS(lt,t0));});
 if(lt>1.6)ovShow('score',popS(lt,1.6),'<div class="row"><span>나</span><span style="color:#e0393e">-15점</span></div><div class="row"><span>친구A</span><span style="color:#2e9d4f">+21점</span></div><div class="row"><span>친구B</span><span style="color:#2e9d4f">+17점</span></div>');};
U.f10=(lt,o)=>{envRoom();setCam(V(1.6,lerp(4.9,4.5,ease(lt/2.5)),lerp(9.2,8.3,ease(lt/2.5))),V(-0.2,2.1,0),44);
 const w=Math.sin(lt*14)*0.12;o.me.userData.arms[0].rotation.z=-2.7+w;o.me.userData.arms[1].rotation.z=2.7-w;o.me.rotation.z=Math.sin(lt*7)*0.03;
 capShow('내 마을 돌밭 만들 것 같은<br><span class="w">친구한테 공유하기</span> 🪨',popS(lt,0.1),300,66);
 if(lt>0.5){document.getElementById('twho').textContent='나';document.getElementById('ttxt').innerHTML='다음엔 내가 <span class="b">수석 건축가</span>다…';ovShow('talk',popS(lt,0.5));}};
U.f11=(lt,o)=>{envOut();const a=lerp(-0.25,0.2,lt/4);setCam(V(Math.sin(a)*48,40,Math.cos(a)*48),V(0,-3,0),44);bobPeople(o.ps,lt,0.06);
 ovShow('info',popS(lt,0.15));};

// ---------- new scenes ----------
const HEMI=S.children.find(c=>c.isHemisphereLight);
function resetLight(){HEMI.color.set(0xffffff);HEMI.groundColor.set(0x9cc070);HEMI.intensity=1.7;sun.color.set(0xfff1d6);sun.intensity=2.1;sun.position.set(-14,26,18);}
function signMesh(txt,col){const c=document.createElement('canvas');c.width=288;c.height=128;const g=c.getContext('2d');g.fillStyle='#f6ecd2';g.fillRect(0,0,288,128);g.strokeStyle='#3b2a12';g.lineWidth=10;g.strokeRect(5,5,278,118);
 g.fillStyle=col||'#c0392b';g.font='44px Galmuri';g.textAlign='center';g.textBaseline='middle';g.imageSmoothingEnabled=false;g.fillText(txt,144,66);const tx=new THREE.CanvasTexture(c);tx.magFilter=tx.minFilter=THREE.NearestFilter;tx.colorSpace=THREE.SRGBColorSpace;
 const G=new THREE.Group();box(0.18,4.2,0.18,M.plank,0,2.1,0,G,0.02);box(2.4,1.07,0.12,[M.plank,M.plank,M.plank,M.plank,L({map:tx}),M.plank],0,4.3,0.05,G,0.03);return G;}
const S5END=[['wood',2,0],['stone',0,0],['stone',3,0],['stone',0,1],['stone',1,2],['stone',3,1]];
const S6END=S5END.concat([['wheat',0,2],['stone',2,2]]);
B.xc=()=>{village(S5END,finalBuild);const a=lp(2,2);const h=hand(CA,a.x,10.8,a.z,1.5);const p=person({shirt:'#d9607a',mood:'sad',sweat:true},lp(1,1).x,lp(1,1).z+3.5);return {h,p,a};};
B.xf=()=>{village(fALayout,fABuild.filter(b=>!(b[1]===3&&b[2]===1)));const q=lp(3,1);const gp=add(glassPile(3,1));const ch=add(chapel(3,1));const sp=add(sparkGroup(q));
 const ps=[person({shirt:'#3fa77f',mood:'happy'},q.x-3.4,q.z+3.4),person({shirt:'#f2c14e',hair:'#7a4a22',mood:'happy'},q.x-1.8,q.z+3.6)];return {q,gp,ch,sp,ps};};
B.xa=()=>{village(S6END,finalBuild);const rest=[['stone',1,0],['stone',2,1],['glass',3,2],['stone',0,3],['stone',1,3],['stone',2,3],['stone',3,3]].map(([tt,i,j])=>add(pileOf[tt](i,j)));return {rest};};
B.xb=()=>{village(finalLayout,finalBuild);const pp=[[{shirt:'#d9607a',mood:'sad',sweat:true,ry:0.15},-0.6,12.4,'돌 그만!!','#c0392b'],[{shirt:'#4fae8f',hair:'#2b2b2b',mood:'shock',ry:-0.2},0.9,10.6,'집 지어줘','#2f6fe0'],[{shirt:'#e8a33d',hair:'#7a4a22',mood:'sad',ry:0.1},-0.4,8.4,'석재 OUT','#c0392b']];
 const out=[];pp.forEach(([o,x,z,txt,col],i)=>{const p=person(o,x,z);const sg=add(signMesh(txt,col));sg.scale.setScalar(0.62);sg.position.set(x+0.35,0,z+0.35);sg.rotation.z=i%2?0.12:-0.1;p.userData.arms[1].rotation.x=-2.6;out.push([p,sg,x,z]);});return {out};};
B.xd=()=>{const my=village(finalLayout,finalBuild);const fv=village(fALayout,fABuild);return {my,fv};};
B.xe=()=>{village(finalLayout,finalBuild);const q=lp(1,1);const fl=new THREE.Group();box(0.2,4,0.2,M.plank,0,2,0,fl,0.02);box(1.8,1.1,0.1,L({color:0xe8a33d}),0.95,3.4,0,fl,0.03);fl.position.set(q.x+1.2,4.6,q.z);add(fl);
 const fw=[];const cols=[0xff5a5a,0xffd84d,0x5ad1ff,0x9b7bf0,0x7dff7d];
 for(let b=0;b<3;b++){const G=new THREE.Group();const c=V(q.x+[-4.5,4.5,0.5][b],[9.0,10.4,11.0][b],q.z-[3,5,8][b]);for(let k=0;k<26;k++){const th=rand()*Math.PI*2,ph=Math.acos(2*rand()-1);const m=box(0.42,0.42,0.42,L({color:cols[(b+k)%5],emissive:cols[(b+k)%5]}),0,0,0,G,0.0,false);m.userData.d=V(Math.sin(ph)*Math.cos(th),Math.cos(ph),Math.sin(ph)*Math.sin(th));}G.position.copy(c);add(G);fw.push(G);}
 const ps=[person({shirt:'#d9607a',mood:'happy'},q.x-0.6,q.z+3.4),person({shirt:'#e8a33d',hair:'#7a4a22',mood:'happy'},q.x+1.0,q.z+3.5)];return {q,fl,fw,ps};};
const SQ=(c)=>'<div style="width:62px;height:62px;background:'+c+';border:5px solid '+(c==='transparent'?'transparent':'#3b2a12')+'"></div>';
U.xc=(lt,o)=>{envOut();setCam(V(0,lerp(29,28,ease(lt/2)),lerp(43,41,ease(lt/2))),V(0,5.5,0),44);o.h.position.y=10.8+Math.sin(lt*4)*0.25;o.p.position.y=0.06;
 capShow('<span class="w">근데 친구는</span><br>왜 돌만 부를까?',popS(lt,0.0));
 const s=popS(lt,0.35);if(lt>0.35){const p=scr(V(o.a.x+1.2,10.5,o.a.z));const g=[['transparent','transparent','#cfefff'],['#8d8d8d','#cfefff','#8d8d8d']];
  document.getElementById('bubs').innerHTML+='<div style="position:absolute;left:'+cl(p.x+30,20,600)+'px;top:'+(p.y-240)+'px;transform:scale('+s+');transform-origin:0% 100%;background:#FFF8E6;border:7px solid #3b2a12;border-radius:40px;padding:22px 30px;font-family:Galmuri;color:#3b2a12;text-align:center;box-shadow:0 10px 0 rgba(59,42,18,.35)"><div style="font-size:40px;margin-bottom:12px">⛪ 성당 설계도</div><div style="display:grid;grid-template-columns:repeat(3,62px);gap:6px;justify-content:center">'+g.flat().map(SQ).join('')+'</div><div style="font-size:36px;margin-top:12px;line-height:1.4">나도 돌 필요하고<br>쟤는 망하고 😏</div></div>';}};
U.xf=(lt,o)=>{envOut();setCam(V(0,29,43),V(0,5.5,0),44);
 o.gp.position.y=fallY(lt,0.25,9);o.gp.visible=lt<0.95;const cs=lt<0.95?0:outBack((lt-0.95)/0.3);o.ch.scale.setScalar(Math.max(0.001,cs));o.ch.visible=lt>=0.95;
 o.sp.visible=lt>0.95&&lt<1.9;if(o.sp.visible)o.sp.position.y=(lt-0.95)*1.2;o.ps.forEach((p,i)=>{p.position.y=0.06;jump(p,lt,1.0+i*0.08);});
 capShow('<span class="w">내가 불러도</span><br>친구만 이득',popS(lt,0.0));
 {const s=life(lt,0.05,1.0);if(s>0)bubAt('나',CME,'유리!',140,760,s,false,60);}
 {const s=life(lt,1.0,2.0);if(s>0){const p=scr(V(o.q.x,7,o.q.z));bubAt('친구A',CA,'땡큐~ 😏',p.x-200,p.y-160,s,false,180);}}};
const lerpC=(a,b,u)=>new THREE.Color(a).lerp(new THREE.Color(b),u);
U.xa=(lt,o)=>{envOut();const u=lt/3;let sky,h,si,fogc;
 if(u<0.33){const k=u/0.33;sky=lerpC(0xf08a5b,0x1b1f4a,k);h=1.3-0.6*k;si=1.6-1.2*k;}else if(u<0.66){sky=new THREE.Color(0x1b1f4a);h=0.7;si=0.4;}else{const k=(u-0.66)/0.34;sky=lerpC(0x1b1f4a,0x9fd6ff,k);h=0.7+1.0*k;si=0.4+1.7*k;}
 S.background=sky;S.fog=new THREE.Fog(sky.getHex(),55,140);HEMI.intensity=h;sun.intensity=si;HEMI.color.set(u<0.66?0xffc58a:0xffffff);
 setCam(V(0,29,43),V(0,5.5,0),44);o.rest.forEach((g,i)=>{g.position.y=fallY(lt,0.3+i*0.3,26);});
 capShow('<span class="w">돌이 계속</span> 쌓임…',popS(lt,0.0));
 const n=1+Math.min(6,Math.floor(lt/0.45));const e=document.createElement('div');e.className='out6';e.style.cssText='position:absolute;left:0;right:0;top:820px;text-align:center;font-family:Galmuri;font-size:96px;color:#fff';e.textContent=n+'라운드 후…';document.getElementById('bubs').appendChild(e);};
U.xb=(lt,o)=>{envOut();setCam(V(-1.0,5.2,lerp(22.5,21.0,ease(lt/2))),V(0.3,2.2,4),48);
 o.out.forEach(([p,sg,x,z],i)=>{const b=Math.abs(Math.sin(lt*7+i*1.1))*0.35;p.position.y=0.06+b*0.3;sg.position.y=b;});
 capShow('주민들 <span class="w">파업 중</span> ✊',popS(lt,0.0));};
U.xd=(lt,o)=>{envOut();setCam(V(0,lerp(41,38,ease(lt/2)),lerp(41,38,ease(lt/2))),V(0,0,0),44);
 capShow('<span class="w">같은 돌</span> 받았는데…',popS(lt,0.0));
 const s=popS(lt,0.3);document.getElementById('bubs').innerHTML+='<div style="position:absolute;left:0;top:0;width:540px;height:1920px;border-right:8px solid #3b2a12"></div>'+
 '<div style="position:absolute;left:150px;top:1450px;transform:scale('+s+');background:#FFD84D;border:6px solid #3b2a12;border-radius:999px;padding:10px 30px;font-family:Galmuri;font-size:44px;color:#3b2a12">내 마을</div><div style="position:absolute;left:670px;top:1450px;transform:scale('+s+');background:#FFD84D;border:6px solid #3b2a12;border-radius:999px;padding:10px 30px;font-family:Galmuri;font-size:44px;color:#3b2a12">친구 마을</div>';};
U.xe=(lt,o)=>{envOut();const q=o.q;setCam(V(q.x+3,8.5,q.z+21),V(q.x,5.6,q.z),46);
 const fu=ease(lt/0.35);o.fl.position.y=lerp(-0.5,4.6,fu);
 o.fw.forEach((G,b)=>{const t0=0.35+b*0.3;const d=lt-t0;G.visible=d>0&&d<0.9;G.children.forEach(m=>{const r=d*7;m.position.copy(m.userData.d).multiplyScalar(r);m.position.y-=d*d*3;m.scale.setScalar(Math.max(0.01,1-d/0.9));});});
 o.ps.forEach((p,i)=>{p.position.y=0.06+Math.abs(Math.sin(lt*8+i))*0.4;});
 capShow('마을 완성! 🎆',popS(lt,0.15));};

let curKey=null;
window.setT=(t)=>{hideAll();document.getElementById('flash').style.opacity=0;resetLight();
 let k=TL.length-1;for(let i=0;i<TL.length;i++)if(t<TL[i][2]){k=i;break;}
 const [key,a]=TL[k];const lt=t-a;
 if(curKey!==key){if(curKey&&SC[curKey])S.remove(SC[curKey].g);const o=SC[key]||build(key,B[key]);S.add(o.g);curKey=key;}
 U[key](lt,SC[key]);
 // quick whip flash at scene cuts
 if(lt<0.12&&k>0&&key!=='f8'&&key!=='f2'){document.getElementById('flash').style.opacity=(1-lt/0.12)*0.55;}
 if(key==='xd'){const o=SC[key];R.setScissorTest(true);o.my.visible=true;o.fv.visible=false;R.setScissor(0,0,W/2,H);R.setViewport(-W/4,0,W,H);R.render(S,cam);o.my.visible=false;o.fv.visible=true;R.setScissor(W/2,0,W/2,H);R.setViewport(W/4,0,W,H);R.render(S,cam);R.setScissorTest(false);R.setViewport(0,0,W,H);}
 else R.render(S,cam);};
document.fonts.load('44px Galmuri').then(()=>document.fonts.ready).then(()=>{window.ready=true;});
</script></body></html>
