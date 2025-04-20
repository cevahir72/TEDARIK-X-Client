// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // src içindeki tüm dosyaları kapsasın
    "./app/**/*.{js,ts,jsx,tsx}", // Eğer app/ klasörü de varsa!
  ],
  theme: {
    extend: {
          fontFamily: {sans: ['Quicksand','sans-serif']}},
  },
  plugins: [],
};