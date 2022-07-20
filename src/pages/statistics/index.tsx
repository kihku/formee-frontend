import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import { StatisticsService } from "apis/statisticsService/statisticsService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomIcon } from "components/CustomIcon";
import { StyledInput } from "components/CustomTextField";
import { CustomTitle } from "components/CustomTitle";
import { monthListEng, monthListVi, weekListEng, weekListVi } from "constants/constants";
import ReactEcharts from "echarts-for-react";
import { StatisticsDTO } from "models/statistics";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { COLORS } from "styles";
import CommonUtils from "utils/commonUtils";
import DateUtils from "utils/dateUtils";

function StatisticsPage() {
  const { t } = useTranslation(["statistics"]);
  const currentLanguage = String(localStorage.getItem("i18nextLng"));

  const navigate = useNavigate();

  const [stats, setStats] = useState<StatisticsDTO[]>([]);
  const [periodType, setPeriodType] = useState<string>("WEEK");
  const [categoryType, setCategoryType] = useState<string>("sales");

  const getAllStatistics = async () => {
    await new StatisticsService().getAllStatistics(periodType).then(response => {
      response.result && setStats(response.result);
    });
  };

  useEffect(() => {
    CommonUtils.setPageTitle(t("commons:title_statistics"));
  }, []);

  useEffect(() => {
    getAllStatistics();
  }, [periodType]);

  const getRevenueChartOption = () => {
    return {
      toolbox: {
        show: false,
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
          data:
            periodType === "YEAR"
              ? currentLanguage === "en"
                ? monthListEng
                : monthListVi
              : periodType === "MONTH"
              ? Array.from(
                  { length: DateUtils.getWeekCount(2022, new Date().getMonth()) - 1 },
                  (item, index) => `${currentLanguage === "en" ? "Week" : "Tuần"} ${index + 1}`,
                )
              : currentLanguage === "en"
              ? weekListEng
              : weekListVi,
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
          name: "Doanh thu",
          type: "bar",
          data:
            stats.length > 0
              ? JSON.parse(stats.find(stat => stat.type === "REVENUE")?.data["2022"])["income"].map((item: any) => {
                  return { value: item, itemStyle: { color: COLORS.green } };
                })
              : [],
        },
        {
          name: t("stats_chart_revenue_subtitle"),
          type: "line",
          smooth: true,
          yAxisIndex: 0,
          lineStyle: {
            color: COLORS.red,
          },
          data:
            stats.length > 0
              ? JSON.parse(stats.find(stat => stat.type === "REVENUE")?.data["2022"])["revenue"].map((item: any) => {
                  return { value: item, itemStyle: { color: COLORS.red } };
                })
              : [],
        },
      ],
    };
  };

  const getCustomerChartOption = () => {
    return {
      toolbox: {
        show: false,
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
          data:
            periodType === "YEAR"
              ? currentLanguage === "en"
                ? monthListEng
                : monthListVi
              : periodType === "MONTH"
              ? Array.from(
                  { length: DateUtils.getWeekCount(2022, new Date().getMonth()) - 1 },
                  (item, index) => `${currentLanguage === "en" ? "Week" : "Tuần"} ${index + 1}`,
                )
              : currentLanguage === "en"
              ? weekListEng
              : weekListVi,
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
          minInterval: 1,
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
        show: false,
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
          name: t(`stats_chart_category_subtitle_${categoryType}`),
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          emphasis: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          label: {
            show: false,
          },
          data:
            stats.length > 0
              ? Object.keys(JSON.parse(stats.find(stat => stat.type === "SALES")?.data[`${categoryType}`])).map(
                  (key: any) => {
                    return {
                      value: JSON.parse(stats.find(stat => stat.type === "SALES")?.data[`${categoryType}`])[`${key}`],
                      name: key,
                    };
                  },
                )
              : [],
        },
      ],
    };
  };

  const getTopProductsChartOption = () => {
    return {
      toolbox: {
        show: false,
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

  const getTypeByLanguage = (type: string) => {
    switch (type) {
      case "WEEK":
        return currentLanguage === "en" ? " for Week " : "của Tuần ";
      case "MONTH":
        return currentLanguage === "en" ? " for " : " của Tháng ";
      case "YEAR":
        return currentLanguage === "en" ? " for " : " của Năm ";
    }
  };

  const getTitleByType = () => {
    let result = t("stats_title");
    result += ` ${getTypeByLanguage(periodType)}`;
    switch (periodType) {
      case "WEEK":
        result += DateUtils.getWeekNum(new Date());
        result += `, ${currentLanguage === "en" ? " " : "Tháng "} ${DateUtils.getMonthByLanguage(
          new Date(),
          currentLanguage,
        )}`;
        result += `, ${new Date().getFullYear()}`;
        break;
      case "MONTH":
        result += `${DateUtils.getMonthByLanguage(new Date(), currentLanguage)}`;
        result += `, ${new Date().getFullYear()}`;
        break;
      case "YEAR":
        result += `${new Date().getFullYear()}`;
        break;
    }
    return result;
  };

  return (
    <Grid container sx={{ paddingY: 5, paddingX: 3 }}>
      <Grid item xs={12} sx={{ fontWeight: 800, fontSize: "30px", marginBottom: 4, paddingX: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <CustomTitle text={[{ text: getTitleByType(), highlight: true }]} />
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Select
              value={periodType}
              onChange={e => {
                setPeriodType(e.target.value);
              }}
              input={<StyledInput />}
            >
              {[
                {
                  title: currentLanguage === "en" ? "This week" : "Theo tuần",
                  value: "WEEK",
                },
                {
                  title: currentLanguage === "en" ? "This month" : "Theo tháng",
                  value: "MONTH",
                },
                {
                  title: currentLanguage === "en" ? "This year" : "Theo năm",
                  value: "YEAR",
                },
              ].map((option, key) => {
                return <MenuItem value={option.value}>{option.title}</MenuItem>;
              })}
            </Select>
          </Box>
        </Box>
      </Grid>
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
            <Box sx={{ fontWeight: 500, fontSize: "20px" }}>{t("stats_products_title")}</Box>
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
              <Box sx={{ textAlign: "center" }}>{t("stats_products_total")}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "PRODUCT")?.data["outOfStock"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{t("stats_products_out_of_stock")}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "PRODUCT")?.data["totalTypes"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{t("stats_products_type")}</Box>
            </Box>
          </Box>
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={4} sx={{ paddingX: 2 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"auto"} padding={-1}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <Box sx={{ fontWeight: 500, fontSize: "20px" }}>{t("stats_customers_title")}</Box>
            <Box
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
                {t("stats_customers_manage")}
              </Typography>
              <CustomIcon name={"rightArrow"} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "CUSTOMER")?.data["total"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{t("stats_customers_total")}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "CUSTOMER")?.data["new"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{t("stats_customers_new")}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "CUSTOMER")?.data["returning"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{t("stats_customers_returing")}</Box>
            </Box>
          </Box>
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={8} sx={{ paddingX: 2, height: "45vh", marginTop: 4 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"100%"} padding={-1}>
          <ReactEcharts option={getRevenueChartOption()} style={{ height: "100%" }} />
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={4} sx={{ paddingX: 2, height: "45vh", marginTop: 4, position: "relative" }}>
        <Box sx={{ position: "absolute", right: 40, top: 18, zIndex: 99 }}>
          <Select
            value={categoryType}
            onChange={e => {
              setCategoryType(e.target.value);
            }}
            input={<StyledInput />}
          >
            {[
              {
                title: currentLanguage === "en" ? "By sales" : "Số lượng",
                value: "sales",
              },
              {
                title: currentLanguage === "en" ? "By income" : "Doanh thu",
                value: "income",
              },
              {
                title: currentLanguage === "en" ? "By revenue" : "Thu nhập",
                value: "revenue",
              },
            ].map((option, key) => {
              return <MenuItem value={option.value}>{option.title}</MenuItem>;
            })}
          </Select>
        </Box>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"100%"} padding={-1}>
          <ReactEcharts option={getCategoriesChartOption()} style={{ height: "100%", zIndex: 1 }} />
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
