"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "../DatePicker";

interface Props {
  startDate: Date | undefined;
  endDate: Date | undefined;
  allocationStartDate: Date | undefined;
  allocationEndDate: Date | undefined;
  setStartDate: any;
  setEndDate: any;
  setAllocationStartDate: any;
  setAllocationEndDate: any;
  setName: any;
  setDescription: any;
  handleCreateRound: () => void;
}

export function RoundCard({ props }: { props: Props }) {
  const handleName = (e: any) => {
    props.setName(e.target.value);
  };
  const handleDescription = (e: any) => {
    props.setDescription(e.target.value);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Round</CardTitle>
        <CardDescription>
          Create a round for your community to start posting articles.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="startdate">Regisration Start Date</Label>
            <DatePicker date={props.startDate} setDate={props.setStartDate} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="enddate">Regisration End Date</Label>
            <DatePicker date={props.endDate} setDate={props.setEndDate} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="startdate">Donation Start Date</Label>
            <DatePicker
              date={props.allocationStartDate}
              setDate={props.setAllocationStartDate}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="enddate">Donation End Date</Label>
            <DatePicker
              date={props.allocationEndDate}
              setDate={props.setAllocationEndDate}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="roundname">Round name</Label>
          <Input
            id="roundname"
            placeholder="please enter a name of your round"
            onChange={(e) => handleName(e)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="please enter a description for your round"
            onChange={(e) => handleDescription(e)}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button onClick={() => props.handleCreateRound()}>Create</Button>
      </CardFooter>
    </Card>
  );
}
