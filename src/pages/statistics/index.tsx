import { Box, Grid, Typography } from "@mui/material";
import { StatisticsService } from "apis/statisticsService/statisticsService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomIcon } from "components/CustomIcon";
import { monthListEng, monthListVi } from "constants/constants";
import ReactEcharts from "echarts-for-react";
import { StatisticsDTO } from "models/statistics";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { COLORS } from "styles";

function StatisticsPage() {
  const { t } = useTranslation(["statistics"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const navigate = useNavigate();

  const [stats, setStats] = useState<StatisticsDTO[]>([]);

  const getAllStatistics = async () => {
    await new StatisticsService().getAllStatistics().then(response => {
      response.result && setStats(response.result);
    });
  };

  useEffect(() => {
    getAllStatistics();
  }, []);

  const getRevenueChartOption = () => {
    return {
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            type: "png",
          },
        },
        showTitle: true,
        right: "5%",
      },
      title: {
        text: t("stats_chart_revenue"),
        textStyle: {
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: 500,
          color: COLORS.text,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          fontFamily: "Inter",
        },
      },
      xAxis: [
        {
          type: "category",
          data: currentLanguage === "en" ? monthListEng : monthListVi,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            rotate: 45,
            fontFamily: "Inter",
          },
          offset: 6,
        },
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            fontFamily: "Inter",
          },
        },
      ],
      series: [
        {
          name: t("stats_chart_revenue_subtitle"),
          type: "bar",
          data:
            stats.length > 0
              ? JSON.parse(stats.find(stat => stat.type === "REVENUE")?.data["2022"]).map((item: any) => {
                  return { value: item, itemStyle: { color: COLORS.green } };
                })
              : [],
        },
      ],
    };
  };

  const getCustomerChartOption = () => {
    return {
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            type: "png",
          },
        },
        showTitle: true,
        right: "5%",
      },
      title: {
        text: t("stats_chart_customer"),
        textStyle: {
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: 500,
          color: COLORS.text,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          fontFamily: "Inter",
        },
      },
      xAxis: [
        {
          type: "category",
          data: currentLanguage === "en" ? monthListEng : monthListVi,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            rotate: 45,
            fontFamily: "Inter",
          },
          offset: 6,
        },
      ],
      yAxis: [
        {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            fontFamily: "Inter",
          },
        },
      ],
      series: [
        {
          name: t("stats_chart_customer_subtitle"),
          type: "line",
          smooth: true,
          lineStyle: {
            color: COLORS.red,
          },
          data:
            stats.length > 0
              ? JSON.parse(stats.find(stat => stat.type === "CUSTOMER_NUMBER")?.data["2022"]).map((item: any) => {
                  return { value: item, itemStyle: { color: COLORS.red } };
                })
              : [],
        },
      ],
    };
  };

  const getCategoriesChartOption = () => {
    return {
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            type: "png",
          },
        },
        showTitle: true,
        right: "5%",
      },
      grid: { containLabel: true },
      title: {
        text: t("stats_chart_category"),
        textStyle: {
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: 500,
          color: COLORS.text,
        },
      },
      tooltip: {
        trigger: "item",
        textStyle: {
          fontFamily: "Inter",
        },
      },
      legend: {
        bottom: "0%",
        left: "center",
        textStyle: {
          fontFamily: "Inter",
        },
      },
      color: [COLORS.blue, COLORS.red, COLORS.orange, COLORS.yellow, COLORS.green, COLORS.primary, COLORS.gray],
      series: [
        {
          name: t("stats_chart_category_subtitle"),
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          emphasis: {
            label: {
              show: true,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          label: {
            fontFamily: "Inter",
          },
          data:
            stats.length > 0
              ? Object.keys(stats.find(stat => stat.type === "SALES")?.data).map((key: any) => {
                  return { value: stats.find(stat => stat.type === "SALES")?.data[`${key}`], name: key };
                })
              : [],
        },
      ],
    };
  };

  const getTopProductsChartOption = () => {
    return {
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            type: "png",
          },
        },
        showTitle: true,
        right: "5%",
      },
      grid: { containLabel: true },
      title: {
        text: t("stats_chart_top_proucts"),
        textStyle: {
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: 500,
          color: COLORS.text,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          fontFamily: "Inter",
        },
      },
      xAxis: [
        {
          type: "value",
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            fontFamily: "Inter",
          },
          offset: 6,
        },
      ],
      yAxis: [
        {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            fontFamily: "Inter",
          },
          data: stats.length > 0 ? Object.keys(stats.find(stat => stat.type === "TOP_PRODUCTS")?.data) : [],
        },
      ],
      series: [
        {
          name: t("stats_chart_top_proucts_subtitle"),
          type: "bar",
          emphasis: {
            focus: "series",
          },
          data:
            stats.length > 0
              ? Object.keys(stats.find(stat => stat.type === "TOP_PRODUCTS")?.data).map((key: any) => {
                  return {
                    value: stats.find(stat => stat.type === "TOP_PRODUCTS")?.data[`${key}`],
                    itemStyle: { color: COLORS.primaryLight },
                  };
                })
              : [],
        },
      ],
    };
  };

  return (
    <Grid container sx={{ paddingY: 5, paddingX: 3 }}>
      <Grid item xs={4} sx={{ paddingX: 2 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"auto"} padding={-1}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <Box sx={{ fontWeight: 500, fontSize: "20px" }}>
              {/* {"Thống kê đơn hàng"} */}
              {t("stats_orders_title")}
            </Box>
            <Box
              onClick={() => {
                navigate("/orders");
              }}
              sx={{ display: "flex", cursor: "pointer", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: COLORS.lightText,
                  ":hover": { textDecoration: "underline" },
                }}
              >
                {/* {"Quản lý đơn hàng"} */}
                {t("stats_orders_manage")}
              </Typography>
              <CustomIcon name={"rightArrow"} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "ORDER")?.data["total"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Tổng số"} */}
                {t("stats_orders_total")}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "ORDER")?.data["completed"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Hoàn thành"} */}
                {t("stats_orders_completed")}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "ORDER")?.data["pending"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Chờ xác nhận"} */}
                {t("stats_orders_pending")}
              </Box>
            </Box>
          </Box>
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={4} sx={{ paddingX: 2 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"auto"} padding={-1}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <Box sx={{ fontWeight: 500, fontSize: "20px" }}>
              {/* {"Thống kê sản phẩm"} */}
              {t("stats_products_title")}
            </Box>
            <Box
              onClick={() => {
                navigate("/products");
              }}
              sx={{ display: "flex", cursor: "pointer", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: COLORS.lightText,
                  ":hover": { textDecoration: "underline" },
                }}
              >
                {/* {"Quản lý sản phẩm"} */}
                {t("stats_products_manage")}
              </Typography>
              <CustomIcon name={"rightArrow"} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "PRODUCT")?.data["total"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Tổng số"} */}
                {t("stats_products_total")}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "PRODUCT")?.data["outOfStock"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Hết hàng"} */}
                {t("stats_products_out_of_stock")}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "PRODUCT")?.data["totalTypes"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Phân loại"} */}
                {t("stats_products_type")}
              </Box>
            </Box>
          </Box>
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={4} sx={{ paddingX: 2 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"auto"} padding={-1}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <Box sx={{ fontWeight: 500, fontSize: "20px" }}>
              {/* {"Thống kê khách hàng"} */}
              {t("stats_customers_title")}
            </Box>
            {/* <Box
              onClick={() => {
                navigate("/customers");
              }}
              sx={{ display: "flex", cursor: "pointer", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: COLORS.lightText,
                  ":hover": { textDecoration: "underline" },
                }}
              >
                {"Quản lý khách hàng"}
              </Typography>
              <CustomIcon name={"rightArrow"} />
            </Box> */}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "CUSTOMER")?.data["total"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Tổng số"} */}
                {t("stats_customers_total")}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "CUSTOMER")?.data["new"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Khách hàng mới"} */}
                {t("stats_customers_new")}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "CUSTOMER")?.data["returning"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {/* {"Khách hàng quay lại"} */}
                {t("stats_customers_returing")}
              </Box>
            </Box>
          </Box>
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={8} sx={{ paddingX: 2, height: "45vh", marginTop: 4 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"100%"} padding={-1}>
          <ReactEcharts option={getRevenueChartOption()} style={{ height: "100%" }} />
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={4} sx={{ paddingX: 2, height: "45vh", marginTop: 4 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"100%"} padding={-1}>
          <ReactEcharts option={getCategoriesChartOption()} style={{ height: "100%" }} />
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={8} sx={{ paddingX: 2, height: "45vh", marginTop: 10, marginBottom: 6 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"100%"} padding={-1}>
          <ReactEcharts option={getCustomerChartOption()} style={{ height: "100%" }} />
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={4} sx={{ paddingX: 2, height: "45vh", marginTop: 10, marginBottom: 6 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"100%"} padding={-1}>
          <ReactEcharts option={getTopProductsChartOption()} style={{ height: "100%" }} />
        </CustomBackgroundCard>
      </Grid>
    </Grid>
  );
}
export default StatisticsPage;
