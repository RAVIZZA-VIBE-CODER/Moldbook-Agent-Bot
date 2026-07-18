import { useState } from "react";
import { Bot, CheckCircle2, ShieldCheck } from "lucide-react";
import MoltbookAgentApp from "./components/MoltbookAgentApp";

type NotifyType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type: NotifyType;
};

const App = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  const notify = (message: string, type: NotifyType = "info") => {
    const next = { id: Date.now(), message, type };
    setToast(next);
    window.setTimeout(() => {
      setToast((current) => (current?.id === next.id ? null : current));
    }, 3600);
  };

  return (
    <main className="min-h-screen bg-[#160704] px-3 py-5 text-zinc-100">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-[430px] flex-col overflow-hidden rounded-[2.1rem] border border-orange-500/25 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.72)]">
        <header className="shrink-0 border-b border-orange-500/20 bg-[#070707] px-5 pb-4 pt-5">
          <div className="mx-auto mb-4 h-1.5 w-24 rounded-full bg-zinc-800" />
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.34em] text-orange-400">
                Public Demo
              </p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-white">Moldbook Agent Bot</h1>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-300">
              <Bot className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-100">
            <ShieldCheck className="h-4 w-4" />
            Demo-safe package: no private account, token, queue, endpoint, or contact data.
          </div>
        </header>

        {toast && (
          <div className="mx-4 mt-3 flex shrink-0 items-start gap-2 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm shadow-lg">
            <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${toast.type === "error" ? "text-red-400" : toast.type === "success" ? "text-emerald-300" : "text-orange-300"}`} />
            <span className="leading-5 text-zinc-200">{toast.message}</span>
          </div>
        )}

        <MoltbookAgentApp onNotify={notify} />
      </div>
    </main>
  );
};

export default App;
