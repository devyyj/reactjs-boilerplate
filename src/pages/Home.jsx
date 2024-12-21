import React from "react";
import {useSelector} from "react-redux";
import {Box, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const LOGOUT_URL = "http://localhost:8080/logout";

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" gutterBottom>
        메인 페이지
      </Typography>
      {accessToken ? (
        <>
          <Typography variant="body1" gutterBottom>
            로그인 완료!
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            href={LOGOUT_URL}
          >
            로그아웃
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            로그인하지 않았습니다.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/login")}
          >
            로그인 페이지로 이동
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home;
