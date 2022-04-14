import React,{useState,useEffect} from 'react';
import axios from "axios";
import {URL} from "../urlapi";
import {Layout,Modal,Progress} from 'antd';
import chrono from '../public/assets/chrono.png';
import continuer from '../public/assets/img/continuer.png';
import quitter from '../public/assets/img/quitter.png';
import Countdown from "react-countdown";
import {useAuth} from "../store";
import {useRouter} from "next/router";
import EmptyData from "../components/EmptyData";
const {  Content } = Layout;
import mapRoad from '../public/map.png';



export default function  Home () {

    const { session, updateSession, deleteSession, firstClick } = useAuth();
    const router = useRouter()
    const [loading,setLoading] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [dateNow, setDateNow] = useState(Date.parse(Date())/1000);
    const [isModalChrono, setIsModalChrono] = useState(false);
    const [isMounted,setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleCancel = () => {
        setIsModalVisible(false)
        setIsModalChrono(false)
        setIsClose(false)
    };

    const logout = () => {
        deleteSession()
    }

    useEffect(() => {
        if (typeof window !== "undefined"){
            setLoading(true)
            const token = localStorage.getItem("token")
            axios.get(URL + '/api/user/info', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((result)=>{
                setLoading(false)
                updateSession(result.data.data)

            }).catch((error)=>{
                setLoading(false)
                console.log(error)
            });
        }

    }, []);

    const goodAnswer = (step) => {
        if(session.session !== null && session.session !== undefined){
            let st = session.session.session_steps[parseInt(step,10)]

            if(st.question_true === 0){
                return "../../vide.png"
            }
            else{
                if(st.nb_question === 15){
                    if(st.question_true === 15){
                        return "../../pleine.png"
                    }
                    else{
                        return "../../"+st.question_true.toString()+"-15.png"
                    }
                }
                else{
                    if(st.question_true === 10){
                        return "../../pleine.png"
                    }
                    else{
                        return "../../"+st.question_true.toString()+"-10.png"
                    }

                }
            }
        }
        else{
            return "../../vide.png"
        }


    }


    const renderer = ({ minutes, seconds, completed }) => {

        if (completed) {
            router.push('/lost').then((res)=>{
            });
            return null;
        } else {
            if(minutes === 25 && seconds === 59){
                setIsModalVisible(false)
                setIsModalChrono(true)
            }
            return (
                <>
                    { minutes < 10 ? '0' :''} {minutes}:{ seconds < 10 ? '0' :''}{seconds}
                </>
            );
        }
    };



    if(session && session.session){
        return (
            <>

                <div style={{width:'100vw',height:'100vh',backgroundColor:'#f4cb6e'}} onClick={()=>{firstClick()}}>


                    <Modal closable={false} footer={null} visible={isClose}  onCancel={handleCancel} >
                        <div     className="  flex itemcenter justcenter column" style={{marginTop:'30vh'}}
                        >


                            <div  className="w100 flex itemcenter justcenter cursor" onClick={handleCancel} >
                                <img src={continuer} className="w35"  />

                            </div>

                            <div  className="w100 flex itemcenter justcenter cursor" onClick={logout}>
                                <img src={quitter} className="w25" style={{marginTop:20}}   />

                            </div>




                        </div>
                    </Modal>


                    <Modal closable={false} footer={null} visible={isModalVisible}  onCancel={handleCancel}>
                        <div     className="login-form card-auth hauto column  w100 bgwhite   flex u-pad-s rad8"
                        >

                            <div className="w100 flex column itemcenter justcenter flex">

                                <div style={{marginTop:-75,backgroundImage:`url(${chrono})`,backgroundSize:'cover',width:'90px',height:'108px' }} className="flex itemcenter justcenter">
<span style={{marginTop:18}}>
<Countdown date={dateNow*1000 + (session.session?.should_end_date - dateNow)*1000 } renderer={renderer}  />
</span>
                                </div>



                                <h1 className="nomar"> {JSON.parse(localStorage.getItem('user')).name}  </h1>
                                <span className="" style={{color:'#ddd',fontSize:15}}>Ma fiche secouriste</span>

                                <span className="av-heavy" style={{fontSize:15}}>


                                    {session.session?.session_steps.reduce(
                                        (accumulateur, valeurCourante) => accumulateur + valeurCourante.question_true
                                        , 0
                                    )}/{session.session?.session_steps.reduce(
                                                                        (accumulateur, valeurCourante) => accumulateur + valeurCourante.nb_question
                                                                        , 0
                                                                    )}


                                    </span>

                                <span style={{textAlign:'center',color:'#333',fontSize:14}} className="u-mar-top-xs u-mar-bottom-m">

{session.session?.message}
</span>
                            </div>



                            <div className="flex u-mar-top-xxs itemcenter justcenter">
                                <span style={{color:'#78b78a',fontSize:16,marginRight:5,width:200,textAlign:'left'}}>Environnement</span>
                                <Progress percent={session.session?.session_steps[0].question_true*100/session.session?.session_steps[0].nb_question} title={'ok'} status="active" className="green"  showInfo={false} />
                                <span style={{color:'#333',fontSize:14,marginLeft:5,width:'60px'}} className="av-heavy">


{session.session?.session_steps[0].question_true}/{session.session?.session_steps[0].nb_question}

</span>
                            </div>



                            <div className="flex  itemcenter justcenter" style={{marginTop:'22px'}}>
                                <span style={{color:'#d15d43',fontSize:16,marginRight:5,width:200,textAlign:'left'}}>Secourisme</span>
                                <Progress percent={session.session?.session_steps[2].question_true*100/session.session?.session_steps[2].nb_question}  title={'ok'} status="active" className="red"  showInfo={false} />
                                <span style={{color:'#333',fontSize:14,marginLeft:5,width:'60px'}} className="av-heavy">

{session.session?.session_steps[2].question_true}/{session.session?.session_steps[2].nb_question}


</span>
                            </div>



                            <div className="flex  itemcenter justcenter" style={{marginTop:'22px'}}>
                                <span style={{color:'#48a4a3',fontSize:16,marginRight:5,width:200,textAlign:'left'}}>Milieu aquatique</span>
                                <Progress percent={session.session?.session_steps[1].question_true*100/session.session?.session_steps[1].nb_question} title={'ok'} status="active" className="blue"  showInfo={false} />
                                <span style={{color:'#333',fontSize:14,marginLeft:5,width:'60px'}} className="av-heavy">

{session.session?.session_steps[1].question_true}/{session.session?.session_steps[1].nb_question}

</span>
                            </div>

                            <div className="flex  itemcenter justcenter" style={{marginTop:'22px'}}>
                                <span style={{color:'#faba48',fontSize:16,marginRight:5,width:200,textAlign:'left'}}>Replacer les élements</span>
                                <Progress percent={session.session?.session_steps[3].question_true*100/session.session?.session_steps[3].nb_question} title={'ok'} status="active" className="orange"  showInfo={false} />
                                <span style={{color:'#333',fontSize:14,marginLeft:5,width:'60px'}} className="av-heavy">

{session.session?.session_steps[3].question_true}/{session.session?.session_steps[3].nb_question}

</span>
                            </div>


                        </div>
                    </Modal>

                    <Modal closable={false} footer={null} visible={isModalChrono}  onCancel={handleCancel} >
                        <div     className="  flex itemcenter justcenter column" style={{height:'80vh'}}
                        >


                            <div  className="w100 flex column itemcenter justcenter cursor" onClick={handleCancel}>

                                <div style={{backgroundImage:`url(${chrono})`,backgroundSize:'cover',width:'209px',height:'251px' }} className="flex itemcenter justcenter">
<span style={{marginTop:45,fontSize:35}}>
<Countdown date={dateNow*1000 + (session.session?.should_end_date - dateNow)*1000} renderer={renderer}  />
</span>
                                </div>



                                <div className="card-auth hauto bgwhite u-mar-top-l u-pad-s divTextTime"  >
                                    <h1 style={{fontSize:'18px'}} className="center">
                                        Il te reste
                                        <span style={{fontSize:18,marginRight:5}}>
<Countdown date={dateNow*1000 + (session.session?.should_end_date - dateNow)*1000} renderer={renderer}  />
</span>
                                        minutes pour trouver toutes les bouées

                                    </h1>

                                </div>




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
                                xlinkHref={require("./../public/roadmap.png")}
                            ></image>
                            <path
                                className="cursor"
                                onClick={()=>setIsModalVisible(true)}
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
                                className="cursor"
                                onClick={()=>setIsModalChrono(true)}
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
                                onClick={()=>setIsClose(true)}
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
                                width="142.431"
                                height="139.331"
                                x="291.935"
                                y="751.147"
                                preserveAspectRatio="none"
                                href={goodAnswer("0")}
                            ></image>
                            <image
                                className="cursor"
                                width="142.431"
                                height="139.331"
                                x="931.935"
                                y="471.711"
                                preserveAspectRatio="none"
                                href={goodAnswer("2")}
                            ></image>
                            <image
                                className="cursor"
                                width="142.431"
                                height="139.331"
                                x="416.329"
                                y="246.359"
                                preserveAspectRatio="none"
                                href={goodAnswer("1")}
                            ></image>
                            <image
                                width="142.431"
                                height="139.331"
                                x="769.681"
                                y="93.119"
                                opacity="1"
                                preserveAspectRatio="none"
                                href={goodAnswer("3")}
                            ></image>
                        </g>
                        <path
                            className="cursor"
                            onClick={()=>router.push('/environement').then((res)=>{
                            })}
                            fill="transparent" d="M187.52 724.34l12.869 84.567 16.546 27.576 22.061 102.95 77.214 64.345 77.214 20.223 303.34-29.415-244.51-145.24-14.707-108.47-20.223-42.284-71.698-38.607-53.314 23.899z"></path>
                        <path
                            className="cursor"
                            onClick={()=>router.push('/surveillance').then((res)=>{
                            })}
                            fill="transparent"
                            d="M248.19 536.82l18.384-270.25 95.598-108.47 136.04-27.576 55.153 40.445 9.192 108.47-84.567 64.345 29.415 209.58-102.95 47.799-49.637 7.354-62.506-27.576z"></path>
                        <path
                            className="cursor"
                            onClick={()=>router.push('/secourisme').then((res)=>{
                            })}
                            fill="transparent"
                            d="M590.13 733.53l14.707-75.375 58.829 1.838 18.384-97.436 115.82-29.415 18.384-80.89 104.79-25.738-33.092 90.083 69.86-82.729 130.53 73.537 42.284 93.76-90.083 42.283-14.707 132.37-224.29 68.022z"></path>
                        <path
                            className="cursor"
                            onClick={()=>router.push('/replacement').then((res)=>{
                            })}
                            fill="transparent"
                            d="M902.66 323.56l42.284-40.445 14.707-125.01 16.546-90.083V18.385L853.027.001l-60.668 40.445-1.838 77.214 29.415 150.75z"></path>
                        <defs>
                            <pattern
                                id="timer"
                                patternUnits="userSpaceOnUse"
                                width="100"
                                height="80"
                            >                             {/* <---- these attributes needed here */}
                                <text x={30}
                                      y={25} fontSize="22" ><Countdown  date={dateNow*1000 + (session.session?.should_end_date - dateNow)*1000} renderer={renderer}  /></text>
                            </pattern>
                        </defs>
                    </svg>





                </div>

            </>
        );
    }
    else{
        return <EmptyData/>
    }





}
