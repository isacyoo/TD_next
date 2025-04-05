import {
    Table,
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"
  

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

export default function MemberInfo({ memberInfo, location }) {
    const { entered_at, member_id, member_meta } = memberInfo
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
                    <InfoValue>{member_id}</InfoValue>
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