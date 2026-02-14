import MessageTable, { Message } from "./ui/MessageTable";
import { fetchLatestMessages } from "./lib/data";

export default async function Home() {
  const msgs = await fetchLatestMessages();

  return (
    <div>
      <h1 className="dark:text-white">Latest Messages</h1>
      <MessageTable messages={msgs}/>
    </div>
  );
}
