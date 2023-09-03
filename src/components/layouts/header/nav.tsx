import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "@common/domain";
import {useEffect, useState} from "react";

const NestedList = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleClick = (link:string) => {
        navigate(link)
    };
    useEffect(()=>{
        switch (location.pathname){
            case PATH.QUESTION0:
                const check1 = document.querySelector('.nav1')
                check1!.classList.add('active');
                break
            case PATH.QUESTION1:
                const check2 = document.querySelector('.nav2')
                check2!.classList.add('active');
                break
            case PATH.QUESTION2:
                const check3 = document.querySelector('.nav3')
                check3!.classList.add('active');
                break
            case PATH.QUESTION3:
                const check4 = document.querySelector('.nav4')
                check4!.classList.add('active');
                break
            case PATH.QUESTION4:
                const check5 = document.querySelector('.nav5')
                check5!.classList.add('active');
        }
    },[])

    return (
        <List
            className='sideNav'
            sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper', paddingTop:'100px' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    시험지제작
                </ListSubheader>
            }
        >
            <ListItemButton onClick={()=>handleClick(PATH.QUESTION0)} className='nav1'>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary="지문저장" />
            </ListItemButton>
            <ListItemButton onClick={()=>handleClick(PATH.QUESTION1)} className='nav2'>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="지문관리" />
            </ListItemButton>
            <ListItemButton onClick={()=>handleClick(PATH.QUESTION2)} className='nav3'>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="문제출제" />
            </ListItemButton>
            <ListItemButton onClick={()=>handleClick(PATH.QUESTION3)} className='nav4'>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="시험지제작" />
            </ListItemButton>
            <ListItemButton onClick={()=>handleClick(PATH.QUESTION4)} className='nav5'>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="시험지보기" />
            </ListItemButton>
            <ListItemButton onClick={()=>handleClick(PATH.QUESTION5)}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="시험지관리" />
            </ListItemButton>
        </List>
    );
}
export default NestedList