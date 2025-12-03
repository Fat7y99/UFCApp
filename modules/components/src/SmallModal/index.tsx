import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import type { SmallModalTypes } from './types';
const SmallModal = ({
  title,
  description,
  testID,
  visible = false,

  onCancel,

  transaparent,

  numberNoOnboarding,
  buttons,
}: SmallModalTypes) => {
  const {} = useTranslation();

  return (
    <Modal
      testID={testID}
      animationType="fade"
      transparent={transaparent ?? false}
      visible={visible}
      statusBarTranslucent={true}
      onDismiss={onCancel}
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <View style={styles.modal}>
          {title && (
            <Text style={styles.title}>
              {title}
              {numberNoOnboarding && (
                <Text style={styles.numberNoOnboarding}>
                  {numberNoOnboarding}
                </Text>
              )}
            </Text>
          )}

          {description && (
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          )}

          {buttons && buttons.length > 0 && (
            <View style={styles.buttonsContainer}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    button.isPrimary
                      ? styles.primaryButton
                      : styles.secondaryButton,
                    index > 0 && styles.buttonSpacing,
                  ]}
                  onPress={button.onPress}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      button.isPrimary
                        ? styles.primaryButtonText
                        : styles.secondaryButtonText,
                    ]}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SmallModal;
