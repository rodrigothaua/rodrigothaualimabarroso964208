import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTutorById, deleteTutor, clearCurrentTutor, linkPetToTutor, unlinkPetFromTutor } from '../store/tutorSlice';
import { fetchPets } from '../store/petSlice';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';

export const TutorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentTutor, loading } = useAppSelector((state) => state.tutores);
  const { pets } = useAppSelector((state) => state.pets);
  const { toast, showToast, hideToast } = useToast();
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchTutorById(Number(id)));
      dispatch(fetchPets({ page: 0, size: 100 }));
    }
    return () => {
      dispatch(clearCurrentTutor());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este tutor?')) {
      if (id) {
        const result = await dispatch(deleteTutor(Number(id)));
        if (deleteTutor.fulfilled.match(result)) {
          showToast('Tutor excluído com sucesso!', 'success');
          setTimeout(() => navigate('/tutores'), 1500);
        } else {
          showToast('Erro ao excluir tutor. Tente novamente.', 'error');
        }
      }
    }
  };

  const handleLinkPet = async () => {
    if (selectedPetId && id) {
      const result = await dispatch(linkPetToTutor({ tutorId: Number(id), petId: selectedPetId }));
      setShowLinkModal(false);
      setSelectedPetId(null);
      if (linkPetToTutor.fulfilled.match(result)) {
        showToast('Pet vinculado com sucesso!', 'success');
        dispatch(fetchTutorById(Number(id)));
      } else {
        showToast('Erro ao vincular pet.', 'error');
      }
    }
  };

  const handleUnlinkPet = async (petId: number) => {
    if (window.confirm('Deseja desvincular este pet?')) {
      if (id) {
        const result = await dispatch(unlinkPetFromTutor({ tutorId: Number(id), petId }));
        if (unlinkPetFromTutor.fulfilled.match(result)) {
          showToast('Pet desvinculado com sucesso!', 'success');
          dispatch(fetchTutorById(Number(id)));
        } else {
          showToast('Erro ao desvincular pet.', 'error');
        }
      }
    }
  };

  if (loading || !currentTutor) {
    return <Loading />;
  }

  const availablePets = pets.filter(
    pet => !currentTutor.pets?.find(p => p.id === pet.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate('/tutores')} variant="secondary">
            ← Voltar
          </Button>
        </div>

        <Card>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              {currentTutor.foto ? (
                <img
                  src={currentTutor.foto.url}
                  alt={currentTutor.nome}
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-6xl">👤</span>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-4">{currentTutor.nome}</h1>
              
              <div className="space-y-2 mb-6">
                <div>
                  <span className="font-semibold">Email:</span>
                  <span className="ml-2">{currentTutor.email}</span>
                </div>
                <div>
                  <span className="font-semibold">Telefone:</span>
                  <span className="ml-2">{currentTutor.telefone}</span>
                </div>
                <div>
                  <span className="font-semibold">Endereço:</span>
                  <span className="ml-2">{currentTutor.endereco}</span>
                </div>
                <div>
                  <span className="font-semibold">CPF:</span>
                  <span className="ml-2">{currentTutor.cpf}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <Button onClick={() => navigate(`/tutores/${id}/editar`)}>
                  Editar
                </Button>
                <Button onClick={handleDelete} variant="danger">
                  Excluir
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Pets Vinculados</h2>
              <Button onClick={() => setShowLinkModal(true)}>
                Vincular Pet
              </Button>
            </div>

            {currentTutor.pets && currentTutor.pets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTutor.pets.map((pet) => (
                  <Card key={pet.id}>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          {pet.foto ? (
                            <img src={pet.foto.url} alt={pet.nome} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">🐾</div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{pet.nome}</h3>
                          <p className="text-sm text-gray-600">{pet.raca}</p>
                          <p className="text-sm text-gray-600">{pet.idade} anos</p>
                        </div>
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => handleUnlinkPet(pet.id)}
                        className="text-sm px-2 py-1"
                      >
                        Remover
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Nenhum pet vinculado</p>
            )}
          </div>
        </Card>

        {showLinkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full m-4">
              <h3 className="text-xl font-bold mb-4">Vincular Pet</h3>
              
              {availablePets.length > 0 ? (
                <>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                    value={selectedPetId || ''}
                    onChange={(e) => setSelectedPetId(Number(e.target.value))}
                  >
                    <option value="">Selecione um pet</option>
                    {availablePets.map((pet) => (
                      <option key={pet.id} value={pet.id}>
                        {pet.nome} - {pet.raca}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <Button onClick={handleLinkPet} disabled={!selectedPetId}>
                      Vincular
                    </Button>
                    <Button variant="secondary" onClick={() => setShowLinkModal(false)}>
                      Cancelar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">Não há pets disponíveis para vinculação</p>
                  <Button variant="secondary" onClick={() => setShowLinkModal(false)}>
                    Fechar
                  </Button>
                </>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
