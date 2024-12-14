'use client';

import { apiClient } from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import { User, Role } from '@/types/types';
import styled from 'styled-components';
import UserCard from '@/components/UI/admin/UserCard';
import Button from '@/components/UI/Button';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [kanas, setKanas] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const fetchUsers = async () => {
    const response = await apiClient.get('/user/list');
    setUsers(response.data.data);
  };

  const refreshUsers = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <main>
      <S.Container>
        <h1>Administration</h1>
        <div className="spaces-block">
          <div className="flex">
            <h2>Tableau de bord</h2>
            <Button onClick={refreshUsers}>Rafraîchir</Button>
          </div>
          <div className="flex spaces-block">
            {users.map((user) => (
              <UserCard key={`${user._id}-${refresh}`} user={user} />
            ))}
          </div>
        </div>
      </S.Container>
    </main>
  );
}

const S = {
  Container: styled.div`
    padding: 2rem;
    margin-top: 80px;
  `,
};
