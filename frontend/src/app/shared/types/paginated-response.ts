export interface PaginatedResponse<Response> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Response[];
}

