import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Breakpoints para diferentes tamanhos de tela
const breakpoints = {
  small: width < 375,
  medium: width >= 375 && width < 768,
  large: width >= 768,
};

// Função para calcular tamanhos responsivos
export const responsiveSize = (size) => {
  const scale = width / 375; // 375 é o tamanho base (iPhone)
  return Math.round(size * scale);
};

// Função para calcular margens e paddings responsivos
export const spacing = {
  xs: responsiveSize(4),
  sm: responsiveSize(8),
  md: responsiveSize(16),
  lg: responsiveSize(24),
  xl: responsiveSize(32),
};

// Cores do tema
export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  text: '#000000',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  gray: {
    light: '#F2F2F7',
    medium: '#C7C7CC',
    dark: '#8E8E93',
  },
};

// Tipografia responsiva
export const typography = {
  h1: {
    fontSize: responsiveSize(32),
    fontWeight: 'bold',
  },
  h2: {
    fontSize: responsiveSize(24),
    fontWeight: 'bold',
  },
  h3: {
    fontSize: responsiveSize(20),
    fontWeight: 'bold',
  },
  body: {
    fontSize: responsiveSize(16),
  },
  caption: {
    fontSize: responsiveSize(14),
  },
};

// Layout responsivo
export const layout = {
  container: {
    flex: 1,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// Sombras responsivas
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 6,
  },
};

// Função para verificar o tamanho da tela
export const isSmallScreen = () => breakpoints.small;
export const isMediumScreen = () => breakpoints.medium;
export const isLargeScreen = () => breakpoints.large;

// Função para obter dimensões responsivas
export const getResponsiveDimensions = () => ({
  width,
  height,
  isSmall: breakpoints.small,
  isMedium: breakpoints.medium,
  isLarge: breakpoints.large,
}); 