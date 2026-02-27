import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../theme/colors';

export const AccountScreen: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    await login('user@example.com', 'password');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
        </View>

        {!isAuthenticated ? (
          <View style={styles.authPrompt}>
            <Ionicons name="person-circle-outline" size={80} color={theme.colors.border} />
            <Text style={styles.authTitle}>Sign in to manage your trips</Text>
            <Text style={styles.authSubtitle}>
              View reservations, update preferences, and track your bookings
            </Text>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signupPrompt}>
              <Text style={styles.signupText}>Not a member? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.signupLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.profileSection}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={40} color={theme.colors.accent} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Mohammad Smith</Text>
                <Text style={styles.memberId}>Member ID: MS-2026-4721</Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Trips</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Years</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="settings-outline" size={24} color={theme.colors.textMuted} />
              <Text style={styles.menuItemText}>Account Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textDisabled} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle-outline" size={24} color={theme.colors.textMuted} />
              <Text style={styles.menuItemText}>Support & FAQ</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textDisabled} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="chatbubble-outline" size={24} color={theme.colors.textMuted} />
              <Text style={styles.menuItemText}>Leave Feedback</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textDisabled} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Legal</Text>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="document-text-outline" size={24} color={theme.colors.textMuted} />
              <Text style={styles.menuItemText}>Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textDisabled} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="shield-outline" size={24} color={theme.colors.textMuted} />
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textDisabled} />
          </TouchableOpacity>
        </View>

        {isAuthenticated && (
          <View style={styles.signOutSection}>
            <TouchableOpacity style={styles.signOutButton} onPress={logout}>
              <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  authPrompt: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 20,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface1,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  authSubtitle: {
    fontSize: 16,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 60,
    shadowColor: theme.colors.accent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
  },
  signupPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 15,
    color: theme.colors.textMuted,
  },
  signupLink: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textDisabled,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    minHeight: 56,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textPrimary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  version: {
    fontSize: 13,
    color: theme.colors.textDisabled,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(91, 103, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(91, 103, 241, 0.3)',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  memberId: {
    fontSize: 14,
    color: theme.colors.textMuted,
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.accent,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.borderLight,
    marginHorizontal: 12,
  },
  signOutSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});
