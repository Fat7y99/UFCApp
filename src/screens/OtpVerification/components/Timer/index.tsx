import { ResponsiveDimensions } from '@eslam-elmeniawy/react-native-common-components';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { translate } from '@modules/localization';
import { TranslationNamespaces } from '@modules/localization/src/enums';

interface TimerProps {
  timeLeft: number;
  onResend: () => void;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, onResend }) => {
  const [currentTime, setCurrentTime] = useState(timeLeft);
  console.log('timeLeft', timeLeft, currentTime);
  useEffect(() => {
    setCurrentTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (currentTime > 0) {
      const timer = setTimeout(() => {
        setCurrentTime(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {translate(`${TranslationNamespaces.LOGIN}:otpTimer`)}{' '}
        {formatTime(currentTime)}
      </Text>
      {currentTime === 0 && (
        <TouchableOpacity onPress={onResend} style={styles.resendButton}>
          <Text style={styles.resendText}>
            {translate(`${TranslationNamespaces.LOGIN}:resendOtp`)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  timerText: {
    color: 'white',
    fontSize: ResponsiveDimensions.vs(14),
    marginBottom: ResponsiveDimensions.vs(10),
  },
  resendButton: {
    paddingVertical: ResponsiveDimensions.vs(8),
    paddingHorizontal: ResponsiveDimensions.vs(16),
  },
  resendText: {
    color: '#00FFFF', // Cyan color
    fontSize: ResponsiveDimensions.vs(14),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Timer;
