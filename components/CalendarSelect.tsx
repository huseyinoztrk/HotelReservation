import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated'

// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CalendarSelect = () => {
  const today = new Date().toISOString().substring(0, 10);
  const router = useRouter();
  
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="close-outline" size={28} />
      </TouchableOpacity>
      <Animated.Text entering={FadeIn} style={styles.cardHeader}>
        When's your trip?
      </Animated.Text>
      <Animated.View style={styles.cardBody}>
        <DatePicker
          current={today}
          selected={today}
          mode='calendar'
          options={{
            defaultFont: 'mon',
            headerFont: 'mon-sb',
            borderColor: 'transparent',
            mainColor: Colors.primary,
          }}
        />
      </Animated.View>
    </View>

  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 70,
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 10,
  },
  cardHeader: {
    fontFamily: 'mon-b',
    fontSize: 24,
    padding: 20,
    marginLeft: 40
  },
  cardBody: {
    paddingHorizontal: 20,
  },
})

export default CalendarSelect;