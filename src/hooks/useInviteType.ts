import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface InviteTypeState {
  maxInvites: number;
  isValidInvite: boolean;
  inviteType: string | null;
}

// Using more secure invite codes
const INVITE_TYPES = {
  SINGLE: 'HeroAndAbe',  // replaces 'one-invite'
  GROUP: 'HeroAndAbeWedding'    // replaces 'three-invites'
} as const;

export const useInviteType = (): InviteTypeState => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<InviteTypeState>({
    maxInvites: 1,
    isValidInvite: false,
    inviteType: null
  });

  useEffect(() => {
    const inviteParam = searchParams.toString().replace('=', '');
    console.log('URL Parameter:', inviteParam);

    const isValid = inviteParam === INVITE_TYPES.SINGLE || inviteParam === INVITE_TYPES.GROUP;
    
    setState({
      maxInvites: inviteParam === INVITE_TYPES.GROUP ? 3 : 1,
      isValidInvite: isValid,
      inviteType: isValid ? inviteParam : null
    });
  }, [searchParams]);

  return state;
};

export { INVITE_TYPES };