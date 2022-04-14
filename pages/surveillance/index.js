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
import vistaplage from '../../public/assets/vistaplage3.png';
import etoile from '../../public/assets/etoile.png';
const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;
import {useAuth} from "../../store";
import {useRouter} from "next/router";
import EmptyData from "../../components/EmptyData";
import suivant from "../../public/assets/suivant.jpg";

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
            let smt = localStorage.getItem("sur1")===null;
            setShowModalText(smt);
            if(smt){
                localStorage.setItem("sur1","1");
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
            let test = localSession.session_steps[1].question_true === 15 && session.session.session_steps[1].question_true === 14
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
            let question = session.session.session_steps[1].session_step_backgrounds[0].tool_session_answers.filter((question) => question.tool.name == tag )[0]
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
            if(parseInt(id,10) <= session.session.session_steps[1].question_true){
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
                <div style={{width:'100vw',height:'100vh',background: 'rgb(245 206 118)'}} >
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
                                <h2 className="nomar green"> QUESTION MILIEU AQUATIQUE  </h2>

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


                                                <span className="fs20 center" >Tu pourras revenir a cette question dans 30 secondes pour retenter ta chance.</span>

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
                                <span className="bggray br50 u-pad-s white fs18 flex itemcenter justcenter u-mar-vertical-m" style={{height:50,width:50}}> {question?.tool.question_number} </span>
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

dans  <span style={{fontWeight: 'bold'}}>{session.session?.session_steps[1]?.step.name}</span></span>




                            </div>


                            <img src={etoile} className="starwin"  />

                        </div>



                    </Modal>


                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        viewBox="0 0 2732 2048"
                        width={"100%"}
                        height={"100%"}
                    >
                        <g data-name="Calque 26">
                            <image
                                width="2732"
                                height="2048"
                                xlinkHref="../../chaise-1.png"
                            ></image>
                        </g>
                        <g data-name="bouées vides">
                            <g data-name="bouée 15 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 892.775 10639.356) scale(.15)"
                                    href={goodAnswer("15")}
                                ></image>
                            </g>
                            <g data-name="bouée 14 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 844.15 10202.76) scale(.15)"
                                    href={goodAnswer("14")}
                                ></image>
                            </g>
                            <g data-name="bouée 11 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 698.29 8893.104) scale(.15)"
                                    href={goodAnswer("11")}
                                ></image>
                            </g>
                            <g data-name="bouée 12 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 746.91 9329.656) scale(.15)"
                                    href={goodAnswer("12")}
                                ></image>
                            </g>
                            <g data-name="bouée 13 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 795.53 9766.208) scale(.15)"
                                    href={goodAnswer("13")}
                                ></image>
                            </g>
                            <g data-name="bouée 7 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 503.8 7146.806) scale(.15)"
                                    href={goodAnswer("7")}
                                ></image>
                            </g>
                            <g data-name="bouée 8 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 552.425 7583.403) scale(.15)"
                                    href={goodAnswer("8")}
                                ></image>
                            </g>
                            <g data-name="bouée 9 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 601.045 8019.955) scale(.15)"
                                    href={goodAnswer("9")}
                                ></image>
                            </g>
                            <g data-name="bouée 10 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 649.665 8456.507) scale(.15)"
                                    href={goodAnswer("10")}
                                ></image>
                            </g>
                            <g data-name="bouée 1 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 212.075 4527.45) scale(.15)"
                                    href={goodAnswer("1")}
                                ></image>
                            </g>
                            <g data-name="bouée 2 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 260.695 4964.001) scale(.15)"
                                    href={goodAnswer("2")}
                                ></image>
                            </g>
                            <g data-name="bouée 3 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 309.315 5400.553) scale(.15)"
                                    href={goodAnswer("3")}
                                ></image>
                            </g>
                            <g data-name="bouéee 4 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 357.935 5837.105) scale(.15)"
                                    href={goodAnswer("4")}
                                ></image>
                            </g>
                            <g data-name="bouée 5 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 406.56 6273.702) scale(.15)"
                                    href={goodAnswer("5")}
                                ></image>
                            </g>
                            <g data-name="bouée 6 vide">
                                <image
                                    width="486"
                                    height="1423"
                                    transform="rotate(12.71 455.18 6710.254) scale(.15)"
                                    href={goodAnswer("6")}
                                ></image>
                            </g>
                        </g>
                        <path
                            opacity="0" id="drapeau-1" className="cursor" onClick={()=>displayQuestion('drapeaux')}
                            d="M1605.948 1334.52l2.827-641.814-260.118-11.31 8.482 169.643 189.434 14.137 16.964 514.582 757.736 158.333 98.958-203.571-39.583-497.618-115.923-11.31-104.612-98.957 163.987-67.857 147.024 5.655-8.482 653.123-124.405 234.672-104.613-11.31z"
                        ></path>
                        <path
                            opacity="0" id="voiture" className="cursor" onClick={()=>displayQuestion('voiture')}
                            d="M5.655 1229.907l25.446-42.41 243.154-70.685 16.964 98.958-76.339 42.41 144.196 36.757 158.333 115.922 76.34 48.065 183.778 22.62 135.714 56.547 53.72 50.892 36.756 197.916-45.238 50.893h-70.684l-31.101 147.024-257.291-19.792-81.994-113.095-500.445 19.792z"
                        ></path>
                        <path
                            opacity="0" id="mer-1" className="cursor" onClick={()=>displayQuestion('mer')}
                            d="M2725.587 503.272l-155.505 62.203-59.375 42.41v0l-268.6 5.655-161.16 73.512-98.959 186.606-316.666-19.791-16.964-220.536-395.832-2.827-36.756-257.29-474.998-19.792-22.62 166.815 11.31 265.773-195.089 398.66-192.26-25.447-36.757-127.232-299.701 73.512 11.31-585.266 647.468-8.483 31.1-183.779 545.684 22.62 22.619 147.023z"
                        ></path>
                        <path
                            opacity="0" id="mns" className="cursor" onClick={()=>displayQuestion('mns_chaise')}
                            d="M1068.747 1003.717l-192.261 28.274-76.34-28.274 8.483-79.166 107.44-31.101 115.922-14.137 36.756 56.547z"
                        ></path>
                        <path
                            opacity="0" id="bouee-tube" className="cursor" onClick={()=>displayQuestion('bouee_tube')}
                            d="M1094.193 1221.425l-67.857 245.981 39.583 39.584 45.238-59.375 45.238-197.916z"
                        ></path>
                        <path
                            opacity="0" id="baigneur" className="cursor" onClick={()=>displayQuestion('baigneurs')}
                            d="M1758.626 1159.223l-62.202-19.792-19.792-135.714 42.41-73.511 39.584-2.828 33.928 197.916 175.297 195.09 2.828-206.4-42.41-65.029 25.445-62.202 16.965-39.583 93.303-8.482 5.655 62.202 28.274 48.065-22.62 87.649 11.31 163.987 76.34-53.72-2.828-223.362 96.13-25.446 31.102 127.231-16.965 110.268-33.928 59.375-172.47 81.993-107.44-19.791z"
                        ></path>
                        <path
                            opacity="0" id="chaise" className="cursor" onClick={()=>displayQuestion('chaise')}
                            d="M763.39 596.576l-2.827 110.267 19.792 33.929 81.994 33.928 296.874-8.482 39.583-59.375-14.137-33.928 2.827-84.821-426.933-8.483z"
                        ></path>
                        <image
                            width="328.819"
                            height="377.953"
                            x="2335.748"
                            y="1606.299"
                            preserveAspectRatio="none"
                            href={"../../chrono.png"}
                             ></image>
                        <image
                            className="cursor" onClick={()=>router.push('/roadmap').then((r)=>{})}
                            width="264.567"
                            height="264.567"
                            x="2464.252"
                            y="0"
                            preserveAspectRatio="none"
                            href={"../../btn-close.png"}
                            ></image>
                        <image
                            className="cursor" onClick={()=>router.push('/surveillance/sur-2').then((r)=>{})}
                            width="200"
                            height="300"
                            x="2494.488"
                            y="865.512"
                            preserveAspectRatio="none"
                            href={"../../btn-next.png"}
                             ></image>
                        <path
                            className="cursor" onClick={()=>setIsModalChrono(true)} fill="url(#timer)" opacity="1"
                            d="M2408.921 1789.727l5.655 84.821 183.78-5.655-5.655-90.476z"
                        ></path>
                        <defs>
                            <pattern
                                id="timer"

                                width="4"
                                height="10"

                            >
                                <text x={38}
                                      y={70} fontSize="50" ><Countdown date={dateNow*1000 + (session.session?.should_end_date - dateNow)*1000} renderer={renderer}  /></text>
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
