
// ===================== 멜팅다이스 4인방 (고정 캐릭터) =====================
// 설계도: 이 파일의 CREW 정의가 원본. 영상마다 이 함수로만 캐릭터를 만든다.
const CREW_DEF={
 leo :{ko:'레오',en:'Leo', mbti:'ENFP',nick:'The Explainer',     type:'외향 고수 설명러', col:'#FF7A2F',hood:0xFF7A2F,hair:0x5A3A22,skin:0xF2C9A0,line:'이거 완전 쉬워, 내가 설명해줄게!',short:'이거 완전 쉬워!'},
 hana:{ko:'하나',en:'Hana',mbti:'ESTJ',nick:'The Rule Lawyer',   type:'승부욕 룰북러',   col:'#E5394B',hood:0xE5394B,hair:0x5A3A22,skin:0xF5D2B0,line:'잠깐, 룰북 보면…'},
 bori:{ko:'보리',en:'Bori',mbti:'ISFP',nick:'The Newbie',        type:'완전 초보',       col:'#F2B705',hood:0xFFD54A,hair:0x2D2418,skin:0xE3AC83,line:'이거 내 차례야?'},
 mio :{ko:'미오',en:'Mio', mbti:'INTJ',nick:'The Quiet Mastermind',type:'조용한 설계자', col:'#2F3D7A',hood:0x2F3D7A,hair:0x141218,skin:0xF7DCC8,line:'……(씩)'},
};
// 기본 표정 (설계도 고정)
const CREW_FACE={
 leo :{eye:'laugh',mouth:'big',blush:.5},
 hana:{eye:'n',brow:'sus',mouth:'flat',blush:.35},
 bori:{eye:'swirl',mouth:'o',sweat:.9,sweatY:.2,blush:.3},
 mio :{eye:'sly',mouth:'smirk',blush:.3},
};
function armsFor(P,k,def){const p=(window.POSE||{})[k];if(p)p(P);else def();}
function mkLeo(){const d=CREW_DEF.leo;const P=person3({top:d.hood,topDark:0xE0601C,hood:true,pants:0x4A6FA5,shoe:0xFFFFFF,sole:0x23A6A0},d.hair,d.skin);
  // 중간 길이 덥수룩한 머리: 정수리에서 시작 → 앞머리는 눈썹 위, 옆머리는 볼, 뒷머리는 목덜미까지
  const m=P.hairMat;shell(P,m,{top:0.34,backTo:0.5,frontCut:62});add(new THREE.SphereGeometry(1.035,64,40,Math.PI/2+100*D,Math.PI*2-200*D,Math.PI*0.49,Math.PI*0.22),P.hairM.shell,P.head);
  // 뒷머리 (목덜미에서 살짝 뻗침)
  for(let az=106;az<=254;az+=16){const a=(az>180?az-360:az);flow(P,m,a*0.4*D,85*D,a*D,(Math.abs(a)<120?-10:-34)*D,{w:0.3,flat:0.42,r0:0.99,r1:1.1,curl:0.07,n:8});}
  // 옆머리 (짧게: 관자놀이까지, 귀는 보이게)
  for(const sx of[-1,1]){flow(P,m,sx*22*D,85*D,sx*56*D,10*D,{w:0.24,flat:0.4,r0:0.99,r1:1.07,curl:0.02,n:7});
    flow(P,m,sx*34*D,85*D,sx*70*D,14*D,{w:0.2,flat:0.4,r0:0.99,r1:1.07,curl:0.02,n:7});}
  // 윗머리 (정수리에서 사방으로, 끝이 살짝 뻗침)
  for(let az=-165;az<180;az+=30)flow(P,m,az*0.3*D,87*D,az*D,38*D,{w:0.3,flat:0.48,r0:1.0,r1:1.12,curl:0.07,n:6});
  {const cm=P.hairM.shell.clone();cm.userData={outlineParameters:{visible:false}};add(new THREE.SphereGeometry(1.165,40,10,0,Math.PI*2,0,Math.PI*0.1),cm,P.head);} // 정수리 가운데 빈 곳 채움
  // 앞머리 (눈썹 위까지, 끝 뾰족)
  [-40,-21,-3,15,33].forEach((az,i)=>flow(P,m,(az*0.3)*D,85*D,az*1.05*D,(24+(i%2)*4)*D,{w:0.26,flat:0.42,r0:0.99,r1:1.09,curl:0.03,n:7}));
  // 주사위 목걸이
  capBetween(new THREE.Vector3(-0.3,1.62,0.55),new THREE.Vector3(0,1.25,0.8),0.02,M(0x333333,.4),P.g);capBetween(new THREE.Vector3(0.3,1.62,0.55),new THREE.Vector3(0,1.25,0.8),0.02,M(0x333333,.4),P.g);
  const dc=add(new THREE.BoxGeometry(0.22,0.22,0.22),M(0xFFFFFF,.35),P.g);dc.position.set(0,1.13,0.84);dc.rotation.set(0.5,0.6,0.2);
  armsFor(P,'leo',()=>{arm(P,-1,[-1.12,0.45,0.32]);arm(P,1,[1.25,2.25,0.55]);});
  P.key='leo';return P;}
