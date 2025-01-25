import { useState, useEffect } from 'preact/hooks';

const STORAGE_KEY = 'pwa-prompt-last-dismissed';
const DISMISS_DURATION = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

export const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    const isInstalled =
      window.navigator.standalone ||
      window.matchMedia('(display-mode: standalone)').matches

    if (!isMobile || isInstalled) {
      return
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      
      // Check if user has recently dismissed
      const lastDismissed = localStorage.getItem(STORAGE_KEY);
      if (lastDismissed) {
        const timeSinceDismiss = Date.now() - parseInt(lastDismissed);
        if (timeSinceDismiss < DISMISS_DURATION) {
          return;
        }
      }

      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Clear the saved prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-background-card p-4 rounded-lg shadow-lg border border-border">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text mb-2">
            Install App
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            Install our app for a better experience and quick access from your home screen.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleInstall}
              className="btn-primary text-sm"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="btn-secondary text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
