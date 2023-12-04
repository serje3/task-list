export interface ReportStatistics {
  statistics: {
    last_success_scan: {
      started_at: string
    }
    last_in_progress_likes_scan: {
      started_at: string,
      predicted_finish: string
    }
    last_in_progress_comments_scan: {
      started_at: string,
      predicted_finish: string
    }
    post_count: number
    report_post_count: number
    vip_post_count: number
  };
}
