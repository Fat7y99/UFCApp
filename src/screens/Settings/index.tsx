import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '@src/store';
import { Screen } from '@modules/components';

import { SettingsHeader, ProfileSection, SettingsOptions } from './components';

export default () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const currenUser = useAppSelector(state => state.user.user);

  React.useEffect(() => {
    setImageUrl(currenUser?.imageUrl as string);
  }, [currenUser?.imageUrl]);
  const onChangeImageUrl = useCallback(
    (uri?: string) => {
      setImageUrl(uri);
    },
    [setImageUrl],
  );
  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Settings Header */}
        <SettingsHeader imageUrl={imageUrl} />

        {/* Profile Section */}
        <ProfileSection onChangeImageUrl={onChangeImageUrl} />

        {/* Settings Options */}
        <SettingsOptions />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: ResponsiveDimensions.vs(20),
  },
});
