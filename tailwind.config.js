import daisyui from 'daisyui';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [daisyui],
  daisyui: {
    themes: [{
      tiket: { 
        "primary": "#0064D2",
        "secondary": "#FFCE00",
        "accent": "#F26922",
        "neutral": "#333c4d",
        "base-100": "#ffffff",
        "info": "#3abff8",
        "success": "#16a34a",
        "warning": "#fbbd23",
        "error": "#dc2626",
      },
    }],
  },
}