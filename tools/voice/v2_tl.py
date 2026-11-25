# 바보타임 v2 공용 타임라인 (영상·소리 모두 이 파일 기준)
import json
DUR = 20.0
SILENT = set(' …!?~.,|😏')
# who: 웅얼 목소리 주인 / segs: (텍스트, 시작초, 초당글자, 강조) — '|' = 줄바꿈
DLG = [
 dict(id='d1', who='pink',  name='분홍', col='#E86AA8', top=830,  segs=[('내 차례다~', 4.15, 10, '')]),
 dict(id='d2', who='blue',  name='파랑', col='#3F7FD0', top=830,  segs=[('아니 잠시만!', 5.6, 12, 'red'), ('|근데 있잖아…', 6.3, 12, '')]),
 dict(id='d3', who='mint',  name='민트', col='#2EAF7D', top=1360, segs=[('오늘 진짜 재밌…', 10.6, 6, ''), ('|…', 11.95, 3, ''), ('다냥!', 12.3, 12, 'red')]),
 dict(id='d4', who='pink',  name='분홍', col='#E86AA8', top=1050, segs=[('너 토큰 하나|남았지롱~ 😏', 13.15, 14, '')]),
 dict(id='d5', who='mint',  name='민트', col='#2EAF7D', top=1500, segs=[('아 진짜?', 14.2, 14, 'big')]),
]
def chars():
    """[(dlg_id, who, ch, t, hl)] 글자마다 나타나는 시각"""
    out = []
    for d in DLG:
        for txt, t0, cps, hl in d['segs']:
            for i, ch in enumerate(txt):
                out.append((d['id'], d['who'], ch, t0 + i / cps, hl))
    return out
# 대화창 밖 웅얼(혼돈 장면 등): (who, 시작, 음절수, 속도, 끝을 '냥'으로)
BURSTS = [('mint', 7.05, 5, 13, True), ('blue', 7.3, 6, 14, False), ('pink', 7.55, 4, 12, False),
          ('mint', 8.25, 4, 13, True), ('blue', 8.6, 5, 14, False), ('pink', 9.0, 5, 13, False)]
if __name__ == '__main__':
    print(json.dumps(DLG, ensure_ascii=False)[:200])
