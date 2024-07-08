const testomonials = document.getElementById("testomonials");
const bars = document.getElementById("mobileBar");
const mobileMenu = document.getElementById("mobileMenu");
const desktopMenu = document.getElementById("desktopMenu");
const closeMobileMenuBtn = document.getElementById("closeMobileMenu");
const shareHide = document.getElementById("shareHide");
const navbar = document.getElementById("navbar");
const input = document.getElementById("input");
const logoSvg = document.getElementById("logosvg");
const shareBtn = document.getElementById("sharebtn");
const buttonNavbar = document.getElementById("buttonnavbar");
const mobileBar = document.getElementById("barimg");

// aos library  initialized
AOS.init();


// func which gives navbar a fade in effect
function showElement(element) {
  element.style.opacity = 0;
  element.style.display = "flex";
  element.style.visibility = "visible";
  let opacity = 0;

  const fadeIn = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(fadeIn);
    } else {
      opacity += 0.1;
      element.style.opacity = opacity;
    }
  }, 30);
}

function hideElement(element) {
  let opacity = 1;

  /// same as above but fade out effect
  const fadeOut = setInterval(() => {
    if (opacity <= 0) {
      clearInterval(fadeOut);
      element.style.display = "none";
      element.style.visibility = "hidden";
    } else {
      opacity -= 0.1;
      element.style.opacity = opacity;
    }
  }, 30);
}
/// toggle navbar 
bars.addEventListener("click", () => {
  if (mobileMenu.style.display === "none" || mobileMenu.style.display === "") {
    showElement(mobileMenu);
    hideElement(shareHide);
  }
});

// toggle navbaar
closeMobileMenuBtn.addEventListener("click", () => {
  if (mobileMenu.style.display === "flex") {
    hideElement(mobileMenu);
    showElement(shareHide);
  }
});


/// initialy  mobile menu is hidden and desktop menu is not
mobileMenu.style.display = "none";
desktopMenu.style.display = "flex";


// this func changes the color of navbar and texts  when it is about to reach 2nd page
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight - 100) {
    navbar.classList.add("bg-[#F3F3F3]");
    navbar.style.color = "#000";
    logoSvg.src = "./assets/black log.svg";
    navbar.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
    navbar.style.padding = "12px 18px";
    shareBtn.style.filter = "invert(1)";
    buttonNavbar.style.borderColor = "#115CD9";
    buttonNavbar.style.color = "black";
    mobileBar.style.filter = "invert(1)";
  } else {
    navbar.classList.remove("bg-[#F3F3F3]");
    navbar.style.color = "";
    navbar.style.padding = "24px 36px";
    navbar.style.boxShadow = "";
    logoSvg.src = "./assets/logo.svg";
    shareBtn.style.filter = "";
    buttonNavbar.style.borderColor = "";
    buttonNavbar.style.color = "";
    mobileBar.style.filter = "";
  }
});


//// initializing chart js
const ctx = document.getElementById("myChart").getContext("2d");
// providing data 
const data = {
  labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "WPPOOL",
      data: [
        5, 10, 25, 35, 45, 55, 50, 60, 65, 55, 60, 50, 55, 45, 50, 40, 45, 40,
        45, 50, 55, 50, 55, 60, 65, 70, 75, 70, 75, 80, 75, 80, 85, 80, 75, 70,
        65, 60, 55, 60, 55, 60, 65, 60, 55, 60, 55, 60, 65, 70,
      ],
      borderColor: "#FC714D",
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
    },
    {
      label: "Google",
      data: [
        5, 10, 15, 25, 30, 35, 30, 35, 30, 35, 30, 25, 30, 25, 30, 35, 30, 35,
        40, 45, 50, 45, 50, 55, 50, 55, 60, 65, 70, 75, 80, 85, 90, 85, 80, 75,
        70, 75, 80, 85, 80, 85, 90, 85, 80, 85, 80, 85, 90, 85,
      ],
      borderColor: "#615DE3",
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
    },
    {
      label: "Microsoft",
      data: [
        0, 15, 30, 40, 50, 60, 50, 55, 45, 50, 40, 35, 45, 55, 50, 45, 55, 50,
        45, 50, 45, 40, 45, 50, 45, 40, 35, 30, 35, 40, 45, 50, 55, 60, 65, 70,
        75, 80, 85, 90, 85, 80, 75, 70, 75, 70, 75, 80, 75, 70,
      ],
      borderColor: "#AFCD80",
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
    },
    {
      label: "Twitter",
      data: [
        0, 5, 10, 15, 20, 15, 20, 25, 20, 15, 20, 15, 10, 15, 10, 15, 20, 15,
        20, 25, 20, 25, 20, 25, 30, 25, 30, 35, 30, 35, 40, 35, 40, 45, 40, 45,
        50, 45, 50, 55, 50, 55, 60, 55, 50, 55, 50, 55, 60, 55,
      ],
      borderColor: "#6F34A1",
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 1.5,
      fill: false,
    },
  ],
};

