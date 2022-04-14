import React,{useState,useEffect} from 'react';
import axios from "axios";
import {URL} from "../../urlapi";
import {Layout,Modal,Progress} from 'antd';
import chrono from '../../public/assets/chrono.png';
import continuer from '../../public/assets/img/continuer.png';
import quitter from '../../public/assets/img/quitter.png';
import Countdown from "react-countdown";
import boueevide from "../../public/assets/nouvelle-bouee-vide.png"
import boueeremplie from "../../public/assets/nouvelle-bouee-remplie.png"
import suivant from "../../public/assets/suivant.png"
import { Spin,message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import chronoRed from "../../public/assets/chrono-rouge.png";
import vistaplage from "../../public/assets/vistaplage.png";
import etoile from "../../public/assets/etoile.png";

const pathSecour = "../../secour/";
import {useAuth} from "../../store";
import {useRouter} from "next/router";
import EmptyData from "../../components/EmptyData";

const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;

const {  Content } = Layout;
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
    const [position, setPosition] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [isMounted,setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])


    const [isModalChrono, setIsModalChrono] = useState(false);
    const [isModalEndStep, setIsModalEndStep] = useState(false);
    const [closeOnEndStep, setCloseOnEndStep] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
        setIsClose(false)
        setVerif(null)
        setIsModalChrono(false)
        setIsModalEndStep(false)

        if(localSession !== null){
            let test = localSession.session_steps[2].question_true === 10 && session.session.session_steps[2].question_true === 9
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

    useEffect(()=>{
        if(question){
            if(position +1 === question.tool.possible_answers.length){
                if(answers.length === 1){
                    setPosition(2)
                }
                else{
                    setPosition(answers.length+1)
                }
            }
            else{
                setPosition(answers.length+1)
            }
            if(answers.length === question.tool.possible_answers.length ){
                setLoadingResp(true)
                if (typeof window !== "undefined"){
                    const token = localStorage.getItem("token")
                    axios.post(URL + '/api/answer/question',
                        {id:question.id,answers:answers},{
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        }
                    ).then((result) =>
                    {

                        //answersrep = [];
                        setVerif(result.data.data.answer.is_true)
                        setResultQuiz(result.data.data.answer)
                        setLoadingResp(false)
                        setLocalSession(result.data.data.running_session)
                        setAnswers([]);
                        setPosition(1)


                    }).
                    catch(function (error) {
                        //answersrep = [];
                        setLoadingResp(false)
                        setAnswers([]);
                        setPosition(1)
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
                                        updateSession({running_session: error.response.data.data.running_session})
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

        }



    },[answers])

    async function makeResponse (idquestion, idtool)  {

        let index = -1;
        const size = answers.length
        for (var i =0;i<size;i++){
            if(answers[i].id === idtool){
                index = i;
            }
        }
        if(index===-1){
            if(size === 0){
                setAnswers( [{position:1,id:idtool}])
            }
            else{
                setAnswers( answers.concat({position:position,id:idtool}))
            }
        }
        else{
            setAnswers( [{position:1,id:idtool}])
        }

    }

    const Completionist = () => <span>00:00</span>;


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
        setQuestion(null)
        setPosition(1)
        setAnswers([])

        if(session.session !== undefined && session.session !== null){
            let question = session.session.session_steps[2].session_step_backgrounds[1].tool_session_answers.filter((question) => question.tool.name == tag )[0]
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
            if(parseInt(id,10) <= session.session.session_steps[2].question_true){
                return "../../bouee-remplie.png"
            }
            else{
                return "../../bouee-vide.png"
            }
        }
        else{
            return "../../bouee-vide.png"
        }

    }

    if(session && session.session){
        return (
            <>
                <div style={{width:'100vw',height:'100vh',background: 'rgb(233 209 186)'}} >
                    <Modal closable={false} footer={null} visible={isModalVisible}  onCancel={handleCancel}>
                        <div     className="login-form card-auth hauto column   bgwhite   flex u-pad-l rad8"
                        >

                            <div className="w100 flex column itemcenter justcenter flex">
                                <h2 className="nomar green"> SECOURISME   </h2>

                                {verif!==null?verif===true?
                                    <div style={{borderRadius: '50%', marginTop: '25px', marginBottom: '20px',backgroundImage:`url(${pathSecour+question?.tool?.name + ".png"})`,backgroundSize:'cover',width:'150px',height:'150px' }} className="flex itemcenter justcenter">
                                    </div>

                                    :
                                    <>
                                    </>
                                    :
                                    <div style={{borderRadius: '50%',marginTop: '25px', marginBottom: '20px',backgroundImage:`url(${pathSecour+question?.tool?.name + ".png"})`,backgroundSize:'cover',width:'150px',height:'150px' }} className="flex itemcenter justcenter">
                                    </div>

                                }
                                {verif !== null ? verif === true ?
                                    <span className={`br50 u-pad-s white fs18 flex itemcenter justcenter  ${verif!==null?verif===true ?'bggreen':'bggray':'bggreen'}`}  style={{height:50,width:50,marginTop:'-190px',marginBottom: '80px'}}> {question?.tool.question_number} </span>
                                    :
                                    <span className={`br50 u-pad-s white fs18 flex itemcenter justcenter  ${verif!==null?verif===true ?'bggreen':'bggray':'bggreen'}`}  style={{height:50,width:50}}> {question?.tool.question_number} </span>

                                    :
                                    <span className={`br50 u-pad-s white fs18 flex itemcenter justcenter  ${verif!==null?verif===true ?'bggreen':'bggray':'bggreen'}`}  style={{height:50,width:50,marginTop:'-190px',marginBottom: '80px'}}> {question?.tool.question_number} </span>

                                }



                                {loadingResp ?

                                    <Spin style={{marginTop: '20px'}} indicator={antIcon} />
                                    :verif === true?

                                        <>
                                    <span  className="green fs18 center" style={{marginTop: '60px'}}>


                                    BRAVO

                                    </span>


                                            <span className="fs16 center" > {resultquiz?.tool.possible_answers[0].description}  </span>


                                            <img className="rotateimg45" src={boueeremplie} />

                                        </>


                                        :verif == false ?

                                            <>
                                        <span  className=" fs18 center" style={{color:'red'}}>


                                        ET NON

                                        </span>


                                                <span className="fs16 center" >Tu pourras revenir a cette question dans 30 secondes pour retenter ta chance.</span>

                                                <img src={boueevide} />


                                            </>


                                            :

                                            <>
                                                <div style={{marginTop: '-100px',marginLeft: '280px'}}>

                                                    <img className="rotateimg45" src={boueevide} />

                                                </div>
                                                <span  className="green fs22 center" style={{marginTop: '45px'}} >


                                        {question?.tool.question} <br/> <span className="fs16">Coche les réponses dans le bon ordre.</span>

                                        </span>

                                                <div className="u-mar-top-m flex column">
                                                    {question?.tool.possible_answers.map( (answer) =>

                                                        <div key={"ans-"+answer.id} className="u-mar-bottom-s flex itemcenter  cursor opt" onClick={()=>makeResponse(question.id,answer.id)}>

                                                            <span style={{height:25,width:25,border:'2px solid #333',display:'block'}} className={"br50 u-mar-right-s pp flex itemcenter justcenter" + (answers.filter((i)=>i.id == answer.id ).length == 1 ? ' nopp' : ''  )}> <span className="av-heavy"> {position} </span> { answers.filter((i)=>i.id == answer.id ).length == 1 ? answers.filter((i)=>i.id == answer.id )[0].position : '' }    </span>
                                                            <span className="fs14" style={{width:'90%'}}>{answer.text}</span>

                                                        </div>
                                                    )
                                                    }

                                                </div>


                                            </>

                                }







                            </div>



                        </div>
                    </Modal>

                    <Modal closable={false} footer={null} visible={isModalLockedToolVisible}  onCancel={handleCancel2}>
                        <div     className="login-form card-auth hauto column  w100 bgwhite   flex u-pad-l rad8">
                            <div className="w100 flex column itemcenter justcenter flex">
                                <h2 className="nomar green"> SECOURISME  </h2>
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

dans <span style={{fontWeight: 'bold'}}>{session.session?.session_steps[2]?.step.name}</span></span>




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
                        <g data-name="Calque 13">
                            <image
                                width="2732"
                                height="2048"
                                xlinkHref="../../poste_secour-2.png"
                            ></image>
                        </g>
                        <g  data-name="bouées vides">
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 892.775 10639.356) scale(.15)"
                                href={goodAnswer("10")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 844.15 10202.76) scale(.15)"
                                href={goodAnswer("9")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 698.29 8893.104) scale(.15)"
                                href={goodAnswer("6")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 746.91 9329.656) scale(.15)"
                                href={goodAnswer("7")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 795.53 9766.208) scale(.15)"
                                href={goodAnswer("8")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 503.8 7146.806) scale(.15)"
                                href={goodAnswer("2")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 552.425 7583.403) scale(.15)"
                                href={goodAnswer("3")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 601.045 8019.955) scale(.15)"
                                href={goodAnswer("4")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 649.665 8456.507) scale(.15)"
                                href={goodAnswer("5")}
                            ></image>
                            <image
                                width="486"
                                height="1423"
                                transform="rotate(12.71 455.18 6710.254) scale(.15)"
                                href={goodAnswer("1")}
                            ></image>
                        </g>
                        <path
                            id="poster_maree" className="cursor" onClick={()=>displayQuestion('saignement_important')}  opacity="0"
                            d="M1878.865 614.032l-7.353-250.025h-227.964l3.676 257.379z"
                        ></path>
                        <path
                            id="pharmacie" className="cursor" onClick={()=>displayQuestion('piqure_vive')} opacity="0"
                            d="M1148.596 318.518l-9.652 563.037 418.256 3.218-9.652-511.56-141.564-35.39-45.043-28.957z"
                        ></path>
                        <path
                            id="bouteille_eau" className="cursor" onClick={()=>displayQuestion('noyade_victime_1')}  opacity="0"
                            d="M598.428 1126.074l-16.087-379.648-151.215 6.435 3.217 373.213z"
                        ></path>
                        <path
                            id="lit"  opacity="0" className="cursor" onClick={()=>displayQuestion('brulure_meduse')}
                            d="M1602.243 1930.413l-3.217-270.258-74-32.173-16.086-328.17 534.08-25.74 35.391 61.13 353.91 16.087-389.3 270.258-360.344 54.695-12.87 273.475z"
                        ></path>
                        <image
                            width="350.819"
                            height="410.953"
                            x="2265.748"
                            y="1540.299"
                            preserveAspectRatio="none"
                            href={"../../chrono.png"}
                             ></image>
                        <image
                            className="cursor" onClick={()=>router.push('/roadmap').then((r)=>{})}
                            width="264.567"
                            height="264.567"
                            x="2467.433"
                            y="0"
                            preserveAspectRatio="none"
                            href={"../../btn-close.png"}
                            ></image>
                        <image
                            className="cursor" onClick={()=>router.push('/secourisme/sec-3').then((r)=>{})}
                            width="200"
                            height="300"
                            x="2494.488"
                            y="865.512"
                            preserveAspectRatio="none"
                            href={"../../btn-next.png"}
                             ></image>
                        <image
                            className="cursor" onClick={()=>router.push('/secourisme').then((r)=>{})}
                            width="200"
                            height="300"
                            x="29.306"
                            y="865.512"
                            preserveAspectRatio="none"
                            href={"../../btn-prev.png"}
                            ></image>
                        <path
                            transform={"translate(-60 -45)"}
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
    else
        {
            return  <EmptyData/>
    }




}
