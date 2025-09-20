import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../design-system/components/Button';
import { EnhancedInput } from '../../components/EnhancedInput';
import { Logo } from '../../design-system/components/Logo';
import { colors, typography, spacing } from '../../design-system/theme';

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle, signInWithApple } = useAuth();

  const isFormValid =
    !!email &&
    !!password &&
    !!confirmPassword &&
    validateEmail(email) &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleSignUp = async () => {
    setError('');
    setLoading(true);
    try {
      await signUp(email, password);
    } catch (err: any) {
      setError('Sign up failed. Please try again.');
      Alert.alert('Sign Up Error', 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError('Google sign up failed');
      Alert.alert('Sign Up Error', 'Google sign up failed');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAppleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithApple();
    } catch (err: any) {
      setError('Apple sign up failed');
      Alert.alert('Sign Up Error', 'Apple sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Logo />
        <Text style={styles.title}>Create Account</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <View style={styles.formFields}>
          <EnhancedInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            showClearButton
            animateLabel
            error={email && !validateEmail(email) ? 'Please enter a valid email' : ''}
          />
          <EnhancedInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            editable={!loading}
            animateLabel
            error={password && password.length < 6 ? 'Password must be at least 6 characters' : ''}
          />
          <EnhancedInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            editable={!loading}
            animateLabel
            error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : ''}
          />
        </View>
        
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          variant="primary"
          size="large"
          loading={loading}
          style={{ width: '100%' }}
          disabled={!isFormValid || loading}
        />
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <View style={styles.socialButtonsContainer}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleAppleSignIn}
              disabled={loading}
              activeOpacity={0.7}
            >
              <Text style={styles.socialButtonText}>Sign up with Apple</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleSignIn}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text style={styles.socialButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
          style={styles.loginLink}
        >
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginTextBold}>Login</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.primary.nocturne,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl * 2,
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    fontWeight: '700',
    marginBottom: spacing.xl * 2,
    marginTop: spacing.xl,
    textAlign: 'center',
    color: colors.primary.white,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  loginText: {
    color: colors.primary.white,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  loginTextBold: {
    color: colors.primary.white,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: colors.secondary.coral,
    marginBottom: spacing.sm,
    textAlign: 'center',
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
  },
  formFields: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
  },
  socialButtonsContainer: {
    marginTop: spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: spacing.md,
    width: '100%',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialButtonText: {
    color: colors.primary.white,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.bold,
  },
});