
export enum MenuType {
  POSE = 'pose',
  EXPRESSION = 'expression',
  ANGLE = 'angle'
}

export interface SelectionItem {
  id: string;
  label: string;
  category: string;
  description: string;
  icon?: string;
}

export interface AppState {
  originalImage: string | null;
  generatedImage: string | null;
  selectedGender: 'Male' | 'Female' | null;
  selectedPose: SelectionItem | null;
  selectedExpression: SelectionItem | null;
  selectedAngle: SelectionItem | null;
  isAnalyzing: boolean;
  isGenerating: boolean;
  aiRecommendation: string | null;
}
