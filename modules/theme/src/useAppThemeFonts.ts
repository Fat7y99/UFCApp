import { configureFonts } from 'react-native-paper';

/**
 * Font family options for the app theme.
 */
export type FontFamily = 'Poppins' | 'Inter';

/**
 * Custom hook to configure fonts for the app theme.
 *
 * This hook allows customization of base font variants and individual variants like title, label, etc.
 * You can switch between Poppins and Inter fonts by changing the fontFamily parameter.
 *
 * @param fontFamily - The font family to use ('Poppins' or 'Inter')
 * @returns Configured fonts for the app theme.
 */
const useAppThemeFonts = (fontFamily: FontFamily = 'Poppins') => {
  // Font configuration based on selected family
  const baseFont = {
    fontFamily: fontFamily === 'Inter' ? 'Inter-Regular' : 'Poppins-Regular',
  } as const;

  const baseVariants = configureFonts({ config: baseFont });

  // Font weight mappings for each font family
  const fontWeights = {
    poppins: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    inter: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
  };

  const currentWeights =
    fontWeights[fontFamily.toLowerCase() as keyof typeof fontWeights];

  const customVariants = {
    // Customize individual base variants with selected font weights
    titleSmall: {
      ...baseVariants.titleSmall,
      fontFamily: currentWeights.semiBold,
    },
    titleMedium: {
      ...baseVariants.titleMedium,
      fontFamily: currentWeights.semiBold,
    },
    titleLarge: {
      ...baseVariants.titleLarge,
      fontFamily: currentWeights.bold,
    },
    labelSmall: {
      ...baseVariants.labelSmall,
      fontFamily: currentWeights.medium,
    },
    labelMedium: {
      ...baseVariants.labelMedium,
      fontFamily: currentWeights.medium,
    },
    labelLarge: {
      ...baseVariants.labelLarge,
      fontFamily: currentWeights.semiBold,
    },
    bodySmall: {
      ...baseVariants.bodySmall,
      fontFamily: currentWeights.regular,
    },
    bodyMedium: {
      ...baseVariants.bodyMedium,
      fontFamily: currentWeights.regular,
    },
    bodyLarge: {
      ...baseVariants.bodyLarge,
      fontFamily: currentWeights.regular,
    },
    headlineSmall: {
      ...baseVariants.headlineSmall,
      fontFamily: currentWeights.bold,
    },
    headlineMedium: {
      ...baseVariants.headlineMedium,
      fontFamily: currentWeights.bold,
    },
    headlineLarge: {
      ...baseVariants.headlineLarge,
      fontFamily: currentWeights.bold,
    },
  } as const;

  return configureFonts({ config: { ...baseVariants, ...customVariants } });
};

export default useAppThemeFonts;
