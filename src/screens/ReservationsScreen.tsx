import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

export const ReservationsScreen: React.FC = () => {
  const { isAuthenticated, login } = useAuth();

  const handleLogin = async () => {
    await login('user@example.com', 'password');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My Reservations</Text>
        </View>

        {!isAuthenticated ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={80} color="#333" />
            <Text style={styles.emptyTitle}>No Trips Yet</Text>
            <Text style={styles.emptySubtitle}>
              Sign in to book your first car
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
          <View style={styles.authenticatedContent}>
            <Ionicons name="calendar-outline" size={64} color="#333" />
            <Text style={styles.placeholderTitle}>No upcoming trips</Text>
            <Text style={styles.placeholderSubtitle}>Book a car to see your reservations here</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 24,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#5B67F1',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 60,
    shadowColor: '#5B67F1',
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
    color: '#fff',
    letterSpacing: 0.5,
  },
  signupPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  signupText: {
    fontSize: 15,
    color: '#888',
  },
  signupLink: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5B67F1',
  },
  authenticatedContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
});
