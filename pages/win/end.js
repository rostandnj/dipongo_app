
import React, {useState, useCallback, useEffect} from 'react';

import {Layout} from 'antd';
import close from "../../public/assets/img/bouton-quitter.png";
import axios from "axios";
import {URL} from "../../urlapi";
import chrono from '../../public/assets/chrono.png';
import continuer from '../../public/assets/img/continuer.png';
import quitter from '../../public/assets/img/quitter.png';

import visiter from '../../public/assets/img/visiter.png';
import rejouer from '../../public/assets/img/rejouer.png';


import julien from "../../public/assets/img/julien.png";
import suivant from "../../public/assets/suivant.jpg"
import Countdown from "react-countdown";

import { Spin,message,Modal,Progress } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useAuth} from "../../store";
import {useRouter} from "next/router";
import Link from "next/link";
import backBtn from "../../public/assets/btn_back_onboard.png";






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

    useEffect(() => {

        if (typeof window !== "undefined"){
            const token = localStorage.getItem("token")
            axios.get(URL + '/api/user/info', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((result)=>{
                if(result.data.data.running_session !== undefined){
                    if(result.data.data.running_session.question_done !== 50)
                    {
                        router.push('/lost').then((r)=>{})
                    }
                }
                else{
                    setTimeout(()=>{
                        logout();
                    },10000)
                }

            }).catch((error)=>{
                console.log(error)

            });
        }


    }, []);





    return (
        <Layout className="bgapp onboard-layout background-image-body"
        >
            <section className={"hv100 column onboard-page flex itemcenter justcenter"} >
                <div style={{position: 'absolute',height:'100%',width:'100%',opacity: '0.6',backgroundColor:'#212121'}}>

                </div>
                <Modal closable={false} footer={null} visible={isModalVisible}  onCancel={handleCancel} >
                    <div     className="  flex itemcenter justcenter column" style={{height:'80vh'}}
                    >


                        <div  className="w100 flex itemcenter justcenter cursor " onClick={handleCancel} >
                            <img src={continuer} className="registerButton"  />

                        </div>

                        <div  className="w100 flex itemcenter justcenter cursor " onClick={logout}>
                            <img src={quitter} className="w30" style={{marginTop:20}}   />

                        </div>




                    </div>
                </Modal>

                <div className="close cursor" onClick={()=>logout()}>
                    <img src={close} className="closeButton" alt="close"  />
                </div>


                <div className="flex h100 w100  justcenter" style={{alignItems:'flex-end',paddingRight: '4px'}}>

                    <div className="flex" style={{alignItems:'flex-end',zIndex:1}}>
                        <img src={julien} className="julien" />
                    </div>
                    <div className="onboard-div card-auth hauto w100 bgwhite " style={{position:'relative',marginBottom:70}}>
                        <span className="onboarding-text">
                           Tu recevras bientôt un mail pour confirmer notre invitation à passer une demi-journée au poste de secours le plus
        proche de chez toi.<br/>
<span style={{fontWeight: 'bolder'}}>A bientôt !</span>
                        </span>



                    </div>

                </div>




            </section>





        </Layout>






    );


}