/// configuration of data
const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 12,
          },
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          const meta = ci.getDatasetMeta(index);

          meta.hidden =
            meta.hidden === null ? !ci.data.datasets[index].hidden : null;
          ci.update();
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1) + "%";
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          padding: 20,
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: true,
        min: -10,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function (value) {
            return value + "%";
          },
          font: {
            size: 10,
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    hover: {
      mode: "index",
      intersect: false,
      onHover: function (e) {
        const points = this.getElementsAtEventForMode(
          e,
          "nearest",
          { intersect: true },
          false
        );
        if (points.length) {
          e.native.target.style.cursor = "pointer";
        } else {
          e.native.target.style.cursor = "default";
        }
      },
    },
  },
  plugins: [
    {
      afterDraw: (chart) => {
        const ctx = chart.ctx;
        chart.data.labels.forEach((label, index) => {
          const x = chart.scales.x.getPixelForTick(index);
          const yTop = chart.scales.y.top;
          const yBottom = chart.scales.y.bottom;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, yBottom);
          ctx.lineTo(x, yBottom + 10);
          ctx.strokeStyle = "#000";
          ctx.stroke();
          ctx.restore();
        });
      },
    },
  ],
};


const myChart = new Chart(ctx, config);

async function fetchData() {
  const response = await fetch("api-endpoint");
  const json = await response.json();

  myChart.data.labels = json.labels;
  myChart.data.datasets[0].data = json.wpPoolData;
  myChart.data.datasets[1].data = json.googleData;
  myChart.data.datasets[2].data = json.microsoftData;
  myChart.data.datasets[3].data = json.twitterData;
  myChart.update();
}
 
/// data to make dyamic table content
const dataMap = [
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Bakkt Holdings",
    ticker: "BKKT",
    vertical: "Wealth",
    price: 1.32,
    marketCap: 0.1,
    revenueGrowth: 38,
    grossMargin: null,
    evRevenue: 0.4,
    ytdPerformance: 15.8,
  },
  {
    company: "Virtu Financial Inc",
    ticker: "VIRT",
    vertical: "Wealth",
    price: 17.0,
    marketCap: 3.1,
    revenueGrowth: -22.0,
    grossMargin: 38.2,
    evRevenue: 2.6,
    ytdPerformance: -17.8,
  },
  // Duplicate rows to demonstrate scrolling
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Bakkt Holdings",
    ticker: "BKKT",
    vertical: "Wealth",
    price: 1.32,
    marketCap: 0.1,
    revenueGrowth: 38,
    grossMargin: null,
    evRevenue: 0.4,
    ytdPerformance: 15.8,
  },
  {
    company: "Virtu Financial Inc",
    ticker: "VIRT",
    vertical: "Wealth",
    price: 17.0,
    marketCap: 3.1,
    revenueGrowth: -22.0,
    grossMargin: 38.2,
    evRevenue: 2.6,
    ytdPerformance: -17.8,
  },
  // Duplicate rows to demonstrate scrolling
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Bakkt Holdings",
    ticker: "BKKT",
    vertical: "Wealth",
    price: 1.32,
    marketCap: 0.1,
    revenueGrowth: 38,
    grossMargin: null,
    evRevenue: 0.4,
    ytdPerformance: 15.8,
  },
  {
    company: "Virtu Financial Inc",
    ticker: "VIRT",
    vertical: "Wealth",
    price: 17.0,
    marketCap: 3.1,
    revenueGrowth: -22.0,
    grossMargin: 38.2,
    evRevenue: 2.6,
    ytdPerformance: -17.8,
  },
  // Duplicate rows to demonstrate scrolling
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Bakkt Holdings",
    ticker: "BKKT",
    vertical: "Wealth",
    price: 1.32,
    marketCap: 0.1,
    revenueGrowth: 38,
    grossMargin: null,
    evRevenue: 0.4,
    ytdPerformance: 15.8,
  },
  {
    company: "Virtu Financial Inc",
    ticker: "VIRT",
    vertical: "Wealth",
    price: 17.0,
    marketCap: 3.1,
    revenueGrowth: -22.0,
    grossMargin: 38.2,
    evRevenue: 2.6,
    ytdPerformance: -17.8,
  },
  // Duplicate rows to demonstrate scrolling
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Bakkt Holdings",
    ticker: "BKKT",
    vertical: "Wealth",
    price: 1.32,
    marketCap: 0.1,
    revenueGrowth: 38,
    grossMargin: null,
    evRevenue: 0.4,
    ytdPerformance: 15.8,
  },
  {
    company: "Virtu Financial Inc",
    ticker: "VIRT",
    vertical: "Wealth",
    price: 17.0,
    marketCap: 3.1,
    revenueGrowth: -22.0,
    grossMargin: 38.2,
    evRevenue: 2.6,
    ytdPerformance: -17.8,
  },
  // Duplicate rows to demonstrate scrolling
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Bakkt Holdings",
    ticker: "BKKT",
    vertical: "Wealth",
    price: 1.32,
    marketCap: 0.1,
    revenueGrowth: 38,
    grossMargin: null,
    evRevenue: 0.4,
    ytdPerformance: 15.8,
  },
  {
    company: "Virtu Financial Inc",
    ticker: "VIRT",
    vertical: "Wealth",
    price: 17.0,
    marketCap: 3.1,
    revenueGrowth: -22.0,
    grossMargin: 38.2,
    evRevenue: 2.6,
    ytdPerformance: -17.8,
  },
  // Duplicate rows to demonstrate scrolling
  // Duplicate rows to demonstrate scrolling
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
  {
    company: "Bakkt Holdings",
    ticker: "BKKT",
    vertical: "Wealth",
    price: 1.32,
    marketCap: 0.1,
    revenueGrowth: 38,
    grossMargin: null,
    evRevenue: 0.4,
    ytdPerformance: 15.8,
  },
  {
    company: "Virtu Financial Inc",
    ticker: "VIRT",
    vertical: "Wealth",
    price: 17.0,
    marketCap: 3.1,
    revenueGrowth: -22.0,
    grossMargin: 38.2,
    evRevenue: 2.6,
    ytdPerformance: -17.8,
  },
  // Duplicate rows to demonstrate scrolling
  {
    company: "Adyen",
    ticker: "AFRM",
    vertical: "Payments",
    price: 17.15,
    marketCap: 50.5,
    revenueGrowth: 49.0,
    grossMargin: 15.8,
    evRevenue: 6.3,
    ytdPerformance: 24.3,
  },
  {
    company: "Affirm",
    ticker: "AFRM",
    vertical: "Lending",
    price: 16.12,
    marketCap: 4.7,
    revenueGrowth: 32.0,
    grossMargin: 48.7,
    evRevenue: 4.9,
    ytdPerformance: 77.1,
  },
  {
    company: "Alkami Technology",
    ticker: "ALKT",
    vertical: "B2B SaaS",
    price: 16.27,
    marketCap: 1.5,
    revenueGrowth: 34.0,
    grossMargin: 53.0,
    evRevenue: 7.0,
    ytdPerformance: 10.0,
  },
  {
    company: "AvidXchange",
    ticker: "AVDX",
    vertical: "Payments",
    price: 10.21,
    marketCap: 2.0,
    revenueGrowth: 27.0,
    grossMargin: 61.5,
    evRevenue: 6.0,
    ytdPerformance: 10.5,
  },
];

