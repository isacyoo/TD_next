import Link from 'next/link';
import { SettingsH2 } from '@/components/settings/SettingsHeaders';

export default function HighRiskLink() {
    return (
        <div className="flex flex-col gap-2 my-2">
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