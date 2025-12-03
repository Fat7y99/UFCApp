export interface SmallModalButton {
  text: string;
  onPress: () => void;
  isPrimary?: boolean;
}

export interface SmallModalTypes {
  title?: string;
  description?: string;
  testID?: string;
  visible: boolean;
  onCancel?: () => void;
  transaparent?: boolean;
  numberNoOnboarding?: string;
  buttons?: SmallModalButton[];
}
