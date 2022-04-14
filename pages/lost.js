import React, {useState, useCallback, useEffect} from 'react';

import {Layout} from 'antd';
import close from "../public/assets/img/bouton-quitter.png";
import axios from "axios";
import {URL} from "../urlapi";
import chrono from '../public/assets/chrono.png';
import continuer from '../public/assets/img/continuer.png';
import quitter from '../public/assets/img/quitter.png';
import visiter from '../public/assets/img/visiter.png';
import rejouer from '../public/assets/img/rejouer.png';
import julien from "../public/assets/img/julien.png";
import suivant from "../public/assets/suivant.jpg"
import Countdown from "react-countdown";
import { Spin,message,Modal,Progress } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useAuth} from "../store";
import {useRouter} from "next/router";


const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;


const {  Content } = Layout;
export default function  Onboarding () {

    const { session, updateSession, deleteSession } = useAuth();
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [isReplay, setIsReplay] = useState(false);
    const [showStars, setShowStars] = useState(true);
    const [localSession,setLocalSession] = useState(null)
    const [isMounted,setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsClose(false)
        setIsReplay(false)
        setShowStars(true)
    };

    const logout = () => {
        deleteSession()
    }

    async function replayGame ( )  {
        setLoading(true)

        if (typeof window !== "undefined"){
            const token = localStorage.getItem("token")
            axios.get(URL + '/api/start/game', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((result)=>{
                updateSession(result.data.data)
                router.push("/roadmap").then((res)=>{
                    console.log(res)
                });
                setLoading(false)
            }).catch((error)=>{
                setLoading(false)
                if (e.response) {
                    message.warning(e.response.data.message)
                }else{
                    message.warning('Erreur connexion!')
                }
            });
        }

    }

    useEffect(() => {
        if (typeof window !== "undefined"){
            const audioEl = document.getElementsByClassName("audio-element")[0]
            audioEl.play().then((e)=>{console.log('play')});
            const token = localStorage.getItem("token");
            axios.get(URL + '/api/user/info', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((result) =>{
                if(result.data.data.running_session !== undefined && result.data.data.running_session !== null){
                    if(result.data.data.running_session.question_done === 50)
                    {
                        router.push('/win').then((res)=>{
                            console.log(res)
                        });
                    }else{
                        if(result.data.data.running_session.current_time < 3000){
                            router.push('/roadmap').then((res)=>{
                                console.log(res)
                            });
                        }
                    }
                }
            }).catch((error)=>{
                console.log('lost')
            });
        }
    }, []);


    const renderer =  useCallback(({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            router.push('/lost').then((res)=>{
                console.log(res)
            }).then((res)=>{
                console.log(res)
            });
            return null;
        } else {
            // Render a countdown
            return (
                <>
                    { minutes < 10 ? '0' :''} {minutes}:{ seconds < 10 ? '0' :''}{seconds}
                </>
            );
        }
    }, []);



    return (


        <div style={{width:'100vw',height:'100vh',backgroundColor:'#f4cb6e',position:'relative'}} >
            <div>
                <audio className="audio-element">
                    <source src="../wrong.mp3"></source>
                </audio>
            </div>

            <Modal closable={false} footer={null} visible={isReplay}  onCancel={handleCancel} >
                <div className="  flex itemcenter justcenter column" style={{height:'80vh'}}>


                    <div  className="w100 flex itemcenter justcenter cursor" onClick={replayGame}>
                        <img src={rejouer} className="w50"  style={{marginTop:20}} />
                    </div>

                    <div  className="w100 flex itemcenter justcenter cursor u-mar-top-xl" onClick={logout} >
                        <img src={visiter} className="w40"   />
                    </div>



                </div>
            </Modal>

            <div className="lost-image-text w100 u-pad-horizontal-m justcenter" >

                <div className="flex" style={{alignItems:'flex-end',zIndex:1}}>
                    <img src={julien} className="julien" style={{display: showStars?'block':'none'}}/>
                </div>
                <div className="card-auth card-text-onboard  bgwhite u-pad-s u-pad-left-xl " >
                    <h1 className="onboarding-text">


                        Mince notre temps est écoulé !
                        Tu y étais presque mais les premiers baigneurs arrivent et nous n'avons pas terminé ta formation.

                        Mais je suis certain que si tu retentes ta chance tu seras un super sauveteur. Alors on recommence ?


                    </h1>

                    <span className="cursor next-board"  onClick={()=>{setIsReplay(true) ;setShowStars(false)}} >
                        <img src={suivant} height="85" width="100" />
                        </span>


                </div>

            </div>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="100%"
                height="100%"
                version="1.1"
                viewBox="0 0 1280 1024"
            >
                <g>
                    <image
                        width="100%"
                        height="100%"
                        opacity="1"
                        preserveAspectRatio="none"
                        xlinkHref="../../map_no_chrono.png"
                    ></image>
                    <path
                        onClick={()=>setIsModalVisible(true)}
                        className="cursor"
                        fill="transparent"
                        stroke="#000"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeOpacity="1"
                        strokeWidth="1"
                        d="M29.52 182.66l1.846-162.365h134.688l1.845 164.21z"
                        opacity="0"
                    ></path>
                    <path
                        fill="url(#timer)"
                        stroke="#000"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeOpacity="0"
                        strokeWidth="1"
                        d="M1105.182 876.396v36.901h105.168l-3.69-40.59z"
                        opacity="1"

                    ></path>
                    <path
                        onClick={()=>setIsClose(true)}
                        className="cursor"
                        fill="transparent"
                        stroke="#000"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        strokeOpacity="1"
                        strokeWidth="1"
                        d="M1095.957 27.676c5.535 118.083 5.535 119.928 5.535 119.928l86.717 9.225 70.112-18.45-12.916-118.084z"
                        opacity="0"
                    ></path>
                    <image
                        style={{display: showStars?'block':'none'}}
                        className="cursor"
                        width="142.431"
                        height="139.331"
                        x="291.935"
                        y="751.147"
                        preserveAspectRatio="none"
                        xlinkHref="../../vide.png"
                    ></image>
                    <image
                        style={{display: showStars?'block':'none'}}
                        className="cursor"
                        width="142.431"
                        height="139.331"
                        x="831.935"
                        y="501.711"
                        preserveAspectRatio="none"
                        xlinkHref="../../vide.png"
                    ></image>
                    <image
                        style={{display: showStars?'block':'none'}}
                        className="cursor"
                        width="142.431"
                        height="139.331"
                        x="216.329"
                        y="246.359"
                        preserveAspectRatio="none"
                        xlinkHref="../../vide.png"
                    ></image>
                    <image
                        style={{display: showStars?'block':'none'}}
                        width="142.431"
                        height="139.331"
                        x="769.681"
                        y="93.119"
                        opacity="1"
                        preserveAspectRatio="none"
                        xlinkHref="../../vide.png"
                    ></image>
                </g>

            </svg>

        </div>









    );


}
