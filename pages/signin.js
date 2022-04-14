import React, { useState} from 'react';
import { Form, Input, Button, Layout,message} from 'antd';
import axios from "axios";
import close from "../public/assets/img/bouton-quitter.png";
import jouer from "../public/assets/img/jouer.png";
import {URL} from '../urlapi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {useAuth} from "../store";
import {useRouter} from "next/router";

const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c' }} spin />;


const {  Content } = Layout;

export default function  Signup () {

    const [loading,setLoading] = useState(false)
    const { session, updateSession, deleteSession,initSession } = useAuth();

    const [form] = Form.useForm();

    const logout = () => {
        deleteSession()
    }


    async function onSubmit ( values )  {
        setLoading(true)

        axios.post(URL + '/app/create/account', values
        ).
        then((result) =>{
            message.success(result.data.message)
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
                console.log('Error', error.message)
            }
            console.log(error)
        });





    }



    return (
        <Layout className="bgapp background-image-body">

            <section className="hv100 column flex itemcenter justcenter mask ">

                <div className="close cursor">
                    <img onClick={logout} src={close} className="closeButton" alt="close" />
                </div>

                <div className="login-form flex column  justcenter itemcenter"  >

                    <Form
                        name="normal_login"
                        className="login-form card-auth column w90res bgwhite  alignitems justcenter flex u-pad-top-l rad8"
                        size="large"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onSubmit}
                    >

                        <div className="headerform flex itemcenter justcenter" >
                            <h3 className="form-header form-header_login register  uppercase form-login-msg">CRÉER MON COMPTE</h3>
                        </div>


                        <div className="u-pad-horizontal-xxl u-pad-s-res">



                            <Form.Item className="u-mar-top-s u-mar-bottom-m column"
                                       name="email"
                                       label="Nom d'utilisateur"
                                       rules={[
                                           {
                                               required: true,
                                               message: 'Inserer un nom ',
                                           },
                                       ]}

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
                            <Form.Item className="w100 justcenter flex itemcenter u-mar-top-l">
                                <div className="w100 justcenter flex itemcenter">

                                    {loading ?


                                        <Spin indicator={antIcon} />
                                        :

                                        <Button htmlType="submit" size="large" style={{border:0,padding:0}} >

                                            <img src={jouer} />
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
