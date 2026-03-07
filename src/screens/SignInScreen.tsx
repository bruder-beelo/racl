import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../theme/colors';
import { AuthScreenLayout } from '../components/AuthScreenLayout';
import { authStyles } from '../styles/authStyles';

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigation.navigate('MainTabs');
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreenLayout onBack={() => navigation.goBack()}>
      <View style={authStyles.content}>
        <Text style={authStyles.title}>Welcome back</Text>
        <Text style={authStyles.subtitle}>Sign in to your account</Text>

        <View style={authStyles.form}>
          <View style={authStyles.inputContainer}>
            <Text style={authStyles.label}>Email</Text>
            <TextInput
              style={authStyles.input}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!loading}
            />
          </View>

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.label}>Password</Text>
            <TextInput
              style={authStyles.input}
              placeholder="Enter your password"
              placeholderTextColor={theme.colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[authStyles.primaryButton, loading && authStyles.primaryButtonDisabled]}
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.8}
          >
<<<<<<< HEAD
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
            </View>
=======
            {loading ? (
              <ActivityIndicator color={theme.colors.textOnAccent} />
            ) : (
              <Text style={authStyles.primaryButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
>>>>>>> d2b9600 (fix shared components)

          <View style={authStyles.footer}>
            <Text style={authStyles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={authStyles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthScreenLayout>
  );
};

