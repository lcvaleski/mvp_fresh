import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../design-system/components/Button';
import { colors, typography, spacing } from '../design-system/theme';

export const HomeScreen = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You are successfully authenticated</Text>
        
        {user?.email && (
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoText}>{user.email}</Text>
          </View>
        )}
        
        <View style={styles.actions}>
          <Button
            title="Sign Out"
            onPress={handleSignOut}
            variant="secondary"
            size="large"
            style={styles.signOutButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.nocturne,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.primary.white,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.primary.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
    opacity: 0.8,
  },
  userInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
    width: '100%',
  },
  userInfoLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary.white,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  userInfoText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.primary.white,
  },
  actions: {
    width: '100%',
  },
  signOutButton: {
    width: '100%',
  },
});