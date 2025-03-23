import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Button, Text, Card, Divider, Surface, Title, useTheme } from 'react-native-paper'
import { signOut } from '@/services/auth';
import { useAuth } from '@/store/AuthContext';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const windowHeight = Dimensions.get('window').height;
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  }

  return (
    <ScrollView 
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={[styles.container, { minHeight: windowHeight * 0.9 }]}>
        <Surface style={styles.header} elevation={4}>
          <View style={styles.avatarContainer}>
            <EvilIcons name="user" size={120} color={theme.colors.primary} />
          </View>
          <Title style={styles.name}>{user?.displayName || user?.username}</Title>
          {user?.email && <Text style={styles.email}>{user.email}</Text>}
        </Surface>

        <Card style={styles.infoCard}>
          <Card.Title title="Account Information" />
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Username:</Text>
              <Text style={styles.infoValue}>{user?.username}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>User ID:</Text>
              <Text style={styles.infoValue}>{user?.uid}</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Role:</Text>
              <Text style={styles.infoValue}>{user?.role || 'Unknown'}</Text>
            </View>
          </Card.Content>
        </Card>

        <Button 
          mode="contained" 
          icon="logout" 
          onPress={handleSignOut}
          style={styles.logoutButton}
        >
          Sign Out
        </Button>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 16,
    marginTop: 40,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    marginTop: 8,
    opacity: 0.8,
    fontSize: 16,
    textAlign: 'center',
  },
  infoCard: {
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoLabel: {
    fontWeight: 'bold',
    opacity: 0.7,
    fontSize: 16,
  },
  infoValue: {
    textAlign: 'right',
    fontSize: 16,
  },
  divider: {
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 24,
    marginBottom: 30,
    paddingVertical: 8,
    borderRadius: 10,
    width: '100%'
  }
})
