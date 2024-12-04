import { useState } from "react";
import { AppAreaChart } from "./app-areachart";
import { TickersAutocomplete } from "./autocomplete";
import { GainersLosers } from "./gainers-losers";

export const Discover = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>("");

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Discover</h2>
      <div className="grid gap-4 pt-4">
        <GainersLosers />
        <TickersAutocomplete
          setValue={setSelectedTicker}
          value={selectedTicker}
        />
        {selectedTicker && <AppAreaChart ticker={selectedTicker} />}
      </div>
    </div>
  );
};
