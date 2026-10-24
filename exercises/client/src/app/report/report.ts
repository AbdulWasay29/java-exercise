import { ReportItem } from '@app/report/report-item';

export interface Report {
  id: number;
  ID?: number;
  employeeId: number;
  items: ReportItem[];
  date: string;
}
