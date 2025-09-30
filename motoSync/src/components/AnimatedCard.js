/**
 * Componente AnimatedCard
 * Card com animações suaves para o MotoSync
 */

import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import ModernCard from './ModernCard';

/**
 * Componente AnimatedCard
 * @param {Object} props - Props do componente
 * @param {boolean} props.pressable - Se o card é clicável
 * @param {Function} props.onPress - Função chamada ao pressionar
 * @param {Object} props.style - Estilos adicionais
 * @param {React.ReactNode} props.children - Conteúdo do card
 * @param {boolean} props.animateOnMount - Se deve animar ao montar
 * @param {number} props.delay - Delay da animação em ms
 * @returns {React.ReactNode} Componente AnimatedCard
 */
const AnimatedCard = ({
  pressable = false,
  onPress,
  style,
  children,
  animateOnMount = true,
  delay = 0,
  ...props
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (animateOnMount) {
      const animation = Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
      ]);

      animation.start();
    }
  }, [animateOnMount, delay, fadeAnim, scaleAnim, translateY]);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { scale: scaleAnim },
      { translateY: translateY },
    ],
  };

  if (pressable) {
    return (
      <Animated.View style={[animatedStyle, style]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          {...props}
        >
          <ModernCard style={style}>
            {children}
          </ModernCard>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[animatedStyle, style]}>
      <ModernCard style={style} {...props}>
        {children}
      </ModernCard>
    </Animated.View>
  );
};

export default AnimatedCard;
