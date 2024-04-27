// pull variables from root
const light = getComputedStyle(document.documentElement).getPropertyValue('--light');
const dark = getComputedStyle(document.documentElement).getPropertyValue('--dark');

export const themes = {
  dark: {
    color: light,
    background: dark,
    borderColor: 'rgba(255, 255, 255, .25)'
  },
  light: {
    color: dark,
    background: light,
    borderColor: 'rgba(0, 0, 0, .25)'
  }
}