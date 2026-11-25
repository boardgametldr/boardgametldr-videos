import numpy as np, wave
src=open('/home/claude/vid/gizmo/_afx.py',encoding='utf-8').read().replace('DUR=36.0','DUR=20.0')
exec(src)
from v2_tl import DLG, chars, BURSTS
voice=np.zeros(N)
# ---------------- 웅얼 목소리 (부드러운 모음 합성, 2.6kHz 이상 배음 없음) ----------------
VOW={'a':(760,1250),'o':(520,900),'u':(380,820),'e':(480,1650)}
def vowel_of(ch):
    c=ord(ch)
    if not(0xAC00<=c<=0xD7A3):return 'a'
    j=((c-0xAC00)//28)%21
    if j<=3:return 'a'
    if j in(5,7,1,3):return 'e'
    if j<=7:return 'o'
    if j<=12:return 'o'
    if j<=19:return 'u'
    return 'e'
def syl(f0,dur,v='a',glide=0.0,nyang=False):
    n=int(dur*SR);t=np.arange(n)/SR
    if nyang: f=f0*(1+0.35*np.sin(np.pi*np.minimum(t/dur,1)*0.9))   # 냥: 올라갔다 살짝 내려옴
    else: f=f0*(1+glide*t/dur)*(1-0.06*np.exp(-t/0.012))
    ph=2*np.pi*np.cumsum(f)/SR;F1,F2=VOW[v];out=np.zeros(n)
    for k in range(1,14):
        fk=f0*k
        if fk>2600:break
        a=(1/k**1.3)*(np.exp(-((fk-F1)/160)**2)+0.55*np.exp(-((fk-F2)/220)**2)+0.12)
        out+=a*np.sin(k*ph)
    a=int(0.012*SR);r=int(0.03*SR);e=np.ones(n);e[:a]=np.linspace(0,1,a);e[-r:]*=np.linspace(1,0,r)
    return out*e
VOICE={'mint':(250,[0,2,4,5,7]),'pink':(285,[0,2,4,7]),'blue':(160,[0,2,3,5,7]),'yellow':(210,[0,2,4,7])}
vr=np.random.default_rng(11)
def say(who,t,ch,dur,nyang=False):
    b,sc=VOICE[who];f0=b*2**(vr.choice(sc)/12)
    if nyang:f0=b*2**(4/12)
    add(voice,t,syl(f0,dur,vowel_of(ch),vr.uniform(-0.08,0.1),nyang),1.0)
SIL=set(' …!?~.,|😏')
for d in DLG:
    for txt,t0,cps,hl in d['segs']:
        cs=[c for c in txt]
        for i,ch in enumerate(cs):
            if ch in SIL:continue
            dur=min(0.85/cps,0.095);ny=(ch=='냥')
            say(d['who'],t0+i/cps,ch,0.17 if ny else dur,ny)
for who,t0,n,cps,ny in BURSTS:
    for i in range(n):
        last=ny and i==n-1;say(who,t0+i/cps,'가나다라마바'[i%6],0.17 if last else 0.07,last)
# 웃음 (분홍·파랑) — 짧은 '하하' 음절
def giggle(who,t0,n=5,sp=0.11):
    for i in range(n):say(who,t0+i*sp,'하',0.06)
giggle('pink',7.85);giggle('pink',9.5,4);giggle('pink',17.2,6);giggle('blue',17.5,5,0.12);giggle('yellow',17.9,4,0.12)
# ---------------- 효과음 (모두 새로 합성) ----------------
def clap(g=1.0):
    n=int(0.1*SR);t=np.arange(n)/SR;s=rng.standard_normal(n);s=np.convolve(s,np.ones(4)/4,'same');return s*np.exp(-t/0.02)*0.5*g
def bam():
    out=np.zeros(int(0.5*SR));th=thud();out[:len(th)]+=th;c=clap(1.2);out[:len(c)]+=c
    n=int(0.35*SR);t=np.arange(n)/SR;out[:n]+=np.sin(2*np.pi*(90-40*t)*t)*np.exp(-t/0.12)*0.8;return out
def boom():  # 묵직한 '붐' (저음 위주)
    n=int(1.1*SR);t=np.arange(n)/SR;f=38+70*np.exp(-t/0.06)
    s=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.38)+0.25*np.sin(2*np.pi*np.cumsum(f*2)/SR)*np.exp(-t/0.15)
    nz=rng.standard_normal(n);nz=np.convolve(nz,np.ones(60)/60,'same')*np.exp(-t/0.05)*0.6
    return np.tanh(1.5*(s+nz))
def brass():  # 귀 안 아픈 낮은 금관 '빠밤' (고음 배음 컷)
    out=np.zeros(int(0.9*SR))
    for st,l in [(0,0.12),(0.16,0.6)]:
        n=int(l*SR);t=np.arange(n)/SR;s=np.zeros(n)
        for f0 in (nf(50),nf(57),nf(62)):
            for k in range(1,9):
                if f0*k>1800:break
                s+=np.sin(2*np.pi*f0*k*t)/k**1.1
        e=np.minimum(1,t/0.02)*np.exp(-t/(0.5 if l>0.3 else 0.1));i=int(st*SR);out[i:i+n]+=s*e
    return out*0.35
def sigh():  # 휴~
    n=int(0.6*SR);t=np.arange(n)/SR;s=rng.standard_normal(n);s=np.convolve(s,np.ones(40)/40,'same')
    return s*np.sin(np.pi*t/0.6)**1.5*1.2
