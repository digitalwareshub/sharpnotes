'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

export default function ReportPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && false);
    }
    return false;
  });

  const [formData, setFormData] = useState({
    type: 'bug',
    title: '',
    description: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
    document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpwdkpyb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          title: formData.title,
          description: formData.description,
          email: formData.email || 'Not provided',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ type: 'bug', title: '', description: '', email: '' });
        }, 3000);
      } else {
        alert('Failed to submit. Please try again or contact us on Twitter.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again or contact us on Twitter.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 to-violet-900 text-slate-50' 
        : 'bg-gradient-to-br from-violet-50 to-purple-50 text-slate-900'
    }`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className={`flex items-center gap-2 text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <li>
              <Link href="/" className={`hover:underline ${
                isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'
              }`}>
                Home
              </Link>
            </li>
            <li>/</li>
            <li className={isDarkMode ? 'text-slate-300' : 'text-slate-900'} aria-current="page">
              Report Bug or Feature
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-slate-50' : 'text-slate-900'
          }`}>
            Report a Bug or Request a Feature
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Help us improve SHRP Notes by reporting bugs or suggesting new features.
            We read every submission and prioritize based on user feedback.
          </p>
        </div>

        {/* Form Card */}
        <div className={`rounded-2xl shadow-xl border p-8 ${
          isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-violet-200'
        }`}>
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
              }`}>
                <svg className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Thank You!
              </h2>
              <p className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                Your {formData.type === 'bug' ? 'bug report' : 'feature request'} has been submitted successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className={`block text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  What would you like to report?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'bug' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === 'bug'
                        ? isDarkMode ? 'border-violet-500 bg-violet-900/30' : 'border-violet-600 bg-violet-50'
                        : isDarkMode ? 'border-slate-700 hover:border-slate-600' : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <svg className={`w-6 h-6 mx-auto mb-2 ${
                      formData.type === 'bug' ? 'text-violet-500' : 'text-slate-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className={`font-semibold ${
                      formData.type === 'bug' 
                        ? 'text-violet-500' 
                        : isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Bug Report
                    </div>
                    <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Something isn&apos;t working
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'feature' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === 'feature'
                        ? isDarkMode ? 'border-violet-500 bg-violet-900/30' : 'border-violet-600 bg-violet-50'
                        : isDarkMode ? 'border-slate-700 hover:border-slate-600' : 'border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    <svg className={`w-6 h-6 mx-auto mb-2 ${
                      formData.type === 'feature' ? 'text-violet-500' : 'text-slate-400'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    <div className={`font-semibold ${
                      formData.type === 'feature' 
                        ? 'text-violet-500' 
                        : isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      Feature Request
                    </div>
                    <div className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Suggest an improvement
                    </div>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={formData.type === 'bug' ? 'Brief description of the bug' : 'Brief description of the feature'}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder={
                    formData.type === 'bug'
                      ? 'Please describe:\n- What you were trying to do\n- What happened instead\n- Steps to reproduce\n- Browser and device info'
                      : 'Please describe:\n- What problem would it solve?\n- How should it work?\n- Any examples or references?'
                  }
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Email <span className={`text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>(optional - for updates)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                    isDarkMode 
                      ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-slate-500 disabled:to-slate-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    <span>Submit {formData.type === 'bug' ? 'Bug Report' : 'Feature Request'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Additional Help */}
          {!isSubmitted && (
            <div className={`mt-8 pt-8 border-t text-center text-sm ${
              isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              Need immediate help? Reach out on{' '}
              <a href="https://twitter.com/digi_wares" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline font-medium">
                Twitter
              </a>
              {' '}or check our{' '}
              <Link href="/blog" className="text-violet-400 hover:underline font-medium">
                Blog
              </Link>
              {' '}for guides and tips.
            </div>
          )}
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
