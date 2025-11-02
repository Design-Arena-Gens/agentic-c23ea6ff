'use client';

interface Message {
  role: string;
  content: string;
}

interface ChatHistoryProps {
  history: Message[];
}

export default function ChatHistory({ history }: ChatHistoryProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-glow">Conversation History</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg ${
              msg.role === 'user'
                ? 'bg-jarvis-light/50 border-l-4 border-white ml-8'
                : 'bg-jarvis-blue/10 border-l-4 border-jarvis-blue mr-8'
            }`}
          >
            <p className="text-xs text-jarvis-blue/60 mb-1">
              {msg.role === 'user' ? 'You' : 'JARVIS'}
            </p>
            <p className={msg.role === 'user' ? 'text-white' : 'text-jarvis-blue'}>
              {msg.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
