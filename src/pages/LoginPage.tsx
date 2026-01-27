import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/authSlice';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('=== INICIANDO LOGIN ===');
    console.log('Tentando login com:', { username, password });
    
    const result = await dispatch(login({ username, password }));
    console.log('Resultado do login:', result);
    
    if (login.fulfilled.match(result)) {
      console.log('✅ Login bem-sucedido!');
      console.log('Token salvo:', localStorage.getItem('token'));
      console.log('Redirecionando para /...');
      navigate('/', { replace: true });
    } else {
      console.error('❌ Erro no login:', result);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Pet Manager MT</h1>
        <h2 className="text-xl text-center mb-6 text-gray-600">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Usuário"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário (opcional)"
          />
          
          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha (opcional)"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={loading}
          >
            Entrar
          </Button>
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Sistema de Registro Público de Pets - Estado de Mato Grosso</p>
          <p className="mt-2 text-xs text-gray-500">Dica: Teste com qualquer usuário/senha ou deixe em branco</p>
        </div>
      </div>
    </div>
  );
};
