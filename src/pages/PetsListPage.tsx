import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPets, setSearchQuery } from '../store/petSlice';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';

export const PetsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pets, pagination, loading, searchQuery } = useAppSelector((state) => state.pets);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    dispatch(fetchPets({ page: 0, size: 10, nome: searchQuery }));
  }, [dispatch, searchQuery]);

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchPets({ page, size: 10, nome: searchQuery }));
  };

  if (loading && pets.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pets Cadastrados</h1>
        <Button onClick={() => navigate('/pets/novo')}>Cadastrar Novo Pet</Button>
      </div>

      <div className="mb-6 flex gap-2">
        <Input
          placeholder="Buscar pet por nome..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nenhum pet encontrado</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pets.map((pet) => (
              <Card
                key={pet.id}
                onClick={() => navigate(`/pets/${pet.id}`)}
              >
                <div className="aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden">
                  {pet.foto ? (
                    <img
                      src={pet.foto.url}
                      alt={pet.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Sem foto
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{pet.nome}</h3>
                <p className="text-gray-600">Raça: {pet.raca}</p>
                <p className="text-gray-600">Idade: {pet.idade} anos</p>
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
