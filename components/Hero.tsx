import React from 'react';
import TrueFocus from './TrueFocus';

const Hero: React.FC = () => {
  return (
    <header className="text-center mb-10 md:mb-12">
      <div 
        style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        className="animate-fade-in-down"
      >
        <TrueFocus
          sentence="Instagram Leads Generator"
          blurAmount={2.5}
          borderColor="rgb(99 102 241)" /* indigo-500 */
          glowColor="rgba(129, 140, 248, 0.5)" /* indigo-400 with alpha */
          animationDuration={0.4}
          pauseBetweenAnimations={0.6}
        />
      </div>
      <p 
        style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 animate-fade-in-down"
      >
        Get Leads in Seconds
      </p>
    </header>
  );
};

export default Hero;