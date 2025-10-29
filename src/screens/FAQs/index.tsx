import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import type { RootStackParamList } from '@src/navigation';
import { AppImages } from '@modules/assets';
import { Screen, NotificationButton } from '@modules/components';
import { AppColors } from '@modules/theme';
import styles from './styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Question number one',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: '2',
      question: 'Question number two',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: '3',
      question: 'Question number three',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: '4',
      question: 'Question number four',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    {
      id: '5',
      question: 'Question number five',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
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
          <Image source={AppImages.leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQs</Text>
        <NotificationButton />
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
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default FAQsScreen;
