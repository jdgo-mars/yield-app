import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { ForceGraph2D } from "react-force-graph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useData } from "@/hooks/use-data";

const graphData = {
  nodes: [
    { id: "Node 1", group: 1 },
    { id: "Node 2", group: 1 },
    { id: "Node 3", group: 2 },
    { id: "Node 4", group: 2 },
    { id: "Node 5", group: 3 },
  ],
  links: [
    { source: "Node 1", target: "Node 2" },
    { source: "Node 1", target: "Node 3" },
    { source: "Node 2", target: "Node 4" },
    { source: "Node 3", target: "Node 4" },
    { source: "Node 4", target: "Node 5" },
  ],
};

function getRelatedCompanies(): Promise<{ results: { ticker: string }[] }> {
  const url =
    "https://api.polygon.io/v1/related-companies/AAPL?apiKey=Ad9CdofH2WsrU6IYZLg0bIaKbQd8SpOw";

  return fetch(url).then((res) => res.json());
}

export const RelatedCompanies = () => {
  const relatedCompaniesCallback = useCallback(() => getRelatedCompanies(), []);

  const { data } = useData(relatedCompaniesCallback);

  return <ForceDirectedGraph data={data?.results || []} />;
};
function ForceDirectedGraph({ data }: { data: any[] }) {
  const graphRef = useRef<any>();
  const [width, setWidth] = useState(0);

  const dd = useMemo(() => {
    return {
      nodes: data.map((d: any) => ({ id: d.ticker, name: d.ticker })),
      links: data.map((d: any) => ({ source: "AAPL", target: d.ticker })),
    };
  }, [data]);

  dd.nodes.push({ id: "AAPL", name: "AAPL" });

  useEffect(() => {
    setWidth(graphRef.current.offsetWidth);
  }, [graphRef]);

  console.log(graphRef.current);
  return (
    <Card ref={graphRef} className="w-full mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle>Force-Directed Graph</CardTitle>
        <CardDescription>
          A visualization of interconnected nodes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="bg-gray-100 rounded-sm cursor-grab"
          style={{ width: "100%" }}
        >
          <ForceGraph2D
            width={width}
            height={400}
            graphData={dd ?? []}
            nodeAutoColorBy="group"
            nodeLabel={(node) => node.name}
            nodeCanvasObjectMode={() => "before"}
            nodeCanvasObject={(node, ctx) => {
              const radius = 2;

              ctx.beginPath();
              ctx.fillStyle = "white";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.font = "7px sans-serif";
              ctx.fillText(node.name, node.x, node.y);

              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
              ctx.fillStyle = "blue";
              ctx.fill();
              ctx.strokeStyle = "black";
              ctx.stroke();

              // Add label
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
