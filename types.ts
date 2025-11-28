export interface LinearTicket {
  id: string;
  title: string;
  description: string;
  status: 'Backlog' | 'Todo' | 'In Progress' | 'Done' | 'Canceled';
  priority: 'No Priority' | 'Low' | 'Medium' | 'High' | 'Urgent';
  assignee: string;
  labels: string[];
  team: string;
  project?: string;
  codeContext?: {
    file: string;
    line: number;
    snippet: string;
  };
}


export interface CodeFile {
  name: string;
  language: string;
  content: string;
  todoLine: number;
}
