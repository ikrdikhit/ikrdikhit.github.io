import { PiEnvelopeSimple, PiMapPin, PiBriefcase } from 'react-icons/pi';
import BasePopup from './BasePopup';
import { PERSONAL_INFO } from '../data/config';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  return (
    <BasePopup isOpen={isOpen} onClose={onClose} className="p-8 max-w-md" zIndex="z-[100]">
      <h3 className="font-serif italic text-3xl lowercase text-t-primary mb-2 pr-6">
        Contact Details
      </h3>
      <p className="text-t-muted text-sm mb-8 leading-relaxed">
        I'm currently available for freelance projects and full-time opportunities. Have project in
        mind? Feel free to reach out.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-raised">
          <PiEnvelopeSimple className="w-5 h-5 text-t-muted" />
          <div className="flex flex-col">
            <span className="text-xs text-t-muted uppercase tracking-wide">Email</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-t-primary hover:underline text-sm"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-raised">
          <PiMapPin className="w-5 h-5 text-t-muted" />
          <div className="flex flex-col">
            <span className="text-xs text-t-muted uppercase tracking-wide">Location</span>
            <span className="text-t-primary text-sm">
              {PERSONAL_INFO.location} {PERSONAL_INFO.remoteAvailable && ' (Remote Available)'}
            </span>
          </div>
        </div>

        {PERSONAL_INFO.showStatus && (
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-raised">
            <div className="relative">
              <PiBriefcase className="w-5 h-5 text-t-muted" />
              {/* Small pulsing indicator on the icon */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-t-muted uppercase tracking-wide">Availability</span>
              <span className="text-t-primary text-sm">
                {PERSONAL_INFO.statusLabel || 'Open to Offers'}
              </span>
            </div>
          </div>
        )}
      </div>
    </BasePopup>
  );
}
