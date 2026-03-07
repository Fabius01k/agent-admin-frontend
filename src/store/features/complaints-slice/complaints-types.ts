import type { ComplaintTag } from '@store/types/enums';

export interface Complaint {
  id: string;
  agentId: string;
  tags: ComplaintTag[];
  comment?: string;
  createdAt: string;
}

export interface ComplaintStatsItem {
  tag: ComplaintTag;
  count: number;
  percent: number;
}

export interface ComplaintStats {
  total: number;
  items: ComplaintStatsItem[];
}

export interface ComplaintsResponse {
  page: number;
  limit: number;
  total: number;
  items: Complaint[];
}

export interface CreateComplaintDto {
  agentId: string;
  tags: ComplaintTag[];
  comment?: string;
}

export interface GetComplaintsParams {
  agentId: string;
  period?: 'week' | 'month' | 'all';
  page?: number;
  limit?: number;
}

export interface ComplaintsState {
  complaints: Complaint[];
  stats: {
    week: ComplaintStats | null;
    month: ComplaintStats | null;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  loading: boolean;
  error: string | null;
}
