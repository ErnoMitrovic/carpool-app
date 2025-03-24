import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView
} from 'react-native';
import { ChatConnection, ChatMessage, ChatType } from '@/services/chat';
import { useAuth } from '@/store/AuthContext';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, useTheme } from 'react-native-paper';

// Mock data for testing - replace with actual data from backend
const MOCK_RIDES = [
  { id: 'ride1', name: 'Trip to Berlin' },
  { id: 'ride2', name: 'Daily Commute' },
];

const MOCK_USERS = [
  { id: 'user1', name: 'Alice' },
  { id: 'user2', name: 'Bob' },
];

const ChatScreen = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [selectedChat, setSelectedChat] = useState<{ id: string, name: string, type: ChatType } | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const chatConnection = useRef<ChatConnection | null>(null);

  // Handle chat selection
  const selectChat = (id: string, name: string, type: ChatType) => {
    if (chatConnection.current?.isConnected()) {
      chatConnection.current.disconnect();
    }

    setSelectedChat({ id, name, type });
    setMessages([]);
    
    // Connect to WebSocket for the selected chat
    if (user?.username) {
      chatConnection.current = new ChatConnection(
        {
          username: user.username,
          chatType: type,
          ...(type === 'group' ? { rideId: id } : { receiverId: id }),
        },
        {
          onConnect: () => {
            setIsConnected(true);
          },
          onMessage: (receivedMessages) => {
            setMessages(receivedMessages);
          },
          onDisconnect: () => {
            setIsConnected(false);
          },
          onError: (error) => {
            console.error('Chat error:', error);
          },
        }
      );
      
      chatConnection.current.connect();
    }
  };

  // Send a message
  const sendMessage = () => {
    if (!messageText.trim() || !chatConnection.current) return;
    
    chatConnection.current.sendMessage(messageText);
    setMessageText('');
  };

  // Mark a message as read
  const markAsRead = (messageId: string) => {
    if (chatConnection.current) {
      chatConnection.current.markAsRead(messageId);
      
      // Update UI optimistically
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId 
            ? { ...msg, status: 'READ' } 
            : msg
        )
      );
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chatConnection.current?.isConnected()) {
        chatConnection.current.disconnect();
      }
    };
  }, []);

  // Message item component
  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMe = item.senderId === user?.username;
    
    return (
      <View style={[styles.messageContainer, isMe ? styles.sentMessage : styles.receivedMessage]}>
        {!isMe && <Text style={styles.sender}>{item.senderId}</Text>}
        <Text style={styles.messageText}>{item.content}</Text>
        <View style={styles.messageFooter}>
          <Text style={styles.timestamp}>
            {new Date(item.timestamp).toLocaleTimeString()}
          </Text>
          {isMe && (
            <TouchableOpacity 
              onPress={() => item.status !== 'READ' && markAsRead(item.id)}
              disabled={item.status === 'READ'}
            >
              <Text 
                style={[
                  styles.status, 
                  item.status === 'READ' ? styles.readStatus : styles.unreadStatus
                ]}
              >
                {item.status}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style="auto" />
      
      {!selectedChat ? (
        <View style={styles.chatSelection}>
          <Text style={styles.header}>Chats</Text>
          
          <Text style={styles.sectionTitle}>Group Chats (Rides)</Text>
          {MOCK_RIDES.map(ride => (
            <TouchableOpacity 
              key={ride.id}
              style={styles.chatOption}
              onPress={() => selectChat(ride.id, ride.name, 'group')}
            >
              <Text style={styles.chatName}>{ride.name}</Text>
            </TouchableOpacity>
          ))}
          
          <Text style={styles.sectionTitle}>Private Chats</Text>
          {MOCK_USERS.map(user => (
            <TouchableOpacity 
              key={user.id}
              style={styles.chatOption}
              onPress={() => selectChat(user.id, user.name, 'private')}
            >
              <Text style={styles.chatName}>{user.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <KeyboardAvoidingView 
          style={styles.chatContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelectedChat(null)}>
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.chatTitle}>{selectedChat.name}</Text>
            <Text style={[styles.connectionStatus, isConnected ? styles.connectedStatus : styles.disconnectedStatus]}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
          
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            style={styles.messagesList}
            inverted={false}
          />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={messageText}
              onChangeText={setMessageText}
              placeholder="Type a message..."
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatSelection: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: Colors.light.tint,
  },
  chatOption: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '500',
  },
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  connectionStatus: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  connectedStatus: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  disconnectedStatus: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  messagesList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 8,
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.light.tint,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 13,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginRight: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
  },
  readStatus: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  unreadStatus: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 12,
    paddingTop: 12, // Fix for Android
    maxHeight: 100, // Limit height for multiline
  },
  sendButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ChatScreen;
