import numpy as np, wave
SR=44100; DUR=36.0; N=int(SR*DUR)
rng=np.random.default_rng(7)
music=np.zeros(N); sfx=np.zeros(N)
BPM=100; B=60/BPM
def nf(n): return 440*2**((n-69)/12)
def add(buf,t,sig,g=1.0):
    i=int(t*SR); j=min(N,i+len(sig))
    if 0<=i<N: buf[i:j]+=sig[:j-i]*g
def env(n,a=0.005,d=0.3):
    t=np.arange(n)/SR; e=np.exp(-t/d); k=int(a*SR)
    if k>0: e[:k]*=np.linspace(0,1,k)
    return e
def marimba(f,l=0.5,d=0.18):
    n=int(l*SR);t=np.arange(n)/SR
    s=np.sin(2*np.pi*f*t)+0.35*np.sin(2*np.pi*f*4*t)*np.exp(-t/0.04)+0.12*np.sin(2*np.pi*f*10*t)*np.exp(-t/0.012)
    return s*env(n,0.002,d)
def pizz(f,l=0.25):
    n=int(l*SR);t=np.arange(n)/SR
    s=np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*2*f*t)*np.exp(-t/0.05)+0.25*np.sin(2*np.pi*3*f*t)*np.exp(-t/0.03)
    return s*env(n,0.003,0.09)
def bass(f,l=0.3):
    n=int(l*SR);t=np.arange(n)/SR
    return np.tanh(1.6*(np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*2*f*t)))*env(n,0.004,0.12)
def kick():
    n=int(0.22*SR);t=np.arange(n)/SR;f=48+100*np.exp(-t/0.03)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.1)
def snap():
    n=int(0.12*SR);t=np.arange(n)/SR;s=rng.standard_normal(n);s=np.diff(np.r_[0,s])
    return s*np.exp(-t/0.025)*0.5
def hat():
    n=int(0.04*SR);s=rng.standard_normal(n);s=np.diff(np.r_[0,s]);return s*np.exp(-np.arange(n)/SR/0.01)*0.3

def blip(f0,l=0.12,up=True):
    n=int(l*SR);t=np.arange(n)/SR;f=f0*(1+(1.2 if up else -0.5)*t/l)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/(l*0.4))
def pop(f0=420):
    n=int(0.12*SR);t=np.arange(n)/SR;f=f0+900*(t/0.12)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.035)*0.8
def swoosh(l=0.4):
    n=int(l*SR);t=np.arange(n)/SR;s=rng.standard_normal(n);s=np.convolve(s,np.ones(10)/10,'same')
    return s*np.sin(np.pi*t/l)**2*0.9
def tok(f=650):
    n=int(0.09*SR);t=np.arange(n)/SR;return (np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*2.1*f*t))*np.exp(-t/0.02)*0.6
def poof():
    n=int(0.45*SR);t=np.arange(n)/SR;s=rng.standard_normal(n);s=np.convolve(s,np.ones(20)/20,'same')
    return s*np.exp(-t/0.12)*1.6+pop(300)[:n] if False else s*np.exp(-t/0.12)*1.6
def bell(fs,gap=0.07,g=0.35,l=1.0):
    out=np.zeros(int((l+gap*len(fs))*SR))
    for k,f in enumerate(fs):
        n=int(l*SR);t=np.arange(n)/SR;s=(np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*f*2.76*t)*np.exp(-t/0.15))*np.exp(-t/0.35)
        i=int(k*gap*SR);out[i:i+n]+=s
    return out*g
def fanfare():
    out=np.zeros(int(1.4*SR))
    for st,ns in [(0,[72]),(0.1,[76]),(0.2,[79,84])]:
        for n in ns:
            s=marimba(nf(n),1.1,0.45)*0.7+bell([nf(n)],0,0.45,1.1)[:int(1.1*SR)]
            i=int(st*SR);out[i:i+len(s)]+=s[:len(out)-i]
    return out
def wahwah():
    out=np.zeros(int(1.6*SR))
    for k,n in enumerate([67,66,65]):
        l=0.38 if k<2 else 0.8;m=int(l*SR);t=np.arange(m)/SR
        f=nf(n)*(1+0.012*np.sin(2*np.pi*6*t))
        s=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*0.25+np.sin(2*np.pi*np.cumsum(f)/SR)*0.5
        s=np.convolve(s,np.ones(6)/6,'same')*env(m,0.02,l*0.9)
        i=int(k*0.4*SR);out[i:i+m]+=s
    return out
def whistle(fs,l=0.4):
    out=np.zeros(int(len(fs)*l*SR+SR*0.3))
    for k,f in enumerate(fs):
        m=int(l*SR);t=np.arange(m)/SR;ff=f*(1+0.02*np.sin(2*np.pi*5*t))
        s=np.sin(2*np.pi*np.cumsum(ff)/SR)*np.sin(np.pi*t/l)**0.5*0.5+rng.standard_normal(m)*0.02
        i=int(k*l*SR);out[i:i+m]+=s
    return out
def heart():
    out=np.zeros(int(0.5*SR))
    for st,g in [(0,1),(0.16,0.7)]:
        m=int(0.2*SR);t=np.arange(m)/SR;f=45+50*np.exp(-t/0.02)
        s=np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.07)*g
        i=int(st*SR);out[i:i+m]+=s
    return out*1.4
def gulp():
    return blip(500,0.18,False)*0.6

def boing(f0=300,l=0.45):
    n=int(l*SR);t=np.arange(n)/SR;f=f0*(1+1.5*t/l)*(1+0.08*np.sin(2*np.pi*14*t))
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/(l*0.5))*0.7
def whine(l=0.5):
    n=int(l*SR);t=np.arange(n)/SR;f=900-400*t/l+40*np.sin(2*np.pi*7*t)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*t/l)*0.5
def blech(l=0.5):
    n=int(l*SR);t=np.arange(n)/SR;f=140-50*t/l
    s=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*0.4*(1+0.5*np.sin(2*np.pi*22*t));s=np.convolve(s,np.ones(12)/12,'same')
    return s*np.sin(np.pi*t/l)
def raspberry(l=0.45):
    n=int(l*SR);t=np.arange(n)/SR;s=rng.standard_normal(n)*(0.5+0.5*np.sign(np.sin(2*np.pi*38*t)));s=np.convolve(s,np.ones(8)/8,'same')
    return s*np.sin(np.pi*t/l)*0.9
def stinger():
    n=int(1.0*SR);t=np.arange(n)/SR;out=np.zeros(n)
    for fr in [nf(38),nf(45),nf(50),nf(53)]:
        out+=np.tanh(2*np.sin(2*np.pi*fr*t))*0.3
    nz=np.convolve(rng.standard_normal(n),np.ones(3)/3,'same')*np.exp(-t/0.25)*0.4
    return (out*np.exp(-t/0.5)+nz)
def drip():
    out=np.zeros(int(0.4*SR))
    for k,f in enumerate([1500,1200,950]):
        b_=blip(f,0.08,False);i=int(k*0.1*SR);out[i:i+len(b_)]+=b_
    return out*0.5
def thud():
    n=int(0.3*SR);t=np.arange(n)/SR;f=55+90*np.exp(-t/0.03)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.1)
