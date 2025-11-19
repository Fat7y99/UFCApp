import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';

import type { RootStackParamList } from '@src/navigation';
import { AppImages } from '@modules/assets';
import { Screen } from '@modules/components';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';
import { AppColors } from '@modules/theme';
import styles from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const isRTL = I18nManager.isRTL;

const FAQsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const faqs: FAQ[] = [
    {
      id: '1',
      question: translate(`${TranslationNamespaces.HELP}:question1`),
      answer: translate(`${TranslationNamespaces.HELP}:answer1`),
    },
    {
      id: '2',
      question: translate(`${TranslationNamespaces.HELP}:question2`),
      answer: translate(`${TranslationNamespaces.HELP}:answer2`),
    },
    {
      id: '3',
      question: translate(`${TranslationNamespaces.HELP}:question3`),
      answer: translate(`${TranslationNamespaces.HELP}:answer3`),
    },
    {
      id: '4',
      question: translate(`${TranslationNamespaces.HELP}:question4`),
      answer: translate(`${TranslationNamespaces.HELP}:answer4`),
    },
    {
      id: '5',
      question: translate(`${TranslationNamespaces.HELP}:question5`),
      answer: translate(`${TranslationNamespaces.HELP}:answer5`),
    },
    {
      id: '6',
      question: translate(`${TranslationNamespaces.HELP}:question6`),
      answer: translate(`${TranslationNamespaces.HELP}:answer6`),
    },
    {
      id: '7',
      question: translate(`${TranslationNamespaces.HELP}:question7`),
      answer: translate(`${TranslationNamespaces.HELP}:answer7`),
    },
  ];

  const handleQuestionPress = (faq: FAQ) => {
    navigation.navigate('faqDetails', { faq });
  };

  return (
    <Screen
      style={styles.container}
      showNavigationBar={false}
      statusBarColor={AppColors.themeLight.primary_1}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={AppImages.leftArrow}
            style={[isRTL && { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isRTL && { textAlign: 'left' }]}>
          {translate(`${TranslationNamespaces.HELP}:faqsTitle`)}
        </Text>
      </View>

      {/* FAQs List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={faq.id}
              style={[
                styles.questionItem,
                index !== faqs.length - 1 && styles.questionBorder,
              ]}
              onPress={() => handleQuestionPress(faq)}
            >
              <Text style={styles.questionText}>{faq.question}</Text>
              <Image
                source={AppImages.chevronRight}
                style={[
                  styles.chevronIcon,
                  isRTL && { transform: [{ scaleX: -1 }] },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default FAQsScreen;
