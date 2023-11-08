import logo from "@images/common/btn-close.png";
import { Button, Hidden, Tab, Tabs } from "@mui/material";
import useClasses from "@utils/useClasses";
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import { LoadingButton } from "@mui/lab";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import { $POST } from "@utils/request";
import { ALERT } from "@common/const";
import { alert } from "@utils/alert";

const Footer = () => {
  const [value, setValue] = React.useState(0);
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
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
    $POST("/backup", {}, (res: boolean) => {
      if (res) {
        alert.icon({
          type: ALERT.SUCCESS,
          text: "백업이 완료되었습니다."
        })
      } else{
        alert.icon({
          type: ALERT.WARNING,
          text: "백업이 실패되었습니다."
        })
      }
      setLoading(false);
    });
  }


  return (
    <div className={props.size} >
      <ul>
        <li>상호:YRF lab 주소:세종특별시 다정중앙로 45(다정프라자), 4층 대표자: 권나윤 사업자등록번호: 136-03-78185 대표전화: <span style={{ color: '#ff6c0f' }}>044) 862-6262</span></li>
        <li>Copyright <span style={{ color: '#ff6c0f' }}>YRF lab</span>. All Right Reserved.</li>
      </ul>
      <Box sx={{ '& > button': { m: 1 } }}>
        <LoadingButton className="backupBtn"
          color="secondary"
          onClick={handleClick}
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Box>
    </div>
  );
};

export default Footer;
