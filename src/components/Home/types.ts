import { FeePairDTO } from "../utils/feePair";

export interface UseHome {
  records: FeePairDTO[][];
  fetching: boolean;
  seeLastXDays: (count: number) => void;
  seeLastMonth: () => void;
}
