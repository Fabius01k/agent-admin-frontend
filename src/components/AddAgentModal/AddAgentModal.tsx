import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAgent } from '@store/features/agents-slice/agents-thunks';
import { AgentCountry } from '@store/types/enums';
import { Modal } from '@components/Modal/Modal';
import './AddAgentModal.scss';

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAgentModal = ({ isOpen, onClose }: AddAgentModalProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [country, setCountry] = useState<AgentCountry>(AgentCountry.KYRGYZSTAN);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    await dispatch(createAgent({ name: name.trim(), country }));
    setLoading(false);
    setName('');
    setCountry(AgentCountry.KYRGYZSTAN);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Добавить сотрудника">
      <form className="add-agent-modal" onSubmit={handleSubmit}>
        <div className="add-agent-modal__form-group">
          <label className="add-agent-modal__label" htmlFor="name">
            Имя сотрудника
          </label>
          <input
            id="name"
            type="text"
            className="add-agent-modal__input"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            autoFocus
          />
        </div>

        <div className="add-agent-modal__form-group">
          <label className="add-agent-modal__label" htmlFor="country">
            Страна
          </label>
          <select
            id="country"
            className="add-agent-modal__select"
            value={country}
            onChange={(e) => setCountry(e.target.value as AgentCountry)}
            disabled={loading}
          >
            <option value={AgentCountry.KYRGYZSTAN}>Кыргызстан</option>
            <option value={AgentCountry.ETHIOPIA}>Эфиопия</option>
          </select>
        </div>

        <div className="add-agent-modal__actions">
          <button
            type="button"
            className="add-agent-modal__cancel-button"
            onClick={onClose}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="add-agent-modal__submit-button"
            disabled={loading || !name.trim()}
          >
            {loading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
