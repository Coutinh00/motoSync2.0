/**
 * Sistema de Espaçamento do MotoSync
 * Define espaçamentos consistentes para manter harmonia visual
 */

export const spacing = {
  // Espaçamentos Base (múltiplos de 4)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80,
  '8xl': 96,
  
  // Espaçamentos Específicos
  padding: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  
  margin: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  
  // Espaçamentos de Layout
  layout: {
    container: 16,
    section: 24,
    card: 16,
    header: 20,
    footer: 16,
  },
  
  // Espaçamentos de Componentes
  components: {
    button: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 8,
    },
    input: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 8,
    },
    card: {
      padding: 16,
      margin: 8,
    },
    listItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 4,
    },
  },
  
  // Espaçamentos de Grid
  grid: {
    gutter: 16,
    column: 8,
  },
  
  // Espaçamentos de Ícones
  icon: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 32,
  },
  
  // Espaçamentos de Bordas
  border: {
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
    width: {
      thin: 0.5,
      light: 1,
      medium: 2,
      thick: 4,
    },
  },
  
  // Espaçamentos de Elevação
  elevation: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 16,
  },
};

export default spacing;
