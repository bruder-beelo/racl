import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authStyles } from '../styles/authStyles';

interface AuthScreenLayoutProps {
  children: ReactNode;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const AuthScreenLayout: React.FC<AuthScreenLayoutProps> = ({
  children,
  onBack,
  showBackButton = true,
}) => {
  return (
    <View style={authStyles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={authStyles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={authStyles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={authStyles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {showBackButton && onBack && (
              <View style={authStyles.header}>
                <TouchableOpacity
                  style={authStyles.backButton}
                  onPress={onBack}
                >
                  <Text style={authStyles.backButtonText}>←</Text>
                </TouchableOpacity>
              </View>
            )}
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
