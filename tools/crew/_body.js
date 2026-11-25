
// ===================== 몸 · 머리카락 v2 =====================
// 머리: 큰 덩어리(두피 쉘) → 중간 덩어리(가닥 다발) → 작은 덩어리(앞머리·삐침), 가닥 끝은 뾰족하게
const sph=(az,el,r=1)=>new THREE.Vector3(r*Math.cos(el)*Math.sin(az),r*Math.sin(el),r*Math.cos(el)*Math.cos(az));
const D=Math.PI/180;
// 가닥: 경로를 따라 납작한 타원 단면, 끝으로 갈수록 가늘어짐 (blunt=일자컷)
function lockGeo(pts,r,flat=0.5,blunt=false,seg=26,rad=12){
  const curve=new THREE.CatmullRomCurve3(pts,false,'centripetal');const pos=[],idx=[],nor=[],uv=[];
  for(let i=0;i<=seg;i++){const t=i/seg;const P=curve.getPointAt(t),T=curve.getTangentAt(t).normalize();
    let O=P.clone().sub(new THREE.Vector3(0,0.05,0));O.sub(T.clone().multiplyScalar(O.dot(T))).normalize();const Wd=new THREE.Vector3().crossVectors(T,O).normalize();
    let f=blunt?(t<0.9?0.85+0.15*Math.sin(Math.min(1,t/0.25)*Math.PI/2):Math.sqrt(Math.max(0,1-(t-0.9)/0.1))*1.0):(t<0.18?0.7+0.3*Math.sin(t/0.18*Math.PI/2):Math.max(0.1,Math.pow(1-(t-0.18)/0.82,0.8)));
    for(let j=0;j<=rad;j++){const a=j/rad*Math.PI*2;const v=P.clone().addScaledVector(Wd,Math.cos(a)*r*f).addScaledVector(O,Math.sin(a)*r*f*flat);pos.push(v.x,v.y,v.z);const nn=new THREE.Vector3().addScaledVector(Wd,Math.cos(a)*flat).addScaledVector(O,Math.sin(a)).normalize();if(t>0.92)nn.lerp(T,(t-0.92)/0.08*0.6).normalize();nor.push(nn.x,nn.y,nn.z);uv.push(j/rad,t);}}
  for(let i=0;i<seg;i++)for(let j=0;j<rad;j++){const a=i*(rad+1)+j,b=a+rad+1;idx.push(a,b,a+1,b,b+1,a+1);}
  const e=curve.getPointAt(1).addScaledVector(curve.getTangentAt(1),r*0.04),s0=curve.getPointAt(0).addScaledVector(curve.getTangentAt(0),-r*0.3);const ce=pos.length/3;pos.push(e.x,e.y,e.z,s0.x,s0.y,s0.z);{const t1=curve.getTangentAt(1),t0=curve.getTangentAt(0);nor.push(t1.x,t1.y,t1.z,-t0.x,-t0.y,-t0.z);uv.push(0.5,1,0.5,0);}
  for(let j=0;j<rad;j++){const a=seg*(rad+1)+j;idx.push(a,a+1,ce);idx.push(j+1,j,ce+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);return g;}
function hairTexCanvas(col){const c=document.createElement('canvas');c.width=512;c.height=16;const g=c.getContext('2d');const base=new THREE.Color(col);
  g.fillStyle='#'+base.getHexString();g.fillRect(0,0,512,16);let s=7;const rr=()=>{s=(s*9301+49297)%233280;return s/233280;};
  const dk=base.clone().multiplyScalar(0.55),lt=base.clone().lerp(new THREE.Color(0xffffff),0.22);
  for(let i=0;i<46;i++){const x=rr()*512,w=1+rr()*4;g.fillStyle='#'+dk.getHexString();g.globalAlpha=0.35+rr()*0.3;g.fillRect(x,0,w,16);}
  for(let i=0;i<22;i++){const x=rr()*512,w=1+rr()*2;g.fillStyle='#'+lt.getHexString();g.globalAlpha=0.25;g.fillRect(x,0,w,16);}
  return c;}
function hairMats(col){const c=hairTexCanvas(col);const mk=(rx)=>{const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,1);t.anisotropy=8;return new THREE.MeshStandardMaterial({map:t,roughness:.5});};
  return {lock:mk(1),shell:mk(6)};}
