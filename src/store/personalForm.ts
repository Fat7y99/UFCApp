import { createSlice } from '@reduxjs/toolkit';
import type { PersonalFormState } from './personalForm.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: undefined,
  mobile: undefined,
  dob: undefined,
  employer: undefined,
  jobTitle: undefined,
  serviceStartDate: undefined,
  liabilityType: undefined,
  monthlyInstallment: undefined,
  bankName: undefined,
  remainingBalance: undefined,
  basicSalary: undefined,
  netSalary: undefined,
  currentBank: undefined,
  city: undefined,
  serviceId: undefined,
  title: undefined,
} as PersonalFormState;

export const personalFormSlice = createSlice({
  name: 'personalForm',
  initialState,
  reducers: {
    resetPersonalForm() {
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
  },
});

export const {
  resetPersonalForm,
  setServiceId,
  setTitle,
  setName,
  setMobile,
  setDob,
  setEmployer,
  setJobTitle,
  setServiceStartDate,
  setLiabilityType,
  setMonthlyInstallment,
  setBankName,
  setRemainingBalance,
  setBasicSalary,
  setNetSalary,
  setCurrentBank,
  setCity,
} = personalFormSlice.actions;

export default personalFormSlice.reducer;
