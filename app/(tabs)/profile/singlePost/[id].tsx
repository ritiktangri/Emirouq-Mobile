import React from 'react';

import SinglePost from '~/components/Tabs/Post/SinglePost';
import { ConversationProvider } from '~/context/ConversationContext';

const Page = () => {
  return (
    <ConversationProvider>
      <SinglePost />
    </ConversationProvider>
  );
};

export default Page;
