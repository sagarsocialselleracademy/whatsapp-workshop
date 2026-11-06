import React, { useEffect, useState, useRef } from 'react';

// Official Contact & Target Event Settings
const WHATSAPP_NUMBER = '918370044449';
const EVENT_TARGET_ISO = '2026-11-15T10:30:00+05:30';

// Live Countdown Hook matching aischoolraipur format
function useCountdown(targetIsoDate: string) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    label: string;
    compactLabel: string;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    label: 'Starts soon',
    compactLabel: '00d : 00h : 00m',
    isPast: false,
  });

  useEffect(() => {
    function updateTimer() {
      const target = new Date(targetIsoDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          label: 'Workshop has begun!',
          compactLabel: 'Live now',
          isPast: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const dStr = String(days).padStart(2, '0');
      const hStr = String(hours).padStart(2, '0');
      const mStr = String(minutes).padStart(2, '0');
      const sStr = String(seconds).padStart(2, '0');

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        label: `Starts in ${dStr}d : ${hStr}h : ${mStr}m : ${sStr}s`,
        compactLabel: `${dStr}d : ${hStr}h : ${mStr}m`,
        isPast: false,
      });
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetIsoDate]);

  return timeLeft;
}

// SVG Icons matching aischoolraipur 1-to-1
function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function SparkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PinIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function AlertIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function TagIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function ChevronDownIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowUpIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function VerifiedTickIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#25D366" />
      <path d="M7.5 12L10.5 15L16.5 9" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" />
    </svg>
  );
}

function DoubleCheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#53BDEB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 13 8 18 19 7" />
      <path d="M8 13l4.5 4.5 9.5-9.5" />
    </svg>
  );
}

function QuestionChatIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.13 8.13 0 0 1-1.25-4.29c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.61 2.4 5.8 0 4.52-3.68 8.15-8.16 8.15zm4.49-6.13c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
    </svg>
  );
}

// Custom SVG Graphics for the 9 Workshop Topics
function GraphicMetaCloud() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <path d="M30 42C27 42 24 39.5 24 36C24 33 26 30.5 29 30.1C30 25.5 34 22 39 22C43.5 22 47 24.5 48.5 28C49.5 27.5 51 27 52.5 27C56.5 27 60 30 60 34C62.5 34.5 64 36.5 64 39C64 42 61.5 44 58.5 44H30" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="58" y="24" width="28" height="28" rx="8" fill="#10B981" />
      <path d="M66 38L70 42L78 34" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="50" width="36" height="6" rx="3" fill="#BBF7D0" />
    </svg>
  );
}

function GraphicChatbot247() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <rect x="34" y="22" width="32" height="26" rx="8" fill="#059669" />
      <line x1="50" y1="16" x2="50" y2="22" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="15" r="3" fill="#22C55E" />
      <circle cx="43" cy="33" r="3" fill="#FFFFFF" />
      <circle cx="57" cy="33" r="3" fill="#FFFFFF" />
      <circle cx="43" cy="33" r="1.5" fill="#065F46" />
      <circle cx="57" cy="33" r="1.5" fill="#065F46" />
      <path d="M46 41C48 43 52 43 54 41" stroke="#DCFCE7" strokeWidth="2" strokeLinecap="round" />
      <rect x="68" y="14" width="24" height="15" rx="5" fill="#25D366" />
      <text x="80" y="25" textAnchor="middle" fill="#0B141A" fontSize="8" fontWeight="800" fontFamily="sans-serif">24/7</text>
      <circle cx="16" cy="20" r="4" fill="#22C55E" />
      <circle cx="16" cy="20" r="7" stroke="#22C55E" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function GraphicChatbotBuilding() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <rect x="14" y="18" width="28" height="13" rx="4" fill="#059669" />
      <rect x="18" y="22" width="20" height="4" rx="2" fill="#DCFCE7" />
      <path d="M42 24H58V34H66" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 24V47H66" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      <rect x="66" y="28" width="24" height="12" rx="4" fill="#10B981" />
      <rect x="69" y="32" width="16" height="3" rx="1.5" fill="#FFFFFF" />
      <rect x="66" y="42" width="24" height="12" rx="4" fill="#25D366" />
      <rect x="69" y="46" width="16" height="3" rx="1.5" fill="#0B141A" />
      <circle cx="46" cy="24" r="3" fill="#F59E0B" />
    </svg>
  );
}

function GraphicBroadcast() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <path d="M20 38V30C20 28.5 21.5 27 23 27H28L42 19V49L28 41H23C21.5 41 20 39.5 20 38Z" fill="#059669" />
      <path d="M24 41V49C24 51 26 52 28 52C30 52 31 51 31 49V41" stroke="#047857" strokeWidth="2" strokeLinecap="round" />
      <path d="M48 27C52 30 52 38 48 41" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 22C60 27 60 41 54 46" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 17C68 24 68 44 60 51" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <rect x="64" y="14" width="26" height="14" rx="4" fill="#F59E0B" />
      <text x="77" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800" fontFamily="sans-serif">98%</text>
    </svg>
  );
}

function GraphicPaymentsCRM() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <rect x="18" y="18" width="24" height="38" rx="4" fill="#059669" />
      <rect x="22" y="24" width="16" height="18" rx="2" fill="#FFFFFF" />
      <rect x="24" y="26" width="5" height="5" fill="#0B141A" />
      <rect x="31" y="26" width="5" height="5" fill="#0B141A" />
      <rect x="24" y="33" width="5" height="5" fill="#0B141A" />
      <rect x="31" y="33" width="5" height="5" fill="#25D366" />
      <path d="M46 34H56" stroke="#10B981" strokeWidth="2" strokeDasharray="2 2" />
      <path d="M53 30L57 34L53 38" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="60" y="22" width="26" height="9" rx="3" fill="#10B981" />
      <rect x="60" y="33" width="26" height="9" rx="3" fill="#25D366" />
      <rect x="60" y="44" width="26" height="9" rx="3" fill="#059669" />
      <circle cx="65" cy="26" r="1.5" fill="#FFFFFF" />
      <circle cx="65" cy="37" r="1.5" fill="#0B141A" />
      <circle cx="65" cy="48" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

