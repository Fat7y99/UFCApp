# Poppins Fonts

This directory contains the Poppins font family files for the UFC Mobile App.

## Available Font Weights

- **Poppins-Regular.ttf** - Regular weight (400)
- **Poppins-Medium.ttf** - Medium weight (500)
- **Poppins-SemiBold.ttf** - SemiBold weight (600)
- **Poppins-Bold.ttf** - Bold weight (700)

## Usage

### Using Theme Fonts (Recommended)

The fonts are automatically configured in the app theme. Use the theme fonts for consistent styling:

```tsx
import { useAppTheme } from '@modules/theme';

const MyComponent = () => {
  const theme = useAppTheme();

  return <Text style={theme.fonts.headlineLarge}>This uses Poppins Bold</Text>;
};
```

### Available Theme Font Variants

- `theme.fonts.headlineLarge` - Poppins Bold
- `theme.fonts.headlineMedium` - Poppins Bold
- `theme.fonts.headlineSmall` - Poppins Bold
- `theme.fonts.titleLarge` - Poppins Bold
- `theme.fonts.titleMedium` - Poppins SemiBold
- `theme.fonts.titleSmall` - Poppins SemiBold
- `theme.fonts.labelLarge` - Poppins SemiBold
- `theme.fonts.labelMedium` - Poppins Medium
- `theme.fonts.labelSmall` - Poppins Medium
- `theme.fonts.bodyLarge` - Poppins Regular
- `theme.fonts.bodyMedium` - Poppins Regular
- `theme.fonts.bodySmall` - Poppins Regular

### Direct Font Usage

If you need to use fonts directly, you can import the font family names:

```tsx
import { FONT_FAMILIES } from '@modules/assets';

const MyComponent = () => {
  return (
    <Text style={{ fontFamily: FONT_FAMILIES.PoppinsBold }}>
      This uses Poppins Bold directly
    </Text>
  );
};
```

## Platform Configuration

### Android

Fonts are automatically copied to `android/app/src/main/assets/fonts/` during build.

### iOS

Fonts are registered in `ios/UFCApp/Info.plist` under the `UIAppFonts` key.

## Testing

To test the font implementation, run the app and navigate to the Home screen where you'll see examples of all font variants.
