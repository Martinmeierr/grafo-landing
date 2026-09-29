'use client';

import { createContext, useContext, useState, type Dispatch, type SetStateAction, type ReactNode } from 'react';
import type { AnswerMap } from '@/lib/content';

type ConsultationContextValue = {
  answers: AnswerMap;
  stepIndex: number;
  setAnswers: Dispatch<SetStateAction<AnswerMap>>;
  setStepIndex: Dispatch<SetStateAction<number>>;
  selectService: (service: string) => void;
};

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [stepIndex, setStepIndex] = useState(0);

  const selectService = (service: string) => {
    setAnswers((current) => ({ ...current, servicio: service }));
    setStepIndex(1);
  };

  return <ConsultationContext.Provider value={{ answers, stepIndex, setAnswers, setStepIndex, selectService }}>{children}</ConsultationContext.Provider>;
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) throw new Error('useConsultation must be used inside ConsultationProvider');
  return context;
}
