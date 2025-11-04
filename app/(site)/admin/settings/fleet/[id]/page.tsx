import { notFound } from 'next/navigation';
import FleetForm from '../FleetForm';
import { getFleet } from '@/lib/db/queries';

interface EditFleetPageProps {
  params: {
    id: string;
  };
}

export default async function EditFleetPage({ params }: EditFleetPageProps) {
  const fleets = await getFleet(params.id);

  if (fleets.length === 0) {
    notFound();
  }

  return <FleetForm fleet={fleets[0]} />;
} 