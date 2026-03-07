import { api } from '@api/instanse';
import type { Agent, CreateAgentDto, UpdateAgentNotesDto, AgentSearchResult } from './agents-types';

export const agentsApi = {
  async create(data: CreateAgentDto): Promise<Agent> {
    const response = await api.post<Agent>('/agents', data);
    return response.data;
  },

  async search(query: string): Promise<AgentSearchResult[]> {
    const params = new URLSearchParams();
    if (query && query.trim()) {
      params.set('query', query.trim());
    }
    const response = await api.get<AgentSearchResult[]>(`/agents/search?${params.toString()}`);
    return response.data;
  },

  async getById(id: string): Promise<Agent> {
    const response = await api.get<Agent>(`/agents/${id}`);
    return response.data;
  },

  async updateNotes(id: string, data: UpdateAgentNotesDto): Promise<Agent> {
    const response = await api.patch<Agent>(`/agents/${id}/notes`, data);
    return response.data;
  },
};
