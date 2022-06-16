import { FC } from 'react';

import { auth } from '@/lib/firebase';
import AllTestsView from '@/views/AllTests';

interface IProps {
  className?: string;
}

const AllTestsPage: FC<IProps> = ({ className }) => {
  const userId = auth.currentUser?.uid;

  return userId ? <AllTestsView userId={userId} /> : null;
};

export default AllTestsPage;
