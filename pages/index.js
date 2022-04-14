import React from 'react';

import {Layout} from 'antd';
import Link from 'next/link'
import close from "./../public/assets/img/bouton-quitter.png";
import connexion from "./../public/assets/images/connexion-off.png";
import register from "./../public/assets/images/creer_compte-off.png";
import roadMapvide from "./../public/assets/img/road-map_vide.png";
import EmptyData from "../components/EmptyData";
import {useRouter} from "next/router";


const {  Content } = Layout;

export default function  Home () {
    const openLink = ()=>{
        //document.location.href = 'https://google.com/';
        router.push('https://www.smgbl.fr').then(
            ()=>{
                console.log('');
            }
        )
    }
    const router = useRouter();

    return (

        <Layout className="bgapp background-image-body" >

            <section className="hv100 column flex itemcenter justcenter mask ">

                <div className="close">
                    <img src={close} className="closeButton" alt="close" onClick={()=>openLink()} />
                </div>
                <Link href={'/login'}>
                    <img src={connexion} className="loginButton cursor" alt="login" />

                </Link>

                <Link href={'/signin'} ><img src={register} className="registerButton u-mar-top-l cursor" alt="register" />

                </Link>

            </section>

        </Layout>

    );


}
