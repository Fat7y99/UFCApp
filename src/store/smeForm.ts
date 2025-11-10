import { createSlice } from '@reduxjs/toolkit';
import type { SmeFormState } from './smeForm.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  liabilityType: undefined,
  monthlyInstallment: undefined,
  bankName: undefined,
  remainingBalance: undefined,
  businessActivityType: undefined,
  crAge: undefined,
  businessRegion: undefined,
  businessType: undefined,
  posAnnualPropertyIncome: undefined,
  financialStatementAvailable: undefined,
  serviceId: undefined,
  title: undefined,
} as SmeFormState;

export const smeFormSlice = createSlice({
  name: 'smeForm',
  initialState,
  reducers: {
    resetSmeForm() {
      return initialState;
    },
    setServiceId(state, action: PayloadAction<number>) {
      state.serviceId = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    // Step 1 fields
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
    // Step 2 fields
    setBusinessActivityType(state, action: PayloadAction<string>) {
      state.businessActivityType = action.payload;
    },
    setCrAge(state, action: PayloadAction<string>) {
      state.crAge = action.payload;
    },
    setBusinessRegion(state, action: PayloadAction<string>) {
      state.businessRegion = action.payload;
    },
    setBusinessType(state, action: PayloadAction<string>) {
      state.businessType = action.payload;
    },
    setPosAnnualPropertyIncome(state, action: PayloadAction<string>) {
      state.posAnnualPropertyIncome = action.payload;
    },
    setFinancialStatementAvailable(state, action: PayloadAction<string>) {
      state.financialStatementAvailable = action.payload;
    },
  },
});

export const {
  resetSmeForm,
  setServiceId,
  setTitle,
  setLiabilityType,
  setMonthlyInstallment,
  setBankName,
  setRemainingBalance,
  setBusinessActivityType,
  setCrAge,
  setBusinessRegion,
  setBusinessType,
  setPosAnnualPropertyIncome,
  setFinancialStatementAvailable,
} = smeFormSlice.actions;

export default smeFormSlice.reducer;
