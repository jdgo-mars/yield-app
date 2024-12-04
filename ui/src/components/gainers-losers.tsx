import { useData } from "@/hooks/use-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useCallback } from "react";
import InfiniteScrollTicker from "./infinite-scroll-ticker";
import { restClient } from "@polygon.io/client-js";

function getGainersLosers(type: "gainers" | "losers") {
  const rest = restClient(import.meta.env.VITE_POLY_API_KEY);

  return rest.stocks.snapshotGainersLosers(type);
}

export const GainersLosers = () => {
  const losersCallback = useCallback(() => getGainersLosers("losers"), []);
  const gainersCallback = useCallback(() => getGainersLosers("gainers"), []);

  const { data: gainers } = useData(gainersCallback);
  const { data: losers } = useData(losersCallback);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Gainers/Losers</CardTitle>
      </CardHeader>
      <CardContent>
        <InfiniteScrollTicker items={gainers?.tickers || []} />
        <InfiniteScrollTicker items={losers?.tickers || []} />
      </CardContent>
    </Card>
  );
};
export const Gainers = () => {
  const gainersCallback = useCallback(() => getGainersLosers("gainers"), []);

  const { data } = useData(gainersCallback);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Gainers</CardTitle>
        <CardDescription>
          Contains the top 20 stocks with the highest percentage since the
          previous day's close.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InfiniteScrollTicker items={data?.tickers || []} />
      </CardContent>
    </Card>
  );
};
