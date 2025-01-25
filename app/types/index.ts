export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "parent" | "child";
  createdAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  grade?: string;
  color: string;
  settings: Record<string, any>;
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  type: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  recurring?: {
    frequency: "daily" | "weekly" | "monthly";
    days?: number[];
    endDate?: Date;
  };
  createdBy: string;
}

export interface ActivityAssignment {
  id: string;
  activityId: string;
  userId: string;
  checklist?: {
    items: Array<{
      id: string;
      text: string;
      completed: boolean;
    }>;
  };
  status: "pending" | "ready" | "completed";
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status: "planned" | "in_progress" | "completed";
  assignedTo: string;
  materials?: {
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      acquired: boolean;
    }>;
  };
  progress: number;
}

export interface ExamSchedule {
  id: string;
  userId: string;
  subject: string;
  examDate: Date;
  duration: number;
  priority: "low" | "medium" | "high";
  studyBlocks?: Array<{
    date: Date;
    duration: number;
    completed: boolean;
  }>;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  status: "unread" | "read";
  createdAt: Date;
}
