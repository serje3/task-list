import {ReportStatistics} from "@app/views/tasks/common/types/report-statistics";
import {Participant} from "@app/views/tasks/participants/types/participant";
import {ParticipantUsername} from "@app/views/tasks/common/types/common";


export type ReportResponse<Report extends Partial<Participant>> = {
  statistics: ReportStatistics['statistics']
  count: number
  results: Report[]
}
