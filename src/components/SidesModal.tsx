'use client';

import { useState } from 'react';
import { menuSections, MenuItem } from '@/lib/menu-data';

export interface SelectedSide {
  id: string;
  name: string;
}

interface SidesModalProps {
  item: MenuItem;
  onConfirm: (sides: SelectedSide[]) => void;
  onClose: () => void;
}

const REQUIRED = 2;

export default function SidesModal({ item, onConfirm, onClose }: SidesModalProps) {
  const [selected, setSelected] = useState<SelectedSide[]>([]);
  const allSides = menuSections.find((s) => s.id === 'sides')?.items ?? [];

  function toggle(side: { id: string; name: string }) {
    if (selected.some((s) => s.id === side.id)) {
      setSelected((prev) => prev.filter((s) => s.id !== side.id));
    } else if (selected.length < REQUIRED) {
      setSelected((prev) => [...prev, { id: side.id, name: side.name }]);
    }
  }

  const canConfirm = selected.length === REQUIRED;

  function statusText() {
    if (selected.length === 0) return 'Select 2 sides to continue';
    if (selected.length === 1) return `${selected[0].name} · choose 1 more`;
    return `${selected[0].name} & ${selected[1].name}`;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.82)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`Add ${item.name} to order`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[86vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden border border-[#2E2E2E] shadow-2xl"
        style={{ backgroundColor: '#1A1A1A' }}>

        {/* ── MOBILE HEADER ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] flex-shrink-0 sm:hidden">
          <h2 className="font-display text-lg font-bold text-white leading-tight truncate pr-3">{item.name}</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-[#9CA3AF]/50 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── BODY: two-panel on desktop, stacked on mobile ── */}
        <div className="flex flex-col sm:flex-row flex-1 min-h-0">

          {/* LEFT PANEL — image + item info */}
          <div className="sm:w-[42%] flex-shrink-0 flex flex-col sm:border-r border-[#2A2A2A]">

            {/* Image area */}
            <div className="relative h-44 sm:h-64 flex-shrink-0 flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(160deg, #141414 0%, #1e1e1e 50%, #141414 100%)' }}>
              {/* Ember glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(232,101,26,0.18) 0%, transparent 65%)' }} />
              {/* Placeholder content */}
              <div className="flex flex-col items-center gap-3 relative z-10">
                <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2C12 2 6.5 8.5 6.5 13.5C6.5 16.54 9.01 19 12 19C14.99 19 17.5 16.54 17.5 13.5C17.5 8.5 12 2 12 2ZM12 17C10.07 17 8.5 15.43 8.5 13.5C8.5 11.12 10.28 8.41 12 6.16C13.72 8.41 15.5 11.13 15.5 13.5C15.5 15.43 13.93 17 12 17Z"
                    fill="rgba(232,101,26,0.25)"
                  />
                  <path
                    d="M12 8.5C12 8.5 9.5 12 9.5 13.5C9.5 14.88 10.62 16 12 16C13.38 16 14.5 14.88 14.5 13.5C14.5 12 12 8.5 12 8.5Z"
                    fill="rgba(232,101,26,0.15)"
                  />
                </svg>
                <span className="font-body text-[11px] uppercase tracking-widest text-[#9CA3AF]/20">
                  Chef Daddy&apos;s BBQ
                </span>
              </div>
            </div>

            {/* Item details — desktop only */}
            <div className="hidden sm:flex flex-col flex-1 p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="font-display text-2xl font-bold text-white leading-tight">{item.name}</h2>
                {item.price !== 'Ask Us' && (
                  <span className="font-display text-2xl font-bold text-[#E8651A] flex-shrink-0">{item.price}</span>
                )}
              </div>

              {item.note && (
                <span className="inline-block text-[#E8651A] text-[10px] font-body font-black uppercase tracking-wider bg-[#E8651A]/10 px-2.5 py-1 rounded-full mb-3 w-fit">
                  {item.note}
                </span>
              )}

              <p className="text-[#9CA3AF]/65 font-body text-sm leading-relaxed flex-1">
                {item.description}
              </p>

              <div className="mt-auto pt-4 border-t border-[#2A2A2A]">
                <p className="text-[#9CA3AF]/30 font-body text-xs">Includes 2 sides &amp; cornbread</p>
              </div>
            </div>

            {/* Item details — mobile strip */}
            <div className="sm:hidden flex items-start justify-between gap-3 px-5 py-3 border-b border-[#2A2A2A] bg-[#141414]">
              <p className="text-[#9CA3AF]/60 font-body text-xs leading-relaxed flex-1 line-clamp-2">{item.description}</p>
              {item.price !== 'Ask Us' && (
                <span className="font-display text-lg font-bold text-[#E8651A] flex-shrink-0">{item.price}</span>
              )}
            </div>
          </div>

          {/* RIGHT PANEL — sides selection */}
          <div className="flex-1 flex flex-col min-h-0">

            {/* Sides header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] flex-shrink-0">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Choose Your 2 Sides</h3>
                <p className={`font-body text-xs mt-0.5 transition-colors ${canConfirm ? 'text-[#E8651A]' : 'text-[#9CA3AF]/40'}`}>
                  {statusText()}
                </p>
              </div>
              {/* Progress dots */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {Array.from({ length: REQUIRED }).map((_, i) => (
                  <div key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i < selected.length ? 'bg-[#C0141C] scale-110' : 'bg-[#2E2E2E]'
                    }`}
                  />
                ))}
              </div>
              {/* Desktop close */}
              <button
                onClick={onClose}
                className="hidden sm:flex ml-4 text-[#9CA3AF]/40 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable sides list */}
            <div className="overflow-y-auto flex-1 p-3 sm:p-4">
              <div className="grid grid-cols-1 gap-1.5">
                {allSides.map((side) => {
                  const isSel = selected.some((s) => s.id === side.id);
                  const isLocked = selected.length >= REQUIRED && !isSel;
                  return (
                    <button
                      key={side.id}
                      type="button"
                      onClick={() => toggle(side)}
                      disabled={isLocked}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-200 border ${
                        isSel
                          ? 'bg-[#C0141C]/12 border-[#C0141C]/50 shadow-[inset_0_0_0_1px_rgba(192,20,28,0.3)]'
                          : isLocked
                          ? 'border-[#2A2A2A] opacity-25 cursor-not-allowed'
                          : 'border-[#2A2A2A] hover:bg-[#242424] hover:border-[#9CA3AF]/20'
                      }`}
                    >
                      {/* Checkbox */}
                      <span
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          isSel ? 'bg-[#C0141C] border-[#C0141C]' : 'border-[#9CA3AF]/25'
                        }`}
                      >
                        {isSel && (
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>

                      {/* Name */}
                      <span className={`font-body text-sm font-semibold flex-1 leading-snug ${
                        isSel ? 'text-white' : 'text-[#9CA3AF]/75'
                      }`}>
                        {side.name}
                      </span>

                      {/* Day restriction badge */}
                      {side.note && (
                        <span className="text-[#E8651A] text-[10px] font-body font-black uppercase tracking-wider flex-shrink-0 bg-[#E8651A]/10 px-2 py-0.5 rounded-full">
                          {side.note}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="px-4 sm:px-5 py-4 border-t border-[#2A2A2A] flex-shrink-0 bg-[#111111]">
          <button
            type="button"
            onClick={() => canConfirm && onConfirm(selected)}
            disabled={!canConfirm}
            className="w-full flex items-center justify-between gap-4 bg-[#C0141C] hover:bg-[#9A0F16] disabled:bg-[#2A2A2A] disabled:cursor-not-allowed text-white disabled:text-[#9CA3AF]/30 font-display font-bold text-base px-6 py-4 rounded-xl transition-all duration-200"
          >
            <span>
              {canConfirm
                ? 'Add to Order'
                : `Choose ${REQUIRED - selected.length} more side${REQUIRED - selected.length !== 1 ? 's' : ''}`}
            </span>
            {item.price !== 'Ask Us' && (
              <span className="font-display font-bold text-lg">{item.price}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
