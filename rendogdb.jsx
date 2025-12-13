import React, { useState, useEffect, useMemo } from 'react';
import { Search, Info, Database, Zap, ArrowRight, X } from 'lucide-react';

// ==========================================
// DATA SECTION
// ==========================================
const RAW_DATA = `
- BLOCK -
< 아이스 블럭 > [ 51 ]
우클릭: 시전자의 위치에 아이스블럭을 소환해 600의 피해를 입힙니다.
< 스톤 블럭 > [ 52 ]
< 디멘션 블럭 > [ 71~7162 ]
우클릭: 모든 마을과 중립지역을 자유롭게 이동할 수 있습니다.
< 그래비티 블럭 > [ 53~61 ]
우클릭: 중력장으로 적들을 속박시키고 저주를 겁니다.
< 엔젤블럭 > [ 62~63 ]
우클릭: 3초간 무적 상태가 되며 주변 적들에게 22의 연속 피해를 입힙니다. 적을 타격할 시 공중으로 조금 떠오릅니다.
< 그 외 모든 블럭 > [ 51 ]

- EPIC -
< 가디언 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 시전자에게 무적을 부여합니다. (지속시간 1.5초 / 1.9초 / 2.2초 / 2.6초 / 3초)
< 리스크 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 시전자의 체력을 1까지 깎고, 깎인 체력의 절반만큼의 보호막을 획득합니다. 3초 뒤 소모한 체력에 비례하여 체력을 회복합니다.
< 블랙홀 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 바라보고 있는 지점에 블랙홀을 소환해 주변 적들을 끌어당깁니다.
< 비숍 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 최대 체력에 비례해 체력을 회복합니다.
< 슈메티드 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 앞으로 멀리 도약합니다.
< 아르마 >[ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 결계를 생성해 지속시간 동안 결계 내 적의 이동속도를 강탈합니다.
< 에놉시스 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 지속시간 동안 적에게 주는 피해가 1.5배로 증가합니다.
< 워터노바 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 전방의 적들을 크게 밀어냅니다.
< 워터서퍼 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 지속시간동안 전방으로 돌진합니다.
< 워터폴 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 주변 적들을 밀쳐내며 공중으로 도약합니다. 신속 효과를 받습니다.
< 익스플로젼 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 시전자에게 신속과 점프강화를 부여합니다.
< 프런쳐 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 최대 체력에 비례해 체력을 회복하고, 주변 적들의 이동속도를 강탈합니다.
< 하포럼 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 주변에 회복 구슬을 뿌려, 뿌린 회복 구슬을 습득할 시 최대 체력에 비례해 체력을 회복합니다.

- UNIQUE -
< 네크로헤머 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 천천히 공중으로 떠오른 뒤, 먼 거리를 날아가 지면을 강타하며, 넓은 범위의 적을 띄우고 피해를 입힙니다.
< 데스페라도 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 4초간 공중을 자유롭게 날아다닐 수 있게 됩니다.
< 라이오닉 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 제자리에서 주변 적을 자동공격 하는 터렛을 설치합니다.
< 마그네트 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 전방으로 10초간 천천히 이동하는 행성을 소환합니다.
< 매직 콜리젼 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 신비한 빛의 화살을 발사해 적과 시전자의 위치를 뒤바꿉니다.
< 메테오 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 바라보는 위치에 유성을 떨어뜨려 주변 적에게 2,000의 피해를 입힙니다.
< 볼케이노 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 바라보는 방향에 불기둥을 소환해 5회의 연속 피해를 입힙니다.
< 사령소환 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 분노한 영혼을 25회 소환해 주변 적들에게 90의 피해를 입힙니다.
< 셀프익스팅션 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 7초 동안 자폭을 준비합니다. 이후 주변에 매우 큰 피해를 입히고, 시전자도 반동 피해를 입습니다.
< 스타 런처 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 전방에 폭발하는 별의 마탄을 발사해 150의 피해를 입힙니다.
< 스타블래스터 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 공중에 높게 날아올라 적에게 별 투사체를 11회 발사합니다.
< 스톰크러셔 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 먼 거리를 도약하며 지면을 강타하여 주변 적에게 피해를 입힙니다.
< 에반리스트 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 공중으로 짧게 도약하며 주변 적에게 약한 피해를 입히고, 일정 체력을 회복합니다.
< 트랩 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 현재 위치에 트랩을 설치해 위를 지나가는 적들의 이동속도를 감소시키고 30의 연속 피해를 입힙니다.
< 트리플스타 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 별을 3개 생성한 뒤, 전방으로 빠르게 발사합니다.
< 프로미넌트 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 화염을 35회 발사해, 적중당한 적의 수 하나 당 20의 광역 피해를 입힙니다.
< 헤비스매셔 > [ 노각 42~51 ][ 1강 53~61 ][ 2강 6152 ][ 3강 62 ][ 4강 71 ][ MAX 72 ]
우클릭: 공중으로 날아오른 뒤 지면을 크게 강타하여 주변 적에게 피해를 입힙니다.

- LEGEND -
< 데모니오 > [ 노각 61~62 ][ 1강 71~7162 ][ 2강 7162~72 ][ 3강 73~81 ][ 4강 8172~82 ][ MAX 83~8372 ]
우클릭: 주변 적들을 밀어내고 일정 시간 동안 적에게 입히는 1% 의 피해량을 회복합니다.
< 브이미르 > [ 노각 61~62 ][ 1강 71 ][ 2강 7162 ][ 3강 73 ][ 4강 8172 ][ MAX 8273 ]
좌클릭: 브이미르를 휘둘러 주변 적에게 피해를 입힙니다. 우클릭: 4.5초간 각성 상태가 되며 좌클릭의 쿨타임이 사라지고 범위가 증가합니다.
< 블레이드 브랜디쉬 > [ 노각 61~62 ][ 1강 71 ][ 2강 7162 ][ 3강 73 ][ 4강 8172 ][ MAX 8272 ]
우클릭: 창으로 전방의 적들을 찔러 1,300의 피해를 입힌 뒤, 주변을 돌아가며 베어 150의 피해를 넓은 범위에 10회 입힙니다.
< 세크리트 > [ 노각 61~62 ][ 1강 71 ][ 2강 7162 ][ 3강 73 ][ 4강 8172 ][ MAX 8273 ]
우클릭: 바라보는 위치에 중력장을 소환해 넓은 범위의 적을 공중으로 띄운 뒤, 땅으로 내리 꽂아 큰 피해를 입힙니다.
< 티지트 > [ 노각 61~62 ][ 1강 71 ][ 2강 7162 ][ 3강 73 ][ 4강 8172 ][ MAX 83 ]
우클릭: 앞으로 크게 도약한 뒤 지면으로 큰 일격을 가해 주벽 적들을 섬멸 합니다.
< 하데스 > [ 노각 61~62 ][ 1강 71~72 ][ 2강 72~73 ][ 3강 81~8172 ][ 4강 82~8272 ][ MAX 8372~91 ]
우클릭: 넓은 범위의 적들의 움직임을 4초간 멈춥니다.
< 트론 > [ 노각 61~62 ][ 1강 71~72 ][ 2강 72~73 ][ 3강 81~8172 ][ 4강 82~8272 ][ MAX 91 ]
좌클릭: 뒤로 도약한 후 전방의 적을 4번 찔러 피해를 입힙니다. 우클릭: 넓은 범위에 피해를 3번 입힙니다.
< 혈계심판 > [ 노각 61~62 ][ 1강 71~7162 ][ 2강 7162~72 ][ 3강 73~81 ][ 4강 8172~82 ][ MAX 83~8372 ]
우클릭: 혈계의 문을 열어 긴 시간 동안 주변에 오는 모든 적을 최대 20회까지 지속 피해를 입힙니다.
< 흑월참 > [ 노각 61~62 ][ 1강 71~7162 ][ 2강 7162~72 ][ 3강 73~81 ][ 4강 8172~82 ][ MAX 8371~8372 ]
좌클릭: 전방의 적을 3번 베어 피해를 입힙니다. 우클릭: 전방으로 돌진하며 넓은 범위의 적을 베어 큰 피해를 입힙니다.

- DIVINE -
< 다크로즈 > [ 노각 8172 ][ 1강 8173 ][ 2강 82 ][ 3강 8272~83 ][ 4강 8372~91 ][ MAX 92 ]
우클릭: 1.6초간 무적 상태가 되며 좁은 범위의 주변 적을 끌어당깁니다.
< 리안에겐 > [ 노각 8272 ][ 1강 83 ][ 2강 8372 ][ 3강 9171 ][ 4강 9181 ][ MAX 9281 ]
좌클릭: 2번에 걸친 광역 피해를 입힙니다. 우클릭: 지속피해를 입힙니다.
< 문라이트 > [ 노각 8171 ][ 1강 8172 ][ 2강 8173 ][ 3강 8271~8273 ][ 4강 8371~91 ][ MAX 9183~92 ]
* 적을 처치할때마다 영혼을 흡수합니다. 좌클릭: 빠르게 돌진. 우클릭: 영혼이 20개 이상 모였을때 사용 가능.
< 제피로스 > [ 노각 81 ][ 1강 8171 ][ 2강 8173 ][ 3강 8271~8273 ][ 4강 8371~8373 ][ MAX 9183~92 ]
좌클릭/우클릭: 빠른 속도로 적을 베어가릅니다.
< 주벌청선 > [ 노각 91 ][ 1강 9172 ][ 2강 9181 ][ 3강 9182 ][ 4강 92 ][ MAX 9283~93 ]
우클릭: 좁은 범위에 부채를 휘둘러 총 48회의 피해를 입힙니다.
< 트리아이나 > [ 노각 62 ][ 1강 71 ][ 2강 72~73 ][ 3강 8171~8172 ][ 4강 8272~83 ][ MAX 9182~9183 ]
우클릭: 전방으로 가볍게 도약한 뒤, 도착 지점에 피해를 2회 입힙니다.
< 퍼니스보 > [ 노각 61 ][ 1강 71 ][ 2강 72~73 ][ 3강 8171~8172 ][ 4강 8272~83 ][ MAX 9182~9183 ]
우클릭: 2초동안 정신을 집중한 뒤, 강력한 불의 화살을 3회 발사합니다.
< 황금책형 > [ 노각 62 ][ 1강 71 ][ 2강 72~73 ][ 3강 8171~8172 ][ 4강 8272~83 ][ MAX 9182~9183 ]
우클릭: 전방으로 빠르게 날아가고 내려찍으며, 도착 지점에 가까울 수록 큰 피해를 줍니다.
< 흡혈귀 > [ 노각 71 ][ 1강 72 ][ 2강 73~7362 ][ 3강 8171~8172 ][ 4강 8272~83 ][ MAX 9182~9183 ]
우클릭: 주변 적에게 1.6초간 연속 피해를 입힌 뒤, 선혈을 방출시켜 큰 피해를 입힙니다.

- SUPERIOR -
< 디바우어 > [ 파괴 10192 ][ 노각 10191 ][ 1강 1019181 ][ MAX 10391~10393 ]
좌클릭: 창을 휘둘러 전방에 피해를 2회 입힌 뒤... 우클릭: 탐식을 중첩시키며...
< 레이네드 > [ 파괴 10292 ][ 노각 10193 ][ 1강 102 ][ MAX 10492 ]
좌클릭: 주변 적을 공중으로 띄우며 넓은 범위에 큰 피해... 우클릭: 자신의 분신과 검은 영역을 소환...
< 르나데산 > [ 파괴 92 ][ 노각 81 ][ 1강 82 ][ MAX 10292~10293 ]
좌클릭: 무기를 휘둘러 주변 적들을 밀쳐냅니다. 우클릭: 전방으로 돌진...
< 잔월효성 > [ 파괴 93 ][ 노각 92 ][ 1강 9283 ][ MAX 103~10393 ]
좌클릭: 전방을 크게 베어 1,200의 피해를 입힙니다. 우클릭: 전방을 내리 찍으며...
< 타라시스 > [ 파괴 92 ][ 노각 82 ][ 1강 83 ][ MAX 10292~10293 ]
좌클릭: 좁은 범위의 적을 감전시켜... 우클릭: 바라본 지형에 전격을 떨어뜨려...

- TRANSCEND -
< 무거운 원석 > [ 61 ]
< 빨강 초월석 결정 > [ 63~71 ]
< 노랑 초월석 결정 > [ 62~63 ]
< 초록 초월석 결정 > [ 63~71 ]
< 파랑 초월석 결정 > [ 63~71 ]
< 보라 초월석 결정 > [ 62~63 ]
< 무색 초월석 결정 > [ 71 ]
< 빨강 초월석 > [ 7163~72 ]
< 노랑 초월석 > [ 7162 ]
< 초록 초월석 > [ 7261~7262 ]
< 파랑 초월석 > [ 7261~7262 ]
< 보라 초월석 > [ 7162~7163 ]
< 초월석 꾸러미 > [ 72 ]

- TRANSCENDENT EPIC -
< 초월 가디언 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 리스크 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 블랙홀 > 거래 가능 [ 9182 ] 거래 불가 [ 9172 ]
< 초월 비숍 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 슈메티드 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 아르마 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 에놉시스 > 거래 가능 [ 9182~9183 ] 거래 불가 [ 9181 ]
< 초월 워터노바 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 워터서퍼 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 워터폴 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 익스플로젼 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 프런쳐 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 하포럼 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]

- TRANSCENDENT UNIQUE -
< 초월 네크로헤머 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 데스페라도 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 라이오닉 > 거래 가능 [ 91 ] 거래 불가 [ 83 ]
< 초월 마그네트 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 매직콜리젼 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 메테오 > 거래 가능 [ 91 ] 거래 불가 [ 83 ]
< 초월 볼케이노 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 사령소환 > 거래 가능 [ 83 ] 거래 불가 [ 82 ]
< 초월 셀프익스팅션 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 스타 런처 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 스타블래스터 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 스톰크러셔 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 에반리스트 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 트랩 > 거래 가능 [ 91 ] 거래 불가 [ 83 ]
< 초월 트리플스타 > 거래 가능 [ 9182 ] 거래 불가 [ 9181 ]
< 초월 프로미넌트 > 거래 가능 [ 9181 ] 거래 불가 [ 91 ]
< 초월 헤비스매셔 > 거래 가능 [ 91 ] 거래 불가 [ 83 ]

- TRANSCENDENT LEGEND -
< 초월 데모니오 > 거래 가능 [ 93 ] 거래 불가 [ 92 ]
< 초월 브이미르 > 거래 가능 [ 9282 ] 거래 불가 [ 92 ]
< 초월 블레이드 브랜디쉬 > 거래 가능 [ 92 ] 거래 불가 [ 9182 ]
< 초월 세크리트 > 거래 가능 [ 101 ] 거래 불가 [ 9382 ]
< 초월 티지트 > 거래 가능 [ 9382 ] 거래 불가 [ 93 ]
< 초월 하데스 > 거래 가능 [ 10182 ] 거래 불가 [ 9382 ]
< 초월 트론 > 거래 가능 [ 101~10182 ] 거래 불가 [ 9382 ]
< 초월 혈계심판 > 거래 가능 [ 9382 ] 거래 불가 [ 93 ]
< 초월 흑월참 > 거래 가능 [ 101 ] 거래 불가 [ 93 ]

- TRANSCENDENT DIVINE -
< 초월 다크로즈 > 거래 가능 [ 102 ] 거래 불가 [ 10193 ]
< 초월 리안에겐 > 거래 가능 [ 10291 ] 거래 불가 [ 102 ]
< 초월 문라이트 > 거래 가능 [ 10193 ] 거래 불가 [ 10192 ]
< 초월 제피로스 > 거래 가능 [ 10291 ] 거래 불가 [ 102 ]
< 초월 주벌청선 > 거래 가능 [ 10291 ] 거래 불가 [ 102 ]
< 초월 트리아이나 > 거래 가능 [ 102 ] 거래 불가 [ 10193 ]
< 초월 퍼니스보 > 거래 가능 [ 10193 ] 거래 불가 [ 10192 ]
< 초월 황금책형 > 거래 가능 [ 10193 ] 거래 불가 [ 10192 ]
< 초월 흡혈귀 > 거래 가능 [ 10193 ] 거래 불가 [ 10192 ]

- TRANSCENDENT SUPERIOR -
< 초월 디바우어 > 거래 가능 [ X ] 거래 불가 [ X ]
< 초월 레이네드 > 거래 가능 [ X ] 거래 불가 [ X ]
< 초월 르나데산 > 거래 가능 [ X ] 거래 불가 [ X ]
< 초월 잔월효성 > 거래 가능 [ X ] 거래 불가 [ X ]
< 초월 타라시스 > 거래 가능 [ X ] 거래 불가 [ X ]

- CASH -
< 아이템 보관함 > [ 72 ]
< 거대 창고 > [ 82~83 ]
< 머리 보관함 > [ 72 ]
< 치장 보관함 > [ 73 ]
< 주문서 보관함 > [ 73 ]
< Magic Mirror > [ 72~73 ]
< 전직 무기 소각로 > [ 73 ]
< 잭헤머 > [ 6152~62 ]

- EVENT -
< 달토끼의 절구 방망이(달절구) > [ 82 ]
< 호랭이 레깅스 > [ 91 ]
< 달맞이 신발 > [ 91 ]
< 분홍 찹쌀신 > [ 82 ]
< 기타 갑옷 > [ 81~82 ]
< 마리아의 종 > [ 9183~92 ]
< 산타의 종 > [ 71 ]
< 산타의 배달용 썰매 > [ 73~ ]
< 크리스마스 양말 > [ 51 ]
< 크리스마스 기념 특급 폭죽 > [ 53 ]
< 스노우 블럭 > [ 61 ]
< 스노우 볼 > [ 52 ]
< 엘프 부츠 > [ 81~ ]
< 레전더리 오너먼트 > [ 82~ ]
< Rendog First Sword (렌퍼소) > [ 102~ ]
< Anchovy First Sword (엔퍼소) > [ 101~??? ]
< ANNIVERSARY BATTLE AXE (ABA) > [ 9182~92 ]
< 십이조 에어로 키네시스 > [ 82~83 ]
< Faded Rendog First Sword (녹퍼소) > [ 10191~10192 ]
< MellDa's Melted Wand (멜녹완) > [ 83 ]
< 4EVER SPACE ROCKET > [ 7162~72 ]
< 자가부양동력장치 > [ 72~73 ]
< Rendog Ocean Sword (렌오소) > [ 101~??? ]
< Summer Water Gun (섬워건) > [ 81~82 ]
< 해변 서퍼 > [ 81 ]
< 고장난 아이스 박스 > [ 71 ]
< 워터풀 > [ 62 ]
< ANNIVERSARY MAGIC STAFF (AMS) > [ 83 ]
< 도루묵의 황금드릴 > [ 72 ]
< 날카로운 곡괭이 > [ 62 ]
< 석탄 가루 > [ 61 ]
< 광부의 만능도구 > [ 72~73 ]
< 부엉이타운cbt초대권 > [ ?? ]
< 월야 부엉참 > [ ?? ]
< 리알의 견습 지팡이 > [ ?? ]
< 부패의 검 > [ ?? ]
< 포자 폭탄 > [ ?? ]

- RANDOM BOX -
< 랜덤박스 (랜박) > [ 6152 ]
< 미스틱 랜덤박스 (미박) > [ 53 ]
< 블럭 랜덤박스 > [ 51 ]
< 에픽 랜덤박스 > [ 51 ]
< 유니크 랜덤박스 > [ 51 ]
< 유픽 랜덤박스 > [ 51 ]
< 레전드 랜덤박스 > [ 71~7161 ]
< 디바인 랜덤박스 > [ 8173 ]
< 슈페리얼 랜덤박스 > [ 93 ]

- ARMOUR -
< 잠수부 갑옷 > [ 파츠 당 32 ]
< 고대 잠수부 갑옷 > [ 파츠 당 72 ]
< 태양 불꽃 갑옷 > [ 51~52 ]
< 행운의 갑옷 (흉갑) > [ 63 ]
< 행운의 갑옷 (바지) > [ 63 ]
< 행운의 갑옷 (신발) > [ 63 ]

- BOSS DROPS -
< 라바 슬라임의 머리 > [ 32~33 ]
< 기간틱 스켈레톤의 머리 > [ 41 ]
< 사스콰치의 머리 > [ 41~4131 ]
< 파멸의 골렘 머리 > [ 41~4132 ]
< 스피드이더의 머리 > [ 42 ]
< 임야의 여왕 머리 > [ 43 ]
< 엘더가디언의 머리 > [ 51~5141 ]
< 엘더가디언의 영혼 > [ 73 ]
< 악시우스의 머리 > [ ?? ]
< 스테들러의 머리 > [ 51 ]
< 스테들러의 영혼 > [ ?? ]
< 락토의 나무 > [ 23 ]
< 딱딱하게 굳은 심장 > [ 31 ]
< 겁쟁이 선장의 보물 > [ 32~33 ]
< 단단한 얼음 덩어리 > [ 33~41 ]
< 거미의 실 > [ 41~42 ]
< 부글거리는 용암 > [ 42~43 ]
< 오징오징 먹물 > [ 51 ]
< 고대의 기억 > [ ?? ]
< 불안정 원소 > [ 51 ]
< 꺼지지 않는 불씨 > [ 51 ]
< 시든 뼛조각 > [ 53~61 ]

- MONSTER DROPS -
< 골렘의 조각 > [ 1세트 당 32 ]
< 골렘의 파편 > [ 41 ]
< 깨끗한 좀벌레의 눈 > [ 41 ]
< 맹독의 거미의 눈 > [ 41 ]
< 구아노 덩어리 > [ 41 ]
< 이름 없는 자의 영혼 > [ 1세트 당 32 ]
< 저주 받은 자의 영혼 > [ 32 ]
< 심해의 돌 > [ 1세트 당 41 ]
< 심연의 돌 > [ 41 ]
< 수정석 > [ 1세트 당 41 ]
< 힘이 깃든 수정석 > [ 41 ] [ 1세트 당 71 ]
< 용암괴수의 뼈 잔해 > [ 32~41 ]
< 마그마 리치의 영혼 구슬 > [ 42 ]
< 화염의 꽃 > [ 51 ]
< 어둠의 핵 > [ 1세트 당 41 ]
< 심연의 핵 > [ 41 ]
< 괴생명체의 빛나는 살점 > [ 10개 당 52 ]
< 고대의 증표 > [ 10개 당 52 ]
< 빛나는 호박 > [ 10개 당 52 ]
< 암흑 물질 > [ 10개 당 53 ]

- MISC -
< 완전체 정수 > [ 41 ]
< 최초의 정수 > [ 62 ]
< 공허의 기운 > [ 4133~42 ]
< 정수 결정 > [ 32~33 ]
< 바이올렛 크리스탈 > [ 31~3122 ] [ 1세트 당 61~6152 ]
< 접속보상 > [ 1세트 당 61 ]
< 마을 이동권 > [ 21 ] [ 1세트 당 51 ]
< 광산 입장권 > [ 51~5141 ]
< 추천자를 위한 보물상자 > [ 6152 ]
< 각성 유픽 무기 선택권 > [ 52~53 ]
< 점프뭉치 > [ 42 ]
< Stair Coin (무한의 계단 코인) > [ 41~42 ]
< 치킨붐 > [ 53 ]
< 잠수부의 검 > [ 41 ]
< 바운스! > [ 51 ]
< [H] 드래곤 알 > [ 52~53 ]
< 알 부화기 > [ 61 ]
< 알 주머니 > [ 53~61 ]

- FISHING -
< 고래잡는 낚시대 > [ 91 ]
< 작살총 > [ 91 ]
< 전설 낚시대 > [ 0강 93 ] [1~7강 X]
< 황금 낚시대 > [ 61 ]
< 조개 > [ 52 ]
< 심해 조개 > [ 7161 ]
< 바다의 진주 > [ 43~51 ]
< 태양의 정수 > [ 61~62 ]
< 바드의 가면 > [ 71 ]
< 엔비스 재료 물고기 > [ 1cm, 4cm, 7cm, 8cm 물고기: 41 ]
< 엔비스 재료 물고기 > [ 14cm 물고기: 41 ]
< 엔비스 재료 물고기 > [ 78cm 물고기: 51 ]

- ORDER SHEET -
< 백지책 > [ 61 ]
< 이동권의 화염 주문서 > [ 51~52 ]
< 초보자용 버프 주문서 > [ 31 ]
< 엘더복어의 가호 > [ 32 ]
< 고양이의 눈 > [ 31 ]
< 행운의 주문서 > [ (하급) I 42, II 51, III 52 ] [ (중급) I 51, II 52, III 61 ] [ (상급) I 52, II 61, III 62 ]
< 약탈의 주문서 > [ 하급: 41, 42, 51 ] [ 중급: 42, 51, 52 ] [ 상급: 51, 52, 61 ]
< 탐욕의 주문서 > [ 하급: 41, 42, 51 ] [ 중급: 42, 51, 52 ] [ 상급: 51, 52, 61 ]
< 영의 주문서 > [ 하급: 43, 52, 61 ] [ 중급: 53, 6152, 63 ] [ 상급: 6152, 63, 7162 ]
< 피사레의 주문서 > [ 7162~7163 ]
< 피사레의 상급 주문서 > [ 7262~7263 ]
< 피사레의 최상급 주문서 > [ 8171~8172 ]
< 피사레의 공허의 고서 > [ 91 ]
< 피사레의 최초의 고서 > [ 101 ]
< 미지의 고서 (피사레) > [ 81~8171 ]
< 하급 바이올렛 주문서 > [ 61 ]
< 바이올렛 주문서 > [ 62 ]
< 최상급 바이올렛 주문서 > [ 63 ]
< 찬란한 바이올렛 주문서 > [ 63 ]
< 불안정하게 찬란한 바이올렛 주문서 > [ 61 ]
< 찬란한 최상급 바이올렛 주문서 > [ 72~73 ]
< 아라크의 황금 고서 > [ 9382 ]
< 미지의 고서 (바이올렛) > [ ?? ]
< 프레폴레의 안전 주문서 > [ 61 ]
< 프레폴레의 보급형 주문서 > [ 71 ]
< 프레폴레의 하급 주문서 > [ 73 ]
< 프레폴레의 주문서 > [ 8173~82 ]
< 프레폴레의 최상급 주문서 > [ 83 ]
< 프레폴레의 황금고서 > [ 9282~9283 ]
< 프레폴레의 봉인고서 > [ 102 ]
< 미지의 고서 (프레폴레) > [ ?? ]

- RUNE -
< 죽은자의 룬 > [ 51 ]
< 공허의 뒤틀린 룬 >[ 52~53 ]
< 공허의 보석 > [ 0 61 ][ +1 6152 ][ +2 62 ]
< 악을 부르는 룬 > [ 71 ]
< 성물 해골 > [ 81~8171 ]
< 태초의 룬 > [ 72~73 ]
< 악시우스 태초의 룬 > [ ?? ]
< 스테들러 태초의 룬 > [ 81~8171 ]
< 혼신 > [ 73~81 ]
< 펑혼신 > [ 71 ]
< 공격력 18% 룬 > [ 72~7262 ]
< 공격력 21% 룬 > [ 82~8271 ]
< 공격력 22% 룬 > [ 8272~8273 ]
< 공격력 24% 룬 > [ 91~9182 ]
< 공격력 25% 룬 > [ ~9281 ]
< 공격력 27% 룬 > [ ~10192 ]
< 공격력 28% 룬 > [ 10193~102 ]
< 공격력 30% 룬 > [ 106~10692 ]
< 체력 45% 룬 > [ 72 ]
< 체력 50% 룬 > [ 8172~82 ]
< 붉은 꽃게 > [ 8171~8172 ]
< 푸른 꽃게 > [ 73~81 ]
< 고대 광부의 힘 보석 > [ 8171~8172 ]
< 고대 광부의 체력 보석 > [ 8171~8172 ]
< 60% 공격력 주문서 > [ 7163 ]
< 10% 공격력 주문서 > [ 71~7161 ]
< 60% 체력 주문서 > [ 61~6151 ]
< 10% 체력 주문서 > [ 61 ]
< 60% 가속 주문서 > [ 8372 ]
< 10% 가속 주문서 > [ 8172 ]
`;

