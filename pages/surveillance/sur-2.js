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
            let question = session.session.session_steps[1].session_step_backgrounds[1].tool_session_answers.filter((question) => question.tool.name == tag )[0]
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
                <div style={{width:'100vw',height:'100vh',background: 'rgb(244 212 125)'}} >
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

dans <span style={{fontWeight: 'bold'}}>{session.session?.session_steps[1]?.step.name}</span></span>




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
                                height="2049"
                                transform="translate(0 -.5)"
                                xlinkHref="../../chaise-2.png"
                            ></image>
                        </g>
                        <image
                            className="cursor" onClick={()=>router.push('/roadmap').then((r)=>{})}
                            width="264.567"
                            height="264.567"
                            x="2464.252"
                            y="0"
                            preserveAspectRatio="none"
                            href={"../../btn-close.png"}
                            ></image>
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
                            opacity="0" className="cursor" onClick={()=>displayQuestion('palmes')} id="palmes"
                            d="M1448.268 1228.417l-137.407-112.673-104.429-140.155 16.489-41.222 118.17 65.955L1313.61 884.9l49.466-8.244 148.4 126.414 112.673 151.148-41.222 71.451-49.466 24.733z"
                        ></path>
                        <path
                            opacity="0" className="cursor" onClick={()=>displayQuestion('sac_mns')} id="sac_mns"
                            d="M953.604 1093.759l43.97-27.482 112.673-32.978h90.689l54.963 63.208-2.748 30.23 8.244 35.725 93.437 35.726 5.496 32.977-269.318 21.985-79.696-35.725-54.962-16.49-19.237-57.71z"
                        ></path>
                        <path
                            opacity="0" className="cursor" onClick={()=>displayQuestion('talkie_walkie')} id="talkie-walkie"
                            d="M945.36 343.517l-38.475 104.43 13.74 74.199 43.971 21.985 35.726-13.74-2.748-41.223 5.496-68.703 5.496-32.978-43.97-13.74z"
                        ></path>
                        <path
                            opacity="0" className="cursor" onClick={()=>displayQuestion('surf')} id="surf"
                            d="M1857.74 2033.621l2.749-458.939 85.192-489.168 90.689-178.629 123.666-2.748 120.918 192.37 35.726 450.694-115.422 494.665z"
                        ></path>
                        <path
                            opacity="0" className="cursor" onClick={()=>displayQuestion('radio')} id="radio"
                            d="M1066.277 538.635l134.659-21.985-8.244-98.933-52.215-38.474h-8.245l-8.244 35.726-49.466 5.496v13.74l-16.49 35.726v24.734l5.497 24.733z"
                        ></path>
                        <path
                            opacity="0" className="cursor" onClick={()=>displayQuestion('jumelles')} id="jumelles"
                            d="M1681.86 417.717l-126.414 54.963-13.741 68.703 49.466 35.726 71.452-19.237 30.23 38.474 41.221 38.474 27.482-30.23-10.993-93.436-13.74-54.963z"
                        ></path>
                        <path
                            opacity="0" className="cursor" onClick={()=>displayQuestion('chaise')} id="chaise"
                            d="M805.204 2036.37l-200.614-5.497 203.362-728.256 934.367 13.74-10.993-486.42-810.7 27.482-98.933-294.05 65.955 24.732 145.651 5.497 225.348 10.992 2.748-101.68 164.888-2.75 38.474 93.438 93.437 63.207 206.11 52.214 68.703-140.155-8.244-148.399-307.791-41.222-16.49-27.481 291.303-5.497 112.674 30.23-35.726 519.398-41.222 307.791 2.748 181.377-189.621 667.797z"
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
                            className="cursor" onClick={()=>router.push('/surveillance').then((r)=>{})}
                            width="200"
                            height="300"
                            x="101.856"
                            y="865.512"
                            preserveAspectRatio="none"
                            href={"../../btn-prev.png"}
                             ></image>
                        <path
                            opacity="0" className="cursor" onClick={()=>displayQuestion('drapeau')} id="drapeau"
                            d="M175.88 582.605l-10.992 291.303 162.14 38.474 296.8-38.474 153.895-200.614L563.368 662.3 417.717 552.376z"
                        ></path>
                        <path
                            className="cursor" onClick={()=>{setIsModalChrono(true)}}  fill="url(#timer)" opacity="1"
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
        return  <EmptyData/>
    }




}
