import React, { createContext, useContext, useState } from 'react';
import type { FontFamily } from './useAppThemeFonts';
import type { ReactNode } from 'react';

interface FontContextType {
  fontFamily: FontFamily;
  setFontFamily: (font: FontFamily) => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

interface FontProviderProps {
  children: ReactNode;
  defaultFont?: FontFamily;
}

/**
 * Font provider component that manages the global font family selection.
 *
 * @param children - Child components
 * @param defaultFont - Default font family (defaults to 'Poppins')
 */
export const FontProvider: React.FC<FontProviderProps> = ({
  children,
  defaultFont = 'Poppins',
}) => {
  const [fontFamily, setFontFamily] = useState<FontFamily>(defaultFont);

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily }}>
      {children}
    </FontContext.Provider>
  );
};

/**
 * Hook to access the font context.
 *
 * @returns Font context with current font family and setter function
 * @throws Error if used outside of FontProvider
 */
export const useFontFamily = (): FontContextType => {
  const context = useContext(FontContext);
  if (context === undefined) {
    return {
      fontFamily: 'Poppins' as FontFamily,
      setFontFamily: () => {},
    };
  }
  return context;
};

export default FontContext;
