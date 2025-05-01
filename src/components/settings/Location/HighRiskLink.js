import Link from 'next/link';

export default function HighRiskLink() {
    return (
        <div className="flex flex-col gap-2 my-4">
            <Link
                href={`/settings/members`}
                className="text-sm text-blue-500 hover:underline"
                target='_blank'
            >
                Go to high risk members
            </Link>
        </div>
    )
}