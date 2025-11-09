'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle Esc key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please enter your feedback');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpwdkpyb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name || 'Anonymous',
          email: email || 'Not provided',
          message,
          source: 'SHRP Notes Feedback',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Feedback sent successfully!');
        
        // Reset form after 2 seconds and close
        setTimeout(() => {
          setName('');
          setEmail('');
          setMessage('');
          setIsSubmitted(false);
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to send feedback');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error('Failed to send feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {return null;}

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div
          className="bg-slate-900/95 border border-slate-700/70 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-700/70">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-50">
                Send Feedback
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-slate-400 mt-2">
              Help us improve SHRP Notes! Share your thoughts, bug reports, or feature requests.
            </p>
          </div>

          {/* Form or Success Message */}
          {isSubmitted ? (
            <div className="p-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-slate-50 mb-2">
                Thank you for your feedback!
              </h3>
              <p className="text-sm text-slate-400">
                We appreciate you taking the time to help us improve SHRP Notes.
                Your feedback has been received and we&apos;ll review it shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name (Optional) */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Name <span className="text-slate-500">(optional)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-950/80 border border-slate-700 rounded-lg text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Your name"
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Email <span className="text-slate-500">(optional, for follow-up)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-950/80 border border-slate-700 rounded-lg text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message (Required) */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                  Feedback <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-3 py-2 text-sm bg-slate-950/80 border border-slate-700 rounded-lg text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
                  placeholder="Tell us what you think, report a bug, or suggest a feature..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="flex-1 px-4 py-2 text-sm font-medium text-slate-950 bg-violet-500 hover:bg-violet-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-slate-50" />
                      Sending...
                    </>
                  ) : (
                    'Send Feedback'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
