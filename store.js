import React, {createContext, useContext, ReactNode, useState, useEffect} from "react";
import { useRouter } from 'next/router'
import jwt_decode from "jwt-decode";
import axios from "axios";
import {URL} from "./urlapi";
import {message} from "antd";
import useSocket from "./useSocket";
import music from "./public/musique-ambiance.mp3";
import musicWrong from "./public/wrong.mp3";
import musicCorrect from "./public/correct.mp3";

const authContextDefaultValues = {
    session: null,
    updateSession: () => {},
    deleteSession: () => {},
    initSession: () => {},
    firstClick: () => {},
    stopMusic: () => {},
};
const AuthContext = createContext(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {


    const getCookie = (name) =>
    {
        if (typeof window !== "undefined"){
            var re = new RegExp(name + "=([^;]+)");
            var value = re.exec(document.cookie);
            return (value != null) ? unescape(value[1]) : null;
        }

    }

    const setCookie = (name,value)=> {
        if (typeof window !== "undefined"){
            var expires = "";
            var date = new Date();
            date.setTime(date.getTime() + (365*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }
    }
    const [session, setSession] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const updateSession = (s) => {
        if (typeof window !== "undefined"){
            if(s!== undefined && s.running_session !== undefined && s.running_session!==null){
                localStorage.setItem("session",JSON.stringify(s.running_session));
                setSession({session: s.running_session});
            }
            else{
                localStorage.setItem("session",null)
                router.push('/onboard').then((r)=>{})
            }

        }
    };
    const deleteSession = () => {
        if (typeof window !== "undefined"){
            stopMusic();
            setSession(null);
            const token = localStorage.getItem("token")
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setCookie("token","null")
            localStorage.removeItem("session");
            if(token!== null){
                axios.get(URL + '/api/leave/game', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then((result)=>{
                    router.push('/').then((res)=>{})
                }).catch((error)=>{
                    router.push('/').then((res)=>{})
                });
            }
            else{
                router.push('/').then((res)=>{})
            }


        }


    };
    const initSession = (data) => {
        if (typeof window !== "undefined"){
            if(data.running_session === null){
                localStorage.setItem("session",null);
            }else{
                localStorage.setItem("session",JSON.stringify(data.running_session));
            }
            localStorage.setItem("token",data.token);
            setCookie("token",data.token);
            localStorage.setItem("user",JSON.stringify(data.user));

        }
        setSession(data);
        if(data.running_session !== null){
           router.push('/roadmap')
        }
        else{
           router.push('/onboard')
        }
    };
    const clearStorage = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setCookie("token",null)
        localStorage.removeItem("session");
    };
    const firstClick = ()=>{
        /*if(router.pathname !== '/win/video'){
            if(!isPlaying){
                console.log('click')
                setIsPlaying(true)
                const audioEl = document.getElementsByClassName("audio-element-base")[0];
                audioEl.play().then((e)=>{console.log('play')});
            }
        }*/
        if(router.pathname === '/roadmap'){

                setIsPlaying(true)
                const audioEl = document.getElementsByClassName("audio-element-base")[0];
                audioEl.play().then((e)=>{console.log('play')});

        }
        else{
            if(isPlaying){
                setIsPlaying(false)
                const audioEl = document.getElementsByClassName("audio-element-base")[0];
                audioEl.pause();
            }
        }

        /*else{
            setIsPlaying(false)
        }*/

    };
    const stopMusic = ()=>{
        if(isPlaying){
            setIsPlaying(false)
            const audioEl = document.getElementsByClassName("audio-element-base")[0];
            audioEl.pause();
        }
        /*else{
            setIsPlaying(false)
        }*/

    };
    const value = {
        session,
        updateSession,
        deleteSession,
        initSession,
        firstClick,
        stopMusic
    };
    let isAuth = false;
    const publicPath = ['/','/login','/signin'];
    const router = useRouter()

    useEffect(()=>{
        if(router.pathname !== '/roadmap'){
            setIsPlaying(false)
            const audioEl = document.getElementsByClassName("audio-element-base")[0];
            audioEl.pause();

        }
        else{
            setIsPlaying(true)
            const audioEl = document.getElementsByClassName("audio-element-base")[0];
            audioEl.play().then((e)=>{console.log('play')});
        }
    },[router.pathname])
    useEffect(() => {
        if (typeof window !== "undefined"){




            isAuth  = localStorage.getItem("user") !== null;
           if(!isAuth){
               deleteSession();
           }
           else{
               let token = localStorage.getItem("token");
               let deT = jwt_decode(token);
               let exp = deT.exp;
               let time = Date.now()/1000;
               if(time > exp){
                   router.push('/login')
               }
               else
               {
                       axios.get(URL + '/api/user/info', {
                           headers: {
                               'Authorization': 'Bearer ' + token
                           }
                       }).then((result)=>{

                          if(result.data.data.running_session !== null){

                              /*if(result.data.data.running_session.current_time < 3000 && result.data.data.running_session.question_done < 50 ){

                                  router.push('/roadmap')
                              }
                              else{
                                  if(result.data.data.running_session.question_done === 50){
                                      router.push('/win')
                                  }
                                  else{
                                      router.push('/lost')
                                  }
                              }*/

                              setSession({session: result.data.data.running_session})
                              localStorage.setItem("session",JSON.stringify(result.data.data.running_session))
                             if(router.pathname === '/'){
                                  router.push('/roadmap')
                              }
                                else{
                                  if(router.pathname.includes('onboard')){
                                      router.push('/roadmap')
                                  }
                              }

                          }
                          else{
                              setSession({session: null})
                              localStorage.removeItem("session")
                              router.push('/onboard')
                          }

                       }).catch((error)=>{
                           console.log(error)
                           if (error.response) {
                               if(error.response.data.code === "invalid_jwt_token"){
                                   deleteSession();
                               }
                               //message.warning(error.response.data.message)
                           } else if (error.request) {
                               console.log(error.request)
                           } else {
                               console.log('Error', error)
                           }

                       });
               }
           }
        }

    }, [])
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const socket = useSocket();

    useEffect(()=>{
        axios.interceptors.response.use(
            (res) => {
                // Add configurations here
                if(res.config.method === "post" && res.config.url.includes('answer/question')){
                    if (res.status === 200) {
                        if(res.data.data !== undefined && res.data.data.answer !== undefined && res.data.data.answer.is_true === true){
                            document.getElementsByClassName("audio-correct")[0].play().then(()=>{});
                        }
                        else{
                            document.getElementsByClassName("audio-wrong")[0].play().then(()=>{});
                        }

                    }
                }

                return res;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
    },[]);


    useEffect(() => {

        if (typeof window !== "undefined"){
            //const audioEl = document.getElementsByClassName("audio-element-base")[0];
            //audioEl.muted = true;
            //audioEl.play().then((e)=>{console.log('play')});
            if (socket && localStorage.getItem("token")!==null) {
                socket.emit('user_online', {token: localStorage.getItem("token")});
            }
        }

    }, [socket]);

    return (
        <>
            <audio className="audio-element-base" loop>
                <source src={music} type="audio/mpeg"></source>
            </audio>
            <audio className="audio-wrong">
                <source src={musicWrong} type="audio/mpeg"></source>
            </audio>
            <audio className="audio-correct">
                <source src={musicCorrect} type="audio/mpeg"></source>
            </audio>
            <AuthContext.Provider value={value}>
                <div onClick={()=>{firstClick()}}>
                    {children}
                </div>
            </AuthContext.Provider>
        </>
    );
}
