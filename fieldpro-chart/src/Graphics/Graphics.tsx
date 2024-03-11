import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import dayjs from "dayjs";

interface DataEntry {
  degree_days: number;
  time: number;
  precipitation: number;
  ndvi: number;
}

const GrowthStage: React.FC<{ data: DataEntry[] }> = ({ data }) => {
  const colors: string[] = ["#126ede", "#91CC75", "#ed9121"];

  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(
    null
  );

  useEffect(() => {
    if (!chartInstance) {
      const chart = echarts.init(document.getElementById("chart-container")!);
      setChartInstance(chart);
    }
  }, [chartInstance]);

  useEffect(() => {
    if (chartInstance) {
      const formattedData = data
        .map((entry) => {
          return {
            degree_days: entry.degree_days,
            time: dayjs.unix(entry.time).format("DD/MM"),
            precipitation: entry.precipitation,
            ndvi: entry.ndvi,
          };
        })
        .filter((data, i) => i < 7);
      const option: echarts.EChartsOption = {
        color: colors,

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },

        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
              interval: 29,
            },
            data: formattedData.map((entry) => entry.time),
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Accum Rainfall",
            position: "left",
            axisLine: {
              show: true,
              lineStyle: {
                color: '#676767',
              },
            },
            axisLabel: {
              formatter: "{value} mm",
            },
          },
          {
            type: "value",
            name: "Degree Days",
            position: "right",

            axisLine: {
              show: true,
              lineStyle: {
                color: '#676767',
              },
              onZero: true,
            },
            axisLabel: {
              formatter: "{value} °C",
            },
          },
          {
            type: "value",
            name: "",
            position: "right",
            alignTicks: true,
            offset: 80,
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: colors[2],
              },
            },
          },
        ],
        series: [
          {
            name: "Accum Rainfall",
            type: "bar",
            yAxisIndex: 0,
            data: formattedData.map((entry) => entry.precipitation),
            label: {
              show: true,
              position: 'top'
            },
          },
          {
            name: "Degree Days",
            type: "line",
            yAxisIndex: 1,
            symbol: "none",
            lineStyle: {
              color: colors[2],
            },
            data: formattedData.map((entry) => entry.degree_days),
            smooth: true,
          },
          {
            name: "NDVI",
            type: "line",
            lineStyle: {
              type: "dotted",
              color: colors[1],
            },
            symbol: "none",
            yAxisIndex: 2,

            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: colors[1],
                },
                {
                  offset: 1,
                  color: "#e5f8e5",
                },
              ]),
            },
            data: formattedData.map((entry) => entry.ndvi),
            smooth: true,
          },
        ],
      };

      chartInstance.setOption(option);
    }
  }, [chartInstance, data]);

  return (
    <div id="chart-container" style={{ width: "100%", height: "500px" }} />
  );
};

export default GrowthStage;
