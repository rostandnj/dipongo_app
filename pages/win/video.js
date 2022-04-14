import React, { useState,useEffect } from 'react';

import {Layout} from 'antd';
import close from "../../public/assets/img/bouton-quitter.png";
import {useHistory} from "react-router";
import axios from "axios";
import {URL} from "../../urlapi";
import chrono from '../../public/assets/chrono.png';
import continuer from '../../public/assets/img/continuer.png';
import quitter from '../../public/assets/img/quitter.png';

import visiter from '../../public/assets/img/visiter.png';
import rejouer from '../../public/assets/img/rejouer.png';


import julien from "../../public/assets/img/julien.png";
import suivant from "../../public/assets/btn-next.png"
import Countdown from "react-countdown";

import { Spin,message,Modal,Progress } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useAuth} from "../../store";
import {useRouter} from "next/router";



const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;



const {  Content } = Layout;
export default function  Onboarding () {

    const { session, updateSession, deleteSession, stopMusic } = useAuth();
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [isClose, setIsClose] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsClose(false)
    };

    const logout = () => {

        deleteSession()

    }

    useEffect(() => {
        if (typeof window !== "undefined"){
            setLoading(true)

            const token = localStorage.getItem("token");
            axios.get(URL + '/api/user/info', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((result) =>{
                if(result.data.data.running_session.status === true && result.data.data.running_session.question_done === 50){

                }
                else{
                    router.push('/roadmap').then((r)=>{})
                }
            }).catch((error)=>{
                setLoading(false)
                console.log('error')
            });
        }


    }, []);


    return (




        <div style={{width:'100vw',height:'100vh',backgroundColor:'#f4cb6e',position:'relative'}} >


            <Modal closable={false} footer={null} visible={isClose}  onCancel={handleCancel} >
                <div     className="  flex itemcenter justcenter column" style={{height:'80vh'}}
                >




                    <div  className="w100 flex itemcenter justcenter cursor" onClick={handleCancel}>
                        <img src={continuer} className="w60"  style={{marginTop:20}} />
                    </div>

                    <div  className="w100 flex itemcenter justcenter cursor u-mar-top-xl" onClick={logout} >
                        <img src={quitter} className="w40"   />
                    </div>



                </div>
            </Modal>


            <Modal closable={false} footer={null} visible={isModalVisible} >
                <div     className="login-form card-auth hauto column  w100 bgwhite   flex u-pad-s rad8"
                >

                    <div className="w100 flex column itemcenter justcenter flex">


                        <video
                            onEnded={()=>router.push('/win/file').then((r)=>{})}
                            autoPlay
                            src={'../../video.mp4'}
                            controls
                            id="video"
                            style={{ width: '100%' }}
                            onPlay={()=>{stopMusic()}}
                        />


                    </div>



                </div>
            </Modal>


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
                        xlinkHref="../../map.png"
                    ></image>
                    <path
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
                        className="cursor"
                        width="142.431"
                        height="139.331"
                        x="291.935"
                        y="751.147"
                        preserveAspectRatio="none"
                        xlinkHref="../../pleine.png"
                    ></image>
                    <image
                        className="cursor"
                        width="142.431"
                        height="139.331"
                        x="931.935"
                        y="471.711"
                        preserveAspectRatio="none"
                        xlinkHref="../../pleine.png"
                    ></image>
                    <image
                        className="cursor"
                        width="142.431"
                        height="139.331"
                        x="416.329"
                        y="246.359"
                        preserveAspectRatio="none"
                        xlinkHref="../../pleine.png"
                    ></image>
                    <image
                        width="142.431"
                        height="139.331"
                        x="769.681"
                        y="93.119"
                        opacity="1"
                        preserveAspectRatio="none"
                        xlinkHref="../../pleine.png"
                    ></image>
                </g>

            </svg>

        </div>
    );


}