const decodePrice = (priceStr) => {
  if (!priceStr) return null;

  // 1. Handle Comma Separation (Multiple values: "I 42, II 51")
  if (priceStr.includes(',')) {
    const parts = priceStr.split(',');
    const decodedParts = parts.map(part => {
      const trimmed = part.trim();
      // Recurse for each part (handling ranges or single codes)
      // If recursion returns null (no valid code), return original text if needed, or skip
      const decoded = decodePrice(trimmed); 
      return decoded ? decoded : null;
    });
    // Join valid decoded parts
    const validParts = decodedParts.filter(p => p);
    if (validParts.length > 0) return validParts.join(', ');
  }

  // 2. Handle Range Logic (53~61)
  if (priceStr.includes('~')) {
    const parts = priceStr.split('~');
    const decodedParts = parts.map(part => {
      const trimmed = part.trim();
      const decoded = decodeSingleCode(trimmed);
      return decoded ? decoded : trimmed;
    });
    return decodedParts.join(' ~ ');
  }

  // 3. Single Code Decoding
  return decodeSingleCode(priceStr);
};

const decodeSingleCode = (rawText) => {
  // Extract number sequence from the text.
  // If there are multiple number groups (e.g. "10개 당 52"), we usually want the last one which is the price.
  // "I 42" -> matches ["42"]
  // "10개 당 52" -> matches ["10", "52"]. We take "52".
  
  const matches = rawText.match(/\d+/g);
  if (!matches || matches.length === 0) return null;

  const code = matches[matches.length - 1]; // Use the last number sequence found

  // 53 -> 5강 3개
  if (code.length === 2) {
    const star = code[0];
    const count = code[1];
    return `${star}강 강화석 ${count}개`;
  }

  // 8172 -> 8강 1개 + 7강 2개
  if (code.length === 4) {
    const star1 = code[0];
    const count1 = code[1];
    const star2 = code[2];
    const count2 = code[3];
    return `${star1}강 강화석 ${count1}개 + ${star2}강 강화석 ${count2}개`;
  }

  // 101 -> 10강 1개
  if (code.length === 3 && code.startsWith('10')) {
      return `10강 강화석 ${code[2]}개`;
  }

  // 10192 -> 10강 1개 + 9강 2개
  if (code.length === 5 && code.startsWith('10')) {
      return `10강 강화석 ${code[2]}개 + ${code[3]}강 강화석 ${code[4]}개`;
  }

  // 101102 -> 10강 1개 + 10강 2개
  if (code.length === 6 && code.startsWith('10110')) {
      return `10강 강화석 ${code[2]}개 + 10강 강화석 ${code[5]}개`;
  }
  
  // 1019181 -> 10강 1개 + 9강 1개 + 8강 1개
  if (code.length === 7 && code.startsWith('10')) {
      return `10강 강화석 ${code[2]}개 + ${code[3]}강 강화석 ${code[4]}개 + ${code[5]}강 강화석 ${code[6]}개`;
  }

  return null;
};

