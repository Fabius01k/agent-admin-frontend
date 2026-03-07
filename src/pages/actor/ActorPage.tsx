import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAgentById, updateAgentNotes } from '@store/features/agents-slice/agents-thunks';
import { getAgentComplaints, getAgentStats, createComplaint } from '@store/features/complaints-slice/complaints-thunks';
import { paths } from '@router/path';
import type { AppDispatch, RootState } from '@store/store';
import { ComplaintPeriod, AgentCountry, ComplaintTag, complaintTagLabels } from '@store/types/enums';
import './ActorPage.scss';

const countryLabels: Record<AgentCountry, string> = {
  [AgentCountry.KYRGYZSTAN]: 'Кыргызстан',
  [AgentCountry.ETHIOPIA]: 'Эфиопия',
};

export const ActorPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { currentAgent, loading: agentLoading } = useSelector((state: RootState) => state.agents);
  const { stats, complaints, loading: complaintsLoading } = useSelector((state: RootState) => state.complaints);
  
  const [notes, setNotes] = useState({
    goodQualitiesText: '',
    badQualitiesText: '',
    generalNotesText: '',
  });

  const [selectedTag, setSelectedTag] = useState<ComplaintTag>(ComplaintTag.DEPOSIT_PROCESSING_DELAY);
  const [complaintComment, setComplaintComment] = useState('');
  const [isCreatingComplaint, setIsCreatingComplaint] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getAgentById(id));
      dispatch(getAgentComplaints({ agentId: id, period: ComplaintPeriod.ALL }));
      dispatch(getAgentStats(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentAgent) {
      setNotes({
        goodQualitiesText: currentAgent.goodQualitiesText || '',
        badQualitiesText: currentAgent.badQualitiesText || '',
        generalNotesText: currentAgent.generalNotesText || '',
      });
    }
  }, [currentAgent]);

  const handleSaveNotes = () => {
    if (id) {
      dispatch(updateAgentNotes({ id, data: notes }));
    }
  };

  const handleCreateComplaint = () => {
    if (id) {
      dispatch(createComplaint({
        agentId: id,
        tags: [selectedTag],
        comment: complaintComment || undefined,
      }));
      setIsCreatingComplaint(false);
      setComplaintComment('');
    }
  };

  const handleBack = () => {
    navigate(paths.root);
  };

  if (agentLoading) {
    return (
      <div className="actor-page">
        <div className="actor-page__loading">
          <div className="actor-page__spinner"></div>
          <span>Загрузка...</span>
        </div>
      </div>
    );
  }

  if (!currentAgent) {
    return (
      <div className="actor-page">
        <div className="actor-page__empty">Агент не найден</div>
      </div>
    );
  }

  const weekStats = stats.week;
  const monthStats = stats.month;

  return (
    <div className="actor-page">
      <div className="actor-page__container">
        {/* Header */}
        <header className="actor-page__header">
          <button className="actor-page__back-button" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="actor-page__avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentAgent.name)}&background=3b82f6&color=fff`}
              alt={currentAgent.name}
            />
          </div>
          <div className="actor-page__info">
            <h1 className="actor-page__title">{currentAgent.name}</h1>
            <p className="actor-page__meta">
              ID: {currentAgent.id} · {countryLabels[currentAgent.country]}
            </p>
          </div>
        </header>

        {/* Notes Cards */}
        <div className="actor-page__notes-grid">
          <div className="actor-page__note-card actor-page__note-card--good">
            <h3 className="actor-page__note-card-title">Хорошие качества</h3>
            <textarea
              className="actor-page__note-card-textarea"
              value={notes.goodQualitiesText}
              onChange={(e) => setNotes({ ...notes, goodQualitiesText: e.target.value })}
              onBlur={handleSaveNotes}
              placeholder="Введите хорошие качества..."
              rows={3}
            />
          </div>

          <div className="actor-page__note-card actor-page__note-card--bad">
            <h3 className="actor-page__note-card-title">Плохие качества</h3>
            <textarea
              className="actor-page__note-card-textarea"
              value={notes.badQualitiesText}
              onChange={(e) => setNotes({ ...notes, badQualitiesText: e.target.value })}
              onBlur={handleSaveNotes}
              placeholder="Введите плохие качества..."
              rows={3}
            />
          </div>
        </div>

        {/* General Notes */}
        <section className="actor-page__section">
          <h2 className="actor-page__section-title">Общие заметки</h2>
          <input
            type="text"
            className="actor-page__general-input"
            value={notes.generalNotesText}
            onChange={(e) => setNotes({ ...notes, generalNotesText: e.target.value })}
            onBlur={handleSaveNotes}
            placeholder="Добавьте общие заметки о сотруднике..."
          />
        </section>

        {/* Stats Section */}
        <section className="actor-page__section">
          <h2 className="actor-page__section-title">Статистика нарушений</h2>
          <div className="actor-page__stats">
            <div className="actor-page__stats-column">
              <div className="actor-page__stats-header">
                <span className="actor-page__stats-label">За неделю</span>
                <span className="actor-page__stats-period">Всего: {weekStats?.total || 0}</span>
              </div>
              {weekStats?.items && weekStats.items.length > 0 ? (
                <ul className="actor-page__stats-list">
                  {weekStats.items.map((item) => (
                    <li key={item.tag} className="actor-page__stats-item">
                      <span className="actor-page__stats-name">{complaintTagLabels[item.tag]}</span>
                      <div className="actor-page__stats-right">
                        <span className="actor-page__stats-count">{item.count}</span>
                        <span className="actor-page__stats-percent">{item.percent}%</span>
                      </div>
                      <div className="actor-page__stats-bar">
                        <div
                          className="actor-page__stats-bar-fill"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="actor-page__empty-small">Нет нарушений</p>
              )}
            </div>

            <div className="actor-page__stats-column actor-page__stats-column--bordered">
              <div className="actor-page__stats-header">
                <span className="actor-page__stats-label">Последние 30 дней</span>
                <span className="actor-page__stats-period">Всего: {monthStats?.total || 0}</span>
              </div>
              {monthStats?.items && monthStats.items.length > 0 ? (
                <ul className="actor-page__stats-list">
                  {monthStats.items.map((item) => (
                    <li key={item.tag} className="actor-page__stats-item">
                      <span className="actor-page__stats-name">{complaintTagLabels[item.tag]}</span>
                      <div className="actor-page__stats-right">
                        <span className="actor-page__stats-count">{item.count}</span>
                        <span className="actor-page__stats-percent">{item.percent}%</span>
                      </div>
                      <div className="actor-page__stats-bar">
                        <div
                          className="actor-page__stats-bar-fill"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="actor-page__empty-small">Нет нарушений</p>
              )}
            </div>
          </div>
        </section>

        {/* Create Complaint Section */}
        <section className="actor-page__section">
          <h2 className="actor-page__section-title">Создать жалобу</h2>
          <div className="actor-page__complaint-form">
            <div className="actor-page__form-row">
              <label className="actor-page__form-label">Выберите жалобу</label>
              <select
                className="actor-page__form-select"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value as ComplaintTag)}
              >
                {Object.values(ComplaintTag).map((tag) => (
                  <option key={tag} value={tag}>
                    {complaintTagLabels[tag]}
                  </option>
                ))}
              </select>
            </div>
            <div className="actor-page__form-row">
              <textarea
                className="actor-page__form-textarea"
                value={complaintComment}
                onChange={(e) => setComplaintComment(e.target.value)}
                placeholder="Не вышел на утреннюю смену 15 апреля"
                rows={2}
              />
            </div>
            <div className="actor-page__form-actions">
              <button
                className="actor-page__submit-button"
                onClick={handleCreateComplaint}
              >
                Добавить
              </button>
              <button
                className="actor-page__link-button"
                onClick={() => setIsCreatingComplaint(!isCreatingComplaint)}
              >
                Показать все жалобы агента
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
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
          </div>
        </section>

        {/* All Complaints List */}
        {isCreatingComplaint && (
          <section className="actor-page__section">
            <h2 className="actor-page__section-title">Все жалобы</h2>
            {complaintsLoading ? (
              <div className="actor-page__loading-small">
                <div className="actor-page__spinner-small"></div>
                <span>Загрузка...</span>
              </div>
            ) : complaints.length > 0 ? (
              <div className="actor-page__complaints-list">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="actor-page__complaint-item">
                    <div className="actor-page__complaint-tags">
                      {complaint.tags.map((tag) => (
                        <span key={tag} className="actor-page__complaint-tag">
                          {complaintTagLabels[tag]}
                        </span>
                      ))}
                    </div>
                    {complaint.comment && (
                      <p className="actor-page__complaint-comment">{complaint.comment}</p>
                    )}
                    <span className="actor-page__complaint-date">
                      {new Date(complaint.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="actor-page__empty-small">Нет жалоб</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
