import { createSlice } from '@reduxjs/toolkit';
import type { RealEstateFormState } from './realEstateForm.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: undefined,
  mobile: undefined,
  dob: undefined,
  employer: undefined,
  jobTitle: undefined,
  serviceStartDate: undefined,
  basicSalary: undefined,
  netSalary: undefined,
  currentBank: undefined,
  city: undefined,
  liabilityType: undefined,
  monthlyInstallment: undefined,
  bankName: undefined,
  remainingBalance: undefined,
  realEstateFinancingType: undefined,
  propertyType: undefined,
  propertyValue: undefined,
  propertyAge: undefined,
  propertyCity: undefined,
  annualPropertyIncome: undefined,
  serviceId: undefined,
  title: undefined,
} as RealEstateFormState;

export const realEstateFormSlice = createSlice({
  name: 'realEstateForm',
  initialState,
  reducers: {
    resetRealEstateForm() {
      return initialState;
    },
    setServiceId(state, action: PayloadAction<number>) {
      state.serviceId = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    // Step 1 fields
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setMobile(state, action: PayloadAction<string>) {
      state.mobile = action.payload;
    },
    setDob(state, action: PayloadAction<string>) {
      state.dob = action.payload;
    },
    setEmployer(state, action: PayloadAction<string>) {
      state.employer = action.payload;
    },
    setJobTitle(state, action: PayloadAction<string>) {
      state.jobTitle = action.payload;
    },
    setServiceStartDate(state, action: PayloadAction<string>) {
      state.serviceStartDate = action.payload;
    },
    setBasicSalary(state, action: PayloadAction<string>) {
      state.basicSalary = action.payload;
    },
    setNetSalary(state, action: PayloadAction<string>) {
      state.netSalary = action.payload;
    },
    setCurrentBank(state, action: PayloadAction<string>) {
      state.currentBank = action.payload;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    // Step 2 fields
    setLiabilityType(state, action: PayloadAction<string>) {
      state.liabilityType = action.payload;
    },
    setMonthlyInstallment(state, action: PayloadAction<string>) {
      state.monthlyInstallment = action.payload;
    },
    setBankName(state, action: PayloadAction<string>) {
      state.bankName = action.payload;
    },
    setRemainingBalance(state, action: PayloadAction<string>) {
      state.remainingBalance = action.payload;
    },
    // Step 3 fields
    setRealEstateFinancingType(state, action: PayloadAction<string>) {
      state.realEstateFinancingType = action.payload;
    },
    setPropertyType(state, action: PayloadAction<string>) {
      state.propertyType = action.payload;
    },
    setPropertyValue(state, action: PayloadAction<string>) {
      state.propertyValue = action.payload;
    },
    setPropertyAge(state, action: PayloadAction<string>) {
      state.propertyAge = action.payload;
    },
    setPropertyCity(state, action: PayloadAction<string>) {
      state.propertyCity = action.payload;
    },
    setAnnualPropertyIncome(state, action: PayloadAction<string>) {
      state.annualPropertyIncome = action.payload;
    },
  },
});

export const {
  resetRealEstateForm,
  setServiceId,
  setTitle,
  setName,
  setMobile,
  setDob,
  setEmployer,
  setJobTitle,
  setServiceStartDate,
  setBasicSalary,
  setNetSalary,
  setCurrentBank,
  setCity,
  setLiabilityType,
  setMonthlyInstallment,
  setBankName,
  setRemainingBalance,
  setRealEstateFinancingType,
  setPropertyType,
  setPropertyValue,
  setPropertyAge,
  setPropertyCity,
  setAnnualPropertyIncome,
} = realEstateFormSlice.actions;

export default realEstateFormSlice.reducer;
