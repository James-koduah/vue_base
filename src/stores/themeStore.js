import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
    theme: 'light'
  }),

  getters: {
    currentTheme: (state) => state.theme,
    isDarkMode: (state) => state.isDark
  },

  actions: {
    initTheme() {
      // Check if user has a saved preference
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
      }
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches ? 'dark' : 'light');
          }
        });
    },

    setTheme(theme) {
      this.theme = theme;
      this.isDark = theme === 'dark';
      
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', theme);
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a1a1a' : '#ffffff');
      }
    },

    toggleTheme() {
      const newTheme = this.isDark ? 'light' : 'dark';
      this.setTheme(newTheme);
    }
  }
}); 