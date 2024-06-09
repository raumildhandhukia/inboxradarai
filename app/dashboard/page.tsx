import { getInboxData } from "@/actions/auth/inbox/email";
import EmailList from "@/components/dashboard/email-list";
import TempBanner from "@/components/dashboard/temp";

export default async function Page() {
  const emails = await getInboxData();
  return (
    <div className="mt-20">
      {emails ? <EmailList emails={emails} /> : <TempBanner />}
    </div>
  );
}
