import { useState } from 'react';
import { User, Role } from '@/types/types';
import { apiClient } from '@/utils/apiClient';
import Button from '@/components/UI/Button';
import styled from 'styled-components';

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(user.role as Role);

  const handleRoleChange = async (newRole: Role) => {
    try {
      await apiClient.put(`/user/${user._id}/role`, { role: newRole });
      setMessage('Le rôle a été modifié avec succès');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage('La modification du rôle a échoué');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <Card>
      <h3>{user.username}</h3>
      <p>ID: {user._id}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <div>
        Role:&nbsp;
        <select
          value={role}
          onChange={(e) => {
            const newRole = e.target.value as Role;
            setRole(newRole);
          }}
        >
          {Object.values(Role).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {message && (
          <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>
        )}
        <Button onClick={() => handleRoleChange(role)} className="spaces-block">
          Valider
        </Button>
      </div>
    </Card>
  );
}

const Card = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-bottom: 1rem;
  }
`;
