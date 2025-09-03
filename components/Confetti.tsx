
import React, { useEffect, useState } from 'react';

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    className="absolute top-0 left-0 w-2 h-4"
    style={style}
  ></div>
);

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const newPieces: React.CSSProperties[] = [];
    const colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'];
    const count = 100;

    for (let i = 0; i < count; i++) {
      newPieces.push({
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        animation: `fall ${2 + Math.random() * 3}s ${Math.random() * 2}s linear forwards`,
        transform: `rotate(${Math.random() * 360}deg)`,
        opacity: 1,
      });
    }

    setPieces(newPieces);
    
    // Add keyframes dynamically
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes fall {
        to {
          transform: translateY(150vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
        document.head.removeChild(styleSheet);
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((style, index) => (
        <ConfettiPiece key={index} style={style} />
      ))}
    </div>
  );
};

export default Confetti;
