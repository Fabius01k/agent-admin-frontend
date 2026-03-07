import { api } from '@api/instanse';
import type { Complaint, ComplaintsResponse, CreateComplaintDto } from './complaints-types';

export interface AgentStatsResponse {
  week: {
    total: number;
    items: { tag: string; count: number; percent: number }[];
  };
  month: {
    total: number;
    items: { tag: string; count: number; percent: number }[];
  };
}

export const complaintsApi = {
  async create(data: CreateComplaintDto): Promise<Complaint> {
    const response = await api.post<Complaint>('/complaints', data);
    return response.data;
  },

  async getAgentComplaints(
    agentId: string,
    params?: { period?: string; page?: number; limit?: number }
  ): Promise<ComplaintsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.period) queryParams.set('period', params.period);
    if (params?.page) queryParams.set('page', String(params.page));
    if (params?.limit) queryParams.set('limit', String(params.limit));

    const response = await api.get<ComplaintsResponse>(
      `/complaints/agent/${agentId}?${queryParams.toString()}`
    );
    return response.data;
  },

  async getAgentStats(agentId: string): Promise<AgentStatsResponse> {
    const response = await api.get<AgentStatsResponse>(`/complaints/agent/${agentId}/stats`);
    return response.data;
  },
};
