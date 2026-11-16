import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegion, REGIONS } from '../../store/currencySlice';
import { X, Check, Globe, Plane, ShieldCheck } from 'lucide-react';

export default function CurrencySelectorModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { currentRegion } = useSelector((state) => state.currency);

  // Lock background scroll and pause Lenis when currency modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.lenis?.start();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (code) => {
    dispatch(setRegion(code));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      data-lenis-prevent="true"
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div
        className="bg-[#FEFAE0] border border-[#DDA15E]/50 rounded-none shadow-2xl max-w-lg w-full p-6 text-[#283618] relative overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#283618]/70 hover:text-[#283618] p-1.5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#606C38]/10 text-[#606C38] mb-2">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-2xl font-semibold tracking-wide text-[#283618]">
            Select Your Region & Currency
          </h3>
          <p className="text-xs text-[#283618]/70 mt-1">
            Prices, delivery estimates, and shipping fees will be tailored to your royal destination.
          </p>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {Object.values(REGIONS).map((reg) => {
            const isSelected = reg.code === currentRegion;
            return (
              <button
                key={reg.code}
                onClick={() => handleSelect(reg.code)}
                className={`flex items-start p-3.5 border text-left transition-all relative ${
                  isSelected
                    ? 'border-[#606C38] bg-[#606C38]/10 shadow-sm'
                    : 'border-[#DDA15E]/30 bg-white/50 hover:border-[#606C38]/50 hover:bg-white'
                }`}
              >
                <span className="text-2xl mr-3">{reg.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#283618]">
                      {reg.country}
                    </span>
                    {isSelected && (
                      <span className="text-[#606C38]">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono font-medium text-[#606C38] mt-0.5">
                    {reg.currency} ({reg.symbol})
                  </div>
                  <div className="text-[11px] text-[#283618]/60 mt-1 flex items-center gap-1">
                    <Plane className="w-3 h-3 text-[#BC6C25]" />
                    <span className="truncate">{reg.estimatedDays}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Trust Badges */}
        <div className="border-t border-[#DDA15E]/30 pt-4 flex items-center justify-between text-xs text-[#283618]/70">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#606C38]" />
            <span>Guaranteed Express Delivery</span>
          </div>
          <span className="text-[11px] font-medium text-[#BC6C25]">Duties Pre-Calculated</span>
        </div>
      </div>
    </div>
  );
}
