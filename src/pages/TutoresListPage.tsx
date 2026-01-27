import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTutores, setSearchQuery } from '../store/tutorSlice';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';

export const TutoresListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tutores, pagination, loading, searchQuery } = useAppSelector((state) => state.tutores);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    dispatch(fetchTutores({ page: 0, size: 10, nome: searchQuery }));
  }, [dispatch, searchQuery]);

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchTutores({ page, size: 10, nome: searchQuery }));
  };

  if (loading && tutores.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tutores Cadastrados</h1>
        <Button onClick={() => navigate('/tutores/novo')}>Cadastrar Novo Tutor</Button>
      </div>

      <div className="mb-6 flex gap-2">
        <Input
          placeholder="Buscar tutor por nome..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {tutores.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nenhum tutor encontrado</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tutores.map((tutor) => (
              <Card
                key={tutor.id}
                onClick={() => navigate(`/tutores/${tutor.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    {tutor.foto ? (
                      <img
                        src={tutor.foto.url}
                        alt={tutor.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        👤
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{tutor.nome}</h3>
                    <p className="text-sm text-gray-600 truncate">{tutor.email}</p>
                    <p className="text-sm text-gray-600">{tutor.telefone}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pageCount}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