function mkHana(){const d=CREW_DEF.hana;const P=person3({top:d.hood,topDark:0xB8233A,collar:true,skirt:0x26365E,socks:0xFFFFFF,shoe:0x5A3A22,sole:0x2B1D12,legW:0.2},d.hair,d.skin);
  const m=P.hairMat;shell(P,m,{top:0.27,backTo:0.74,frontCut:62,r:1.035});P.ears.forEach(e=>e.visible=false);
  for(let az=70;az<=290;az+=18){const a=(az>180?az-360:az)*D;flow(P,m,a*0.35,84*D,a,-40*D,{w:0.31,flat:0.38,r0:0.98,r1:1.15,blunt:true,curl:-0.06,n:8});}
  for(const sx of[-1,1])flow(P,m,sx*20*D,84*D,sx*62*D,-42*D,{w:0.26,flat:0.36,r0:0.98,r1:1.11,blunt:true,n:8});
  for(let az=-50;az<=50;az+=14.3)flow(P,m,az*0.25*D,86*D,az*1.04*D,27*D,{w:0.21,flat:0.36,r0:0.98,r1:1.08,blunt:true,n:7});
  armsFor(P,'hana',()=>{
  const bk=new THREE.Group();P.g.add(bk);bk.position.set(0,1.05,0.98);bk.rotation.set(-0.12,0,0);
  const c=document.createElement('canvas');c.width=360;c.height=480;const g=c.getContext('2d');g.fillStyle='#1F3B73';g.fillRect(0,0,360,480);g.fillStyle='#F5C542';g.fillRect(0,70,360,14);g.fillRect(0,400,360,14);
  g.fillStyle='#fff';g.font='92px Jua';g.textAlign='center';g.textBaseline='middle';g.fillText('룰북',180,230);g.font='44px Jua';g.fillText('RULES',180,320);
  const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;
  add(new THREE.BoxGeometry(0.85,1.1,0.16),[M(0xF4EEDD,.6),M(0xF4EEDD,.6),M(0xF4EEDD,.6),M(0xF4EEDD,.6),new THREE.MeshStandardMaterial({map:tx,roughness:.6}),M(0x1F3B73,.6)],bk);
  arm(P,-1,[-0.55,1.0,0.92]);arm(P,1,[0.55,1.0,0.92]);});
  P.F.lash=true;P.key='hana';return P;}
function mkBori(){const d=CREW_DEF.bori;const P=person3({top:d.hood,topDark:0xF0B92A,hood:true,size:1.08,pants:0x9A9AA6,shoe:0xFFD54A,sole:0xFFFFFF,legW:0.28},d.hair,d.skin);
  // 남자 짧은 머리: 동그란 앞머리 + 옆은 귀 위까지 + 뒤는 목덜미, 귀는 보이게
  const m=P.hairMat;shell(P,m,{top:0.34,backTo:0.5,frontCut:62,r:1.04});add(new THREE.SphereGeometry(1.04,64,40,Math.PI/2+100*D,Math.PI*2-200*D,Math.PI*0.49,Math.PI*0.14),P.hairM.shell,P.head);
  for(let az=106;az<=254;az+=16){const a=(az>180?az-360:az);flow(P,m,a*0.4*D,85*D,a*D,(Math.abs(a)<120?-6:-22)*D,{w:0.3,flat:0.45,r0:0.99,r1:1.09,blunt:true,n:7});}
  for(const sx of[-1,1]){flow(P,m,sx*24*D,85*D,sx*58*D,14*D,{w:0.26,flat:0.45,r0:0.99,r1:1.08,blunt:true,n:7});flow(P,m,sx*36*D,85*D,sx*74*D,12*D,{w:0.24,flat:0.45,r0:0.99,r1:1.08,blunt:true,n:7});}
  [-40,-22,-5,12,29].forEach((az,i)=>flow(P,m,(az*0.3)*D,85*D,az*1.05*D,(30+(i%2)*3)*D,{w:0.28,flat:0.48,r0:0.99,r1:1.09,blunt:true,n:7}));
  // 바보털 (정수리 한 가닥)
  lock(P,m,[[0,1.0,0.05],[0.03,1.32,0.02],[0.2,1.52,-0.12],[0.36,1.42,-0.22]],0.07,0.8,false);
  armsFor(P,'bori',()=>{arm(P,1,[1.02,3.0,0.3],{paw:true});arm(P,-1,[-1.1,0.42,0.32],{paw:true});});
  P.key='bori';return P;}
