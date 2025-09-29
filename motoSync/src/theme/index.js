/**
 * Tema Global do MotoSync
 * Centraliza todas as definições de design system
 */

import colors from './colors';
import typography from './typography';
import spacing from './spacing';

const theme = {
  colors,
  typography,
  spacing,
  
  // Componentes de Estilo Reutilizáveis
  components: {
    // Botões
    button: {
      primary: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.components.button.paddingVertical,
        paddingHorizontal: spacing.components.button.paddingHorizontal,
        borderRadius: spacing.border.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
      },
      secondary: {
        backgroundColor: colors.secondary,
        paddingVertical: spacing.components.button.paddingVertical,
        paddingHorizontal: spacing.components.button.paddingHorizontal,
        borderRadius: spacing.border.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: spacing.border.width.medium,
        borderColor: colors.primary,
        paddingVertical: spacing.components.button.paddingVertical,
        paddingHorizontal: spacing.components.button.paddingHorizontal,
        borderRadius: spacing.border.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
      },
      disabled: {
        backgroundColor: colors.gray[300],
        paddingVertical: spacing.components.button.paddingVertical,
        paddingHorizontal: spacing.components.button.paddingHorizontal,
        borderRadius: spacing.border.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    
    // Inputs
    input: {
      borderWidth: spacing.border.width.light,
      borderColor: colors.border.medium,
      borderRadius: spacing.border.radius.md,
      paddingVertical: spacing.components.input.paddingVertical,
      paddingHorizontal: spacing.components.input.paddingHorizontal,
      fontSize: typography.fontSize.base,
      color: colors.text.primary,
    },
    inputError: {
      borderWidth: spacing.border.width.medium,
      borderColor: colors.danger,
    },
    inputFocused: {
      borderWidth: spacing.border.width.medium,
      borderColor: colors.primary,
    },
    
    // Cards
    card: {
      backgroundColor: colors.white,
      borderRadius: spacing.border.radius.lg,
      padding: spacing.components.card.padding,
      margin: spacing.components.card.margin,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: spacing.elevation.sm,
    },
    
    // Lista de Itens
    listItem: {
      backgroundColor: colors.white,
      paddingVertical: spacing.components.listItem.paddingVertical,
      paddingHorizontal: spacing.components.listItem.paddingHorizontal,
      marginVertical: spacing.components.listItem.marginVertical,
      borderRadius: spacing.border.radius.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    // Headers
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.layout.container,
      paddingTop: spacing.layout.header,
      marginBottom: spacing.lg,
    },
    
    // Seções
    section: {
      backgroundColor: colors.white,
      borderRadius: spacing.border.radius.lg,
      padding: spacing.layout.section,
      marginBottom: spacing.lg,
    },
  },
  
  // Estilos de Texto com Cores
  text: {
    primary: {
      ...typography.styles.body,
      color: colors.text.primary,
    },
    secondary: {
      ...typography.styles.bodySmall,
      color: colors.text.secondary,
    },
    tertiary: {
      ...typography.styles.caption,
      color: colors.text.tertiary,
    },
    inverse: {
      ...typography.styles.body,
      color: colors.text.inverse,
    },
    link: {
      ...typography.styles.body,
      color: colors.text.link,
    },
    title: {
      ...typography.styles.h3,
      color: colors.text.primary,
    },
    subtitle: {
      ...typography.styles.h5,
      color: colors.text.secondary,
    },
    label: {
      ...typography.styles.label,
      color: colors.text.primary,
    },
    button: {
      ...typography.styles.button,
      color: colors.text.inverse,
    },
    buttonOutline: {
      ...typography.styles.button,
      color: colors.primary,
    },
    error: {
      ...typography.styles.caption,
      color: colors.danger,
    },
    success: {
      ...typography.styles.caption,
      color: colors.success,
    },
    warning: {
      ...typography.styles.caption,
      color: colors.warning,
    },
  },
  
  // Status Badges
  statusBadge: {
    ready: {
      backgroundColor: colors.motoStatus.ready,
      color: colors.white,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: spacing.border.radius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
    },
    lightDamage: {
      backgroundColor: colors.motoStatus.lightDamage,
      color: colors.warningDark,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: spacing.border.radius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
    },
    heavyDamage: {
      backgroundColor: colors.motoStatus.heavyDamage,
      color: colors.white,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: spacing.border.radius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
    },
    active: {
      backgroundColor: colors.userStatus.active,
      color: colors.white,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: spacing.border.radius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
    },
    pending: {
      backgroundColor: colors.userStatus.pending,
      color: colors.warningDark,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: spacing.border.radius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
    },
  },
};

export default theme;
