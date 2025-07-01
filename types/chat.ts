export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  text?: string;
  error?: string;
}

export interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface StreamChunk {
  text: string;
}