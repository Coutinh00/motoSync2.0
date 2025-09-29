/**
 * Sistema de Tipografia do MotoSync
 * Define tamanhos, pesos e estilos de fonte para manter consistência textual
 */

export const typography = {
  // Tamanhos de Fonte
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
  },
  
  // Pesos de Fonte
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Altura da Linha
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Estilos de Texto Predefinidos
  styles: {
    // Títulos
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 1.4,
    },
    h6: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 1.4,
    },
    
    // Texto do Corpo
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 1.4,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 1.6,
    },
    
    // Texto de Interface
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 1.3,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 1.4,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 1.2,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 1.2,
    },
    buttonLarge: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 1.2,
    },
    
    // Texto de Navegação
    navTitle: {
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 1.2,
    },
    tabLabel: {
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 1.2,
    },
    
    // Texto de Status
    status: {
      fontSize: 12,
      fontWeight: '600',
      lineHeight: 1.2,
    },
    badge: {
      fontSize: 10,
      fontWeight: '600',
      lineHeight: 1.2,
    },
  },
};

export default typography;
