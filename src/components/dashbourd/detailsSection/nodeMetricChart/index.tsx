import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@shared/ui"
import { Metric } from "@shared/api"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export type NodeMetricsChartProps = {
  readonly metrics: Metric[]
}

export const NodeMetricsChart = ({ metrics }: NodeMetricsChartProps) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "CPU",
        data: [],
        borderColor: "hsl(220, 70%, 75%)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Memory",
        data: [],
        borderColor: "hsl(160, 60%, 70%)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Disk",
        data: [],
        borderColor: "hsl(40, 80%, 70%)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.1,
      },
    ],
  })

  useEffect(() => {
    if (metrics.length) {
      const sortedMetrics = [...metrics].sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())

      const labels = sortedMetrics.map((metric) => new Date(metric.datetime).toLocaleTimeString())
      const cpuData = sortedMetrics.map((metric) => metric.cpu_utilization)
      const memoryData = sortedMetrics.map((metric) => metric.memory_utilization)
      const diskData = sortedMetrics.map((metric) => metric.disk_utilization)

      setChartData({
        labels,
        datasets: [
          { ...chartData.datasets[0], data: cpuData },
          { ...chartData.datasets[1], data: memoryData },
          { ...chartData.datasets[2], data: diskData },
        ],
      })
    } else {
      setChartData({
        labels: [],
        datasets: chartData.datasets,
      })
    }
  }, [metrics])

  if (chartData.labels.length === 0) {
    return (
      <div>
        <p>Нет доступных метрик</p>
      </div>
    )
  }

  return (
    <ChartContainer
      config={{
        cpu: {
          label: "CPU",
          color: "hsl(var(--chart-1))",
        },
        memory: {
          label: "Memory",
          color: "hsl(var(--chart-2))",
        },
        disk: {
          label: "Disk",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full"
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              enabled: true,
              external: (tooltipModel) => {
                if (!tooltipModel) return null
                return (
                  <ChartTooltip tooltipModel={tooltipModel}>
                    <ChartTooltipContent tooltipModel={tooltipModel} />
                  </ChartTooltip>
                )
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Время",
              },
            },
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: "Использование (%)",
              },
            },
          },
        }}
      />
    </ChartContainer>
  )
}
