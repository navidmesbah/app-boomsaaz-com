import { getAllUsers } from '@/lib/db/queries';
import { UserRole } from '@/lib/db/schema';
import { UserTable } from './user-table';

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="container mx-auto py-10" dir="ltr">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserTable users={users} />
    </div>
  );
} 