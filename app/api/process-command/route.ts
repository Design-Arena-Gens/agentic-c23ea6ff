import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { command } = await request.json();

    // Process command with AI-like responses
    let response = processCommand(command.toLowerCase());

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process command' },
      { status: 500 }
    );
  }
}

function processCommand(command: string): string {
  // Calculator commands
  if (command.includes('calculator') || command.includes('calculate')) {
    return 'Opening calculator application. Ready for calculations, sir.';
  }

  // Music commands
  if (command.includes('music') || command.includes('play') || command.includes('song')) {
    return 'Accessing music library. What would you like to listen to?';
  }

  // Timer commands
  if (command.includes('timer') || command.includes('alarm')) {
    const match = command.match(/(\d+)\s*(minute|second|hour)/);
    if (match) {
      return `Timer set for ${match[1]} ${match[2]}s. I'll notify you when it's done.`;
    }
    return 'Timer application ready. How long would you like me to set it for?';
  }

  // Weather commands
  if (command.includes('weather') || command.includes('temperature')) {
    return 'Accessing weather data. Current conditions are partly cloudy at 72°F. Would you like a detailed forecast?';
  }

  // Game commands
  if (command.includes('game') || command.includes('play')) {
    return 'Game center activated. I have several games available: Strategy, Puzzle, and Action. Which would you prefer?';
  }

  // Notes commands
  if (command.includes('note') || command.includes('write') || command.includes('remember')) {
    return 'Notes application ready. I\'m listening for what you\'d like me to record.';
  }

  // System status
  if (command.includes('status') || command.includes('system')) {
    return 'All systems operational. CPU at 23%, Memory at 47%, Network connection stable.';
  }

  // Settings
  if (command.includes('setting') || command.includes('configure')) {
    return 'Settings panel accessed. What would you like to modify?';
  }

  // Browser
  if (command.includes('browser') || command.includes('internet') || command.includes('search')) {
    return 'Opening web browser. What would you like to search for?';
  }

  // Jokes
  if (command.includes('joke') || command.includes('funny')) {
    const jokes = [
      'Why don\'t scientists trust atoms? Because they make up everything!',
      'I told my computer I needed a break, and now it won\'t stop sending me Kit-Kat ads.',
      'Why did the programmer quit his job? He didn\'t get arrays.',
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Time
  if (command.includes('time') || command.includes('clock')) {
    return `The current time is ${new Date().toLocaleTimeString()}.`;
  }

  // Date
  if (command.includes('date') || command.includes('today')) {
    return `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
  }

  // Greetings
  if (command.includes('hello') || command.includes('hi ') || command.includes('hey')) {
    return 'Hello! How may I assist you today?';
  }

  if (command.includes('good morning')) {
    return 'Good morning! I hope you have a productive day ahead.';
  }

  if (command.includes('good night')) {
    return 'Good night! Rest well, I\'ll be here when you need me.';
  }

  // Help
  if (command.includes('help') || command.includes('what can you do')) {
    return 'I can help you with calculations, play music, set timers, check weather, open applications, and much more. Just tell me what you need!';
  }

  // Thank you
  if (command.includes('thank')) {
    return 'You\'re welcome! Always happy to help.';
  }

  // Default response
  return `I understand you said "${command}". Processing your request. How else may I assist you?`;
}