function lock(P,mat,pts,r,flat,blunt){return add(lockGeo(pts.map(p=>p.isVector3?p:new THREE.Vector3(...p)),r,flat,blunt),mat,P.head);}
// 두피 위를 따라 흐르는 가닥: (az0,el0)→(az1,el1), 반경 r0→r1, 끝에서 dy만큼 더 내려감
function flow(P,mat,az0,el0,az1,el1,{w=0.26,flat=0.45,r0=1.03,r1=1.1,dy=0,curl=0,blunt=false,n=5,inward=0,yEnd=null}={}){
  const pts=[];for(let i=0;i<=n;i++){const t=i/n;pts.push(sph(az0+(az1-az0)*t,el0+(el1-el0)*t,r0+(r1-r0)*Math.sin(t*Math.PI/2)));}
  if(yEnd!==null)dy=Math.max(0.1,pts[pts.length-1].y-yEnd);
  if(dy){const e=pts[pts.length-1];const out=new THREE.Vector3(e.x,0,e.z).normalize();
    pts.push(e.clone().add(new THREE.Vector3(0,-dy*0.5,0)).addScaledVector(out,0.05));pts.push(e.clone().add(new THREE.Vector3(0,-dy,0)).addScaledVector(out,0.06-inward));}
  if(curl){const e=pts[pts.length-1],p=pts[pts.length-2];const d=e.clone().sub(p).normalize();const out=e.clone().setY(0).normalize();pts.push(e.clone().addScaledVector(d,0.12).addScaledVector(out,curl));}
  return lock(P,mat,pts,w,flat,blunt);}
function shell(P,mat,{top=0.5,backTo=0.7,frontCut=60,r=1.035,sy=1}={}){ // 큰 덩어리
  mat=P.hairM?P.hairM.shell:mat;const a=add(new THREE.SphereGeometry(r,64,40,0,Math.PI*2,0,Math.PI*top),mat,P.head);a.scale.y=sy;
  if(backTo>top){const b=add(new THREE.SphereGeometry(r,64,40,Math.PI/2+frontCut*D,Math.PI*2-2*frontCut*D,Math.PI*top-0.02,Math.PI*(backTo-top)),mat,P.head);b.scale.y=sy;}
  P.hair.visible=false;}

// ---- 몸 ----
function capBetween(a,b,r,mat,parent){const d=new THREE.Vector3().subVectors(b,a);const m=add(new THREE.CapsuleGeometry(r,Math.max(0.01,d.length()),10,18),mat,parent);
  m.position.copy(a).addScaledVector(d,0.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize());return m;}
function mitten(parent,pos,dir,skin,s=1,point=false){const g=new THREE.Group();g.position.copy(pos);parent.add(g);g.quaternion.setFromUnitVectors(new THREE.Vector3(0,-1,0),dir.clone().normalize());g.scale.setScalar(s);
  const p=add(new THREE.SphereGeometry(0.22,20,16),skin,g);p.scale.set(1.0,1.15,0.8);p.position.y=-0.08;
  const th=add(new THREE.CapsuleGeometry(0.07,0.12,6,10),skin,g);th.position.set(0.17,-0.02,0.08);th.rotation.z=0.7;
  if(point){const f=add(new THREE.CapsuleGeometry(0.065,0.26,6,10),skin,g);f.position.set(0,-0.36,0.02);}
  return g;}
