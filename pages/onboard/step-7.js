import React, { useState } from 'react';
import {Layout, Modal} from 'antd';
import close from "./../../public/assets/img/bouton-quitter.png";
import {useHistory} from "react-router";

import axios from "axios";
import {URL} from "./../../urlapi";
import Background from "./../../public/assets/img/onboarding1.png";
import Background1 from "./../../public/assets/img/bg2.png";
import Background2 from "./../../public/assets/img/bg3.png";
import Background2_boue from "./../../public/assets/img/bg3_bouee.png";
import Background3 from "./../../public/assets/img/road-map_vide.png";
import parti from "./../../public/assets/img/parti.png";
import ok from "./../../public/assets/img/bouton-ok.png";
import julien from "./../../public/assets/img/julien.png";
import suivant from "./../../public/assets/suivant.jpg"

import { Spin,message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import quitter from "./../../public/assets/img/quitter.png";
import continuer from "./../../public/assets/img/continuer.png";
import Link from 'next/link'





const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;



const {  Content } = Layout;
export default function  Onboarding () {

    const history = useHistory()
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



    const [textOnboard,setTextOnboard] = useState("Bienvenue "+user?.name+", Je suis Julien le chef du poste de secours. Surveiller les plages et sauver des vies c'est mon métier !")
    const [step,setStep] = useState(2)
    const [loading,setLoading] = useState(false)


    async function startGame ( )  {

        try {
            setLoading(true)

            const result = await axios.get(URL + '/api/start/game', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            history.push("/roadmap")
            setLoading(false)

        } catch(e) {
            setLoading(false)
            if (e.response) {
                message.warning(e.response.data.message)
            }else{
                message.warning('Erreur connexion!')
            }



        }

    }


    const nextStep = () => {

        setStep(step+1)
        switch (step) {

            case 2:
                return setTextOnboard('La saison de surveillance des plages commence dans quelques heures et nous avons un problème. Il nous manque un sauveteur de qualité pour compléter notre équipe')
            case 3:
                return  setTextOnboard("Viens nous rejoindre dans l'équipe, tu vas découvrir un métier passionnant. Allez en route je n'ai que 50 min pour te former, tu devras être attentif.")


            case 4:
                return  setTextOnboard(" Voici notre jolie plage.Pour bien la protéger tu dois la connaitre parfaitement. Pour cela je vais te faire découvrir 4  lieux.");

            case 5:
                return  setTextOnboard("Dans chacun d'eux tu devras récolter un maximum de bouées tubes pour valider le lieux. Pour gagner des bouées tubes tu devras répondre à mes questions et relever mes défis.");

            case 6:
                return  setTextOnboard("Si tu réussis la mission en 50 min ou moins tu pourras vivre une expérience inédite. Je ne t'en dis pas plus nous sommes pressés. C'est parti !");



            default:
                return;
        }

    }







    return (

        <Layout className="bgapp onboard-layout"

                style={{  backgroundImage: `url(${ step == 2 ? Background :step == 3 ? Background1 :step == 4 ? Background1 :step==5 ? Background2 :step==6 ? Background2_boue : Background3 })`,
                    backgroundSize: 'cover'}}
        >






            <section className={"hv100 column onboard-page flex itemcenter justcenter" + (step == 8 ? ' mask' : '')} >
                <Modal closable={false} footer={null} visible={isModalVisible}  onCancel={handleCancel} >
                    <div     className="  flex itemcenter justcenter column" style={{height:'80vh'}}
                    >


                        <div  className="w100 flex itemcenter justcenter cursor" onClick={handleCancel} >
                            <img src={continuer} className="w35"  />

                        </div>

                        <div  className="w100 flex itemcenter justcenter cursor" onClick={logout}>
                            <img src={quitter} className="w25" style={{marginTop:20}}   />

                        </div>




                    </div>
                </Modal>

                <div className="close cursor" onClick={()=>setIsModalVisible(true)}>
                    <img src={close} className="closeButton" alt="close"  />
                </div>




                {step != 8  && step != 9 &&
                <div className="flex h100 w100 u-pad-horizontal-m justcenter" style={{alignItems:'flex-end'}}>

                    <div className="flex" style={{alignItems:'flex-end',zIndex:1}}>
                        <img src={julien} className="julien" />
                    </div>
                    <div className=" card-auth hauto w100 bgwhite u-pad-s u-pad-left-xl u-pad-vertical-l" style={{marginLeft:-80,position:'relative',marginBottom:70,minHeight:200}}>
                        <span className="onboarding-text">
                            {textOnboard}
                        </span>


                        <span className="cursor" onClick={nextStep} style={{position:'absolute',right:15,bottom:15}}>
<img src={suivant} height="35" width="50" />
</span>
                    </div>

                </div>
                }



                {step == 8 &&

                <span onClick={()=>setStep(9)}>
<img className="cursor" src={parti} />
</span>
                }



                {step == 9 &&


                <div className="card-auth hauto w40 bgwhite itemcenter u-pad-l flex column ">

                    {loading ?

                        <>
                            <Spin indicator={antIcon} />
                            <span> Chargement des données du jeu !</span>
                        </>
                        :

                        <>
<span className="center fs22">
Clique sur les lieux pour répondre à toutes les questions et collectionner les bouées tubes.
</span>



                            <span className="av-heavy u-mar-top-s center fs22">
C'est parti,
<br/>
tu as 50 minutes top chrono !
</span>


                            <span style={{pointerEvents: loading?'none':'auto'}} className="u-mar-top-s cursor" onClick={startGame}>

    <img src={ok} />
</span>
                        </>



                    }


                </div>


                }


            </section>





        </Layout>



    );


}
