import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase";

export function ScoreChart() {
  const labels = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
  const [series, setSeries] = useState<number[]>([0, 0, 0, 0, 0]);

  useEffect(() => {
    const feedbackRef = collection(db, "feedback");

    const unsubscribe = onSnapshot(feedbackRef, (snapshot) => {
      const scoreCounts = [0, 0, 0, 0, 0]; 

      snapshot.forEach((doc) => {
        const data = doc.data();
        const score = data.score;
        if (score >= 1 && score <= 5) {
          scoreCounts[score - 1]++;
        }
      });

      setSeries(scoreCounts);
    });

    return () => unsubscribe();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      width: 400,
      type: "donut",
    },
    labels,
    colors: ["#00E396", "#FEB019", "#FF4560", "#008FFB", "#ff28cd"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function (val, opts) {
        const total = opts.w.globals.series.reduce(
          (sum: any, val: any) => sum + val,
          0
        );
        const value = opts.w.globals.series[opts.seriesIndex];
        const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
        return `${val} - ${value} - <span style="color:#FF4560; font-weight:bold;">${percentage}%</span>`;
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { width: 520, height: 320 },
          legend: { position: "right" },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: { width: 420, height: 280 },
          legend: { position: "bottom" },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: { width: 300, height: 220 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm px-6 py-3 bg-white w-full max-w-2xl">
      <div className="flex items-center md:items-start justify-center md:justify-start">
        <h2 className="text-lg font-bold text-gray-700">
          KPI Score Distribution
        </h2>
      </div>
      <div className="flex justify-center">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="donut"
          width={380}
        />
      </div>
    </div>
  );
}
