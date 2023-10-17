import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsBoard({ params }: any) {
  return (
    <TableBody>
      <TableRow>
        <TableCell>{params.articleId}</TableCell>
        <TableCell className="flex flex-row gap-4">
          <Badge variant="outline" className="rounded-sm px-2 font-normal">
            draft
          </Badge>
          <p>{params.title}</p>
        </TableCell>
        <TableCell>{params.donation}</TableCell>
        <TableCell>${params.matchingAmount}</TableCell>
        <TableCell>{params.comments}</TableCell>
      </TableRow>
    </TableBody>
  );
}
