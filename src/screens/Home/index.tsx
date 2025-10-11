import { Text, Button } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { Screen, ScrollContainer } from '@modules/components';
import { useGetUserDetailsApi } from '@modules/core';
import { useFocusNotifyOnChangeProps, useRefreshOnFocus } from '@modules/utils';
import { useAppTheme, useFontFamily, FontFamily } from '@modules/theme';
import { Header } from './components';
import styles from './styles';

export default React.memo(() => {
  const notifyOnChangeProps = useFocusNotifyOnChangeProps();
  const theme = useAppTheme();
  const { fontFamily, setFontFamily } = useFontFamily();

  const {
    data: userData,
    dataUpdatedAt,
    refetch,
  } = useGetUserDetailsApi({ notifyOnChangeProps: notifyOnChangeProps?.() });

  useRefreshOnFocus(refetch);

  const toggleFont = () => {
    setFontFamily(fontFamily === 'Poppins' ? 'Inter' : 'Poppins');
  };

  return (
    <Screen>
      <Header />
      <ScrollContainer
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Font Switcher */}
        <Button
          mode="contained"
          onPress={toggleFont}
          style={{ marginBottom: 20 }}
        >
          Switch to {fontFamily === 'Poppins' ? 'Inter' : 'Poppins'} Font
        </Button>

        {/* Current Font Display */}
        <Text style={[theme.fonts.headlineLarge, { marginBottom: 16 }]}>
          {fontFamily} Font Test
        </Text>

        <Text style={[theme.fonts.headlineMedium, { marginBottom: 12 }]}>
          Headline Medium ({fontFamily} Bold)
        </Text>

        <Text style={[theme.fonts.titleLarge, { marginBottom: 12 }]}>
          Title Large ({fontFamily} Bold)
        </Text>

        <Text style={[theme.fonts.titleMedium, { marginBottom: 12 }]}>
          Title Medium ({fontFamily} SemiBold)
        </Text>

        <Text style={[theme.fonts.titleSmall, { marginBottom: 12 }]}>
          Title Small ({fontFamily} SemiBold)
        </Text>

        <Text style={[theme.fonts.labelLarge, { marginBottom: 12 }]}>
          Label Large ({fontFamily} SemiBold)
        </Text>

        <Text style={[theme.fonts.labelMedium, { marginBottom: 12 }]}>
          Label Medium ({fontFamily} Medium)
        </Text>

        <Text style={[theme.fonts.labelSmall, { marginBottom: 12 }]}>
          Label Small ({fontFamily} Medium)
        </Text>

        <Text style={[theme.fonts.bodyLarge, { marginBottom: 12 }]}>
          Body Large ({fontFamily} Regular)
        </Text>

        <Text style={[theme.fonts.bodyMedium, { marginBottom: 12 }]}>
          Body Medium ({fontFamily} Regular)
        </Text>

        <Text style={[theme.fonts.bodySmall, { marginBottom: 16 }]}>
          Body Small ({fontFamily} Regular)
        </Text>

        <Text>{`UserData: ${JSON.stringify(
          userData,
        )}\n\nDataUpdatedAt: ${new Date(dataUpdatedAt)}`}</Text>
      </ScrollContainer>
    </Screen>
  );
});
