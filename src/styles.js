import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Breakpoints para diferentes tamanhos de tela
const breakpoints = {
  small: width < 375,
  medium: width >= 375 && width < 768,
  large: width >= 768,
  tablet: width >= 768 && width < 1024,
  desktop: width >= 1024,
};

// Função para calcular tamanhos responsivos melhorada
export const responsiveSize = (size) => {
  const scale = Math.min(width / 375, height / 667); // Baseado no iPhone 6/7/8
  const newSize = size * scale;
  
  // Garantir que o tamanho não seja muito pequeno ou muito grande
  return Math.max(8, Math.min(newSize, size * 2));
};

// Função para calcular altura responsiva
export const responsiveHeight = (size) => {
  const scale = height / 667; // Baseado no iPhone 6/7/8
  return Math.round(size * scale);
};

// Função para calcular largura responsiva
export const responsiveWidth = (size) => {
  const scale = width / 375; // Baseado no iPhone 6/7/8
  return Math.round(size * scale);
};

// Função para calcular fontes responsivas
export const responsiveFontSize = (size) => {
  const scale = Math.min(width / 375, height / 667);
  const newSize = size * scale;
  
  // Garantir tamanho mínimo e máximo para fontes
  return Math.max(12, Math.min(newSize, size * 1.5));
};

// Função para calcular margens e paddings responsivos
export const spacing = {
  xs: responsiveSize(4),
  sm: responsiveSize(8),
  md: responsiveSize(16),
  lg: responsiveSize(24),
  xl: responsiveSize(32),
  xxl: responsiveSize(48),
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

// Tipografia responsiva melhorada
export const typography = {
  h1: {
    fontSize: responsiveFontSize(32),
    fontWeight: 'bold',
    lineHeight: responsiveFontSize(40),
  },
  h2: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    lineHeight: responsiveFontSize(32),
  },
  h3: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    lineHeight: responsiveFontSize(28),
  },
  h4: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    lineHeight: responsiveFontSize(24),
  },
  h5: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    lineHeight: responsiveFontSize(22),
  },
  body: {
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(24),
  },
  bodySmall: {
    fontSize: responsiveFontSize(14),
    lineHeight: responsiveFontSize(20),
  },
  caption: {
    fontSize: responsiveFontSize(12),
    lineHeight: responsiveFontSize(16),
  },
  button: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
  buttonSmall: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
  },
  buttonLarge: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
  },
  label: {
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
  },
};

// Layout responsivo melhorado
export const layout = {
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(20),
    paddingVertical: responsiveHeight(10),
  },
  containerFluid: {
    flex: 1,
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerHorizontal: {
    alignItems: 'center',
  },
  centerVertical: {
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  // Layouts responsivos para diferentes tamanhos de tela
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: breakpoints.small ? '100%' : breakpoints.medium ? '48%' : '31%',
    marginBottom: spacing.md,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(16),
  },
  cardItem: {
    width: breakpoints.small ? '100%' : breakpoints.medium ? '48%' : '31%',
    marginBottom: spacing.md,
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