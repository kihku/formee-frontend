import { Box, Grid, IconButton, Typography } from "@mui/material";
import { StatisticsService } from "apis/statisticsService/statisticsService";
import { CustomBackgroundCard } from "components/CustomBackgroundCard";
import { CustomIcon } from "components/CustomIcon";
import ReactEcharts from "echarts-for-react";
import { StatisticsDTO } from "models/statistics";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "styles";

function StatisticsPage() {
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
        showTitle: false,
      },
      title: {
        text: "Thống kê thu nhập theo tháng",
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
          data: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
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
          name: "Thu nhập",
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
        showTitle: false,
      },
      title: {
        text: "Thống kê khách hàng theo tháng",
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
          data: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
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
          name: "Số khách hàng",
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
        showTitle: false,
      },
      title: {
        text: "Thống kê loại sản phẩm",
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
          name: "Số lượng đã bán",
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
        showTitle: false,
      },
      grid: { containLabel: true },
      title: {
        text: "Thống kê sản phẩm bán chạy",
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
          name: "Số lượng đã bán",
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
            <Box sx={{ fontWeight: 500, fontSize: "20px" }}>{"Thống kê đơn hàng"}</Box>
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
                {"Quản lý đơn hàng"}
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
              <Box sx={{ textAlign: "center" }}>{"Tổng số"}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "ORDER")?.data["completed"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{"Hoàn thành"}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "ORDER")?.data["pending"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{"Chờ xác nhận"}</Box>
            </Box>
          </Box>
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={4} sx={{ paddingX: 2 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"auto"} padding={-1}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <Box sx={{ fontWeight: 500, fontSize: "20px" }}>{"Thống kê sản phẩm"}</Box>
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
                {"Quản lý sản phẩm"}
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
              <Box sx={{ textAlign: "center" }}>{"Tổng số"}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "PRODUCT")?.data["outOfStock"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{"Hết hàng"}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "PRODUCT")?.data["totalInventory"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{"Tổng kho"}</Box>
            </Box>
          </Box>
        </CustomBackgroundCard>
      </Grid>
      <Grid item xs={4} sx={{ paddingX: 2 }}>
        <CustomBackgroundCard sizeX={"auto"} sizeY={"auto"} padding={-1}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <Box sx={{ fontWeight: 500, fontSize: "20px" }}>{"Thống kê khách hàng"}</Box>
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
                {"Quản lý khách hàng"}
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
              <Box sx={{ textAlign: "center" }}>{"Tổng số"}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "CUSTOMER")?.data["new"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{"Khách hàng mới"}</Box>
            </Box>
            <Box>
              <Box
                sx={{ fontWeight: 500, fontSize: "25px", marginBottom: 1, color: COLORS.primary, textAlign: "center" }}
              >
                {stats.find(stat => stat.type === "CUSTOMER")?.data["returning"]}
              </Box>
              <Box sx={{ textAlign: "center" }}>{"Khách hàng quay lại"}</Box>
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
