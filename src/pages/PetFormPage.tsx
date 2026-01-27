import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createPet, updatePet, uploadPetPhoto, fetchPetById, clearCurrentPet } from '../store/petSlice';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const PetFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentPet, loading } = useAppSelector((state) => state.pets);
  
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [foto, setFoto] = useState<File | null>(null);

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
    }
  }, [currentPet, id]);

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
        } else {
          return;
        }
      } else {
        const result = await dispatch(createPet(petData));
        if (createPet.fulfilled.match(result)) {
          petId = result.payload.id;
        } else {
          return;
        }
      }

      if (foto && petId) {
        await dispatch(uploadPetPhoto({ id: petId, file: foto }));
      }

      navigate(`/pets/${petId}`);
    } catch (error) {
      console.error('Erro ao salvar pet:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
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

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto do Pet
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" isLoading={loading}>
                {id ? 'Atualizar' : 'Cadastrar'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
