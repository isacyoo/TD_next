import {
    Table,
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"

import { fetcher } from "@/util/api"
import ModifyHighRisk from "./ModifyHighRisk"
  

async function getMemberHighRisk(memberId) {
    const res = await fetcher(`/high_risk_member/${memberId}`)

    if (res.status == 200) {
        return true
    } else if (res.status == 404) {
        return false
    } else {
        return false
    }

}

function InfoKey({ children }) {
    return (
        <TableCell className="font-bold">{children}</TableCell>
    )
}

function InfoValue({ children }) {
    return (
        <TableCell>{children}</TableCell>
    )
}

export default async function MemberInfo({ memberInfo, location }) {
    const { entered_at, member_id, member_meta } = memberInfo
    const memberHighRisk = await getMemberHighRisk(member_id)
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <InfoKey>Location:</InfoKey>
                    <InfoValue>{location.name}</InfoValue>
                </TableRow>
                <TableRow>
                    <InfoKey>Time:</InfoKey>
                    <InfoValue>{entered_at}</InfoValue>
                </TableRow>
                <TableRow>
                    <InfoKey>ID:</InfoKey>
                    <InfoValue>
                        <div className="flex items-center">
                            <span>{member_id}</span>
                            <ModifyHighRisk memberId={member_id} highRisk={memberHighRisk} />
                        </div>
                    </InfoValue>
                </TableRow>
                {Object.entries(member_meta).map((md, i) => (
                                    <TableRow key={i}>
                                        <InfoKey>{md[0]}:</InfoKey>
                                        <InfoValue>{md[1]}</InfoValue>
                                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}