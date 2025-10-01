/**
 * Hook useResponsive
 * Hook personalizado para gerenciar responsividade no MotoSync
 */

import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useResponsive = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  const { width, height } = screenData;

  // Breakpoints
  const breakpoints = {
    small: width < 375,
    medium: width >= 375 && width < 768,
    large: width >= 768,
    tablet: width >= 768 && width < 1024,
    desktop: width >= 1024,
  };

  // Funções responsivas
  const responsiveSize = (size) => {
    const scale = Math.min(width / 375, height / 667);
    const newSize = size * scale;
    return Math.max(8, Math.min(newSize, size * 2));
  };

  const responsiveWidth = (size) => {
    const scale = width / 375;
    return Math.round(size * scale);
  };

  const responsiveHeight = (size) => {
    const scale = height / 667;
    return Math.round(size * scale);
  };

  const responsiveFontSize = (size) => {
    const scale = Math.min(width / 375, height / 667);
    const newSize = size * scale;
    return Math.max(12, Math.min(newSize, size * 1.5));
  };

  // Grid responsivo
  const getGridColumns = () => {
    if (breakpoints.small) return 1;
    if (breakpoints.medium) return 2;
    if (breakpoints.tablet) return 3;
    return 4;
  };

  const getCardWidth = () => {
    if (breakpoints.small) return '100%';
    if (breakpoints.medium) return '48%';
    if (breakpoints.tablet) return '31%';
    return '23%';
  };

  // Padding responsivo
  const getPadding = () => {
    if (breakpoints.small) return 16;
    if (breakpoints.medium) return 20;
    if (breakpoints.tablet) return 24;
    return 32;
  };

  // Font sizes responsivos
  const getFontSize = (baseSize) => {
    if (breakpoints.small) return baseSize * 0.9;
    if (breakpoints.medium) return baseSize;
    if (breakpoints.tablet) return baseSize * 1.1;
    return baseSize * 1.2;
  };

  return {
    width,
    height,
    breakpoints,
    responsiveSize,
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
    getGridColumns,
    getCardWidth,
    getPadding,
    getFontSize,
    isSmall: breakpoints.small,
    isMedium: breakpoints.medium,
    isLarge: breakpoints.large,
    isTablet: breakpoints.tablet,
    isDesktop: breakpoints.desktop,
  };
};

export default useResponsive;
