import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationList from "@/app/conversations/components/ConversationList";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();
  const conversations = await getConversations();
  return (
    <Sidebar>
      <ConversationList users={users} conversations={conversations} />
      {children}
    </Sidebar>
  );
}
