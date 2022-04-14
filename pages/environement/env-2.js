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

const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;

//const {  Content } = Layout;
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
    useEffect(() => {
        setIsMounted(true)
    }, [])


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
                if(isMounted){
                setLocalSession(result.data.data.running_session)}

            }).catch((error)=>{
                console.log(error)
            });
        }

    }, []);

    const handleCancel = () => {
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
            let question = session.session.session_steps[0].session_step_backgrounds[1].tool_session_answers.filter((question) => question.tool.name == tag )[0]
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
                <div style={{width:'100vw',height:'100vh',background: 'rgb(244 203 110)'}}>

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
                                <span className="fs18 center" >Cette question est encore bloquée.<br/>
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
                        viewBox="0 0 2560 2048"
                        width={"100%"}
                        height={"100%"}
                    >
                        <g data-name="Calque 16">
                            <image
                                width="2560"
                                height="1919"
                                xlinkHref="../../dune-2.png"></image>
                        </g>
                        <g data-name="bouées vides" transform={"translate(-180 -3)"}>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 892.775 10639.356) scale(.14)"
                                href={goodAnswer("15")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 844.15 10202.76) scale(.14)"
                                href={goodAnswer("14")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 795.53 9766.208) scale(.14)"
                                href={goodAnswer("13")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 746.91 9329.656) scale(.14)"
                                href={goodAnswer("12")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 698.29 8893.104) scale(.14)"
                                href={goodAnswer("11")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 649.665 8456.507) scale(.14)"
                                href={goodAnswer("10")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 601.045 8019.955) scale(.14)"
                                href={goodAnswer("9")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 552.425 7583.403) scale(.14)"
                                href={goodAnswer("8")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 503.8 7146.806) scale(.14)"
                                href={goodAnswer("7")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 455.18 6710.254) scale(.14)"
                                href={goodAnswer("6")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 406.56 6273.702) scale(.14)"
                                href={goodAnswer("5")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 357.935 5837.105) scale(.14)"
                                href={goodAnswer("4")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 309.315 5400.553) scale(.14)"
                                href={goodAnswer("3")}
                            ></image>

                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 260.695 4964.001) scale(.14)"
                                href={goodAnswer("2")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 212.075 4527.45) scale(.14)"
                                href={goodAnswer("1")}
                            ></image>
                        </g>
                        <path
                            transform={"translate(-150 -10)"}
                            className="cursor" onClick={()=>displayQuestion('poubelle')} opacity="0" fill="transparent" id="poubelle"
                            d="M2100.83 1696.841v-457.487l15.048-117.382 129.42 36.118 123.402-12.04 39.127 60.196 12.04 484.575-87.285 39.128-156.508-3.01z"
                        ></path>
                        <path
                            transform={"translate(-50 -50)"}
                            className="cursor" onClick={()=>displayQuestion('drapeau_rouge')} opacity="0" fill="transparent" id="drapeau-rouge"
                            d="M734.15 832.364H626.114V665.4l127.678 2.455 2.456 166.964z"
                        ></path>
                        <path
                            transform={"translate(-50 -50)"}
                            className="cursor" onClick={()=>displayQuestion('drapeau_jaune')} opacity="0" fill="transparent"
                            d="M734.15 990.693H626.114V883.927l22.098-2.455 36.83-24.554 22.099 17.188 22.098 9.821h17.187z"
                        ></path>
                        <path
                            transform={"translate(-101 -3)"}
                            className="cursor" onClick={()=>displayQuestion('picto_feu')} opacity="0" fill="transparent" id="picto-feu"
                            d="M1539.504 780.087l-130.133-2.455-4.91-142.41 139.954-2.456z"
                        ></path>
                        <path
                            transform={"translate(-101 -3)"}
                            className="cursor" onClick={()=>displayQuestion('picto_chaussure_fleur')} opacity="0" fill="transparent" id="picto-chaussure-fleur"
                            d="M1411.826 920.506l76.116 19.643 71.205-46.652 2.456-78.571s-41.741-17.187-51.563-17.187c-9.821 0-73.66 9.82-73.66 9.82l-19.643 61.385z"
                        ></path>
                        <path
                            transform={"translate(-141 -3)"}
                            className="cursor" onClick={()=>displayQuestion('panneau_fleche')} opacity="0" fill="transparent" id="panneau-fleche"
                            d="M1770.307 361.963l2.456 232.053 9.821 46.652-68.75 63.839 85.937 95.758 27.01 71.206-4.911 135.044 78.57 12.277 9.822 736.605 144.866-14.732-27.009-714.507 103.125-24.554-7.366-108.035 7.366-61.384 132.589-19.643-14.732-206.25 83.482-105.58-135.045-125.222-432.141-17.187z"
                        ></path>
                        <path
                            transform={"translate(-90 0)"}
                            className="cursor" onClick={()=>displayQuestion('panneau_craie')} opacity="0" fill="transparent" id="panneau-craie"
                            d="M1242.407 951.426h314.285l9.821 449.329-331.472-7.366z"
                        ></path>
                        <path

                            className="cursor" onClick={()=>displayQuestion('plantes_gauches')} opacity="0" fill="transparent" id="plante-gauche"
                            d="M7.366 1230.13l44.196-39.285 95.759 12.277 174.33 29.464 110.49 370.758 7.367 243.08-414.955 54.017z"
                        ></path>
                        <image
                            transform={"translate(-181 -3)"}
                            width="453"
                            height="535"
                            x="2246"
                            y="1465.842"
                            preserveAspectRatio="none"
                            href={"../../chrono.png"}
                        ></image>
                        <path
                            className="cursor"
                            onClick={()=>setIsModalChrono(true)}
                            transform={"translate(-181 -28)"}
                            fill="url(#timer)"
                            opacity="1"
                            d="M2376.779 1755.575l4.91 95.759 181.696-7.366-4.91-95.759z"
                        ></path>
                        <image
                            transform={"translate(-181 -3)"}
                            className="cursor" onClick={()=>router.push('/roadmap').then((r)=>{})}
                            width="256.75"
                            height="256.75"
                            x="2476.5"
                            y="3"
                            preserveAspectRatio="none"
                            href={"../../btn-close.png"}
                        ></image>
                        <image

                            className="cursor" onClick={()=>router.push('/environement').then((r)=>{})}
                            width="200"
                            height="300"
                            x="67.858"
                            y="760.871"
                            preserveAspectRatio="none"
                            href={'../../btn-prev.png'}
                        ></image>
                        <defs>
                            <pattern
                                id="timer"

                                patternUnits="userSpaceOnUse"
                                width="200"
                                height="80"
                            >                             {/* <---- these attributes needed here */}
                                <text  x={22}
                                      y={68} fontSize="50" ><Countdown date={dateNow*1000 + (session.session?.should_end_date - dateNow)*1000} renderer={renderer}  /></text>
                            </pattern>
                        </defs>
                    </svg>







                </div>

            </>
        );
    }else{
        return <EmptyData/>
    }



}
