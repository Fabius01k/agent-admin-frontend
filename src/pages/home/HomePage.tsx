import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { searchAgents } from '@store/features/agents-slice/agents-thunks';
import { paths } from '@router/path';
import type { AppDispatch, RootState } from '@store/store';
import { countryLabels } from '@store/types/enums';
import { AddAgentModal } from '@components/AddAgentModal/AddAgentModal';
import './HomePage.scss';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { searchResults, loading } = useSelector((state: RootState) => state.agents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSearch = () => {
    dispatch(searchAgents(searchQuery.trim()));
  };

  const handleAddAgent = () => {
    setIsAddModalOpen(true);
  };

  const handleAgentClick = (agentId: string) => {
    navigate(`${paths.actor}/${agentId}`);
  };

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__title">Контроль сотрудников</h1>
        <p className="home-page__subtitle">
          Административная панель для поиска сотрудников
          <br />
          и фиксации дисциплинарных нарушений.
        </p>
      </header>

      <div className="home-page__search-section">
        <div className="home-page__search-bar">
          <input
            type="text"
            className="home-page__search-input"
            placeholder="Найти сотрудника по id или имени"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="home-page__search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            Поиск
          </button>
          <button
            className="home-page__add-button"
            onClick={handleAddAgent}
          >
            <span className="home-page__add-icon">+</span>
            Добавить сотрудника
          </button>
        </div>

        <div className="home-page__results">
          <h2 className="home-page__results-title">Результаты поиска</h2>
          <div className="home-page__results-list">
            {loading && (
              <div className="home-page__loading">
                <div className="home-page__spinner"></div>
                <span>Загрузка...</span>
              </div>
            )}

            {!loading && searchResults.length === 0 && (
              <div className="home-page__empty">Нет результатов</div>
            )}

            {!loading && searchResults.map((agent) => (
              <div
                key={agent.id}
                className="home-page__result-item"
                onClick={() => handleAgentClick(agent.id)}
              >
                <div className="home-page__result-info">
                  <span className="home-page__result-name">{agent.name}</span>
                  <span className="home-page__result-meta">
                    ID: {agent.id} · {countryLabels[agent.country]}
                  </span>
                </div>
                <button className="home-page__result-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddAgentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
