import generateFeePair, { FeePairDTO } from "@/components/utils/feePair";
import { GenerateRandomBodyDTO } from "@/components/utils/types";

export default function handler(req: any, res: any) {
  const { coinsArray, currenciesArray, endDate, startDate } =
    req.body as GenerateRandomBodyDTO;

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const iteratedDayObj = new Date(startDate);

  const daysDifference = Math.ceil(
    (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24)
  );

  const transactions = [] as FeePairDTO[][];
  let indexDay = 0;

  for (indexDay; indexDay <= daysDifference; indexDay++) {
    coinsArray.forEach((coin) => {
      currenciesArray.forEach((currency) => {
        transactions.push(
          generateFeePair(iteratedDayObj.toISOString(), currency, coin)
        );
      });
    });

    iteratedDayObj.setDate(iteratedDayObj.getDate() + 1);
  }

  setTimeout(() => {
    res.status(200).json(transactions);
  }, 1000);
}
