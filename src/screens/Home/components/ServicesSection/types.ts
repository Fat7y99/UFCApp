export interface FinancingOption {
  id: number;
  title: string;
  icon: () => React.ReactNode;
  description: string;
  onPress: () => void;
}
