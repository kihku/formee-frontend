import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded"; //about
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import DoubleArrowRoundedIcon from "@mui/icons-material/DoubleArrowRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ZoomOutMapRoundedIcon from "@mui/icons-material/ZoomOutMapRounded";
import ZoomInMapRoundedIcon from "@mui/icons-material/ZoomInMapRounded";
import GoogleIcon from "@mui/icons-material/Google";
import DeleteIcon from "@mui/icons-material/Delete";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditOffRoundedIcon from "@mui/icons-material/EditOffRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import { COLORS } from "styles";

export type IconType =
  | "notification"
  | "settings"
  | "about"
  | "add"
  | "visibleEyeOff"
  | "visibleEye"
  | "import"
  | "export"
  | "downArrow"
  | "upArrow"
  | "rightArrow"
  | "search"
  | "checkCircle"
  | "cancelCircle"
  | "calendar"
  | "nextArrow"
  | "previousArrow"
  | "doubleArrowRight"
  | "nextSkip"
  | "previousSkip"
  | "save"
  | "downFilledArrow"
  | "copyLink"
  | "close"
  | "edit"
  | "remove"
  | "star"
  | "starOutlined"
  | "squareCheckBox"
  | "squareCheckBoxChecked"
  | "lightAdd"
  | "addPhoto"
  | "reset"
  | "person"
  | "camera"
  | "logout"
  | "login"
  | "accessTime"
  | "bookmark"
  | "bookmarkOutlined"
  | "phone"
  | "zoomOut"
  | "zoomIn"
  | "google"
  | "download"
  | "delete"
  | "manage"
  | "refresh"
  | "refresh-partial"
  | "preview"
  | "share"
  | "duplicate"
  | "disableEdit"
  | "home"
  | "clearFilter";

interface IconProps {
  name: IconType;
  size?: number;
  color?: string;
}

// link to mui rounded icons
// https://mui.com/material-ui/material-icons/?theme=Rounded

export const CustomIcon = ({ name, size, color }: IconProps) => {
  const iconSize = size ?? 24;
  const iconColor = color ?? COLORS.lightText;
  const iconStyle = { width: iconSize, height: iconSize, fill: iconColor, overflow: "hidden" };

  switch (name) {
    //Header icon
    case "notification":
      return <NotificationsRoundedIcon sx={iconStyle} />;
    case "settings":
      return <SettingsIcon sx={iconStyle} />;
    case "about":
      return <HelpRoundedIcon sx={iconStyle} />;
    //Home- order icon
    case "add":
      return <AddBoxRoundedIcon sx={iconStyle} />;
    //Log in
    case "visibleEyeOff":
      return <VisibilityOffRoundedIcon sx={iconStyle} />;
    case "visibleEye":
      return <VisibilityRoundedIcon sx={iconStyle} />;
    //Form - order
    case "download":
    case "import":
      return <FileDownloadRoundedIcon sx={iconStyle} />;
    case "export":
      return <FileUploadRoundedIcon sx={iconStyle} />;
    //filter bar
    case "downArrow":
      return <KeyboardArrowDownRoundedIcon sx={iconStyle} />;
    case "upArrow":
      return <KeyboardArrowUpRoundedIcon sx={iconStyle} />;
    case "rightArrow":
      return <ChevronRightRoundedIcon sx={iconStyle} />;
    case "search":
      return <SearchRoundedIcon sx={iconStyle} />;
    case "checkCircle":
      return <CheckCircleRoundedIcon sx={iconStyle} />;
    case "cancelCircle":
      return <CancelRoundedIcon sx={iconStyle} />;
    case "calendar":
      return <CalendarMonthRoundedIcon sx={iconStyle} />;
    case "squareCheckBox":
      return <CheckBoxOutlineBlankRoundedIcon sx={iconStyle} />;
    case "squareCheckBoxChecked":
      return <CheckBoxRoundedIcon sx={iconStyle} />;
    //Pagination bar
    case "nextArrow":
      return <ArrowRightRoundedIcon sx={iconStyle} />;
    case "previousArrow":
      return <ArrowLeftRoundedIcon sx={iconStyle} />;
    case "doubleArrowRight":
      return <DoubleArrowRoundedIcon sx={iconStyle} />;
    case "nextSkip":
      return <SkipNextRoundedIcon sx={iconStyle} />;
    case "previousSkip":
      return <SkipPreviousRoundedIcon sx={iconStyle} />;
    //order details
    case "save":
      return <SaveRoundedIcon sx={iconStyle} />;
    case "downFilledArrow":
      return <ArrowDropDownRoundedIcon sx={iconStyle} />;
    case "copyLink":
      return <LinkRoundedIcon sx={iconStyle} />;
    case "close":
      return <CloseRoundedIcon sx={iconStyle} />;
    case "edit":
      return <EditRoundedIcon sx={iconStyle} />;
    case "remove":
      return <IndeterminateCheckBoxRoundedIcon sx={iconStyle} />;
    //Form gallery
    case "star":
      return <GradeRoundedIcon sx={iconStyle} />;
    case "starOutlined":
      return <StarBorderRoundedIcon sx={iconStyle} />;
    //Form view
    case "lightAdd":
      return <AddRoundedIcon sx={iconStyle} />;
    case "addPhoto":
      return <AddPhotoAlternateRoundedIcon sx={iconStyle} />;
    //create order
    case "reset":
      return <RestartAltRoundedIcon sx={iconStyle} />;
    //my account
    case "person":
      return <PersonRoundedIcon sx={iconStyle} />;
    case "camera":
      return <CameraAltRoundedIcon sx={iconStyle} />;
    case "logout":
      return <LogoutRoundedIcon sx={iconStyle} />;
    case "login":
      return <LoginRoundedIcon sx={iconStyle} />;
    //Template display
    case "accessTime":
      return <AccessTimeRoundedIcon sx={iconStyle} />;
    case "bookmark":
      return <BookmarkRoundedIcon sx={iconStyle} />;
    case "bookmarkOutlined":
      return <BookmarkBorderRoundedIcon sx={iconStyle} />;
    //extra
    case "phone":
      return <PhoneRoundedIcon sx={iconStyle} />;
    case "zoomOut":
      return <ZoomOutMapRoundedIcon sx={iconStyle} />;
    case "zoomIn":
      return <ZoomInMapRoundedIcon sx={iconStyle} />;
    //social media
    case "google":
      return <GoogleIcon sx={iconStyle} />;
    case "delete":
      return <DeleteIcon sx={iconStyle} />;
    case "manage":
      return <FactCheckRoundedIcon sx={iconStyle} />;
    case "refresh":
      return <AutorenewRoundedIcon sx={iconStyle} />;
    case "refresh-partial":
      return <AutoModeRoundedIcon sx={iconStyle} />;
    case "preview":
      return <ManageSearchRoundedIcon sx={iconStyle} />;
    case "share":
      return <ShareRoundedIcon sx={iconStyle} />;
    case "duplicate":
      return <ContentCopyRoundedIcon sx={iconStyle} />;
    case "disableEdit":
      return <EditOffRoundedIcon sx={iconStyle} />;
    case "home":
      return <HomeRoundedIcon sx={iconStyle} />;
    case "clearFilter":
      return <FilterAltOffRoundedIcon sx={iconStyle} />;
  }
};
