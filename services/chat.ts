import Constants from 'expo-constants';
import httpInstance from './httpInstance';

const WS_URL = process.env.EXPO_PUBLIC_WS_URL || `ws://${Constants.expoConfig?.hostUri?.split(':')[0]}:8080`;

// Define chat message types
export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO date string
  status: 'SENT' | 'DELIVERED' | 'READ';
}

// Matches RecordedMessage from the backend
export interface RecordedMessage extends ChatMessage {}

// Type of chat (group or private)
export type ChatType = 'group' | 'private';

// Message types for WebSocket
export interface OutgoingMessage {
  type: 'MESSAGE' | 'STATUS_UPDATE';
  senderId?: string;
  content?: string;
  messageId?: string;
  status?: string;
}

// Connection parameters
export interface ChatConnectionParams {
  username: string;
  chatType: ChatType;
  rideId?: string;
  receiverId?: string;
}

// Event handlers
export interface ChatEventHandlers {
  onConnect?: () => void;
  onMessage?: (messages: ChatMessage[]) => void;
  onHistoryLoaded?: (messages: RecordedMessage[]) => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
}

// Chat connection class
export class ChatConnection {
  private socket: WebSocket | null = null;
  private handlers: ChatEventHandlers;
  private connectionParams: ChatConnectionParams;

  constructor(params: ChatConnectionParams, handlers: ChatEventHandlers = {}) {
    this.connectionParams = params;
    this.handlers = handlers;
  }

  async connect(): Promise<void> {
    const { username, chatType, rideId, receiverId } = this.connectionParams;
    let wsUrl = `${WS_URL}/chat`;

    if (chatType === "group" && rideId) {
      wsUrl += `?rideId=${rideId}`;
    } else if (chatType === "private" && receiverId) {
      wsUrl += `?senderId=${username}&receiverId=${receiverId}`;
    } else {
      throw new Error("Invalid chat parameters");
    }
    
    // Load chat history before connecting to WebSocket
    try {
      let historyParams: Parameters<typeof loadChatHistory>[0] = {};
      
      if (chatType === "group" && rideId) {
        historyParams.rideId = rideId;
      } else if (chatType === "private" && receiverId) {
        historyParams.senderId = username;
        historyParams.receiverId = receiverId;
      }
      
      const history = await loadChatHistory(historyParams);
      if (this.handlers.onHistoryLoaded) {
        this.handlers.onHistoryLoaded(history);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
    
    // Connect to WebSocket
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log("Connected to WebSocket:", wsUrl);
      if (this.handlers.onConnect) this.handlers.onConnect();
    };

    this.socket.onmessage = (event) => {
      try {
        const messages = JSON.parse(event.data);
        console.log("Parsed Messages:", messages);

        if (Array.isArray(messages) && this.handlers.onMessage) {
          this.handlers.onMessage(messages);
        } else {
          console.error("Unexpected WebSocket data format:", messages);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", event.data, error);
      }
    };

    this.socket.onclose = () => {
      if (this.handlers.onDisconnect) this.handlers.onDisconnect();
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
      if (this.handlers.onError) this.handlers.onError(error);
    };
  }

  sendMessage(content: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    const message: OutgoingMessage = {
      type: "MESSAGE",
      senderId: this.connectionParams.username,
      content: content,
    };

    this.socket.send(JSON.stringify(message));
  }

  markAsRead(messageId: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    const statusUpdate: OutgoingMessage = {
      type: "STATUS_UPDATE",
      messageId: messageId,
      status: "READ"
    };

    this.socket.send(JSON.stringify(statusUpdate));
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.readyState === WebSocket.OPEN;
  }
}

/**
 * Load chat history from the server
 * @param params Parameters to identify which chat history to load
 * @returns List of chat messages
 */
export const loadChatHistory = async (
  params: {
    rideId?: string;
    senderId?: string;
    receiverId?: string;
  }
): Promise<RecordedMessage[]> => {
  try {
    // Set up query parameters based on provided values
    const queryParams = new URLSearchParams();
    
    if (params.rideId) {
      queryParams.append('rideId', params.rideId);
    }
    
    if (params.senderId) {
      queryParams.append('senderId', params.senderId);
    }
    
    if (params.receiverId) {
      queryParams.append('receiverId', params.receiverId);
    }
    
    // Make the request
    const response = await httpInstance.get(`/chat/history?${queryParams.toString()}`);
    return response.data as RecordedMessage[];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
};