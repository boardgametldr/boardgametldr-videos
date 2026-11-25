// ===== 멜팅다이스 릴스 자막 키트 (바보타임·장난꾸러기 나방에서 쓴 그대로) =====
// 화면 1080×1920 기준 px. 폰트: Jua, Black Han Sans (@fontsource/jua, @fontsource/black-han-sans)
// 모든 요소는 class 'ftx' 인 절대 위치 div. 장면을 바꿀 때 document.querySelectorAll('.ftx').forEach(e=>e.remove())
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const eOut=x=>1-Math.pow(1-clamp(x),3);
const eBack=x=>{x=clamp(x);const c=2.2;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);};
function el(html,css){const e=document.createElement('div');e.className='ftx';e.style.cssText='position:absolute;'+css;e.innerHTML=html;document.body.appendChild(e);return e;}
// 튀어나오는 등장 (0.28초, 살짝 커졌다 돌아옴)
function popEl(e,dt,dur=0.28){if(!e)return;if(dt<0){e.style.opacity=0;return;}e.style.opacity=clamp(dt/0.08);const b=e.dataset.b??(e.dataset.b=e.style.transform||'');e.style.transform=`${b} scale(${eBack(dt/dur).toFixed(3)})`;}

// 1) 키네틱 큰 자막 — 흰 글씨 + 검은 테두리 14px, 강조 단어는 노랑 1.25배 + 살짝 기울임
//    바보타임/나방 실제 값: top 60~290, size 84~92 (훅·룰), 강조 [단어,1]
function kin(words,top=1180,size=104){
  return el(words.map(([w,em])=>`<span style="display:inline-block;margin:0 10px;${em?'color:#FFE14D;font-size:1.25em;transform:rotate(-3deg)':'color:#fff'}">${w}</span>`).join(''),
   `left:30px;right:30px;top:${top}px;text-align:center;font-family:'Black Han Sans';font-size:${size}px;line-height:1.15;-webkit-text-stroke:14px #111;paint-order:stroke fill;text-shadow:0 8px 0 #111`);}
// 단어마다 시간차로 튀어나오기: kinT(t,[0.25,0.55,0.9],[['내 규칙이',0],['"말끝마다 냥"',1],['인데',0]],250,84)
function kinT(t,ts,words,top,size){if(t<ts[0])return;const e=kin(words,top,size);[...e.children].forEach((s,i)=>{const dt=t-ts[i];if(dt<0){s.style.visibility='hidden';return;}
  const b=s.style.transform||'';s.style.transform=`${b} scale(${eBack(dt/0.22).toFixed(3)})`;});return e;}

// 2) 동물의숲식 말풍선 — 크림 상자 + 이름표(캐릭터 색) + 한 글자씩, 웅얼 소리와 같이
//    글자 Jua 62px #5A4630, 위치 top 830~1500(left/right 60), 키워드만 빨강·1.25~1.3배
const HL={red:'color:#E0362B;font-size:1.3em',big:'font-size:1.3em'};
function dlg(name,col,html,top=1440,typing=0){
  return el(`<div style="position:absolute;left:46px;top:-40px;background:${col};color:#fff;font-family:'Black Han Sans';font-size:44px;padding:4px 30px;border-radius:999px;transform:rotate(-4deg);border:5px solid #3B2A1A">${name}</div>
   <div style="font-family:Jua;font-size:62px;line-height:1.3;color:#5A4630">${html}${typing?'<span style="color:#C9B48A">▌</span>':''}</div>
   <div style="position:absolute;right:46px;bottom:16px;color:#F5A800;font-size:40px">▼</div>`,
   `left:60px;right:60px;top:${top}px;background:#FFF7DC;border:6px solid #3B2A1A;border-radius:90px/70px;padding:56px 70px 46px;box-shadow:0 12px 0 rgba(59,42,26,.35)`);}
// 대사 데이터로 한 글자씩: segs=[[글자, 시작초, 초당글자수, 강조키|null]], '|'는 줄바꿈
function dlgTyped(t,d){const f=d.segs[0][1];if(t<f-0.12)return null;let h='',all=true;
  d.segs.forEach(([txt,t0,cps,hl])=>{[...txt].forEach((ch,i)=>{const vis=t>=t0+i/cps;if(!vis)all=false;
    if(ch==='|'){h+='<br>';return;}h+=`<span style="${hl?HL[hl]+';':''}${vis?'':'visibility:hidden'}">${ch}</span>`;});});
  const e=dlg(d.name,d.col,h,d.top,!all);popEl(e,t-(f-0.12),0.25);return e;}

