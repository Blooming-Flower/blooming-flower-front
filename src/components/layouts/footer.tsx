import logo from "@images/common/btn-close.png";
import { Hidden, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import useClasses from "@utils/useClasses";

const Footer = () => {
  const [value, setValue] = useState(0);
  const defaultTab = {
    fontSize: "1rem",
    outline: "none",
    fontFamily: "Noto Sans KR",
    padding: "0 2rem 0 2rem",
    display: "block",
    width: "100%",
  };
  const useStyles = (theme: any) => ({
    customStyleOnTab: Object.assign({ color: "#999999" }, defaultTab),
  });

  const classes = useClasses(useStyles);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <footer>
      <div id="footerLogo">
        <Hidden smUp>
          <SubFooter size="mobile" />
        </Hidden>
        <Hidden smDown lgUp>
          <SubFooter size="tablet" />
        </Hidden>
        <Hidden lgDown>
          <SubFooter size="pc" />
        </Hidden>
      </div>
    </footer>
  );
};

const SubFooter = (props: { size: string }) => {
  return (
    <div className={props.size}>
      <ul>
        <li>상호:YRF lab 주소:세종특별시 다정중앙로 45(다정프라자), 4층 대표자: 권나윤 사업자등록번호: 136-03-78185 대표전화: <span style={{color:'#ff6c0f'}}>044) 862-6262</span></li>
        <li>Copyright <span style={{color:'#ff6c0f'}}>YRF lab</span>. All Right Reserved.</li>
      </ul>
    </div>
  );
};

export default Footer;
