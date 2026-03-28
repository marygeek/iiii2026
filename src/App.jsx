import { useMemo, useState } from 'react';
import { hexagrams } from './data/hexagrams';

function pickRandomHexagram() {
  const index = Math.floor(Math.random() * hexagrams.length);
  return hexagrams[index];
}

export default function App() {
  const [result, setResult] = useState(() => pickRandomHexagram());

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

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-zinc-900">
      <main className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-md flex-col rounded-2xl border border-zinc-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <header className="border-b border-zinc-200 px-6 py-6">
          <p className="text-xs tracking-[0.2em] text-zinc-500">YI ZHI JIN RI</p>
          <h1 className="mt-2 text-3xl font-semibold">易知今日</h1>
          <p className="mt-2 text-sm text-zinc-600">{today}</p>
        </header>

        <section className="flex-1 space-y-6 px-6 py-8">
          <div className="text-center">
            <p className="text-6xl leading-none">{result.symbol}</p>
            <p className="mt-3 text-sm text-zinc-500">第 {result.id} 卦</p>
            <h2 className="mt-1 text-2xl font-medium">{result.name}</h2>
          </div>

          <article className="space-y-4 rounded-xl border border-zinc-200 p-4 text-sm leading-7">
            <div>
              <p className="text-xs tracking-[0.18em] text-zinc-500">今日心境</p>
              <p>{result.mood}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] text-zinc-500">事業指引</p>
              <p>{result.work}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.18em] text-zinc-500">感情提醒</p>
              <p>{result.romance}</p>
            </div>
          </article>

          <button
            type="button"
            onClick={() => setResult(pickRandomHexagram())}
            className="w-full rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black active:translate-y-px"
          >
            重新卜一卦
          </button>

          <p className="text-center text-xs leading-6 text-zinc-500">
            本結果僅供日常反思與自我覺察，請以理性判斷做最終決定。
          </p>
        </section>
      </main>
    </div>
  );
}