const parseData = (text) => {
  const lines = text.split('\n');
  const items = [];
  let currentCategory = 'Uncategorized';
  let currentItem = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('-') && trimmed.endsWith('-')) {
      currentCategory = trimmed.replace(/-/g, '').trim();
      return;
    }

    const itemMatch = trimmed.match(/^< (.+?) >\s*(.*)/);
    if (itemMatch) {
      const name = itemMatch[1];
      let priceRaw = itemMatch[2];

      // =========================================================
      // DATA CLEANING: 1, 2, 3, 4강 관련 항목 삭제
      // =========================================================
      priceRaw = priceRaw.replace(/\[\s*[1-4]강\s*.*?\]/g, '');
      priceRaw = priceRaw.replace(/\[\s*[0-9]+~[0-9]+강\s*.*?\]/g, '');
      priceRaw = priceRaw.replace(/\s+/g, ' ').trim();

      currentItem = {
        id: Math.random().toString(36).substr(2, 9),
        category: currentCategory,
        name: name,
        priceRaw: priceRaw,
        desc: ''
      };
      items.push(currentItem);
    } else if (currentItem) {
      currentItem.desc += (currentItem.desc ? ' ' : '') + trimmed;
    }
  });

  return items;
};

const ItemCard = ({ item }) => {
  // Extract price blocks enclosed in []
  // If no brackets found, treat the whole string as one block
  const priceBlocks = (item.priceRaw.match(/\[(.*?)\]/g) || [item.priceRaw])
    .filter(block => block.replace(/[\[\]\s]/g, '').length > 0);

  const formattedDesc = item.desc
    ? item.desc.replace(/ 우클릭:/g, '\n우클릭:').replace(/ 좌클릭:/g, '\n좌클릭:')
    : '';

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 hover:bg-gray-750 transition-all duration-200 shadow-lg group relative overflow-hidden">
      
      {/* Hover Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <ArrowRight className="text-indigo-400 -rotate-45 transform translate-x-2 group-hover:translate-x-0 transition-transform" />
      </div>

      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Left: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
             <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {item.category}
             </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-100 group-hover:text-indigo-300 transition-colors mb-2 truncate">
            {item.name}
          </h3>
          {formattedDesc && (
            <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap break-words">
              {formattedDesc}
            </div>
          )}
        </div>

        {/* Right: Price Box (Vertical Stack) */}
        <div className="w-full md:w-auto md:min-w-[300px] flex flex-col gap-2">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1">
                <Zap size={12} />
                Market Price
            </div>
            
            {priceBlocks.length > 0 ? (
                priceBlocks.map((block, index) => {
                    // Remove brackets for display
                    const cleanBlock = block.replace(/[\[\]]/g, '').trim();
                    
                    // Pass the FULL string to decodePrice, allowing it to handle commas and text
                    const decoded = decodePrice(cleanBlock);

                    return (
                        <div key={index} className="bg-gray-900/80 rounded-lg p-3 border border-gray-700/50 backdrop-blur-sm hover:border-indigo-500/30 transition-colors">
                            {/* Main Price Text - Font Sans, Bold Numbers */}
                            <div className="text-green-400 font-sans text-base font-semibold">
                                {cleanBlock}
                            </div>
                            
                            {/* Decoded Explanation */}
                            {decoded && (
                                <div className="mt-1 pt-1 border-t border-gray-700/50 text-xs text-blue-300 flex items-start gap-1.5">
                                    <ArrowRight size={12} className="mt-0.5 shrink-0 opacity-70" />
                                    <span className="opacity-90">{decoded}</span>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="text-gray-500 text-sm italic">가격 정보 없음</div>
            )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const parsedItems = parseData(RAW_DATA);
    setItems(parsedItems);
    const uniqueCategories = ['ALL', ...new Set(parsedItems.map(item => item.category))];
    setCategories(uniqueCategories);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(lowerSearch) ||
        item.category.toLowerCase().includes(lowerSearch) ||
        item.desc.toLowerCase().includes(lowerSearch);
      
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-indigo-500 selection:text-white">
      <style>{`
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-down {
            animation: fadeInDown 0.8s ease-out;
        }
      `}</style>
      {/* ==========================================
        HEADER & SEARCH SECTION 
        ==========================================
      */}
      <div className="flex flex-col items-center justify-center pt-24 pb-12 px-4">
        {/* Logo / Title Area */}
        <div className="flex flex-col items-center animate-fade-in-down mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
            RendogDB
            </h1>
            <p className="text-gray-400 text-lg font-light tracking-wide">
             Get item prices faster than anyone else
            </p>
        </div>

        {/* Search Bar Container */}
        <div className="relative w-full max-w-2xl group z-10">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-12 py-5 bg-gray-800 border-2 border-gray-700 rounded-full text-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-xl hover:shadow-2xl hover:border-gray-600"
            placeholder="Search items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filters (Modified Layout) */}
        <div className="mt-8 w-full max-w-4xl pb-2">
            <div className="flex flex-wrap justify-center gap-2 px-4">
            {categories.map(cat => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-transparent
                    ${selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-600'}`}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>
      </div>

      {/* ==========================================
        RESULTS SECTION 
        ==========================================
      */}
      <div className="max-w-5xl mx-auto px-6 mb-4 flex justify-between items-end border-b border-gray-800 pb-2">
        <span className="text-gray-500 text-sm">
              Found {filteredItems.length} results
        </span>
        <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-900/30 px-3 py-1 rounded-md border border-indigo-500/30">
            <Info size={14} />
            <span>53 = 5강 3개 | 8172 = 8강 1개 + 7강 2개</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20 space-y-4">
        {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
        ))}

        {filteredItems.length === 0 && (
             <div className="text-center py-20 opacity-50 flex flex-col items-center">
                 <Database className="w-16 h-16 mb-4 text-gray-600"/>
                 <p className="text-xl text-gray-400">No items found matching "{searchTerm}"</p>
                 <p className="text-sm text-gray-600 mt-2">Try searching for item name or category.</p>
             </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="text-center py-10 text-gray-600 text-sm border-t border-gray-800 bg-gray-900/50">
          <p>© 2025 Rendog Market Price DB.</p>
          <p className="mt-1 opacity-50">Data updated: 2025.11.28</p>
      </footer>
    </div>
  );
};

export default App;
