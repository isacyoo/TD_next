import Link from 'next/link';
import { SettingsH2 } from '@/components/settings/SettingsHeaders';

export default function LocationScheduleLink({ locationId }) {
    return (
        <div className="flex flex-col gap-2 my-2">
            <SettingsH2>Schedule</SettingsH2>
            <Link
                href={`/settings/schedule/${locationId}`}
                className="text-sm text-blue-500 hover:underline"
                target='_blank'
            >
                Go to schedule
            </Link>
        </div>
    )
}