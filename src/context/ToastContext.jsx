import { createContext, useCallback, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TbCircleCheckFilled, TbX } from "react-icons/tb";

const ToastContext = createContext(null);
let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback((message, opts = {}) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, action: opts.action }]);
    timers.current[id] = setTimeout(() => dismiss(id), opts.duration ?? 3200);
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}
      <div
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 100,
          display: "flex", flexDirection: "column", gap: 10, maxWidth: 340,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="card toast-pop"
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "13px 14px",
              boxShadow: "0 16px 40px -16px rgba(0,0,0,0.7)",
            }}
          >
            <TbCircleCheckFilled size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 13, flex: 1 }}>{t.message}</span>
            {t.action && (
              <Link
                to={t.action.to}
                onClick={() => dismiss(t.id)}
                className="muted"
                style={{ fontSize: 12, fontWeight: 600, textDecoration: "underline", flexShrink: 0, color: "var(--accent-soft)" }}
              >
                {t.action.label}
              </Link>
            )}
            <button
              className="btn-icon"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              style={{ width: 26, height: 26, flexShrink: 0, background: "transparent", border: "none" }}
            >
              <TbX size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