function GraphicLeadsManagement() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <rect x="14" y="16" width="20" height="40" rx="4" fill="#E2E8F0" />
      <rect x="40" y="16" width="20" height="40" rx="4" fill="#BBF7D0" />
      <rect x="66" y="16" width="20" height="40" rx="4" fill="#86EFAC" />
      <rect x="16" y="20" width="16" height="10" rx="2" fill="#FFFFFF" />
      <rect x="16" y="33" width="16" height="10" rx="2" fill="#FFFFFF" />
      <rect x="42" y="20" width="16" height="12" rx="2" fill="#FFFFFF" />
      <circle cx="54" cy="26" r="2" fill="#F59E0B" />
      <rect x="68" y="20" width="16" height="14" rx="2" fill="#059669" />
      <path d="M72 27L75 30L80 24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GraphicFollowUp() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <circle cx="24" cy="36" r="10" fill="#059669" />
      <text x="24" y="39" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif">1h</text>
      <path d="M34 36H46" stroke="#10B981" strokeWidth="2" strokeDasharray="2 2" />
      <circle cx="52" cy="36" r="10" fill="#10B981" />
      <text x="52" y="39" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="800" fontFamily="sans-serif">24h</text>
      <path d="M62 36H74" stroke="#10B981" strokeWidth="2" strokeDasharray="2 2" />
      <circle cx="80" cy="36" r="10" fill="#25D366" />
      <text x="80" y="39" textAnchor="middle" fill="#0B141A" fontSize="9" fontWeight="800" fontFamily="sans-serif">3d</text>
      <circle cx="52" cy="18" r="5" fill="#F59E0B" />
      <path d="M52 15V18L54 20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function GraphicLeadQualifier() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <path d="M22 18H78L58 40V54L42 50V40L22 18Z" fill="#059669" opacity="0.9" />
      <ellipse cx="50" cy="18" rx="28" ry="4" fill="#10B981" />
      <ellipse cx="50" cy="27" rx="18" ry="3" fill="#34D399" />
      <ellipse cx="50" cy="37" rx="10" ry="2" fill="#6EE7B7" />
      <circle cx="50" cy="56" r="8" fill="#F59E0B" />
      <path d="M50 51L51.5 54.5L55 55L52.5 57.5L53 61L50 59L47 61L47.5 57.5L45 55L48.5 54.5L50 51Z" fill="#FFFFFF" />
    </svg>
  );
}

function GraphicAIAgent() {
  return (
    <svg width="100" height="72" viewBox="0 0 100 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="88" height="56" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
      <circle cx="50" cy="34" r="14" fill="#059669" />
      <path d="M42 34C42 29 46 25 50 25C54 25 58 29 58 34C58 39 54 43 50 43C46 43 42 39 42 34Z" stroke="#34D399" strokeWidth="2" />
      <circle cx="26" cy="24" r="4" fill="#25D366" />
      <line x1="29" y1="26" x2="39" y2="30" stroke="#10B981" strokeWidth="1.5" />
      <circle cx="74" cy="24" r="4" fill="#25D366" />
      <line x1="71" y1="26" x2="61" y2="30" stroke="#10B981" strokeWidth="1.5" />
      <circle cx="30" cy="48" r="4" fill="#10B981" />
      <line x1="33" y1="46" x2="41" y2="39" stroke="#10B981" strokeWidth="1.5" />
      <circle cx="70" cy="48" r="4" fill="#10B981" />
      <line x1="67" y1="46" x2="59" y2="39" stroke="#10B981" strokeWidth="1.5" />
      <path d="M50 28L51.5 32.5L56 34L51.5 35.5L50 40L48.5 35.5L44 34L48.5 32.5L50 28Z" fill="#FFFFFF" />
    </svg>
  );
}

// 9 Practical Topics Covered in the Workshop (No Modules, No Subpointers)
const WORKSHOP_TOPICS = [
  {
    title: '1. Meta Cloud API & Ban Proof Setup',
    Graphic: GraphicMetaCloud,
  },
  {
    title: '2. 24/7 Leads & Sales Chatbot Setup',
    Graphic: GraphicChatbot247,
  },
  {
    title: '3. Chatbot Building',
    Graphic: GraphicChatbotBuilding,
  },
  {
    title: '4. High-Converting Broadcast Campaigns',
    Graphic: GraphicBroadcast,
  },
  {
    title: '5. Payments & CRM Automation',
    Graphic: GraphicPaymentsCRM,
  },
  {
    title: '6. Leads Management',
    Graphic: GraphicLeadsManagement,
  },
  {
    title: '7. Follow Up Setup',
    Graphic: GraphicFollowUp,
  },
  {
    title: '8. Lead Qualifyer',
    Graphic: GraphicLeadQualifier,
  },
  {
    title: '9. AI Agent Setup',
    Graphic: GraphicAIAgent,
  },
];

// Before vs After Comparison Data (Punchy Bullet Points Only)
const BEFORE_AFTER_ITEMS = [
  {
    before: 'Manual Typing & Long Response Delays',
    after: 'Instant 24/7 AI-Powered Replies',
  },
  {
    before: 'Constant Number Bans & Panicked SIM Changes',
    after: '100% Ban-Proof Official Meta Cloud API',
  },
  {
    before: 'Ignored Broadcasts & Low Delivery Rates',
    after: '98% Open-Rate High-Converting Broadcasts',
  },
  {
    before: 'Chaotic Chats & Lost Follow-Ups',
    after: 'Automated Drip Follow-Ups & Pipeline CRM',
  },
  {
    before: 'Wasting Hours on Casual Window Shoppers',
    after: 'Automated Lead Screening & Lead Qualifier',
  },
  {
    before: 'Manual UPI Screenshot Chasing & Reconciling',
    after: 'One-Click In-Chat UPI & Auto-Invoicing',
  },
];

// Interactive WhatsApp AI Simulator Data
interface ChatMsg {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  cta?: {
    label: string;
    url: string;
  };
}

const INITIAL_CHAT_MESSAGES: ChatMsg[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: '👋 Namaste! Welcome to *Social Seller Academy* by Lakshit Sethiya.',
    time: '10:30 AM',
  },
  {
    id: 'msg-2',
    sender: 'bot',
    text: 'I am your 24/7 AI WhatsApp Assistant. Tap any question below or type your own question to test our real-time AI response speed! ⚡',
    time: '10:30 AM',
  },
];

