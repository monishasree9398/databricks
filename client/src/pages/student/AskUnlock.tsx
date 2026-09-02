import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext.js';
import { useAskUnlockAI } from '../../api/client.js';
import { ChatMessage } from '../../types/index.js';
import { ChatMessageItem } from '../../components/chat/ChatMessageItem.js';
import { QuickPrompts } from '../../components/chat/QuickPrompts.js';
import { Card } from '../../components/common/Card.js';
import { Send, Sparkles, RefreshCw } from 'lucide-react';

export const AskUnlock: React.FC = () => {
  const { activeStudentId, activeStudent } = useApp();
  const askMutation = useAskUnlockAI(activeStudentId);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Hello ${activeStudent?.name.split(' ')[0] || 'there'}. I am UNLOCK AI, connected to your digital twin model. Ask me about readiness gaps, interview prep, or how closing skills boosts your score.`,
      timestamp: new Date().toISOString(),
      highlightedSkills: ['Telemetry', 'Inference', 'FastAPI'],
      percentages: [
        { label: 'Readiness', value: activeStudent?.readinessScore || 78 },
      ],
      recommendationCards: [
        {
          id: 'rec-init-1',
          title: 'Inspect Target Blocker',
          description: 'Explore CUDA gaps for OpenAI and Anthropic.',
          impactLabel: 'Critical',
          effortLabel: '2 min',
          actionText: 'Inspect Gaps',
          actionType: 'navigate_skillgap'
        }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, askMutation.isPending]);

  const handleSend = (queryToSend?: string) => {
    const query = queryToSend || inputQuery;
    if (!query.trim() || askMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');

    askMutation.mutate({ query }, {
      onSuccess: (replyMessage) => {
        setMessages(prev => [...prev, replyMessage]);
      },
      onError: () => {
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'Unable to process query against digital twin telemetry. Please retry.',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-5 flex flex-col h-[calc(100vh-5rem)] bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-brand-orange border border-orange-200 font-mono">
              DIGITAL TWIN ASSISTANT
            </span>
            <span className="text-xs text-slate-500 font-mono">{activeStudent?.targetRole}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
            Ask UNLOCK AI
          </h1>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-xl bg-white text-slate-400 hover:text-slate-700 border border-slate-200 shadow-sm transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Container */}
      <Card className="flex-1 p-5 overflow-y-auto space-y-4 flex flex-col">
        <div className="flex-1 space-y-4">
          {messages.map(msg => (
            <ChatMessageItem key={msg.id} message={msg} />
          ))}

          {askMutation.isPending && (
            <div className="flex items-center gap-2 text-xs text-brand-orange font-mono animate-pulse p-3 bg-orange-50 rounded-xl border border-orange-200 max-w-xs">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Synthesizing digital twin telemetry...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="pt-3 border-t border-slate-100">
          <QuickPrompts onSelect={(p: string) => handleSend(p)} />
        </div>
      </Card>

      {/* Input Box */}
      <div className="relative">
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask UNLOCK anything about readiness, skills, or interview prep..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange transition-colors shadow-sm"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputQuery.trim() || askMutation.isPending}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-orange hover:bg-brand-orangeHover text-white transition-all disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
