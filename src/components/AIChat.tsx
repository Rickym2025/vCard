import { useState, useEffect } from "react";

export function AIChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("Chiedimi cosa posso fare per te...");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    let id = localStorage.getItem('vcard_session_id');
    if (!id) {
      id = 'sess_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('vcard_session_id', id);
    }
    setSessionId(id);
  }, []);

  const handleSendMessage = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const currentInput = input;
      setInput("");
      setResponse("L'AI sta analizzando...");

      try {
        const res = await fetch('https://n8n.labottegadeldelta.it/webhook/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ domanda: currentInput, sessionId: sessionId })
        });
        console.log("Stato risposta:", res.status); // Guarda la console di F12
        const data = await res.json();
        setResponse(data.risposta || "Nessuna risposta dal server.");
      } catch (err) {
        setResponse("Errore di connessione al server AI.");
      }
    }
  };

  return (
    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-xl mt-6 text-left">
      <h3 className="text-purple-400 font-bold mb-2 text-xs uppercase tracking-widest">AI Agent</h3>
      <div className="text-zinc-300 mb-4 min-h-[50px]">{response}</div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleSendMessage}
        placeholder="Scrivi qui e premi invio..."
        className="w-full bg-black border border-zinc-700 p-3 rounded-xl text-white outline-none focus:border-purple-500 transition-all"
      />
    </div>
  );
}