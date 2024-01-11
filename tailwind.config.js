/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#BFD600',
        'secondary': '#1a4284',
        'success': '#2dd36f',
        'warning': '#ffc409',
        'danger': '#eb445a',
        'medium': '#92949c',
        'light': '#f4f5f8',
        'grey': '#53565b',

        'dipendente': '#BFD600',
        'partita_iva': '#00CCCC',
        'academy': 'orange',
        'amministrazione': '#1a4284',
        'commerciale': '#93a996',
        'ex_dipendente': 'red',

        'DA_CONFIGURARE': '#1a4284',
        'DA_ASSEGNARE': '#00CCCC',
        'ASSEGNATO': '#BFD600',
        'RICONSEGNATO': '#53565b',
        'DA_FORMATTARE': '#994C00',
        'ROTTO': 'red',
        'MULETTO': 'orange',

        'CV_RICEVUTO': '#1a4284',
        'DA_CONTATTARE': '#00CCCC',
        'CONTATTATO': '#BFD600',
        'DA_COLLOQUIARE': '#53565b',
        'COLLOQUIATO': '#994C00',
        'INIZIO_ACADEMY': 'orange',
        'NON_ACCETTATO': 'red'
      },
    },

  },
  plugins: [],
};
