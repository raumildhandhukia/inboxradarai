import { getInboxData } from "@/actions/auth/inbox/email";
import Aside, { SideBarItem } from "@/components/aside";
import EmailList from "@/components/dashboard/email-list";
import TempBanner from "@/components/dashboard/temp";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";

export default async function Page() {
  const emails = await getInboxData();

  return (
    <div className="flex justify-start max-w-screen h-[calc(100dvh)]">
      <Aside>
        <SideBarItem icon={<IconHome />} text="Home" />
        <SideBarItem icon={<IconMessage />} text="Acknowledement" active />
        <SideBarItem icon={<IconUser />} text="Next Steps" />
        <SideBarItem icon={<IconHome />} text="Reject" alert />
        <SideBarItem icon={<IconHome />} text="Acceptance" alert />
        <SideBarItem icon={<IconHome />} text="Other" />
      </Aside>
      <div className="flex-1 overflow-y-scroll">
        {emails ? <EmailList emails={emails} /> : <TempBanner />}
      </div>
    </div>
  );
}
