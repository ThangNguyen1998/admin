import { useQuery } from 'react-query';

export default function useProfile() {
  const { data: profile }: any = useQuery('profile');
  return profile?.data;
}
