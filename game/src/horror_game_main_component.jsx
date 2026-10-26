import React, { useState } from 'react';
import { 
  ArrowLeft, AlertTriangle, 
  RotateCcw, Skull, CheckCircle2, Phone, Compass
} from 'lucide-react';

// ==========================================
// 한글 조사 자동 변환 도우미 (받침 유무 판별)
// ==========================================
function attachParticle(name, type) {
  if (!name) name = '여주';
  const lastChar = name.charAt(name.length - 1);
  const charCode = lastChar.charCodeAt(0);

  // 한글 범위 (가 ~ 힣) 체크
  const isKorean = charCode >= 0xac00 && charCode <= 0xd7a3;
  const hasJongseong = isKorean ? (charCode - 0xac00) % 28 !== 0 : false;

  switch (type) {
    case '가': // 이가 / 가 (예: 지민이가 / 민아가)
      return hasJongseong ? `${name}이가` : `${name}가`;
    case '는': // 은 / 는 (예: 지민이는 / 민아는)
      return hasJongseong ? `${name}이는` : `${name}는`;
    case '를': // 을 / 를 (예: 지민이를 / 민아를)
      return hasJongseong ? `${name}이를` : `${name}를`;
    case '아': // 아 / 야 (예: 지민아 / 민아야)
      return hasJongseong ? `${name}아` : `${name}야`;
    case '이': // 이 / (빈값) (예: 지민이 / 민아)
      return hasJongseong ? `${name}이` : name;
    case '과': // 과 / 와 (예: 지민이와 / 민아와)
      return hasJongseong ? `${name}이와` : `${name}와`;
    default:
      return name;
  }
}

