export interface RealEstateFormState {
  // Step 1 fields (customerBaseInfo)
  name?: string;
  mobile?: string;
  dob?: string;
  employer?: string;
  jobTitle?: string;
  serviceStartDate?: string;
  basicSalary?: string;
  netSalary?: string;
  currentBank?: string;
  city?: string;

  // Step 2 fields (customerLiability)
  liabilityType?: string;
  monthlyInstallment?: string;
  bankName?: string;
  remainingBalance?: string;

  // Step 3 fields (appRealStateFinance)
  realEstateFinancingType?: string;
  propertyType?: string;
  propertyValue?: string;
  propertyAge?: string;
  propertyCity?: string;
  annualPropertyIncome?: string;

  // Metadata
  serviceId?: number;
  title?: string;
}
