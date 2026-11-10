import AccessibilityNewOutlined from "@mui/icons-material/AccessibilityNewOutlined";
import BarChartOutlined from "@mui/icons-material/BarChartOutlined";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import SmartphoneOutlined from "@mui/icons-material/SmartphoneOutlined";

export const features = [
  { id: "performance", Icon: BoltOutlined },
  { id: "mobile", Icon: SmartphoneOutlined },
  { id: "accessibility", Icon: AccessibilityNewOutlined },
  { id: "business", Icon: BarChartOutlined },
] as const;
