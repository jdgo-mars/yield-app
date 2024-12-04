import { ISnapshotTickers } from "@polygon.io/client-js";
import { motion, useAnimation } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function InfiniteScrollTicker({
  items,
}: {
  items: Required<ISnapshotTickers>["tickers"];
}) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: [0, -2000] });
  }, []);

  return (
    <div className="w-full overflow-hidden bg-background py-3 border-y">
      <motion.div
        dragDirectionLock={true}
        drag="x"
        animate={controls}
        dragConstraints={{ left: -2000, right: 0 }}
        className="flex whitespace-nowrap"
        onHoverStart={() => controls.stop()}
        onHoverEnd={() => controls.start({ x: [0, -2000] })}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {!items.length ? (
          <Skeleton className="w-full h-6" />
        ) : (
          items.length &&
          items.map((item, index) => (
            <div key={index} className="inline-flex items-center mx-4">
              <span className="font-bold text-foreground">{item.ticker}</span>
              <span className="ml-2 text-muted-foreground">
                ${item.day?.c!.toFixed(2)}
              </span>
              <span
                className={`ml-2 flex items-center ${
                  item.todaysChangePerc! >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.todaysChangePerc! >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {Math.abs(item.todaysChangePerc!).toFixed(2)}%
              </span>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}
