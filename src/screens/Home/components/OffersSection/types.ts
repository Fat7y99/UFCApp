export interface Offer {
  id: string;
  title: string;
  description: string;
}

export interface OffersSectionProps {
  offers?: Offer[];
}
