
import React, { useEffect } from 'react';
import { AD_CLIENT_ID } from '../constants';

interface GoogleAdProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  label?: string; // For the placeholder text
}

export const GoogleAd: React.FC<GoogleAdProps> = ({ slot = "1234567890", format = "auto", label }) => {
  useEffect(() => {
    // Try to push the ad if the script is loaded
    try {
      if (window.location.hostname !== 'localhost') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  // If running locally or without a real Client ID, show a styled placeholder
  if (window.location.hostname === 'localhost' || AD_CLIENT_ID.includes('XXX')) {
    return (
      <div className="w-full h-32 bg-dark-800/30 border border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-600 gap-2 select-none overflow-hidden mx-auto max-w-4xl my-8">
        <span className="text-xs font-mono uppercase tracking-widest border border-slate-700 px-2 py-1 rounded">Advertisement</span>
        <span className="text-sm font-medium text-slate-500">{label || "Google AdSense Space"}</span>
      </div>
    );
  }

  return (
    <div className="w-full my-8 flex justify-center overflow-hidden">
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px' }}
        data-ad-client={AD_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
