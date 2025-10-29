import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import type { RootStackScreenProps } from '@src/navigation';
import { AppImages } from '@modules/assets';
import { Screen, NotificationButton } from '@modules/components';
import { AppColors } from '@modules/theme';
import styles from './styles';

export default React.memo((props: RootStackScreenProps<'faqDetails'>) => {
  const { route } = props;
  const navigation = useNavigation();
  const { faq } = route.params;

  return (
    <Screen
      style={styles.container}
      showNavigationBar={false}
      statusBarColor={AppColors.themeLight.primary_1}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={AppImages.leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <NotificationButton />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.contentCard}>
          {/* Question */}
          <Text style={styles.questionText}>{faq.question}</Text>

          {/* Answer */}
          <Text style={styles.answerText}>{faq.answer}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
});
