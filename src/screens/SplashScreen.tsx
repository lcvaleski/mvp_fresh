import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '../design-system/components/Button';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/types';
import { colors } from '../design-system/theme';

const { width, height } = Dimensions.get('window');

type SplashScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Splash'>;

export const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  
  return (
    <LinearGradient
      colors={[colors.primary.nocturne, colors.primary.orchid]}
      locations={[0.0729, 0.9266]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1.1066 }}
      style={styles.gradient}
    >
      {/* Centered logo and text */}
      <View style={styles.centerContent}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>MVP</Text>
        </View>
        <Text style={styles.appName}>Auth MVP</Text>
      </View>
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={() => {
            console.log('Continue button pressed, navigating to SignUp');
            navigation.navigate('SignUp');
          }}
          variant="secondary"
          size="medium"
          style={{ width: '75%' }}
        />
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: height * 0.1,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: colors.primary.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoText: {
    color: colors.primary.orchid,
    fontSize: 24,
    fontWeight: 'bold',
  },
  appName: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '500',
    color: colors.primary.white,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.15,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  link: {
    padding: 8,
    marginTop: 16,
  },
  linkText: {
    color: colors.primary.white,
    fontSize: 16,
  },
});