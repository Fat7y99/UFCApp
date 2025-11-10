export interface SmeFormState {
  // Step 1 fields
  liabilityType?: string;
  monthlyInstallment?: string;
  bankName?: string;
  remainingBalance?: string;
  
  // Step 2 fields
  businessActivityType?: string;
  crAge?: string;
  businessRegion?: string;
  businessType?: string;
  posAnnualPropertyIncome?: string;
  financialStatementAvailable?: string;
  
  // Metadata
  serviceId?: number;
  title?: string;
}

