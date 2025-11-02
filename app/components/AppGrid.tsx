'use client';

interface AppGridProps {
  onAppClick: (command: string) => void;
}

const apps = [
  { name: 'Calculator', icon: '🔢', command: 'Open calculator app' },
  { name: 'Music Player', icon: '🎵', command: 'Open music player' },
  { name: 'Games', icon: '🎮', command: 'Show me games' },
  { name: 'Notes', icon: '📝', command: 'Open notes application' },
  { name: 'Weather', icon: '🌤️', command: 'Show weather information' },
  { name: 'Timer', icon: '⏲️', command: 'Open timer' },
  { name: 'Settings', icon: '⚙️', command: 'Open settings' },
  { name: 'Browser', icon: '🌐', command: 'Open web browser' },
];

export default function AppGrid({ onAppClick }: AppGridProps) {
  return (
    <div className="glass-effect rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-glow">Applications</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {apps.map((app, idx) => (
          <button
            key={idx}
            onClick={() => onAppClick(app.command)}
            className="glass-effect rounded-xl p-6 hover:border-jarvis-blue border border-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-jarvis-blue/30"
          >
            <div className="text-5xl mb-3">{app.icon}</div>
            <div className="text-jarvis-blue font-semibold">{app.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
