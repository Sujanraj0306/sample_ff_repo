export interface BlogComponent {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'video';
  content: string;
  style?: {
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    margin?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  components: BlogComponent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface DragItem {
  id: string;
  type: string;
  componentType?: 'heading' | 'paragraph' | 'image' | 'video';
}