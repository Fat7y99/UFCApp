/**"appRealStateFinance": {
    "annualPropertyIncome": 120000,
    "financingType": "Real Estate Purchase",
    "propertyAgeYears": 5,
    "propertyCity": "Jeddah",
    "propertyType": "Residential",
    "propertyValue": 1500000
  },
  "customerBaseInfo": {
    "basicSalary": 5000,
    "birthDate": "2025-11-12T03:45:51.483Z",
    "city": "Riyadh",
    "currentBank": "National Bank",
    "employer": "Tech Solutions Inc.",
    "jobTitle": "Software Engineer",
    "name": "John Doe",
    "netSalary": 4500,
    "phone": "+966501234567",
    "serviceStartDate": "2025-11-12T03:45:51.483Z"
  },
  "customerLiability": {
    "bankName": "First National Bank",
    "liabilityType": "Credit Card",
    "monthlyInstallment": 500,
    "remainingBalance": 10000
  }, */
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
