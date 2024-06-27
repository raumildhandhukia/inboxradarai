import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export function EmailListSkeleton() {
  const dummy = Array.from({ length: 50 });
  return (
    <div className="p-5 ">
      <div className="flex items-start justify-between h-12">
        <div className="flex items-start gap-5">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-7 w-20 rounded-xl" />
          <Skeleton className="h-7 w-10 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-xl" />
        </div>
      </div>
      <div className="pr-3">
        <Table>
          <TableBody>
            {dummy.map((dum, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="py-3">
                    <ChevronDownIcon />
                    {/* <Skeleton className="h-4 w-4 max-w-4" /> */}
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 max-w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[15vw] max-w-[15vw]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[40vw] max-w-[35vw]" />
                  </TableCell>
                  <TableCell className="min-w-[7vw] text-right !text-[13px]">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export function EmailSkeleton() {
  const dummy = Array.from({ length: 50 });
  return (
    <div className="p-5">
      <div className="flex items-start justify-between h-12">
        <div className="flex items-start gap-5">
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-7 w-20 rounded-xl" />
          <Skeleton className="h-7 w-10 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-xl" />
        </div>
      </div>
      <div className="pr-3 border-t rounded-2xl p-5">
        <div className="mx-10">
          <Skeleton className="h-28 w-full rounded-3xl" />
        </div>
        <div className="ml-20 mt-5">
          <Skeleton className="h-8 w-96 rounded-full" />
        </div>
        <div className="flex justify-between mt-8">
          <div className="flex gap-5 ">
            <div>
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <Skeleton className="h-5 w-32 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-5 w-52 rounded-full mt-2" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-96 w-[60%] mt-5 rounded-2xl" />
      </div>
    </div>
  );
}
export const EmailListItemSkeleton = () => {
  return (
    <div className="w-full flex gap-10">
      <div>
        <Skeleton className="ml-3 h-8 w-7 rounded-xl bg-primary/10" />
      </div>
      <div className="w-[12vw] flex flex-col gap-1 -ml-5">
        <Skeleton className="h-4 w-full rounded-md bg-primary/10" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded-md bg-primary/10" />
          <Skeleton className="h-4 w-16 rounded-md bg-primary/10" />
        </div>
      </div>
      <div className="w-[20vw] flex-1 ml-1">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full rounded-md bg-primary/10" />
          <Skeleton className="h-4 w-[75%] rounded-md bg-primary/10" />
        </div>
      </div>
      <div className="">
        <Skeleton className="h-4 w-[10vw] rounded-md bg-primary/10" />
      </div>
    </div>
  );
};
export const EmailDetailsSkeleton = () => (
  <div className="">
    <div className="flex gap-5 ml-1">
      <Skeleton className="w-16 h-4" />

      <Skeleton className="w-24 h-4" />
    </div>
    <div className="mt-2 ml-1">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-[65%] h-4 mt-1" />
    </div>
    <div className="flex flex-col gap-1 ml-1 mt-2">
      <Skeleton className="w-36 h-4" />

      <Skeleton className="w-20 h-4" />
      <Skeleton className="w-24 h-4" />
    </div>
  </div>
);
