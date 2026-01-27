import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTutor, updateTutor, uploadTutorPhoto, fetchTutorById, clearCurrentTutor } from '../store/tutorSlice';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const TutorFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentTutor, loading } = useAppSelector((state) => state.tutores);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');
  const [foto, setFoto] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchTutorById(Number(id)));
    }
    return () => {
      dispatch(clearCurrentTutor());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentTutor && id) {
      setNome(currentTutor.nome);
      setEmail(currentTutor.email);
      setTelefone(currentTutor.telefone);
      setEndereco(currentTutor.endereco);
      setCpf(String(currentTutor.cpf));
    }
  }, [currentTutor, id]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const tutorData = {
      nome,
      email,
      telefone,
      endereco,
      cpf: Number(cpf.replace(/\D/g, '')),
    };

    try {
      let tutorId: number;
      
      if (id) {
        const result = await dispatch(updateTutor({ id: Number(id), tutor: tutorData }));
        if (updateTutor.fulfilled.match(result)) {
          tutorId = Number(id);
        } else {
          return;
        }
      } else {
        const result = await dispatch(createTutor(tutorData));
        if (createTutor.fulfilled.match(result)) {
          tutorId = result.payload.id;
        } else {
          return;
        }
      }

      if (foto && tutorId) {
        await dispatch(uploadTutorPhoto({ id: tutorId, file: foto }));
      }

      navigate(`/tutores/${tutorId}`);
    } catch (error) {
      console.error('Erro ao salvar tutor:', error);
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
            {id ? 'Editar Tutor' : 'Cadastrar Novo Tutor'}
          </h1>

          <form onSubmit={handleSubmit}>
            <Input
              label="Nome Completo *"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Nome completo do tutor"
            />

            <Input
              label="Email *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@exemplo.com"
            />

            <Input
              label="Telefone *"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(formatPhone(e.target.value))}
              required
              placeholder="(00) 00000-0000"
              maxLength={15}
            />

            <Input
              label="Endereço *"
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
              placeholder="Endereço completo"
            />

            <Input
              label="CPF *"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              required
              placeholder="000.000.000-00"
              maxLength={14}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto do Tutor
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
