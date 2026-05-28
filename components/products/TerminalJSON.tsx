export default function TerminalJSON() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Terminal window chrome */}
      <div className="rounded-xl overflow-hidden border border-brand-border bg-[#0d1117] shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-brand-surface/80 border-b border-brand-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/60" />
          </div>
          <span className="text-text-muted text-2xs font-mono ml-2">txa-transaction.json</span>
        </div>

        {/* Code content */}
        <div className="p-5 font-mono text-xs leading-relaxed overflow-hidden">
          <pre className="whitespace-pre-wrap break-all">
            <code>
              <span className="text-gray-500">{`{`}</span>
              {"\n"}
              <span className="text-gray-500">  </span>
              <span className="text-[#79c0ff]">{`"txa_id"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#a5d6ff]">{`"TXA_2026_05_14_001"`}</span>
              <span className="text-gray-500">,</span>
              {"\n"}
              <span className="text-gray-500">  </span>
              <span className="text-[#79c0ff]">{`"account_id"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#a5d6ff]">{`"ACC_CN_8837291"`}</span>
              <span className="text-gray-500">,</span>
              {"\n"}
              <span className="text-gray-500">  </span>
              <span className="text-[#79c0ff]">{`"txn_type"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#a5d6ff]">{`"PURCHASE"`}</span>
              <span className="text-gray-500">,</span>
              {"\n"}
              <span className="text-gray-500">  </span>
              <span className="text-[#79c0ff]">{`"amount"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#d2a8ff]">{`{`}</span>
              {"\n"}
              <span className="text-gray-500">      </span>
              <span className="text-[#79c0ff]">{`"value"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#ffa657]">12580.00</span>
              <span className="text-gray-500">,</span>
              {"\n"}
              <span className="text-gray-500">      </span>
              <span className="text-[#79c0ff]">{`"currency"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#a5d6ff]">{`"CNY"`}</span>
              <span className="text-gray-500">,</span>
              {"\n"}
              <span className="text-gray-500">      </span>
              <span className="text-[#79c0ff]">{`"rate"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#ffa657]">1.0</span>
              {"\n"}
              <span className="text-gray-500">  </span>
              <span className="text-[#d2a8ff]">{`}`}</span>
              <span className="text-gray-500">,</span>
              {"\n"}
              <span className="text-gray-500">  </span>
              <span className="text-[#79c0ff]">{`"pricing_tiers"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#d2a8ff]">{`[`}</span>
              {"\n"}
              <span className="text-gray-500">      </span>
              <span className="text-[#ffa657]">0.0035</span>
              <span className="text-gray-500">, </span>
              <span className="text-[#ffa657]">0.0028</span>
              <span className="text-gray-500">, </span>
              <span className="text-[#ffa657]">0.0015</span>
              {"\n"}
              <span className="text-gray-500">  </span>
              <span className="text-[#d2a8ff]">{`]`}</span>
              <span className="text-gray-500">,</span>
              {"\n"}
              <span className="text-gray-500">  </span>
              <span className="text-[#79c0ff]">{`"timestamp"`}</span>
              <span className="text-gray-500">: </span>
              <span className="text-[#a5d6ff]">{`"2026-05-14T10:32:41.000Z"`}</span>
              {"\n"}
              <span className="text-gray-500">{`}`}</span>
            </code>
          </pre>
        </div>

        {/* Blinking cursor */}
        <div className="px-5 pb-4">
          <span className="inline-block w-2 h-4 bg-cyan-500/70 animate-pulse" />
        </div>
      </div>

      {/* Bottom reflection */}
      <div className="absolute -bottom-4 left-4 right-4 h-8 bg-cyan-500/3 blur-xl rounded-full" />
    </div>
  );
}
