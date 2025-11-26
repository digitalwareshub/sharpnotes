'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
}: ConfirmModalProps) {
  if (!isOpen) {return null;}

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

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
          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-2">
              {title}
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              {message}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isDangerous
                    ? 'text-white bg-red-500 hover:bg-red-600'
                    : 'text-slate-950 bg-orange-500 hover:bg-orange-400'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
