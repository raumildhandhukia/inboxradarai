import { cookies } from "next/headers";
import Mail from "./main";
import { getAccounts } from "@/data/account";
import { Account } from "@/types";
import { redirect } from "next/navigation";

export default async function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const accounts: Account[] | null = await getAccounts();
  if (!accounts) {
    redirect("/add-account");
  }

  return (
    <>
      {accounts && (
        <Mail
          accounts={accounts}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
        />
      )}
    </>
  );
}
