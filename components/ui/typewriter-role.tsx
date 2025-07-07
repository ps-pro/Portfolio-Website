// components/ui/typewriter-role.tsx
"use client";

import { useState, useEffect } from "react";

const fullSentences = [
  "I'm an AI Researcher",
  "I'm a Data Scientist",
  "I'm a Data Analyst", 
  "I'm a Data Engineer",
  "I'm an ML Engineer",
  "I'm a Business Analyst",
  "I'm a Gen AI Developer",
  "I'm an AI Engineer",
  "I'm a Research Scientist",
  "I'm a Product Analyst"
];

export const TypewriterRole = () => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentSentence = fullSentences[currentSentenceIndex];
    const shouldDelete = isDeleting && currentText.length > 0;
    const shouldType = !isDeleting && currentText.length < currentSentence.length;
    const shouldMoveToNext = !isDeleting && currentText === currentSentence;
    const shouldStartTyping = isDeleting && currentText.length === 0;

    if (shouldType) {
      // Typing effect
      const timeout = setTimeout(() => {
        setCurrentText(currentSentence.slice(0, currentText.length + 1));
      }, 100); // Typing speed
      return () => clearTimeout(timeout);
    } 
    else if (shouldMoveToNext) {
      // Pause before starting to delete
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000); // How long to display complete text
      return () => clearTimeout(timeout);
    }
    else if (shouldDelete) {
      // Deleting effect
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, 50); // Deleting speed (faster than typing)
      return () => clearTimeout(timeout);
    }
    else if (shouldStartTyping) {
      // Move to next sentence and start typing
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentSentenceIndex((prev) => (prev + 1) % fullSentences.length);
      }, 300); // Pause between sentences
      return () => clearTimeout(timeout);
    }
  }, [currentText, isDeleting, currentSentenceIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600); // Cursor blink speed

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-purple-400 font-semibold">
        {currentText}
        <span 
          className={`inline-block w-0.5 h-5 bg-purple-400 ml-1 ${
            showCursor ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-100`}
        />
      </span>
    </span>
  );
};