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
    borderWidth: {
      DEFAULT: '2px',
      '0': '0',
      '2': '2px',
      '3': '3px',
    },
    maxWidth: {
      '30': '300px',
      '45': '450px',
      '60': '600px',
      '65': '650px',
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      spacing: {
        '0.5': "5px",
        '1': "10px",
        '1.5': "15px",
        '2': "20px",
        '2.5': "25px",
        '3': "30px",
        '3.5': "35px",
        '4': "40px",
        '4.5': "45px",
        '5': "50px",
        '30': "300px",
        '50': "500px",
        '60': "600px",
        '70': "700px",
      },
      boxShadow: {
        'shadow': '0px 3px 6px 0px rgba(147, 65, 221, 0.15)',
      },
      width: {
        '95': '95%',
        '100': '100%',
      }
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    fontSize: {
      'text': '14px',
      'logo': '26px',
      'bold': '16px',
      'base': '1rem',
      'lg': '1.125rem',
    }
  },
  plugins: [],
}
