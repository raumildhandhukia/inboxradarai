import Inbox from "@/components/home/inbox/inbox";
import TempBanner from "@/components/home/temp";
export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="border-t rounded-3xl shadow-lg ">
      <Inbox />
    </div>
  );
}
