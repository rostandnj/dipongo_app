import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Layout, message, Modal, Checkbox} from 'antd';
import axios from "axios";
import close from "../../public/assets/img/bouton-quitter.png";
import ok from "../../public/assets/img/btn-ok-2.png";
import {URL} from '../../urlapi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import continuer from "../../public/assets/img/continuer.png";
import quitter from "../../public/assets/img/quitter.png";
import {useAuth} from "../../store";
import {useRouter} from "next/router";

const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c' }} spin />;


const {  Content } = Layout;

export default function  Signup () {

    const { session, updateSession, deleteSession } = useAuth();
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [checkValue, setCheckValue] = useState(false)

    useEffect(() => {

        if (typeof window !== "undefined"){
            setLoading(true)
            const token = localStorage.getItem("token");
            axios.get(URL + '/api/user/info', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((result) =>{
                setLoading(false)
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


    const [form] = Form.useForm();

    const logout = () => {

        deleteSession()

    }

    const handleCancel = () => {
        setIsModalVisible(false)
    };


    const toggleChecked = () => {
        setCheckValue(!checkValue)
    };

    const onChangeChecked = e => {
        setCheckValue(e.target.checked)
    };



    async function onSubmit ( values )  {

        if (typeof window !== "undefined"){
            const token = localStorage.getItem("token")
            setLoading(true)
            axios.post(URL + '/api/register/email', values,{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
            ).
            then((result) =>{

                setLoading(false)
                router.push("/win/end").then((r)=>{})

                //message.success(result.data.message)

            }).
            catch(function (error) {
                setLoading(false)
                if (error.response) {
                    setLoading(false)
                    message.warning(error.response.data.message)
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request)
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message)
                }
                console.log(error.config)
            });
        }



    }

    const onChecked = ()=>{
        setCheckValue((checkValue))
    }



    return (


        <Layout className="bgapp background-image-body" style={{height: '100vh'}}>

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



            <section className=" column flex itemcenter justcenter mask " style={{height: '100%'}}>

                <div className="close">
                    <img onClick={()=>router.push("/win/end").then((r)=>{})} style={{marginTop: '-10px'}} src={close} className="closeButton cursor" alt="close" />
                </div>


                <div style={{paddingTop: '100px',marginBottom: '50px'}} className="flex column    justcenter itemcenter" >

                    <Form
                        name="normal_login"
                        className=" card-auth column bgwhite  alignitems justcenter flex u-pad-top-l rad8"
                        size="large"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onSubmit}
                    >
                        <h1 style={{textAlign: 'center',fontWeight: 'bolder'}}>BRAVO !</h1>
                        <div style={{fontSize: '13px',padding: '20px',textAlign: 'justify'}}>Je t'invite à passer une demi-journée au poste de secours le plus proche de chez toi. Pour cela remplis ce formulaire.</div>


                        <div className="u-pad-horizontal-xxl ">



                            <Form.Item
                                name="name"
                                label="Nom"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Inserer un nom ',
                                    },
                                ]}
                                className="u-mar-bottom-m column u-mar-top-s"
                            >
                                <Input  className="u-mar-top-xs" />
                            </Form.Item>


                            <Form.Item
                                name="surname"
                                label="Prénom"

                                className="u-mar-bottom-m column u-mar-top-s"
                            >
                                <Input  className="u-mar-top-xs" />
                            </Form.Item>




                            <Form.Item

                                name="email"
                                label="email"
                                rules={[{type:"email",required: true,message: 'Inserer une adresse email valide',
                                },
                                ]}
                                className="u-mar-bottom-xs column"
                            >

                                <Input

                                    type="email"
                                    className="u-mar-top-xs"
                                />
                            </Form.Item>
                            <Form.Item   name="check_fill">
                                <Checkbox checked={checkValue} className="fs10 " onChange={(e)=>onChangeChecked(e)} >
                                    <span style={{fontSize: '11px'}}>J'accepte de recevoir un mail de Génération Sauveteurs.</span>
                                </Checkbox>
                            </Form.Item>
                            <Form.Item className="w100 justcenter flex itemcenter u-mar-top-l">
                                <div style={{paddingBottom: '20px'}} className="w100 justcenter flex itemcenter">

                                    {loading ?


                                        <Spin indicator={antIcon} />
                                        :

                                        <Button htmlType="submit" size="large" style={{border:0,padding:0}} >

                                            <img style={{pointerEvents: checkValue?'auto':'none'}}  style={{width: '80px',height:'50px'}} src={ok} />
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
