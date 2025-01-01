import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { setAccessToken } from "../slices/authSlice.js";

const Home = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LOGOUT_URL = import.meta.env.VITE_API_URL + "/logout";

  const handleDeleteAccount = async () => {
    try {
      if (accessToken) {
        const response = await axios.delete("/users/me");
        if (response.status === 200) {
          const response = await axios.delete('/auth/refresh-token');
          if (response.status === 200) {
            dispatch(setAccessToken(null));
            navigate('/');
          } else {
            console.error('로그아웃 실패');
          }
        }
      } else {
        console.error("사용자 인증이 필요합니다.");
      }
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
    }
  };

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" gutterBottom>
        메인 페이지
      </Typography>
      {accessToken ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // 세로 정렬
            alignItems: "center",
            gap: 2, // 요소 간의 간격
            mt: 4,
          }}
        >
          <Typography variant="body1">
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
          <Typography
            variant="body2"
            color="error"
            sx={{
              cursor: "pointer",
              display: "inline-block", // 텍스트 길이에 맞는 클릭 영역
            }}
            onClick={handleDeleteAccount}
          >
            회원 탈퇴
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // 세로 정렬
            alignItems: "center",
            gap: 2, // 요소 간의 간격
            mt: 4,
          }}
        >
          <Typography variant="body1">
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
        </Box>
      )}

      {/* 추가 버튼 세로 배치 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          color="info"
          size="large"
          onClick={() => navigate("/user")}
        >
          User 페이지로 이동
        </Button>

        <Button
          variant="contained"
          color="warning"
          size="large"
          onClick={() => navigate("/admin")}
        >
          Admin 페이지로 이동
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
