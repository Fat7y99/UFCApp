export interface CustomerBaseInfo {
  basicSalary?: number;
  birthDate?: string;
  city?: string;
  currentBank?: string;
  employer?: string;
  jobTitle?: string;
  name?: string;
  netSalary?: number;
  phone?: string;
  serviceStartDate?: string;
}

export interface CustomerLiability {
  bankName?: string;
  currency?: string;
  liabilityType?: string;
  monthlyInstallment?: number;
  remainingBalance?: number;
}

export interface PersonalApplicationRequestBody {
  customerBaseInfo?: CustomerBaseInfo;
  customerLiability?: CustomerLiability;
  serviceId?: number;
}

export interface RealEstateFinanceInfo {
  annualPropertyIncome?: number;
  financingType?: string;
  propertyAgeYears?: number;
  propertyCity?: string;
  propertyType?: string;
  propertyValue?: number;
}

export interface RealEstateApplicationRequestBody {
  appRealStateFinance?: RealEstateFinanceInfo;
  customerBaseInfo?: CustomerBaseInfo;
  customerLiability?: CustomerLiability;
  serviceId?: number;
}

export interface SmeFinanceInfo {
  businessActivityType?: string;
  businessRegion?: string;
  businessType?: string;
  crAgeYears?: number;
  financialStatementsAvailable?: boolean;
  posAnnualRevenue?: number;
}

export interface SmeApplicationRequestBody {
  appSmeFinance?: SmeFinanceInfo;
  customerLiability?: CustomerLiability;
  serviceId?: number;
}

export interface ApplicationResponse {
  id?: number;
  message?: string;
  success?: boolean;
}
