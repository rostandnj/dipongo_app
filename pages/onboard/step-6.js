import React, {useEffect, useState} from 'react';
import {Layout, Modal} from 'antd';
import close from "./../../public/assets/img/bouton-quitter.png";
import axios from "axios";
import {URL} from "../../urlapi";
import parti from "./../../public/assets/img/parti.png";
import ok from "./../../public/assets/img/bouton-ok.png";
import julien from "./../../public/assets/img/julien.png";
import suivant from "./../../public/assets/suivant.jpg"
import quitter from "./../../public/assets/img/quitter.png";
import continuer from "./../../public/assets/img/continuer.png";
import { Spin,message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link'
import EmptyData from "../../components/EmptyData";
import backBtn from "../../public/assets/btn_back_onboard.png";
import {useAuth} from "../../store";
import {useRouter} from "next/router";

const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;



const {  Content } = Layout;
export default function  Onboarding () {

    const { session, updateSession, deleteSession } = useAuth();
    const router = useRouter()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isGoingModal, setIsGoingModal] = useState(false);
    const [hideJulien, setHideJulien] = useState(false);
    const [isChrono, setIsChrono] = useState(false);
    const [hideClose, setHideClose] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false)
        setIsGoingModal(false)
        setHideJulien(false)
        setIsChrono(false)
        setHideClose(false)
    };
    const logout = () => {
        deleteSession();
    }

    let token = null;
    let user = null;


    const [textOnboard,setTextOnboard] = useState("Si tu réussis la mission en 50 min ou moins tu pourras vivre une expérience inédite. Je ne t'en dis pas plus nous sommes pressés. C'est parti !")
    const [loading,setLoading] = useState(false)

    const showGoing = () => {
        setHideJulien(true)
        setIsGoingModal(true)

    }
    const showChrono = () => {
        setHideJulien(true)
        setIsGoingModal(false)
        setIsModalVisible(false)
        setHideClose(true)
        setIsChrono(true)

    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const startGame = () => {
        if (typeof window !== "undefined"){
            const token = localStorage.getItem("token")
            setLoading(true)
            axios.get(URL + '/api/start/game', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).then((result) =>{

                updateSession(result.data.data)


                if(isMounted){
                    localStorage.removeItem("env1");
                    localStorage.removeItem("sur1");
                    localStorage.removeItem("sec1");
                    localStorage.removeItem("rep1");
                    router.push("/roadmap")
                   setTimeout(()=>{
                       setLoading(false)
                   },3000)
                }
                //

                }).catch(function (error) {
                    setLoading(false)
                    if (error.response) {
                        message.warning(error.response.data.message)
                    } else if (error.request) {
                        console.log(error.request)
                    } else {
                        console.log('Error', error)
                    }
                });

        }
    }

    if(session){
        return (
            <Layout className="bgapp onboard-layout  background-image-body"
            >
                <section className={"hv100 column onboard-page flex itemcenter justcenter"} >
                    <Modal closable={false} footer={null} visible={isModalVisible}  onCancel={handleCancel} >
                        <div     className="  flex itemcenter justcenter column" style={{height:'70vh'}}
                        >


                            <div  className="w100 flex itemcenter justcenter cursor " onClick={handleCancel} >
                                <img src={continuer} className="registerButton"  />

                            </div>

                            <div  className="w100 flex itemcenter justcenter cursor " onClick={logout}>
                                <img src={quitter} className="w30" style={{marginTop:20}}   />

                            </div>




                        </div>
                    </Modal>
                    <Modal closable={false} footer={null} visible={isGoingModal}  onCancel={handleCancel} >
                        <div     className="  flex itemcenter justcenter column" style={{height:'70vh'}}
                        >

                            <div  className=" flex itemcenter justcenter cursor " onClick={()=>showChrono()} >
                                <img src={parti} className="registerButton"  />

                            </div>

                        </div>
                    </Modal>
                    <Modal closable={false} footer={null} visible={isChrono}  onCancel={handleCancel} >
                        <div     className="  flex itemcenter justcenter column" style={{marginTop:'30vh'}}
                        >
                            <div className="card-auth hauto  bgwhite itemcenter u-pad-l flex column ">

                                {loading ?

                                    <>
                                        <Spin indicator={antIcon} />
                                        <span> Chargement des données du jeu !</span>
                                    </>
                                    :
                                    <>
                                          <span className="center fs16">
                        Clique sur les lieux pour répondre à toutes les questions et collectionner les bouées tubes.
                        </span>
                                    <span className="av-heavy u-mar-top-s center fs20">
                        C'est parti,
                        <br/>
                        tu as 50 minutes top chrono !
                        </span>

                                        <span style={{pointerEvents: loading?'none':'auto'}} className="u-mar-top-s cursor" >

                            <img onClick={()=>startGame()} className="btn-ok cursor" src={ok} />
                        </span>
                                    </>
                                }


                            </div>
                        </div>
                    </Modal>

                    <div className="close cursor" onClick={()=>setIsModalVisible(true)} style={{display: hideClose?'none':'block'}}>
                        <img src={close} className="closeButton" alt="close"  />
                    </div>
                    <div className="back-btn-onboard cursor" style={{display: hideClose?'none':'block'}}>
                        <Link href={'/onboard/step-5'}>
                        <img src={backBtn}  className="back-onboard" alt="close"  />
                        </Link>
                    </div>


                    <div className=" h100 w100 justcenter" style={{paddingRight: '4px',alignItems:'flex-end',display: hideJulien?'none':'flex'}}>

                        <div className="flex" style={{alignItems:'flex-end',zIndex:1}}>
                            <img src={julien} className="julien" />
                        </div>
                        <div className="onboard-div card-auth hauto w100 bgwhite " style={{position:'relative',marginBottom:70}}>
                        <span className="onboarding-text">
                            {textOnboard}
                        </span>

                            <span onClick={()=>showGoing()}  className="cursor next-board">
                        <img src={suivant} height="85" width="100" />
                        </span>


                        </div>

                    </div>




                </section>





            </Layout>
        );
    }
    else{
        return <EmptyData/>
    }


}
