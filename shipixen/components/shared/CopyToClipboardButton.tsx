import React, { useState } from 'react';

interface CopyToClipboardButtonProps {
  textToCopy: string;
  ariaLabel: string;
  label: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  textToCopy,
  label,
  ariaLabel,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopyClick}
        className="text-gray-500 hover:text-gray-700 group"
        aria-label={ariaLabel}
      >
        <span className="text-xl absolute top-0.5 -left-4 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700">
          #
        </span>
        <h3 className="text-2xl font-semibold">{label}</h3>
      </button>
      {showPopup && (
        <div className="absolute -bottom-10 left-0 mt-2 p-2 bg-gray-800 text-white text-sm rounded">
          Link copied
        </div>
      )}
    </div>
  );
};

export default CopyToClipboardButton;
