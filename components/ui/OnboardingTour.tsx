'use client';

import { useState, useEffect } from 'react';
import { trackEvent } from '../../lib/analytics';

interface Feature {
  icon: string;
  text: string;
  subtext: string;
}

interface Step {
  title: string;
  description: string;
  icon: string;
  highlight: string;
  features?: Feature[];
}

interface OnboardingTourProps {
  isDarkMode?: boolean;
  onComplete: () => void;
}

const SAMPLE_NOTE = `Quick brain dump:
Met with the product team today. I need to send them a follow-up email with the updated roadmap. 
Also have to prepare slides for Friday's review. I'm worried about timelines but excited about the new launch.
Remember to check in with marketing about the launch campaign and schedule a call with the design team.`;

export function OnboardingTour({ isDarkMode = true, onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Show onboarding after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      trackEvent('onboarding_started', { category: 'onboarding' });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      title: "Welcome to SHRP Notes! ✏️",
      description: "Transform your messy notes into structured, actionable content with these guarantees:",
      icon: "🔒",
      highlight: "Your data never leaves your browser",
      features: [
        { icon: "🚫", text: "No AI", subtext: "No ChatGPT or cloud AI services" },
        { icon: "☁️", text: "No Cloud", subtext: "Everything stays on your device" },
        { icon: "🧠", text: "Uses NLP", subtext: "Local natural language processing" },
        { icon: "💻", text: "Works Locally", subtext: "Offline-ready, instant processing" },
        { icon: "🔐", text: "100% Private", subtext: "Zero tracking, zero data collection" }
      ]
    },
    {
      title: "Try It Out 📝",
      description: "Start by pasting any messy notes into the input area. We've loaded a sample for you to test. Or click 'Fill with sample' anytime to get started.",
      icon: "📋",
      highlight: "Voice input supported (click the microphone icon)"
    },
    {
      title: "Pick a Mode ✨",
      description: "Choose how to transform your notes:\n• Summarize - Extract key points\n• Structure - Organize with headers\n• Polish - Fix grammar & improve flow\n• Tasks - Pull out action items",
      icon: "🎯",
      highlight: "Each mode uses local NLP processing"
    },
    {
      title: "Transform & See Magic 🪄",
      description: "Hit 'Make it sharp' (or Cmd/Ctrl+Enter) to transform your notes. Watch as your messy thoughts become crystal clear in seconds.",
      icon: "⚡",
      highlight: "All processing happens instantly in your browser"
    },
    {
      title: "Save & Access History 💾",
      description: "Your notes are automatically saved locally. Access them anytime from the history sidebar. Star your favorites, search, and export to multiple formats.",
      icon: "📚",
      highlight: "Unlimited storage, forever free"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      trackEvent('onboarding_step', { 
        step: currentStep + 2, 
        category: 'onboarding' 
      });
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    trackEvent('onboarding_skipped', { 
      step: currentStep + 1, 
      category: 'onboarding' 
    });
    handleClose();
  };

  const handleComplete = () => {
    trackEvent('onboarding_completed', { category: 'onboarding' });
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      // Save preference if "don't show again" is checked
      if (dontShowAgain) {
        localStorage.setItem('shrp_onboarding_dont_show', 'true');
      }
      onComplete();
    }, 300);
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleSkip}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`pointer-events-auto relative w-full max-w-2xl h-[85vh] sm:h-[80vh] flex flex-col transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card */}
          <div className={`relative rounded-3xl border shadow-2xl flex flex-col h-full overflow-hidden ${
            isDarkMode
              ? 'border-slate-700/70 bg-slate-900/95 backdrop-blur-xl'
              : 'border-orange-200/60 bg-white/95 backdrop-blur-xl'
          }`}>
            {/* Progress Bar */}
            <div className={`h-1.5 flex-shrink-0 ${isDarkMode ? 'bg-slate-800' : 'bg-orange-100'}`}>
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
              {/* Icon & Step Counter */}
              <div className="flex items-start justify-between mb-6">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-4xl ${
                  isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                }`}>
                  {step.icon}
                </div>
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  {currentStep + 1} of {steps.length}
                </span>
              </div>

              {/* Title */}
              <h2 className={`mb-4 text-2xl sm:text-3xl font-bold leading-tight ${
                isDarkMode ? 'text-slate-50' : 'text-gray-900'
              }`}>
                {step.title}
              </h2>

              {/* Description */}
              <p className={`mb-6 text-base sm:text-lg leading-relaxed whitespace-pre-line ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
                {step.description}
              </p>

              {/* Features List (shown on step 1) */}
              {currentStep === 0 && (steps[currentStep] as Step).features && (
                <div className="mb-6 space-y-3">
                  {(steps[currentStep] as Step).features?.map((feature: Feature, index: number) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] ${
                        isDarkMode
                          ? 'bg-slate-800/50 border border-slate-700/50'
                          : 'bg-orange-50/50 border border-orange-200/50'
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">{feature.icon}</span>
                      <div className="flex-1">
                        <p className={`font-semibold text-base ${
                          isDarkMode ? 'text-slate-100' : 'text-gray-900'
                        }`}>
                          {feature.text}
                        </p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-400' : 'text-gray-600'
                        }`}>
                          {feature.subtext}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlight Box */}
              <div className={`mb-8 rounded-xl border-l-4 p-4 ${
                isDarkMode
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-orange-500 bg-orange-50'
              }`}>
                <p className={`text-sm font-medium flex items-center gap-2 ${
                  isDarkMode ? 'text-orange-400' : 'text-orange-900'
                }`}>
                  <span>💡</span>
                  {step.highlight}
                </p>
              </div>

              {/* Sample Note (shown on step 2) */}
              {currentStep === 1 && (
                <div className={`mb-6 rounded-xl border p-4 ${
                  isDarkMode
                    ? 'border-slate-700 bg-slate-950/50'
                    : 'border-orange-200 bg-orange-50/50'
                }`}>
                  <p className={`mb-2 text-xs font-semibold uppercase tracking-wide ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Sample Note
                  </p>
                  <pre className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    {SAMPLE_NOTE}
                  </pre>
                </div>
              )}

              {/* Mode Examples (shown on step 3) */}
              {currentStep === 2 && (
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Summarize', desc: 'Key points & people', emoji: '📝' },
                    { name: 'Structure', desc: 'Headers & bullets', emoji: '📋' },
                    { name: 'Polish', desc: 'Fix grammar', emoji: '✨' },
                    { name: 'Tasks', desc: 'Action items', emoji: '✅' }
                  ].map((mode) => (
                    <div 
                      key={mode.name}
                      className={`rounded-xl border p-3 transition-all hover:scale-105 ${
                        isDarkMode
                          ? 'border-slate-700 bg-slate-800/50'
                          : 'border-orange-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{mode.emoji}</span>
                        <span className={`font-medium text-sm ${
                          isDarkMode ? 'text-slate-200' : 'text-gray-900'
                        }`}>
                          {mode.name}
                        </span>
                      </div>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-slate-400' : 'text-gray-600'
                      }`}>
                        {mode.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fixed Footer with Checkbox and Buttons */}
            <div className={`flex-shrink-0 border-t p-6 sm:p-8 md:p-10 pt-6 ${
              isDarkMode ? 'border-slate-700/70' : 'border-orange-200/60'
            }`}>
              {/* Don't Show Again Checkbox */}
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 rounded border-2 cursor-pointer"
                    style={{
                      accentColor: isDarkMode ? '#8b5cf6' : '#7c3aed'
                    }}
                  />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Don&apos;t show this again
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
                {/* Skip/Back Button */}
                <button
                  onClick={currentStep === 0 ? handleSkip : () => setCurrentStep(currentStep - 1)}
                  className={`flex-1 sm:flex-none rounded-xl px-6 py-3 text-sm font-medium transition-all min-h-[48px] ${
                    isDarkMode
                      ? 'border border-slate-700 text-slate-300 hover:bg-slate-800/50'
                      : 'border border-orange-400 text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  {currentStep === 0 ? 'Skip Tour' : 'Back'}
                </button>

                {/* Next/Finish Button */}
                <button
                  onClick={handleNext}
                  className={`flex-1 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 min-h-[48px] ${
                    isDarkMode
                      ? 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-900/50'
                      : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30'
                  }`}
                >
                  {currentStep === steps.length - 1 ? "Let's Go! 🚀" : 'Next'}
                </button>
              </div>

              {/* Keyboard Hint */}
              {currentStep === steps.length - 1 && (
                <p className={`mt-4 text-center text-xs ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  💡 Tip: Press <kbd className={`px-2 py-0.5 rounded ${
                    isDarkMode ? 'bg-slate-800' : 'bg-orange-100'
                  }`}>Cmd/Ctrl+Enter</kbd> to transform notes quickly
                </p>
              )}
            </div>
          </div>

          {/* Step Indicators (Dots) */}
          <div className="mt-6 flex justify-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-orange-500'
                    : index < currentStep
                      ? 'w-2 bg-orange-400/50'
                      : isDarkMode
                        ? 'w-2 bg-slate-700'
                        : 'w-2 bg-orange-200'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
