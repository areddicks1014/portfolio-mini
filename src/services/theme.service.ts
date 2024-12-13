// /src/services/theme.ts
export enum Theme {
  Light = "light",
  Dark = "dark",
}

export const getTheme = (): Theme => {
  if (typeof window !== 'undefined' && typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") as Theme;
  }
  // Check if window is defined before accessing matchMedia
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return Theme.Dark;
  }
  
  return Theme.Light; // Default to light theme if no preference is found or if on the server
};

export const setTheme = (theme: Theme) => {
  // Early exit to prevent issues if localStorage is not available
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return;
  }

  switch (theme) {
    case Theme.Light:
      document.documentElement.classList.remove("theme-dark");
      document.documentElement.setAttribute('data-theme', 'github-light');
      localStorage.setItem("theme", Theme.Light);
      break;
    case Theme.Dark:
      document.documentElement.classList.add("theme-dark");
      document.documentElement.setAttribute('data-theme', 'github-dark');
      localStorage.setItem("theme", Theme.Dark);
      break;
  }
};


export const applyTheme = () => {
    // Only apply the theme if window is defined (i.e., in the browser)
    if (typeof window !== "undefined") {
        const theme = getTheme();
        setTheme(theme);
    }
};

