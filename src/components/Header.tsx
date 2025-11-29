import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-indigo-500" />
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-slate-50">
            AOI Creation
          </h1>
          <p className="text-xs text-slate-400">
            Satellite / Drone imagery viewer
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span>Frontend Engineer Assignment</span>
      </div>
    </header>
  );
};

export default Header;
