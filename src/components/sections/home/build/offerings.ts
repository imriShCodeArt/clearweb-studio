import AllInclusiveOutlined from "@mui/icons-material/AllInclusiveOutlined";
import LayersOutlined from "@mui/icons-material/LayersOutlined";
import WebAssetOutlined from "@mui/icons-material/WebAssetOutlined";

export const offerings = [
  { id: "websites", Icon: WebAssetOutlined },
  { id: "applications", Icon: LayersOutlined },
  { id: "ongoing", Icon: AllInclusiveOutlined },
] as const;
