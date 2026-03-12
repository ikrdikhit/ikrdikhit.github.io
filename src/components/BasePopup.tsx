import { PiX } from 'react-icons/pi';
import { ReactNode, useEffect, useRef } from 'react';

interface BasePopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  zIndex?: string;
  /** Accessible label for the dialog — used as aria-label when no visible heading is present */
  ariaLabel?: string;
}

export default function BasePopup({
  isOpen,
  onClose,
  children,
  className = 'p-6 max-w-md',
  zIndex = 'z-50',
  ariaLabel = 'Dialog',
}: BasePopupProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Focus management: save previous focus, move focus into dialog on open,
  // restore focus on close.
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Small delay so the dialog is visible before focus moves into it
      const id = setTimeout(() => {
        const focusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 50);
      return () => clearTimeout(id);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Focus trap: keep Tab / Shift+Tab inside the dialog while it's open
  useEffect(() => {
    if (!isOpen) return;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', trapFocus);
    return () => window.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 ${zIndex} flex items-center justify-center transition-all duration-150 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      inert={!isOpen || undefined}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`bg-overlay border border-border rounded-3xl shadow-2xl w-[90%] transform transition-all duration-150 relative m-auto z-10 ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
        } ${className}`}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-t-primary hover:bg-black transition-colors z-20 cursor-pointer"
        >
          <PiX className="w-4 h-4 text-t-primary" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
}
