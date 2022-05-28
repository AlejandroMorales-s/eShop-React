module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      gray: "#E5E7EB",
      primary:{
        DEFAULT: '#9341DD',
        ligth: '#C084FC',
      },
      text: '#6B7280',
      darkBg: '#0F172A',
      boldText: '#111827',
      white: '#FFFFFF',
      black: '#000000',
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      }
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
    }
  },
  plugins: [],
}
