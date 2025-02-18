function InfoKey({ children }) {
    return (
        <td className="w-1/3 font-bold">{children}</td>
    )
}

function InfoValue({ children }) {
    return (
        <td className="p-2 border-2 border-primary-200">{children}</td>
    )
}

export default function PersonInfo({ personInfo, location }) {
    const { entered_at, person_id, person_meta } = personInfo
    return (
        <div className="overflow-y-auto">
        <table className="border-collapse w-full">
            <tbody>
                <tr>
                    <InfoKey>Location:</InfoKey>
                    <InfoValue>{location.name}</InfoValue>
                </tr>
                <tr>
                    <InfoKey>Time:</InfoKey>
                    <InfoValue>{entered_at}</InfoValue>
                </tr>
                <tr>
                    <InfoKey>ID:</InfoKey>
                    <InfoValue>{person_id}</InfoValue>
                </tr>
                {Object.entries(person_meta).map((md, i) => (
                                    <tr key={i}>
                                        <InfoKey>{md[0]}:</InfoKey>
                                        <InfoValue>{md[1]}</InfoValue>
                                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}