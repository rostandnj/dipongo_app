import React,{useState,useEffect} from 'react';
import axios from "axios";
import {URL} from "../../urlapi";
import {Modal} from 'antd';
import continuer from '../../public/assets/img/continuer.png';
import quitter from '../../public/assets/img/quitter.png';
import Countdown from "react-countdown";
import boueevide from "../../public/assets/nouvelle-bouee-vide.png"
import boueeremplie from "../../public/assets/nouvelle-bouee-remplie.png"
import { Spin,message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import chrono from "../../public/assets/chrono.png";
import chronoRed from "../../public/assets/chrono-rouge.png";
import vistaplage from '../../public/assets/vistaplage2.png';
import etoile from '../../public/assets/etoile.png';
import {useAuth} from "../../store";
import {useRouter} from "next/router";
import EmptyData from "../../components/EmptyData";
import suivant from "./../../public/assets/suivant.jpg"

const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;

export default function  Home () {

    const { session, updateSession, deleteSession } = useAuth();
    const router = useRouter()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isClose, setIsClose] = useState(false);
    const [question, setQuestion] = useState(null);
    const [resultquiz, setResultQuiz] = useState(null);
    const [dateNow, setDateNow] = useState(Date.parse(Date())/1000);
    const [loading,setLoading] = useState(true)
    const [loadingResp,setLoadingResp] = useState(false)
    const [verif,setVerif] = useState(null)
    const [localSession,setLocalSession] = useState(null)
    const [isModalLockedToolVisible,setIsModalLockedToolVisible] = useState(false)


    const [isModalChrono, setIsModalChrono] = useState(false);
    const [isModalEndStep, setIsModalEndStep] = useState(false);
    const [closeOnEndStep, setCloseOnEndStep] = useState(false);
    const [isMounted,setIsMounted] = useState(false)
    const [showModalText,setShowModalText] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])


    useEffect(() => {

        if (typeof window !== "undefined"){
            setLoading(true)
            const token = localStorage.getItem("token")
            let smt = localStorage.getItem("env1")===null;
            setShowModalText(smt);
            if(smt){
                localStorage.setItem("env1","1");
            }
            axios.get(URL + '/api/user/info', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((result)=>{
                setLoading(false)
                updateSession(result.data.data)
                if(isMounted){
                setLocalSession(result.data.data.running_session)}

            }).catch((error)=>{
                console.log(error)
            });
        }

    }, []);

    const handleCancel = () => {
        setShowModalText(false);
        setIsModalVisible(false);
        setIsClose(false)
        setVerif(null)
        setIsModalChrono(false)
        setIsModalEndStep(false)
        if(localSession !== null){
            let test = localSession.session_steps[0].question_true === 15 && session.session.session_steps[0].question_true === 14
            if(test === false){
                if(session.session.question_done === 50){
                    router.push('/win').then((r)=>{})
                }
                else{
                    updateSession({running_session: localSession})
                }

            }
            else{
                if(localSession.question_done === 50){
                    if(session.session.question_done === 49){
                        updateSession({running_session: localSession})
                        if(!closeOnEndStep){
                            setIsModalEndStep(true);
                            setCloseOnEndStep(!closeOnEndStep)
                        }
                    }
                    else{

                        router.push('/win').then((r)=>{})
                    }
                }
                else{
                    if(!closeOnEndStep){
                        setIsModalEndStep(true);
                        setCloseOnEndStep(!closeOnEndStep)
                    }
                    else{
                        setIsModalEndStep(false)
                        updateSession({running_session: localSession})
                    }
                }

            }
        }


    };
    const handleCancel2 = () => {
        setIsModalLockedToolVisible(false);
    };

    const logout = () => {
        deleteSession()
    }

// make response
    async function makeResponse ( id,answer)  {

        if (typeof window !== "undefined"){
            const token = localStorage.getItem("token")
            setLoadingResp(true)
            axios.post(URL + '/api/answer/question',
                {id,answer},{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }

            ).then((result) =>
            {

                setVerif(result.data.data.answer.is_true)
                setResultQuiz(result.data.data)
                setLoadingResp(false)
                setLocalSession(result.data.data.running_session)

            }).
            catch(function (error) {
                setLoadingResp(false)
                if (error.response) {

                    message.warning(error.response.data.message)

                    if(error.response.data.data!== undefined &&  error.response.data.data.code !== undefined  && error.response.data.data.code !== null){
                        switch (error.response.data.data.code){
                            case 'no_running_session':
                                setIsModalVisible(false)
                                updateSession({running_session: null})
                                break;
                            case 'session_ended':
                               updateSession(error.response.data.data)
                                if(error.response.data.data.running_session.question_done < error.response.data.data.running_session.question_total ){
                                    router.push('/lost').then((r)=>{})
                                }
                                else{
                                    router.push('/win').then((r)=>{})
                                }
                                break;
                            case 'question_already_done':
                                if(session.session.question_done === 50){
                                    router.push('/win').then((r)=>{})
                                }
                                else{
                                    if (typeof window !== "undefined"){
                                        window.location.reload()
                                    }
                                }
                                break;
                            case 'remaining_time':
                                break;
                            default:
                                break;

                        }
                    }

                } else if (error.request) {
                    console.log(error.request)
                } else {
                    console.log('Error', error.message)
                }
            });
        }


    }

    const renderer = ({ minutes, seconds, completed }) => {

        if (completed) {
            router.push('/lost').then((r)=>{});
            // Render a complete state
            return null;
        } else {
            // Render a countdown
            if(minutes === 25 && seconds === 59){

                setIsModalVisible(false)
                setIsModalLockedToolVisible(false)
                setIsModalEndStep(false)
                setIsModalChrono(true)
            }
            return (
                <>
                    { minutes < 10 ? '0' :''} {minutes}:{ seconds < 10 ? '0' :''}{seconds}
                </>
            );
        }
    };
    const rendererUnlock = ({ minutes, seconds, completed }) => {

        if (completed) {
            setIsModalLockedToolVisible(false)
            displayQuestion(question.tool.name)
            return null;
        } else {
            // Render a countdown
            return (
                <>
                    { '00'}:{seconds}
                </>
            );
        }
    };

    // display question

    const displayQuestion = (tag) => {


        if(session.session !== undefined && session.session !== null){
            let question = session.session.session_steps[0].session_step_backgrounds[0].tool_session_answers.filter((question) => question.tool.name == tag )[0]
            if(question.is_true !== true){
                setQuestion(question)

                if(question.next_time > (Date.parse(Date())/1000)){
                    setIsModalLockedToolVisible(true)
                }
                else{
                    setIsModalVisible(true)
                }
            }
        }


    }

    const goodAnswer = (id) => {
        if(session.session !== undefined && session.session !== null){
            if(parseInt(id,10) <= session.session.session_steps[0].question_true){
                return "../../bouee-remplie.png"
            }
            else{
                return "../../bouee-vide.png"
            }
        }
        else{
            return "../../bouee-vide.png"
        }

        //return "../../bouee-vide.png"


    }


    if(session && session.session){
        return (
            <>
                <div style={{width:'100vw',height:'100vh',background: 'rgb(249, 213, 140)'}} >
                    <Modal closable={false} footer={null} visible={showModalText}  onCancel={handleCancel} >
                        <div     className="  flex itemcenter justcenter column" style={{marginTop:'30vh'}}
                        >


                            <h3 className="onboarding-text" style={{color: 'white',fontWeight: 'bold',textAlign:'center'}}>Clique sur les objets<br/>
                                pour trouver les questions et y répondre.</h3>

                            <div  className="w100 flex itemcenter justcenter cursor" onClick={handleCancel}>
                                <img src={suivant} className="w25"  />

                            </div>




                        </div>
                    </Modal>
                    <Modal closable={false} footer={null} visible={isClose}  onCancel={handleCancel} >
                        <div     className="  flex itemcenter justcenter column" style={{height:'80vh'}}
                        >


                            <div  className="w100 flex itemcenter justcenter cursor" onClick={logout} >
                                <img src={quitter} className="w50"   />
                            </div>

                            <div  className="w100 flex itemcenter justcenter cursor" onClick={handleCancel}>
                                <img src={continuer} className="w25"  style={{marginTop:20}} />
                            </div>

                        </div>
                    </Modal>

                    <Modal closable={false} footer={null} visible={isModalVisible}  onCancel={handleCancel}>
                        <div     className="login-form card-auth hauto column  w100 bgwhite   flex u-pad-l rad8"
                        >

                            <div className="w100 flex column itemcenter justcenter flex">
                                <h2 className="nomar green"> QUESTION ENVIRONNEMENT  </h2>

                                <span className={`br50 u-pad-s white fs18 flex itemcenter justcenter u-mar-vertical-m ${verif!==null?verif===true ?'bggreen':'bggray':'bggreen'}`}  style={{height:50,width:50}}> {question?.tool.question_number} </span>


                                {loadingResp ?

                                    <Spin indicator={antIcon} />
                                    :verif === true?

                                        <>
<span  className="green fs18 center">


{resultquiz?.answer.single_answer.text}

</span>


                                            <span className="fs20 center" >{resultquiz?.answer.single_answer.description}</span>


                                            <img src={boueeremplie} />

                                        </>


                                        :verif == false ?

                                            <>
<span  className=" fs18 center" style={{color:'red'}}>


ET NON

</span>


                                                <span className="fs20 center" >Tu pourras revenir à cette question dans 30 secondes pour retenter ta chance.</span>

                                                <img src={boueevide} />


                                            </>


                                            :

                                            <>
<span  className="green fs18 center">


{question?.tool.question}

</span>

                                                <div className="u-mar-top-m flex column">
                                                    {question?.tool.possible_answers.map( (answer) =>

                                                        <div key={answer.id} className="u-mar-bottom-s flex itemcenter justbtw cursor opt" onClick={()=>makeResponse(question.id,answer.text)}>

                                                            <span style={{height:20,width:20,border:'2px solid #333',display:'block'}} className="br50 u-mar-right-s pp"> </span>
                                                            <span className="fs20" style={{width:'60px'}}>{answer.text}</span>

                                                        </div>
                                                    )
                                                    }

                                                </div>

                                                <div>

                                                    <img src={boueevide} />

                                                </div>
                                            </>

                                }







                            </div>



                        </div>
                    </Modal>

                    <Modal closable={false} footer={null} visible={isModalLockedToolVisible}  onCancel={handleCancel2}>
                        <div     className="login-form card-auth hauto column  w100 bgwhite   flex u-pad-l rad8">
                            <div className="w100 flex column itemcenter justcenter flex">
                                <h2 className="nomar green"> QUESTION ENVIRONNEMENT  </h2>
                                <span className="bggray br50 u-pad-s white fs16 flex itemcenter justcenter u-mar-vertical-m" style={{height:50,width:50}}> {question?.tool.question_number} </span>
                                <span className="fs20 center" >Cette question est encore bloquée.<br/>
                Rendez-vous dans {((question?.next_time*1000) - (Date.parse(Date())))/1000} seconde(s).</span>
                                <div style={{marginTop: '20px', marginBottom: '20px',backgroundImage:`url(${chronoRed})`,backgroundSize:'cover',width:'90px',height:'108px' }} className="flex itemcenter justcenter">
                <span style={{marginTop:18}}>
                00:{((question?.next_time*1000) - (Date.parse(Date())))/1000}
                </span>
                                </div>


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



                                <div className="card-auth hauto divTextTime bgwhite u-mar-top-l u-pad-s
                     " >
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

                    <Modal closable={false} footer={null} visible={isModalEndStep}  onCancel={handleCancel} >


                        <div className="login-form card-auth hauto column  w100 bgwhite  rel flex u-pad-m rad8">

                            <div className="w100 flex column itemcenter justcenter flex">


                                <img src={vistaplage} className="w60" />




                                <span  className="green fs18 center">


BRAVO

</span>

                                <span className="fs20 center" > Tu as répondu juste à toutes les questions <br/>

dans <span style={{fontWeight: 'bold'}}>{session.session?.session_steps[0]?.step.name}</span></span>




                            </div>


                            <img src={etoile} className="starwin"  />

                        </div>



                    </Modal>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 1280 1024"
                        width={"100%"}
                        height={"100%"}
                    >
                        <g data-name="Calque 17">
                            <image
                                width="2560"
                                height="2048"
                                transform="scale(.5)"
                                xlinkHref="../../dune-tableau1.png"
                            ></image>
                        </g>
                        <g data-name="bouées vides">
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 407.845 4915.66) scale(.07)"
                                href={goodAnswer("15")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 383.525 4697.295) scale(.07)"
                                href={goodAnswer("14")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 359.2 4478.884) scale(.07)"
                                href={goodAnswer("13")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 334.88 4260.518) scale(.07)"
                                href={goodAnswer("12")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 310.56 4042.152) scale(.07)"
                                href={goodAnswer("11")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 286.235 3823.742) scale(.07)"
                                href={goodAnswer("10")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 261.915 3605.376) scale(.07)"
                                href={goodAnswer("9")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 237.595 3387.01) scale(.07)"
                                href={goodAnswer("8")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 213.27 3168.6) scale(.07)"
                                href={goodAnswer("7")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 188.95 2950.234) scale(.07)"
                                href={goodAnswer("6")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 164.63 2731.868) scale(.07)"
                                href={goodAnswer("5")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 140.305 2513.457) scale(.07)"
                                href={goodAnswer("4")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 115.985 2295.092) scale(.07)"
                                href={goodAnswer("3")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 91.665 2076.726) scale(.07)"
                                href={goodAnswer("2")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 67.34 1858.315) scale(.07)"
                                href={goodAnswer("1")}
                            ></image>





                        </g>
                        <path
                            className="cursor"
                            onClick={()=>setIsModalChrono(true)}
                            fill="url(#timer)"
                            opacity="1"
                            d="M1084.668 864.057l1.838 58.83h119.498l-1.839-56.991z"
                        ></path>
                        <image
                            className="cursor" onClick={()=>router.push('/roadmap').then((r)=>{})}
                            width="128.504"
                            height="128.504"
                            x="1147.785"
                            y="0"
                            preserveAspectRatio="none"
                            href={'../../btn-close.png'}
                           ></image>
                        <path
                            className="cursor" onClick={()=>displayQuestion('cailloux')} id="cailloux"
                            opacity="0"
                            d="M717.516 787.164l-21.027-24.968 13.142-27.597-9.2-21.026 6.571-21.026 21.027-9.199 22.34-15.77 31.539 3.943 5.256 21.026 22.34 15.77-2.628 10.513 17.084 6.57 2.628 9.2-2.628 15.769-21.026 5.256-6.57-7.884h-34.168l3.942 14.455 9.2 27.597-24.97-1.314z"
                        ></path>
                        <path
                            className="cursor" onClick={()=>displayQuestion('plantes_bleux')} id="plantes-bleues"
                            opacity="0"
                            d="M904.122 843.672l-3.942-52.565s-11.827 7.885-18.398 7.885c-6.57 0-32.853-6.571-32.853-6.571l-10.513-17.084 3.942 3.943 10.513-22.34 6.57-21.027 9.2-14.455 9.198-10.513 22.34-11.827 10.514 15.77 10.513 9.198 19.712 73.592L958 734.599l15.77-28.91 22.34-1.315 14.456 19.712 9.199 18.398-7.885 31.54-15.77 11.826-17.083 28.911L967.2 848.93l-31.539 9.199 52.565 49.936-2.628 47.31 21.026 2.627 31.54 10.514h19.711l9.2 3.942 32.853 43.366-11.828 5.257-177.407 2.628-39.424-6.57 2.628-32.854 3.942-10.513-18.397-55.193 1.314-34.168 24.968-28.91z"
                        ></path>
                        <path
                            opacity="0"
                            className="cursor" onClick={()=>displayQuestion('panneau_sur_barriere')} id="panneau"
                            d="M484.914 570.333l-1.314-52.565 111.701 11.827-2.628 56.507z"
                        ></path>
                        <path
                            opacity={"0"}
                            className="cursor" onClick={()=>displayQuestion('ponton')} id="ponton"
                            d="M32.853 1014.51l109.073-173.466 15.77-85.419-13.142-91.989-2.628-70.963 26.283-7.885 42.052-47.308 34.167 7.884-27.596 28.911 70.963-10.513 44.68 55.194 94.618 56.507L528.28 777.966l74.905 140.612 51.251 102.502z"
                        ></path>
                        <path
                            className="cursor" onClick={()=>displayQuestion('nuages')} id="nuages" opacity="0"
                            d="M123.528 244.428l82.79-56.507 85.42-2.629 72.276 63.079 43.367 17.083 438.92 48.623v-23.654l63.078-30.225 69.649 11.827 43.366 22.34 5.256 30.225-32.853 17.084H864.698l-14.455-15.77-450.747-51.25-34.168 15.769-76.22 2.628-101.187-1.314-73.592-31.54z"
                        ></path>
                        <path
                            className="cursor" onClick={()=>displayQuestion('dechets')} id="dechets" opacity="0"
                            d="M751.683 615.013l6.57-24.968 106.445-6.57 13.141 43.365-18.397 13.142h-44.68l-49.938-5.257z"
                        ></path>
                        <path
                            className="cursor" onClick={()=>displayQuestion('mer')} id="mer" opacity="0"
                            d="M9.199 391.611l-6.57 84.104 69.648 7.885 81.476-2.628 153.754 7.885 77.533 3.942 31.54-9.199 61.764 3.943 73.591 17.083 110.387-13.141 43.366-18.398 139.298-6.57L954.06 416.58l88.047-24.969z"
                        ></path>
                        <image
                            width="100"
                            height="160"
                            x="1142.689"
                            y="391.611"
                            className="cursor" onClick={()=>router.push('/environement/env-2').then((r)=>{})}
                            preserveAspectRatio="none"
                            href={'../../btn-next.png'}
                               ></image>
                        <defs>
                            <pattern
                                id="timer"
                                patternUnits="userSpaceOnUse"
                                width="100"
                                height="80"
                            >                             {/* <---- these attributes needed here */}
                                <text x={20}
                                      y={20} fontSize="25" ><Countdown date={dateNow*1000 + (session.session?.should_end_date - dateNow)*1000} renderer={renderer}  /></text>
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
