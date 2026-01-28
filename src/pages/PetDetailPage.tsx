import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPetById, deletePet, clearCurrentPet } from '../store/petSlice';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';

export const PetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPet, loading } = useAppSelector((state) => state.pets);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (id) {
      dispatch(fetchPetById(Number(id)));
    }
    return () => {
      dispatch(clearCurrentPet());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      if (id) {
        const result = await dispatch(deletePet(Number(id)));
        if (deletePet.fulfilled.match(result)) {
          showToast('Pet excluído com sucesso!', 'success');
          setTimeout(() => navigate('/'), 1500);
        } else {
          showToast('Erro ao excluir pet. Tente novamente.', 'error');
        }
      }
    }
  };

  if (loading || !currentPet) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate('/')} variant="secondary">
            ← Voltar
          </Button>
        </div>

        <Card>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {currentPet.foto ? (
                <img
                  src={currentPet.foto.url}
                  alt={currentPet.nome}
                  className="w-full rounded-lg"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Sem foto</span>
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-4">{currentPet.nome}</h1>
              
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Raça:</span>
                  <span className="ml-2">{currentPet.raca}</span>
                </div>
                <div>
                  <span className="font-semibold">Idade:</span>
                  <span className="ml-2">{currentPet.idade} anos</span>
                </div>
              </div>

              {currentPet.tutores && currentPet.tutores.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-bold mb-3">Tutores</h2>
                  {currentPet.tutores.map((tutor) => (
                    <Card key={tutor.id} className="mb-2">
                      <h3 className="font-semibold">{tutor.nome}</h3>
                      <p className="text-sm text-gray-600">{tutor.email}</p>
                      <p className="text-sm text-gray-600">{tutor.telefone}</p>
                      <p className="text-sm text-gray-600">{tutor.endereco}</p>
                    </Card>
                  ))}
                </div>
              )}

              <div className="mt-6 flex gap-2">
                <Button onClick={() => navigate(`/pets/${id}/editar`)}>
                  Editar
                </Button>
                <Button onClick={handleDelete} variant="danger">
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
