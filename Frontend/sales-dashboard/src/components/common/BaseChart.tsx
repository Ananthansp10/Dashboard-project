import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { LineChart, BarChart } from "echarts/charts";
import { TooltipComponent, GridComponent, TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([LineChart, BarChart, TooltipComponent, GridComponent, TitleComponent, CanvasRenderer]);

export interface BaseChartProps {
  title: string;
  xAxisData: string[];
  seriesData: number[];
  type?: "line" | "bar";
}

const BaseChart: React.FC<BaseChartProps> = ({ title, xAxisData, seriesData, type = "line" }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chartInstance: echarts.ECharts | undefined = undefined;
    if(chartRef.current) {
      chartInstance = echarts.init(chartRef.current);
      chartInstance.setOption({
        title: { text: title, left: 'center', textStyle: { fontSize: 16 } },
        tooltip: {},
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: xAxisData },
        yAxis: { type: 'value' },
        series: [
          {
            data: seriesData,
            type: type,
            smooth: true,
            itemStyle: { color: '#4f46e5' }
          }
        ]
      });
    }
    return () => {
      chartInstance?.dispose();
    };
  }, [title, type, xAxisData, seriesData]);

  return <div ref={chartRef} className="w-full h-[340px] md:h-[400px]" />;
};

export default BaseChart;
