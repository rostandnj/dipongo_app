import React, {useEffect, useState} from 'react';
import {Button, Layout, Modal} from 'antd';
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isGoingModal, setIsGoingModal] = useState(false);
    const [hideJulien, setHideJulien] = useState(false);
    const [hideClose, setHideClose] = useState(false);
    const router = useRouter()

    const logout = () => {
        deleteSession();
    }

    const openLink = ()=>{
        //document.location.href = 'https://google.com/';
        router.push('https://drive.google.com/drive/folders/1pZpAkFKKLK-FVsK6V9bQCm5jTuqQYOJA?usp=sharing').then(
            ()=>{
                logout();
            }
        )
    }




    const [textOnboard,setTextOnboard] = useState("Maintenant que tu fais partie de l'équipe, je t'offre l'accès à des documents et des  informations réservés aux meilleurs sauveteurs. Clique vite sur le lien pour y accéder !")
    const [loading,setLoading] = useState(false)


    if(session){
        return (
            <Layout className="bgapp onboard-layout  background-image-body"
            >
                <section className={"hv100 column onboard-page flex itemcenter justcenter"} >

                    <div className="close cursor" onClick={()=>openLink()} style={{display: hideClose?'none':'block'}}>
                        <img src={close} className="closeButton" alt="close"  />
                    </div>
                    <div className="back-btn-onboard cursor" style={{display: hideClose?'none':'block'}}>
                        <Link href={'/onboard/step-5'}>
                            <img src={backBtn}  className="back-onboard" alt="close"  />
                        </Link>
                    </div>


                    <div className=" h100 w100 justcenter" style={{paddingRight: '4px',alignItems:'flex-end',display: hideJulien?'none':'flex'}}>
                        <div className="endDiv cursor" onClick={()=>openLink()}>
                                <Button className="btnFile">
                                    <span className="endText">Accéder aux documents</span>
                                </Button>
                        </div>



                        <div className="flex" style={{alignItems:'flex-end',zIndex:1}}>
                            <img src={julien} className="julien" />
                        </div>

                        <div className="onboard-div card-auth hauto w100 bgwhite " style={{position:'relative',marginBottom:70,borderRadius:'0px'}}>
                        <span className="onboarding-text">
                            {textOnboard}
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
