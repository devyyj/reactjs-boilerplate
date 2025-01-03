import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person'; // 내 정보 아이콘
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // 로그아웃 아이콘
import {useNavigate} from 'react-router-dom'; // useNavigate import
import {logout} from '../slices/authSlice'; // 로그아웃 액션 import

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 라우터 네비게이션 초기화
  const accessToken = useSelector((state) => state.auth.accessToken); // Redux에서 accessToken 가져오기
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer 상태 관리

  const toggleDrawer = (open) => {
    setDrawerOpen(open); // Drawer 열기/닫기
  };

  const handleLogout = () => {
    dispatch(logout()); // 로그아웃 처리
    toggleDrawer(false); // Drawer 닫기
  };

  const handleLogin = () => {
    navigate('/login'); // /login 페이지로 이동
  };

  const handleGoHome = () => {
    navigate('/'); // 루트 페이지로 이동
  };

  const list = () => (
    <Box sx={{width: 250}} role="presentation" onClick={() => toggleDrawer(false)}>
      <List>
        {accessToken ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/profile')}>
                <PersonIcon sx={{mr: 2}}/> {/* 내 정보 아이콘 */}
                <ListItemText primary="내 정보"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ExitToAppIcon sx={{mr: 2}}/> {/* 로그아웃 아이콘 */}
                <ListItemText primary="로그아웃"/>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin}>
              <ListItemText primary="LOGIN"/>
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider/>
    </Box>
  );

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{boxShadow: 'none'}}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{cursor: 'pointer'}}
            onClick={handleGoHome} // 요피랜드 클릭 시 루트 페이지로 이동
          >
            요피랜드
          </Typography>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}></Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            onClick={() => toggleDrawer(true)} // Drawer 열기
            color="inherit"
          >
            <AccountCircle/>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)} // Drawer 닫기
      >
        {list()}
      </Drawer>
    </Box>
  );
};

export default Navbar;
