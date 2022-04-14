import React, { useState } from 'react';
import {Layout, Modal} from 'antd';
import close from "./../../public/assets/img/bouton-quitter.png";
import julien from "./../../public/assets/img/julien.png";
import suivant from "./../../public/assets/suivant.jpg"
import quitter from "./../../public/assets/img/quitter.png";
import continuer from "./../../public/assets/img/continuer.png";
import { Spin,message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link'
import {useAuth} from "../../store";
import EmptyData from "../../components/EmptyData";
import backBtn from "../../public/assets/btn_back_onboard.png";

const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;

const {  Content } = Layout;
export default function  Onboarding () {

    const { session, updateSession, deleteSession } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false)
    };
    const logout = () => {
        deleteSession();
    }

    let token = null;
    let user = null;

    if (typeof window !== "undefined"){
        let tokenTab = JSON.parse(localStorage.getItem('user'));
        if(tokenTab !== null){
            token = tokenTab.token;
        }
        user = JSON.parse(localStorage.getItem('user'));
    }

    const [textOnboard,setTextOnboard] = useState("Voici notre jolie plage. Pour bien la protéger tu dois la connaître parfaitement. Pour cela je vais te faire découvrir 4  lieux.")
    const [loading,setLoading] = useState(false)


    if(session){
        return (

            <Layout className="bgapp onboard-layout background-onboard4"
            >
                <section className={"hv100 column onboard-page flex itemcenter justcenter"} >
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

                    <div className="close cursor" onClick={()=>setIsModalVisible(true)}>
                        <img src={close} className="closeButton" alt="close"  />
                    </div>
                    <div className="back-btn-onboard cursor">
                        <Link href={'/onboard/step-3'}>
                        <img src={backBtn}  className="back-onboard" alt="close"  />
                        </Link>
                    </div>

                    <div className="flex h100 w100  justcenter" style={{alignItems:'flex-end',paddingRight: '4px'}}>

                        <div className="flex" style={{alignItems:'flex-end',zIndex:1}}>
                            <img src={julien} className="julien" />
                        </div>
                        <div className="onboard-div card-auth hauto w100 bgwhite " style={{position:'relative',marginBottom:70}}>
                        <span className="onboarding-text">
                            {textOnboard}
                        </span>


                            <Link href={'/onboard/step-5'}>
                         <span className="cursor next-board" >
                        <img src={suivant} height="85" width="100" />
                        </span>
                            </Link>
                        </div>

                    </div>




                </section>





            </Layout>

        );
    }
    else{
        return (<EmptyData/>)
    }


}
