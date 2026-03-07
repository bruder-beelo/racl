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

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpScreenNavigationProp;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name);
      navigation.navigate('MainTabs');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'Unable to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreenLayout onBack={() => navigation.goBack()}>
      <View style={authStyles.content}>
        <Text style={authStyles.title}>Create account</Text>
        <Text style={authStyles.subtitle}>Sign up to get started</Text>

        <View style={authStyles.form}>
          <View style={authStyles.inputContainer}>
            <Text style={authStyles.label}>Name</Text>
            <TextInput
              style={authStyles.input}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textMuted}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              editable={!loading}
            />
          </View>

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
              placeholder="Create a password"
              placeholderTextColor={theme.colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              editable={!loading}
            />
          </View>

          <View style={authStyles.inputContainer}>
            <Text style={authStyles.label}>Confirm Password</Text>
            <TextInput
              style={authStyles.input}
              placeholder="Confirm your password"
              placeholderTextColor={theme.colors.textMuted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[authStyles.primaryButton, loading && authStyles.primaryButtonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.textOnAccent} />
            ) : (
              <Text style={authStyles.primaryButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={authStyles.footer}>
            <Text style={authStyles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={authStyles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AuthScreenLayout>
  );
};

