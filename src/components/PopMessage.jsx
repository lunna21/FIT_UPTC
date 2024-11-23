import React, { useEffect } from 'react';

export default function PopMessage({ text, duration, onClose, color }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <aside
      className={`fixed bottom-4 left-4 z-50 flex items-center justify-center gap-4 rounded-lg px-5 py-3 text-neutral-white shadow-lg ${color}`}
    >
      <span className="text-sm font-medium">
        {text}
      </span>

      <button className="rounded bg-neutral-white/20 p-1 hover:bg-neutral-white/10" onClick={onClose}>
        <span className="sr-only">Close</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </aside>
  );
}