//// creating dynamic table content
const tableBody = document.getElementById("tableBody");
/// function which render dynamic data
const renderTable = (data) => {
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.className = index % 2 !== 0 ? "bg-white" : "bg-[#F3F3F3]";
    row.innerHTML = `
        <td class="py-2 border-[0px] px-3">${item.company}</td>
        <td class="py-2 border-[0px] px-3">${item.ticker}</td>
        <td class="py-2 border-[0px] px-3">${item.vertical}</td>
        <td class="text-right border-[0px] py-2 px-3">$${item.price.toFixed(
          2
        )}</td>
        <td class="text-right border-[0px] py-2 px-3">$${item.marketCap.toFixed(
          1
        )}</td>
        <td class="text-right border-[0px] py-2 px-3">${item.revenueGrowth.toFixed(
          1
        )}%</td>
        <td class="text-right border-[0px] py-2 px-3">${
          item.grossMargin ? item.grossMargin.toFixed(1) + "%" : "--"
        }</td>
        <td class="text-right border-[0px] py-2 px-3">${item.evRevenue.toFixed(
          1
        )}</td>
        <td class="text-right border-[0px] py-2 px-3">${item.ytdPerformance.toFixed(
          1
        )}%</td>
      `;
    tableBody.appendChild(row);
  });
};
//calling the render table func and passing the data 
renderTable(dataMap);
/// filtering data based on search 
const inputFunc = (event) => {
  const filterText = event.target.value.toLowerCase();
  const filteredData = dataMap.filter(
    (item) =>
      item.company.toLowerCase().includes(filterText) ||
      item.ticker.toLowerCase().includes(filterText) ||
      item.vertical.toLowerCase().includes(filterText)
  );
  /// calling render table again with filtered data
  renderTable(filteredData);
};


