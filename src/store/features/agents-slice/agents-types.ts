import type { AgentCountry } from '@store/types/enums';

export interface Agent {
  id: string;
  name: string;
  country: AgentCountry;
  goodQualitiesText?: string | null;
  badQualitiesText?: string | null;
  generalNotesText?: string | null;
  createdAt: string;
}

export interface AgentSearchResult {
  id: string;
  name: string;
  country: AgentCountry;
  createdAt: string;
}

export interface CreateAgentDto {
  name: string;
  country: AgentCountry;
}

export interface UpdateAgentNotesDto {
  goodQualitiesText?: string;
  badQualitiesText?: string;
  generalNotesText?: string;
}

export interface AgentsState {
  searchResults: AgentSearchResult[];
  currentAgent: Agent | null;
  loading: boolean;
  error: string | null;
}