const QUICK_PROMPTS = [
  '📅 Date, Venue & Timing?',
  '💰 What is the Ticket Price?',
  '🤖 What will I learn in the Workshop?',
  '🛡️ Will my number get banned?',
  '💬 Is there a Doubt Session?',
  '🎟️ How do I register?',
];

function formatWhatsAppText(text: string) {
  // Support *bold* markdown tags in simulated WhatsApp bubbles
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <strong key={index}>{part.slice(1, -1)}</strong>;
    }
    return part;
  });
}

// Testimonials Data
const TESTIMONIALS = [
  {
    name: 'Attendee 1',
    image: '/media/1434f4ca4ccf3676b9a0f36e0ae82577854f11d0.bin',
    video: '/media/77a609b4dbbfa6f8aa32a6df3c82a0c505d8aa1d.bin',
  },
  {
    name: 'Attendee 2',
    image: '/media/d842cf0108ff20dc3c2bf0a4051716d915e75aac.bin',
    video: '/media/2ff24f7ba276866641d0be29820afd010ef40f7f.bin',
  },
  {
    name: 'Attendee 3',
    image: '/media/1240d205e7cfd62bf485f704126c0b8fe4187826.bin',
    video: '/media/9841a049251b1c1b1c4499bf0a8a0ee3d8bde7cd.bin',
  },
  {
    name: 'Attendee 4',
    image: '/media/bdc6cd4178db5b587ccee2d28978aad93a6b7966.bin',
    video: '/media/5e871ca6dd38263d53552fb445218ce675810a0f.bin',
  },
];

// FAQ Data
const FAQS = [
  {
    id: 'faq-1',
    q: 'When and where is the WhatsApp Workshop taking place?',
    a: 'The workshop is taking place on Sunday, 15th November from 10:30 AM to 02:00 PM physically at Aarambh, Raipur, Chhattisgarh (Includes hands-on implementation + dedicated live Doubt Session).',
  },
  {
    id: 'faq-2',
    q: 'Will there be a dedicated Doubt Clearing Session?',
    a: 'Yes, absolutely! The workshop timing is 10:30 AM to 02:00 PM. A dedicated Doubt Session is included where Lakshit Sethiya will personally answer your specific business automation queries and setup doubts 1-on-1. Morning high-tea & networking refreshments are also provided.',
  },
  {
    id: 'faq-3',
    q: 'What is the ticket price and offer discount?',
    a: 'The original ticket price is ₹2,999. Under the Raipur special early registration offer, you can reserve your seat for just ₹1,999 only (Save ₹1,000 / 33% OFF). Seats are strictly limited to maintain quality.',
  },
  {
    id: 'faq-4',
    q: 'Do I need technical or coding knowledge to attend?',
    a: 'No coding knowledge is required. Everything taught is visual, practical, and step-by-step using no-code automation tools and the official Meta WhatsApp API interface.',
  },
  {
    id: 'faq-5',
    q: 'Will my WhatsApp phone number get banned?',
    a: 'No! We specifically teach the official, 100% Meta Cloud API authorized methods that comply with WhatsApp terms of service. You will never risk losing your business number.',
  },
  {
    id: 'faq-6',
    q: 'Do I need to bring a laptop?',
    a: 'Bringing a laptop is recommended if you would like to follow along and configure your Meta WhatsApp Cloud API account live with Lakshit during the workshop.',
  },
  {
    id: 'faq-7',
    q: 'How will I receive confirmation after booking?',
    a: 'Once you submit your registration or confirm via WhatsApp, our team will instantly verify your payment, assign your seat number, and email you your official workshop entry pass with venue directions.',
  },
];

