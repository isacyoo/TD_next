import { ImEnter } from "react-icons/im";
import { LuListTodo } from "react-icons/lu";
import { TbProgressCheck } from "react-icons/tb";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  

export default function LocationStat({ stats }) {
    return (
        <div className="my-2">
            <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger>
                    <div className="flex justify-center items-center my-4">
                        <ImEnter className="mx-2 text-2xl"/>
                        <p>{stats.entries}</p>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent side="top">
                    <span className="text-xs">Number of entries in the last 24 hours</span>
                </HoverCardContent>
            </HoverCard>
            <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger>
                    <div className="flex justify-center items-center my-4">
                        <TbProgressCheck className="mx-2 text-2xl"/>
                        <p>{stats.in_process}</p>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent side="top">
                    <span className="text-xs">Number of entries currently in process</span>
                </HoverCardContent>
            </HoverCard>
            <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger>
                    <div className="flex justify-center items-center my-4">
                        <LuListTodo className="mx-2 text-2xl"/>
                        <p>{stats.unreviewed}</p>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent side="top">
                    <span className="text-xs">Number of events to be reviewed by agents</span>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}