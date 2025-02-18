import { ImEnter } from "react-icons/im";
import { LuListTodo } from "react-icons/lu";
import { TbProgressCheck } from "react-icons/tb";

export default function LocationStat({ stats }) {
    return (
        <div className="my-2">
           <div className="flex justify-center items-center relative group my-4">
                <ImEnter className="mx-2 text-2xl"/>
                <p>{stats.entries}</p>
                <span className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Number of entries in the last 24 hours</span>
            </div>
            <div className="flex justify-center items-center relative group my-4">
                <TbProgressCheck className="mx-2 text-2xl"/>
                <p>{stats.in_process}</p>
                <span className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Number of entries currently in process</span>
            </div>
            <div className="flex justify-center items-center relative group my-4">
                <LuListTodo className="mx-2 text-2xl"/>
                <p>{stats.unreviewed}</p>
                <span className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Number of events to be reviewed by agents</span>
            </div>
        </div>
    )
}