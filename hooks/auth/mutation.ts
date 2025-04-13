import { useMutation } from '@tanstack/react-query';

import { oauthLogin } from '~/utils/services/auth';

export const useOAuthLogin = () => {
  return useMutation({
    mutationFn: (payload: any) => oauthLogin(payload),
  });
};
