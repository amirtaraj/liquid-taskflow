import { useEffect, useState } from "react";

const SettingsScreen = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("amirtask-theme", theme);
  }, [theme]);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("amirtask-theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-xs text-muted-foreground">Customize your experience</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Appearance */}
        <div className="glass-panel rounded-2xl p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Appearance</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme("light")}
              className={`flex flex-1 flex-col items-center gap-2.5 rounded-xl p-4 transition-all duration-200 active:scale-[0.97] ${
                theme === "light"
                  ? "bg-primary/10 ring-2 ring-primary"
                  : "glass-button"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-foreground">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </div>
              <span className="text-xs font-medium text-foreground">Light</span>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`flex flex-1 flex-col items-center gap-2.5 rounded-xl p-4 transition-all duration-200 active:scale-[0.97] ${
                theme === "dark"
                  ? "bg-primary/10 ring-2 ring-primary"
                  : "glass-button"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-foreground">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-foreground">Dark</span>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="glass-panel rounded-2xl p-5">
          <h3 className="mb-2 text-sm font-semibold text-foreground">About</h3>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>App</span>
              <span className="font-medium text-foreground">AmirTask</span>
            </div>
            <div className="flex justify-between">
              <span>Version</span>
              <span className="font-medium text-foreground">1.0.1</span>
            </div>
            <div className="flex justify-between">
              <span>FrontEnd</span>
              <span className="font-medium text-foreground">React</span>
            </div>
            <div className="flex justify-between">
              <span>Storage</span>
              <span className="font-medium text-foreground">mongoDB Atlas</span>
            </div>
            
              <div className="flex justify-between">
                <span>Front End</span>
                <span className="font-medium text-foreground">Hosted on Vercel</span>
              </div>
              <div className="flex justify-between">
                <span>Back End</span>
                <span className="font-medium text-foreground">Hosted on Render</span>
              </div>
              <div className="flex justify-between">
                <span>UI Design</span>
                <span className="font-medium text-foreground">by Lovable</span>
              </div>
              <div className="flex justify-between">
                <span>LinkedIn</span>
                <a
                  href="https://www.linkedin.com/in/amirtaraj"
                  className="font-medium text-foreground hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.linkedin.com/in/amirtaraj
                </a>
              </div>
              <div className="flex justify-between">
              <span>Webpage</span>
              <a
                href="https://www.amirtaraj.com/"
                className="font-medium text-foreground hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.amirtaraj.com/
              </a>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