////   images to  create dynamic cards
/// same process which was used above
const imageData = [
  { image: "./assets/srtipe.svg" },
  { image: "./assets/2nd.svg" },
  { image: "./assets/3rd.svg" },
  { image: "./assets/4th.svg" },
  { image: "./assets/5th.svg" },
  { image: "./assets/6th.svg" },
  { image: "./assets/7th.svg" },
  { image: "./assets/8th.svg" },
  { image: "./assets/9th.svg" },
  { image: "./assets/10th.svg" },
];

const card = document.getElementById("card");

const renderCard = (data) => {
  card.innerHTML = "";
  data.forEach((item) => {
    const divv = document.createElement("div");
    divv.innerHTML = `<div    data-aos="fade-up"
        data-aos-duration="1000" class="lg:w-[220px] w-[380px] h-[280px] lg:h-[120px] bg-[#FFFFFF] flex justify-center items-center"><img  class="w-[133px] h-[55.34px]" 
src=${item.image} alt=""></div>`;

    card.appendChild(divv);
  });
};

renderCard(imageData);
/// slider initialized using swiper js
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    spaceBetween: 10,
    slidesPerView: 1,
    breakpoints: {
      786: {
        slidesPerView: 2.2,
      },
    },
  });

  document.getElementById("next").addEventListener("click", () => {
    swiper.slideNext();
  });

  document.getElementById("prev").addEventListener("click", () => {
    swiper.slidePrev();
  });
});

///// same process to creare dynamic testomonials
const testomonialsData = [
  {
    image: "./assets/human1.svg",
    name: "By: Sahabuddin Sagor",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
  },
  {
    image: "./assets/human2.svg",
    name: "By: Nayem Khan",
    review: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    image: "./assets/human3.svg",
    name: "By: Sahabuddin Sagor",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
  },
  {
    image: "./assets/human1.svg",
    name: "By: Sahabuddin Sagor",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
  },
  {
    image: "./assets/human2.svg",
    name: "By: Nayem Khan",
    review: "Key Takeaways from Robotics Invest 2023",
  },
  {
    image: "./assets/human3.svg",
    name: "By: Sahabuddin Sagor",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.",
  },
];


const renderTestomonials = (data) => {
  testomonials.innerHTML = "";
  data.forEach((el) => {
    const testomonialsDiv = document.createElement("div");
    testomonialsDiv.innerHTML = ` <div  data-aos="fade-up"
                      data-aos-duration="1000" class="w-[380px] mt-[80px] relative  h-[240px] bg-[#FFFFFF]">
            <div class="absolute bottom-[148px] left-[20px]">
              <img
                src=${el.image}
                class="w-[120px] h-[120px]"
                alt=""
              />
            </div>
            <div class="pt-[98px] pl-[20px]">
              <h1 class="text-[14px] pb-[2px] text-[#2042B6]">${el.name}</h1>
              <p class="text-[#191618]">
                ${el.review}
              </p>
            </div>
            <button class="mt-[14px] mb-[20px] hover:bg-[#3a5ddf]   transition-all duration-300 ease-in-out transform ml-[20px] w-[93px] h-[30px] bg-[#2042B6] text-[14px] rounded-[124px] text-white"> Read More</button>
          </div>`;

    testomonials.appendChild(testomonialsDiv);
  });
};

renderTestomonials(testomonialsData);

/// dynamic comapny logos

const companiesLogoData = [
  {
    image: "./assets/1.svg",
  },
  {
    image: "./assets/2.svg",
  },
  {
    image: "./assets/3.svg",
  },
  {
    image: "./assets/4.svg",
  },
  {
    image: "./assets/5.svg",
  },
  {
    image: "./assets/6.svg",
  },
  {
    image: "./assets/7.svg",
  },
  {
    image: "./assets/8.svg",
  },
  {
    image: "./assets/9.svg",
  },
  {
    image: "./assets/10.svg",
  },
  {
    image: "./assets/11.svg",
  },
  {
    image: "./assets/12.svg",
  },
  {
    image: "./assets/13.svg",
  },
  {
    image: "./assets/14.svg",
  },
  {
    image: "./assets/15.svg",
  },
  {
    image: "./assets/16.svg",
  },
  {
    image: "./assets/17.svg",
  },
  {
    image: "./assets/18.svg",
  },
  {
    image: "./assets/19.svg",
  },
  {
    image: "./assets/20.svg",
  },
];

const companiesLogo = document.getElementById("companiesLogo");

const renderLogos = (data) => {
  companiesLogo.innerHTML = "";
  data.forEach((el) => {
    const logoDiv = document.createElement("div");
    logoDiv.innerHTML = `  <div data-aos="fade-up"
                      data-aos-duration="1000" class="lg:w-[220px] w-[380px] h-[280px] lg:h-[120px] flex justify-center items-center bg-[#FFFFFF]">
        <img src=${el.image} alt="">
   </div>`;
    companiesLogo.appendChild(logoDiv);
  });
};

renderLogos(companiesLogoData);