// spec: {top, topDark, pants, shoe, sole, hood:true, size, skirt, socks, turtle, sleeveLong, legW}
function person3(spec,hairCol,skinC){
  const g=new THREE.Group();sc.add(g);const S=spec.size||1;
  const top=M(spec.top,.75),topD=M(spec.topDark||spec.top,.8),skin=M(skinC,.6);
  // 몸통 (위가 좁고 아래가 넓은 오버핏)
  const body=add(new THREE.CapsuleGeometry(0.8,0.5,14,28),top,g);body.position.y=0.85;body.scale.set(1.08*S,1,0.86*S);
  // 밑단 밴드
  if(!spec.skirt){const hem=add(new THREE.TorusGeometry(0.74*S,0.075,12,40),topD,g);hem.rotation.x=Math.PI/2;hem.position.y=0.02;hem.scale.set(1.06,0.84,1);}
  // 후드 (목 뒤에 접힌 모자)
  if(spec.hood){const hd=add(new THREE.SphereGeometry(0.62,28,20),top,g);hd.position.set(0,1.62,-0.48);hd.scale.set(1.15,0.62,0.7);
    const rim=add(new THREE.TorusGeometry(0.5,0.13,12,32),topD,g);rim.position.set(0,1.66,-0.2);rim.rotation.x=Math.PI/2-0.5;rim.scale.set(1.15,1,1);
    for(const sx of[-1,1]){capBetween(new THREE.Vector3(sx*0.2,1.5,0.66),new THREE.Vector3(sx*0.22,1.0,0.76),0.035,M(0xFFFFFF,.6),g);
      const ag=add(new THREE.CapsuleGeometry(0.05,0.08,6,8),M(0xF3F0E8,.4),g);ag.position.set(sx*0.22,0.93,0.77);}
    const pk=add(new THREE.SphereGeometry(1,28,16),topD,g);pk.position.set(0,0.4,0.62);pk.scale.set(0.5,0.2,0.1);}
  if(spec.turtle){const tn=add(new THREE.CylinderGeometry(0.42,0.5,0.32,32),topD,g);tn.position.set(0,1.62,0.02);
    for(let i=0;i<3;i++){const r=add(new THREE.TorusGeometry(0.46-i*0.02,0.05,8,32),topD,g);r.rotation.x=Math.PI/2;r.position.set(0,1.5+i*0.1,0.02);}}
  if(spec.collar){for(const sx of[-1,1]){const c=add(new THREE.ConeGeometry(0.2,0.34,3),M(0xFFFFFF,.5),g);c.position.set(sx*0.17,1.58,0.62);c.rotation.set(Math.PI/2+0.35,0,sx*(Math.PI-0.5));c.scale.set(1,1,0.35);}
    const nk=add(new THREE.TorusGeometry(0.42,0.06,8,32),topD,g);nk.rotation.x=Math.PI/2-0.15;nk.position.set(0,1.62,0.08);}
  // 하의
  const pantsM=M(spec.pants,.8),shoeM=M(spec.shoe,.55),soleM=M(spec.sole||0xFFFFFF,.5);const legs=[];
  if(spec.skirt){const sk=add(new THREE.CylinderGeometry(0.72,1.02,0.55,18,1,false),M(spec.skirt,.75),g);sk.position.y=-0.02;sk.material.flatShading=true;}
  for(const sx of[-1,1]){const lw=spec.legW||0.25;
    const leg=capBetween(new THREE.Vector3(sx*0.36,0.15,0),new THREE.Vector3(sx*0.38,-0.62,0.02),lw,spec.skirt?skin:pantsM,g);legs.push(leg);
    if(spec.socks){capBetween(new THREE.Vector3(sx*0.38,-0.38,0.02),new THREE.Vector3(sx*0.38,-0.66,0.02),lw+0.025,M(spec.socks,.7),g);}
    if(!spec.skirt){const cuff=add(new THREE.TorusGeometry(lw+0.02,0.05,8,20),pantsM,g);cuff.rotation.x=Math.PI/2;cuff.position.set(sx*0.38,-0.62,0.02);}
    const sh=add(new THREE.SphereGeometry(0.3,24,16),shoeM,g);sh.position.set(sx*0.4,-0.78,0.14);sh.scale.set(1.0,0.62,1.45);
    const so=add(new THREE.CylinderGeometry(0.31,0.31,0.08,24),soleM,g);so.position.set(sx*0.4,-0.92,0.14);so.scale.set(1.0,1,1.48);}
  // 머리
  const head=new THREE.Group();head.position.y=2.45;g.add(head);
  add(new THREE.SphereGeometry(1,48,36),skin,head);
  const hr=add(new THREE.SphereGeometry(1.03,40,30,0,Math.PI*2,0,Math.PI*0.42),M(hairCol,.6),head);hr.rotation.x=-0.35;
  const ears=[];for(const sx of[-1,1]){const ear=add(new THREE.SphereGeometry(.2,16,12),skin,head);ear.position.set(sx*.98,-.05,0);ear.scale.set(0.7,1,0.9);ears.push(ear);}
  const F=faceTex();const fg=new THREE.SphereGeometry(1.008,40,30,Math.PI/2-0.85,1.7,Math.PI/2-0.75,1.3);
  const fmat=new THREE.MeshStandardMaterial({map:F.t,transparent:true,roughness:.6,depthWrite:false});fmat.userData.outlineParameters={visible:false};head.add(new THREE.Mesh(fg,fmat));
  // 코 (작고 둥글게)
  const nose=add(new THREE.SphereGeometry(0.055,16,12),M(new THREE.Color(skinC).multiplyScalar(0.93).getHex(),.55),head);nose.position.copy(sph(0,-2*D,0.995));nose.scale.set(1.25,0.8,0.6);nose.material.userData.outlineParameters={visible:false};
  const P={g,head,F,skin,top,topD,body,hair:hr,ears,arms:[],hands:[],hood:top,legs,spec};
  P.hairM=hairMats(hairCol);P.hairMat=P.hairM.lock;
  return P;}
// 팔: side -1/1, wrist = 손목 위치(몸 기준), point=검지
function arm(P,side,wrist,{point=false,paw=false,elbow=null}={}){const sh=new THREE.Vector3(side*0.86,1.45,0.02);const w=new THREE.Vector3(...wrist);
  const el=elbow?new THREE.Vector3(...elbow):sh.clone().lerp(w,0.5).add(new THREE.Vector3(side*0.12,-0.05,-0.05));
  const g=new THREE.Group();P.g.add(g);
  add(new THREE.SphereGeometry(0.27,20,16),P.top,g).position.copy(sh);
  capBetween(sh,el,0.24,P.top,g);capBetween(el,w,0.22,P.top,g);add(new THREE.SphereGeometry(0.235,16,12),P.top,g).position.copy(el);
  const dir=w.clone().sub(el).normalize();
  const cf=add(new THREE.TorusGeometry(0.2,0.07,10,24),P.topD,g);cf.position.copy(w);cf.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),dir);
  const h=mitten(g,w.clone().addScaledVector(dir,paw?0.02:0.1),dir,P.skin,1,point);if(paw)h.scale.setScalar(0.85);
  (window.ARMSEG=window.ARMSEG||[]).push({P,side,pts:[sh,el,w,w.clone().addScaledVector(dir,0.4)]});
  P.arms.push(g);P.hands.push(h);return g;}