// 3) 스티커 — 기울어진 색 딱지 + 검은 테두리 6px + 그림자 (상황 설명·규칙·태그)
//    실제 값: size 40~58, rot -6~8, 색 #FF2D55·#2E3E7A·#C2186B·#3F7FD0·#E86AA8·#2EAF7D·#F5B800
function sticker(txt,x,y,rot=8,bg='#FF2D55',col='#fff',size=46){return el(txt,`left:${x}px;top:${y}px;font-family:'Black Han Sans';font-size:${size}px;color:${col};background:${bg};border:6px solid #111;border-radius:16px;padding:6px 22px;transform:rotate(${rot}deg);box-shadow:6px 8px 0 #111;white-space:nowrap`);}
// 4) POV 라벨 (훅 첫 장면)
function pov(txt='POV:'){return el(txt,`left:60px;top:150px;font-family:'Black Han Sans';font-size:90px;color:#fff;-webkit-text-stroke:12px #111;paint-order:stroke fill`);}
// 5) 쾅! — 노란 폭발 원 + 흰 글씨(검은 테두리 10px)
function absTxt(txt,x,y,color='#FFE14D',size=90,rot=-6,font='Jua',stroke=8){return el(txt,`left:${x}px;top:${y}px;font-family:${font};font-size:${size}px;color:${color};-webkit-text-stroke:${stroke}px #3B2A1A;paint-order:stroke fill;transform:rotate(${rot}deg);white-space:nowrap`);}
function bang(x,y,txt='쾅!',size=96,rot=-8){el('',`left:${x-110}px;top:${y-110}px;width:220px;height:220px;background:radial-gradient(circle,#FFE14D 0 34%,transparent 35%),repeating-conic-gradient(#FFE14D 0 10deg,transparent 10deg 30deg);-webkit-mask:radial-gradient(circle,#000 60%,transparent 70%);mask:radial-gradient(circle,#000 60%,transparent 70%)`);
  absTxt(txt,x-size*0.9,y-size*0.65,'#fff',size,rot,'Black Han Sans',10);}
// 6) 빨간 동그라미 (키워드 강조), 7) 집중선 (가는 만화 선 — 넓은 빨강·흰 방사 띠 금지)
function ring(x,y,w,h,rot=-6,col='#FF2D55'){return el('',`left:${x}px;top:${y}px;width:${w}px;height:${h}px;border:12px solid ${col};border-radius:50%;transform:rotate(${rot}deg)`);}
function speedLines(col='rgba(40,25,10,.85)',cx=50,cy=45){el('',`inset:0;background:repeating-conic-gradient(from 0deg at ${cx}% ${cy}%, ${col} 0deg 1.4deg, transparent 1.4deg 6deg);-webkit-mask:radial-gradient(circle at ${cx}% ${cy}%, transparent 30%, #000 62%);mask:radial-gradient(circle at ${cx}% ${cy}%, transparent 30%, #000 62%)`);}
// 8) 작은 소리 글자 (♪ 뽀로롱 등)
function bloop(x,y,t,rot=-8){return el(t,`left:${x}px;top:${y}px;font-family:Jua;font-size:50px;color:#fff;-webkit-text-stroke:6px #3B2A1A;paint-order:stroke fill;transform:rotate(${rot}deg)`);}
// 9) 엔딩 정보카드 (바보타임 실제 값) — 가운데, top 820
function endCard(game,meta,top=820){return el(`<div style="background:rgba(255,253,246,.94);border:6px solid #111;border-radius:40px;padding:18px 54px 26px;display:flex;flex-direction:column;align-items:center;box-shadow:8px 10px 0 #111"><div style="font-size:38px;color:#8B6914;font-family:Jua">오늘의 게임</div><div style="font-family:'Black Han Sans';font-size:150px;color:#111;line-height:1.05">${game}</div><div style="background:#FFD600;border-radius:999px;padding:8px 32px;font-size:44px;color:#111;font-family:Jua">${meta}</div><div style="margin-top:12px;font-size:32px;color:#8B6914;font-family:Jua">📍 멜팅다이스 보드게임카페</div></div>`,
  `left:0;right:0;top:${top}px;display:flex;justify-content:center`);}
