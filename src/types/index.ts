export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  timestamp: string; // ISO string
  formattedDate: string;
  status: 'unread' | 'read' | 'replied';
  source?: 'localStorage' | 'googleSheets';
}

export interface UserContactCard {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  skills: string[];
  favorite?: boolean;
  createdAt: string;
}

export interface LikeCardItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  initialLiked: boolean;
  likesCount: number;
  iconName?: string;
}

export interface GoogleSheetsConfig {
  scriptUrl: string;
  sheetName: string;
  syncEnabled: boolean;
  lastSynced?: string;
}