def softpop(f=380):
    n=int(0.09*SR);t=np.arange(n)/SR;fr=f+500*(t/0.09);return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t/0.025)*0.6
def drop():  # 토큰 -1 (내려가는 마림바)
    out=np.zeros(int(1.0*SR))
    for k,m in enumerate([72,67,64,60]):s=marimba(nf(m),0.4,0.15);i=int(k*0.09*SR);out[i:i+len(s)]+=s
    return out*0.5
def claps_at(ts,g=0.35):
    for tt in ts:add(sfx,tt,clap(),g);add(sfx,tt+0.15,clap(),g*0.9)
# 장면별
add(sfx,0.0,boom(),0.75);add(sfx,0.0,swoosh(0.3),0.25)
for tt in [0.05,0.25,0.55,0.9]:add(sfx,tt,softpop(360),0.35)
add(sfx,1.5,swoosh(0.35),0.35);add(sfx,1.55,tok(500),0.4);add(sfx,1.95,softpop(300),0.5);add(sfx,1.65,softpop(420),0.3)
for tt in [2.25,2.55,2.85]:add(sfx,tt,softpop(360),0.35)
add(sfx,4.0,swoosh(0.2),0.3);add(sfx,4.0,softpop(340),0.35);add(sfx,4.85,bam(),0.7)
add(sfx,5.5,swoosh(0.2),0.3);add(sfx,5.5,softpop(340),0.35);add(sfx,5.62,boing(200,0.4),0.35)
for h in [0.5,1.3,2.0,2.6]:add(sfx,7.0+h,bam(),0.55)
claps_at([7.95,8.65,9.35],0.3)
for tt in [7.05,7.3,7.5,7.8,7.95,8.2,8.45,9.0]:add(sfx,tt,softpop(380),0.3)
add(sfx,8.98,thud(),0.6)
for k in range(5):add(sfx,10.1+k*0.48,heart(),0.55)
add(sfx,12.3,softpop(300),0.5);add(sfx,12.32,bell([nf(76),nf(83)],0.06,0.25,0.6),0.5);add(sfx,12.55,sigh(),0.3)
add(sfx,13.0,swoosh(0.2),0.3);add(sfx,13.05,softpop(340),0.3);add(sfx,13.25,bam(),0.45)
add(sfx,15.0,boom(),0.9);add(sfx,15.02,brass(),0.55)
for tt in [15.45,15.65]:add(sfx,tt,softpop(360),0.4)
add(sfx,16.0,drop(),0.6)
add(sfx,17.0,swoosh(0.25),0.3)
for tt in [17.1,17.3,17.55,17.6,18.5,18.7,18.9]:add(sfx,tt,softpop(360),0.32)
claps_at([17.0,17.7,18.4,19.1],0.28)
add(sfx,17.9,bell([nf(72),nf(76),nf(79)],0.07,0.3,0.8),0.5)
add(sfx,19.55,swoosh(0.45),0.45)
# ---------------- 배경음 (끊김 없음, 장면에 따라 볼륨만) ----------------
B=60/124
PROG=[(48,[64,67,72]),(53,[65,69,72]),(55,[62,67,71]),(48,[64,67,72])]
MEL=[72,74,76,None,79,None,76,74, 77,None,76,74,72,None,None,None, 74,76,74,None,71,None,67,None, 72,None,76,79,84,None,None,None]
t=0.0;bar=0
while t<DUR:
    root,ch=PROG[bar%4]
    for beat in range(4):
        bt=t+beat*B
        if bt>=DUR:break
        add(music,bt,bass(nf([root,root+7,root+12,root+7][beat]-12),0.22),0.5)
        if beat in(0,2):add(music,bt,kick(),0.5)
        if beat in(1,3):add(music,bt,snap(),0.4)
        add(music,bt+B/2,hat(),0.6)
        for q,n in enumerate(ch):add(music,bt+B/2+q*0.008,pizz(nf(n),0.18),0.15)
        for h in range(2):
            m=MEL[(bar%4)*8+beat*2+h]
            if m and bt+h*B/2<DUR:add(music,bt+h*B/2,marimba(nf(m),0.35),0.22)
    t+=4*B;bar+=1
envm=np.ones(N)
def duck(t0,t1,g,r=0.2):
    i0,i1=int(t0*SR),min(N,int(t1*SR));ri=int(r*SR);seg=np.full(i1-i0,g)
    if g>0:seg[:ri]=np.linspace(1,g,ri)
    seg[-ri:]=np.linspace(g,1,ri);envm[i0:i1]=np.minimum(envm[i0:i1],seg)
duck(10.0,12.4,0.3);duck(13.0,14.6,0.55)
duck(14.45,15.05,0.12,0.12)   # 노래는 끊지 않고 아주 작게만
i0,i1=int(14.6*SR),int(15.0*SR);sfx[i0:i1]=0;voice[i0:i1]=0   # 0.3~0.4초 정적
music*=envm
def norm(x,peak):return x/np.max(np.abs(x))*peak
music=norm(music,0.32);sfx=norm(sfx,0.8);voice=norm(voice,0.6)
mix=music+sfx+voice;mix=np.tanh(mix*1.1)/np.tanh(1.1);mix=norm(mix,0.89)
st=np.stack([mix,mix],1)
with wave.open('v2_audio.wav','wb') as w:
    w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((st*32767).astype(np.int16).tobytes())
# 목소리만 따로 (확인용)
with wave.open('/tmp/voice_only.wav','wb') as w:
    vo=norm(voice,0.8);w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((vo*32767).astype(np.int16).tobytes())
print('ok')
