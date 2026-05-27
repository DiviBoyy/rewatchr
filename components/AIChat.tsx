"use client";

import { FormEvent, useState } from "react";
import { WatchItem } from "@/lib/mockAnime";
import { mockRewatchrAI } from "@/lib/mockRewatchrAI";

export function AIChat({ watchlist }: { watchlist: WatchItem[] }) {
  const [open, setOpen] = useState(false);
  const [soon, setSoon] = useState(false);
  const [question, setQuestion] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    mockRewatchrAI(question, watchlist);
    setSoon(true);
  }

  return (
    <>
      <section className="section ai-preview" id="ai">
        <div>
          <span className="eyebrow">Mock AI Coming Soon !</span>
          <h2>Ask your anime taste engine</h2>
          <p>Rewatchr AI will help with recommendations, comparisons, rewatch picks, and anime mood suggestions.</p>
          <button className="primary" type="button" onClick={() => setOpen(true)}>Open Rewatchr AI</button>
        </div>
        <div className="prompt-list">
          <div><b>Black Clover or Bleach?</b><span>Compares vibe, pacing, tone, and your darker-action ratings.</span></div>
          <div><b>What should I rewatch?</b><span>Ranks anime you rated highly or marked rewatch-worthy.</span></div>
          <div><b>Give me anime like Death Note but darker.</b><span>Returns darker psychological picks with pacing warnings.</span></div>
        </div>
      </section>

      <button className="ai-float" type="button" onClick={() => setOpen(true)}>AI</button>
      {open ? (
        <div className="chat-box">
          <div className={soon ? "chat-blur" : "chat-content"}>
            <div className="chat-head">Rewatchr AI <button type="button" onClick={() => setOpen(false)}>Close</button></div>
            <div className="chat-body">Yo, I&apos;m Rewatchr AI. Ask me what to watch, compare anime, or find your next rewatch.</div>
            <form className="chat-form" onSubmit={submit}>
              <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask something..." />
              <button type="submit">Send</button>
            </form>
          </div>
          {soon ? <div className="soon-overlay"><div>Coming Soon !</div><button type="button" onClick={() => { setSoon(false); setOpen(false); }}>Back</button></div> : null}
        </div>
      ) : null}
    </>
  );
}
