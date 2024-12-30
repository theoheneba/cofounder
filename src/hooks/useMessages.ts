import { useState } from 'react';
import type { Conversation } from '../types';

export function useMessages() {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversations] = useState<Conversation[]>([]);

  return {
    conversations,
    activeConversation,
    setActiveConversation,
  };
}