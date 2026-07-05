export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string;
  premiumStatus: 'free' | 'basic' | 'pro' | 'lifetime';
  role: 'student' | 'admin';
  createdAt: string;
}

export interface University {
  id: string;
  name: string;
  shortName: string;
  location: string;
  description: string;
  logoUrl?: string;
  semesters: number;
}

export interface Note {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  universityId: string;
  semester: number;
  author: string;
  content: string; // Markdown / Text content
  pdfUrl?: string; // Optional download link
  downloadCount: number;
  viewCount: number;
  createdAt: string;
  isPremium?: boolean;
}

export interface QuestionPaper {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  universityId: string;
  year: number;
  semester: number;
  pdfUrl: string;
  downloadCount: number;
  createdAt: string;
}

export interface CaseLaw {
  id: string;
  title: string; // e.g. Kesavananda Bharati v. State of Kerala
  citation: string; // e.g. (1973) 4 SCC 225
  court: string; // e.g. Supreme Court of India
  year: number;
  subjectId?: string;
  facts: string;
  issues: string;
  judgement: string;
  ratio: string;
  keywords: string[];
  importantPoints: string[];
  relatedCases?: string[];
  isPremium?: boolean;
}

export interface BareActSection {
  id: string;
  number: string; // e.g. "Section 300"
  title: string; // e.g. "Murder"
  content: string; // Legal description
  illustration?: string; // e.g. "A shoots B. This is murder."
}

export interface BareActChapter {
  id: string;
  number: string; // e.g. "Chapter XVI"
  title: string; // e.g. "Of Offences Affecting the Human Body"
  sections: BareActSection[];
}

export interface BareAct {
  id: string;
  title: string; // e.g. "Bharatiya Nyaya Sanhita, 2023"
  shortTitle: string; // e.g. "BNS"
  chapters: BareActChapter[];
  enactmentYear: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  subject?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  tags: string[];
  date: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'note' | 'case_law' | 'bare_act_section' | 'question_paper';
  itemTitle: string;
  itemSubtitle?: string;
  createdAt: string;
}

export interface DownloadHistory {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'note' | 'question_paper';
  itemTitle: string;
  downloadedAt: string;
}