export function WhatsappWorkshopPage() {
  const countdown = useCountdown(EVENT_TARGET_ISO);
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');
  const [activeClip, setActiveClip] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Direct WhatsApp Registration Link with Pre-filled Message
  const directWhatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Lakshit, I want to register for the WhatsApp Marketing & Automation Workshop in Raipur on 15th November (Sunday, 10:30 AM to 02:00 PM with Doubt Session at Aarambh, Raipur) at the Offer Price of ₹1,999. Please confirm my seat.'
  )}`;

  // Interactive Live AI Chat Simulator State (Social Seller Academy)
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(INITIAL_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToChatBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToChatBottom();
  }, [chatMessages, isBotTyping]);

  const handleSendChatMessage = (textToSend?: string) => {
    const raw = (textToSend !== undefined ? textToSend : chatInput).trim();
    if (!raw) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: raw,
      time: timeStr,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const lower = raw.toLowerCase();
      let replyText = '';
      let replyCta: { label: string; url: string } | undefined;

      if (
        lower.includes('date') ||
        lower.includes('venue') ||
        lower.includes('where') ||
        lower.includes('when') ||
        lower.includes('timing') ||
        lower.includes('location') ||
        lower.includes('address')
      ) {
        replyText =
          '📍 *Workshop Schedule & Venue:*\n• *Date:* Sunday, 15th November\n• *Time:* 10:30 AM to 02:00 PM (Includes Doubt Session!)\n• *Venue:* Aarambh, Raipur, Chhattisgarh.\n\nOnly 14 offline seats left for this session!';
        replyCta = { label: 'Book on WhatsApp (₹1,999) →', url: directWhatsappLink };
      } else if (
        lower.includes('price') ||
        lower.includes('fee') ||
        lower.includes('cost') ||
        lower.includes('offer') ||
        lower.includes('discount') ||
        lower.includes('₹') ||
        lower.includes('how much')
      ) {
        replyText =
          '💰 *Ticket Pricing:*\n• Original Price: ₹2,999\n• 🔥 *Raipur Special Offer: ₹1,999 Only* (33% OFF / Save ₹1,000!)\n\nIncludes hands-on training, 15+ chatbot templates, 1-on-1 Doubt Session & networking high-tea!';
        replyCta = { label: 'Claim Offer ₹1,999 on WhatsApp →', url: directWhatsappLink };
      } else if (
        lower.includes('learn') ||
        lower.includes('agenda') ||
        lower.includes('curriculum') ||
        lower.includes('topic') ||
        lower.includes('syllabus') ||
        lower.includes('what will') ||
        lower.includes('teach')
      ) {
        replyText =
          '🚀 *What You Will Master Live:*\n1. Meta Cloud API (100% Ban-Proof Setup)\n2. 24/7 Automated Leads & Sales Chatbot\n3. No-Code Visual Flow Canvas\n4. 98% Open-Rate Broadcast Campaigns\n5. Payments & CRM Sync (Razorpay + Sheets)\n6. Leads Pipeline & Auto Follow-Up (Drip)\n7. Lead Qualifier & Custom AI Agents\n8. Dedicated Doubt Clearing Session!';
        replyCta = { label: 'Register on WhatsApp (₹1,999) →', url: directWhatsappLink };
      } else if (
        lower.includes('ban') ||
        lower.includes('block') ||
        lower.includes('safe') ||
        lower.includes('risk') ||
        lower.includes('number')
      ) {
        replyText =
          '🛡️ *100% Ban-Proof Official Setup:*\nWe do not use illegal bulk software or risky Chrome extensions. You will be setup on official Meta WhatsApp Cloud API directly with Meta Business Manager, fully compliant with WhatsApp terms!';
      } else if (
        lower.includes('doubt') ||
        lower.includes('question') ||
        lower.includes('q&a') ||
        lower.includes('lunch') ||
        lower.includes('food') ||
        lower.includes('tea') ||
        lower.includes('refreshment')
      ) {
        replyText =
          '💬 *Timing & Dedicated Doubt Session:*\nThe workshop runs from 10:30 AM to 02:00 PM. A dedicated Doubt Session is included where Lakshit Sethiya personally answers your business automation queries 1-on-1! Morning high-tea & networking refreshments are also provided.';
      } else if (
        lower.includes('register') ||
        lower.includes('book') ||
        lower.includes('seat') ||
        lower.includes('join') ||
        lower.includes('pass')
      ) {
        replyText =
          '🎉 *Instant Registration:*\nYou can confirm your seat directly with Lakshit Sethiya on WhatsApp for just ₹1,999!';
        replyCta = { label: 'Confirm on WhatsApp (₹1,999) →', url: directWhatsappLink };
      } else if (
        lower.includes('lakshit') ||
        lower.includes('who') ||
        lower.includes('trainer') ||
        lower.includes('speaker') ||
        lower.includes('academy') ||
        lower.includes('social seller')
      ) {
        replyText =
          '👨‍🏫 *About Social Seller Academy:*\nFounded by Lakshit Sethiya, honored by the Chief Minister of Chhattisgarh. We have trained 2,000+ businesses across India in practical AI & WhatsApp automation.';
      } else {
        replyText = `✨ That's a great question! During our live workshop at Aarambh Raipur (10:30 AM to 02:00 PM with Doubt Session), Lakshit Sethiya will help you configure this exact 24/7 AI response system for your own business.\n\nWould you like to reserve one of the 14 remaining seats?`;
        replyCta = { label: 'Reserve on WhatsApp (₹1,999) →', url: directWhatsappLink };
      }

      const botMsg: ChatMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cta: replyCta,
      };

      setChatMessages((prev) => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 700);
  };

  useEffect(() => {
    document.title =
      'WhatsApp Marketing And Automation Workshop In Raipur | 15th Nov Sunday (10:30 AM to 02:00 PM)';
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="public-shell">
      {/* =========================================================================
          1. TOPBAR: EXACT STRUCTURE AS AISCHOOLRAIPUR.COM BUT IN WHATSAPP GREEN
          ========================================================================= */}
      <aside className="topbar">
        <div className="topbar__timer" aria-live="polite">
          <ClockIcon />
          <span className="topbar__countdown topbar__countdown--full">
            {countdown.label}
          </span>
          <span className="topbar__countdown topbar__countdown--compact">
            {countdown.compactLabel}
          </span>
        </div>
        <div className="topbar__meta">
          <span className="topbar__seats">14 seats left</span>
          <a
            className="topbar__cta"
            href={directWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now <ArrowRightIcon />
          </a>
        </div>
      </aside>

      {/* =========================================================================
          2. BRAND HEADER: CENTERED TRANSPARENT LOGO
          ========================================================================= */}
      <header className="brand">
        <img
          src="/logo.png"
          alt="Lakshit Sethiya Workshops Raipur"
          className="brand__img"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </header>

      {/* =========================================================================
          3. HERO SECTION: 1-TO-1 COPY OF AISCHOOLRAIPUR HERO WITH WHATSAPP DETAILS
          ========================================================================= */}
      <section className="hero container center" id="workshop">
        {/* Eyebrow Pill */}
        <div className="badge-pill">
          <SparkIcon />
          <span>2000+ people attended in Raipur</span>
        </div>

        {/* Hero Heading with WhatsApp Green Highlight */}
        <h1 className="heading heading--hero">
          <span className="heading-line">WhatsApp Marketing And</span>
          <em className="heading-line">Automation Workshop</em>
          <span className="heading-line">In Raipur</span>
        </h1>

        {/* Event Pills Row */}
        <div className="pill-row">
          <span className="event-pill">
            <CalendarIcon />
            <span>15th November Sunday</span>
          </span>
          <span className="event-pill">
            <ClockIcon />
            <span>10:30AM TO 02:00 PM</span>
          </span>
          <span className="event-pill">
            <PinIcon />
            <span>Aarambh, Raipur</span>
          </span>
          <span className="event-pill event-pill--doubt">
            <QuestionChatIcon />
            <span>Doubt Session Included</span>
          </span>
        </div>

        {/* Center Hero Video Frame */}
        <div className="hero-video">
          <div className="video-frame">
            <video
              src="/videos/whatsapp-workshop-video.mp4"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/media/hero-poster.webp"
            />
          </div>
        </div>

        {/* Lede Description */}
        <p className="lede lede--hero">
          A 3-Hour live physical workshop by Lakshit Sethiya at Aarambh, Raipur,
          where you'll discover how to scale your business using WhatsApp marketing &amp;
          automation.
        </p>

        {/* Scarcity Seats Remaining */}
        <p className="seats">Only 14 seats remaining. Register now!</p>

        {/* Price Pill: Rs. 2999 original vs Rs. 1999 offer */}
        <div className="price-pill">
          <TagIcon />
          <s>₹2999</s>
          <span>Price ₹1999 only</span>
        </div>

        {/* Primary CTA Button */}
        <div className="hero-cta">
          <a
            href={directWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Claim Offer for ₹1,999 →
          </a>
        </div>
      </section>

      {/* =========================================================================
          4. ICON FEATURES: 4 STAT TILES
          ========================================================================= */}
      <section className="section section--tight-end container">
        <div className="icon-row">
          <div className="icon-tile">
            <span className="icon-number">
              1,000,000<span className="icon-suffix">+</span>
            </span>
            <span className="icon-label">Followers Across Platforms</span>
          </div>
          <div className="icon-tile">
            <span className="icon-number">
              25,000<span className="icon-suffix">+</span>
            </span>
            <span className="icon-label">Students &amp; Entrepreneurs Trained</span>
          </div>
          <div className="icon-tile">
            <span className="icon-number">
              10<span className="icon-suffix">+ Years</span>
            </span>
            <span className="icon-label">Digital Marketing Experience</span>
          </div>
          <div className="icon-tile">
            <span className="icon-number">
              100<span className="icon-suffix">+</span>
            </span>
            <span className="icon-label">Offline Workshops Conducted</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. INSTRUCTOR SECTION
          ========================================================================= */}
      <section className="section instructor container center" id="instructor">
        <p className="eyebrow">YOUR INSTRUCTOR</p>
        <div className="instructor-card">
          <img
            src="/lakshit-portrait.jpg"
            alt="Lakshit Sethiya"
            loading="lazy"
            decoding="async"
          />
          <div className="instructor-meta">
            <p className="eyebrow" style={{ color: 'var(--green-deep)' }}>
              Founder &amp; Mentor
            </p>
            <h2>Lakshit Sethiya</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
              WhatsApp Automation &amp; Growth Strategist
            </p>
          </div>
        </div>

        <p className="eyebrow speaker-label">SPEAKER AT</p>
        <div className="logo-row">
          <div className="logo-badge">
            <img src="/speakes-at/iim-nagpur.png" alt="IIM Nagpur" />
            <p>IIM Nagpur</p>
          </div>
          <div className="logo-badge">
            <img src="/speakes-at/iit-indore.png" alt="IIT Indore" />
            <p>IIT Indore</p>
          </div>
          <div className="logo-badge">
            <img src="/speakes-at/jito.png" alt="JITO" />
            <p>JITO</p>
          </div>
          <div className="logo-badge">
            <img src="/speakes-at/jci.png" alt="JCI" />
            <p>JCI</p>
          </div>
          <div className="logo-badge">
            <img src="/speakes-at/itm-university.png" alt="ITM" />
            <p>ITM University</p>
          </div>
          <div className="logo-badge">
            <img src="/speakes-at/ccci.png" alt="Chamber of Commerce" />
            <p>Chamber of Commerce</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. ATTENDEE VIDEO TESTIMONIALS (REAL PEOPLE. REAL FEEDBACK.)
          ========================================================================= */}
      <section className="section section--tight-end container center" id="testimonials">
        <p className="eyebrow">WORKSHOP ATTENDEES SHARE THEIR EXPERIENCE</p>
        <h2 className="heading">
          Real people. <em>Real feedback.</em>
        </h2>
        <p className="lede">
          These are actual business owners and entrepreneurs who attended our Raipur
          workshops — hear it in their own words.
        </p>

        {/* Video Cards Grid */}
        <div className="people-row">
          {TESTIMONIALS.map((item, index) => {
            const clipKey = `clip-${index}`;
            const isPlaying = activeClip === clipKey;

            return (
              <div key={clipKey} className="person-card">
                {isPlaying ? (
                  <video
                    src={item.video}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <button
                    className="person-play"
                    type="button"
                    onClick={() => setActiveClip(clipKey)}
                    aria-label={`Play feedback video ${index + 1}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="play-badge">▶</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Featured Video Frame */}
        <div
          className="video-frame video-frame--wide"
          style={{ marginTop: '1.25rem' }}
        >
          {activeClip === 'featured' ? (
            <video
              src="/media/hero-intro.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <img
                src="/media/cbdc6004a1938decb1073560ba53eca52b8d75db.bin"
                alt="Featured workshop feedback"
                loading="lazy"
                decoding="async"
              />
              <button
                className="video-play-hit"
                type="button"
                onClick={() => setActiveClip('featured')}
                aria-label="Play featured testimonial"
              >
                <span className="play-badge play-badge--lg">▶</span>
              </button>
            </>
          )}
        </div>

        <p className="seats">Only 14 seats remaining. Register now!</p>
        <div className="hero-cta">
          <a
            href={directWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Register Now →
          </a>
        </div>
      </section>

      {/* =========================================================================
          7. WORKSHOP TOPICS: WHAT YOU WILL LEARN & IMPLEMENT LIVE
          ========================================================================= */}
      <section className="section container center" id="tracks">
        <div className="badge-pill" style={{ marginBottom: '0.85rem' }}>
          <SparkIcon />
          <span>WORKSHOP AGENDA • 10:30 AM TO 02:00 PM</span>
        </div>
        <h2 className="heading">
          What You Will Learn &amp; <em>Implement Live</em>
        </h2>
        <p className="lede">
          From zero technical knowledge to a fully automated WhatsApp sales machine
          for your Raipur business. Includes hands-on implementation + dedicated Doubt Session.
        </p>

        {/* 9 Workshop Topic Cards (Graphics + Heading Points Only) */}
        <div className="grid-tracks">
          {WORKSHOP_TOPICS.map((topic) => {
            const GraphicComp = topic.Graphic;
            return (
              <article key={topic.title} className="track-card">
                <div className="track-graphic-stage">
                  <GraphicComp />
                </div>
                <h3>{topic.title}</h3>
              </article>
            );
          })}
        </div>

        {/* And many things will be taught Banner */}
        <div className="curriculum-bonus-banner">
          <div className="curriculum-bonus-text">
            <h4>✨ And Many More Things Will Be Taught Live:</h4>
            <p>
              • Meta Click-to-WhatsApp Ad Funnels • Official Green Tick Verification Blueprint • 15+ Copy-Paste Chatbot Templates • Number Warm-Up Protocols • Live 1-on-1 Troubleshooting with Lakshit Sethiya
            </p>
          </div>
          <a
            href={directWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
            style={{ minWidth: '220px', padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
          >
            Register for ₹1,999 →
          </a>
        </div>
      </section>

      {/* =========================================================================
          6B. BEFORE VS AFTER COMPARISON (THE TRANSFORMATION)
          ========================================================================= */}
      <section className="section container center" id="before-after">
        <div className="badge-pill" style={{ marginBottom: '0.85rem' }}>
          <SparkIcon />
          <span>THE TRANSFORMATION</span>
        </div>
        <h2 className="heading">
          Your Business <em>Before vs. After</em> WhatsApp Automation
        </h2>
        <p className="lede">
          See the dramatic shift in speed, sales conversions, and freedom when you replace manual chaos with official Meta WhatsApp automation.
        </p>

        <div className="comparison-grid">
          {/* BEFORE CARD */}
          <div className="compare-card compare-card--before">
            <span className="compare-badge compare-badge--before">
              <CrossIcon /> WITHOUT AUTOMATION (OLD WAY)
            </span>
            <h3>Before Attending the Workshop</h3>
            <ul className="compare-list">
              {BEFORE_AFTER_ITEMS.map((item, i) => (
                <li key={i} className="compare-item">
                  <span className="compare-icon compare-icon--before">✕</span>
                  <span className="compare-text">{item.before}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER CARD */}
          <div className="compare-card compare-card--after">
            <span className="compare-badge compare-badge--after">
              <CheckIcon /> WITH OFFICIAL AUTOMATION (THE NEW WAY)
            </span>
            <h3>After Implementing in Your Business</h3>
            <ul className="compare-list">
              {BEFORE_AFTER_ITEMS.map((item, i) => (
                <li key={i} className="compare-item">
                  <span className="compare-icon compare-icon--after">✓</span>
                  <span className="compare-text">{item.after}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM CALLOUT STRIP */}
        <div className="compare-bottom-banner">
          <p>
            🚀 Implement this entire transformation on Sunday, 15th November (10:30 AM to 02:00 PM with Doubt Session) at Aarambh, Raipur.
          </p>
          <a
            href={directWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
            style={{ minWidth: '220px', padding: '0.85rem 1.6rem', fontSize: '0.95rem' }}
          >
            Claim Your Seat for ₹1,999 →
          </a>
        </div>
      </section>

      {/* =========================================================================
          6C. LIVE WHATSAPP AI AGENT DEMO (SOCIAL SELLER ACADEMY)
          ========================================================================= */}
      <section className="section container center wa-simulator-section" id="live-ai-agent">
        <div className="badge-pill" style={{ marginBottom: '0.85rem' }}>
          <SparkIcon />
          <span>INTERACTIVE LIVE DEMO • TRY IT YOURSELF</span>
        </div>
        <h2 className="heading">
          Test the <em>Live WhatsApp AI Agent</em> in Real-Time
        </h2>
        <p className="lede">
          Experience firsthand how <strong>Social Seller Academy</strong>'s automated AI agent responds to customer inquiries 24/7 in <strong>under 2 seconds</strong>. Tap any quick question below or type your own custom query!
        </p>

        {/* MOCKUP FRAME */}
        <div className="wa-phone-mockup">
          {/* MOCKUP HEADER */}
          <div className="wa-mockup-header">
            <div className="wa-profile-info">
              <div className="wa-avatar-wrap">
                <img
                  src="/lakshit-portrait.jpg"
                  alt="Social Seller Academy"
                  className="wa-avatar-img"
                />
                <span className="wa-online-dot" />
              </div>
              <div className="wa-profile-details">
                <div className="wa-profile-title">
                  <span>Social Seller Academy</span>
                  <span className="wa-verified-badge" title="Official Meta Verified Business">
                    <VerifiedTickIcon />
                  </span>
                </div>
                <p className="wa-profile-status">
                  {isBotTyping ? (
                    <span style={{ color: '#86efac', fontWeight: 600 }}>typing...</span>
                  ) : (
                    '● Online | Official AI Assistant'
                  )}
                </p>
              </div>
            </div>

            <div className="wa-header-actions">
              <span className="wa-badge-live">LIVE PREVIEW</span>
            </div>
          </div>

          {/* MOCKUP CHAT AREA */}
          <div className="wa-mockup-body">
            <div className="wa-date-pill">TODAY</div>
            <div className="wa-encrypt-notice">
              🔒 <strong>Official Meta Cloud API Live Demo:</strong> Messages are simulated with the exact conversational AI logic taught in the Raipur workshop.
            </div>

            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`wa-bubble-row ${
                  msg.sender === 'user' ? 'wa-bubble-row--user' : 'wa-bubble-row--bot'
                }`}
              >
                <div
                  className={`wa-bubble ${
                    msg.sender === 'user' ? 'wa-bubble--user' : 'wa-bubble--bot'
                  }`}
                >
                  <div className="wa-bubble-text">{formatWhatsAppText(msg.text)}</div>

                  {msg.cta && (
                    <a href={msg.cta.url} className="wa-bubble-cta">
                      {msg.cta.label}
                    </a>
                  )}

                  <div className="wa-bubble-meta">
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <DoubleCheckIcon />}
                  </div>
                </div>
              </div>
            ))}

            {isBotTyping && (
              <div className="wa-bubble-row wa-bubble-row--bot">
                <div className="wa-typing-indicator">
                  <span className="wa-dot" />
                  <span className="wa-dot" />
                  <span className="wa-dot" />
                  <span style={{ marginLeft: '4px' }}>Social Seller Academy is typing...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* QUICK PROMPTS CHIPS */}
          <div className="wa-quick-prompts-tray">
            <span className="wa-prompts-label">Try asking:</span>
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="wa-prompt-chip"
                onClick={() => handleSendChatMessage(prompt)}
                disabled={isBotTyping}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* INPUT FORM BAR */}
          <form
            className="wa-mockup-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChatMessage();
            }}
          >
            <input
              type="text"
              className="wa-input-field"
              placeholder="Type a message to Social Seller Academy..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isBotTyping}
            />
            <button
              type="submit"
              className="wa-send-btn"
              aria-label="Send message"
              disabled={!chatInput.trim() || isBotTyping}
            >
              <SendIcon />
            </button>
          </form>
        </div>

        {/* BOTTOM HELPER NOTE */}
        <p className="wa-demo-caption">
          ⚡ <strong>Want this 24/7 AI Sales Machine for your business?</strong> You will build, configure, and connect this live during the 3-hour masterclass on 15th Nov!
        </p>
      </section>

      {/* =========================================================================
          8. MID-PAGE CTA BLOCK
          ========================================================================= */}
      <section className="section container">
        <div className="cta-card">
          <p className="eyebrow" style={{ color: 'var(--green-deep)' }}>
            LIMITED SEATING CAPACITY
          </p>
          <h2 className="heading">
            See you on <em>15th November</em>
          </h2>
          <p className="lede" style={{ marginLeft: 0 }}>
            Reserve your seat for the physical live session at Aarambh, Raipur.
            Seats are strictly capped to ensure personal interaction.
          </p>
          <p className="seats">14 seats remaining. Register today.</p>
          <div className="price-pill" style={{ marginBottom: '1.25rem' }}>
            <TagIcon />
            <s>₹2999</s>
            <span>Price ₹1999 only</span>
          </div>
          <a
            href={directWhatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Register Now →
          </a>
        </div>
      </section>

      {/* =========================================================================
          9. AUDIENCE SECTION: THIS IS FOR YOU IF
          ========================================================================= */}
      <section className="section container">
        <div className="audience-box">
          <div className="audience-copy">
            <p className="eyebrow">THIS IS FOR YOU IF</p>
            <h2 className="heading" style={{ fontSize: '2.4rem' }}>
              You want 5X more inquiries &amp; sales.
            </h2>
            <p className="lede" style={{ marginLeft: 0 }}>
              This is built for business owners in Raipur who want to install automated
              WhatsApp funnels into their business immediately.
            </p>
          </div>
          <div className="check-grid">
            <div className="check-item">
              <CheckIcon />
              <span>Founders growing 6 to 8-figure businesses</span>
            </div>
            <div className="check-item">
              <CheckIcon />
              <span>Retail shop, showroom &amp; restaurant owners in Raipur</span>
            </div>
            <div className="check-item">
              <CheckIcon />
              <span>Real estate developers &amp; brokers</span>
            </div>
            <div className="check-item">
              <CheckIcon />
              <span>D2C e-commerce brands &amp; wholesalers</span>
            </div>
            <div className="check-item">
              <CheckIcon />
              <span>Marketing agencies &amp; service providers</span>
            </div>
            <div className="check-item">
              <CheckIcon />
              <span>Coaches, consultants &amp; educators</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. PHOTO GALLERY: MOMENTS WITH LAKSHIT
          ========================================================================= */}
      <section className="section container" id="gallery">
        <div className="center">
          <p className="eyebrow">ON STAGE &amp; BEYOND</p>
          <h2 className="heading">
            Moments with <em>Lakshit</em>
          </h2>
        </div>

        {/* WORKSHOP PLACE */}
        <div className="rule-title">WORKSHOP PLACE</div>
        <div className="gallery-grid landscape">
          <img
            src="/moments-with-lakshit/sharing-stage/img3.png"
            alt="Speaking on stage at workshop"
            style={{ aspectRatio: '16 / 10' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/sharing-stage/img2.png"
            alt="Seated with workshop attendees"
            style={{ aspectRatio: '16 / 10' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/workshop-place/img3.png"
            alt="Conference hall stage"
            style={{ aspectRatio: '16 / 10' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/workshop-place/img4.png"
            alt="Live audience event"
            style={{ aspectRatio: '16 / 10' }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* KEYNOTE SPEAKER & SHARING STAGE */}
        <div className="rule-title">KEYNOTE SPEAKER &amp; SHARING STAGE</div>
        <div className="gallery-grid portrait">
          <img
            src="/moments-with-lakshit/speaker/credai-banm-keynote.jpg"
            alt="Keynote speaker at CREDAI-BANM Real Estate Summit"
            style={{ aspectRatio: '3 / 4', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/speaker/stage-keynote-interview.jpg"
            alt="Lakshit Sethiya live keynote session"
            style={{ aspectRatio: '3 / 4', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/speaker/with-vaibhav-sisinty.jpg"
            alt="Lakshit Sethiya with GrowthSchool founder Vaibhav Sisinty"
            style={{ aspectRatio: '3 / 4', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/speaker/bbm-conference-summit.jpg"
            alt="Keynote address at BBM Business Summit 2025"
            style={{ aspectRatio: '3 / 4', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/workshop-place/img2.png"
            alt="Speaking with microphone at podium"
            style={{ aspectRatio: '3 / 4', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/sharing-stage/img5.png"
            alt="Live panel session on stage"
            style={{ aspectRatio: '3 / 4', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/sharing-stage/img6.png"
            alt="BBM stage moment"
            style={{ aspectRatio: '3 / 4', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/achievements-and-awards/img5.png"
            alt="Stage meetup"
            style={{ aspectRatio: '3 / 4', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* OFFLINE WORKSHOPS & TRAINING */}
        <div className="rule-title">OFFLINE WORKSHOPS &amp; TRAINING</div>
        <div className="gallery-grid square">
          <img
            src="/moments-with-lakshit/offline-workshops-and-training/img1.png"
            alt="Classroom group"
            style={{ aspectRatio: '4 / 3' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/offline-workshops-and-training/img2.png"
            alt="Training cohort"
            style={{ aspectRatio: '4 / 3' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/offline-workshops-and-training/img3.png"
            alt="Auditorium group"
            style={{ aspectRatio: '4 / 3' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/offline-workshops-and-training/img4.png"
            alt="Office workshop"
            style={{ aspectRatio: '4 / 3' }}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* AWARDED BY CHIEF MINISTER OF CHHATTISGARH */}
        <div className="rule-title">AWARDED BY CHIEF MINISTER OF CHHATTISGARH</div>
        <div className="award-showcase-wrap">
          <img
            src="/moments-with-lakshit/awarded-by-chiefminister-of-chhattisgarh.png"
            alt="Honoured by Chief Minister of Chhattisgarh"
            className="award-showcase-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* ACHIEVEMENTS & AWARDS */}
        <div className="rule-title">ACHIEVEMENTS &amp; AWARDS</div>
        <div className="gallery-grid triple">
          <img
            src="/moments-with-lakshit/speaker/trophy-ceremony-full.jpg"
            alt="Trophy ceremony felicitation"
            style={{ aspectRatio: '4 / 3', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/achievements-and-awards/img2.png"
            alt="YouTube Creator Award"
            style={{ aspectRatio: '4 / 3', objectPosition: 'center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/achievements-and-awards/img4.png"
            alt="Startup Award"
            style={{ aspectRatio: '4 / 3', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/achievements-and-awards/img3.png"
            alt="Connect Marketplace Award"
            style={{ aspectRatio: '4 / 3', objectPosition: 'center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/sharing-stage/img1.png"
            alt="Grand Felicitation on stage"
            style={{ aspectRatio: '4 / 3', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
          <img
            src="/moments-with-lakshit/sharing-stage/img4.png"
            alt="Stage recognition"
            style={{ aspectRatio: '4 / 3', objectPosition: 'top center' }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* =========================================================================
          11. MEET OUR TEAM
          ========================================================================= */}
      <section className="section container">
        <div className="rule-title">MEET OUR TEAM</div>
        <div className="grid-2 team-grid">
          <div className="team-frame">
            <img
              src="/moments-with-lakshit/meet-our-team/img1.png"
              alt="Team in office"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="team-frame">
            <img
              src="/moments-with-lakshit/meet-our-team/img2.png"
              alt="Classroom team"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. MEDIA COVERAGE
          ========================================================================= */}
      <section className="section container center">
        <p className="eyebrow">AS FEATURED IN</p>
        <h2 className="heading">
          Media <em>Coverage</em>
        </h2>
        <p className="lede">
          Recognised across leading regional newspapers and state publications.
        </p>
        <div className="clip-mosaic">
          <div className="clip-card">
            <img
              src="/media-coverage/img1.png"
              alt="Hari Bhoomi newspaper coverage of Lakshit Sethiya workshop"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="clip-card">
            <img
              src="/media-coverage/img2.png"
              alt="Dainik Bhaskar newspaper coverage of Lakshit Sethiya workshop"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. WHATSAPP FEEDBACK
          ========================================================================= */}
      <section className="section container center">
        <p className="eyebrow">STRAIGHT FROM ATTENDEES</p>
        <h2 className="heading">
          WhatsApp <em>feedback</em>
        </h2>
        <p className="lede">
          Unfiltered messages from attendees days after attending the workshop.
        </p>
        <div className="phones" style={{ marginTop: '1.5rem' }}>
          <div className="phone">
            <img
              src="/whatsapp-feedback/img1.png"
              alt="WhatsApp feedback from Naman Lodha"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="phone">
            <img
              src="/whatsapp-feedback/img2.png"
              alt="WhatsApp feedback from Anurag Jain"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="phone">
            <img
              src="/whatsapp-feedback/img3.png"
              alt="WhatsApp feedback from Ruchi Jain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          14. FAQ SECTION (ACCORDION)
          ========================================================================= */}
      <section className="section container center" id="faq">
        <p className="eyebrow">FAQ</p>
        <h2 className="heading">Common questions</h2>
        <div className="faq-list">
          {FAQS.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-block ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-item"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                >
                  <span>{faq.q}</span>
                  <span className="faq-chevron">
                    <ChevronDownIcon />
                  </span>
                </button>
                {isOpen ? <p className="faq-answer">{faq.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          16. PUBLIC FOOTER
          ========================================================================= */}
      <footer className="public-footer-wrap">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img
                src="/logo.png"
                alt="Lakshit Sethiya"
                className="footer-logo"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <p className="footer-desc">
                Raipur's premier WhatsApp Marketing &amp; Automation masterclass by Lakshit
                Sethiya. Helping businesses turn WhatsApp into an automated revenue engine.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.75rem',
                  color: 'var(--green)',
                }}
              >
                <WhatsAppIcon />
                <span style={{ fontWeight: 600 }}>Official Helpline: +91 83700 44449</span>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-group">
                <h3>Workshop Details</h3>
                <ul>
                  <li>
                    <span>Date: 15th November Sunday</span>
                  </li>
                  <li>
                    <span>Time: 10:30 AM - 02:00 PM</span>
                  </li>
                  <li>
                    <span>Venue: Aarambh, Raipur</span>
                  </li>
                  <li>
                    <span>Includes: Dedicated Doubt Clearing Session</span>
                  </li>
                  <li>
                    <span>Offer Price: ₹1,999 (Regular ₹2,999)</span>
                  </li>
                </ul>
              </div>

              <div className="footer-group">
                <h3>Quick Navigation</h3>
                <ul>
                  <li>
                    <a href="#workshop">Workshop Overview</a>
                  </li>
                  <li>
                    <a href="#instructor">Instructor</a>
                  </li>
                  <li>
                    <a href="#tracks">Workshop Topics</a>
                  </li>
                  <li>
                    <a href="#before-after">Before vs After</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                  <li>
                    <a href={directWhatsappLink} target="_blank" rel="noopener noreferrer">
                      Register on WhatsApp
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Lakshit Sethiya &amp; Social Seller Academy. All rights reserved.</p>
            <p className="footer-tagline">
              Crafted for Growth • Raipur, Chhattisgarh, India
            </p>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          17. FLOATING ELEMENTS: SCROLL TO TOP & WHATSAPP QUICK CHAT
          ========================================================================= */}
      {showScrollTop && (
        <button
          className="scroll-top"
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUpIcon />
        </button>
      )}

      {/* Floating WhatsApp Action Pill */}
      <a
        href={directWhatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Lakshit's Team on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 18px',
          background: 'linear-gradient(135deg, #25d366 0%, #059669 100%)',
          color: '#ffffff',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '0.85rem',
          textDecoration: 'none',
          boxShadow: '0 8px 30px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <WhatsAppIcon />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}
