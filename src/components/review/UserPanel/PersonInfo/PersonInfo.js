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

export default function PersonInfo({ personInfo, location }) {
    const { entered_at, person_id, person_meta } = personInfo
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
                    <InfoValue>{person_id}</InfoValue>
                </TableRow>
                {Object.entries(person_meta).map((md, i) => (
                                    <TableRow key={i}>
                                        <InfoKey>{md[0]}:</InfoKey>
                                        <InfoValue>{md[1]}</InfoValue>
                                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}