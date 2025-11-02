'use client';

interface CommandPanelProps {
  onCommandClick: (command: string) => void;
}

const commands = [
  { text: 'Open calculator', icon: '🔢' },
  { text: 'Play music', icon: '🎵' },
  { text: 'Start timer for 5 minutes', icon: '⏲️' },
  { text: 'Tell me a joke', icon: '😄' },
  { text: 'What\'s the weather?', icon: '🌤️' },
  { text: 'Open notepad', icon: '📝' },
  { text: 'Start game', icon: '🎮' },
  { text: 'System status', icon: '📊' },
];

export default function CommandPanel({ onCommandClick }: CommandPanelProps) {
  return (
    <div className="glass-effect rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-glow">Quick Commands</h2>
      <div className="space-y-2">
        {commands.map((cmd, idx) => (
          <button
            key={idx}
            onClick={() => onCommandClick(cmd.text)}
            className="w-full text-left p-3 rounded-lg command-item glass-effect hover:border-jarvis-blue border border-transparent"
          >
            <span className="text-2xl mr-3">{cmd.icon}</span>
            <span className="text-jarvis-blue">{cmd.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