export default function App() {
  const [stage, setStage] = useState('INTRO');
  const [playerName, setPlayerName] = useState('여주');
  const [inputName, setInputName] = useState('');
  const [history, setHistory] = useState([]);
  
  // Gauge Puzzle state (5-1-4)
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const navigateTo = (nextStage) => {
    setHistory((prev) => [...prev, stage]);
    setStage(nextStage);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevStage = history[history.length - 1];
      setHistory((prev) => prev.slice(0, prev.length - 1));
      setStage(prevStage);
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (inputCode.trim() === '514' || inputCode.trim() === '0514') {
      setCodeError(false);
      navigateTo('LEVER_SECTION');
    } else {
      setCodeError(true);
      setTimeout(() => setCodeError(false), 2000);
    }
  };

  const resetGame = (target = 'INTRO') => {
    setInputCode('');
    setCodeError(false);
    setHistory([]);
    setStage(target);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans flex flex-col items-center justify-start p-3 sm:p-6 select-none relative overflow-x-hidden">
      
      {/* Visual Scanline Background */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/30 via-neutral-950/90 to-black z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-25 z-0" />

      {/* Reader Header */}
      <header className="w-full max-w-2xl flex items-center justify-between p-3 mb-4 bg-neutral-900/90 border border-neutral-800 rounded-lg shadow-xl z-10 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          {stage !== 'INTRO' && stage !== 'NAME_INPUT' && (
            <button
              onClick={handleBack}
              className="flex items-center space-x-1 px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono rounded border border-neutral-700 transition mr-1"
              title="이전으로"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>뒤로</span>
            </button>
          )}
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-bold text-red-500 tracking-wider">
            POSTYPE // 아크 어드벤처
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-2xl bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 sm:p-8 shadow-2xl z-10 min-h-[620px] flex flex-col justify-between backdrop-blur-sm relative">

        {/* 1. INTRO */}
        {stage === 'INTRO' && (
          <div className="space-y-6 my-auto text-left">
            <div className="text-center space-y-2 border-b border-neutral-800 pb-6">
              <span className="text-xs font-mono text-red-500 tracking-widest uppercase">Lotte World 4F Urban Legend</span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight">
                아크 어드벤처
              </h1>
              <p className="text-xs text-neutral-400 font-mono">
                [비공식 어트랙션 지하 탈출 시뮬레이션]
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              <p>
                올라와보고 보니, 이딴 곳에 이런 놀이기구가 있었나 싶어서 신기해하며 보았던 것 같다. 
                번쩍거리는 아크 패션 간판을 들어섰다. 레일과 1인 기구라니... 
                의아한 생각과 함께 안을 구경하는 사이 철컹, 하고 닫히는 문에 저도 모르게 시선을 왼쪽으로 돌리자, 베스퍼가 해맑게 손을 흔들어주는 것에 저도 모르게 손을 흔들었다. 
              </p>
              <p className="text-center font-mono font-bold text-red-500 my-6 tracking-wide">
                레일 속은 혼자 진입합니다.
              </p>
            </div>

            <button
              onClick={() => navigateTo('NAME_INPUT')}
              className="w-full py-4 bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-100 font-mono font-bold text-sm sm:text-base rounded-lg shadow-lg transition flex items-center justify-center space-x-2"
            >
              <span>탐험 시작하기</span>
            </button>
          </div>
        )}

        {/* 2. NAME INPUT */}
        {stage === 'NAME_INPUT' && (
          <div className="space-y-6 my-auto text-center">
            <div className="space-y-2 border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold text-neutral-100 font-mono">탐험가의 이름을 입력하세요</h2>
              <p className="text-xs text-neutral-400">소설 속 주인공 이름으로 실시간 반영됩니다. (미입력 시 '여주')</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="이름 입력 (예: 지민, 서연)"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full bg-black border border-neutral-700 focus:border-red-500 rounded-lg py-3 px-4 text-center text-lg font-mono text-red-400 outline-none transition"
              />
              <button
                onClick={() => {
                  if (inputName.trim()) setPlayerName(inputName.trim());
                  navigateTo('PROLOGUE');
                }}
                className="w-full py-3.5 bg-red-950 hover:bg-red-900 border border-red-700 text-red-100 font-mono font-bold rounded-lg transition"
              >
                이름 설정 및 탑승 계속하기
              </button>
            </div>
          </div>
        )}

        {/* 3. PROLOGUE */}
        {stage === 'PROLOGUE' && (
          <div className="space-y-5 my-auto text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
            <p>
              달그락달그락거리는 소리와 함께 롤링하는 놀이기구를 따라 꼭대 마주하는 조명 사이로 벽면의 경고메세지가 눈에 들어왔다.
            </p>

            <div className="bg-red-950/40 border border-red-900 p-4 rounded-lg shadow-inner text-center space-y-2">
              <div className="flex items-center justify-center space-x-1 text-red-500 font-mono text-xs font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>⚠️ [경고 : 심리적인 환각 제어 주의]</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-red-300 leading-snug">
                본 구역(아크 어드벤처) 진입 후 발생되는 시각 및 청각 정보를 신뢰하지 마시오.
              </p>
            </div>

            <p>
              "잠깐, 뭐, 으아아아악!"
            </p>
            <p>
              그 글씨를 제대로 읽기도 전에, 반지와 빠른 속도로 움직이는 놀이기구에 {attachParticle(playerName, '가')} 허리춤에 잡힌 안전바를 꽉 잡았다. 붉은 조명이 비추는 벽면을 따라 빠르게 이동하는 놀이기구에 {attachParticle(playerName, '가')} 저도 모르게 눈을 질끈 감았다. 아니, 이거 왜 이렇게 빨라!!!!!
            </p>
            <p className="font-mono text-center text-red-400 font-bold tracking-widest my-2">
              끼이이이익-!
            </p>
            <p>
              귓가를 찢을 듯한 쇠마찰음과 함께 놀이기구가 곤두박질치듯 급강하했다. 부드러운 하강이 아니라 마치 공중에서 줄이 끊어진 엘리베이터처럼 추락하는 속도감에 장기가 위로 쏠려 올라오는 듯한 불쾌감이 덮쳤다.
            </p>
            <p>
              "꺄아아악!"
            </p>
            <p>
              바람이 얼굴을 거세게 때렸다. 눈을 살짝 떴을 때 보인 풍경은 기괴함 그 자체였다. 화려하던 천장의 조명은 어느새 붉고 칙칙한 단색등으로 바뀐 지 오래였고, 레일 양옆으로는 어둠 속에 거꾸로 매달린 인간 형태의 기괴한 조형물들이 혜성처럼 지나쳐 갔다.
            </p>
            <p className="font-mono text-center font-bold text-red-500 my-2">
              쿵, 쿵, 쿵!
            </p>
            <p>
              레일이 덜컹거릴 때마다 놀이 기구 전체가 산산조각 날 것처럼 요동쳤다. 이거 작동 오류 아니야? 이러다 죽는 거 아니야? 하는 생각이 들 때쯤에 덜커덩거리던 놀이기구가 칠흑같은 어둠 속에 진입했다.
            </p>

            <button
              onClick={() => navigateTo('GAUGE_PUZZLE')}
              className="w-full py-3.5 bg-red-950 hover:bg-red-900 border border-red-700 text-red-100 font-mono font-bold text-xs sm:text-sm rounded transition shadow-xl mt-4 text-center"
            >
              탐험을 지속하시겠습니까? <br />탐험을 지속하시려면 잠금 장치를 열어주세요.
            </button>
          </div>
        )}

        {/* 4. GAUGE PUZZLE (514) */}
        {stage === 'GAUGE_PUZZLE' && (
          <div className="space-y-6 my-auto">
            <div className="border-b border-neutral-800 pb-2 flex justify-between items-center">
              <span className="text-xs font-mono text-red-400 flex items-center gap-1">
                <Compass className="w-4 h-4" /> [계기판 자수 잠금장치]
              </span>
              <span className="text-xs font-mono text-neutral-500">PUZZLE (514)</span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              둥그런 공간에 도착해서 점점 느려지는 기구에 {attachParticle(playerName, '가')} 침을 꼴깍 삼켰다. 가늘게 위에서 떨어지는 빛 덕분에 어슴프레 제가 탄 기구가 보이기 시작했다. 낡은 기구의 계기판이 눈에 들어왔다. 동그란 숫자 세개를 눈을 가늘게 뜨고 보던 {attachParticle(playerName, '가')} 오른쪽에 난 안전바를 잡고 흔들어보았다.
            </p>

            {/* Original 3 Gauge Dashboard Image */}
            <div className="relative w-full h-44 sm:h-52 bg-black rounded-lg border border-neutral-800 overflow-hidden shadow-2xl flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80" 
                alt="3 Gauge Instruments" 
                className="w-full h-full object-cover filter brightness-75 contrast-125"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x400/0a0a0a/ef4444?text=Gauge+514";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
              <div className="absolute bottom-2 left-3 font-mono text-xs text-red-400 font-bold bg-black/80 px-2.5 py-1 rounded border border-neutral-800">
                GAUGE 1: [5] | GAUGE 2: [1] | GAUGE 3: [4]
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              덜컹거리기만 하고 열리지 않는 안전바. 너른 공터 한복판에는 '탐험을 지속하시겠습니까? 탐험을 지속하시려면 잠금 장치를 열어주세요.' 라는 메세지만 반복적으로 울릴 뿐이었다.
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              "씨.. 어떻게 하라는 거야?"
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              더듬거리면서 안전바를 더듬는데, 안전바 끝에 보이는 자그만한 버튼이 눈에 들어왔다.
            </p>

            <form onSubmit={handleCodeSubmit} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="비밀번호 3자리 입력"
                  className={`flex-1 bg-black border ${codeError ? 'border-red-600 animate-bounce' : 'border-neutral-700 focus:border-red-500'} text-center font-mono text-xl text-red-500 tracking-widest py-2.5 rounded-md outline-none transition`}
                />
                <button
                  type="submit"
                  className="px-6 bg-red-950 hover:bg-red-900 text-red-200 font-mono font-bold text-xs rounded border border-red-800 transition"
                >
                  입력
                </button>
              </div>
              {codeError && (
                <p className="text-xs font-mono text-red-500 text-center animate-pulse">
                  ⚠️ 자물쇠가 열리지 않습니다. (Hint: 계기판의 바늘 5-1-4)
                </p>
              )}
            </form>
          </div>
        )}

        {/* 5. LEVER SECTION */}
        {stage === 'LEVER_SECTION' && (
          <div className="space-y-5 my-auto">
            <div className="bg-neutral-950 border border-emerald-900/80 p-3 rounded text-center">
              <span className="font-mono text-xs sm:text-sm text-emerald-400 font-bold italic">
                정답입니다. 탐험을 지속해주세요.
              </span>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-light my-6">
              <p className="font-mono text-lg text-yellow-500/90 font-bold tracking-wider text-center">
                철 - 컹 -
              </p>
              <p>
                "열렸다!!"
              </p>
              <p>
                {attachParticle(playerName, '는')} 재빨리 안전바를 밀고 놀이기구에서 내려왔다. 안전바가 열리자마자 바닥에는 작은 LED 조명이 반짝, 하고 불이 들어왔고 동굴같은 벽면을 따라 길게 이어져있었다.
              </p>
              <p>
                통로 벽면에 설치되어 있던 비상용 철제 레버를 손으로 잡아 내려보았다.
              </p>
            </div>

            <button
              onClick={() => navigateTo('POST_PUZZLE_FORK')}
              className="w-full py-4 bg-red-950 hover:bg-red-900 border border-red-700 text-red-100 font-mono font-bold text-xs sm:text-sm rounded transition shadow-xl"
            >
              레버를 아래로 내린다.
            </button>
          </div>
        )}

        {/* 6. POST-PUZZLE FORK (LED PATH) */}
        {stage === 'POST_PUZZLE_FORK' && (
          <div className="space-y-5 my-auto">
            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-light">
              <p>
                혹시나 하는 마음에 주머니를 뒤적거려 핸드폰을 확인했지만, 여전히 먹통인 핸드폰을 보고 눈썹을 늘어트린 {attachParticle(playerName, '가')} 울며 겨자 먹기로 LED 조명을 따라 걸음을 옮겼다. 공터처럼 너른 공간은 점점 좁아져서 길게 이어지다가 어느 순간 두 갈래길로 나뉘는 것에 {attachParticle(playerName, '가')} 양 쪽을 번갈아가면서 바라봤다.
              </p>
            </div>
            {/* Direct Image Link Applied */}
            <div className="relative w-full h-52 sm:h-64 bg-black rounded-lg border border-neutral-800 overflow-hidden shadow-2xl my-2 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80" 
                alt="LED Fork Path Tunnel" 
                className="w-full h-full object-cover filter brightness-90 contrast-125"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/800x400/0a0a0a/38bdf8?text=LED+Fork+Path";
                }}
              />
              <div className="absolute bottom-2 left-3 right-3 z-20 text-[11px] font-mono bg-black/70 px-3 py-1 rounded border border-neutral-700 text-cyan-400">
                [지하 LED 점조명 두 갈래 통로]
              </div>
            </div>

            <div className="space-y-3 text-sm text-neutral-300 leading-relaxed font-light">
              <p>
                왼 쪽으로 가야할지 오른쪽으로 가야할지 도무지 결정이 서지 않아 양 갈래 길에서 갈팡질팡하던 {attachParticle(playerName, '가')} 바닥에 쪼그리고 앉았다. 무릎에 머리를 대고 한숨을 내쉬는데, 오른쪽 길에서 희미하게 사람 목소리가 들리는 것 같았다.
              </p>
              <p>
                혹시 제가 잘못 들은 것이인가 싶어서 귀를 기울이던 {attachParticle(playerName, '가')} 웅웅거리던 무릎을 펴고 오른쪽 길쪽으로 몸을 뻗었다.
              </p>
              <p className="text-zinc-400 italic font-bold font-mono text-xs sm:text-sm tracking-wide">
                {attachParticle(playerName, '아')}! 어디있어!<br />
                {attachParticle(playerName, '야')}!
              </p>
              <p>
                희미하지만 분명 창균과 민혁의 목소리인 것 같아서 {attachParticle(playerName, '가')} 입술을 깨물었다. 어디로 가는게 맞는 거지?
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  navigateTo('BAD_END_GHOST');
                }}
                className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-red-950/80 border border-neutral-800 hover:border-red-700 rounded-lg text-xs sm:text-sm font-bold text-red-200 transition text-center shadow-lg"
              >
                오른쪽 길을 선택한다
              </button>

              <button
                onClick={() => navigateTo('LEFT_PATH_CHORYEONGMOK')}
                className="w-full py-3.5 px-4 bg-neutral-950 hover:bg-red-950/80 border border-neutral-800 hover:border-red-700 rounded-lg text-xs sm:text-sm font-bold text-red-200 transition text-center shadow-lg"
              >
                왼쪽 길을 선택한다
              </button>
            </div>
          </div>
        )}

        {/* 7. BAD ENDING: RIGHT PATH */}
        {stage === 'BAD_END_GHOST' && (
          <div className="space-y-5 my-auto text-center animate-pulse">
            <div className="w-16 h-16 bg-red-950/80 border-2 border-red-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(220,38,38,0.8)]">
              <Skull className="w-8 h-8 text-red-500" />
            </div>

            <h2 className="text-2xl font-mono font-black text-red-600 tracking-wider">
              BAD ENDING : 귀신의 유혹
            </h2>

            <div className="bg-black/90 p-5 border-2 border-red-900/80 rounded-lg text-xs sm:text-sm text-neutral-200 text-left space-y-3 leading-relaxed">
              <p className="text-red-400 font-bold">
                "{attachParticle(playerName, '야')}... 드디어 찾아왔구나...!"
              </p>
              <p className="text-red-300">
                기괴하게 목이 꺾인 검은 형체의 귀신이 초령목 꽃 향기 속에서 기어 나와 당신의 팔을 강하게 낚아채 어둠 속으로 끌고 들어갔습니다.
              </p>
            </div>

            <button
              onClick={() => resetGame('POST_PUZZLE_FORK')}
              className="w-full py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-mono text-xs rounded border border-neutral-600 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" /> 두 갈래 길로 돌아가 다시 선택하기
            </button>
          </div>
        )}

        {/* 8. LEFT PATH: CHORYEONGMOK & PHONE CALL */}
        {stage === 'LEFT_PATH_CHORYEONGMOK' && (
          <div className="space-y-5 my-auto">
            <div className="border-b border-neutral-800 pb-2 flex justify-between items-center">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Phone className="w-4 h-4" /> [초령목 자생지 및 전화 통화]
              </span>
              <span className="text-xs font-mono text-neutral-500">STAGE 03</span>
            </div>

            <div className="relative w-full h-48 sm:h-56 bg-black rounded-lg border border-neutral-800 overflow-hidden shadow-2xl my-2 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80" 
                alt="Choryeongmok Flowers" 
                className="w-full h-full object-cover filter brightness-75 contrast-125"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x400/0a0a0a/34d399?text=Choryeongmok+Flowers";
                }}
              />
              <div className="absolute bottom-2 left-3 right-3 z-20 text-[11px] font-mono bg-black/70 px-3 py-1 rounded border border-neutral-700 text-emerald-400">
                [하얗게 피어난 초령목 꽃봉오리]
              </div>
            </div>

            <div className="space-y-3 text-sm text-neutral-300 leading-relaxed font-light">
              <p>
                바닥에 놓인 LED 조명을 따라 걸었다. 으스스하게 꾸며진 동굴에는 거미 모형같은 기괴한 것들이 주렁주렁 걸려있었는데, 괴상한 모형들 사이에 하얗게 피어난 꽃봉오리가 눈에 걸려 그 자리를 지나치는 내내 힐끔거리며 꽃을 쳐다봤다.
              </p>
              <p>
                "데코도 이상하고, 진짜 이 새끼들 나만 두고 어디간거야?"
              </p>
              <p>
                한참을 걸어내려온 것 같은데도 끝나지 않는 이 동굴에 눈물이 터져나올 것 같아서 {attachParticle(playerName, '가')} 입술을 말아넣었다. 운동화를 질질 끌면서 한걸음 한걸음을 옮기는데,
              </p>
              <p>"어?"</p>
              <p>
                분명 아까 봤던 그 꽃봉오리였다. 혹시 제가 잘 못 본게 아닌가 싶어서 눈까지 비벼가면서 다시 쳐다봤음에도 불구하고 아까 그것과 생김새가 전혀 다르지 않은 것 같아서 {attachParticle(playerName, '가')} 멍하니 그 자리에서 서서 꽃을 쳐다봤다.
              </p>
              <p>
                나 설마 여기 갇힌건가? 라는 생각이 들자마자 등줄기를 타고 소름이 올라오는데,
              </p><br />
              <p className="font-mono text-yellow-400 font-bold text-center">
                Rrrrrrrrr
              </p><br />
              <p>
                "엄마! 깜짝이야!"
              </p>
              <p>
                주머니에서 울리는 진동소리에 {attachParticle(playerName, '가')} 헐레벌떡 핸드폰을 꺼내들었다. 화면 가득 보이는 이민혁 세글자에 {attachParticle(playerName, '가')} 핸드폰을 귓가에 댔다.
              </p><br />
              
              <p>"야!! 너 어디야!!!"</p>
              <p>[{attachParticle(playerName, '야')} 말로 어디야? 뒤에서 따라오는 거 아니었어? 전화는 또 왜 이렇게 안 받아!!]</p>
              <p>"아니, 오빠아ㅠㅠ 나 지금 이상한데 갇혔어ㅠㅠㅠ"</p>
              <p>[너 어딘데!]</p><br />
              
              <p>
                어디냐고 묻는 목소리에 어디라고 대답하려는데, 마치 벽 너머로 민혁의 목소리가 들리는 것 같아서 {attachParticle(playerName, '가')} 고개를 두리번거렸다. 서있던 자리에서 뒤를 돌자 어디냐니까!! 하고 재촉하는 민혁의 목소리가 점점 선명하게 들리는 것 같아서 {attachParticle(playerName, '가')} 더듬더듬거리에 목소리가 들리는 곳을 따라 걸음을 옮겼다.
              </p><br />
              
              <p>"계,계속 말해봐. 오빠! 전화 끊으면 안돼!"</p>
              <p>[무슨 소리야, 너 지금 어디야? 어?]</p>
              <p>"자, 잠깐만!"</p>
            </div>

            <button
              onClick={() => navigateTo('FINAL_CHOICE')}
              className="w-full py-4 bg-red-950 hover:bg-red-900 border border-red-700 text-red-100 font-mono font-bold text-xs sm:text-sm rounded transition shadow-xl mt-4"
            >
              철문 앞 도착
            </button>
          </div>
        )}

        {/* 9. FINAL TWO OPTIONS */}
        {stage === 'FINAL_CHOICE' && (
          <div className="space-y-6 my-auto text-center py-4">
            <div className="space-y-2 border-b border-neutral-800 pb-4">
              <h3 className="text-xl font-bold text-neutral-100 font-mono">비상문 앞</h3>
              <p className="text-xs text-neutral-400">핸드폰 너머의 목소리를 믿을 수 있을까.. 벽면을 더듬자, 손잡이가 만져졌다.</p>
            </div>

            <div className="space-y-3.5 max-w-md mx-auto pt-2">
              <button
                onClick={() => navigateTo('TRUE_END')}
                className="w-full py-4 bg-neutral-900 hover:bg-emerald-950/80 border border-neutral-700 hover:border-emerald-600 text-emerald-200 font-bold rounded-xl transition shadow-lg text-center"
              >
                [ 문을 연다. ]
              </button>
              
              <button
                onClick={() => navigateTo('HIDDEN_END')}
                className="w-full py-4 bg-neutral-900 hover:bg-emerald-950/80 border border-neutral-700 hover:border-emerald-600 text-emerald-200 font-bold rounded-xl transition shadow-lg text-center"
              >
                [ 다시 한번 더 안을 탐사한다 ]
              </button>
            </div>
          </div>
        )}

        {/* 10. TRUE ENDING */}
        {stage === 'TRUE_END' && (
          <div className="space-y-6 my-auto text-center">
            <div className="w-14 h-14 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.5)]">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-mono font-black text-emerald-400 tracking-wider">
              TRUE ENDING : 환상의 탈출
            </h2>

            <div className="text-left space-y-3 text-sm text-neutral-300 leading-relaxed">
              <p>
                묵직한 철문이 끼익, 하고 열리면서 새어나오는 빛에 {attachParticle(playerName, '가')} 있는 힘껏 철문을 밀었다.
              </p>
              <p>
                "야!! 너 왜 거기서 나와?!"
              </p>
              <p>
                문 밖으로 튕겨나오듯이 밀려나온 {attachParticle(playerName, '를')} 바닥에 넘어지자마자 덜컹, 하고 철문이 잠겼다. 문 앞에 서있던 민혁과 창균이 놀란 듯 뛰어와 바닥에 널브러진 {attachParticle(playerName, '를')} 일으켜세웠다.
              </p>
              <p>"{attachParticle(playerName, '아')}, 괜찮아?"</p>
              <p>
                다정한 목소리에 고개를 들자 아까 민혁과 창균과 함께 지나왔던 파라오의 분노 싸인이 번쩍거리고 있었다. 벌떡 자리에서 일어난 {attachParticle(playerName, '가')} 뒤를 돌아 봤을때는 비상문 이라는 붉은 글씨가 씌여진 철문이 그 자리에 있었다. 당황한 창균과 민혁을 밀고 비상문을 열었을 때는, 아랫층으로 향하는 비상 계단만 그 자리에 있을 뿐이었다.
              </p>
            </div>

            <button
              onClick={() => resetGame('INTRO')}
              className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 font-mono font-bold text-sm rounded border border-emerald-600 shadow-xl transition mt-4"
            >
              처음부터 다시 읽기 [RESTART]
            </button>
          </div>
        )}

        {/* 11. HIDDEN ENDING */}
        {stage === 'HIDDEN_END' && (
          <div className="space-y-6 my-auto text-center">
            <div className="w-14 h-14 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(234,179,8,0.5)]">
              <Skull className="w-8 h-8 text-yellow-400" />
            </div>

            <h2 className="text-2xl font-mono font-black text-yellow-400 tracking-wider">
              HIDDEN ENDING : 끝없는 미궁
            </h2>

            <div className="text-left text-sm text-neutral-300 leading-relaxed">
              <p>
                문을 열지 않고 다시 어두운 동굴 안쪽으로 발걸음을 돌렸다. <br />
                초령목 꽃봉오리 향기가 진동하는 가운데, 전화가 끊어지면서 영원히 빠져나갈 수 없는 미궁 속으로 빨려 들어갔다.
              </p>
            </div>

            <button
              onClick={() => resetGame('INTRO')}
              className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-mono font-bold text-sm rounded border border-neutral-600 shadow-xl transition mt-4"
            >
              처음부터 다시 읽기 [RESTART]
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-3 border-t border-neutral-800 flex justify-between items-center text-[10px] font-mono text-neutral-500">
          <span>LOTTE WORLD URBAN LEGEND</span>
          <span>POSTYPE INTERACTIVE</span>
        </footer>
      </main>
    </div>
  );
}