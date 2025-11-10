import { useTranslation } from 'react-i18next';
import { Modal, View, Text } from 'react-native';
import { styles } from './styles';
import type { SmallModalTypes } from './types';
import React from 'react';
const SmallModal = ({
  title,
  description,
  testID,
  visible = false,

  onCancel,

  transaparent,

  numberNoOnboarding,
}: SmallModalTypes) => {
  const { t } = useTranslation();

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
      </View>
    </Modal>
  );
};

export default SmallModal;
