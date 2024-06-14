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

export function SkeletonLoader() {
  const dummy = Array.from({ length: 16 });
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
      <div className="overflow-y-scroll max-h-[77vh] pr-3">
        <Table>
          <TableBody>
            {dummy.map((dum, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-4 max-w-4" />
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
