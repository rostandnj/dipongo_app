import React, {useState, Fragment, useEffect} from 'react';
import {Form, Input, Button, Layout,message} from 'antd';
import close from "../public/assets/img/bouton-quitter.png";
import continuer from "../public/assets/img/continuer.png";
import axios from "axios";
import {URL} from "../urlapi";
import jwt_decode from "jwt-decode";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useAuth} from "../store";
import {useRouter} from "next/router";
const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;

const {  Content } = Layout;

export default function  Login () {
    const [loading,setLoading] = useState(false)
    const { session, updateSession, deleteSession,initSession } = useAuth();
    const router = useRouter()

    useEffect(() => {
        //deleteSession();
    }, [])

    async function onSubmit ( values )  {

        setLoading(true)
        axios.post(URL + '/api/login',
            values
        ).
        then((result) =>{
            message.success("Connexion Réussie")
            setLoading(false)
            initSession(result.data)
        }).
        catch(function (error) {
            setLoading(false)
            if (error.response) {
                setLoading(false)
                message.warning(error.response.data.message)
            } else if (error.request) {
                console.log(error.request)
            } else {
                console.log('Error', error)
            }
        });

    }

    const logout = () => {
        deleteSession()
    }



    return (
        <Layout className="bgapp background-image-body">

            <section className="hv100 column flex itemcenter justcenter mask ">

                <div className="close">
                    <img onClick={logout} src={close} className="closeButton cursor" alt="close" />
                </div>

                <div className="login-form flex column  justcenter itemcenter" >

                    <Form
                        name="normal_login"
                        className=" card-auth column   w90res bgwhite  alignitems justcenter flex u-pad-top-l rad8"
                        size="large"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onSubmit}
                    >

                        <div className="headerform flex itemcenter justcenter" >
                            <h3 className="form-header form-header_login  uppercase form-login-msg">me connecter</h3>
                        </div>


                        <div className="u-pad-horizontal-xxl u-pad-s-res">

                            <Form.Item
                                name="login"
                                label="Nom d'utilisateur :"
                                rules={[
                                    {
                                        required: true,
                                        message: "Inserer votre nom d'utilisateur",
                                    },
                                ]}
                                className="u-mar-bottom-m column"
                            >
                                <Input  className="u-mar-top-xs" />
                            </Form.Item>
                            <Form.Item
                                className="u-mar-top-s u-mar-bottom-xs column"
                                name="password"
                                label="Mot de passe :"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Inserer votre mot de passe!',
                                    },
                                ]}

                            >

                                <Input

                                    type="password"
                                    className="u-mar-top-xs"
                                />
                            </Form.Item>







                            <Form.Item className="w100 justcenter flex itemcenter">
                                <div className="w100 justcenter flex itemcenter">


                                    {loading ?


                                        <Spin indicator={antIcon} />
                                        :

                                        <Button htmlType="submit" size="large" style={{border:0,padding:0,marginTop:30}} >

                                            <img className="continuer" src={continuer} />
                                        </Button>

                                    }

                                </div>
                            </Form.Item>

                        </div>




                    </Form>



                </div>

            </section>

        </Layout>

    );


}
