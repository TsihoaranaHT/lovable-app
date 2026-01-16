import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { submitLead } from '@/api/services/leads.service';
import type { LeadSubmission } from '@/types';

export function useLeadSubmission() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LeadSubmission) => submitLead(data),
    onSuccess: (response) => {
      if (response.data?.redirectUrl) {
        navigate(response.data.redirectUrl);
      }
    },
  });
}
