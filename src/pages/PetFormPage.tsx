import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createPet, updatePet, uploadPetPhoto, fetchPetById, clearCurrentPet } from '../store/petSlice';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';

export const PetFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPet, loading } = useAppSelector((state) => state.pets);
  const { toast, showToast, hideToast } = useToast();
  
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(fetchPetById(Number(id)));
    }
    return () => {
      dispatch(clearCurrentPet());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPet && id) {
      setNome(currentPet.nome);
      setRaca(currentPet.raca);
      setIdade(String(currentPet.idade));
      if (currentPet.foto) {
        setPreviewUrl(currentPet.foto.url);
      }
    }
  }, [currentPet, id]);

  useEffect(() => {
    if (foto) {
      const objectUrl = URL.createObjectURL(foto);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [foto]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const petData = {
      nome,
      raca,
      idade: Number(idade),
    };

    try {
      let petId: number;
      
      if (id) {
        const result = await dispatch(updatePet({ id: Number(id), pet: petData }));
        if (updatePet.fulfilled.match(result)) {
          petId = Number(id);
          showToast('Pet atualizado com sucesso!', 'success');
        } else {
          showToast('Erro ao atualizar pet. Tente novamente.', 'error');
          return;
        }
      } else {
        const result = await dispatch(createPet(petData));
        if (createPet.fulfilled.match(result)) {
          petId = result.payload.id;
          showToast('Pet cadastrado com sucesso!', 'success');
        } else {
          showToast('Erro ao cadastrar pet. Tente novamente.', 'error');
          return;
        }
      }

      if (foto && petId) {
        await dispatch(uploadPetPhoto({ id: petId, file: foto }));
      }

      setTimeout(() => navigate(`/pets/${petId}`), 1500);
    } catch (error) {
      console.error('Erro ao salvar pet:', error);
      showToast('Erro ao salvar pet. Tente novamente.', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button onClick={() => navigate(-1)} variant="secondary">
            ← Voltar
          </Button>
        </div>

        <Card>
          <h1 className="text-2xl font-bold mb-6">
            {id ? 'Editar Pet' : 'Cadastrar Novo Pet'}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Coluna da Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto do Pet
                </label>
                <div className="space-y-4">
                  {previewUrl ? (
                    <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <span className="text-6xl">🐾</span>
                        <p className="mt-2">Nenhuma foto selecionada</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFoto(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Coluna dos Inputs */}
              <div>
                <Input
                  label="Nome *"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  placeholder="Nome do pet"
                />

                <Input
                  label="Raça *"
                  type="text"
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                  required
                  placeholder="Raça do pet"
                />

                <Input
                  label="Idade *"
                  type="number"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  required
                  min="0"
                  placeholder="Idade em anos"
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2 pt-4 border-t justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
              <Button type="submit" isLoading={loading}>
                {id ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
