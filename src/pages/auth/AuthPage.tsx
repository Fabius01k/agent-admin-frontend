import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '@store/features/auth-slice/auth-thunks';
import { clearError } from '@store/features/auth-slice/auth-slice';
import { paths } from '@router/path';
import type { AppDispatch, RootState } from '@store/store';
import './AuthPage.scss';

export const AuthPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    const result = await dispatch(login({ login: loginValue, password }));

    if (login.fulfilled.match(result)) {
      navigate(paths.root);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <header className="auth-page__header">
          <h1 className="auth-page__title">Авторизация</h1>
          <p className="auth-page__subtitle">
            Войдите для доступа к панели администратора
          </p>
        </header>

        <form className="auth-page__form" onSubmit={handleSubmit}>
          <div className="auth-page__form-group">
            <label className="auth-page__label" htmlFor="login">
              Логин
            </label>
            <input
              id="login"
              type="text"
              className="auth-page__input"
              placeholder="Введите логин"
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="auth-page__form-group">
            <label className="auth-page__label" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className="auth-page__input"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="auth-page__error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-page__submit-button"
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};
