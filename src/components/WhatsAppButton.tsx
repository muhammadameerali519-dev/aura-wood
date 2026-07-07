import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const message = "Hello AURA WOOD FURNITURE, I'm interested in your furniture products. Please share more details, pricing, and availability.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/923234208816?text=${encodedMessage}`;

  return (
    <div id="whatsapp-floating-container" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip / Prompt bubble */}
      <div 
        id="whatsapp-tooltip"
        className="bg-neutral-900 text-stone-100 text-xs py-1.5 px-3 rounded-lg shadow-md border border-neutral-800 font-sans tracking-wide mb-1 opacity-90 transition-all duration-300 pointer-events-none hidden sm:block animate-bounce"
      >
        Chat with our furniture experts
      </div>
      
      {/* Floating Link with Pulse */}
      <a
        id="whatsapp-trigger-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:bg-emerald-500 hover:scale-105 active:scale-95 animate-pulse-slow cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400"
        title="Chat on WhatsApp"
      >
        <MessageCircle id="whatsapp-icon" className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
