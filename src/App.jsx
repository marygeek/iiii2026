import { useEffect, useMemo, useRef, useState } from 'react';
import { hexagrams } from './data/hexagrams';

function pickRandomHexagram() {
  const index = Math.floor(Math.random() * hexagrams.length);
  return hexagrams[index];
}

const revealKeys = ['header', 'mood', 'work', 'romance'];

export default function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [revealed, setRevealed] = useState({
    header: false,
    mood: false,
    work: false,
    romance: false,
  });
  const timersRef = useRef([]);

  const today = useMemo(
    () =>
      new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      }).format(new Date()),
    [],
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  };

  const drawHexagram = () => {
    clearTimers();
    setIsLoading(true);
    setResult(null);
    setRevealed({ header: false, mood: false, work: false, romance: false });

    const loadingTimer = setTimeout(() => {
      const nextResult = pickRandomHexagram();
      setResult(nextResult);
      setIsLoading(false);

      revealKeys.forEach((key, index) => {
        const revealTimer = setTimeout(() => {
          setRevealed((prev) => ({ ...prev, [key]: true }));
        }, 300 * (index + 1));

        timersRef.current.push(revealTimer);
      });
    }, 1800);

    timersRef.current.push(loadingTimer);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-zinc-900">
      <main className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col rounded-2xl border border-zinc-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <header className="border-b border-zinc-200 px-6 py-6">
          <p className="text-xs tracking-[0.2em] text-zinc-500">ZHI CANG YI WEN</p>
          <h1 className="mt-2 text-3xl font-semibold">知滄易問</h1>
          <p className="mt-2 text-sm text-zinc-600">{today}</p>
        </header>

        <section className="flex-1 px-6 py-8">
          {!isLoading && !result && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm leading-7 text-zinc-600">
                靜心三息，按下按鈕開始今日占問。
              </p>
              <button
                type="button"
                onClick={drawHexagram}
                className="mt-8 w-full rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black active:translate-y-px"
              >
                開始占算
              </button>
            </div>
          )}

          {isLoading && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <span className="absolute h-24 w-24 animate-spin rounded-full border border-zinc-700 border-t-transparent" />
                <span className="text-5xl leading-none">☯</span>
              </div>
              <p className="mt-6 text-sm tracking-[0.18em] text-zinc-500">卜卦推演中…</p>
              <p className="mt-2 text-xs text-zinc-400">請稍候，卦象即將顯現</p>
            </div>
          )}

          {!isLoading && result && (
            <div className="space-y-6">
              <div
                className={`text-center transition-all duration-700 ${
                  revealed.header ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
              >
                <p className="text-6xl leading-none">{result.symbol}</p>
                <p className="mt-3 text-sm text-zinc-500">第 {result.id} 卦</p>
                <h2 className="mt-1 text-2xl font-medium">{result.name}</h2>
              </div>

              <article className="space-y-4 rounded-xl border border-zinc-200 p-4 text-sm leading-7">
                <div
                  className={`transition-all duration-700 ${
                    revealed.mood ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`}
                >
                  <p className="text-xs tracking-[0.18em] text-zinc-500">今日心境</p>
                  <p>{result.mood}</p>
                </div>
                <div
                  className={`transition-all duration-700 ${
                    revealed.work ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`}
                >
                  <p className="text-xs tracking-[0.18em] text-zinc-500">事業指引</p>
                  <p>{result.work}</p>
                </div>
                <div
                  className={`transition-all duration-700 ${
                    revealed.romance ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                  }`}
                >
                  <p className="text-xs tracking-[0.18em] text-zinc-500">感情提醒</p>
                  <p>{result.romance}</p>
                </div>
              </article>

              <button
                type="button"
                onClick={drawHexagram}
                className="w-full rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black active:translate-y-px"
              >
                再占一卦
              </button>

              <p className="text-center text-xs leading-6 text-zinc-500">
                本結果僅供日常反思與自我覺察，請以理性判斷做最終決定。
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