function mkMio(){const d=CREW_DEF.mio;const P=person3({top:d.hood,topDark:0x24305F,turtle:true,pants:0x2A2A33,shoe:0x15151A,sole:0x2A2A33,legW:0.29},d.hair,d.skin);
  const m=P.hairMat;shell(P,m,{top:0.3,backTo:0.76,frontCut:44,r:1.03});P.ears.forEach(e=>e.visible=false);
  // 매끈한 생머리: 넓은 가닥 몇 개만, 머리에 붙여서, 끝 높이를 한 줄로 맞춤
  const YE=-1.62;
  for(let az=125;az<=235;az+=27.5){const a=(az>180?az-360:az)*D;flow(P,m,a*0.4,84*D,a,-28*D,{w:0.44,flat:0.2,r0:0.98,r1:1.04,yEnd:YE,inward:0.04,blunt:true,n:8});}
  for(const sx of[-1,1])flow(P,m,sx*26*D,80*D,sx*88*D,-24*D,{w:0.44,flat:0.2,r0:0.98,r1:1.04,yEnd:YE+0.05,inward:0.05,blunt:true,n:8});
  // 넘긴 앞머리 (2가닥, 눈 피해서 관자놀이로)
  const swp=(via,w)=>{const pts=via.map(([az,el,r])=>sph(az*D,el*D,r));const e=pts[pts.length-1];const out=new THREE.Vector3(e.x,0,e.z).normalize();const dy=e.y-(YE+0.1);
    pts.push(e.clone().add(new THREE.Vector3(0,-dy*0.5,0)).addScaledVector(out,0.02));pts.push(e.clone().add(new THREE.Vector3(0,-dy,0)).addScaledVector(out,-0.03));lock(P,m,pts,w,0.2,true);};
  swp([[-26,82,0.98],[0,70,1.03],[30,56,1.04],[52,40,1.045],[66,20,1.045],[74,-6,1.045]],0.42);
  swp([[-29,66,0.98],[6,56,1.03],[36,45,1.04],[60,29,1.045],[76,6,1.045],[82,-12,1.045]],0.4);
  // 가르마 왼쪽 (1가닥)
  flow(P,m,-38*D,72*D,-66*D,18*D,{w:0.38,flat:0.2,r0:0.98,r1:1.04,yEnd:YE+0.1,inward:0.05,blunt:true,n:8});
  // 안경 (얇은 각진 테 - 바보타임 동그란 안경과 다르게)
  {const fm=M(0x1E2140,.35);const lm=new THREE.MeshStandardMaterial({color:0xCFE6FF,transparent:true,opacity:0.18,roughness:0.1});P.lensMat=lm;lm.userData.outlineParameters={visible:false};
   const shp=(w,h,r)=>{const s2=new THREE.Shape();s2.moveTo(-w/2+r,-h/2);s2.lineTo(w/2-r,-h/2);s2.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s2.lineTo(w/2,h/2-r);s2.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s2.lineTo(-w/2+r,h/2);s2.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s2.lineTo(-w/2,-h/2+r);s2.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s2;};
   for(const sx of[-1,1]){const c=sph(sx*14*D,9*D,1.05);const g=new THREE.Group();g.position.copy(c);g.lookAt(c.clone().multiplyScalar(2));P.head.add(g);
     const pts2=shp(0.36,0.23,0.07).getPoints(24).map(p=>new THREE.Vector3(p.x,p.y,0));const tube=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts2,true),64,0.018,8,true);add(tube,fm,g);
     const lens=new THREE.Mesh(new THREE.ShapeGeometry(shp(0.34,0.21,0.06)),lm);g.add(lens);
     const outer=sph(sx*24*D,10*D,1.04),ear=sph(sx*86*D,6*D,1.03);capBetween(outer,ear,0.018,fm,P.head);}
   capBetween(sph(-4.5*D,10*D,1.06),sph(4.5*D,10*D,1.06),0.018,fm,P.head);}
  armsFor(P,'mio',()=>{
  const fan=new THREE.Group();P.g.add(fan);fan.position.set(-0.45,1.55,0.95);
  ['#E5394B','#2F3D7A','#F2B705'].forEach((cc,i)=>{const c=document.createElement('canvas');c.width=200;c.height=280;const g=c.getContext('2d');g.fillStyle='#FFFDF6';g.fillRect(0,0,200,280);g.strokeStyle=cc;g.lineWidth=22;g.strokeRect(11,11,178,258);g.fillStyle=cc;g.font='120px Jua';g.textAlign='center';g.textBaseline='middle';g.fillText(['7','A','?'][i],100,150);
    const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const mm=new THREE.Mesh(new THREE.PlaneGeometry(0.42,0.6),new THREE.MeshStandardMaterial({map:t,roughness:.5,side:THREE.DoubleSide}));
    mm.position.set((i-1)*0.13,0.12,i*0.01);mm.rotation.z=(1-i)*0.3;fan.add(mm);});
  fan.rotation.set(-0.15,0.2,0);
  arm(P,-1,[-0.5,1.3,0.9]);arm(P,1,[1.1,0.45,0.3]);});
  P.F.lash=true;P.key='mio';return P;}
const CREW_MK={leo:mkLeo,hana:mkHana,bori:mkBori,mio:mkMio};

