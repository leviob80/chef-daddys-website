'use client';

import { useState } from 'react';
import { menuSections } from '@/lib/menu-data';

export interface SelectedSide {
  id: string;
  name: string;
}

interface SidesModalProps {
  itemName: string;
  onConfirm: (sides: SelectedSide[]) => void;
  onClose: () => void;
}

const REQUIRED = 2;

export default function SidesModal({ itemName, onConfirm, onClose }: SidesModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your 2 sides"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#1A1A1A] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[88vh] flex flex-col border border-[#2A2A2A] shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-[#2A2A2A] flex-shrink-0">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Choose 2 Sides</h2>
            <p className="text-[#9CA3AF]/60 font-body text-xs mt-0.5 leading-snug">
              {itemName} · All meals include 2 sides &amp; cornbread
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF]/40 hover:text-white transition-colors text-2xl leading-none ml-4 flex-shrink-0 mt-0.5"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Progress tracker */}
        <div className="px-5 py-3 bg-[#242424] border-b border-[#2A2A2A] flex-shrink-0">
          <div className="flex items-center gap-4">
            {Array.from({ length: REQUIRED }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-all ${
                  selected[i] ? 'bg-[#C0141C] text-white' : 'bg-[#2A2A2A] text-[#9CA3AF]/40'
                }`}>
                  {selected[i] ? '✓' : i + 1}
                </div>
                <span className={`font-body text-xs font-semibold truncate max-w-[90px] transition-colors ${
                  selected[i] ? 'text-white' : 'text-[#9CA3AF]/30'
                }`}>
                  {selected[i]?.name ?? (i === 0 ? 'First side' : 'Second side')}
                </span>
              </div>
            ))}
            <span className="text-[#9CA3AF]/40 font-body text-xs ml-auto flex-shrink-0">
              {canConfirm ? 'Ready!' : `${REQUIRED - selected.length} more`}
            </span>
          </div>
        </div>

        {/* Sides list */}
        <div className="overflow-y-auto flex-1 p-4">
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all border ${
                    isSel
                      ? 'bg-[#C0141C]/15 border-[#C0141C]/50'
                      : isLocked
                      ? 'border-[#2A2A2A] opacity-30 cursor-not-allowed'
                      : 'border-[#2A2A2A] hover:bg-[#2A2A2A] hover:border-[#9CA3AF]/20'
                  }`}
                >
                  <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSel ? 'bg-[#C0141C] border-[#C0141C]' : 'border-[#9CA3AF]/30'
                  }`}>
                    {isSel && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={`font-body text-sm font-semibold flex-1 ${isSel ? 'text-white' : 'text-[#9CA3AF]/80'}`}>
                    {side.name}
                  </span>
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

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#2A2A2A] flex-shrink-0">
          <button
            type="button"
            onClick={() => canConfirm && onConfirm(selected)}
            disabled={!canConfirm}
            className="w-full bg-[#C0141C] hover:bg-[#9A0F16] disabled:opacity-40 disabled:cursor-not-allowed text-white font-body font-black text-base py-3.5 rounded-xl transition-all"
          >
            {canConfirm
              ? 'Add to Cart →'
              : `Choose ${REQUIRED - selected.length} more side${REQUIRED - selected.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}
