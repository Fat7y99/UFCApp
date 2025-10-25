import React, { useRef, useEffect } from 'react';
import { View, ImageBackground, FlatList } from 'react-native';
import { AppImages } from '@modules/assets';
import { styles } from './styles';

const BannerSection: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);

  const banners = [
    { id: '1', source: AppImages.banner1 },
    { id: '2', source: AppImages.banner1 },
    { id: '3', source: AppImages.banner1 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % banners.length;
      try {
        flatListRef.current?.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      } catch (error) {
        // Handle scroll error gracefully
        console.log('Scroll error:', error);
      }
    }, 3000); // Auto scroll every 3 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const renderBanner = ({ item }: { item: { id: string; source: any } }) => (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={item.source}
        style={styles.banner}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderBanner}
        keyExtractor={item => item.id}
        horizontal
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        onMomentumScrollEnd={event => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
          currentIndex.current = index;
        }}
      />
    </View>
  );
};

export default BannerSection;
