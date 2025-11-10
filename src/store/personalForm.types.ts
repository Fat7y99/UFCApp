export interface PersonalFormState {
  // Step 1 fields (customerBaseInfo)
  name?: string;
  mobile?: string;
  dob?: string;
  employer?: string;
  jobTitle?: string;
  serviceStartDate?: string;

  // Step 2 fields (customerLiability)
  liabilityType?: string;
  monthlyInstallment?: string;
  bankName?: string;
  remainingBalance?: string;

  // Step 3 fields (additional customerBaseInfo)
  basicSalary?: string;
  netSalary?: string;
  currentBank?: string;
  city?: string;

  // Metadata
  serviceId?: number;
  title?: string;
}
