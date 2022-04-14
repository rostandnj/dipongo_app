import React,{useState,useEffect} from 'react';
import axios from "axios";
import {URL} from "../../urlapi";
import {Layout,Modal,Progress} from 'antd';
import chrono from '../../public/assets/chrono.png';
import Countdown from "react-countdown";
import boueevide from "../../public/assets/nouvelle-bouee-vide.png"
import boueeremplie from "../../public/assets/nouvelle-bouee-remplie.png"
import { Spin,message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import chronoRed from "../../public/assets/chrono-rouge.png";
import Draggable, {DraggableCore} from 'react-draggable'
import vistaplage from "../../public/assets/vistaplage3.png";
import etoile from "../../public/assets/etoile.png";
import {useAuth} from "../../store";
import {useRouter} from "next/router";
import EmptyData from "../../components/EmptyData";

const pathSecour = "../../secour/";
const areas = ['baigneurs','bouee','drapeau-droit',
    'drapeau-gauche','helicoptere','jetski','jumelles',
    'palmes','radio','voiture'];
import suivant from "./../../public/assets/suivant.jpg"

const antIcon = <LoadingOutlined style={{ fontSize: 40,color:'#1d893c',marginTop:30 }} spin />;
export default function  Home () {

    const { session, updateSession, deleteSession } = useAuth();
    const router = useRouter()
    const allImage = [
        {name: 'groupe_de_baigneurs', file:'baigneurs.png', key: "1"},
        {name: 'bouee_tube',file: 'bouee_tube.png', key: "2"},
        {name: 'drapeau_1',file: 'drapeau_gauche.png', key: "3"},
        {name: 'drapeau_2',file: 'drapeau_droite.png', key: "4"},
        {name: 'helicoptere',file: 'helicoptere.png', key: "5"},
        {name: 'jetski',file: 'jetski.png', key: "6"},
        {name: 'jumelles',file: 'jumelles.png', key: "7"},
        {name: 'palmes',file: 'palmes.png', key: "8"},
        {name: 'radio',file: 'radio.png', key: "9"},
        {name: 'voiture_4_4',file: 'voiture.png', key: "10"}];
    const arrOpacity = {
        'groupe_de_baigneurs':0.42,
        'bouee_tube':0.42,
        'drapeau_1':0.42,
        'drapeau_2':0.42,
        'helicoptere':0.42,
        'jetski':0.42,
        'jumelles':0.42,
        'palmes':0.42,
        'radio':0.42,
        'voiture_4_4':0.42,
    };
    const [arrayImage, setArrayImage] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [question, setQuestion] = useState(null);
    const [position, setPosition] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [dateNow, setDateNow] = useState(Date.parse(Date())/1000);
    const [loading,setLoading] = useState(true)
    const [loadingResp,setLoadingResp] = useState(false)
    const [verif,setVerif] = useState(null)
    const [localSession,setLocalSession] = useState(null)
    const [isModalLockedToolVisible,setIsModalLockedToolVisible] = useState(false)
    const [slide1,setSlide1] = useState("")
    const [slide2,setSlide2] = useState("")
    const [slide3,setSlide3] = useState("")
    const [slide4,setSlide4] = useState("")
    const [onmove,setOnmove] = useState(false)
    const [carAxis,setCarAxis] = useState('both')
    const [isModalChrono, setIsModalChrono] = useState(false);
    const [isModalEndStep, setIsModalEndStep] = useState(false);
    const [closeOnEndStep, setCloseOnEndStep] = useState(false);
    const [mousePosition, setMousePosition] = useState({x:0,y:0});
    const [index, setIndex] = useState(null);
    const [positionSlide, setPositionSlide] = useState([{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}]);
    const [isMounted,setIsMounted] = useState(false)
    const [opacity,setOpacity] = useState(arrOpacity)
    const [showModalText,setShowModalText] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])


    const isDisplayable = (tag) =>{
        let test = false
        areas.forEach((el) => {
            if(el === tag){
                test = true
            }
        })
        return test
    }
    const handleCancel = () => {
        setShowModalText(false);
        setIsModalVisible(false);
        setIsModalChrono(false)
        setIsModalEndStep(false)
        if(localSession !== null){
                let test = localSession.session_steps[3].question_true === 10 && localSession.question_done === 50
                if(test === true){
                    setIsModalEndStep(false)
                    updateSession({running_session: localSession})
                    router.push('/win').then((r)=>{})
                }
                else{

                    updateSession({running_session: localSession})
                    setIsModalEndStep(false)
                   // updateSession({running_session: localSession})

                }
            }

    }
    const handleCancelChrono = () => {
        setIsModalVisible(false);
        setIsModalChrono(false)
        setIsModalEndStep(false)
        setCloseOnEndStep(false)
    };

    const handleCancel2 = () => {
        setIsModalLockedToolVisible(false);
    };

    useEffect(() => {

        if (typeof window !== "undefined"){
            document.body.style.background =  '#eaac3d';
            setLoading(true)
            const token = localStorage.getItem("token")
            let smt = localStorage.getItem("rep1")===null;
            setShowModalText(smt);
            if(smt){
                localStorage.setItem("rep1","1");
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
                let tab = [];
                result.data.data.running_session.session_steps[3].session_step_backgrounds[0].tool_session_answers.forEach((el)=>{
                    if(el.is_true !== true){
                        allImage.forEach((im) => {
                            if(im.name === el.tool.name){
                                tab.push({name:el.tool.name,file: im.file})
                            }
                        })

                    }

                })


                if(tab.length>=4){
                    setSlide1(tab[0].file)
                    setSlide2(tab[1].file)
                    setSlide3(tab[2].file)
                    setSlide4(tab[3].file)
                }
                else{
                    if(tab.length === 3){
                        setSlide1(tab[0].file)
                        setSlide2(tab[1].file)
                        setSlide3(tab[2].file)
                        setSlide4("")
                    }

                    if(tab.length === 2){
                        setSlide1(tab[0].file)
                        setSlide2(tab[1].file)
                        setSlide3("")
                        setSlide4("")
                    }

                    if(tab.length === 1){
                        setSlide1(tab[0].file)
                        setSlide2("")
                        setSlide3("")
                        setSlide4("")
                    }
                    if(tab.length === 0){
                        setSlide1("")
                        setSlide2("")
                        setSlide3("")
                        setSlide4("")
                    }
                }

                setArrayImage(tab)

            }).catch((error)=>{
                console.log(error)
            });
        }

    }, []);

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

    const displayQuestion = (e,data,index) => {



        if(session.session !== undefined && session.session !== null){

            let tabItem = arrayImage[index]
            let tag = undefined;
            if(tabItem !== undefined){
                tag =  tabItem.name;
                if(tag !== undefined){
                    let question = session.session.session_steps[3]
                        .session_step_backgrounds[0]
                        .tool_session_answers
                        .filter((question) => question.tool.name == tag )[0]


                    if(question !== undefined){
                        setQuestion(question)
                        if(question.is_true !== true){

                            if(question.next_time > (Date.parse(Date())/1000)){

                            }
                            else{
                                setOnmove(true)
                                //setIsModalVisible(true)
                                setIndex(index)
                            }

                        }else{
                            setOnmove(true)
                            setIndex(index)
                        }

                        /**/

                    }
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

        //return "../../bouee-vide.png"


    }

    const zoneIsVisible = (tag) => {


        if(session.session !== undefined && session.session !== null){
            let question = session.session.session_steps[3]
                .session_step_backgrounds[0]
                .tool_session_answers
                .filter((question) => question.tool.name == tag )[0]

            if(question !== undefined){
                if(question.is_true !== true){
                    return "0";
                }
                else{
                    return  "1";
                }
            }
            else{
                return "0";
            }


        }
        else{
            return "0";
        }

    }

    const zoneIsVisibleOnHover = (tag) => {

        if(session.session !== undefined && session.session !== null){
            let question = session.session.session_steps[3]
                .session_step_backgrounds[0]
                .tool_session_answers
                .filter((question) => question.tool.name == tag )[0]

            if(question !== undefined){
                if(question.is_true !== true){
                    return true;
                }
                else{
                    return  false;
                }
            }
            return false;

        }
        return false;

    }

    const slideUp =() => {

        if(arrayImage.length>=4){
            arrayImage.push(arrayImage.shift());
            setSlide1(arrayImage[0].file)
            setSlide2(arrayImage[1].file)
            setSlide3(arrayImage[2].file)
            setSlide4(arrayImage[3].file)
            setIndex(null);
            setOpacity(arrOpacity);
            setQuestion(null);
        }

    }
    const slideDown =() => {


        if(arrayImage.length>=4){
            arrayImage.unshift(arrayImage.pop());
            setSlide1(arrayImage[0].file)
            setSlide2(arrayImage[1].file)
            setSlide3(arrayImage[2].file)
            setSlide4(arrayImage[3].file)
            setIndex(null);
            setOpacity(arrOpacity);
            setQuestion(null);
        }


    }
    const onMouseMove = (e) =>{
        if (typeof window !== "undefined"){
           /* if(onmove && index!== null){
                console.log({x:e.pageX,y:e.pageY})
                //console.log(document.getElementById('prefix__rect4014').getBoundingClientRect())
                console.log(document.getElementById('prefix__rect1514').getBoundingClientRect())
                console.log(document.getElementById('box1').getBoundingClientRect())


                setMousePosition({x:e.pageX,y:e.pageY})
                let pos  = positionSlide;
                pos[index]={
                    x: e.pageX/10  ,
                    y: e.pageY - (document.getElementById('prefix__rect1514').getBoundingClientRect().y + (document.getElementById('prefix__rect1514').getBoundingClientRect().height*0.5))}
                setPositionSlide(pos)


            }*/

        }
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

                setLoadingResp(false)
                setVerif(result.data.data.answer.is_true)
                setLoadingResp(false)
                setIndex(null);
                setOpacity(arrOpacity);
                setQuestion(null);

                if(result.data.data.running_session !== undefined){
                    let test = session.session.session_steps[3].question_true === 9 && result.data.data.running_session.session_steps[3].question_true === 10
                    if(test === false){
                        updateSession(result.data.data)
                    }
                    else{


                        if(result.data.data.running_session.question_done === 50){
                            setLocalSession(result.data.data.running_session)
                            if(!closeOnEndStep){
                                setIsModalEndStep(true);
                                setCloseOnEndStep(!closeOnEndStep)
                            }

                            /*if(session.session.question_done === 49){
                                updateSession({running_session: localSession})
                                if(!closeOnEndStep){
                                    setIsModalEndStep(true);
                                    setCloseOnEndStep(!closeOnEndStep)
                                }
                            }
                            else{

                                router.push('/win').then((r)=>{})
                            }*/
                        }
                        else{
                            setLocalSession(result.data.data.running_session)
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

                    let tab = [];
                    result.data.data.running_session.session_steps[3].session_step_backgrounds[0].tool_session_answers.forEach((el)=>{
                        if(el.is_true !== true){
                            allImage.forEach((im) => {
                                if(im.name === el.tool.name){
                                    tab.push({name:el.tool.name,file: im.file})
                                }
                            })

                        }

                    })


                    if(tab.length>=4){
                        setSlide1(tab[0].file)
                        setSlide2(tab[1].file)
                        setSlide3(tab[2].file)
                        setSlide4(tab[3].file)
                    }
                    else{
                        if(tab.length === 3){
                            setSlide1(tab[0].file)
                            setSlide2(tab[1].file)
                            setSlide3(tab[2].file)
                            setSlide4("")
                        }

                        if(tab.length === 2){
                            setSlide1(tab[0].file)
                            setSlide2(tab[1].file)
                            setSlide3("")
                            setSlide4("")
                        }

                        if(tab.length === 1){
                            setSlide1(tab[0].file)
                            setSlide2("")
                            setSlide3("")
                            setSlide4("")
                        }
                        if(tab.length === 0){
                            setSlide1("")
                            setSlide2("")
                            setSlide3("")
                            setSlide4("")
                        }
                    }

                    setArrayImage(tab)
                }

            }).
            catch(function (error) {
                setLoadingResp(false)
                setIndex(null);
                setOpacity(arrOpacity);
                setQuestion(null);
                console.log(error)
                if (error.response) {

                    //setLoading(false)
                    message.warning(error.response.data.message)
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
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
                                console.log('question_already_done')
                                if(session.session.question_done === 50){
                                    router.push('/win').then((r)=>{})
                                }
                                else{
                                   /* if (typeof window !== "undefined"){
                                        window.location.reload()
                                    }*/
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
    const stopDrag = (e,data) => {
        setTimeout(()=>{
            if(!loadingResp){
                setOnmove(false);
                setCarAxis('both')
                setPositionSlide([{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}])
            }
        },0);



        //console.log(question);
        // console.log(e);
        //console.log(data);
    }

    const updatePosition = (e, ui, index) => {
        let pos  = [{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0},{x: 0, y: 0}];
        pos[index]={x: positionSlide[index].x + ui.deltaX, y: positionSlide[index].y + ui.deltaY }
        setPositionSlide(pos)
    };
    const ToolOverUp = (e,tag) => {
        if(question !== null){
            setLoadingResp(true)
            makeResponse(question.id,tag)

        }
    }

    const overArea = (tag) => {
        if(index !== null){
            let tab = arrOpacity;
            tab[tag]=0.9;
            setOpacity(tab);
        }

    }

    const outArea = (tag) => {
        if(index !== null){
            setOpacity(arrOpacity);
        }

    }



    if(session && session.session){
        return (
            <>
                <div style={{width:'100vw',height: '100vh' ,background: 'rgb(234 172 62)'}} >

                    <Modal closable={false} footer={null} visible={showModalText}  onCancel={()=>setShowModalText(false)} >
                        <div     className="  flex itemcenter justcenter column" style={{marginTop:'30vh'}}
                        >


                            <h3 className="onboarding-text" style={{color: 'white',fontWeight: 'bold',textAlign:'center'}}>Positionne chaque élément<br/>
                                à sa place sur l'image.</h3>

                            <div  className="w100 flex itemcenter justcenter cursor" onClick={handleCancel}>
                                <img src={suivant} className="w25"  />

                            </div>




                        </div>
                    </Modal>

                    <Modal closable={false} footer={null} visible={isModalChrono}  onCancel={handleCancelChrono} >
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

dans <span style={{fontWeight: 'bold'}}>{session.session?.session_steps[3]?.step.name}</span></span>




                            </div>


                            <img src={etoile} className="starwin"  />

                        </div>



                    </Modal>


                    <svg
                        onMouseMove={(e)=>onMouseMove(e)}


                        width="100%"
                        height="100%"

                        viewBox="0 0 337.61 270.93"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <defs id="prefix__defs2722">
                            <style id="style2786">
                                {
                                    ".prefix__cls-2{fill:#dcefec}.prefix__cls-3{fill:#a7d6d3}.prefix__cls-4{fill:#6db3b1}.prefix__cls-5{fill:#fff}.prefix__cls-8{fill:#eaac3d}.prefix__cls-110,.prefix__cls-111,.prefix__cls-113,.prefix__cls-14,.prefix__cls-15,.prefix__cls-25,.prefix__cls-42,.prefix__cls-43,.prefix__cls-49,.prefix__cls-9{fill:none}.prefix__cls-9{stroke:#eaac3d;stroke-width:6.08px}.prefix__cls-110,.prefix__cls-111,.prefix__cls-113,.prefix__cls-133,.prefix__cls-15,.prefix__cls-25,.prefix__cls-42,.prefix__cls-43,.prefix__cls-49,.prefix__cls-9{stroke-miterlimit:10}.prefix__cls-10,.prefix__cls-11{fill:#c08354}.prefix__cls-11,.prefix__cls-116,.prefix__cls-24,.prefix__cls-95{mix-blend-mode:multiply}.prefix__cls-12{fill:#444}.prefix__cls-13{fill:#707070}.prefix__cls-14{stroke:#707070;stroke-width:4.55px}.prefix__cls-14,.prefix__cls-25,.prefix__cls-42{stroke-linecap:round}.prefix__cls-14{stroke-linejoin:round}.prefix__cls-15{stroke:#fff;stroke-width:4.56px}.prefix__cls-17{fill:#771a10}.prefix__cls-18{fill:#c13e29}.prefix__cls-19{fill:#5580d7}.prefix__cls-22{fill:#b56938}.prefix__cls-23,.prefix__cls-24{fill:#4f63ac}.prefix__cls-25{stroke:#1c1c1c;stroke-width:4.81px}.prefix__cls-26{fill:#1c1c1c}.prefix__cls-27{fill:#262626}.prefix__cls-28{fill:#3c3c3b}.prefix__cls-29{fill:#1e1e1e}.prefix__cls-30{fill:#ffda3e}.prefix__cls-31{fill:#efc825}.prefix__cls-33{fill:#424242}.prefix__cls-34{fill:#2b2b2b;opacity:.24}.prefix__cls-35{fill:#161616}.prefix__cls-36{fill:#727272}.prefix__cls-37{fill:#f4ebdd}.prefix__cls-38{fill:#7c7c7c}.prefix__cls-39{fill:#2d2d2d}.prefix__cls-41{fill:#7f7f7f}.prefix__cls-42{stroke:#ffec9c;stroke-width:3.84px}.prefix__cls-43{stroke:#4c4c4c;stroke-width:3.2px;opacity:.26}.prefix__cls-45{fill:#595959}.prefix__cls-46{fill:#971506}.prefix__cls-49{stroke-width:2.32px;stroke:#292527}.prefix__cls-58{fill:#353535}.prefix__cls-64{fill:#eaac2c}.prefix__cls-65{fill:#fdd835}.prefix__cls-68{fill:#c23d20}.prefix__cls-71{fill:#68625e}.prefix__cls-72{fill:#514c48}.prefix__cls-73{fill:#ddd5ce}.prefix__cls-75{fill:#f4d47d}.prefix__cls-76{fill:#eab853}.prefix__cls-77{fill:#3a3532}.prefix__cls-78{fill:#726b68}.prefix__cls-79{fill:#ce9130}.prefix__cls-83{fill:#f4e3bd}.prefix__cls-84{fill:#efc76c}.prefix__cls-91{fill:#bfb8b4}.prefix__cls-96{fill:#e7d2bb}.prefix__cls-95{fill:#f3cb6f}.prefix__cls-101{fill:#577cbc}.prefix__cls-103{fill:#666}.prefix__cls-104{fill:#ffd800}.prefix__cls-105{fill:#ffe97d}.prefix__cls-106{fill:#060606}.prefix__cls-107{fill:#232323}.prefix__cls-109{fill:#717171}.prefix__cls-110,.prefix__cls-111{stroke:#444}.prefix__cls-110{stroke-width:1.66px}.prefix__cls-111{stroke-width:2.07px}.prefix__cls-112,.prefix__cls-116{fill:#b2b2b2}.prefix__cls-113{stroke:#3c3c3b;stroke-width:.45px}.prefix__cls-114{fill:#ebd483}.prefix__cls-115,.prefix__cls-126{fill:#dad4ce}.prefix__cls-118{fill:#4a58ab}.prefix__cls-119{fill:#343d77}.prefix__cls-120{fill:#908c86}.prefix__cls-121,.prefix__cls-130{fill:#f6f6f6}.prefix__cls-121{opacity:.7}.prefix__cls-122{fill:#706f6f}.prefix__cls-123{fill:#1d1d1b}.prefix__cls-125{fill:#504d4a}.prefix__cls-126,.prefix__cls-127{opacity:.5}.prefix__cls-129{fill:#a7402d}.prefix__cls-133{fill:#cb8e53;stroke:#925f36;stroke-width:1.42px}"
                                }
                            </style>
                        </defs>
                        <g id="prefix__layer1" transform="translate(46.424 -30.666)">
                            <g
                                id="prefix__g4065"
                                transform="translate(-46.424 30.666) scale(.26458)"
                                style={{
                                    isolation: "isolate",
                                }}
                            >
                                <g id="prefix__fond">
                                    <path
                                        id="prefix__path2790"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M186 496.07c-.58 1.44 3.09 2.24 4.63 1 18.64-14.82 48.52-28.18 89.49-30.75 40.43-2.53 53.57-8.21 68-16.11 1.91-1.05-.39-2.7-2.92-2.11-16 3.73-32.63 10.95-69.86 12.35C236 462 195.27 473.38 186 496.07z"
                                    />
                                    <path
                                        id="prefix__path2792"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M111.75 588.45c-21.59-2.45-.66 22.07 33.63 4.66 8.87-4.5 13.23-13.76 2-15.15-9.59-1.19-20.79 12.17-35.63 10.49z"
                                    />
                                    <path
                                        id="prefix__path2794"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M169.91 579.27c-6.64 3.05.09 6.77 5.58 3.55 4.65-2.73 1.51-6.82-5.58-3.55z"
                                    />
                                    <path
                                        id="prefix__path2796"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M362.24 462.58c8.91-5.22 28.91-12.51 42.88-12.62.68 0 1 .4.47.6-9 3.38-29.32 8-42.33 12.49-.69.24-1.55-.16-1.02-.47z"
                                    />
                                    <path
                                        id="prefix__path2798"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M100.92 621.3c15.07-.4 33.11-2.07 45.12-7.08 1.73-.72 3.82.51 3 1.74-4.87 7-27.23 14-48.85 7.95-2.05-.56-1.47-2.55.73-2.61z"
                                    />
                                    <path
                                        id="prefix__path2800"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M145.55 411.57c-2.3.35-1.79 2.1.6 2.08 22.5-.25 47-3.53 69.14-16.82 14.3-8.58 25.18-14.09 35.39-16.57 2-.49 1.27-2.07-1-2-20.85.47-42.93 11.09-57.92 20.38-9.89 6.15-28.2 10.18-46.21 12.93z"
                                    />
                                    <path
                                        id="prefix__path2802"
                                        className="prefix__cls-4"
                                        transform="translate(-.65 -.12)"
                                        d="M270.86 407.25c16.43-10.64 50.5-17.76 78-16.49 2.88.13 3.3 2.22.51 2.64-22.18 3.3-55.41 7.24-76.79 14.79-1.2.42-2.58-.36-1.72-.94z"
                                    />
                                    <path
                                        id="prefix__path2804"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M320.7 51.69c2.61-3.75 9.87-8.71 15.37-4.06a1.64 1.64 0 002.58-.6c3.24-7.91 14.24-10.61 22.37-2.14a1.65 1.65 0 002.24.11c1.57-1.33 4.07-.52 5.13 1.27a1.66 1.66 0 002.14.68c3.91-1.85 10.63-.25 13.54 3.43a1.61 1.61 0 01-.85 2.54c-15 4.17-44.83 5.32-61.57 1.29a1.63 1.63 0 01-.95-2.52z"
                                    />
                                    <path
                                        id="prefix__polyline2806"
                                        className="prefix__cls-3"
                                        transform="matrix(.93773 0 0 1.0409 15.867 -4.933)"
                                        display="inline"
                                        d="M594.17 401.84l-339.34 5.61 1.9-286.84H1344.9v268.8l-750.73 12.43"
                                    />
                                    <path
                                        id="prefix__rect2808"
                                        fill="#9cd7f4"
                                        d="M250.63 0h1026.6v184.69H250.63z"
                                    />
                                    <rect
                                        id="prefix__rect2810"
                                        x={276.4}
                                        y={422.164}
                                        width={1001.601}
                                        height={639.236}
                                        ry={0}
                                        strokeWidth={0.979}
                                        fill="#f4cb6e"
                                    />
                                    <path
                                        id="prefix__path2812"
                                        className="prefix__cls-8"
                                        d="M60.937 601.98c32.538 4.441 125.92-7.299 159.342-34.947 33.423-27.649 75.176-13.357 107.48-26.415 32.303-13.059 82.207-25.522 134.223-21.804 52.016 3.717 128.167 1.063 183.676-29.078 55.508-30.141 121.496-4.203 175.778-26.16 54.281-21.957 75.057 16.286 184.594-12.469 10.026-2.63 53.326-14.893 100.766-16.626 47.44-1.733 141.676-8.938 168.263-9.455 4.93-.862 2.921-2.862 1.387-27.437L57.11 401.924z"
                                        strokeWidth={0.876}
                                    />
                                    <path
                                        id="prefix__path2814"
                                        className="prefix__cls-2"
                                        d="M64.018 582.86c31.184 4.625 114.165 1.763 153.705-31.569 31.298-26.372 72.457-11.909 103.732-24.03 31.275-12.123 73.448-25.688 134.931-22.183 50.333 2.873 128.564.667 182.387-27.513 53.824-28.18 119.816-4.399 172.39-24.772 52.574-20.374 136.222-1.781 203.705-16.492 67.479-14.711 198.172-21.53 261.578-38.712.433.382 1.293-9.839.699-13.817-174.03-2.224-326.393-.072-468.685 1.258-243.011 2.287-534.016 5.376-744.608 6.427z"
                                        display="inline"
                                        strokeWidth={0.862}
                                    />
                                    <path
                                        id="prefix__path2816"
                                        className="prefix__cls-3"
                                        d="M226.07 539.143c27.046-13.23 58.719-9.871 83.392-13.79 30.196-4.803 35.883-24.19 74.75-32.24 79.795-16.538 113.228 5.648 197.467-16.05 84.238-21.697 47.062-27.67 131.115-48.584 32.267-8.03 71.182 1.588 113.054-11.032C974.336 372.668 966.5 421 1049.64 398.518c62.024-16.782 97.272-19.695 152.937-25.428 64.232-6.616 41.419-.22 72.387-11.998L61.56 358.319l6.688 235.088s31.372 1.302 62.841-5.791c48.142-10.869 55.686-29.188 94.942-48.473z"
                                        display="inline"
                                        strokeWidth={0.995}
                                    />
                                    <path
                                        id="prefix__path2818"
                                        className="prefix__cls-4"
                                        transform="translate(-.65 -.12)"
                                        d="M64.44 317.78l1.37 108.62c60.52 13.21 122.76 4.71 165.05-16.15 90.78-44.77 192.56-18.35 257.21-41.1 64.65-22.75 63.27-49.17 159.55-55l-583.18 3.63"
                                    />
                                    <path
                                        id="prefix__path2820"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M497.13 413.17c-1.56-.08-2.11 1.05-.66 1.36 21.54 4.56 56 4.92 74.88.05 19.08-4.93 42-17.81 60.94-19.71 1.46-.15 1.46-1.25 0-1.39-15.1-1.46-39.5 6.57-62.1 15.06-17.7 6.64-49.48 5.82-73.06 4.63z"
                                    />
                                    <path
                                        id="prefix__path2822"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M679.45 431.9c9.06-6.34 33.4-14.42 49.9-16.44 1.14-.14 1.1-1 0-1.09-20.13-2.23-46.09 6-51.8 17.06-.35.57 1.18.98 1.9.47z"
                                    />
                                    <path
                                        id="prefix__path2824"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M866.83 387.61c-1.35.56 0 1.65 1.55 1.23 23.6-6.49 59.27-9.63 87.54-8.48 31.91 1.3 65.24-6.16 82.93-14.42 1.19-.56 0-1.55-1.5-1.23-15.71 3.44-45.16 10.32-78.22 9.69-32.57-.62-65.89 2.3-92.3 13.21z"
                                    />
                                    <path
                                        id="prefix__path2826"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M622.58 406.63c-14.84 4.43-13.13 8.85 5.13 4.13 11.67-3.01 6.82-7.69-5.13-4.13z"
                                    />
                                    <path
                                        id="prefix__path2828"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M818.83 409.43c-21.37 2.49-17.89 10.8 5.51 6.77 8.27-1.43 10.74-8.67-5.51-6.77z"
                                    />
                                    <path
                                        id="prefix__path2830"
                                        className="prefix__cls-2"
                                        transform="translate(-.65 -.12)"
                                        d="M846.26 403.13c-9.66 1.78-5.5 7.14 5.27 4.71 3.8-.84 3.1-6.25-5.27-4.71z"
                                    />
                                    <path
                                        id="prefix__path2832"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M362.24 462.58c8.91-5.22 28.91-12.51 42.88-12.62.68 0 1 .4.47.6-9 3.38-29.32 8-42.33 12.49-.69.24-1.55-.16-1.02-.47z"
                                    />
                                    <path
                                        id="prefix__path2834"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M609.63 431.09c12.24-1.71 31.77-5.33 44.88-11.14 1.21-.54 3 .13 2.41.9C653 426 635 433.24 610 432.69c-1.82-.04-2.11-1.36-.37-1.6z"
                                    />
                                    <path
                                        id="prefix__path2836"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M715.67 437.23c10.16-4.73 25.57-10 51.78-9.87 1.13 0 1.28.86.16 1a262.35 262.35 0 00-50.53 9.93c-1.28.33-2.5-.55-1.41-1.06z"
                                    />
                                    <path
                                        id="prefix__path2838"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M899.55 413.06c17.19-5.25 47.05-10.73 73-4.12 2.05.52 1.16 2.12-1.11 2-18.88-1.13-38.2-2.55-70.81 3.31-1.45.23-2.38-.8-1.08-1.19z"
                                    />
                                    <path
                                        id="prefix__path2840"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M413.58 449.92a44.85 44.85 0 0119-3.73c1.62.05 2.11 1.19.67 1.57-5.35 1.44-12 2.55-18.08 3.58-1.69.28-2.92-.83-1.59-1.42z"
                                    />
                                    <path
                                        id="prefix__path2842"
                                        className="prefix__cls-4"
                                        transform="translate(-.65 -.12)"
                                        d="M655.85 327.16s-58.93 11.09-83.35 17c-2.22.54-4.21-.91-2.51-1.83 14.18-7.66 34.57-12.31 56-14.84 25.5-3 29.88-.38 29.88-.38"
                                    />
                                    <path
                                        id="prefix__path2844"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M423.9 355.29a34.62 34.62 0 00-16 7.62c-.43.33.29 1.1.81.85 11.42-5.44 19-4.71 29.73-6.7 1.35-.25.92-1.83-.58-2.1a44.72 44.72 0 00-13.96.33z"
                                    />
                                    <path
                                        id="prefix__path2846"
                                        className="prefix__cls-4"
                                        d="M585.338 320.03s47.078-19.65 161.853 10.35c85.128 22.25 150.643-34.49 228.564-20.94 77.92 13.55 130.158-14.9 159.33-22.72 43.124-11.55 140.116-7.91 142.26-12.47v-96.37H252.697l-7.777 188.69"
                                        display="inline"
                                        strokeWidth={0.974}
                                    />
                                    <path
                                        id="prefix__path2848"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M446.12 53.43c2.74-1.73 6.71-2.77 9.88-1a1.58 1.58 0 002.14-.46c2.95-4.82 11.82-5.93 15.88-1.1a1.62 1.62 0 001.92.43A13.62 13.62 0 01489.8 54a1.63 1.63 0 01-.68 2.79c-9.4 2.34-33.23 2.67-42.64-.42a1.64 1.64 0 01-.36-2.94z"
                                    />
                                    <path
                                        id="prefix__path2850"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M382.52 82.73c2.74-1.73 6.71-2.77 9.89-1a1.56 1.56 0 002.13-.46c3-4.81 11.82-5.92 15.88-1.1a1.6 1.6 0 001.92.43 13.62 13.62 0 0113.86 2.7 1.64 1.64 0 01-.68 2.8c-9.4 2.33-33.23 2.67-42.63-.42a1.64 1.64 0 01-.37-2.95z"
                                    />
                                    <path
                                        id="prefix__path2852"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M320.7 51.69c2.61-3.75 9.87-8.71 15.37-4.06a1.64 1.64 0 002.58-.6c3.24-7.91 14.24-10.61 22.37-2.14a1.65 1.65 0 002.24.11c1.57-1.33 4.07-.52 5.13 1.27a1.66 1.66 0 002.14.68c3.91-1.85 10.63-.25 13.54 3.43a1.61 1.61 0 01-.85 2.54c-15 4.17-44.83 5.32-61.57 1.29a1.63 1.63 0 01-.95-2.52z"
                                    />
                                    <path
                                        id="prefix__path2854"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M1148.5 28c2.74-1.73 6.71-2.77 9.88-1a1.57 1.57 0 002.14-.45c3-4.82 11.82-5.93 15.88-1.11a1.6 1.6 0 001.92.44 13.6 13.6 0 0113.86 2.66 1.63 1.63 0 01-.69 2.79c-9.39 2.34-33.23 2.67-42.63-.42a1.64 1.64 0 01-.36-2.91z"
                                    />
                                    <path
                                        id="prefix__path2856"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M863.35 38.75c2.74-1.73 6.7-2.77 9.88-1a1.57 1.57 0 002.14-.46c3-4.81 11.82-5.92 15.88-1.1a1.59 1.59 0 001.91.43 13.64 13.64 0 0113.84 2.7 1.64 1.64 0 01-.69 2.8c-9.39 2.33-33.23 2.67-42.63-.42a1.64 1.64 0 01-.33-2.95z"
                                    />
                                    <path
                                        id="prefix__path2858"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M755.06 72c2.61-3.76 9.86-8.71 15.37-4.07a1.65 1.65 0 002.58-.59c3.23-7.92 14.24-10.62 22.37-2.15a1.62 1.62 0 002.23.11c1.58-1.33 4.08-.52 5.14 1.28a1.66 1.66 0 002.14.67c3.9-1.85 10.63-.25 13.54 3.43a1.61 1.61 0 01-.85 2.54c-15 4.18-44.84 5.33-61.57 1.29a1.62 1.62 0 01-.95-2.51z"
                                    />
                                    <path
                                        id="prefix__path2860"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M1172.5 78.49c3.44-2.17 8.43-3.48 12.42-1.2a2 2 0 002.69-.57c3.71-6.06 14.86-7.45 20-1.39a2 2 0 002.42.55c3.16-1.5 11.3-2.25 17.43 3.34a2.05 2.05 0 01-.86 3.51c-11.82 2.94-41.79 3.36-53.61-.52a2.06 2.06 0 01-.49-3.72z"
                                    />
                                    <path
                                        id="prefix__path2864"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M1041.1 294.84c-2.34 0-2.28 2.29.07 2.73 22.13 4.09 47 4.78 72-7.53 16.17-8 28.21-12.72 38.85-13.82 2.1-.22 1.76-2.34-.43-2.72-20.56-3.5-44.87 5.49-61.89 14.19-11.29 5.78-30.25 7.24-48.6 7.15z"
                                    />
                                    <path
                                        id="prefix__path2866"
                                        className="prefix__cls-3"
                                        transform="translate(-.65 -.12)"
                                        d="M439.75 363.45c-2.66.45-1.84 2.48.95 2.36 21.78-1 50.41-6.86 69.58-21.23 14-10.52 20.07-14.75 28.19-17.62 2.19-.77.56-2.54-2-2.15-14.54 2.19-29.34 9.77-43.69 20.15-14.95 10.82-32.35 15.04-53.03 18.49z"
                                    />
                                    <g
                                        id="prefix__chaise_mns_plac\xE9s"
                                        data-name="chaise + mns plac\xE9s"
                                    >
                                        <path
                                            id="prefix__polyline2868"
                                            className="prefix__cls-8"
                                            d="M1084.7 723.44L793.23 847.3l-69.53-20.93 258.59-179.73 106.51 56.58"
                                        />
                                        <path
                                            id="prefix__line2870"
                                            className="prefix__cls-9"
                                            d="M849.12 688.11l134.1-42.99"
                                        />
                                        <path
                                            id="prefix__line2872"
                                            className="prefix__cls-9"
                                            d="M880.24 690.09l64.56-19.93"
                                        />
                                        <path
                                            id="prefix__line2874"
                                            className="prefix__cls-9"
                                            d="M859.15 712.34l59.81-22.54"
                                        />
                                        <path
                                            id="prefix__line2876"
                                            className="prefix__cls-9"
                                            d="M838.82 735.83l59.81-22.54"
                                        />
                                        <path
                                            id="prefix__line2878"
                                            className="prefix__cls-9"
                                            d="M899.19 669.17L773.15 808.11"
                                        />
                                        <path
                                            id="prefix__line2880"
                                            className="prefix__cls-9"
                                            d="M964.53 646.78L838.49 785.71"
                                        />
                                        <path
                                            id="prefix__polygon2882"
                                            className="prefix__cls-8"
                                            d="M1073.2 730.97l31.7-15.56-16.4-14.47-32.9 22.47z"
                                        />
                                        <path
                                            id="prefix__line2884"
                                            className="prefix__cls-9"
                                            d="M729.45 826.13l264.62-187.44"
                                        />
                                        <path
                                            id="prefix__line2886"
                                            className="prefix__cls-9"
                                            d="M727.18 827.55l121.94-139.44"
                                        />
                                        <path
                                            id="prefix__line2888"
                                            className="prefix__cls-9"
                                            d="M792.39 845.16l318.31-129.75"
                                        />
                                        <path
                                            id="prefix__path2890"
                                            className="prefix__cls-10"
                                            transform="translate(-.65 -.12)"
                                            d="M1010.2 399.51c-.65 6.68.35 22 .35 22l33.83-17.44c2.46-6.05 5.43-21.45 4.09-26.24-3.32-4.42-14.74-8.7-14.74-8.7l-.14.05.82-8.42-11.81-1.15-.87 8.9h-.06a44.08 44.08 0 00-11.83 8.28 60.35 60.35 0 00.36 22.72z"
                                        />
                                        <path
                                            id="prefix__path2892"
                                            className="prefix__cls-11"
                                            transform="translate(-.65 -.12)"
                                            d="M1044.4 404.07l-9.1 1.49s-10.72-12.25-8.36-36.55l-4.32-9.4 11.81 1.15-.82 8.42.14-.05s11.42 4.28 14.74 8.7c1.34 4.79-1.63 20.19-4.09 26.24"
                                        />
                                        <path
                                            id="prefix__path2894"
                                            transform="translate(-.65 -.12)"
                                            d="M1017.7 354.79a1 1 0 01.56.82 17.53 17.53 0 005.13 10.77 1 1 0 001.51-.05l1.16-1.29a1 1 0 011.76.34 1 1 0 001.79.29 1 1 0 011.79.26c.48 1.24 1.58 1.18 1.58.94a13.68 13.68 0 011-2.35c.32-.6.63-1.25.91-1.93a26.19 26.19 0 002-8.31 1.05 1.05 0 011-1 2.22 2.22 0 002.19-1.73 1.92 1.92 0 00-.91-1.58 1 1 0 01-.35-1.31 3.23 3.23 0 00-.13-3.41 3.28 3.28 0 00-3.77-.87 1 1 0 01-1.37-.81c-.39-2.06-1.85-3.51-3.22-3.64-1.37-.13-3.19 1.1-3.89 3.14a1 1 0 01-1.69.44 3.13 3.13 0 00-2.2-1c-1.81.09-3.83 2.55-3.76 6.15a1 1 0 01-.85 1 2.61 2.61 0 00-2 1.34 3 3 0 001.76 3.79z"
                                        />
                                        <path
                                            id="prefix__polygon2896"
                                            className="prefix__cls-12"
                                            d="M1055.3 422.22l-102.36 33.21-42.08-16.49 103.44-30.68z"
                                        />
                                        <path
                                            id="prefix__path2898"
                                            className="prefix__cls-12"
                                            transform="translate(-.65 -.12)"
                                            d="M1119.7 698.79c1 10.33-3.45 19.08-9.89 19.56-3.68.27-7.53 2.27-10.07-1.84-1.91-3.08-2.94-11.56-3.36-16-.41-4.27-2.68-12.22-1.47-15.48 1.71-4.62 7.58-3.8 11.36-4.08 6.44-.46 12.45 7.52 13.43 17.84z"
                                        />
                                        <ellipse
                                            id="prefix__ellipse2900"
                                            transform="rotate(-6.16 1098.9 705.88)"
                                            cx={1100.8}
                                            cy={700.19}
                                            rx={11.69}
                                            ry={18.78}
                                        />
                                        <ellipse
                                            id="prefix__ellipse2902"
                                            className="prefix__cls-13"
                                            transform="rotate(-6.16 1098.9 705.88)"
                                            cx={1100.8}
                                            cy={700.19}
                                            rx={4.49}
                                            ry={7.22}
                                        />
                                        <path
                                            id="prefix__line2904"
                                            className="prefix__cls-14"
                                            d="M929.85 459.47l45.84-12.72"
                                        />
                                        <path
                                            id="prefix__polyline2906"
                                            className="prefix__cls-14"
                                            d="M899.19 669.17l30.66-194.57v-29.47"
                                        />
                                        <path
                                            id="prefix__polyline2908"
                                            className="prefix__cls-14"
                                            d="M964.03 648.11l11.66-187.09v-14.27"
                                        />
                                        <path
                                            id="prefix__line2910"
                                            className="prefix__cls-14"
                                            d="M927.29 490.66l47.54-15.84"
                                        />
                                        <path
                                            id="prefix__line2912"
                                            className="prefix__cls-14"
                                            d="M924.03 513.72l49.4-16.45"
                                        />
                                        <path
                                            id="prefix__line2914"
                                            className="prefix__cls-14"
                                            d="M919.5 538.42l51.11-17.03"
                                        />
                                        <path
                                            id="prefix__line2916"
                                            className="prefix__cls-14"
                                            d="M915.46 563.7l54.4-18.12"
                                        />
                                        <path
                                            id="prefix__line2918"
                                            className="prefix__cls-14"
                                            d="M910.86 593.52l57.77-19.25"
                                        />
                                        <path
                                            id="prefix__line2920"
                                            className="prefix__cls-14"
                                            d="M906.8 619.82l60.25-20.07"
                                        />
                                        <path
                                            id="prefix__line2922"
                                            className="prefix__cls-14"
                                            d="M903.07 648.82l60.96-20.31"
                                        />
                                        <path
                                            id="prefix__polygon2924"
                                            className="prefix__cls-15"
                                            d="M952.42 510l102.88-36.99v-51l-102.36 33.42z"
                                        />
                                        <path
                                            id="prefix__path2926"
                                            className="prefix__cls-15"
                                            transform="translate(-.65 -.12)"
                                            d="M954.42 456.47l-48.18-20.66c-3.89-1.67-8.41.84-8.41 4.66v45l55.24 24.6z"
                                        />
                                        <path
                                            id="prefix__polygon2928"
                                            className="prefix__cls-15"
                                            d="M952.42 763.51V510l102.88-36.99 43.5 229.11z"
                                        />
                                        <path
                                            id="prefix__polygon2930"
                                            className="prefix__cls-15"
                                            d="M848.68 686.38l103.74 77.13V510l-55.24-24.6z"
                                        />
                                        <path
                                            id="prefix__polyline2932"
                                            className="prefix__cls-15"
                                            d="M1098.8 702.12l-104-64.22-146.12 48.48"
                                        />
                                        <path
                                            id="prefix__line2934"
                                            className="prefix__cls-15"
                                            d="M994.8 637.9l9.3-198.96"
                                        />
                                        <path
                                            id="prefix__polygon2936"
                                            stroke="#fff"
                                            strokeWidth={4.56}
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            fill="none"
                                            d="M1075.5 579.34l-74.1-34.44-128.21 39.91 79.23 39.65z"
                                        />
                                        <path
                                            id="prefix__polyline2938"
                                            className="prefix__cls-15"
                                            d="M897.18 485.4l106.92-35.36 51.2 22.97"
                                        />
                                        <path
                                            id="prefix__path2940"
                                            transform="translate(-.65 -.12)"
                                            d="M970.51 762.62c0 10.36-5.23 18.76-11.7 18.76-3.69 0-7.71 1.7-9.86-2.58-1.61-3.22-1.84-11.74-1.84-16.18 0-4.44-1.51-12.38 0-15.54 2.14-4.48 7.91-3.22 11.7-3.22 6.47 0 11.7 8.4 11.7 18.76z"
                                        />
                                        <path
                                            id="prefix__path2942"
                                            className="prefix__cls-17"
                                            transform="translate(-.65 -.12)"
                                            d="M940.78 672.5c5.93 5.25 10.46 13.94 11.54 18 4.92 18.77-7.43 72.83-39.16 89.72l-26.85-10.75-7.42-11.11 29.23 11.27z"
                                        />
                                        <path
                                            id="prefix__path2944"
                                            className="prefix__cls-18"
                                            transform="translate(-.65 -.12)"
                                            d="M878.89 758.41c-3-3 15-68.49 61.89-85.91 10.58 34.43-17.59 88.77-32.66 97.18z"
                                        />
                                        <ellipse
                                            id="prefix__ellipse2946"
                                            className="prefix__cls-12"
                                            cx={950.93}
                                            cy={762.5}
                                            rx={11.7}
                                            ry={18.76}
                                        />
                                        <ellipse
                                            id="prefix__ellipse2948"
                                            className="prefix__cls-13"
                                            cx={950.93}
                                            cy={762.5}
                                            rx={4.5}
                                            ry={7.21}
                                        />
                                        <path
                                            id="prefix__path2950"
                                            className="prefix__cls-17"
                                            transform="translate(-.65 -.12)"
                                            d="M1014.9 433.87l-33.64-14.31a1.5 1.5 0 01.29-2.91l37.59-9 34.62 13.58z"
                                        />
                                        <path
                                            id="prefix__path2952"
                                            className="prefix__cls-18"
                                            transform="translate(-.65 -.12)"
                                            d="M1014.9 433.87l38.86-12.67v-28.46s-1-17.39-20.48-12.94c-20 4.58-19.11 26.68-19.11 26.68z"
                                        />
                                        <path
                                            id="prefix__path2954"
                                            className="prefix__cls-17"
                                            transform="translate(-.65 -.12)"
                                            d="M952.32 453.1l-33.65-14.3a1.51 1.51 0 01.3-2.92L956.06 425l35.11 15.43z"
                                        />
                                        <path
                                            id="prefix__path2956"
                                            className="prefix__cls-18"
                                            transform="translate(-.65 -.12)"
                                            d="M952.34 453.93l38.83-12.68V412s-1-17.39-20.48-12.93c-20 4.58-19.1 26.68-19.1 26.68z"
                                        />
                                        <path
                                            id="prefix__polygon2958"
                                            className="prefix__cls-15"
                                            d="M952.94 455.65l102.36-33.43v-26.7l-102.36 33.43z"
                                        />
                                        <path
                                            id="prefix__line2960"
                                            className="prefix__cls-9"
                                            d="M787.27 759.84l33.12 17.35"
                                        />
                                        <path
                                            id="prefix__path2962"
                                            className="prefix__cls-10"
                                            transform="translate(-.65 -.12)"
                                            d="M1021.9 367s-4.24-2.84-3.58-11.4c0 .01 7.7 3.74 3.58 11.4z"
                                        />
                                        <g id="prefix__Calque_13" data-name="Calque 13">
                                            <path
                                                id="prefix__path2964"
                                                className="prefix__cls-19"
                                                transform="translate(-.65 -.12)"
                                                d="M1014.3 411.63l.4 15s-13.93-3.17-16.89-5.11c-4-2.6-4.6-3-4.6-3z"
                                            />
                                            <path
                                                id="prefix__path2966"
                                                transform="translate(-.65 -.12)"
                                                d="M1010 408.27s-17.76-.08-18.39 2a30.23 30.23 0 01-2.08 4.71z"
                                                fill="#b7784e"
                                            />
                                            <path
                                                id="prefix__path2968"
                                                className="prefix__cls-10"
                                                transform="translate(-.65 -.12)"
                                                d="M1009.8 376.86s-4.88 18.75-6.84 23.76c-1.96 5.01-11.32 13.65-10.63 13.38l.46-.15 12.66-4.14s5.25-5.31 4.8-10.9z"
                                            />
                                        </g>
                                        <path
                                            id="prefix__path2971"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M1064.4 318.31h23.59c-10.39 27.16-23.59 0-23.59 0z"
                                        />
                                        <path
                                            id="prefix__path2973"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M1088 318.31h-23.61c-14.44-54.45-62-64.08-63.69-64.42 20.15 2 75.98 12.23 87.3 64.42z"
                                        />
                                        <path
                                            id="prefix__path2975"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M1039.8 318.31h24.64c-12.34 25.95-23.66 2.17-24.64 0z"
                                        />
                                        <path
                                            id="prefix__path2977"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M1064.4 318.31h-24.64a1 1 0 01-.07-.15c-14.43-56.15-43.6-64.63-43.62-64.64 1.17.06 2.73.18 4.59.37h.05c1.72.34 49.28 9.97 63.69 64.42z"
                                        />
                                        <path
                                            id="prefix__path2979"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M1039.8 318.31h-.14a1 1 0 00.07-.15 1 1 0 00.07.15z"
                                        />
                                        <path
                                            id="prefix__path2981"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M1039.7 318.16a1 1 0 01-.07.15h-24.15l-.08-.15c-8.89-55.9-21.94-64.76-21.94-64.76s.94 0 2.62.12c.02.01 29.19 8.48 43.62 64.64z"
                                        />
                                        <path
                                            id="prefix__path2983"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M1015.5 318.31h24.15c-10.63 25.27-23.05 2.13-24.15 0z"
                                        />
                                        <path
                                            id="prefix__path2985"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M1015.5 318.31h-.15a1 1 0 00.07-.15z"
                                        />
                                        <path
                                            id="prefix__path2987"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M1015.4 318.16a1 1 0 01-.07.15h-21.87V305h-2v-51.48l2.08-.13s12.97 8.87 21.86 64.77z"
                                        />
                                        <path
                                            id="prefix__path2989"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M993.46 318.31h21.87c-8.61 19.52-17.87 9.47-21.87 3.45z"
                                        />
                                        <path
                                            id="prefix__path2991"
                                            className="prefix__cls-13"
                                            transform="translate(-.65 -.12)"
                                            d="M993.46 321.76v91.93l-3.93 1.31-.23-93c.7-1.1 1.42-2.33 2.15-3.7a32.12 32.12 0 002.01 3.46z"
                                        />
                                        <path
                                            id="prefix__path2993"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M993.46 318.31v3.45a32.12 32.12 0 01-2-3.45z"
                                        />
                                        <path
                                            id="prefix__polygon2995"
                                            className="prefix__cls-19"
                                            d="M990.79 318.19l-.01-13.3h2.03v13.3z"
                                        />
                                        <path
                                            id="prefix__polygon2997"
                                            className="prefix__cls-5"
                                            d="M988.65 318.19v-13.3h2.13l.01 13.3z"
                                        />
                                        <path
                                            id="prefix__path2999"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M989.3 318.31h2.15c-.73 1.37-1.45 2.6-2.15 3.7z"
                                        />
                                        <path
                                            id="prefix__path3001"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M991.38 253.53v51.48h-2.08v13.3h-22.22l-.07-.15c10.89-57.46 22.25-64.49 22.29-64.51.7-.05 1.39-.08 2.08-.12z"
                                        />
                                        <path
                                            id="prefix__path3003"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M989.3 318.31V322c-12.15 18.84-21.36-1.69-22.22-3.7z"
                                        />
                                        <path
                                            id="prefix__path3005"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M987.73 253.77l1.57-.12s-11.4 7-22.29 64.51a.6.6 0 01-.09.15h-23.67v-.15c10.58-53.08 43.26-64 44.48-64.39z"
                                        />
                                        <path
                                            id="prefix__path3007"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M986.13 253.9l1.6-.13c-1.22.39-33.9 11.31-44.53 64.39l-.09.15h-23.72c9.77-53.82 63.51-63.85 66.68-64.4z"
                                        />
                                        <path
                                            id="prefix__path3009"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M967.08 318.31h-.16a.6.6 0 00.09-.15z"
                                        />
                                        <path
                                            id="prefix__path3011"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M943.25 318.31h23.67c-14.84 24.86-22.92 2.12-23.67 0z"
                                        />
                                        <path
                                            id="prefix__path3013"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M986.07 253.91c-3.17.55-56.91 10.58-66.68 64.4h-25.07s7.11-57.18 91.75-64.4z"
                                        />
                                        <path
                                            id="prefix__path3015"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M943.25 318.31h-.14l.09-.15z"
                                        />
                                        <path
                                            id="prefix__path3017"
                                            className="prefix__cls-5"
                                            transform="translate(-.65 -.12)"
                                            d="M919.39 318.31h23.72c-13.97 25.21-23.72 0-23.72 0z"
                                        />
                                        <path
                                            id="prefix__path3019"
                                            className="prefix__cls-19"
                                            transform="translate(-.65 -.12)"
                                            d="M894.32 318.31h25.07c-16.59 27.3-25.07 0-25.07 0z"
                                        />
                                    </g>
                                    <g id="prefix__chaise_mns" data-name="chaise mns">
                                        <ellipse
                                            id="prefix__ellipse3022"
                                            className="prefix__cls-13"
                                            cx={991.03}
                                            cy={254.02}
                                            rx={4.58}
                                            ry={1.18}
                                        />
                                    </g>
                                    <path
                                        id="prefix__path3025"
                                        transform="translate(-.65 -.12)"
                                        d="M1051.8 493.3s-10.18-59.44 1.36-65.94 6.52-3.1 10.34 17.89c3.82 20.99 15.83 42.35 9.41 48.05"
                                        stroke="#999"
                                        strokeMiterlimit={10}
                                        fill="none"
                                    />
                                </g>


                                <g opacity={zoneIsVisible('drapeau_2')} id="prefix__drapeau_2" data-name="drapeau 2">
                                    <path
                                        id="prefix__rect3028"
                                        className="prefix__cls-22"
                                        d="M787.9 262.61h2.39V450.2h-2.39z"
                                    />
                                    <path
                                        id="prefix__path3030"
                                        className="prefix__cls-22"
                                        transform="translate(-.65 -.12)"
                                        d="M789.24 450.39l1-.14a673.92 673.92 0 010-187.45l-1-.14a674.91 674.91 0 000 187.73z"
                                    />
                                    <path
                                        id="prefix__path3032"
                                        className="prefix__cls-23"
                                        transform="translate(-.65 -.12)"
                                        d="M789.59 262.77c-14.19-2-22.87-5.08-34.92 6.24S723 273.87 723 273.87c19.42 17.44 27.85 24.94 42.3 23.31s20.8 2.07 20.8 2.07z"
                                    />
                                    <path
                                        id="prefix__path3034"
                                        className="prefix__cls-24"
                                        transform="translate(-.65 -.12)"
                                        d="M754.67 269c12.05-11.32 20.73-8.22 34.92-6.24l-3.53 36.48z"
                                    />
                                </g>
                                <g opacity={zoneIsVisible('drapeau_1')} id="prefix__drapeau_1" data-name="drapeau 1">
                                    <path
                                        id="prefix__rect3037"
                                        className="prefix__cls-22"
                                        d="M408.66 325.09h2.39v187.59h-2.39z"
                                    />
                                    <path
                                        id="prefix__path3039"
                                        className="prefix__cls-22"
                                        transform="translate(-.65 -.12)"
                                        d="M410 512.87l1-.14a673.93 673.93 0 010-187.45l-1-.14a674.91 674.91 0 000 187.73z"
                                    />
                                    <path
                                        id="prefix__path3041"
                                        className="prefix__cls-23"
                                        transform="translate(-.65 -.12)"
                                        d="M410.35 325.25c-14.2-2-22.87-5.08-34.92 6.25s-31.71 4.85-31.71 4.85c19.42 17.44 27.85 24.94 42.3 23.31s20.8 2.07 20.8 2.07z"
                                    />
                                    <path
                                        id="prefix__path3043"
                                        className="prefix__cls-24"
                                        transform="translate(-.65 -.12)"
                                        d="M375.43 331.5c12.05-11.33 20.72-8.23 34.92-6.25l-3.53 36.48z"
                                    />
                                </g>
                                <g opacity={zoneIsVisible('voiture_4_4')} id="prefix__voiture">
                                    <path
                                        id="prefix__path3046"
                                        className="prefix__cls-25"
                                        transform="translate(-.65 -.12)"
                                        d="M545.5 835v-65.68a12.51 12.51 0 00-12.5-12.51H356.23a12.51 12.51 0 00-12.51 12.51V835"
                                    />
                                    <path
                                        id="prefix__path3048"
                                        className="prefix__cls-25"
                                        transform="translate(-.65 -.12)"
                                        d="M497.57 833.93v-7.14a14.23 14.23 0 013.81-9.69l42.08-48.1"
                                    />
                                    <path
                                        id="prefix__path3050"
                                        className="prefix__cls-26"
                                        transform="translate(-.65 -.12)"
                                        d="M565.24 760.94c-7.59 9.13-6.24 11.74-6.24 74.06l15.25 1.3z"
                                    />
                                    <rect
                                        id="prefix__rect3052"
                                        className="prefix__cls-27"
                                        x={629.54}
                                        y={738.72}
                                        width={1.65}
                                        height={23.02}
                                        rx={0.48}
                                    />
                                    <path
                                        id="prefix__polygon3054"
                                        className="prefix__cls-28"
                                        d="M662.16 732.29v21.05l-30.97-9.6v-4.19z"
                                    />
                                    <path
                                        id="prefix__polygon3056"
                                        className="prefix__cls-29"
                                        d="M662.16 747.67v5.67l-30.97-9.6v-1.85z"
                                    />
                                    <rect
                                        id="prefix__rect3058"
                                        className="prefix__cls-27"
                                        x={666.75}
                                        y={728.14}
                                        width={1.65}
                                        height={32.61}
                                        rx={0.48}
                                    />
                                    <path
                                        id="prefix__polygon3060"
                                        className="prefix__cls-28"
                                        d="M699.37 719.52v29.46l-30.98-13.43v-5.87z"
                                    />
                                    <path
                                        id="prefix__polygon3062"
                                        className="prefix__cls-29"
                                        d="M699.37 741.04v7.94l-30.98-13.43v-2.6z"
                                    />
                                    <path
                                        id="prefix__path3064"
                                        className="prefix__cls-30"
                                        transform="translate(-.65 -.12)"
                                        d="M918.44 937c-12.11 3.2-31.8 1.93-31.8 1.93L774.07 938l-342-.82-65.56-.18c-17 0-32.25-10.65-39.86-22.06-3.29-4.92-5.16-10-5.16-14.38v-50.63a20.26 20.26 0 01.16-2.48A19.27 19.27 0 01341 830.66l224 3.08.22-62.62h122.47s28.14-3.12 48.1 14.57 40.58 34.35 42.87 34.35 10.79.35 16 6.59a17.42 17.42 0 012.68 4.14c1.07 2.29 1 2.77 8.61 4.54 10.88 2.51 54.07 2.08 54.07 2.08s2.29.52 2.62 1.73 2.62 1.39 3.6 1.39 1.39-.35 3.11 1.3 3.44 3.3 4.17 4.17a4.82 4.82 0 001.63 1.45 10.38 10.38 0 002.71.88l1.19.25c5.75 1.18 26 5.45 37.83 15.63 0 0 3 6.24 6.59 18.67.6 2.07 1.22 4.32 1.84 6.74a62.06 62.06 0 015.34 21.4c.58 11.67-.11 22.77-12.21 26z"
                                    />
                                    <path
                                        id="prefix__path3066"
                                        className="prefix__cls-31"
                                        transform="translate(-.65 -.12)"
                                        d="M917.53 937.2c-2.51-35.47-32-66.14-68.14-66.14-35.81 0-65.21 31.86-68.14 66.92l10.83.08 107.66 1s12.08-.6 16.84-1.46"
                                    />
                                    <path
                                        id="prefix__path3068"
                                        className="prefix__cls-30"
                                        transform="translate(-.65 -.12)"
                                        d="M913.31 938c-2.35-33.28-30.09-63.09-64-63.09-33.59 0-61.11 30.28-63.87 63.17l10.16.08 101 .92s11.43-.15 15.9-1"
                                    />
                                    <path
                                        id="prefix__path3070"
                                        transform="translate(-.65 -.12)"
                                        d="M569 918.4h191a18.71 18.71 0 0018.71-18.7v-13.4a19.9 19.9 0 00-19.89-19.89H346.14A11.63 11.63 0 00334.51 878v13.48a18.54 18.54 0 0018.54 18.54H418c4.19 0 4.81-2.25 6.87-5.9 6.67-11.82 25.37-37.3 62.76-37.3 38.73 0 61.56 24.34 70.81 44.73A11.61 11.61 0 00569 918.4z"
                                        fill="#ffe164"
                                    />
                                    <path
                                        id="prefix__path3072"
                                        className="prefix__cls-33"
                                        transform="translate(-.65 -.12)"
                                        d="M798.44 923.57a46 46 0 00-2.82 14.61l14.73.33 1-15.88"
                                    />
                                    <path
                                        id="prefix__path3074"
                                        className="prefix__cls-33"
                                        transform="translate(-.65 -.12)"
                                        d="M798.45 923.57c7.74-20 27.48-37.58 50.94-37.58 29.11 0 53.19 25.24 54.83 53l-10.11.22"
                                    />
                                    <path
                                        id="prefix__path3076"
                                        className="prefix__cls-34"
                                        transform="translate(-.65 -.12)"
                                        d="M803.9 938.51l-3.32-.22s5.63-45.82 50.75-45.62 48.41 46.38 48.41 46.38z"
                                    />
                                    <path
                                        id="prefix__path3078"
                                        className="prefix__cls-35"
                                        transform="translate(-.65 -.12)"
                                        d="M806.53 927.53a46.54 46.54 0 11-2.92 16.25 46.53 46.53 0 012.92-16.25"
                                    />
                                    <circle
                                        id="prefix__circle3080"
                                        className="prefix__cls-36"
                                        cx={849.46}
                                        cy={943.66}
                                        r={31.08}
                                    />
                                    <path
                                        id="prefix__rect3082"
                                        className="prefix__cls-5"
                                        d="M563.44 866.72h163.19v50.31H563.44z"
                                    />
                                    <path
                                        id="prefix__path3084"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M565.06 830.46l237.32.36s-7.85-14.52-23.72-13.7c0 0-50.09-47.6-75.93-46.2l-137.49-.45z"
                                    />
                                    <path
                                        id="prefix__path3086"
                                        className="prefix__cls-37"
                                        transform="translate(-.65 -.12)"
                                        d="M653.55 779.53s6.87 13.29 5.56 51.29h98.6v-11.31s-22.44-34-52.08-40z"
                                    />
                                    <path
                                        id="prefix__polyline3088"
                                        className="prefix__cls-38"
                                        d="M668.39 730.76l30.98-8.51v5.89l-30.98 3.77v-1.15"
                                    />
                                    <path
                                        id="prefix__path3090"
                                        className="prefix__cls-37"
                                        transform="translate(-.65 -.12)"
                                        d="M596.08 779.53h40.15s4.91.19 7.36 9.58 4.67 33.25 2.7 41.71h-62.68V792a12.47 12.47 0 0112.47-12.47z"
                                    />
                                    <path
                                        id="prefix__path3092"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M925 882.88h-20.52S893.43 858 849 857.76c-44.06-.24-519.83 0-527.52 0h-.09v-10.31h.25a19.25 19.25 0 012.26-6.87h363.38s11.67.49 18.35 4.67l36.87.22 4.91-15 50 .33h5s14 1.48 29.94 2.15 25.47.67 25.47.67 3.49-.6 5 1.82 3.07-.09 6 1.79 3.62 3.12 5 4 20.3 4.83 36 13a40.12 40.12 0 017.22 4.73s6.8 17.32 7.96 23.92z"
                                    />
                                    <path
                                        id="prefix__path3094"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M569.34 756.81c19.52-.17 102.22-.83 103.95 0l10.91 14.28-119-.35v-9.84a4.13 4.13 0 014.14-4.09z"
                                    />
                                    <path
                                        id="prefix__path3096"
                                        transform="translate(-.65 -.12)"
                                        d="M880.18 851.25a3.74 3.74 0 01-1.11 2.68 3.79 3.79 0 01-2.69 1.11h-555v-7.59h555a3.81 3.81 0 013.8 3.8z"
                                        opacity={0.76}
                                        fill="#4c4c4c"
                                    />
                                    <rect
                                        id="prefix__rect3098"
                                        className="prefix__cls-27"
                                        x={666.57}
                                        y={845.35}
                                        width={21.95}
                                        height={9.58}
                                        rx={2.8}
                                    />
                                    <circle
                                        id="prefix__circle3100"
                                        className="prefix__cls-41"
                                        cx={849.18}
                                        cy={943.66}
                                        r={20.86}
                                    />
                                    <rect
                                        id="prefix__rect3102"
                                        className="prefix__cls-27"
                                        x={759.84}
                                        y={811.69}
                                        width={12.48}
                                        height={26.72}
                                        rx={3.65}
                                    />
                                    <rect
                                        id="prefix__rect3104"
                                        className="prefix__cls-28"
                                        x={761.44}
                                        y={813.73}
                                        width={8.75}
                                        height={22.3}
                                        rx={2.56}
                                    />
                                    <path
                                        id="prefix__path3106"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M845.4 920.75l1.91 11.09h5.93l1.59-11.09s-4.34-6.26-9.43 0z"
                                    />
                                    <circle
                                        id="prefix__circle3108"
                                        className="prefix__cls-39"
                                        cx={849.46}
                                        cy={942.76}
                                        r={4.74}
                                    />
                                    <path
                                        id="prefix__path3110"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M873.94 938.16l-11.09 1.91V946l11.09 1.59s6.26-4.34 0-9.43z"
                                    />
                                    <path
                                        id="prefix__polyline3112"
                                        className="prefix__cls-38"
                                        d="M631.19 740.41l30.97-5.4v3.11l-30.97 2.85v-.56"
                                    />
                                    <path
                                        id="prefix__path3114"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M826.92 938.16l11.08 1.91V946l-11.09 1.59s-6.25-4.34.01-9.43z"
                                    />
                                    <path
                                        id="prefix__path3116"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M845.4 967.66l1.91-11.08h5.93l1.59 11.08s-4.34 6.27-9.43 0z"
                                    />
                                    <path
                                        id="prefix__path3118"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M836.65 924.41l6.93 8.86-4 4.39-9.28-6.27s-1.71-7.39 6.35-6.98z"
                                    />
                                    <path
                                        id="prefix__path3120"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M865.09 924.46L857.8 933l3.8 4.56 9.53-5.89s2.02-7.31-6.04-7.21z"
                                    />
                                    <path
                                        id="prefix__path3122"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M836.65 963.19l6.93-8.86-4-4.39-9.28 6.27s-1.71 7.42 6.35 6.98z"
                                    />
                                    <path
                                        id="prefix__path3124"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M865.09 963.14l-7.29-8.57 3.8-4.56 9.53 5.89s2.02 7.34-6.04 7.24z"
                                    />
                                    <rect
                                        id="prefix__rect3126"
                                        className="prefix__cls-28"
                                        x={668.46}
                                        y={847.34}
                                        width={18.16}
                                        height={5.4}
                                        rx={1.58}
                                    />
                                    <path
                                        id="prefix__path3128"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M916.91 858.91s-4.91 2.37-5.07 13.66-.07 10.63-.07 10.63h13.36s-.2-5.89-8.22-24.29z"
                                    />
                                    <path
                                        id="prefix__polygon3130"
                                        className="prefix__cls-5"
                                        d="M674.85 830.7h14.48l15.65-51.29h-12.96z"
                                    />
                                    <path
                                        id="prefix__polygon3132"
                                        className="prefix__cls-5"
                                        d="M666.75 830.35l4.17.35 16.44-51.29h-3.82z"
                                    />
                                    <path
                                        id="prefix__path3134"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M625.19 779.53l-11.85 51.29v-16c0-.73 8.16-35.28 8.16-35.28z"
                                    />
                                    <path
                                        id="prefix__path3136"
                                        className="prefix__cls-30"
                                        transform="translate(-.65 -.12)"
                                        d="M877.53 841.73l-115.29-1.13a4.76 4.76 0 00-3.75 1.73c-.73.92-1 1.95.75 2.35l128.3.79s-4.93-3.74-10.01-3.74z"
                                    />
                                    <path
                                        id="prefix__path3138"
                                        className="prefix__cls-42"
                                        transform="translate(-.65 -.12)"
                                        d="M809.58 896s17.74-17.35 41.75-16.86S890.08 896 890.08 896"
                                    />
                                    <path
                                        id="prefix__polygon3140"
                                        className="prefix__cls-26"
                                        d="M680.72 767.32l2.82 3.69-118.95.44v-4.37z"
                                    />
                                    <path
                                        id="prefix__path3142"
                                        className="prefix__cls-31"
                                        transform="translate(-.65 -.12)"
                                        d="M564.64 928s219.48-.44 219.42.65-.42 9-.42 9l-219-1.14V928"
                                    />
                                    <path
                                        id="prefix__path3144"
                                        className="prefix__cls-31"
                                        transform="translate(-.65 -.12)"
                                        d="M917.23 934.05s9.59-3.33 12.4-7.94c0 0-1.54 9.61-13 11.48z"
                                    />
                                    <circle
                                        id="prefix__circle3146"
                                        className="prefix__cls-43"
                                        cx={849.46}
                                        cy={943.88}
                                        r={40.01}
                                    />
                                    <path
                                        id="prefix__path3148"
                                        className="prefix__cls-31"
                                        transform="translate(-.65 -.12)"
                                        d="M557.7 937.2c-2.51-35.47-32-66.14-68.14-66.14-35.81 0-65.28 31.48-68.22 66.53l10.83.09 107.74 1.37s12.09-.6 16.84-1.46"
                                    />
                                    <path
                                        id="prefix__path3150"
                                        className="prefix__cls-30"
                                        transform="translate(-.65 -.12)"
                                        d="M553.49 938c-2.35-33.28-30.1-63.09-64-63.09-33.6 0-61.12 29.87-63.88 62.75l10.17.08 101 1.34s11.44-.15 15.9-1"
                                    />
                                    <path
                                        id="prefix__path3152"
                                        className="prefix__cls-33"
                                        transform="translate(-.65 -.12)"
                                        d="M437.69 923.57c7.75-20 28.41-37.58 51.87-37.58 29.11 0 53.19 25.24 54.83 53l-10.1.22"
                                    />
                                    <path
                                        id="prefix__path3154"
                                        className="prefix__cls-34"
                                        transform="translate(-.65 -.12)"
                                        d="M444.06 937.6l-3.32-.21s5.64-44.92 50.77-44.72 48.4 46.38 48.4 46.38z"
                                    />
                                    <path
                                        id="prefix__path3156"
                                        className="prefix__cls-35"
                                        transform="translate(-.65 -.12)"
                                        d="M536.79 943.78v.22c0 .84 0 1.68-.08 2.52-.06 1.18-.18 2.34-.33 3.49A46.51 46.51 0 01444.14 938a45.86 45.86 0 012.56-10.43 44.18 44.18 0 011.94-4.46A46.51 46.51 0 01536.3 937c.1.68.19 1.38.26 2.07s.13 1.49.17 2.24.06 1.69.06 2.47z"
                                    />
                                    <circle
                                        id="prefix__circle3158"
                                        className="prefix__cls-36"
                                        cx={489.63}
                                        cy={943.66}
                                        r={31.08}
                                    />
                                    <circle
                                        id="prefix__circle3160"
                                        className="prefix__cls-41"
                                        cx={489.35}
                                        cy={943.66}
                                        r={20.86}
                                    />
                                    <path
                                        id="prefix__path3162"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M485.57 920.75l1.91 11.09h5.93l1.59-11.09s-4.34-6.26-9.43 0z"
                                    />
                                    <circle
                                        id="prefix__circle3164"
                                        className="prefix__cls-39"
                                        cx={489.63}
                                        cy={942.76}
                                        r={4.74}
                                    />
                                    <path
                                        id="prefix__path3166"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M514.11 938.16L503 940.07V946l11.08 1.59s6.29-4.34.03-9.43z"
                                    />
                                    <path
                                        id="prefix__path3168"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M467.09 938.16l11.09 1.91V946l-11.09 1.59s-6.26-4.34 0-9.43z"
                                    />
                                    <path
                                        id="prefix__path3170"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M485.57 967.66l1.91-11.08h5.93l1.59 11.08s-4.34 6.27-9.43 0z"
                                    />
                                    <path
                                        id="prefix__path3172"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M476.82 924.41l6.93 8.86-4 4.39-9.29-6.27s-1.69-7.39 6.36-6.98z"
                                    />
                                    <path
                                        id="prefix__path3174"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M505.26 924.46L498 933l3.8 4.56 9.53-5.89s2-7.31-6.07-7.21z"
                                    />
                                    <path
                                        id="prefix__path3176"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M476.82 963.19l6.93-8.86-4-4.39-9.29 6.27s-1.69 7.42 6.36 6.98z"
                                    />
                                    <path
                                        id="prefix__path3178"
                                        className="prefix__cls-39"
                                        transform="translate(-.65 -.12)"
                                        d="M505.26 963.14l-7.26-8.57 3.8-4.56 9.53 5.89s2 7.34-6.07 7.24z"
                                    />
                                    <path
                                        id="prefix__path3180"
                                        className="prefix__cls-42"
                                        transform="translate(-.65 -.12)"
                                        d="M449.75 896s17.74-17.35 41.76-16.86S530.25 896 530.25 896"
                                    />
                                    <circle
                                        id="prefix__circle3182"
                                        className="prefix__cls-43"
                                        cx={489.63}
                                        cy={943.88}
                                        r={40.01}
                                    />
                                    <path
                                        id="prefix__path3184"
                                        className="prefix__cls-31"
                                        transform="translate(-.65 -.12)"
                                        d="M916.58 929.69s8.9-2 13.37-4.78l-.91 3-10.6 7.69-3-.82z"
                                    />
                                    <path
                                        id="prefix__path3186"
                                        transform="translate(-.65 -.12)"
                                        d="M778.66 821.77v13.09a2.37 2.37 0 002.37 2.37h15.22a2.18 2.18 0 001.89-3.27c-2.45-4.2-7.9-11.26-17.76-13.56a1.41 1.41 0 00-1.72 1.37z"
                                        fill="#4c4c4c"
                                    />
                                    <path
                                        id="prefix__path3188"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M536.79 944v-.23q0-1.24-.06-2.49c0-.75-.1-1.5-.17-2.24s-.16-1.39-.26-2.07l215.28.88.68 1.83.94 2.52 1 2.59 1.05 2.82 1.27 3.4-220.11-1c.15-1.15.27-2.31.33-3.49.02-.83.05-1.67.05-2.52z"
                                    />
                                    <path
                                        id="prefix__path3190"
                                        className="prefix__cls-45"
                                        transform="translate(-.65 -.12)"
                                        d="M753.2 942.21l-216.47-.92c0-.75-.1-1.5-.17-2.24l215.7.64z"
                                    />
                                    <path
                                        id="prefix__path3192"
                                        className="prefix__cls-45"
                                        transform="translate(-.65 -.12)"
                                        d="M755.22 947.62l-218.51-1.09c0-.84.08-1.68.08-2.52l217.38.79z"
                                    />
                                    <path
                                        id="prefix__path3194"
                                        className="prefix__cls-33"
                                        transform="translate(-.65 -.12)"
                                        d="M448.64 923.07a44.18 44.18 0 00-1.94 4.46 45.86 45.86 0 00-2.56 10.47l-77.62-1c-17 0-32.26-10.65-39.87-22.06 15.59 14.11 107.55 8.14 121.99 8.13z"
                                    />
                                    <path
                                        id="prefix__path3196"
                                        className="prefix__cls-5"
                                        transform="translate(-.65 -.12)"
                                        d="M335.37 900.57h-13.88V868c8.22-4.79 13.35 8.91 15 20 .94 6.76.62 12.57-1.12 12.57z"
                                    />
                                    <path
                                        id="prefix__path3198"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M335.37 900.57h-13.88V888h15c.94 6.76.62 12.57-1.12 12.57z"
                                    />
                                    <path
                                        id="prefix__path3200"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M321.4 847.45c0-5.36-4-7.58-12.22-13.23a2.71 2.71 0 01-1.16-2.4c.13-2.14.89-1.86 6.43-1.73 4.64.11 13.89 9.62 17.79 10.68s-10.84 6.68-10.84 6.68z"
                                    />
                                    <path
                                        id="prefix__path3202"
                                        d="M503.93 748.25c6.72 0 9.83 7.5 16.55 7.5s8.28-5.69 13.71-5.69 5.95 6 11.9 5.69 6.47-6.21 11.9-6.21"
                                        strokeWidth={2.32}
                                        stroke="#010203"
                                        strokeMiterlimit={10}
                                        fill="none"
                                    />
                                    <path
                                        id="prefix__path3204"
                                        d="M334.35 747.77c7.12 0 10.4 7.5 17.51 7.5s8.76-5.69 14.5-5.69 6.29 5.95 12.59 5.69 6.84-6.21 12.58-6.21 8.48 6.73 13.41 6.73 7.93-6.21 13.68-6.21 8.2 5.95 13.4 5.95 5.75-6.21 13.41-6.21"
                                        strokeWidth={2.38}
                                        stroke="#010203"
                                        strokeMiterlimit={10}
                                        fill="none"
                                    />
                                    <path
                                        id="prefix__path3206"
                                        className="prefix__cls-49"
                                        transform="translate(-.65 -.12)"
                                        d="M318.38 749.83c6.72 0 9.82 7.5 16.55 7.5s8.28-5.69 13.71-5.69 5.95 6 11.89 5.69 6.47-6.2 11.9-6.2 8 6.72 12.68 6.72 7.5-6.21 12.93-6.21 7.76 6 12.67 6 5.43-6.2 12.67-6.2 6.21 6.2 12.94 5.94 6.72-6.46 11.38-6.46"
                                    />
                                    <path
                                        id="prefix__path3208"
                                        className="prefix__cls-49"
                                        transform="translate(-.65 -.12)"
                                        d="M518.75 749.83c6.73 0 9.83 7.5 16.56 7.5s8.27-5.69 13.7-5.69 6 6 11.9 5.69 6.47-6.2 11.9-6.2"
                                    />
                                    <path
                                        id="prefix__path3210"
                                        transform="translate(-.65 -.12)"
                                        d="M334 737c0 .49-.33.85-.91 1.1-3.54 1.53-16.24-1.1-16.24-1.1 1.33-4.29 2.37-7.39 0-11.09-2.14-3.36-5.47-7-3.66-8.82a2.46 2.46 0 01.71-.49c3.84-1.92 9.85 1.46 14 8.13 3.26 5.21 6.1 8.76 6.1 12.27z"
                                        fill="#292527"
                                    />
                                    <path
                                        id="prefix__path3212"
                                        transform="translate(-.65 -.12)"
                                        d="M334 737c0 .49-.33.85-.91 1.1l-4.15-2c-.13-3.57-6.05-19.89-15.75-19a2.46 2.46 0 01.71-.49c3.84-1.92 9.85 1.46 14 8.13 3.26 5.2 6.1 8.75 6.1 12.26z"
                                        fill="#010203"
                                    />
                                    <path
                                        id="prefix__path3214"
                                        transform="translate(-.65 -.12)"
                                        d="M541.25 752.88c-45.36 0-144.65-1.71-171.22-1.9s-79.3 2.42-101.57-.57c-22.59-3-27.1-7.21-23-8 3.67-.67 8-1.3 13-1.89 37.18-4.43 108.48-6.63 180.25-6.63 75.66 0 169 1.28 186.16 13.84a6.83 6.83 0 012.54 3c1.93 5.38-40.78 2.15-86.16 2.15z"
                                        fill="#fadd27"
                                    />
                                    <path
                                        id="prefix__path3216"
                                        transform="translate(-.65 -.12)"
                                        d="M624.9 747.76c-27-7.61-113.62-10.4-180.67-10.4-58.76 0-144.46 1.19-185.74 3.19 37.18-4.43 108.48-6.63 180.25-6.63 75.66 0 169.03 1.28 186.16 13.84z"
                                        fill="#e99f1b"
                                    />
                                    <path
                                        id="prefix__path3218"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M504.71 744.1l-3.25.14a1.83 1.83 0 00-.38-1 1.93 1.93 0 00-1.48-.56 2.09 2.09 0 00-1.14.27.85.85 0 00-.42.66.74.74 0 00.34.63 4.78 4.78 0 001.72.54 8.14 8.14 0 013.15 1.13 2 2 0 01.88 1.77 2.21 2.21 0 01-.56 1.32 3.43 3.43 0 01-1.53 1 8.39 8.39 0 01-2.72.34 6.44 6.44 0 01-3.2-.67 2.59 2.59 0 01-1.22-2.08l3.22-.13a1.3 1.3 0 00.5.9 1.86 1.86 0 001.11.28 1.56 1.56 0 00.91-.2.61.61 0 00.32-.5.44.44 0 00-.23-.39 3.06 3.06 0 00-1.12-.35 15.26 15.26 0 01-3.16-.83 2.92 2.92 0 01-1.36-1 2.13 2.13 0 01-.38-1.35 2.69 2.69 0 01.66-1.61 3.83 3.83 0 011.7-1.11 8.17 8.17 0 012.67-.36c1.87 0 3.16.32 3.85.93a3.1 3.1 0 011.12 2.23z"
                                    />
                                    <path
                                        id="prefix__path3220"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M486.29 742.45h3.87l.6-1.5h3.48l-4.57 9.07h-3.72l-3.71-9.13h3.57zm.61 2l1.06 3.28 1.36-3.27z"
                                    />
                                    <path
                                        id="prefix__path3222"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M474.08 750h-3.4l.26-5.42a3.91 3.91 0 01.37-1.52 3.48 3.48 0 011-1.25 4.25 4.25 0 011.4-.75 8.5 8.5 0 012.4-.28c.53 0 1.12 0 1.75.1a5.22 5.22 0 011.57.39 3.5 3.5 0 011.13.79 2.59 2.59 0 01.68 1 4.6 4.6 0 01.24 1.54l-.26 5.43h-3.39l.26-5.55a1.36 1.36 0 00-.45-1.17 2 2 0 00-1.36-.43 2.14 2.14 0 00-1.4.41 1.5 1.5 0 00-.56 1.16z"
                                    />
                                    <path
                                        id="prefix__path3224"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M469.51 749.93h-3.56l-2.17-6.57-2.78 6.51h-3.45l4.52-9.07h3.7z"
                                    />
                                    <path
                                        id="prefix__path3226"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M456.45 749.84l-9.13-.07.1-1.95h5.71l.07-1.45h-5.3l.09-1.86h5.3l.08-1.79h-5.88l.1-2.06 9.29.07z"
                                    />
                                    <path
                                        id="prefix__path3228"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M446.1 749.76l-10.36-.08.11-2.25h3.47l.33-6.86h3.41l-.33 6.86h3.47z"
                                    />
                                    <path
                                        id="prefix__path3230"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M434.21 749.67l-9.13-.07.09-1.94h5.72l.07-1.44h-5.31l.09-1.86h5.3l.09-1.8h-5.88l.1-2.06 9.29.07z"
                                    />
                                    <path
                                        id="prefix__path3232"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M415.91 749.54h-3.4l.25-5.42a4.1 4.1 0 01.38-1.52 3.48 3.48 0 011-1.25 4.16 4.16 0 011.4-.75 8.48 8.48 0 012.39-.28c.54 0 1.13 0 1.76.1a5.22 5.22 0 011.57.39 3.61 3.61 0 011.13.79 2.69 2.69 0 01.68 1 4.6 4.6 0 01.24 1.54l-.26 5.43h-3.4l.27-5.55a1.39 1.39 0 00-.45-1.17 2.06 2.06 0 00-1.37-.43 2.18 2.18 0 00-1.4.41 1.49 1.49 0 00-.55 1.16z"
                                    />
                                    <path
                                        id="prefix__path3234"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M410.64 740.39l-.43 9.1h-5.68a10.16 10.16 0 01-2.41-.24 2.43 2.43 0 01-1.3-.84 2.12 2.12 0 01-.44-1.48 2.22 2.22 0 01.45-1.3 2.92 2.92 0 011.12-.88 4.89 4.89 0 011.21-.36 3.55 3.55 0 01-.87-.34 2.77 2.77 0 01-.52-.48 3.31 3.31 0 01-.45-.57l-1.53-2.65h3.85l1.69 2.79a2.05 2.05 0 00.59.71 1.67 1.67 0 00.82.22h.3l.18-3.7zm-3.64 5.39h-1.44a6.57 6.57 0 00-.91.12 1 1 0 00-.56.28.79.79 0 00-.24.52.74.74 0 00.31.68 2.24 2.24 0 001.26.25h1.49z"
                                    />
                                    <path
                                        id="prefix__path3236"
                                        className="prefix__cls-46"
                                        transform="translate(-.65 -.12)"
                                        d="M399.16 743.32l-3.25.14a1.76 1.76 0 00-.39-1 1.9 1.9 0 00-1.47-.56 2 2 0 00-1.14.28.86.86 0 00-.43.65.75.75 0 00.35.63 4.63 4.63 0 001.72.54 8 8 0 013.14 1.13 2 2 0 01.88 1.77 2.2 2.2 0 01-.55 1.32 3.43 3.43 0 01-1.53 1 8.41 8.41 0 01-2.73.34 6.4 6.4 0 01-3.19-.67 2.57 2.57 0 01-1.22-2.08l3.22-.13a1.29 1.29 0 00.49.9 2 2 0 001.12.29 1.6 1.6 0 00.9-.21.62.62 0 00.33-.5.44.44 0 00-.23-.39 3.13 3.13 0 00-1.13-.35 15.44 15.44 0 01-3.16-.83 3.09 3.09 0 01-1.36-1 2.17 2.17 0 01-.37-1.36 2.63 2.63 0 01.66-1.61 3.79 3.79 0 011.69-1.11 8.25 8.25 0 012.67-.36c1.88 0 3.16.32 3.86.93a3.18 3.18 0 011.12 2.24z"
                                    />
                                    <path
                                        id="prefix__path3238"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M581.48 897.27c.64 4-.66 9.05-4.92 9.05-5.35 0-6.38-3.84-6.56-5.64a.92.92 0 01.81-1l1.66-.19a.91.91 0 011 .71c.38 1.52 1.22 2.27 2.44 2.27s1.94-1.84 1.94-3.26a8.28 8.28 0 00-2.39-5.43c-3.06-3.39-5-5.66-5-8 0-1.16.57-6.1 5.35-6.1 3.25 0 5.08 2.64 5.82 4a.91.91 0 01-.36 1.24l-1.54.84a.91.91 0 01-1.16-.25 7.29 7.29 0 00-2.2-1.94c-1.33-.51-2.21.84-1.85 2.55.53 2.72 6.05 5.55 6.96 11.15z"
                                    />
                                    <path
                                        id="prefix__path3240"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M596.92 905.56h-2.4a.9.9 0 01-.9-.76l-1.11-6.59c-.07-.42-.13-.76-.13-.76l-3.07-.06a4.79 4.79 0 00-.16.76l-1.08 6.55a.92.92 0 01-1 .76c-.57 0-1.33-.08-2-.08a.91.91 0 01-.89-1.06l3.92-23.21a.92.92 0 01.9-.76h3.52a.93.93 0 01.9.75l4.31 23.39a.9.9 0 01-.81 1.07zM592.16 894s-1.29-8.5-1.35-8.2l-1.36 8.2c0 .17-.08.32 0 .32l2.72-.05s.03-.14-.01-.27z"
                                    />
                                    <path
                                        id="prefix__path3242"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M607 905.59c-4.39 0-6.37-3.88-6.54-7-.19-3.56.11-14.46.22-17.58a.77.77 0 01.78-.74h2.22a.78.78 0 01.78.77s-.17 12.51 0 17.14c0 1 .51 3.51 2.71 3.51s2.31-2.52 2.35-3.49c.2-4.32 0-17.09 0-17.09a.78.78 0 01.78-.78h2.48a.78.78 0 01.78.78v16.58s.08 7.9-6.56 7.9z"
                                    />
                                    <path
                                        id="prefix__path3244"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M630.81 881.37l-4.29 22.92a1.26 1.26 0 01-1.25 1h-3.55a1.26 1.26 0 01-1.25-1.06l-3.83-23c-.13-.77.47-1.09 1.26-1.09h1.1c.59 0 1.1 0 1.23.59l3.38 18.73 3.32-18.63c.12-.59.64-.63 1.24-.63h1.38c.81.06 1.45.39 1.26 1.17z"
                                    />
                                    <path
                                        id="prefix__path3246"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M644.81 902l-.12 3.11a.38.38 0 01-.38.37l-10 .07a.39.39 0 01-.38-.39l.12-24.08a.39.39 0 01.38-.38h10a.39.39 0 01.4.39v2.86a.38.38 0 01-.37.38h-6.19a.39.39 0 00-.37.38v6a.45.45 0 00.45.38l4.47.14a.38.38 0 01.37.38v2.75a.4.4 0 01-.38.38l-4.46.11c-.21 0-.46.18-.45.4v5.94a.39.39 0 00.38.37h6.11a.38.38 0 01.42.44z"
                                    />
                                    <path
                                        id="prefix__path3248"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M659.57 880.87v2.65a.55.55 0 01-.55.55h-3.74l-.28 20.85a.54.54 0 01-.56.54h-2.53a.55.55 0 01-.54-.55l-.06-20.82h-3.85a.56.56 0 01-.54-.53l-.11-2.66a.54.54 0 01.54-.56H659a.54.54 0 01.57.53z"
                                    />
                                    <path
                                        id="prefix__path3250"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M673.2 902l-.12 3.11a.39.39 0 01-.39.37l-10 .07a.39.39 0 01-.39-.39l.13-24.08a.38.38 0 01.38-.38h10a.39.39 0 01.39.39v2.86a.4.4 0 01-.38.38h-6.19a.39.39 0 00-.37.38v6a.45.45 0 00.45.38l4.47.14a.37.37 0 01.37.38v2.75a.39.39 0 01-.38.38l-4.46.11c-.21 0-.46.18-.45.4l.05 5.94a.38.38 0 00.38.37h6.1a.39.39 0 01.41.44z"
                                    />
                                    <path
                                        id="prefix__path3252"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M683 905.59c-4.39 0-6.37-3.88-6.54-7-.2-3.56.11-14.46.22-17.58a.77.77 0 01.78-.74h2.22a.78.78 0 01.78.77s-.17 12.51 0 17.14c0 1 .51 3.51 2.71 3.51s2.31-2.52 2.35-3.49c.2-4.32 0-17.09 0-17.09a.78.78 0 01.78-.78h2.48a.78.78 0 01.78.78v16.58s.05 7.9-6.56 7.9z"
                                    />
                                    <path
                                        id="prefix__path3254"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M707.29 904c-.44.52-1.11 1.32-1.56 1.74a.74.74 0 01-.79.15c-4-1.71-6.45-5.57-7.59-7.9v6.52a.74.74 0 01-.73.74h-2.28a.73.73 0 01-.73-.74v-23.34a.72.72 0 01.73-.73h5.15c3.64 0 4.93 2.35 5.25 4.07a19.26 19.26 0 01.37 4.78c0 4.27-2.35 6-4.32 6.65a14.75 14.75 0 006.34 7.24.58.58 0 01.16.82zm-10-11.77s3.71.51 3.71-3c0-1.69.3-5.95-3.71-5.08z"
                                    />
                                    <path
                                        id="prefix__path3256"
                                        className="prefix__cls-27"
                                        transform="translate(-.65 -.12)"
                                        d="M721 897.27c.65 4-.65 9.05-4.92 9.05-5.35 0-6.37-3.84-6.56-5.64a.92.92 0 01.81-1l1.67-.19a.92.92 0 011 .71c.37 1.52 1.22 2.27 2.44 2.27s1.93-1.84 1.93-3.26a8.26 8.26 0 00-2.38-5.43c-3.07-3.39-5-5.66-5-8 0-1.16.57-6.1 5.36-6.1 3.24 0 5.08 2.64 5.82 4a.93.93 0 01-.37 1.24l-1.53.84a.92.92 0 01-1.17-.25 7.29 7.29 0 00-2.2-1.94c-1.33-.51-2.2.84-1.85 2.55.5 2.72 6.03 5.55 6.95 11.15z"
                                    />
                                </g>

                                <g opacity={zoneIsVisible('bouee_tube')} data-name="bouée tube">
                                    <path
                                        fill="#eaac2c"
                                        d="M865.06 608.61c-10.49-3.9-23.38-2.31-26.3 9.4-3.23 13-28 97.35-30.21 105.82s1.18 15.71 16.92 19.29 12.44-51.45 12.44-51.45z"
                                    ></path>
                                    <path
                                        fill="#fdd835"
                                        d="M878.07 625.82L847.39 735.1c-1.76 6.29-9.13 9.92-17.28 9a22.21 22.21 0 01-3.44-.67 22.94 22.94 0 01-4.12-1.55c-7-3.45-11-10-9.33-16.09l30.67-109.28c1.7-6.05 8.6-9.65 16.39-9.06l-2.7 9.6 7.61 2.08 2.73-9.74a19.67 19.67 0 017.71 5.92 12 12 0 012.44 10.51z"
                                    ></path>
                                    <path
                                        fill="#c23d20"
                                        d="M832.61 735.18l-2.5 8.89a22.21 22.21 0 01-3.44-.67 22.94 22.94 0 01-4.12-1.55l2.45-8.75zM865.41 608.37a3.33 3.33 0 003.25-2.31A3.46 3.46 0 00866 602a3.6 3.6 0 00-4.21 1.62 18.77 18.77 0 00-11.28-2.7 14.35 14.35 0 00-9.9 6.11c-2.53 3.18-2.56 7-2.61 11.41 0 5.63-.12 12-4.91 19.69-.26.42-.52.83-.79 1.2 0-5.79-2.73-9.3-6-10.34-3-.94-7 .2-9 4.89s-.46 9.73 3.5 11.55c3.72 1.71 7.4-.14 10.28-3.14a21 21 0 01-.42 2.26c-1.39 5.74-3.27 9.42-5 11.75-5.28 3.24-34 22.18-14.29 39.56a5.4 5.4 0 002.38-3.1c-2.87-1.19-5.68-8.23-2.65-14.63 2.59-5.47 11.84-15.4 14.59-20.31 2.08-2.45 4.31-6.46 5.89-13a24.61 24.61 0 00.63-3.78 23.42 23.42 0 001.71-2.41c4.91-7.87 5-14.65 5-20.09 0-4.28.08-8 2.44-11a13.51 13.51 0 019.27-5.75c5.1-.62 9.71 2 10.82 2.68a3.37 3.37 0 001.75 3.39 19 19 0 00-3-.36l-3.13 11.15 7.6 2.08 3.18-11.32a19.85 19.85 0 00-2.44-1.04zm-44.21 36.24c-3.07-1.41-5-5.7-3-10.43 1.52-3.54 4.54-5.32 7.59-4.48l.21.06c4.15 1.3 5.55 6 5.24 10.92-3.73 4.51-7.52 5.09-10.04 3.93zm41.3-40.24a2.6 2.6 0 013.26-1.59 2.54 2.54 0 012 3 2.6 2.6 0 01-3.26 1.6 2.56 2.56 0 01-2-3.01z"
                                    ></path>
                                    <path
                                        fill="#a1321a"
                                        d="M825.66 656.25s-32.13 23.43-12.78 38.22a3.86 3.86 0 01-1.51 1.34s-22.69-15.81 14.29-39.56z"
                                    ></path>
                                    <path
                                        fill="none"
                                        stroke="#eaac2c"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="0.755"
                                        d="M828.83 672.6H847.37V732.0600000000001H828.83z"
                                        transform="rotate(16.6 838.254 702.527)"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M836.74 721.28a.85.85 0 01.42 0 .82.82 0 01.42.32.89.89 0 01.06.73 1.25 1.25 0 01-.35.57 2.57 2.57 0 01-2.67.32 1.09 1.09 0 00-.91.09 1.51 1.51 0 00-.59.87l-.79 2.66 2.76.82a1 1 0 01.56.39.71.71 0 01.08.62 1.19 1.19 0 01-.46.65.83.83 0 01-.71.12l-8.22-2.44a.93.93 0 01-.54-.43.85.85 0 01-.06-.7l1.22-4.09a2.62 2.62 0 01.81-1.27 3 3 0 011.4-.72 3.32 3.32 0 011.68.07 3 3 0 011.28.8 3.17 3.17 0 01.77 1.32 2.26 2.26 0 012-.49 3 3 0 01.45.09 5 5 0 00.67.08.51.51 0 00.37-.17.82.82 0 01.35-.21zm-5 1.44a1.92 1.92 0 00-.53-.59 2.76 2.76 0 00-.82-.42 1.75 1.75 0 00-.78-.06 1.57 1.57 0 00-.65.24.82.82 0 00-.35.44l-.93 3.11 3.23 1 .92-3.11a.71.71 0 00-.13-.61zM838.81 713.28a.79.79 0 01.65-.08.77.77 0 01.51.42.91.91 0 010 .69l-1.42 4.76a.89.89 0 01-1.12.61l-8.21-2.45a.9.9 0 01-.55-.44.83.83 0 01-.06-.69l1.42-4.76a.9.9 0 01.41-.55.85.85 0 01.68-.07.77.77 0 01.51.42.9.9 0 010 .69l-1.15 3.85 2.42.72 1-3.21a.9.9 0 01.41-.55.85.85 0 01.68-.07.79.79 0 01.51.41 1 1 0 010 .69l-1 3.22 2.63.78 1.15-3.85a.84.84 0 01.53-.54zM841.06 710.39a4.5 4.5 0 01-1.32 1.24 1 1 0 01-.86.16.88.88 0 01-.51-.42.82.82 0 01-.07-.65.81.81 0 01.31-.44 4.15 4.15 0 001-.9 3.65 3.65 0 00.59-1.22 2.56 2.56 0 000-1.47 1.06 1.06 0 00-.71-.84 1.17 1.17 0 00-1.17.27 5 5 0 00-1.08 1.64q-1.38 3-3.83 2.25a2.73 2.73 0 01-1.42-.94 3.12 3.12 0 01-.62-1.58 4.67 4.67 0 01.19-1.9 5.33 5.33 0 01.77-1.61 4.25 4.25 0 011.1-1.1 1 1 0 01.88-.19.86.86 0 01.5.42.77.77 0 01.08.64.6.6 0 01-.24.34 4.16 4.16 0 00-.86.87 3.82 3.82 0 00-.6 1.11 2.6 2.6 0 00-.08 1.49 1.08 1.08 0 00.73.75 1.06 1.06 0 001.07-.23 5 5 0 001-1.43 8.31 8.31 0 011.13-1.79 2.6 2.6 0 011.24-.83 2.89 2.89 0 011.63.08 2.68 2.68 0 011.42 1 3.33 3.33 0 01.64 1.65 4.47 4.47 0 01-.18 1.91 6.36 6.36 0 01-.73 1.72zM836.76 693.31a1 1 0 01.52.39.74.74 0 01.12.67 1.18 1.18 0 01-.27.45 3.61 3.61 0 00-.78 1.41 3.47 3.47 0 00-.09 1.85 2.89 2.89 0 00.84 1.49 3.79 3.79 0 001.62.92 3.52 3.52 0 002.81-.14 3.42 3.42 0 001.57-2.11 3.34 3.34 0 00.12-1.61 1.21 1.21 0 010-.48.81.81 0 01.5-.54 1 1 0 01.64 0 .88.88 0 01.38.24.82.82 0 01.19.41 5.43 5.43 0 01-.15 2.53 5.9 5.9 0 01-1.35 2.38 4.7 4.7 0 01-2.3 1.34 5.5 5.5 0 01-3-.13 5.39 5.39 0 01-2.41-1.44 5 5 0 01-1.25-2.36 5.55 5.55 0 01.14-2.82 5.26 5.26 0 011.25-2.18.8.8 0 01.9-.27zM838.51 683.86a.91.91 0 01.69-.05l5.15 1.54a4.5 4.5 0 011.94 1.12 3.78 3.78 0 011 1.81 4.57 4.57 0 01-1.22 4.1 3.71 3.71 0 01-1.84 1 4.43 4.43 0 01-2.24-.13l-5.14-1.53a.83.83 0 01-.54-.44 1 1 0 01-.06-.73.92.92 0 01.43-.52.89.89 0 01.7-.07l5.14 1.53a2.52 2.52 0 001.3.07 2.22 2.22 0 001.06-.56 2.36 2.36 0 00.61-1 2.57 2.57 0 00.06-1.23 2.36 2.36 0 00-1.69-1.78l-5.14-1.54a.91.91 0 01-.56-.4.86.86 0 01.35-1.17zM849.41 677.74a.79.79 0 01.65-.08.77.77 0 01.51.42 1 1 0 010 .69l-1.42 4.76a.89.89 0 01-1.12.61l-8.22-2.45a.88.88 0 01-.54-.44.87.87 0 01-.07-.69l1.42-4.76a1 1 0 01.42-.55.84.84 0 01.68-.07.78.78 0 01.5.42 1 1 0 010 .69l-1.15 3.85 2.41.72 1-3.21a1 1 0 01.42-.55.84.84 0 01.68-.07.76.76 0 01.5.42 1 1 0 010 .69l-1 3.21 2.63.78 1.15-3.85a.81.81 0 01.55-.54zM849.54 650.4a3.15 3.15 0 00-1.45-.17 3.5 3.5 0 00-2.37 1.44 6.44 6.44 0 00-1.16 2.8 3 3 0 00-.84 1.85 8.41 8.41 0 000 2.64 8.51 8.51 0 00-1.44 2.21 3 3 0 00-.27 2 6.24 6.24 0 00-.52 3 3.49 3.49 0 001.24 2.48 3.13 3.13 0 001.31.63 3.37 3.37 0 003.16-1.28l.25-.29.34.44a8.21 8.21 0 002.3 2.11 3.32 3.32 0 002.35.48 3.73 3.73 0 002.43-2 4.63 4.63 0 00.51-1.18 5.55 5.55 0 00.21-1.15 5.18 5.18 0 00-.67-3.09 2.79 2.79 0 00-2.12-1.44 2.44 2.44 0 00-1.33.29 2.06 2.06 0 00-.94 1.15 3.26 3.26 0 00-.1 1.73 3.11 3.11 0 00.88 1.6 3.2 3.2 0 01-.56-1.19 2.81 2.81 0 01.24-2 1.54 1.54 0 01.58-.63 1.87 1.87 0 011.92.13l.14.08c1 .61 1.37 2.22.93 3.81a4.29 4.29 0 01-1.37 2.2 2.11 2.11 0 01-1.91.52 3.52 3.52 0 01-1.51-.75l-.32-.28a9.72 9.72 0 01-1.34-1.72 10.1 10.1 0 001.2-3 10.58 10.58 0 00.25-2.83v-.08a1.79 1.79 0 010-.23l.14-.18.05-.07a10.73 10.73 0 001.9-5.72 9.39 9.39 0 012-.74h.05a2.63 2.63 0 01.42-.07 3.49 3.49 0 011.68.17 2.11 2.11 0 011.34 1.46 4.32 4.32 0 010 2.59c-.48 1.58-1.66 2.73-2.83 2.73h-.15a2.36 2.36 0 01-1.2-.36 2.11 2.11 0 01-.23-.19 1.61 1.61 0 01-.21-.3 1.56 1.56 0 01-.16-.78 2.8 2.8 0 01.89-1.89 3 3 0 011.13-.72h-.06a3.24 3.24 0 00-2.44 2.4 2.11 2.11 0 00.18 1.48 2.39 2.39 0 001 .95 2.77 2.77 0 002.56-.09 5.17 5.17 0 002.21-2.25 5.3 5.3 0 00.44-1.09 5.71 5.71 0 00.21-1.27 3.75 3.75 0 00-1-3 3.33 3.33 0 00-2.24-.85 8.22 8.22 0 00-3.07.56l-.52.2-.06-.38a3.38 3.38 0 00-2.05-2.87zm-4.21 5.08a.8.8 0 01.68.11l.18.11a2.44 2.44 0 01.6.6c-.66.49-1.31 1-2 1.59-.1-1.35.09-2.23.54-2.41zm-2.09 7.26c-.29-.4 0-1.24.86-2.31q.36 1.25.81 2.4a2.64 2.64 0 01-.83.18h-.21a.78.78 0 01-.63-.27zm3.79 4.35a3.55 3.55 0 01-1.77 1.6 2.35 2.35 0 01-1.41 0c-1.61-.47-2.4-2.63-1.77-4.82v-.09c0-.1.06-.19.1-.29a1.09 1.09 0 00.13.17c.48.54 1.37.64 2.51.29l.46-.17a22.22 22.22 0 001.72 3.31zm1.27-5.09a11.6 11.6 0 01-.71 3.93 24.43 24.43 0 01-1.26-2.61 11.11 11.11 0 002-1.43zm-.1-1.77a9.57 9.57 0 01-2.27 2 22.72 22.72 0 01-.87-2.95 21.61 21.61 0 012.31-2 9.82 9.82 0 01.83 2.96zm1-1.44l-.06.1a11.35 11.35 0 00-.89-2.25 22.61 22.61 0 012.45-1.53 11.37 11.37 0 01-1.47 3.69zm1.63-5a21.35 21.35 0 00-3.2 1.84 3.57 3.57 0 00-.3-.38c-.77-.91-1.58-1.3-2.27-1.1l-.2.07c0-.1 0-.19.07-.29a.36.36 0 000-.1c.64-2.19 2.46-3.59 4.06-3.13a2.38 2.38 0 011.18.79 3.58 3.58 0 01.69 2.34z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M849.48 647.98L848.46 647.68 848.84 646.4 848.49 646.3 848.11 647.58 847.38 647.36 847.8 645.93 847.45 645.82 846.91 647.63 849.37 648.36 849.48 647.98z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M850.55 644.52a1.3 1.3 0 00-.89-1.64 1.28 1.28 0 00-1.64.88 1.3 1.3 0 00.89 1.64 1.29 1.29 0 001.64-.88zm-2.23-.67A1 1 0 11849 645a.91.91 0 01-.65-1.14zm2.17.65z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M849.47 641.34L851.72 640.44 851.8 640.14 849.35 639.41 849.24 639.78 851.02 640.31 848.83 641.19 848.73 641.52 851.18 642.25 851.29 641.88 849.47 641.34z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M851.55 636.5a1.27 1.27 0 00-1.61.94l-.26.88 2.45.73.26-.88a1.27 1.27 0 00-.84-1.67zm-1.31 1a.91.91 0 111.75.52l-.15.5-1.74-.52.14-.5zM852.54 635.4l.36-1.22.7-.09.12-.41-2.8.4-.1.32 2.14 1.86.12-.4zm-.3-.26l-.87-.75 1.14-.15z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M851.98 631.88L854.07 632.5 854.19 632.12 852.09 631.5 852.33 630.7 851.97 630.6 851.39 632.57 851.74 632.67 851.98 631.88z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M853.34 628.55H853.73V631.1099999999999H853.34z"
                                        transform="rotate(-73.46 853.599 629.823)"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M855.53 627.74a1.32 1.32 0 10-1.64.88 1.28 1.28 0 001.64-.88zm-2.23-.66h.05a.91.91 0 011.18-.6.94.94 0 01.57.44.9.9 0 01.08.7.91.91 0 01-1.18.6 1 1 0 01-.57-.43.92.92 0 01-.08-.71zm2.18.65z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M856.27 625.1L854.45 624.57 856.7 623.66 856.79 623.37 854.33 622.64 854.22 623.01 856 623.53 853.81 624.41 853.71 624.75 856.16 625.48 856.27 625.1z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M852.15 647.14a.86.86 0 00-1.08.7l-.28.94 2.45.73.11-.38-.83-.24.16-.52a.91.91 0 00-.53-1.23zm-.79.81c.11-.37.34-.53.63-.45a.42.42 0 01.29.26.75.75 0 010 .47l-.16.53-.92-.27.16-.54zM853.32 645.88l.18-.59 1.11-.41.14-.47-1.19.45a.75.75 0 00-.55-.81c-.45-.14-.86.13-1 .68l-.32 1.07 2.45.73.11-.38zm-1-1h.06c.1-.35.31-.51.57-.43s.37.34.27.68l-.2.67-.84-.25.2-.67h-.06z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M853.7 641.51H854.09V644.0699999999999H853.7z"
                                        transform="rotate(-73.7 849.605 642.777)"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M853.63 639.2L855.41 639.72 853.22 640.6 853.12 640.93 855.57 641.66 855.68 641.29 853.86 640.75 856.11 639.85 856.19 639.55 853.74 638.83 853.63 639.2z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M856.49 636.22a1.05 1.05 0 01.11.82.91.91 0 01-1.17.59 1 1 0 01-.58-.44.88.88 0 01-.07-.69 1 1 0 01.51-.62h.05l-.2-.34a1.41 1.41 0 00-.67.85 1.3 1.3 0 00.9 1.63 1.28 1.28 0 001.63-.87 1.33 1.33 0 00-.13-1.11l-.32.18zm.41.91z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M857.29 634.58L856.58 634.37 856.96 633.08 856.61 632.97 856.23 634.26 855.54 634.06 855.97 632.62 855.62 632.51 855.08 634.33 857.53 635.06 858.07 633.22 857.72 633.12 857.29 634.58z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M857.28 630.74c-.28.52-.43.53-.58.48s-.27-.28-.2-.55a1.1 1.1 0 01.44-.57l-.23-.31a1.34 1.34 0 00-.55.78.93.93 0 000 .64.62.62 0 00.43.39c.46.14.72-.14 1-.62s.41-.5.56-.45a.3.3 0 01.21.2.61.61 0 010 .38 1.12 1.12 0 01-.55.67l.21.32a1.51 1.51 0 00.68-.89.81.81 0 00-.47-1.08c-.37-.13-.66.08-.95.61zm1.37.46zM858.13 627.89c-.29.52-.43.53-.59.48s-.27-.28-.19-.55a1.08 1.08 0 01.43-.57h.05l-.22-.31h-.05a1.36 1.36 0 00-.56.78 1 1 0 000 .65.65.65 0 00.43.38c.46.14.73-.14 1-.61s.4-.5.56-.46a.32.32 0 01.21.2.61.61 0 010 .38 1.17 1.17 0 01-.55.68l.21.32a1.51 1.51 0 00.68-.89.81.81 0 00-.46-1.08c-.37-.11-.66.07-.95.6zm1.37.46z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M859.17 625.65L859.55 624.36 859.2 624.25 858.82 625.54 858.13 625.34 858.56 623.9 858.21 623.79 857.66 625.61 860.12 626.34 860.66 624.51 860.31 624.4 859.88 625.86 859.17 625.65z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M857.49 649.54a1.39 1.39 0 00-.14-1.12l-.33.18v.05a1.05 1.05 0 01.11.82.91.91 0 01-1.13.53 1 1 0 01-.58-.44.87.87 0 01-.08-.69 1 1 0 01.52-.61l-.2-.34a1.32 1.32 0 00-.67.84 1.32 1.32 0 002.53.77zm-.06 0z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M856.14 644.96L857.18 645.27 856.8 646.52 855.76 646.21 855.65 646.59 858.1 647.32 858.22 646.94 857.16 646.63 857.53 645.37 858.59 645.69 858.7 645.31 856.25 644.58 856.14 644.96z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M859 642.06l.7-.09.12-.41-2.82.44-.09.32 2.13 1.86.12-.39-.54-.47zm-.39.05l-.27.91-.87-.76zM859.36 639.73l.18-.59 1.11-.41.14-.47-1.19.45a.75.75 0 00-.55-.81c-.45-.14-.86.13-1 .68l-.32 1.07 2.45.73.11-.38zm-1-1h.06c.1-.35.31-.51.57-.43s.37.35.27.68l-.2.67-.84-.25.2-.67h-.06z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M861.29 635.28L860.9 636.61 858.8 635.99 858.69 636.36 861.14 637.09 861.65 635.38 861.29 635.28z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M859.82 632.21L859.09 632.43 859.15 632.87 859.72 632.55 859.82 632.21z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M862.21 632.21L861.77 633.67 861.07 633.46 861.45 632.17 861.1 632.06 860.71 633.35 860.02 633.15 860.45 631.71 860.1 631.6 859.56 633.42 862.01 634.15 862.56 632.31 862.21 632.21z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M863.05 630.67L861.23 630.13 863.48 629.22 863.56 628.93 861.11 628.2 861 628.57 862.77 629.1 860.58 629.98 860.49 630.31 862.94 631.04 863.05 630.67z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M863.74 627.04L863.03 626.83 863.42 625.54 863.07 625.43 862.68 626.72 861.99 626.52 862.42 625.08 862.07 624.97 861.53 626.79 863.98 627.52 864.53 625.68 864.17 625.58 863.74 627.04z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M858.79 650.21l-.26.87 2.45.73.26-.88a1.4 1.4 0 00-.07-1 1.24 1.24 0 00-.77-.62 1.28 1.28 0 00-1.61.9zm.3.08h.06a.91.91 0 111.74.52l-.15.5-1.74-.52.15-.5h-.06z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M861.65 648.29L860.94 648.08 861.32 646.78 860.97 646.68 860.59 647.97 859.9 647.77 860.33 646.33 859.98 646.22 859.44 648.04 861.89 648.77 862.43 646.93 862.08 646.83 861.65 648.29z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M861.25 641.94L862.23 643.14 860.75 643.61 860.65 643.96 863.1 644.69 863.21 644.32 861.44 643.79 862.8 643.35 862.82 643.28 861.92 642.17 863.69 642.69 863.8 642.32 861.35 641.59 861.25 641.94z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M861.94 639.46a1.25 1.25 0 00.11 1 1.34 1.34 0 00.78.62 1.29 1.29 0 001.64-.88 1.27 1.27 0 00-.11-1 1.34 1.34 0 00-.78-.62 1.29 1.29 0 00-1.64.88zm.43.81a.9.9 0 01-.08-.7.93.93 0 011.18-.61 1 1 0 01.57.44.9.9 0 01.08.7.93.93 0 01-1.18.61.94.94 0 01-.57-.44zm2-.07z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M863.12 635.62L864.9 636.14 862.71 637.02 862.61 637.36 865.06 638.09 865.17 637.71 863.35 637.17 865.6 636.27 865.68 635.98 863.23 635.25 863.12 635.62z"
                                    ></path>
                                    <path
                                        fill="#eaac2c"
                                        d="M863.77 633.39l2.13 1.86.12-.4-.54-.46.36-1.22.7-.09.13-.41-2.81.4zm1.68-.16l-.27.9-.87-.75zM866.76 630a1 1 0 01.1.82.91.91 0 01-1.17.59 1 1 0 01-.57-.44.87.87 0 01-.08-.69 1 1 0 01.52-.62h.05l-.2-.33a1.37 1.37 0 00-.67.85 1.32 1.32 0 002.53.76 1.36 1.36 0 00-.14-1.11v-.05l-.32.18zm.4.92zM865.53 627.36a1.31 1.31 0 00.11 1 1.35 1.35 0 00.79.61 1.28 1.28 0 001.63-.88 1.27 1.27 0 00-.11-1 1.36 1.36 0 00-.78-.61 1.28 1.28 0 00-1.64.88zm.35.11a.91.91 0 011.18-.6 1 1 0 01.57.43.94.94 0 11-1.75.17zm2.13.63z"
                                    ></path>
                                </g>
                                <g opacity={zoneIsVisible('jetski')} id="prefix__jetski">
                                    <path
                                        id="prefix__path3445"
                                        className="prefix__cls-71"
                                        transform="translate(-.65 -.12)"
                                        d="M1147.9 211.62c1.94 1.94-3.58 6.42-7.17 5.82s-2.39 5.67-2.39 5.67 3.4 1.41 5.58.93 9.5-3.77 9.5-3.77l-.75-6.26z"
                                    />
                                    <path
                                        id="prefix__path3447"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1161.4 226c-.45.15-15.22.59-15.22.59l-2.14-2.59-2.89-3.32c3.43-.3 9.55-1.64 7.76-3.43s-9.1-6.42-6.42-9.55c.16-.19.33-.37.49-.54 2.61-2.75 5.79-3.82 8.17.39 2.54 4.48 7.17 6.27 9.85 6.86v6.87s4.7-1.18 5.86.45-5.01 4.07-5.46 4.27z"
                                    />
                                    <path
                                        id="prefix__path3449"
                                        className="prefix__cls-73"
                                        transform="translate(-.65 -.12)"
                                        d="M1150.3 219.53c-1.07 1.81-4.5 3.62-6.37 4.51l-2.89-3.32c3.43-.3 9.55-1.64 7.76-3.43s-9.1-6.42-6.42-9.55c.16-.19.33-.37.49-.54a4.15 4.15 0 002.2 5.16c3.58 1.8 6.72 4.64 5.23 7.17z"
                                    />
                                    <path
                                        id="prefix__path3451"
                                        transform="translate(-.65 -.12)"
                                        d="M1183.7 225.78c5.1 1.11 17.88 3.1 26.67 4.14 12.84 1.51 24.4 2.6 21.48-1.67l-22.89-4.93-34.35-8.2s-17.51-5.27-15.6-7.86c-4.16 2.47-5.06 6.4-1.24 9.77s12.27 5.79 25.93 8.75z"
                                        fill="#c69742"
                                    />
                                    <path
                                        id="prefix__path3453"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1230.9 228.48c-6.67.67-46.34-4.86-60-9.33-11.15-3.65-15.34-9.29-12-11.89a6.13 6.13 0 012.7-1c6.94-1.13 22.84 1.84 33.1 3.66 12 2.13 32.78 6.62 34.46 7.52s-1 6.62-.11 9.31c.31.05.61.1.88.16 1.97.49 2.93 1.37.97 1.57z"
                                    />
                                    <path
                                        id="prefix__path3455"
                                        className="prefix__cls-76"
                                        transform="translate(-.65 -.12)"
                                        d="M1230 227c-1.92.07-4.72 0-6.27-1-2.51-1.56 3.64-4.6-1.73-8.06-4.84-3.12-49.56-10.94-60.33-11.59 6.94-1.13 22.84 1.84 33.1 3.66 12 2.13 32.78 6.62 34.46 7.52s-1 6.62-.11 9.31c.31 0 .61.05.88.16z"
                                    />
                                    <path
                                        id="prefix__path3457"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1185.4 221.07h-.09a.54.54 0 01-.53-.46 5.75 5.75 0 00-4.41-4.38 5.82 5.82 0 00-6.09 2.49.53.53 0 01-.65.2l-.1-.05a.55.55 0 01-.15-.75 6.9 6.9 0 017.24-2.94 7.18 7.18 0 012.38 1.05 6.53 6.53 0 012.85 4.21.55.55 0 01-.45.63z"
                                    />
                                    <path
                                        id="prefix__path3459"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1200.6 223.56a.53.53 0 01-.49.58h-.05a.53.53 0 01-.53-.49 5.16 5.16 0 00-4.62-4.6c-1.77-.25-5.19.71-5.92 2.32a.55.55 0 01-.72.27h-.08a.53.53 0 01-.19-.66c1-2.15 4.89-3.25 7.06-2.94a6.83 6.83 0 013.94 2 5.84 5.84 0 011.6 3.52z"
                                    />
                                    <path
                                        id="prefix__path3461"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1214.7 226.06h-.09a.54.54 0 01-.53-.45 5.55 5.55 0 00-4.77-4.11 7 7 0 00-6.07 3 .54.54 0 01-.6.24.59.59 0 01-.14-.06.53.53 0 01-.18-.74 8.06 8.06 0 017.07-3.5 6.5 6.5 0 013.57 1.56 5.89 5.89 0 012.17 3.49.53.53 0 01-.43.57z"
                                    />
                                    <path
                                        id="prefix__path3463"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1229.1 228h-.13a.54.54 0 01-.53-.44 4.9 4.9 0 00-4.85-3.94c-2.05-.14-4.71.77-5.43 2.47a.53.53 0 01-.7.29.54.54 0 01-.29-.71c.83-2 3.62-3.32 6.49-3.13a6.73 6.73 0 013.72 1.33 5.76 5.76 0 012.12 3.48.54.54 0 01-.4.65z"
                                    />
                                    <path
                                        id="prefix__path3465"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1169.4 215.63c-1.29-.28-1.84 1.58-.26 1.58s1.49-1.32.26-1.58z"
                                    />
                                    <path
                                        id="prefix__path3467"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1164.4 215.54a.54.54 0 11-1.08 0c0-4.78-1.84-5.72-2.94-5.86a2.26 2.26 0 00-2.73 1.91.55.55 0 01-.33.42.55.55 0 01-.74-.58 3.39 3.39 0 011.13-2.07 3.45 3.45 0 012.8-.75 3.73 3.73 0 012.83 2 10 10 0 011.06 4.93z"
                                    />
                                    <path
                                        id="prefix__path3469"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1164.1 206.35v.34a.54.54 0 11-1.08 0v-.46c.07-.58.2-1.77-.24-2.17a1.16 1.16 0 00-1-.09c-2.41.57-4.12 2.81-4 4.45a.54.54 0 01-.51.56.51.51 0 01-.25-.06.55.55 0 01-.29-.45c-.1-2.32 2.18-4.92 4.89-5.55a2.36 2.36 0 011.58.1 1.41 1.41 0 01.35.23c.82.75.64 2.29.55 3.1z"
                                    />
                                    <path
                                        id="prefix__path3471"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1168.1 207c-1.4-.38-2.19-2-1-2.28a1.79 1.79 0 012.19 1.32c-.05.74-.23 1.26-1.19.96z"
                                    />
                                    <path
                                        id="prefix__path3473"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1184.1 209.15h-.07a.55.55 0 01-.54-.47c-.14-1.13-.94-3.82-5.23-4.36-1.81-.22-4.88 1.37-5.67 2.95a.49.49 0 01-.35.28.48.48 0 01-.37 0 .52.52 0 01-.29-.56.23.23 0 010-.11c1-2 4.48-3.82 6.77-3.54a10 10 0 011.33.27c1.8.49 4.42 1.76 4.83 5a.53.53 0 01-.41.54z"
                                    />
                                    <path
                                        id="prefix__path3475"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1198.9 211.27a.54.54 0 01-.54.52.55.55 0 01-.51-.57c.07-1.5-1.91-3.89-4.33-4.53a4.69 4.69 0 00-6 2.69.54.54 0 01-.41.3.54.54 0 01-.56-.78 5.74 5.74 0 017.2-3.26 5 5 0 01.65.22c2.49.95 4.61 3.42 4.5 5.41z"
                                    />
                                    <path
                                        id="prefix__path3477"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1212.9 214.67h-.09a.54.54 0 01-.53-.45c-.57-3.3-3.57-4.23-4.83-4.47-2.19-.42-5 .72-5.62 2.3a.54.54 0 01-.47.34.59.59 0 01-.23 0 .54.54 0 01-.3-.7 4.88 4.88 0 012.85-2.5 7.29 7.29 0 014-.46 8.69 8.69 0 011.94.6 6.27 6.27 0 013.75 4.75.53.53 0 01-.47.59z"
                                    />
                                    <path
                                        id="prefix__path3479"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1227 217.83h-.06a.55.55 0 01-.54-.47 5.83 5.83 0 00-4.55-4.62c-2.28-.39-5.17.48-5.6 2.23a.54.54 0 01-.66.39.53.53 0 01-.39-.65c.6-2.41 4-3.52 6.83-3a6.33 6.33 0 012.4 1 6.71 6.71 0 013 4.58.54.54 0 01-.43.54z"
                                    />
                                    <path
                                        id="prefix__path3481"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1153.9 209.78a4.44 4.44 0 01-3-.92 1.32 1.32 0 01-.49-1.3 1.21 1.21 0 011-.85c1.93-.45 5 .09 6.16 1.46a.63.63 0 01.11.56.61.61 0 01-.39.42 10.3 10.3 0 01-3.39.63zm-2.45-1.94a.75.75 0 00.34.36c.72.49 2.21.76 4.33.18a7.13 7.13 0 00-4.48-.62.5.5 0 00-.19.08z"
                                    />
                                    <path
                                        id="prefix__path3483"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1179.8 203.53c-4-.14-6 1.4-6.75 2.34a2.51 2.51 0 00-.73 1.52.32.32 0 010 .17.48.48 0 01-.37 0 .52.52 0 01-.29-.56.23.23 0 010-.11c1-2 4.48-3.82 6.77-3.54a10 10 0 011.37.18z"
                                    />
                                    <path
                                        id="prefix__path3485"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1163.2 203a6.1 6.1 0 00-4.55 2.1 5.27 5.27 0 00-1.35 3.37.37.37 0 01-.28.43.55.55 0 01-.29-.45c-.1-2.32 2.18-4.92 4.89-5.55a2.36 2.36 0 011.58.1z"
                                    />
                                    <path
                                        id="prefix__path3487"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1194.4 205.86c-3.17-.69-5 .27-6 1.23a3.77 3.77 0 00-1.27 2.36.36.36 0 010 .23.54.54 0 01-.56-.78 5.74 5.74 0 017.2-3.26 5 5 0 01.63.22z"
                                    />
                                    <path
                                        id="prefix__path3489"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1209.6 209.3h-.13c-4-1-6.15.3-7.07 1.18a2.84 2.84 0 00-1 1.76.33.33 0 010 .17.59.59 0 01-.23 0 .54.54 0 01-.3-.7 4.88 4.88 0 012.85-2.5 7.29 7.29 0 014-.46 8.69 8.69 0 011.88.55z"
                                    />
                                    <path
                                        id="prefix__path3491"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1224.4 212.65a7.16 7.16 0 00-7.59.51c-.81.65-1.19 1.38-1 2a.35.35 0 010 .25.55.55 0 01-.22 0 .53.53 0 01-.39-.65c.6-2.41 4-3.52 6.83-3a6.33 6.33 0 012.37.89z"
                                    />
                                    <path
                                        id="prefix__path3493"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1227.4 223.87a.28.28 0 01-.12 0 7.82 7.82 0 00-7.58-.23 3.42 3.42 0 00-2 2.74.22.22 0 010 .08.54.54 0 01-.54-.75c.83-2 3.62-3.32 6.49-3.13a6.73 6.73 0 013.75 1.29z"
                                    />
                                    <path
                                        id="prefix__path3495"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1213 222a7.57 7.57 0 00-6.44-.82 5.72 5.72 0 00-3.83 3.48.34.34 0 01-.06.12.59.59 0 01-.14-.06.53.53 0 01-.18-.74 8.06 8.06 0 017.07-3.5A6.5 6.5 0 011213 222z"
                                    />
                                    <path
                                        id="prefix__path3497"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1199 220a.27.27 0 01-.17-.06 8 8 0 00-7.28-1.27 5.05 5.05 0 00-3.36 3 .53.53 0 01-.19-.66c1-2.15 4.89-3.25 7.06-2.94A6.83 6.83 0 011199 220z"
                                    />
                                    <path
                                        id="prefix__path3499"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1183 216.24a7.9 7.9 0 00-6-.46 5 5 0 00-3.4 3.1v.05l-.1-.05a.55.55 0 01-.15-.75 6.9 6.9 0 017.24-2.94 7.18 7.18 0 012.41 1.05z"
                                    />
                                    <path
                                        id="prefix__path3501"
                                        className="prefix__cls-78"
                                        transform="translate(-.65 -.12)"
                                        d="M1163.4 210.58c-1.22-1.6-2.82-2.14-4.33-1.45a2.6 2.6 0 00-1.68 2.67.38.38 0 010 .21.55.55 0 01-.74-.58 3.39 3.39 0 011.13-2.07 3.45 3.45 0 012.8-.75 3.73 3.73 0 012.82 1.97z"
                                    />
                                    <path
                                        id="prefix__path3503"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1168.6 228.2a37 37 0 01-2.82 4.36 24.81 24.81 0 01-3.62 4c-3.76 3.22-35.43 4.29-60.39 4.29s-55.43 1.75-64.15-.13c-6.6-1.42-9.28-4.22-10.83-6a10.26 10.26 0 00-1.25-1.28c-1.48-1.07-4.56-.27-5.1-1.61a4.27 4.27 0 00-3.76-2.82c-1.88 0-1.21-1.21-.94-2.28z"
                                    />
                                    <path
                                        id="prefix__path3505"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1022.3 230.93c-1.09.8-2.48 3.58.5 5.86-.6-1.49-2.18-3.57-.3-4.57s-.2-1.29-.2-1.29z"
                                    />
                                    <path
                                        id="prefix__path3507"
                                        className="prefix__cls-76"
                                        transform="translate(-.65 -.12)"
                                        d="M1083 237.65a11.29 11.29 0 00-.81-1.08 3.52 3.52 0 00-.73-.53 2.21 2.21 0 001.36-.64 1.82 1.82 0 00.43-1.26 1.92 1.92 0 00-.32-1.06 1.58 1.58 0 00-.81-.63 5 5 0 00-1.61-.16h-2.92l.06 3.79v2.94h1.4v-2.81h.28a2.13 2.13 0 01.7.06 1.19 1.19 0 01.43.27 11.66 11.66 0 01.75 1l1 1.45h1.67zm-3-4.23a9.06 9.06 0 011 0 .85.85 0 01.52.25.82.82 0 01.2.55.92.92 0 01-.13.51.87.87 0 01-.39.29 5.35 5.35 0 01-1.25.1h-1v-1.71z"
                                    />
                                    <path
                                        id="prefix__path3509"
                                        className="prefix__cls-76"
                                        transform="translate(-.65 -.12)"
                                        d="M1090.3 237.71l-3.85.07v-1.83h.52l2.94-.05v-1.13l-3.45.06v-1.49l3.72-.06v-1.14l-5.11.08-.03 3.78v3l5.24-.08z"
                                    />
                                    <path
                                        id="prefix__path3511"
                                        className="prefix__cls-76"
                                        transform="translate(-.65 -.12)"
                                        d="M1096.9 235.75a1.89 1.89 0 00-.78-.67 6.6 6.6 0 00-1.5-.46 3.89 3.89 0 01-1.29-.43.51.51 0 01-.21-.41.49.49 0 01.21-.42 1.62 1.62 0 011-.26 1.52 1.52 0 01.88.21 1.18 1.18 0 01.4.74l1.39-.08a1.94 1.94 0 00-.72-1.47 2.92 2.92 0 00-2-.52 3.57 3.57 0 00-1.35.25 1.86 1.86 0 00-.85.7 1.69 1.69 0 00-.28 1 1.72 1.72 0 00.65 1.34 3.68 3.68 0 001.46.61h.13c.58.13 1 .22 1.11.28a1.1 1.1 0 01.51.28.62.62 0 01.15.4.85.85 0 01-.33.66 1.54 1.54 0 01-1 .29 1.52 1.52 0 01-1-.29 1.54 1.54 0 01-.51-1l-1.36.15a2.57 2.57 0 00.87 1.7 3 3 0 002 .56 4 4 0 001.5-.27 2 2 0 00.92-.77 1.93 1.93 0 00.31-1.08 2 2 0 00-.31-1.04z"
                                    />
                                    <path
                                        id="prefix__path3513"
                                        className="prefix__cls-76"
                                        transform="translate(-.65 -.12)"
                                        d="M1103.2 236.16a2 2 0 01-.56 1.1 1.43 1.43 0 01-.94.36 1.6 1.6 0 01-1.24-.53 2.42 2.42 0 01-.48-1.39v-.42a2.59 2.59 0 01.45-1.74 1.59 1.59 0 011.24-.56 1.47 1.47 0 01.95.29 1.42 1.42 0 01.52.81l1.37-.34a2.63 2.63 0 00-.72-1.23 2.89 2.89 0 00-2.07-.69 3.06 3.06 0 00-2.32 1 3.69 3.69 0 00-.85 2.63v.31a3.33 3.33 0 00.91 2.18 3 3 0 002.27.88 2.73 2.73 0 002.83-2.22z"
                                    />
                                    <path
                                        id="prefix__path3515"
                                        className="prefix__cls-76"
                                        transform="translate(-.65 -.12)"
                                        d="M1111.7 235.46v-.16l-.06-3.53h-1.39l.06 3.7a8.27 8.27 0 010 1.14 1 1 0 01-.36.59 1.43 1.43 0 01-.89.25 1.52 1.52 0 01-.92-.24 1 1 0 01-.43-.65 6.47 6.47 0 01-.07-1.06v-.07l-.06-3.64h-1.39v3.71a7.23 7.23 0 00.16 1.58 1.74 1.74 0 00.4.74 2 2 0 00.81.57 4 4 0 001.5.2 3.7 3.7 0 001.33-.23 2.17 2.17 0 00.8-.56 1.86 1.86 0 00.4-.85 8.33 8.33 0 00.11-1.49z"
                                    />
                                    <path
                                        id="prefix__path3517"
                                        className="prefix__cls-76"
                                        transform="translate(-.65 -.12)"
                                        d="M1118.9 237.25l-3.85.06v-1.83l3.46-.06v-1.11l-3.46.06v-1.5l3.71-.06v-1.14l-5.1.09.06 3.68v3.05l5.23-.09z"
                                    />
                                    <path
                                        id="prefix__path3519"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1165.8 232.56a24.81 24.81 0 01-3.62 4c-3.76 3.22-35.43 4.29-60.39 4.29s-55.43 1.75-64.15-.13c-6.6-1.42-9.28-4.22-10.83-6 6.62 1.3 19.71 2 45.54 1.5 29.12-.61 85.96-1.22 93.45-3.66z"
                                    />
                                    <path
                                        id="prefix__path3521"
                                        className="prefix__cls-79"
                                        transform="translate(-.65 -.12)"
                                        d="M1083 237.65l.86 1.3h-1.67l-1-1.45a11.66 11.66 0 00-.75-1 1.19 1.19 0 00-.43-.27 2.13 2.13 0 00-.7-.06h-.31v2.81h-1.4v-2.94l3.84-.07a3.52 3.52 0 01.73.53 11.29 11.29 0 01.83 1.15z"
                                    />
                                    <path
                                        id="prefix__path3523"
                                        className="prefix__cls-77"
                                        transform="translate(-.65 -.12)"
                                        d="M1089.8 235.89l-2.94.05 2.94-.06z"
                                    />
                                    <path
                                        id="prefix__path3525"
                                        className="prefix__cls-79"
                                        transform="translate(-.65 -.12)"
                                        d="M1090.3 237.71v1.14l-5.24.08v-3h1.39v1.83z"
                                    />
                                    <path
                                        id="prefix__path3527"
                                        className="prefix__cls-79"
                                        transform="translate(-.65 -.12)"
                                        d="M1096.9 235.75a2 2 0 01.26 1 1.93 1.93 0 01-.31 1.08 2 2 0 01-.92.77 4 4 0 01-1.5.27 3 3 0 01-2-.56 2.57 2.57 0 01-.87-1.7l1.36-.15a1.54 1.54 0 00.51 1 1.52 1.52 0 001 .29 1.54 1.54 0 001-.29.85.85 0 00.33-.66.62.62 0 00-.15-.4 1.1 1.1 0 00-.51-.28c-.16-.06-.53-.15-1.11-.28h-.13z"
                                    />
                                    <path
                                        id="prefix__path3529"
                                        className="prefix__cls-79"
                                        transform="translate(-.65 -.12)"
                                        d="M1103.2 236.16l1.36.4a2.73 2.73 0 01-2.83 2.22 3 3 0 01-2.27-.88 3.33 3.33 0 01-.91-2.18h1.43a2.42 2.42 0 00.48 1.39 1.6 1.6 0 001.24.53 1.43 1.43 0 00.94-.36 2 2 0 00.56-1.12z"
                                    />
                                    <path
                                        id="prefix__path3531"
                                        className="prefix__cls-79"
                                        transform="translate(-.65 -.12)"
                                        d="M1111.6 237a1.86 1.86 0 01-.4.85 2.17 2.17 0 01-.8.56 3.7 3.7 0 01-1.33.23 4 4 0 01-1.5-.2 2 2 0 01-.81-.57 1.74 1.74 0 01-.4-.74 7.23 7.23 0 01-.16-1.58h1.39a6.47 6.47 0 00.07 1.06 1 1 0 00.43.65 1.52 1.52 0 00.92.24 1.43 1.43 0 00.89-.25 1 1 0 00.36-.59 8.27 8.27 0 000-1.14h1.39a8.33 8.33 0 01-.05 1.48z"
                                    />
                                    <path
                                        id="prefix__path3533"
                                        className="prefix__cls-79"
                                        transform="translate(-.65 -.12)"
                                        d="M1118.9 238.38l-5.23.09v-3.05l4.85-.11v.11l-3.46.06v1.83l3.85-.06z"
                                    />
                                    <path
                                        id="prefix__path3535"
                                        className="prefix__cls-71"
                                        transform="translate(-.65 -.12)"
                                        d="M1166.5 228l-24.28 1-64.21 1.64-39.74.41s-19.25-2.35-21.51-4.2a24.05 24.05 0 01-3.44-3.36s-.28-1.37 1.82-3.43a14.79 14.79 0 012-1.61c3.45-2.41 20.54-8.21 26.8-10.14a18.87 18.87 0 012.28-.63h1.93c7.54 0 34.59-.31 34.59-.31s27.7-.42 28.12-.28 9.93 4.76 14.13 4.06c1.6-.27 3.72-.59 6-.89a70.39 70.39 0 0110-.79c3.92.14-1 7.73 1.93 12 6.86-.82 10.55 0 11.37 1.43s4 2.46 5.42 1.23 6.77 0 6.77 0z"
                                    />
                                    <path
                                        id="prefix__path3537"
                                        transform="translate(-.65 -.12)"
                                        d="M1142.7 222.68a10.3 10.3 0 00-1.79 2.16c-1.14 2.07-1.66 2.59-1.87 3.94s-71.82 2.07-71.82 2.07c-1.19-.3-1.53-2.09-1.56-4.33v-.33c0-1.14 1.66-.32 5.39-.11s18.45 1 24.56.83a106.77 106.77 0 0015.08-2.11l.59-.11c2.17-.45 4-.88 5.06-1.2 3.53-1 15.76-2.9 26.54-2.38 1.31.06.73.65-.18 1.57z"
                                        fill="#938c87"
                                    />
                                    <path
                                        id="prefix__path3539"
                                        transform="translate(-.65 -.12)"
                                        d="M1142.7 222.68c-3.35-.63-15.18.11-20.71.94-5.74.86-20.38 4-26.89 4-5.78 0-23.82-.53-29.44-1.12v-.33c0-1.14 1.66-.32 5.39-.11s18.45 1 24.56.83a117.8 117.8 0 0020.73-3.42c3.53-1 15.76-2.9 26.54-2.38 1.31.08.73.67-.18 1.59z"
                                        fill="#b2adaa"
                                    />
                                    <path
                                        id="prefix__path3541"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1115 229.36l-.43.33-3.85-4.89.59-.11z"
                                    />
                                    <path
                                        id="prefix__path3543"
                                        transform="translate(-.65 -.12)"
                                        d="M1067.1 213.44c-.14 3.09-1 11.18 6.77 12.51s16.47-3.09 19.56-7.36-26.33-5.15-26.33-5.15z"
                                        fill="#77726f"
                                    />
                                    <path
                                        id="prefix__path3545"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1043.3 208.51a63.63 63.63 0 00-13.35 6.54c-5.18 1.85-11 3.07-14.79 5a14.79 14.79 0 012-1.61c3.45-2.41 20.54-8.21 26.8-10.14z"
                                    />
                                    <path
                                        id="prefix__path3547"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1131 210.26c-2 1.7-2.87 2.6-6 3.66-3.5 1.16-12.85 4.34-20.12 6.33a29.88 29.88 0 01-6.88 1.22h-2.21c-.49 0-1 0-1.45-.08-3.34-.35-7.15-1.4-13.42-2.67-2.94-.6-6.57-1.31-9.37-1.84s-5.47-1-7.64-1.21c-5.4-.61-12.86-1.92-19.7-2.36a47 47 0 00-10.6.73 50.44 50.44 0 019.36-4.31 49.24 49.24 0 005.27-2.06c7.54 0 34.59-.31 34.59-.31s27.7-.42 28.12-.28 9.93 4.76 14.13 4.06c1.52-.26 3.64-.58 5.92-.88z"
                                    />
                                    <path
                                        id="prefix__path3549"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1115 216.14c3.49-.85 15.61 1.15 20.38 2.34a.191.191 0 00.13-.36c-5.22-2.64-17.2-3.64-17.2-3.64l-3.31 1.66"
                                    />
                                    <path
                                        id="prefix__path3551"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1137.9 204.11c-5.13 5.91-6.45 6.44-11.57 8.15-3.5 1.16-12.85 4.34-20.12 6.33a46.82 46.82 0 01-8 1.69h-.1c-2.88.11-9.34-1.18-16.14-2.57-2.93-.59-5.93-1.21-8.74-1.73s-5.46-1-7.63-1.22c-5.4-.61-12.86-1.92-19.7-2.36a43.68 43.68 0 00-10.05.29 49.83 49.83 0 019.37-4.3c6.57-2.18 11.13-5 12.42-6.87a.12.12 0 00-.17-.17c-1.68 1.23-5.06 3.31-11.83 5.81a62.9 62.9 0 00-13.35 6.54c-7.62 2.72-16.57 4.07-18.61 8.28.45-2.71 4.08-5.72 8.47-9.06.73-.56 1.5-1.13 2.29-1.71 1.13-.84 2.59-2 4.24-3.19 3.45-2.61 7.73-5.82 11.47-8.31 1.46-1 2.84-1.84 4.06-2.52a13.22 13.22 0 013.51-1.5l1-.17a38 38 0 019.66-.35c2.4.22 7.45 2 9.76 4.16a6.26 6.26 0 011 1.36c2.73 4.38 9 3.24 13.8 2.5 3.28-.51 7.5 1.05 11 1.44s8.68-1.71 10.39-2.63 7.36.92 10.78-.52a26.87 26.87 0 015.65-1.94 11.67 11.67 0 012-.17 39.26 39.26 0 009.16-.88 5.41 5.41 0 001.36-.56c2.12-1.32 9.74.26 4.62 6.18z"
                                    />
                                    <path
                                        id="prefix__path3553"
                                        className="prefix__cls-83"
                                        transform="translate(-.65 -.12)"
                                        d="M1057.7 201.52c-1.29 1.84-5.85 4.69-12.42 6.87a49.83 49.83 0 00-9.37 4.3 16.57 16.57 0 00-2.86.75l-.7.26a62.9 62.9 0 0113.35-6.54c6.77-2.5 10.15-4.58 11.83-5.81a.12.12 0 01.17.17z"
                                    />
                                    <path
                                        id="prefix__path3555"
                                        className="prefix__cls-84"
                                        transform="translate(-.65 -.12)"
                                        d="M1137.9 204.11c-5.13 5.91-6.45 6.44-11.57 8.15-3.5 1.16-12.85 4.34-20.12 6.33a77.35 77.35 0 0114-6.63c4.44-1.51 12.7-5.86 13-9.06.17-2-.31-3.6-1.25-4.41a5.41 5.41 0 001.36-.56c2.08-1.32 9.7.26 4.58 6.18z"
                                    />
                                    <path
                                        id="prefix__path3557"
                                        className="prefix__cls-84"
                                        transform="translate(-.65 -.12)"
                                        d="M1083.6 208.76s-.12.71-.32 1.79c-.34 1.89-.88 4.9-1.33 7.16l-5.19-1.05c-1.21-.24-2.39-.47-3.55-.68l-1.46-.27c-2.27-.41-4.38-.75-6.17-1-5.4-.61-12.86-1.92-19.7-2.36 4.36-1.53 10.69-3.65 15.28-4.77a45.58 45.58 0 0119.27 0 14.67 14.67 0 013.17 1.18z"
                                    />
                                    <path
                                        id="prefix__path3559"
                                        className="prefix__cls-76"
                                        transform="translate(-.65 -.12)"
                                        d="M1068.2 199.33a15.8 15.8 0 01-4.18.93c-9.55 1.09-13.52-2.25-15.24-4.74a38 38 0 019.66-.35c2.4.22 7.45 1.98 9.76 4.16z"
                                    />
                                    <path
                                        id="prefix__path3561"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1028.7 208c-.63 4-3.91 4.93-6.53 4.9.73-.56 1.5-1.13 2.29-1.71 1.13-.82 2.59-1.93 4.24-3.19z"
                                    />
                                    <path
                                        id="prefix__path3563"
                                        className="prefix__cls-72"
                                        transform="translate(-.65 -.12)"
                                        d="M1044.2 197.19a3.17 3.17 0 01-4.06 2.5c1.46-.96 2.83-1.82 4.06-2.5z"
                                    />
                                    <path
                                        id="prefix__path3565"
                                        transform="translate(-.65 -.12)"
                                        d="M1035.9 212.69a72.45 72.45 0 00-12.17 9c-3.72 3.39-4.91 4.1-5.65 3.58-.56-.4 2.37-2.56 4.45-4.22 3.71-3 6.69-5.29 9.81-7.32l.7-.26a16.34 16.34 0 012.86-.78z"
                                        fill="#7f7873"
                                    />
                                    <path
                                        id="prefix__path3567"
                                        className="prefix__cls-73"
                                        transform="translate(-.65 -.12)"
                                        d="M1012.4 222.59c-1.47 1.81-1.15 2.14 1.64 4.11s9.35 3.61 23.63 4.59 41.52.2 61-.33c12.14-.33 50.7-1.15 59.07-1.48s11 1.32 14.11-2.46-2.28-6.6-5.09-5.25c-1.51.73-1.48 1.32-2.62 1.81s3.11 1 1.31 2.29-.33 1.65-3.45 1.65-41.35 1.31-63.66 2.13-57.92 1-65.47.16c-4.94-.53-10.67-1.64-10.67-2.29s-2.79-2.63-4.59-3.45-3.08-4.07-5.21-1.48z"
                                    />
                                    <path
                                        id="prefix__path3569"
                                        className="prefix__cls-83"
                                        transform="translate(-.65 -.12)"
                                        d="M1085.9 207.09s-1.59 2.09-2.6 3.46c-.46.62-.79 1.09-.81 1.15s-3.92 3.28-3.92 3.28a14 14 0 01-1.79 1.68c-1.21-.24-2.39-.47-3.55-.68l-1.46-.27c-.59-3.67 5.5-6.53 7.56-7.36a4 4 0 001.12-.69 5.44 5.44 0 001.73-4 .57.57 0 111.12-.2z"
                                    />
                                    <path
                                        id="prefix__path3571"
                                        transform="translate(-.65 -.12)"
                                        d="M1119.5 205.16c-3.06 3.12-18.67 7.57-21.33 15.12h-.32c-4.37 0-15.48-2.61-24.56-4.31-.09-3.52 3.17-5.23 5.71-6.25a7.88 7.88 0 002.75-1.89 4.71 4.71 0 001.49-4.34c-.12-.45.26-.6.73-.6 3.12 0 6.89 1.38 10.09 1.73 3.55.4 8.68-1.71 10.39-2.63a1.85 1.85 0 01.47-.16c2.1-.49 7.16 1 10.31-.36 1.57-.67 2.78-1.24 3.86-1.64.35-.13.69-.24 1-.33a.76.76 0 011 .58 5.67 5.67 0 01-1.59 5.08z"
                                        fill="#605b58"
                                    />
                                    <path
                                        id="prefix__path3573"
                                        transform="translate(-.65 -.12)"
                                        d="M1103 208.5c-4.34 4.28-16.56 1.88-21.28-.66a4.71 4.71 0 001.49-4.34c-.12-.45.26-.6.73-.6 3.12 0 6.89 1.38 10.09 1.73 3.55.4 8.68-1.71 10.39-2.63a1.85 1.85 0 01.47-.16c.58 1.8.57 4.23-1.89 6.66z"
                                        fill="#7c7775"
                                    />
                                    <path
                                        id="prefix__path3575"
                                        transform="translate(-.65 -.12)"
                                        d="M1119.5 205.16c-3.06 3.12-18.67 7.57-21.33 15.12h-.32a10 10 0 012-3.83c2.68-3.66 15.63-9.36 18.36-11.43 2.36-1.81 2.23-4.15.9-5.19.35-.13.69-.24 1-.33a.76.76 0 011 .58 5.67 5.67 0 01-1.61 5.08z"
                                        fill="#494340"
                                    />
                                    <path
                                        id="prefix__path3577"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1029.4 227.21a1.94 1.94 0 01.28-.8 1.49 1.49 0 01.4-.39 1.34 1.34 0 01.5-.23 2.3 2.3 0 01.79 0 1.75 1.75 0 011.19.62 1.56 1.56 0 01.3 1.29 1.6 1.6 0 01-.64 1.15 1.76 1.76 0 01-1.32.26 1.84 1.84 0 01-1.21-.62 1.56 1.56 0 01-.29-1.28zm.74.08a1.14 1.14 0 00.16.87 1 1 0 00.67.39 1 1 0 00.75-.18 1.2 1.2 0 00.4-.8 1.16 1.16 0 00-.15-.86 1.08 1.08 0 00-1.43-.21 1.2 1.2 0 00-.4.79z"
                                    />
                                    <path
                                        id="prefix__path3579"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1035.8 228.3l.7.25a1.43 1.43 0 01-.59.75 1.84 1.84 0 01-2.13-.32 1.65 1.65 0 01-.38-1.24 1.59 1.59 0 011.8-1.59 1.62 1.62 0 011 .42 1.36 1.36 0 01.33.62l-.73.11a.74.74 0 00-.24-.41.79.79 0 00-.49-.18.85.85 0 00-.66.21 1.2 1.2 0 00-.31.82 1.3 1.3 0 00.19.89.83.83 0 00.62.31.76.76 0 00.51-.14.85.85 0 00.38-.5z"
                                    />
                                    <path
                                        id="prefix__path3581"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1037.2 229.56l.11-3.24 2.67.1v.55l-1.94-.07v.72l1.81.06v.55l-1.81-.07v.89l2 .07v.54z"
                                    />
                                    <path
                                        id="prefix__path3583"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1043.9 229.76h-.8l-.29-.74h-1.44l-.32.73h-.77l1.49-3.21h.76zm-1.31-1.31l-.47-1.22-.52 1.19z"
                                    />
                                    <path
                                        id="prefix__path3585"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1044.3 229.79l.07-3.24h.71l1.43 2.2v-2.17h.68l-.07 3.25h-.73l-1.41-2.14v2.11z"
                                    />
                                    <path
                                        id="prefix__path3587"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1047.8 228.79l.7-.06a.8.8 0 00.26.48.86.86 0 00.53.15.88.88 0 00.53-.13.39.39 0 00.18-.31.28.28 0 00-.08-.2.55.55 0 00-.26-.14l-.58-.15a2 2 0 01-.82-.32.82.82 0 01-.33-.65.83.83 0 01.16-.47.9.9 0 01.45-.32 1.71 1.71 0 01.71-.11 1.63 1.63 0 011 .27.9.9 0 01.36.71h-.73a.53.53 0 00-.2-.36.8.8 0 00-.46-.11 1 1 0 00-.5.11.24.24 0 00-.11.2.22.22 0 00.11.2 2.07 2.07 0 00.66.22 4 4 0 01.79.24 1 1 0 01.4.33.94.94 0 01.14.52.86.86 0 01-.18.52 1 1 0 01-.49.36 2.22 2.22 0 01-.78.11 1.6 1.6 0 01-1-.29 1.16 1.16 0 01-.46-.8z"
                                    />
                                    <path
                                        id="prefix__path3589"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1051.5 229.86v-3.25h.73v3.25z"
                                    />
                                    <path
                                        id="prefix__path3591"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1052.9 226.61h1.33a3 3 0 01.69.06 1.2 1.2 0 01.54.3 1.37 1.37 0 01.35.52 2.13 2.13 0 01.12.76 1.87 1.87 0 01-.11.7 1.33 1.33 0 01-.38.57 1.22 1.22 0 01-.51.26 2.57 2.57 0 01-.64.08h-1.33zm.73.55v2.14h.55a2.29 2.29 0 00.44 0 .78.78 0 00.29-.14.66.66 0 00.19-.31 2 2 0 00.07-.6 1.75 1.75 0 00-.08-.58.77.77 0 00-.21-.31.84.84 0 00-.33-.15 4 4 0 00-.6 0z"
                                    />
                                    <path
                                        id="prefix__path3593"
                                        className="prefix__cls-75"
                                        transform="translate(-.65 -.12)"
                                        d="M1056.7 229.83v-3.24h2.67v.55h-1.95v.72h1.81v.54h-1.81v.89h2v.55z"
                                    />
                                    <path
                                        id="prefix__path3595"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1031.8 212.65l-1.35-2.14.49-.31 1.11 1.78 1.21-.75.22.36z"
                                    />
                                    <path
                                        id="prefix__path3597"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1034 211.31l-1.28-2.21.49-.28 1.28 2.2z"
                                    />
                                    <path
                                        id="prefix__path3599"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1035.1 210.66l-1.2-2.25 1.71-.91.2.38-1.2.64.28.53 1-.55.21.38-1 .55.51 1z"
                                    />
                                    <path
                                        id="prefix__path3601"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1037.4 209.45l-1.1-2.3 1.89-.9.19.39-1.38.66.24.51 1.29-.62.18.39-1.28.61.3.63 1.43-.68.18.38z"
                                    />
                                    <path
                                        id="prefix__path3603"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1040.8 206.87l-.16-.39 1.13-.48.4.93a1.77 1.77 0 01-.37.46 2.2 2.2 0 01-.59.38 1.86 1.86 0 01-.78.15 1.16 1.16 0 01-.65-.25 1.36 1.36 0 01-.41-.56 1.3 1.3 0 01-.11-.72 1.2 1.2 0 01.31-.65 1.58 1.58 0 01.58-.38 1.39 1.39 0 01.83-.14.86.86 0 01.57.35l-.49.31a.49.49 0 00-.32-.18.71.71 0 00-.42.06.84.84 0 00-.47.43.84.84 0 00.05.67 1 1 0 00.47.54.81.81 0 00.63 0 1.49 1.49 0 00.31-.2 1.6 1.6 0 00.22-.26l-.12-.3z"
                                    />
                                    <path
                                        id="prefix__path3605"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1042 204.62l.54-.21.49 1.29c.08.2.14.33.17.39a.39.39 0 00.26.17.59.59 0 00.38 0 .55.55 0 00.31-.21.32.32 0 00.06-.26 2.2 2.2 0 00-.13-.41l-.5-1.32.53-.2.48 1.25a3.21 3.21 0 01.19.62.62.62 0 010 .36.81.81 0 01-.23.31 1.52 1.52 0 01-.48.27 1.72 1.72 0 01-.61.14.86.86 0 01-.38-.08.8.8 0 01-.26-.21 3.16 3.16 0 01-.28-.58z"
                                    />
                                    <path
                                        id="prefix__path3607"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1048.2 205l-.58.23-.44-.44-1.05.43v.62l-.56.23.06-2.77.56-.23zm-1.36-.54l-.72-.73v1z"
                                    />
                                    <path
                                        id="prefix__path3609"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1048.6 204.75l-1.06-2.31 1.09-.51a2.82 2.82 0 01.63-.21.63.63 0 01.4.09.61.61 0 01.28.31.65.65 0 010 .51 1 1 0 01-.41.45 1.36 1.36 0 01.37.06 3.52 3.52 0 01.46.24l.52.31-.62.29-.6-.33a3.47 3.47 0 00-.43-.22.47.47 0 00-.2 0 .68.68 0 00-.28.09l-.1.05.44 1zm-.09-1.57l.38-.18a2.39 2.39 0 00.46-.24.37.37 0 00.1-.17.33.33 0 000-.19.31.31 0 00-.16-.16.3.3 0 00-.23 0 4 4 0 00-.39.16l-.4.19z"
                                    />
                                    <path
                                        id="prefix__path3611"
                                        className="prefix__cls-18"
                                        transform="translate(-.65 -.12)"
                                        d="M1050.2 201.18l.93-.49a2.07 2.07 0 01.5-.21.87.87 0 01.48 0 1.06 1.06 0 01.43.23 1.62 1.62 0 01.37.49 1.54 1.54 0 01.18.52 1.19 1.19 0 01-.06.54 1 1 0 01-.26.37 1.77 1.77 0 01-.42.29l-1 .5zm.71.11l.79 1.49.38-.2a1.23 1.23 0 00.29-.18.49.49 0 00.16-.2.55.55 0 000-.29 1.49 1.49 0 00-.16-.44 1.36 1.36 0 00-.27-.37.54.54 0 00-.26-.15.74.74 0 00-.29 0 4.15 4.15 0 00-.42.2z"
                                    />
                                    <path
                                        id="prefix__path3613"
                                        className="prefix__cls-71"
                                        transform="translate(-.65 -.12)"
                                        d="M1068.2 189.21a3.13 3.13 0 013.12-2.12c.82 0 1 1.39.33 1.45a2.69 2.69 0 00-1.91 1c-.39.53-1.54-.33-1.54-.33z"
                                    />
                                    <path
                                        id="prefix__path3615"
                                        transform="translate(-.65 -.12)"
                                        d="M1070.2 193.79c-.52 1.43-1.28 2.59-1.7 2.57-.94-.06-1 1-1.33 1.55s1.16 1.16 1 1.42c-1 1.52-4.66-.42-5.44-1.75s-2.87-2.11-4.48-2.39a.56.56 0 01-.34-.9c1.67-2.22 10-6.51 12-5.25 1.21.8.94 2.96.29 4.75z"
                                        fill="#a59f9a"
                                    />
                                    <path
                                        id="prefix__path3617"
                                        transform="translate(-.65 -.12)"
                                        d="M1070.2 193.79a5.23 5.23 0 01-.71-.9c-1.82-2.86-9.25.49-11.7 1.78a.56.56 0 01.12-.38c1.67-2.22 10-6.51 12-5.25 1.21.8.94 2.96.29 4.75z"
                                        fill="#ceccca"
                                    />
                                    <path
                                        id="prefix__path3619"
                                        className="prefix__cls-71"
                                        transform="translate(-.65 -.12)"
                                        d="M1067.2 194.75a.28.28 0 01-.28-.42 3.13 3.13 0 013.48-1.27c1.36.64 1.05 5 0 5.11-1.4.13-1.51-1.06-1.59-2.41-.07-1.19-.64-1.16-1.61-1.01z"
                                    />
                                    <path
                                        id="prefix__path3621"
                                        className="prefix__cls-73"
                                        transform="translate(-.65 -.12)"
                                        d="M1146.1 199.66a4.63 4.63 0 01-.09 1.08c-.49 2.3-2.65 3-3.36 4.14-.8 1.24-1.68 3.15-1.17 4.61-1.55-.3-7.25.3-11 1.37a15.81 15.81 0 00-1.66.58.31.31 0 01-.43-.3c0-1.17.09-1.89 2.79-3.06a24.89 24.89 0 008-6.17 2.63 2.63 0 00.38-.71 2.43 2.43 0 00-.63-2.36 3.33 3.33 0 00-1.75-1c.81-.84 8.87-.79 8.92 1.82z"
                                    />
                                    <path
                                        id="prefix__path3623"
                                        className="prefix__cls-91"
                                        transform="translate(-.65 -.12)"
                                        d="M1146 200.74c-.49 2.3-2.65 3-3.36 4.14-.8 1.24-1.68 3.15-1.17 4.61-1.55-.3-7.25.3-11 1.37 7.53-7.2 14.03-7.42 15.53-10.12z"
                                    />
                                    <path
                                        id="prefix__path3625"
                                        className="prefix__cls-91"
                                        transform="translate(-.65 -.12)"
                                        d="M1146.3 200.15a2.81 2.81 0 01-.1.31z"
                                    />
                                    <path
                                        id="prefix__path3627"
                                        className="prefix__cls-71"
                                        transform="translate(-.65 -.12)"
                                        d="M1139.2 201.91a2.63 2.63 0 00.38-.71 2.43 2.43 0 00-.63-2.36c1.08-.34 4.34-.07 4.68.9s-1.44 2.14-4.43 2.17z"
                                    />
                                </g>
                                <g opacity={zoneIsVisible('groupe_de_baigneurs')} id="prefix__baigneurs">
                                    <path
                                        id="prefix__path3630"
                                        className="prefix__cls-10"
                                        transform="translate(-.65 -.12)"
                                        d="M565.28 258.84a6.11 6.11 0 01-.06.86 8 8 0 01.06-.86z"
                                    />
                                    <path
                                        id="prefix__path3632"
                                        className="prefix__cls-10"
                                        transform="translate(-.65 -.12)"
                                        d="M547.32 278.1a10.7 10.7 0 01.39-1.4c-.19.71-.33 1.21-.39 1.4z"
                                    />
                                    <path
                                        id="prefix__path3634"
                                        className="prefix__cls-10"
                                        transform="translate(-.65 -.12)"
                                        d="M565.28 258.84v-.31a.81.81 0 010 .31z"
                                    />
                                    <path
                                        id="prefix__path3636"
                                        className="prefix__cls-10"
                                        transform="translate(-.65 -.12)"
                                        d="M569 278.53c.06.12.41 1 1 2.38a9.32 9.32 0 00-1-2.38z"
                                    />
                                    <path
                                        id="prefix__path3638"
                                        className="prefix__cls-10"
                                        transform="translate(-.65 -.12)"
                                        d="M577.23 316.4c1.22-12-4.83-29.19-7.25-35.47-.54-1.4-.89-2.26-1-2.38-3-.94-15.53 0-15.53 0l-5.94.49s-12.3 13.25-14.51 24c4.67 5.4 17.57 10.37 17.57 10.37s-4.58 6.64-7.35 38.14a1.19 1.19 0 001.59 1.21 13.4 13.4 0 016.09-.82 1.16 1.16 0 001.21-.68c4.29-9.7 11.38-26.8 9.82-30.52h1.87s1.15 21.4 1.8 30.35a1.18 1.18 0 001.73.95 24.64 24.64 0 012.32-1.13 6.9 6.9 0 013.93-.2 1.18 1.18 0 001.37-.88c1.62-6.68 3.79-16.44 3.79-20.75a52.69 52.69 0 00-1.51-12.68zm-24.58-7.28a8.72 8.72 0 00-2.72.63c-2.54-1.4-8.48-8.14-10.95-9.19 0 0 8-10.75 8.74-11.35s.51-1.33 2.55-.77c0 0 .69 2.11 1.57 4.69l.49 1.44a79.8 79.8 0 002.86 7.53c-.89.74-2.54 7.02-2.54 7.02zM568 301s.68-2.19 1.34-5.27c1.2 3.13 2.73 7.68 2.73 10.59C570 303.44 568 301 568 301z"
                                    />
                                    <path
                                        id="prefix__path3640"
                                        transform="translate(-.65 -.12)"
                                        d="M567.84 279.65a6 6 0 01.07 1.2 10.3 10.3 0 01-20.59-.61 10.64 10.64 0 01.2-2.05v-.09c.05-.19.19-.69.39-1.4 1-3.74 3.7-13.5 4.15-17.85a6.71 6.71 0 0113.41-.31v.31a6 6 0 00-.06.86c0 3.37 1.27 12.57 2 17.43.21 1.1.34 1.97.43 2.51z"
                                    />
                                    <path
                                        id="prefix__path3642"
                                        className="prefix__cls-65"
                                        transform="translate(-.65 -.12)"
                                        d="M569.89 293.13c-.09.51-.2 1-.28 1.44h-17.28l-.49-1.44z"
                                    />
                                    <path
                                        id="prefix__path3644"
                                        className="prefix__cls-65"
                                        transform="translate(-.65 -.12)"
                                        d="M562 320.75s-4.1-7.21-10.13-8.62c.33-1.48.81-3 .81-3l19.42-2.81s1.66 2.05 1.66 2.6c-5.23 1.89-9.12 7.75-9.89 11.84z"
                                    />
                                    <path
                                        id="prefix__path3646"
                                        className="prefix__cls-11"
                                        transform="translate(-.65 -.12)"
                                        d="M563.84 320.75A22.61 22.61 0 01559 314c-2.75-6-1.7-10.95-1.85-17.27a54.67 54.67 0 00-3.4-17.43 1.11 1.11 0 00-1.12-.72L548 279a1.06 1.06 0 00-.72.35c-1.82 2-11.82 13.46-14.09 23.16a1 1 0 00.26 1c4.05 4.29 13 8.22 16.08 9.51a1.08 1.08 0 01.57 1.45c-1.28 2.79-4.63 12.16-6.83 37.27a1.09 1.09 0 001.47 1.12 14.27 14.27 0 012.69-.71 1.06 1.06 0 00.77-.61c4.06-8.89 13.74-24.38 13.94-29.66a1.1 1.1 0 011.08-1.09zM552 309.19a10.37 10.37 0 00-1.53.39 1.12 1.12 0 01-1-.13c-2.41-1.63-6.87-6.48-9.49-8.31a1.09 1.09 0 01-.26-1.55c2-2.66 7.43-9.9 8-10.38s.51-1.33 2.55-.77c0 0 .69 2.11 1.57 4.69l.49 1.44c.93 2.68 1.95 5.53 2.59 7a1.05 1.05 0 010 1 37 37 0 00-2 5.88 1.1 1.1 0 01-.92.74z"
                                    />
                                    <path
                                        id="prefix__path3648"
                                        transform="translate(-.65 -.12)"
                                        d="M633.85 284.59l-15.63-20.48a33 33 0 00-9.08-2.14v-6.21h-6.25V262a32.34 32.34 0 00-7.83 1.83 1 1 0 00-.62.65 1.7 1.7 0 00-.19.19l-14.38 18.2a1.06 1.06 0 000 1.25c0 .05.09.12.15.17l8.23 7.45c3.78-.39 8.82.35 15.32 1.33a45.3 45.3 0 005.83.86c16.36.4 12.66-2.92 20.31-3.19l3.94-4.8a1 1 0 00.2-1.35zm-44.33-1.33a1.05 1.05 0 010-1.33l4.68-5.94 1.8 15.55zm34.66 1l-7.91 7.28 2.22-15.54 5.75 6.93a1 1 0 01-.06 1.33z"
                                        fill="#f8f4f2"
                                    />
                                    <path
                                        id="prefix__path3650"
                                        transform="translate(-.65 -.12)"
                                        d="M602.89 262a32.34 32.34 0 00-7.83 1.83 1 1 0 00-.62.65 1.7 1.7 0 00-.19.19l-14.38 18.2a1 1 0 00-.2.85 1.18 1.18 0 00.17.4c.06.05.11.12.16.17l8.23 7.45c3.78-.39 8.82.35 15.32 1.33-.44-4.13-.78-8.51-1-13.23zm-13.37 21.22a1.05 1.05 0 010-1.33l4.68-5.94 1.8 15.59z"
                                        style={{
                                            mixBlendMode: "multiply",
                                        }}
                                        fill="#e7d2bb"
                                    />
                                    <path
                                        id="prefix__path3652"
                                        transform="translate(-.65 -.12)"
                                        d="M598.39 252.89c.22 3 1 4.47 4 7a1.13 1.13 0 001.63-.18c.93-1.21 1.2-1.21 1.2-1.21l.29.92a.75.75 0 001.27.29l.72-.8a.9.9 0 001.55.05l.79-1.22s4.23 1.58 4.63-10c.56-1 1-1.87 1.33-2.59a2.15 2.15 0 00-1.9-3.08h-1.37c.66-1.15-.3-2.25-1.63-2.2a14.89 14.89 0 00-5.2 1.43 14 14 0 00-3.34 2.28l-.84-2.29a.64.64 0 00-1.1.24l-1 3.32a21.65 21.65 0 00-1.03 8.04z"
                                        fill="#f3cb6f"
                                    />
                                    <path
                                        id="prefix__path3654"
                                        className="prefix__cls-95"
                                        transform="translate(-.65 -.12)"
                                        d="M604 259.73a1.13 1.13 0 01-1.63.18c-3-2.55-3.79-4-4-7a21.65 21.65 0 011-8.07l1-3.32a.64.64 0 011.1-.24l.84 2.29a14 14 0 013.34-2.28 15.21 15.21 0 00-1.65 18.44z"
                                    />
                                    <path
                                        id="prefix__path3660"
                                        className="prefix__cls-96"
                                        transform="translate(-.65 -.12)"
                                        d="M636.88 379.93l-1.54 28.14a.87.87 0 01-1.22.76 7 7 0 00-3-.61.88.88 0 01-.88-.85l-.7-21.49h-2.07l-3.62 20.56a1.72 1.72 0 01-1.64 1.47 5 5 0 00-2.38.89.88.88 0 01-1.35-.79l1.76-28.14h1.45z"
                                    />
                                    <path
                                        id="prefix__polygon3662"
                                        fill="#65b457"
                                        d="M636.23 378.62v1.19l-7.37 5.95h-2.06l-7.23-6.01-.05-1.13z"
                                    />
                                    <path
                                        id="prefix__path3664"
                                        transform="translate(-.65 -.12)"
                                        d="M634.32 331.53c-.82.13-1.7.3-2.62.51a52.48 52.48 0 00-5.51 1.62 50.46 50.46 0 00-5 2 30.29 30.29 0 00-3.59 2 6.83 6.83 0 01-.76-2.64c-.32-4.23 3.44-8 8.4-8.34 4.13-.31 7.76 1.75 9.08 4.85z"
                                        fill="#bf3e2a"
                                    />
                                    <path
                                        id="prefix__path3666"
                                        transform="translate(-.65 -.12)"
                                        d="M636.28 337.26c-.39.2-.8.4-1.23.59a45 45 0 01-5.64 2.16 43.7 43.7 0 01-7.29 1.69c-.77.11-1.49.18-2.17.22-2.84.16-4.79-.27-5.12-1.33s.88-2.38 3.08-3.8a30 30 0 013.89-2.08 49.81 49.81 0 0111.2-3.47c1-.17 1.9-.3 2.76-.38 3.3-.3 5.59.11 6 1.27.34 1.31-1.85 3.27-5.48 5.13z"
                                        fill="#751a11"
                                    />
                                    <path
                                        id="prefix__path3668"
                                        className="prefix__cls-96"
                                        transform="translate(-.65 -.12)"
                                        d="M648.6 363.45a35.53 35.53 0 00-11.6-10.8 21.76 21.76 0 00-7.33-2.16V348c3.78-.59 6.72-4.46 6.72-9.14a11.18 11.18 0 00-.12-1.55v-.07a10 10 0 00-2-4.78 7.29 7.29 0 00-.75-.82 6.74 6.74 0 00-.49-.42c-.39.07-.8.14-1.21.24s-.84.17-1.26.28c-1.09.27-2.23.59-3.39 1a48 48 0 00-5.31 2c-.1.24-.2.5-.28.75a7.4 7.4 0 00-.33 1.35 1.61 1.61 0 00-.07.37c0 .22-.06.45-.08.68a1.23 1.23 0 00-.25-.17l-.26-.14a1.36 1.36 0 00-.91 0c-.9.29-1.29 1.56-.88 2.83a3.17 3.17 0 00.19.46 1.62 1.62 0 00.21.36 1.94 1.94 0 00.38.46 1.45 1.45 0 00.19.17l.22.15a1.4 1.4 0 001.12.13l.19-.07.17-.11a10.86 10.86 0 00.89 2.09c.13.22.26.43.4.63a6.07 6.07 0 00.43.57l.48.54a7.52 7.52 0 001.05.92v3.76a21.3 21.3 0 00-4.68 1.12 9.32 9.32 0 00-4.46 3.4 52.13 52.13 0 00-4 6.71 51.26 51.26 0 00-3.34 8.52 1.16 1.16 0 00.3 1.16 20.3 20.3 0 004.94 3.6 19.35 19.35 0 004.7 1.74 18.9 18.9 0 002 .36v1.6h1.33c3.91.08 15.09.27 15.37 0 6.26-6.34 10.54-11.88 11.77-14a1.2 1.2 0 00-.05-1.23zm-11.72 8.61v-11.71s3.51 3.48 5.24 5.23c-1.99.74-5.24 6.48-5.24 6.48z"
                                    />
                                    <path
                                        id="prefix__path3670"
                                        transform="translate(-.65 -.12)"
                                        d="M621 338l.17 1.51a6.77 6.77 0 001.54-4.1c2.82-1.28 9.07-3.6 11.49-2.87s-.13-1.44-.13-1.44c-1.09.15-2.27.36-3.52.65a39.28 39.28 0 00-4.45 1.31c-.8.27-1.63.57-2.49.92s-1.83.76-2.65 1.15c.04.92.04 1.87.04 2.87z"
                                        fill="#c28251"
                                    />
                                    <path
                                        id="prefix__path3672"
                                        className="prefix__cls-101"
                                        transform="translate(-.65 -.12)"
                                        d="M627.09 377.27a9 9 0 01-10.43-1.68 66.39 66.39 0 007.09 1.86 6.33 6.33 0 003.34-.18z"
                                    />
                                    <path
                                        id="prefix__path3674"
                                        className="prefix__cls-101"
                                        transform="translate(-.65 -.12)"
                                        d="M632 369.23a9 9 0 01-2 5.77l-15.86-6.83a9 9 0 0117.86 1.06z"
                                    />
                                    <g
                                        id="prefix__g3692"
                                        style={{
                                            mixBlendMode: "multiply",
                                        }}
                                    >
                                        <path
                                            id="prefix__path3676"
                                            className="prefix__cls-96"
                                            transform="translate(-.65 -.12)"
                                            d="M629.52 385.88h-2.07l-3.76 21.37a.89.89 0 01-1.07.7 4.15 4.15 0 00-2.81.85.88.88 0 01-1.35-.79l1.76-28.14z"
                                        />
                                        <path
                                            id="prefix__polygon3678"
                                            className="prefix__cls-96"
                                            d="M628.86 385.76h-2.06l-7.23-6.01-.05-1.13z"
                                        />
                                        <path
                                            id="prefix__path3680"
                                            className="prefix__cls-96"
                                            transform="translate(-.65 -.12)"
                                            d="M634.32 331.53c-.82.13-1.7.3-2.62.51a52.48 52.48 0 00-5.51 1.62 50.46 50.46 0 00-5 2 30.29 30.29 0 00-3.59 2 6.83 6.83 0 01-.76-2.64c-.32-4.23 3.44-8 8.4-8.34 4.13-.31 7.76 1.75 9.08 4.85z"
                                        />
                                        <path
                                            id="prefix__path3682"
                                            className="prefix__cls-96"
                                            transform="translate(-.65 -.12)"
                                            d="M636.28 337.26c-.39.2-.8.4-1.23.59a45 45 0 01-5.64 2.16 43.7 43.7 0 01-7.29 1.69c-.77.11-1.49.18-2.17.22-2.84.16-4.79-.27-5.12-1.33s.88-2.38 3.08-3.8a30 30 0 013.89-2.08 49.81 49.81 0 0111.2-3.47c1-.17 1.9-.3 2.76-.38 3.3-.3 5.59.11 6 1.27.34 1.31-1.85 3.27-5.48 5.13z"
                                        />
                                        <path
                                            id="prefix__path3684"
                                            className="prefix__cls-96"
                                            transform="translate(-.65 -.12)"
                                            d="M621.8 334.76c-.1.24-.2.5-.28.75a7.4 7.4 0 00-.33 1.35 1.61 1.61 0 00-.07.37c0 .22-.06.45-.08.68a1.3 1.3 0 00-.25-.18l-.26-.14a1.36 1.36 0 00-.91 0c-.9.29-1.29 1.56-.88 2.83a3.17 3.17 0 00.19.46 1.62 1.62 0 00.21.36 1.94 1.94 0 00.38.46 1.45 1.45 0 00.19.17l.22.15a1.4 1.4 0 001.12.13l.19-.07.17-.12a9.47 9.47 0 00.9 2.08c.13.22.26.43.4.63a6.07 6.07 0 00.43.57l.48.54a7.52 7.52 0 001.05.92v3.76a21.3 21.3 0 00-4.68 1.12 9.32 9.32 0 00-4.46 3.4 52.13 52.13 0 00-4 6.71 51.26 51.26 0 00-3.34 8.52 1.16 1.16 0 00.3 1.16 20.3 20.3 0 004.94 3.6 19.35 19.35 0 004.7 1.74 18.9 18.9 0 002 .36v1.61l1.21.93.12-.91.07-.62.14-1.11.64-5.28 1.4-11.48 2.35-19.31.88-7.22v-.32l.08-.65a48 48 0 00-5.22 2.05zm14.48 2.58l.12 1.55a11.18 11.18 0 00-.12-1.55z"
                                        />
                                        <path
                                            id="prefix__path3686"
                                            className="prefix__cls-96"
                                            transform="translate(-.65 -.12)"
                                            d="M621 338l.17 1.51a6.77 6.77 0 001.54-4.1c2.82-1.28 9.07-3.6 11.49-2.87s-.13-1.44-.13-1.44c-1.09.15-2.27.36-3.52.65a39.28 39.28 0 00-4.45 1.31c-.8.27-1.63.57-2.49.92s-1.83.76-2.65 1.15c.04.92.04 1.87.04 2.87z"
                                        />
                                        <path
                                            id="prefix__path3688"
                                            className="prefix__cls-96"
                                            transform="translate(-.65 -.12)"
                                            d="M627.09 377.27a9 9 0 01-10.43-1.68 66.39 66.39 0 007.09 1.86 6.33 6.33 0 003.34-.18z"
                                        />
                                        <path
                                            id="prefix__path3690"
                                            className="prefix__cls-96"
                                            transform="translate(-.65 -.12)"
                                            d="M614.09 368.17a9 9 0 018.95-7.95z"
                                        />
                                    </g>
                                </g>
                                <g opacity={zoneIsVisible('palmes')}  id="prefix__palmes">
                                    <path
                                        id="prefix__path3695"
                                        className="prefix__cls-103"
                                        transform="translate(-.65 -.12)"
                                        d="M1105 695c-3.51-27.43-10.25-39.09-11.24-39.92s-.83-.24-3.5-.07-2.7-3.72-3.2-4.13-5-.74-5.74.58a6.63 6.63 0 01-3.88 3.35 4.37 4.37 0 01-4.38-.51c-.25-.27-2.92 1.26-4 2.11s-.77.93-.87 2.87a6.23 6.23 0 01-3.31 4.55c-1.33.57-.89.92 1.5 10.19s7.65 20.51 18.57 41.52 13.9 18.68 13.9 18.68 7.42-1.68 9-3.54.63-8.24-2.85-35.68z"
                                    />
                                    <path
                                        id="prefix__path3697"
                                        className="prefix__cls-104"
                                        transform="translate(-.65 -.12)"
                                        d="M1105.8 701.48s-.8 11-11.42-19-7.4-31.58-7.4-31.58 1.45 4.18 3.48 3.89 3.08-1.12 4.18.92 12.15 27.95 11.16 45.77z"
                                    />
                                    <path
                                        id="prefix__path3699"
                                        className="prefix__cls-104"
                                        transform="translate(-.65 -.12)"
                                        d="M1080.9 651.82c4-6.82 21.91 68.68 6.38 43.49s-14.27-41-14.27-41 4.98 2.43 7.89-2.49z"
                                    />
                                    <path
                                        id="prefix__path3701"
                                        className="prefix__cls-104"
                                        transform="translate(-.65 -.12)"
                                        d="M1068.2 657.09a112.62 112.62 0 019.42 22.91c3.91 13.44 9 28.73 5.08 31.41 0 0-15.73-26.18-18.17-43.9a7 7 0 00-.42-1.62c-.26-.68-.49-1.77.39-2.32 1.34-.83 3.38-1.57 3.7-6.48z"
                                    />
                                    <path
                                        id="prefix__path3703"
                                        className="prefix__cls-105"
                                        transform="translate(-.65 -.12)"
                                        d="M1080.3 655.87c2.63-4.52 17.61 53.19 5.85 32.75s-11.36-31.89-11.36-31.89 3.6 2.4 5.51-.86z"
                                    />
                                    <path
                                        id="prefix__path3705"
                                        className="prefix__cls-105"
                                        transform="translate(-.65 -.12)"
                                        d="M1102.1 690.72s-.54 7.39-7.65-12.73-4.94-21.16-4.94-21.16 1 2.8 2.33 2.61 2.06-.75 2.8.62 8.12 18.72 7.46 30.66z"
                                    />
                                    <path
                                        id="prefix__path3707"
                                        className="prefix__cls-105"
                                        transform="translate(-.65 -.12)"
                                        d="M1068.8 662.78a79.15 79.15 0 016.59 16c2.73 9.4 6.31 20.1 3.55 22 0 0-11.4-18.65-12.77-31 0 0-.7-1.65.24-2.23s2.16-1.3 2.39-4.77z"
                                    />
                                    <path
                                        id="prefix__path3709"
                                        className="prefix__cls-45"
                                        transform="translate(-.65 -.12)"
                                        d="M1095.1 731.94s-3.66-8.34-4.86-10.17-5.21-7.78-4.26-12.28 2.82-7.77 7.17-8.21a11.93 11.93 0 0110.61 4.6c2 2.88 4.64 19.32 4.64 19.32a14.74 14.74 0 01-.12 4.12l-12 4.29a17.27 17.27 0 00-1.18-1.67z"
                                    />
                                    <path
                                        id="prefix__path3711"
                                        className="prefix__cls-58"
                                        transform="translate(-.65 -.12)"
                                        d="M1095 729s2.66 11 6.79 14.38 8.87-.88 8.24-6.54-5.69-20.28-6.38-26.55-7.35-7.5-10.86-6.66-6.34 3.71-3.85 11.63S1094 725.82 1095 729z"
                                    />
                                    <rect
                                        id="prefix__rect3713"
                                        className="prefix__cls-106"
                                        transform="rotate(-18.59 1102.1 734.31)"
                                        x={1097.6}
                                        y={722.45}
                                        width={9.89}
                                        height={19.67}
                                        rx={4.25}
                                    />
                                    <path
                                        id="prefix__path3717"
                                        className="prefix__cls-107"
                                        transform="translate(-.65 -.12)"
                                        d="M1091 720.73s4.54-8.33 14-3.9l-1.07-7-16.1 4 3.33 7z"
                                    />
                                    <path
                                        id="prefix__path3719"
                                        className="prefix__cls-58"
                                        transform="translate(-.65 -.12)"
                                        d="M1104.6 715s-.06-8.42-4.58-10.89-11.4-2.65-12.36 4.31 2.14 9.94 2.14 9.94 4.84-12.32 14.45-3.75"
                                    />
                                    <rect
                                        id="prefix__rect3721"
                                        className="prefix__cls-26"
                                        transform="rotate(-18.59 1102.1 734.38)"
                                        x={1099.6}
                                        y={724.62}
                                        width={6.07}
                                        height={15.48}
                                        rx={2.61}
                                    />
                                    <path
                                        id="prefix__path3723"
                                        className="prefix__cls-107"
                                        transform="translate(-.65 -.12)"
                                        d="M1089.1 709.5a1.66 1.66 0 010-1.22c.48-1.19 2-4.13 5.23-4.33 4.06-.25 5.44 1.42 5.86 2.53s-2 1-4.33.69c-2.1-.3-5.89 4.62-6.76 2.33z"
                                    />
                                    <path
                                        id="prefix__path3725"
                                        transform="translate(-.65 -.12)"
                                        d="M1064.6 667.51s4.8-9 6.39-8.66 3.11 1.17 5.71-1.37 8.69-.34 9.3.76 1.58 3.38 4.67 2.61 6.44 2.81 6.87 4.4-1 3.79 1.35 4.58 3.79 8.37 1.76 18.13c-2.89 13.87-15.47 26.81-16.31 26.43l-5.36-10.47s-14.3-32.26-14.38-36.41z"
                                        opacity={0.37}
                                        fill="#232323"
                                    />
                                    <path
                                        id="prefix__path3727"
                                        className="prefix__cls-103"
                                        transform="translate(-.65 -.12)"
                                        d="M1049.9 735.26s-3.79-.25 2.07-23.19 9.43-34.82 13.82-43.33 4.31-9.07 5.68-8.61a6.2 6.2 0 005.49-1.19c1.37-1.37 1.19-1.65 2.56-1.55s4.4.73 4.4 1.09a4.39 4.39 0 002.93 3.3 6.6 6.6 0 005.12.09c1.47-.46 4.21 2.75 4.31 3.39s-2.11 3.57 0 5.22 2.38 1.09 2.56 2.38-2.56 14.46-18.22 37.25-19.31 28.1-21.69 28.47-9.03-3.32-9.03-3.32z"
                                    />
                                    <path
                                        id="prefix__path3729"
                                        className="prefix__cls-104"
                                        transform="translate(-.65 -.12)"
                                        d="M1077 715.51s-8 7.69 4.14-21.78 15.18-28.47 15.18-28.47-1.35 4.08.36 5.22 3 1.22 2.51 3.47-9.63 28.92-22.19 41.56z"
                                    />
                                    <path
                                        id="prefix__path3731"
                                        className="prefix__cls-104"
                                        transform="translate(-.65 -.12)"
                                        d="M1091.5 661.87c7.54-2.41-29.43 65.82-24.22 36.69s16.67-40.08 16.67-40.08 2.09 5.13 7.55 3.39z"
                                    />
                                    <path
                                        id="prefix__path3733"
                                        className="prefix__cls-104"
                                        transform="translate(-.65 -.12)"
                                        d="M1078.5 657.37a112.94 112.94 0 01-8.24 23.36c-6 12.63-12.41 27.44-17.15 26.81 0 0 5.61-30.74 16-45.26 0 0 .82-2.42 2.38-2.15s3.5.72 7.01-2.76z"
                                    />
                                    <path
                                        id="prefix__path3735"
                                        className="prefix__cls-105"
                                        transform="translate(-.65 -.12)"
                                        d="M1088.3 664.5c5-1.62-22.3 51.4-17.46 28.32s12.78-31.34 12.78-31.34 1.09 4.18 4.68 3.02z"
                                    />
                                    <path
                                        id="prefix__path3737"
                                        className="prefix__cls-105"
                                        transform="translate(-.65 -.12)"
                                        d="M1081.3 705s-5.32 5.15 2.78-14.59 10.41-19.07 10.41-19.07-1.14 2.74 0 3.5 2 .82 1.68 2.33-6.42 19.35-14.87 27.83z"
                                    />
                                    <path
                                        id="prefix__path3739"
                                        className="prefix__cls-105"
                                        transform="translate(-.65 -.12)"
                                        d="M1075.1 662a78.37 78.37 0 01-5.76 16.34c-4.23 8.84-8.68 19.2-12 18.76 0 0 3.92-21.51 11.16-31.66 0 0 .57-1.7 1.66-1.5s2.47.45 4.94-1.94z"
                                    />
                                    <path
                                        id="prefix__path3741"
                                        className="prefix__cls-45"
                                        transform="translate(-.65 -.12)"
                                        d="M1048.7 731.11s2.83-8.67 3.16-10.83 1.3-9.27 5-12 7.29-3.9 10.82-1.34a12 12 0 014.85 10.5c-.41 3.49-9.41 17.5-9.41 17.5a14.83 14.83 0 01-2.84 3l-11.81-4.79a16.79 16.79 0 00.23-2.04z"
                                    />
                                    <path
                                        id="prefix__path3743"
                                        className="prefix__cls-58"
                                        transform="translate(-.65 -.12)"
                                        d="M1050.5 728.79s-5.37 10-4.52 15.25 7.2 5.25 10.5.61 9.27-18.92 12.93-24-.48-10.5-3.66-12.21-7.2-1.46-10.62 6.11-3.19 11.26-4.63 14.24z"
                                    />
                                    <rect
                                        id="prefix__rect3745"
                                        className="prefix__cls-106"
                                        transform="rotate(23.19 1053.9 734.61)"
                                        x={1049}
                                        y={726.47}
                                        width={9.89}
                                        height={19.67}
                                        rx={4.25}
                                    />
                                    <path
                                        id="prefix__path3749"
                                        className="prefix__cls-107"
                                        transform="translate(-.65 -.12)"
                                        d="M1053 720s8.94-3.19 13 6.4l3.84-5.9-14.68-7.73-2.19 7.44z"
                                    />
                                    <path
                                        id="prefix__path3751"
                                        className="prefix__cls-58"
                                        transform="translate(-.65 -.12)"
                                        d="M1067 724.8s5.57-6.32 3.84-11.17-6.74-9.57-12.09-5-5 8.83-5 8.83 11.82-6 13.28 6.84"
                                    />
                                    <rect
                                        id="prefix__rect3753"
                                        className="prefix__cls-26"
                                        transform="rotate(23.19 1053.9 734.72)"
                                        x={1051}
                                        y={728.66}
                                        width={6.07}
                                        height={15.48}
                                        rx={2.61}
                                    />
                                    <path
                                        id="prefix__path3755"
                                        className="prefix__cls-107"
                                        transform="translate(-.65 -.12)"
                                        d="M1059.1 710.31a1.66 1.66 0 01.83-.88c1.17-.57 4.26-1.75 6.79.25 3.2 2.52 3.11 4.69 2.69 5.79s-2.19-.6-3.69-2.37-7.49-.49-6.62-2.79z"
                                    />
                                </g>
                                <g opacity={zoneIsVisible('jumelles')} id="prefix__jumelles">
                                    <path
                                        id="prefix__polygon3758"
                                        className="prefix__cls-12"
                                        d="M1064.9 500.26v7.31h-10l.3-7.31z"
                                    />
                                    <path
                                        id="prefix__path3760"
                                        className="prefix__cls-109"
                                        transform="translate(-.65 -.12)"
                                        d="M1045.6 519h12.43a1.08 1.08 0 011.07 1l.4 5.78a1.06 1.06 0 01-1.06 1.14h-13.3a1.07 1.07 0 01-1.07-1.16l.49-5.78a1.07 1.07 0 011.04-.98z"
                                    />
                                    <path
                                        id="prefix__rect3762"
                                        className="prefix__cls-12"
                                        d="M1048.2 497.11h5.7v1.77h-5.7z"
                                    />
                                    <path
                                        id="prefix__rect3764"
                                        className="prefix__cls-13"
                                        d="M1047.3 493.18h7.36v4.26h-7.36z"
                                    />
                                    <path
                                        id="prefix__path3766"
                                        className="prefix__cls-109"
                                        transform="translate(-.65 -.12)"
                                        d="M1063.1 519h12.42a1.07 1.07 0 011.06 1l.4 5.78a1.06 1.06 0 01-1.06 1.14h-13.3a1.06 1.06 0 01-1.06-1.16l.48-5.78a1.07 1.07 0 011.06-.98z"
                                    />
                                    <path
                                        id="prefix__rect3768"
                                        className="prefix__cls-12"
                                        d="M1065.8 497.11h5.7v1.77h-5.7z"
                                    />
                                    <path
                                        id="prefix__rect3770"
                                        className="prefix__cls-13"
                                        d="M1064.9 493.18h7.36v4.26h-7.36z"
                                    />
                                    <path
                                        id="prefix__path3772"
                                        className="prefix__cls-110"
                                        transform="translate(-.65 -.12)"
                                        d="M1049.6 499.38h-3.66a.45.45 0 00-.46.38l-.32 4.6a.41.41 0 00.42.4h1.5"
                                    />
                                    <path
                                        id="prefix__path3774"
                                        className="prefix__cls-110"
                                        transform="translate(-.65 -.12)"
                                        d="M1072.2 499.38h3.12a.43.43 0 01.46.38l.32 4.6a.4.4 0 01-.42.4h-1.5"
                                    />
                                    <path
                                        id="prefix__rect3776"
                                        className="prefix__cls-109"
                                        d="M1058.3 500.76h3.41v5.48h-3.41z"
                                    />
                                    <path
                                        id="prefix__path3778"
                                        className="prefix__cls-109"
                                        transform="translate(-.65 -.12)"
                                        d="M1063.6 519l1.26-19a1.13 1.13 0 011.17-1h6.79a1.12 1.12 0 011.12 1.06l1.16 19z"
                                    />
                                    <path
                                        id="prefix__path3780"
                                        className="prefix__cls-109"
                                        transform="translate(-.65 -.12)"
                                        d="M1046 519l1.26-19a1.13 1.13 0 011.12-1.05h6.79a1.12 1.12 0 011.13 1.06l1.15 19z"
                                    />
                                    <path
                                        id="prefix__line3782"
                                        className="prefix__cls-111"
                                        d="M1045.4 518.91h11.4"
                                    />
                                    <path
                                        id="prefix__line3784"
                                        className="prefix__cls-111"
                                        d="M1062.8 518.91h11.5"
                                    />
                                </g>
                                <g  opacity={zoneIsVisible('helicoptere')} id="prefix__h\xE9lico">
                                    <path
                                        id="prefix__polygon3787"
                                        className="prefix__cls-112"
                                        d="M589.03 84.25l21.94-1.09 14.51-13.32-1.29-.18z"
                                    />
                                    <path
                                        id="prefix__line3789"
                                        className="prefix__cls-113"
                                        d="M621.93 69l3.29 10.4"
                                    />
                                    <path
                                        id="prefix__path3791"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M636.24 80.24l-11 .94V80l.76-.08a.61.61 0 01-.52-.61.63.63 0 01.57-.63l7.91-.64a.63.63 0 01.68.58v.16a.64.64 0 01-.12.41 1.76 1.76 0 011.72 1.05z"
                                    />
                                    <path
                                        id="prefix__path3793"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M655.75 87.15v-.91l-.62.25c0 .52.17 2.41.62 2s0-1.34 0-1.34zm0 1.07c-.09 0-.2-.16-.25-.38s0-.44.08-.45.21.15.25.38 0 .43-.09.45z"
                                    />
                                    <path
                                        id="prefix__rect3795"
                                        className="prefix__cls-114"
                                        d="M657.27 91.33h1.08v1.62h-1.08z"
                                    />
                                    <path
                                        id="prefix__path3797"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M657.42 93.16a2.08 2.08 0 012.16 0c0 1.23-.44 28.24-.44 28.24v.71l-3.39-2.49 1.31-9.32z"
                                    />
                                    <path
                                        id="prefix__polygon3799"
                                        className="prefix__cls-28"
                                        d="M664.86 126.52l.09.72-3.39.23v-.72z"
                                    />
                                    <path
                                        id="prefix__path3801"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M662.33 128.28a.43.43 0 010 .07 1.21 1.21 0 01-.25.3 1.34 1.34 0 01-.9.36 9.86 9.86 0 00-1.39-.12 2.89 2.89 0 00-1.87.38c-1.61-.49-6.07-1.21-6.07-1.21l.14-4.78v-.9l1.41-1.26 1.72-1.51 7.11 7.25a1.4 1.4 0 01.1 1.42z"
                                    />
                                    <path
                                        id="prefix__path3803"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M662 128.65a1.34 1.34 0 01-.9.36 9.86 9.86 0 00-1.39-.12 2.89 2.89 0 00-1.87.38c-1.61-.49-6.07-1.21-6.07-1.21l.14-4.78z"
                                    />
                                    <path
                                        id="prefix__path3805"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M662.29 128.35a1.21 1.21 0 01-.25.3 1.34 1.34 0 01-.9.36 9.86 9.86 0 00-1.39-.12 2.89 2.89 0 00-1.87.38c-1.61-.49-6.07-1.21-6.07-1.21l.14-4.78v-.9l1.41-1.26z"
                                    />
                                    <path
                                        id="prefix__path3807"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M660.75 141.68V143l-1.22 1.62s0 1.43 2.58 6.39a8.36 8.36 0 001.48-.14l-2-4.53.25-.58 5.36 4.58 1.49 1.83 1.16-.21-.9-2.33 1.32-.59-4.8-3.73v1.48l-1.85-1.51-.69-2.09z"
                                    />
                                    <path
                                        id="prefix__path3809"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M669.56 150.25a.94.94 0 01-1.5.75l-10.18-7.61.39-.63 1-.65 1.23.55 8.7 6.85a1 1 0 01.36.74z"
                                    />
                                    <path
                                        id="prefix__path3811"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M669.3 150.89a1 1 0 01-1.24.11l-10.18-7.61.39-.63z"
                                    />
                                    <path
                                        id="prefix__path3813"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M673.75 147.72a2.28 2.28 0 01-.5 1.22 2.33 2.33 0 01-3.21.42l-9.45-7.36 3.3-3.74 1.12.8a6.08 6.08 0 01.74.91l7.12 5.72a2.34 2.34 0 01.88 2.03z"
                                    />
                                    <path
                                        id="prefix__path3815"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M673.75 147.72l-.13.57-8.76-7.07-1.16-2.45.54-.29.77.55a6.08 6.08 0 01.74.91l7.12 5.72a2.34 2.34 0 01.88 2.06z"
                                    />
                                    <path
                                        id="prefix__path3817"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M669.89 139.94l-3.46.56.8.62 3.45-.66s.6-.48-.2-.94a1.35 1.35 0 00-.59.42z"
                                    />
                                    <path
                                        id="prefix__path3819"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M664.85 135l5.63 4.5s0 .42-.59.42-5.36-4.24-5.36-4.24z"
                                    />
                                    <path
                                        id="prefix__path3821"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M663.93 138.71a1.86 1.86 0 01.72.26l3.41-.35-.55-.43-1.72.12-1.79-1.23 1.82-.29-.62-.51-1 .11s-.34-.69-.17-.86.51.17.51.17.66-.34.32-.68a3.39 3.39 0 00-1.92-.4c-2.06-6.3-8.18-7-10.56-7l-1.82.15a1.61 1.61 0 00.32 1.15 18.21 18.21 0 014.24.44l-1.29.22a8.66 8.66 0 00-3-.66l-1.75 1 .21.72h.74v-.43a5.66 5.66 0 014.38 2v.57l.78 2-.55 1.48-.48.29v.67l-.53 1.17.21 1.94 3.36-.39 1.13 3.32 2.09-.53-.59-1.68.42.05a1.22 1.22 0 00.57 1.2c3.39 1.65 4.44-1.35 4-2.26-.6-.3-1.17-1.33-.89-1.33zm-8.38.81a3.05 3.05 0 01-.15-1.37l.85-.14.7 1.22a10.23 10.23 0 01-1.4.29zm3.62-.62l-3.31-9.37a5.91 5.91 0 011.72.76l.35 2.12.77 1s-.14-1.24-.32-2.41a7.86 7.86 0 013.15 3.75l-2.23.23-2.17-3.23v.68l2.26 6.24zm.83-2l-.29-.73 2.21-.38v.56h-.39v.32zm.76 2l-.17-1.24 1.25-.35.06.35.61-.15.29.77a6.18 6.18 0 00-2.04.62z"
                                    />
                                    <path
                                        id="prefix__path3823"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M603.9 146l7.13 4.71a1.66 1.66 0 011.19.67 16.9 16.9 0 002 2.14s.56 1.49-.19 2.24-2.73-.93-2.73-.93l-7.9-5.8-.43-2.35z"
                                    />
                                    <path
                                        id="prefix__path3825"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M612.34 135.49l-.12.09.08-.14z"
                                    />
                                    <path
                                        id="prefix__path3827"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M618.37 132.47l-.46.47c.32-.08.52-.11.52-.11z"
                                    />
                                    <path
                                        id="prefix__path3829"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M618.37 132.47l-.17-1.1a13 13 0 00-2.09.56l-.05-.18-.62.16.06.23a16.88 16.88 0 00-3.43 1.75l-.21-.34-.54.34.23.37a11.25 11.25 0 00-4.7 7.85c-.21 1.32-.37 2.38-.47 3.21l-1.11 1.84.39.23.58-1q-.06.56-.09.87a4.92 4.92 0 00-.81 1.61l2.12 1.3a8.9 8.9 0 00.15-2.51c0-.47.15-1.85.57-4.49l4.42-7.36.51-.33-.17-.26-.08-.12.27-.17c.17-.12.36-.23.55-.34a15.26 15.26 0 012.19-1l.15.59.63-.17-.17-.64c.59-.2 1.09-.33 1.43-.41zm-10 9.54a9.76 9.76 0 013.86-6.43z"
                                    />
                                    <path
                                        id="prefix__path3831"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M612.34 135.49l-.12.09.08-.14z"
                                    />
                                    <path
                                        id="prefix__path3833"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M613.13 135l-.19.29-.08-.12z"
                                    />
                                    <path
                                        id="prefix__path3835"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M651.82 91.79l.16 1.38h-1l4.12 27.52a4.79 4.79 0 011.09.57c.41 0 .69-.72.69-.72v-4.94l-.32-5.32-.8-5.46-.58-3.78-.83-3-.9-2.91-.58-1.45-.58-1.17-.21-.38z"
                                    />
                                    <path
                                        id="prefix__path3837"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M651.15 120.21a14.15 14.15 0 013.57 3.36c1.75-3.48 2-23.81-4.85-32.5-2.29-.65-1.56 1.08-1.56 1.08l1.91 26.61z"
                                    />
                                    <path
                                        id="prefix__path3839"
                                        transform="translate(-.65 -.12)"
                                        d="M643.45 86.12s-.52-.24-1.26-.54h-.12l-.69-.27h-.06a12.8 12.8 0 00-3.14-.85s-3-2.49-3.71-4.52a7.56 7.56 0 013.39 1.06c1.29.62 2.31 1.15 3.11 1.63l.18.12q.35.21.63.42l.17.13a3.25 3.25 0 011.5 2.82z"
                                        fill="#86a1e8"
                                    />
                                    <path
                                        id="prefix__path3841"
                                        className="prefix__cls-118"
                                        transform="translate(-.65 -.12)"
                                        d="M649.32 91.73c1.47 3.51 3 9.16 3 22.25a4.29 4.29 0 01-.65 1.69 5.49 5.49 0 01-.21 3.5 1.19 1.19 0 00.3 1.15c-.92-.92-46.68 3.81-46.68 3.81s-2.44-2.92-2.44-14.52a54.17 54.17 0 013.17-17.84c.53-1 3.51-5.17 14.94-6.53 3.16-1.4 4.11-1.4 4.11-1.4a2.19 2.19 0 012.13.21 6 6 0 002.59.36 39.84 39.84 0 015.73-.22c1 0 1.94.09 2.83.2a20.64 20.64 0 015.26 1.73c1.31.57 4.9 2.7 6.42 4.95z"
                                    />
                                    <path
                                        id="prefix__path3843"
                                        className="prefix__cls-119"
                                        transform="translate(-.65 -.12)"
                                        d="M620.8 85.24c0-2.7 1.2-4.31 4-4.52s6.28-.6 9.25-.83 4 2 4.18 4.5c-3.78-.47-17.43.85-17.43.85z"
                                    />
                                    <path
                                        id="prefix__path3845"
                                        className="prefix__cls-120"
                                        transform="translate(-.65 -.12)"
                                        d="M609.46 129.27c6.79 4.47 15.23 6.09 35.29 3.13 2.63-.43 7.09-4.34 7.09-4.34a11.47 11.47 0 00-2.3-5.07l-18.69-2.16-18.92 3.11-3.37 3.43z"
                                    />
                                    <path
                                        id="prefix__path3847"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M605.13 124.13c-.39-3.26 3.53-5.56 10-6.6s23.08-3.23 31.89.4c5.82 2.54 7.72 5.64 7.72 5.64a8.67 8.67 0 01-2.88 4.49c-4.2-4.2-8-6.07-17.33-6.07s-20.38 1.81-23.32 3.54-1.73 3.74-1.73 3.74c-1.4-.69-4.35-5.14-4.35-5.14z"
                                    />
                                    <path
                                        id="prefix__path3849"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M638.31 106.84c.7-.49 4-.64 4.49-.64s1.75-.08 2.21 1.86c-1-1-6.58.23-6.58.23l-1.61 1.38V109l.53-1.18.3-.41.4-.4z"
                                    />
                                    <path
                                        id="prefix__path3851"
                                        className="prefix__cls-121"
                                        transform="translate(-.65 -.12)"
                                        d="M636 84.29c0-.44.29-.81.19-1.48s-.21-.76-.43-.1 0 .56 0 1.58z"
                                    />
                                    <path
                                        id="prefix__path3853"
                                        className="prefix__cls-122"
                                        transform="translate(-.65 -.12)"
                                        d="M603.54 107.49c.38-3.16 1.39-10.57 3.64-15.07a1.65 1.65 0 01.59-.64c6.85-4.21 15.21-5.1 21-5.1a50.91 50.91 0 0113 1.59 1 1 0 01.67.62 78.81 78.81 0 013.13 15.54c-3.78-2.34-10.56-3.72-18.44-3.72-8.46 0-19.66 1.78-23.59 6.78z"
                                    />
                                    <path
                                        id="prefix__path3855"
                                        className="prefix__cls-123"
                                        transform="translate(-.65 -.12)"
                                        d="M628.79 87.13a50.05 50.05 0 0112.9 1.57.55.55 0 01.37.34 79.13 79.13 0 013 14.57c-4-2.12-10.45-3.35-17.91-3.35-8 0-18.31 1.57-23 5.88.46-3.62 1.46-9.67 3.39-13.52a1.1 1.1 0 01.42-.46c6.76-4.16 15-5 20.79-5m0-.89c-7 0-14.91 1.26-21.25 5.16a2.07 2.07 0 00-.76.82c-2.32 4.64-3.33 12.2-3.67 15.53a.33.33 0 00.34.38.36.36 0 00.28-.15c3.31-4.56 13.57-6.83 23.44-6.83 7.74 0 15.24 1.39 19 4.17a78.85 78.85 0 00-3.24-16.58 1.42 1.42 0 00-1-.9 50.86 50.86 0 00-13.14-1.6z"
                                    />
                                    <path
                                        id="prefix__path3857"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M604.26 106.12c2.27-2.64 10.28-5.12 16.66-5.54.43-3.06 1.89-13.11 1.89-13.11-7.82.93-12.37 3.12-14.86 4.72a1.59 1.59 0 00-.48.62 43.46 43.46 0 00-3.21 13.31z"
                                    />
                                    <path
                                        id="prefix__path3859"
                                        transform="translate(-.65 -.12)"
                                        d="M607.72 99.79l-2.12-1.47a51.56 51.56 0 00-1.34 7.8 14 14 0 013.12-2.14 20.87 20.87 0 01.34-4.19z"
                                        fill="#d2ecfe"
                                        opacity={0.42}
                                    />
                                    <path
                                        id="prefix__path3861"
                                        className="prefix__cls-123"
                                        transform="translate(-.65 -.12)"
                                        d="M623 86.54c-.42 2.21-2.17 14.93-2.17 14.93l2.31-.19 2-14.92z"
                                    />
                                    <path
                                        id="prefix__path3863"
                                        className="prefix__cls-120"
                                        transform="translate(-.65 -.12)"
                                        d="M624.4 87.32c-.36 1.84-1.48 10-1.81 12.44a.57.57 0 00.62.64L625 87.26z"
                                    />
                                    <path
                                        id="prefix__path3865"
                                        className="prefix__cls-125"
                                        transform="translate(-.65 -.12)"
                                        d="M636.9 109.44a3.83 3.83 0 013.59-2.7c1.59-.13 3.51-.49 4.15.47s1.12 3.8-.8 7.46a11 11 0 01-6.13 4.87s-1.43.62-2-1.6a17.09 17.09 0 01.4-7.63 5.9 5.9 0 012.15-3.47 3.79 3.79 0 00-1.36 2.6z"
                                    />
                                    <path
                                        id="prefix__path3867"
                                        className="prefix__cls-120"
                                        transform="translate(-.65 -.12)"
                                        d="M638 107.68a12.12 12.12 0 014.81-.81c1.6 0 1.88 1.45 1.88 2.48s-.22 5.84-4.28 8.39c-1.38.86-3.22 1.83-3.78 1.05-.39-.53-1.14-1.92-.65-5.7a20 20 0 01.89-3.65 3.51 3.51 0 011.13-1.76z"
                                    />
                                    <path
                                        id="prefix__path3869"
                                        className="prefix__cls-125"
                                        transform="translate(-.65 -.12)"
                                        d="M605.1 110.48c1.3-.14 1.69.3 2.18 1.39s4 9.34 4.26 9.89-.06 1-1.26.68a10.57 10.57 0 01-5.62-3.44c-1.58-2.15-2.3-7.8-.84-8.22a8.74 8.74 0 011.28-.3z"
                                    />
                                    <path
                                        id="prefix__path3871"
                                        className="prefix__cls-120"
                                        transform="translate(-.65 -.12)"
                                        d="M605.2 111c1.14-.14 1.5.26 1.95 1.25s3.66 8.48 3.89 9 0 .89-1.11.63a9.3 9.3 0 01-5-3.07c-1.43-2-2.13-7.1-.85-7.5a7.64 7.64 0 011.12-.31z"
                                    />
                                    <path
                                        id="prefix__path3873"
                                        className="prefix__cls-125"
                                        transform="translate(-.65 -.12)"
                                        d="M650.12 107.61c1.2.24 1.3.73 1.46 1.26s.68 5.09-.29 6.95a.83.83 0 01-.95.41c-2-.52-3.06-.57-3.28-2.29a30 30 0 01.49-6 .62.62 0 01.69-.52z"
                                    />
                                    <path
                                        id="prefix__path3875"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M650.74 115.49a.64.64 0 01-.77.37 7.37 7.37 0 01-2-.69 1.75 1.75 0 01-.66-1.4 31.86 31.86 0 01.43-5.58.52.52 0 01.57-.47l1.52.23a1.66 1.66 0 01.79.36l.08.08a1.59 1.59 0 01.31.73c.11.39.53 4.66-.27 6.37z"
                                    />
                                    <path
                                        id="prefix__path3877"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M648.09 107.37c-.1.11.22.31.22.31a.51.51 0 00-.25 0 .63.63 0 00-.31.43l-.24 1.83c-.06.11-.16.14-.21.11s0-.1 0-.11l.29-2.09a.7.7 0 01.2-.37.68.68 0 01.3-.11z"
                                    />
                                    <path
                                        id="prefix__path3879"
                                        className="prefix__cls-126"
                                        transform="translate(-.65 -.12)"
                                        d="M607.5 92.75a41.84 41.84 0 00-3.24 13.37 8.27 8.27 0 01.78-.68 45.15 45.15 0 011.17-6.76 45.86 45.86 0 012.3-6.82c-.25.15-.43.24-.56.33a1.27 1.27 0 00-.33.36z"
                                    />
                                    <path
                                        id="prefix__path3881"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M641.78 88.88a91.59 91.59 0 01-2.78 12.59 59.64 59.64 0 00-15.75-1.07L625 87.26a53.45 53.45 0 0116.67 1.42.16.16 0 01.11.2z"
                                    />
                                    <g id="prefix__g3885" className="prefix__cls-127">
                                        <path
                                            id="prefix__path3883"
                                            className="prefix__cls-115"
                                            transform="translate(-.65 -.12)"
                                            d="M641.83 88.75a8.78 8.78 0 01-.23 3.25c-.16.52-.4 1-.54 1.56a8.78 8.78 0 00-.23 1.62 17.66 17.66 0 01-.53 3.24 11.56 11.56 0 01-1.3 3h-.08a18.18 18.18 0 01.46-3.25 27.86 27.86 0 011-3.11 7.17 7.17 0 00.43-1.57c.08-.54 0-1.1.09-1.64a10.5 10.5 0 01.87-3.15z"
                                        />
                                    </g>
                                    <path
                                        id="prefix__path3887"
                                        className="prefix__cls-126"
                                        transform="translate(-.65 -.12)"
                                        d="M650.71 108.35a4.1 4.1 0 01-.51 1.75 5.88 5.88 0 00-.55.76 2.44 2.44 0 00-.23.89 4.74 4.74 0 01-.14.93 6.74 6.74 0 01-.24.88 5.36 5.36 0 01-1 1.62 4.85 4.85 0 01.15-1.87 6.45 6.45 0 01.35-.86 4.61 4.61 0 01.48-.82 2.71 2.71 0 00.42-.83c.08-.29.07-.64.13-.94a2.48 2.48 0 01.41-.85 2.13 2.13 0 01.71-.69z"
                                    />
                                    <path
                                        id="prefix__path3889"
                                        transform="translate(-.65 -.12)"
                                        d="M623.54 98H627a1.65 1.65 0 011.65 1.65 1.81 1.81 0 01-.06.64c-1.88-.07-5.38.12-5.38.12.06-.41.33-2.41.33-2.41z"
                                        opacity={0.15}
                                        fill="#dad4ce"
                                    />
                                    <ellipse
                                        id="prefix__ellipse3891"
                                        className="prefix__cls-121"
                                        transform="rotate(-30 636.84 106.52)"
                                        cx={637.38}
                                        cy={105.36}
                                        rx={1.98}
                                        ry={0.95}
                                    />
                                    <path
                                        id="prefix__path3893"
                                        className="prefix__cls-118"
                                        transform="translate(-.65 -.12)"
                                        d="M656.56 125.19c.27-.81.12-1.89-.38-3.93.7-2.33.59-7.26 0-12.52v-.09a47.34 47.34 0 00-1.33-5.37c-.89-2.77-2.39-3.09-3.45-3.09v-.89a4 4 0 013.62 2.15c-.85-4.12-2-7.75-3.15-9.65.09.1 1.57 1.75 3.4 8.71 1.84 7.18 2.41 21.49 1.29 24.68z"
                                    />
                                    <path
                                        id="prefix__path3895"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M651.84 128.06l-.46.39-.07.06-.44.38-.11.08-.66.52c-.16.13-.33.25-.51.38a13.15 13.15 0 01-4.38 2.43c-.07 0-.5.09-1.19.19H644c-4.11.61-17.22 2.3-24.3.77-1.5-.32-2.83-.66-4-1a24.58 24.58 0 01-3.48-1.35h-.06a15.66 15.66 0 01-2.63-1.58 20 20 0 01-4.33-5.14 11.44 11.44 0 01-1.48-3.92c-1.47-7 9.11-8.7 22.21-9.28s20.3 3.68 25.85 7.76a2.72 2.72 0 01-.2.48 1.21 1.21 0 00.19 1h.12v.09a1.42 1.42 0 00-.66-.11 21.37 21.37 0 00-8.74-3.58c3.77 2.83 8.89 9.2 9.35 11.43z"
                                    />
                                    <path
                                        id="prefix__path3897"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M642.19 85.58h-.12a6 6 0 00-.29-2.37l.17.13a7.34 7.34 0 01.24 2.24z"
                                    />
                                    <path
                                        id="prefix__path3899"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M610 118.8a19 19 0 00-3.16 1.72 8.57 8.57 0 003.68 1.39c.84 0 .51-.72.51-.72z"
                                    />
                                    <path
                                        id="prefix__path3901"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M607.82 113.74a6.94 6.94 0 00-3.81 3.12 6.74 6.74 0 00.73 1.65 9.68 9.68 0 013.78-3.16c-.52-1.23-.7-1.61-.7-1.61z"
                                    />
                                    <path
                                        id="prefix__path3903"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M636.28 111.6c-.87 3.28-.42 6.39.38 7.19s2.78-.48 2.78-.48 3.29-1.7 4.26-4.38a32.18 32.18 0 00-3.56-1.36 34 34 0 00-3.86-.97z"
                                    />
                                    <path
                                        id="prefix__path3905"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M644.12 107.37c-.64-1-2.93 4-3.21 5.45.81.22 2.79 1.11 2.79 1.11s1.91-4.26.42-6.56z"
                                    />
                                    <path
                                        id="prefix__path3907"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M650.83 105.53c-.53.76-2.21.18-2.39.08s-1-.73-1.37-3-1.92-11.64-1.92-11.81a.63.63 0 01.27-.56l.87 5.39v.08h.36l.16.64.34.5.4 4.38s0 .8.43 1 3.14 1 3.14 1l.07.11v.18l-2.53-.75-.95-.36-.43-.55.18 1.13.73 1.14.89 1.05.85.08.89-1.23.38-.33a3.05 3.05 0 01-.37 1.83z"
                                    />
                                    <path
                                        id="prefix__path3909"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M647.47 103l3.36 1c-.09.71 0 1.53-1.39 1.45s-1.97-2.45-1.97-2.45z"
                                    />
                                    <path
                                        id="prefix__path3911"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M648.9 96.67a13.1 13.1 0 001.33.41s.65 3.7.74 5.79a10.58 10.58 0 00-1.53-.68c0-1.19-.54-5.52-.54-5.52z"
                                    />
                                    <path
                                        id="prefix__path3913"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M646.82 96.31c1 0 1.71-.19 1.83.51s.5 4.7.5 4.82-.08.42-.87.25-.7-.55-.79-1.5-.57-3.79-.67-4.08z"
                                    />
                                    <path
                                        id="prefix__path3915"
                                        className="prefix__cls-122"
                                        transform="translate(-.65 -.12)"
                                        d="M648.82 101a20.32 20.32 0 00-.35-3.1 7.53 7.53 0 00.35 3.1"
                                    />
                                    <path
                                        id="prefix__path3917"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M651.21 103.67c-.74-.29-2.81-.91-3.45-1.08-.29-.16-.47-.77-.47-.77l.18-.07s.22.55.4.62l3.27 1c-.06-1.44-.67-5.72-.83-6.56a1.86 1.86 0 000-.27 1.84 1.84 0 01-.54-.55l-4.2-5.15-.1-.65a1.92 1.92 0 012.45.45 14 14 0 012.35 5.17v.11c.28 1.52 1.15 6.91.94 7.75z"
                                    />
                                    <path
                                        id="prefix__path3919"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M646.21 95.11a18.5 18.5 0 013.51.89c-.35-2.63-2.38-5.57-3.24-5.66s-1 .51-1 .51z"
                                    />
                                    <path
                                        id="prefix__path3921"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M650.25 95.93v-.11z"
                                    />
                                    <path
                                        id="prefix__polygon3923"
                                        className="prefix__cls-28"
                                        d="M646.64 101.71h-.01v-.01l-.98-6.14h.11l.99 6.13z"
                                    />
                                    <path
                                        id="prefix__path3925"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M651.81 128.07l-.43.38-.07.06-.44.38-.11.08c-.2.17-.42.35-.66.52s-.33.25-.51.38-.66.46-1 .69a16.77 16.77 0 01-3.3 1.72l-1.26.21H644c-4.11.61-17.22 2.3-24.3.77-1.5-.32-2.83-.66-4-1a36.78 36.78 0 01-3.48-1.35h-.06a17 17 0 01-2.65-1.62l-.08-.19a37.22 37.22 0 009.47 3.63c5 1.15 9.16.9 14.89.54a102.06 102.06 0 0011.45-1.36 16.22 16.22 0 003.17-1.67 24.34 24.34 0 003.18-2.44z"
                                    />
                                    <path
                                        id="prefix__path3927"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M648.55 125.25a59.72 59.72 0 01-24.72 5.37 44.33 44.33 0 01-14.6-2.15 2.18 2.18 0 01.15-1.07c2 .81 7.21 2.16 14.49 2.16h.07a58.87 58.87 0 0023.53-5c.38.25.76.44 1.08.69z"
                                    />
                                    <path
                                        id="prefix__rect3929"
                                        className="prefix__cls-28"
                                        transform="rotate(17.13 615.92 134.67)"
                                        d="M614.79 136.61h2.32v.64h-2.32z"
                                    />
                                    <path
                                        id="prefix__path3931"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M615.05 141.76l.44.11v.2h3.17a.37.37 0 110 .74h-3.24v.45l-.57-.17c-.06.37-.1.74-.14 1.13-.69 5.74-.78 8-.78 8a2.59 2.59 0 01-.15 1.85 17.4 17.4 0 01-1.89-.89c.6-.24.37-1.8.37-1.8a1.15 1.15 0 00.22.05c.08-1.07.26-3.37.75-7.38 0-.48.1-.94.18-1.39h-.17l.06-1.31.34.08a17.4 17.4 0 014.31-8.45c.32-.08.52-.11.52-.11l-.06-.36c.32-.31.63-.59.94-.84a14.5 14.5 0 015.29-2.86l.17.73.17.72c-.38.05-7.93 2-9.93 11.5z"
                                    />
                                    <path
                                        id="prefix__path3933"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M599.24 148.86l11 7.13s1.38.24 1.78-.16l1.89 1.89 1.32-.15-1.29-1.8a3.75 3.75 0 00-1.07-1.07c-.66-.41-8.54-5.17-8.54-5.3s0-1.42-.56-1.56-2.69-.87-2.69-.87z"
                                    />
                                    <path
                                        id="prefix__path3935"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M618.43 132.83s-.2 0-.52.11l.46-.47z"
                                    />
                                    <path
                                        id="prefix__path3937"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M606.44 135.71h-.15a11.55 11.55 0 01-.1 2.12c0 .14-.05.27-.08.4l.09.51-2.29 7.08v.18l-.08 1.83s-1.4.6-2.16 0v.82s-2.42 1.23-3.3-.74a2.42 2.42 0 012.32-3.45c-.3-1-.61-2.2-.61-2.2l-.24-.08-.58-1.47a.43.43 0 01.36-.59l1.65-.15h.11l.29.15.63.33 1.27-3.33-.45-2.29a.41.41 0 01.41-.49H605l.29.22 1.11.87z"
                                    />
                                    <path
                                        id="prefix__polygon3939"
                                        className="prefix__cls-112"
                                        d="M600.71 139.86l.3.15 1.45 4.49-.32.1-1.53-4.73z"
                                    />
                                    <path
                                        id="prefix__polygon3941"
                                        className="prefix__cls-112"
                                        d="M604.27 134.23h.12l.28.22h.01l.86 3.26v.01l.08.28.11.59-2.32 7.36-.16-.06-.16-.05 2.29-7.27-.09-.49z"
                                    />
                                    <path
                                        id="prefix__polygon3943"
                                        className="prefix__cls-28"
                                        d="M629.71 134.98l12.11-1.2-.12-1.43-11.99 1.36z"
                                    />
                                    <path
                                        id="prefix__polygon3945"
                                        className="prefix__cls-115"
                                        d="M643.67 135.46l-1.85-1.68-12.11 1.2 1.86 1.54z"
                                    />
                                    <path
                                        id="prefix__path3947"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M657.06 121.61l26.31-2.61 1.55 1.33s-.14.84-.89.84-25 2.53-25 2.53z"
                                    />
                                    <path
                                        id="prefix__path3949"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M683.37 119c0 .52 0 1.92.66 2.17-1.3.11-25 2.53-25 2.53l-2-2z"
                                    />
                                    <path
                                        id="prefix__path3951"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M683.37 119v.85c-1.3.11-25.53 2.64-25.53 2.64l-.8-.84z"
                                    />
                                    <ellipse
                                        id="prefix__ellipse3953"
                                        className="prefix__cls-129"
                                        transform="rotate(-15.48 683.6 122.29)"
                                        cx={684.34}
                                        cy={119.95}
                                        rx={0.41}
                                        ry={0.54}
                                    />
                                    <path
                                        id="prefix__path3955"
                                        className="prefix__cls-116"
                                        transform="translate(-.65 -.12)"
                                        d="M658.36 92.86l-.69 28.14-1.92-1.41 1.31-9.32.36-17.14a1.2 1.2 0 01.94-.27z"
                                    />
                                    <g id="prefix__g3959" className="prefix__cls-127">
                                        <path
                                            id="prefix__path3957"
                                            className="prefix__cls-130"
                                            transform="translate(-.65 -.12)"
                                            d="M658.4 92.86a44.88 44.88 0 01.16 7c-.1 1.17-.25 2.34-.32 3.51s0 2.35 0 3.53c.11 2.35.11 4.7.06 7a66.69 66.69 0 01-.61 7h-.09c-.22-2.36-.27-4.71-.26-7.06s.18-4.69.41-7c.1-1.18.18-2.35.18-3.52s-.1-2.35-.14-3.53a44.84 44.84 0 01.5-7z"
                                        />
                                    </g>
                                    <path
                                        id="prefix__path3961"
                                        className="prefix__cls-129"
                                        transform="translate(-.65 -.12)"
                                        d="M657.92 91.45a.77.77 0 011.08 0z"
                                    />
                                    <path
                                        id="prefix__path3963"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M656.11 80.52l.2.48-.68 1.87h-.74s-.15-1.05-.23-1.64l-.74.36-.29 1.57-5.19 2.42-.25 3.65-2.06-1.58-.16-.9a1.72 1.72 0 01.81-1.78l4.05-2.41v-2.09h-.61v-.87h-1.89l-.13-2.26-1 .08v-.73l4-.3V76l3.4-.25.42-.42h.48v2.4l.66.44.4 2.11z"
                                    />
                                    <g id="prefix__g3967" className="prefix__cls-127">
                                        <path
                                            id="prefix__path3965"
                                            className="prefix__cls-130"
                                            transform="translate(-.65 -.12)"
                                            d="M646.73 88a6.54 6.54 0 01-.26-1.08 1.63 1.63 0 01.32-1.11 9.86 9.86 0 011.74-1.38 10 10 0 011.91-1.09l1-.41a.57.57 0 00.25-.82.71.71 0 01.2.54.83.83 0 01-.33.52 7.66 7.66 0 01-1 .5l-2 .93A3.6 3.6 0 00647 86a1.77 1.77 0 00-.29 1v1.08z"
                                        />
                                    </g>
                                    <path
                                        id="prefix__polygon3969"
                                        className="prefix__cls-112"
                                        d="M654.35 84.02h.75l-.12-1.27h-.74z"
                                    />
                                    <path
                                        id="prefix__polygon3971"
                                        className="prefix__cls-28"
                                        d="M654.35 85.28h.89l-.14-1.26h-.75z"
                                    />
                                    <path
                                        id="prefix__path3973"
                                        className="prefix__cls-114"
                                        transform="translate(-.65 -.12)"
                                        d="M655 85.4l-1.84 1.21a49 49 0 015-.16 21.68 21.68 0 00-2.22-1z"
                                    />
                                    <path
                                        id="prefix__path3975"
                                        className="prefix__cls-113"
                                        transform="translate(-.65 -.12)"
                                        d="M655.9 78.3a6.46 6.46 0 011 .76 3 3 0 01.24 2.5c-.31.62-1.38-.61-1.38-.61"
                                    />
                                    <path
                                        id="prefix__path3977"
                                        className="prefix__cls-113"
                                        transform="translate(-.65 -.12)"
                                        d="M647.43 76.93c-1.17.21-1.17 1.68 1.06 2"
                                    />
                                    <path
                                        id="prefix__path3979"
                                        className="prefix__cls-113"
                                        transform="translate(-.65 -.12)"
                                        d="M647.62 77.23a5.28 5.28 0 01-.75 2.91C646 82 648.62 84 648.62 84"
                                    />
                                    <path
                                        id="prefix__path3981"
                                        className="prefix__cls-113"
                                        transform="translate(-.65 -.12)"
                                        d="M649.59 78.52c-.1 1.24-.9 3.47 1.48 3.47"
                                    />
                                    <path
                                        id="prefix__polygon3983"
                                        className="prefix__cls-112"
                                        d="M623.13 82.02l.52 2.79.32-.03.15.51-1.42.17-.28-3.44z"
                                    />
                                    <path
                                        id="prefix__polygon3985"
                                        className="prefix__cls-115"
                                        d="M622.95 85.43l1.17-.14-.15-.51-.32.03-.52-2.79h-.38z"
                                    />
                                    <path
                                        id="prefix__path3987"
                                        className="prefix__cls-115"
                                        transform="translate(-.65 -.12)"
                                        d="M626.58 83.82a14 14 0 00-1.59 0h-.08c-.29-.28.44-.31.44-1s.3-.84.3-.84c.35 0 .38 1.44.81 1.53.19.04.12.31.12.31z"
                                    />
                                    <path
                                        id="prefix__line3989"
                                        stroke="#dad4ce"
                                        strokeWidth={0.11}
                                        strokeMiterlimit={10}
                                        fill="none"
                                        d="M625.22 72.62l-.23 9.33"
                                    />
                                    <path
                                        id="prefix__path3991"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M625.08 83.74s-.07.05-.09.09h-.08c-.29-.28.44-.31.44-1s.3-.84.3-.84.02 1.58-.57 1.75z"
                                    />
                                    <path
                                        id="prefix__polygon3993"
                                        className="prefix__cls-28"
                                        d="M626.58 78.64l6.9-.63-2.18-4.35-.15-3.54-2.65.15.22 3.34z"
                                    />
                                    <path
                                        id="prefix__polygon3995"
                                        className="prefix__cls-120"
                                        d="M630.44 73.68l1.15 4.5 1.89-.17-2.18-4.35-.15-3.54-.82.05z"
                                    />
                                    <path
                                        id="prefix__path3997"
                                        className="prefix__cls-120"
                                        transform="translate(-.65 -.12)"
                                        d="M647.83 66.18c0-.15 0-.35-.08-.59L771.08 47.3l-7.76-3.8S657.78 64 648.2 64c-1.15-1.15-1.58-.93-1.58-.93l-15.41 1.77-3.29-.06-9.83-.18s-.77 3.18-89.38-9.54c-9.47 2.58-19.17 4.31-19.17 4.31 18.11 0 104.84 7.76 104.84 7.76l1.93.21v1.25l12.82 1.82 2.65-.15 16.11-3.48v-.38zm-28.22-.59s3.31.24 4.06.24a1.32 1.32 0 00.34.69l-4.4-.26zm.32 2.36v-.66a6.74 6.74 0 013.39.9c-.98 0-3.39-.19-3.39-.19zm15.74.24a4.66 4.66 0 00-.32-.45 10.82 10.82 0 001.78-.45c.55-.87 4.13-1.51 4.77-1.51s1.35 1 1.35 1zm2.94-2.19H638l-.84.13-.5.08-.68.1-.87-1 6.88-1 1.52.88z"
                                    />
                                    <path
                                        id="prefix__path3999"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M636 66.36V67l-7.1 1.4-6.41-1.25h-3.89l-2.29.17s.81-1.06 3.3-1.06l4.4.26s7 .55 11.08-1.16a6.56 6.56 0 01.91 1z"
                                    />
                                    <path
                                        id="prefix__polygon4001"
                                        className="prefix__cls-112"
                                        d="M627.68 65.66l-10.17-.73-.07-.46 9.82.17z"
                                    />
                                    <path
                                        id="prefix__path4003"
                                        className="prefix__cls-120"
                                        transform="translate(-.65 -.12)"
                                        d="M635.35 63.88c-.53.26-.53.52-.53.52l-2 .23-1.62.19-7.2-.13a11.17 11.17 0 01-2-.2c-.14 0-.22-.1-.22-.17.86-1.12 6.23-2.11 11.23-2a24.77 24.77 0 014.29.45l.25.05c.52.48-1.67.81-2.2 1.06z"
                                    />
                                    <path
                                        id="prefix__path4005"
                                        className="prefix__cls-28"
                                        transform="translate(-.65 -.12)"
                                        d="M647.86 66.38v-.2c0-.15 0-.35-.08-.59a17.43 17.43 0 00-4.26-.39l-4.88.75-.64.05-.84.13-.5.08-.68.1c0 1-5.58 1.15-8 1.15-2.79-.87-11-.82-11.62-.19v1.25l12.82 1.82 2.65-.15 16.11-3.48zM619.93 68v-.66a6.74 6.74 0 013.39.9c-.98-.05-3.39-.24-3.39-.24zm15.74.24a4.66 4.66 0 00-.32-.45 10.82 10.82 0 001.78-.45c.55-.87 4.13-1.51 4.77-1.51s1.35 1 1.35 1z"
                                    />
                                    <path
                                        id="prefix__path4007"
                                        className="prefix__cls-112"
                                        transform="translate(-.65 -.12)"
                                        d="M635.35 63.88c-.53.26-.53.52-.53.52l-2 .23.1-2 .11-.32a24.77 24.77 0 014.29.45l.25.05c.5.49-1.69.82-2.22 1.07z"
                                    />
                                    <path
                                        id="prefix__path4009"
                                        className="prefix__cls-119"
                                        transform="translate(-.65 -.12)"
                                        d="M637.33 62.79c-8.65-.9-14.93 1.34-15.28 1.7-.14 0-.22-.1-.22-.17 1.1-1.46 9.86-2.7 15.5-1.53z"
                                    />
                                    <path
                                        id="prefix__polyline4011"
                                        className="prefix__cls-113"
                                        d="M633.06 69.44V76h-.72"
                                    />
                                </g>
                                <g id="prefix__panneau_bois" data-name="panneau bois">
                                    <path
                                        id="prefix__rect4014"
                                        fill="#b17f49"
                                        d="M0 .29h288.06v1023.6H0z"
                                    />
                                    <path
                                        id="prefix__path4016"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M276.35 15h-23.86a61.1 61.1 0 00-14.84 13.34c-13 16.29-18.32 39.93-13.7 61.18 1.46 6.71 3.85 13.37 3.44 20.27-.88 14.49-13.2 24.06-23.31 33.16-19.77 17.8-35.08 41.73-43.78 68.41-8 24.38-9.2 55 7.4 73.12 7.9 8.62 18.67 13 29.28 16.38a212.94 212.94 0 0043.75 8.86c11.25 1.06 23 1.32 33.08 6.91a28.15 28.15 0 012.54 1.58v-52.46c-14.37-3.82-28.88-7.19-41.59-15.42-17.28-11.18-30.17-36-21.13-55.94 6.54-14.43 21.56-20.7 35-26.6 10.4-4.57 21.54-10.8 27.71-20.64V110c-2.36-5.63-5.24-11.14-7.88-16.47-6.8-13.76-11.8-32.16-2.71-44.15a22.49 22.49 0 0110.59-7.59V15"
                                    />
                                    <path
                                        id="prefix__path4018"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M265.76 49.38c-9.09 12-4.09 30.39 2.71 44.15 2.64 5.33 5.52 10.84 7.88 16.47V41.79a22.49 22.49 0 00-10.59 7.59z"
                                    />
                                    <path
                                        id="prefix__path4020"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M50.1 233.12c1.06-3 .69-6.28.14-9.4C46 199.58 31.64 178.14 12.62 166v44.34a38.56 38.56 0 0111.29 12.82A6.57 6.57 0 0125 227c-.3 2.26-2.5 3.44-4.44 4.15a66.4 66.4 0 01-7.92 2.31v19.63c9.87-6.13 22.34-6.68 32-13.5a14.09 14.09 0 005.46-6.47z"
                                    />
                                    <path
                                        id="prefix__path4022"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M25 227a6.57 6.57 0 00-1.07-3.87 38.56 38.56 0 00-11.29-12.82v23.15a66.4 66.4 0 007.92-2.31c1.92-.71 4.12-1.89 4.44-4.15z"
                                    />
                                    <path
                                        id="prefix__path4024"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M119.9 33.24c4.72-1.61 8.55-5.43 12.21-9.14l9-9.08h-42.9c-.01 11.67 11.63 21.64 21.69 18.22z"
                                    />
                                    <path
                                        id="prefix__path4026"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M248.64 167.79c-13.45 5.9-28.47 12.17-35 26.6-9 19.93 3.85 44.76 21.13 55.94 12.71 8.23 27.22 11.6 41.59 15.42v-15.91a80.17 80.17 0 01-11.44-8.45c-4.16-3.69-8.21-8.28-9-14.15-1.11-7.82 4-15.27 10.19-19.14a43.87 43.87 0 0110.29-4.48v-56.47c-6.22 9.85-17.4 16.07-27.76 20.64z"
                                    />
                                    <path
                                        id="prefix__path4028"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M201.55 551.64c-10.27 6.39-18.91 15.53-27.45 24.56q-16.69 17.7-33.41 35.39c-5.21 5.53-10.71 14.54-6.05 20.66 1.81 2.38 4.67 3.35 7.37 4.15a403.1 403.1 0 0049.34 10.88 733.92 733.92 0 0085 9v-47.75A200.69 200.69 0 01251.8 612a108.42 108.42 0 01-68.35-19.65c16.15-6.54 33.87-5.31 51-4l41.9 3.2v-55.2c-6.73.12-13.47.55-20.16 1.07-18.81 1.52-38.19 3.96-54.64 14.22z"
                                    />
                                    <path
                                        id="prefix__path4030"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M183.45 592.39A108.42 108.42 0 00251.8 612a200.69 200.69 0 0024.55-3.51v-16.91l-41.9-3.2c-17.13-1.3-34.85-2.53-51 4.01z"
                                    />
                                    <path
                                        id="prefix__path4032"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M255.87 227.24c.83 5.87 4.88 10.46 9 14.15a80.17 80.17 0 0011.44 8.45v-46.22a43.87 43.87 0 00-10.29 4.48c-6.13 3.9-11.26 11.32-10.15 19.14z"
                                    />
                                    <path
                                        id="prefix__path4034"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M179.31 363.36c-1.43 2.22-1.5 5.22-1 7.89 1.83 9.11 9.81 15.3 17.95 17.33s16.6.82 24.92.33c18.35-1.09 36.76 1.37 55.14 4.37v-20.5a324.05 324.05 0 00-86.8-13.1c-3.71-.05-8.03.32-10.21 3.68z"
                                    />
                                    <path
                                        id="prefix__path4036"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M12.62 15v70.94c9 3.23 17.85 6.93 27.17 8.46 13.47 2.2 29.14-1.53 36.35-14.47C68.93 92.87 53.26 96.6 39.79 94.4c-9.32-1.53-18.19-5.23-27.17-8.46v44.64c4.87-.27 9.74-.38 14.61-.3 2.57 0 5.23.14 7.57 1.35a16.12 16.12 0 015.54 5.48c5.27 7.69 8.09 17.17 13.18 25s14 14.11 22.15 10.94c-8.18 3.17-17.06-3.11-22.15-10.94s-7.91-17.32-13.18-25a16.12 16.12 0 00-5.54-5.48c-2.34-1.21-5-1.31-7.57-1.35-4.87-.08-9.74 0-14.61.3V166c19 12.17 33.39 33.61 37.62 57.75.55 3.12.92 6.45-.14 9.4a14.09 14.09 0 01-5.47 6.47c-9.67 6.82-22.14 7.37-32 13.5v48.48c1-.81 1.91-1.59 2.84-2.41C51.15 268 80.84 227.22 96.38 179.65 80.84 227.22 51.15 268 15.46 299.16c-.93.82-1.89 1.6-2.84 2.41v76.74A99.08 99.08 0 0037 354.67c12-16.92 17.8-38.31 28.15-56.56 11-19.43 26.88-34.69 42.05-50.22s30.23-32.11 38.91-53 9.87-47.09-2-65.87c11.89 18.78 10.71 45 2 65.87s-23.73 37.44-38.91 53-31 30.79-42.05 50.22C54.78 316.36 49 337.75 37 354.67a99.08 99.08 0 01-24.36 23.64v17.05c32.29-13.9 67.88-19.91 101.61-11.57 16.37 4 31.92 11.33 47.76 17.49 36.94 14.38 75.47 22.63 114.36 27.86v-35.86c-18.38-3-36.79-5.46-55.14-4.37-8.32.49-16.78 1.71-24.92-.33s-16.12-8.22-17.95-17.33c-.53-2.67-.46-5.67 1-7.89 2.18-3.39 6.5-3.73 10.24-3.68a324.05 324.05 0 0186.8 13.1v-54.55a28.15 28.15 0 00-2.54-1.58c-10.13-5.59-21.83-5.85-33.08-6.91a212.94 212.94 0 01-43.78-8.86c-10.61-3.34-21.38-7.76-29.28-16.38-16.6-18.12-15.36-48.74-7.4-73.12 8.7-26.68 24-50.61 43.78-68.41 10.11-9.1 22.43-18.67 23.31-33.16.41-6.9-2-13.56-3.44-20.27-4.62-21.25.68-44.89 13.7-61.18A61.1 61.1 0 01252.49 15h-17.41c-6.86 4.49-14 8.65-20.81 13.06-17.06 11-34.18 25.75-39.19 47.07 5-21.32 22.13-36.09 39.19-47.07 6.85-4.41 13.95-8.57 20.81-13.06h-68.42a78.8 78.8 0 00-10.38 13c-9.08 14-17.41 30.59-32 36.41a39.52 39.52 0 01-16.37 2.33c-26.8-1.1-52.46-19.85-64.18-46.9 11.72 27.05 37.38 45.8 64.21 46.91a39.52 39.52 0 0016.37-2.33C138.87 58.6 147.2 42 156.28 28a78.8 78.8 0 0110.38-13h-25.58l-9 9.08c-3.66 3.71-7.49 7.53-12.21 9.14C109.84 36.66 98.2 26.69 98.21 15H12.62m95.32 295.76c4.68-12 13.67-21.07 20.28-31.85s10.67-25.59 4.5-36.69c6.17 11.1 2.1 25.9-4.5 36.69s-15.6 19.88-20.28 31.85-3.09 28.78 7.43 34.47c-10.52-5.67-12.12-22.47-7.43-34.45z"
                                    />
                                    <path
                                        id="prefix__path4038"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M182.4 866c-15.09 2.74-27.4 17.82-29.4 34.79s5.87 34.65 18.72 43.92c13.11 9.45 29.75 10.38 43.77 18 18 9.82 29.56 29.23 42.89 46.39h18v-45.92c-10.56-8.47-22.11-15.91-27.45-28.85-2-4.77-2.74-10.94.37-14.89a167.43 167.43 0 0127.08 5.12v-44.85a383.47 383.47 0 01-66.08-10.5c-9.21-2.29-18.62-4.94-27.9-3.21z"
                                    />
                                    <path
                                        id="prefix__path4040"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M248.9 934.33c5.34 12.94 16.89 20.38 27.45 28.85v-38.62a167.43 167.43 0 00-27.08-5.12c-3.11 3.95-2.33 10.12-.37 14.89z"
                                    />
                                    <path
                                        id="prefix__path4042"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M140.69 980.76c-5.89-3.66-13.28-7.32-19-3.3q.58 15.82.66 31.66h56.79a118.79 118.79 0 00-3.62-3.49c-10.63-9.82-22.77-17.37-34.83-24.87z"
                                    />
                                    <path
                                        id="prefix__path4044"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M231.17 706.82c-71.13-22.14-147-39-218.55-22.21v26.57l52.14-10.57c9.71-2 19.44-3.94 29.28-4.66 2.41-.18 5-.21 6.94 1.48 3.18 2.85 2.23 8.52.52 12.67-9.92 24-34 37.07-57.41 40.64A167.17 167.17 0 0112.62 752v43.51c10.6-1.27 21.18-2.9 31.4-6.22 12.69-4.11 24.62-10.75 37.16-15.4 37.53-13.91 78.25-9.29 117.55-4.53l62.1 7.53c5.15.63 10.34 1.27 15.52 2.05v-57.62c-15.08-4.9-30.13-9.82-45.18-14.5z"
                                    />
                                    <path
                                        id="prefix__path4046"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M85.41 902.51c-3.67-8.64-9.31-16.94-17.41-20-4.3-1.61-8.94-1.6-13.47-1.41a193.23 193.23 0 00-41.91 6.48v35.74a159.89 159.89 0 0141.17-1c4.18.44 8.6 1.17 11.82 4.19 4.47 4.21 5.26 11.46 5.66 18q2 32.25 1.37 64.62h18.08c.41-36.48 8.51-74.08-5.31-106.62z"
                                    />
                                    <path
                                        id="prefix__path4048"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M198.73 769.39c-39.3-4.76-80-9.38-117.55 4.53-12.54 4.65-24.47 11.29-37.16 15.4-10.22 3.32-20.8 4.95-31.4 6.22v46.93q44-5.26 87.56-14.65-43.49 9.39-87.56 14.65v45.14a193.23 193.23 0 0141.91-6.48c4.53-.19 9.17-.2 13.47 1.41 8.1 3 13.74 11.33 17.41 20 13.82 32.54 5.72 70.14 5.31 106.61h31.65q-.09-15.84-.66-31.66c5.7-4 13.09-.36 19 3.3 12.06 7.5 24.2 15 34.85 24.87 1.23 1.13 2.43 2.3 3.62 3.49h59.09c-15.58-9.79-32.73-16.2-49.56-23-10.58-4.3-21.58-9.18-28.76-18.89-4.27-5.77-6.85-12.83-9.65-19.63a255 255 0 00-31.21-55.31 255 255 0 0131.21 55.31c2.8 6.8 5.38 13.86 9.65 19.63 7.18 9.71 18.18 14.59 28.76 18.89 16.83 6.85 34 13.26 49.56 23h20.1c-13.37-17.15-24.86-36.6-42.91-46.42-14-7.64-30.66-8.57-43.77-18-12.85-9.27-20.74-27-18.72-43.92s14.34-32 29.43-34.82c9.28-1.7 18.69.95 27.87 3.24a383.47 383.47 0 0066.08 10.5v-67.17l-54.59-1.45c-11.45-.3-22.91-.6-34.33.37C167 813.21 147 819 127.41 826c19.54-7 39.56-12.77 60-14.5 11.42-1 22.88-.67 34.33-.37l54.59 1.45V779c-5.18-.78-10.37-1.42-15.52-2.05z"
                                    />
                                    <path
                                        id="prefix__path4050"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M168.45 517.46c10.76-7.09 20.55-16.32 32.32-21 9.73-3.85 20.23-4.33 30.55-4.64q22.52-.66 45-.45v-62.23c-38.89-5.23-77.42-13.48-114.36-27.86-15.84-6.16-31.39-13.45-47.76-17.49-33.73-8.34-69.32-2.33-101.61 11.57V447q3.49-.11 7-.05c29.57.44 58.58 8.55 87.26 16.62l26.37 7.43c4.79 1.35 10.06 3.08 12.61 7.81 3.82 7.11-.89 16.35-6.79 21.36-10.72 9.07-24.83 11.12-38.26 11.65-29.26 1.15-58.93-3.4-88.16-4.15v28.46c16.62.17 33.34 1.44 49.9 2.16 36.33 1.53 74.6-.18 105.93-20.83z"
                                    />
                                    <path
                                        id="prefix__path4052"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M39.53 484.67c3.28-.37 7-1.14 8.66-4.33s.17-7.67-2.5-10-6.15-3-9.49-3.49a135.84 135.84 0 00-23.58-1.39v20.59a222 222 0 0026.91-1.38z"
                                    />
                                    <path
                                        id="prefix__path4054"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M100.78 511.77c13.43-.53 27.54-2.58 38.26-11.65 5.9-5 10.61-14.25 6.79-21.36-2.55-4.76-7.83-6.46-12.61-7.76l-26.36-7.41c-28.68-8.07-57.69-16.18-87.26-16.62q-3.48-.06-7 .05v18.52a135.84 135.84 0 0123.58 1.39c3.34.5 6.82 1.19 9.49 3.49s4.19 6.7 2.5 10-5.38 4-8.66 4.33a222 222 0 01-26.91 1.41v21.54c29.25.67 58.92 5.22 88.18 4.07z"
                                    />
                                    <path
                                        id="prefix__path4056"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M231.17 706.82c15.05 4.68 30.1 9.6 45.18 14.5v-65a733.92 733.92 0 01-85-9A403.1 403.1 0 01142 636.4c-2.7-.8-5.56-1.77-7.37-4.15-4.66-6.12.84-15.13 6.05-20.66q16.71-17.69 33.41-35.39c8.54-9 17.18-18.17 27.45-24.56 16.47-10.26 35.83-12.7 54.64-14.19 6.69-.52 13.43-1 20.16-1.07v-45q-22.52-.19-45 .45c-10.32.31-20.82.79-30.55 4.64-11.77 4.66-21.56 13.89-32.32 21-31.33 20.65-69.6 22.36-105.93 20.78-16.56-.72-33.28-2-49.9-2.16v43.54A139.12 139.12 0 0139.28 581c7 1 13.9 2.59 20.93 2.8 18.13.54 35.71-7.92 53.85-7.73-18.14-.19-35.72 8.27-53.85 7.73-7-.21-14-1.77-20.93-2.8a139.12 139.12 0 00-26.66-1.36v58.16c2 0 3.93 0 5.88-.09 33.38-1.22 66.28-15.29 91.88-39.31-25.6 24-58.5 38.09-91.88 39.31-1.95.07-3.91.09-5.88.09v46.81c71.57-16.77 147.38.07 218.55 22.21z"
                                    />
                                    <path
                                        id="prefix__path4058"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M71.27 944.5c-.4-6.52-1.19-13.77-5.66-18-3.22-3-7.64-3.75-11.82-4.19a159.89 159.89 0 00-41.17 1v29.79a40.86 40.86 0 015.3-1.48c10.27-2.09 21.6.5 29.22 8.49 11.35 11.9 11.86 31.81 9 49h16.5q.58-32.31-1.37-64.61z"
                                    />
                                    <path
                                        id="prefix__path4060"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M44.09 750.74c23.41-3.57 47.49-16.62 57.41-40.64 1.71-4.15 2.66-9.82-.52-12.67-1.89-1.69-4.53-1.66-6.94-1.48-9.84.72-19.57 2.69-29.28 4.66l-52.14 10.57V752a167.17 167.17 0 0031.47-1.26z"
                                    />
                                    <path
                                        id="prefix__path4062"
                                        className="prefix__cls-133"
                                        transform="translate(-.65 -.12)"
                                        d="M47.14 960.15c-7.62-8-18.95-10.58-29.22-8.49a40.86 40.86 0 00-5.3 1.48v56h43.52c2.86-17.14 2.35-37.09-9-48.99z"
                                    />
                                </g>
                                <image
                                    opacity={zoneIsVisible('radio')}
                                    id="prefix__radio"
                                    x={887.12}
                                    y={355.76}
                                    width={88.566}
                                    height={98.546}
                                    preserveAspectRatio="none"
                                    xlinkHref="../../radio.png"
                                />
                                <g fill="#80bc0a" fillOpacity={0.981} strokeWidth={0.803}>
                                    <path
                                        onMouseUp={(e)=>ToolOverUp(e,'helicoptere')}
                                        onMouseOver={(e) => overArea('helicoptere')}
                                        onMouseOut={(e) => outArea('helicoptere')}
                                        fill={zoneIsVisible('helicoptere')==="1"?'#a4d97f':isDisplayable('helicoptere')&&onmove&&zoneIsVisibleOnHover('helicoptere')?'#a4d97f':'white'}
                                        id="prefix__zone-helico"
                                        opacity={opacity['helicoptere']}
                                        d="M563.32 30.382h137.7v139.87h-137.7z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'jetski')}
                                        onMouseOver={(e) => overArea('jetski')}
                                        onMouseOut={(e) => outArea('jetski')}
                                        fill={zoneIsVisible('jetski')==="1"?'#a4d97f':isDisplayable('jetski')&&onmove&&zoneIsVisibleOnHover('jetski')?'#a4d97f':'white'}
                                        id="prefix__zone-jetski"
                                        opacity={opacity['jetski']}
                                        d="M1040.4 154.85h137.7v139.87h-137.7z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'groupe_de_baigneurs')}
                                        onMouseOver={(e) => overArea('groupe_de_baigneurs')}
                                        onMouseOut={(e) => outArea('groupe_de_baigneurs')}
                                        fill={zoneIsVisible('groupe_de_baigneurs')==="1"?'#a4d97f':isDisplayable('baigneurs')&&onmove&&zoneIsVisibleOnHover('groupe_de_baigneurs')?'#a4d97f':'white'}
                                        id="prefix__zone-baigneur"
                                        opacity={opacity['groupe_de_baigneurs']}
                                        d="M517.5 255.2h137.7v139.87H517.5z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'drapeau_1')}
                                        onMouseOver={(e) => overArea('drapeau_1')}
                                        onMouseOut={(e) => outArea('drapeau_1')}
                                        fill={zoneIsVisible('drapeau_1')==="1"?'#a4d97f':isDisplayable('drapeau-gauche')&&onmove&&zoneIsVisibleOnHover('drapeau_1')?'#a4d97f':'white'}
                                        id="prefix__zone-drapeau-gauche"
                                        opacity={opacity['drapeau_1']}
                                        d="M343.07 336.23h137.7V476.1h-137.7z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'drapeau_2')}
                                        onMouseOver={(e) => overArea('drapeau_2')}
                                        onMouseOut={(e) => outArea('drapeau_2')}
                                        fill={zoneIsVisible('drapeau_2')==="1"?'#a4d97f':isDisplayable('drapeau-droit')&&onmove&&zoneIsVisibleOnHover('drapeau_2')?'#a4d97f':'white'}
                                        id="prefix__zone-drapeau-droite"
                                        opacity={opacity['drapeau_2']}
                                        d="M707.91 285.82h137.7v139.87h-137.7z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'voiture_4_4')}
                                        onMouseOver={(e) => overArea('voiture_4_4')}
                                        onMouseOut={(e) => outArea('voiture_4_4')}

                                        fill={zoneIsVisible('voiture_4_4')==="1"?'#a4d97f':isDisplayable('voiture')&&onmove&&zoneIsVisibleOnHover('voiture_4_4')?'#a4d97f':'white'}
                                        id="prefix__zone-voiture"
                                        opacity={opacity['voiture_4_4']}
                                        d="M437.04 783.58h137.7v139.87h-137.7z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'bouee_tube')}
                                        onMouseOver={(e) => overArea('bouee_tube')}
                                        onMouseOut={(e) => outArea('bouee_tube')}
                                        fill={zoneIsVisible('bouee_tube')==="1"?'#a4d97f':isDisplayable('bouee')&&onmove&&zoneIsVisibleOnHover('bouee_tube')?'#a4d97f':'white'}
                                        id="prefix__zone-bouee"
                                        opacity={opacity['bouee_tube']}
                                        d="M769.1 619.82h137.7v139.87H769.1z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'palmes')}
                                        onMouseOver={(e) => overArea('palmes')}
                                        onMouseOut={(e) => outArea('palmes')}
                                        fill={zoneIsVisible('palmes')==="1"?'#a4d97f':isDisplayable('palmes')&&onmove&&zoneIsVisibleOnHover('palmes')?'#a4d97f':'white'}
                                        id="prefix__zone-palme"
                                        opacity={opacity['palmes']}
                                        d="M994.8 637.9h137.7v139.87H994.8z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'jumelles')}
                                        onMouseOver={(e) => overArea('jumelles')}
                                        onMouseOut={(e) => outArea('jumelles')}
                                        fill={zoneIsVisible('jumelles')==="1"?'#a4d97f':isDisplayable('jumelles')&&onmove&&zoneIsVisibleOnHover('jumelles')?'#a4d97f':'white'}
                                        id="prefix__zone-jumelle"
                                        opacity={opacity['jumelles']}
                                        d="M1004.1 450.04h137.7v139.87h-137.7z"
                                    />
                                    <path
                                        onMouseUp={(e) => ToolOverUp(e,'radio')}
                                        onMouseOver={(e) => overArea('radio')}
                                        onMouseOut={(e) => outArea('radio')}
                                        fill={zoneIsVisible('radio')==="1"?'#a4d97f':isDisplayable('radio')&&onmove&&zoneIsVisibleOnHover('radio')?'#a4d97f':'white'}
                                        id="prefix__zone-radio"
                                        opacity={opacity['radio']}
                                        d="M859.81 372.74h137.7v139.87h-137.7z"
                                    />
                                </g>
                            </g>
                            <image
                                className="cursor" onClick={()=>router.push('/roadmap').then((r)=>{})}
                                id="prefix__btn-close"
                                x={255.56}
                                y={30.666}
                                width={35.961}
                                height={35.884}
                                preserveAspectRatio="none"
                                xlinkHref="../../btn-close.png"
                            />
                            <path

                                id="prefix__image1"
                                d="M-40.446 98.292l64.044.195.02-60-63.79.177z"
                                fillOpacity={0.8}
                                fill="white"
                                stroke="#52c41a"
                                strokeWidth={index === 0?"3":"0"}
                            />
                            <g strokeWidth={0.28}>
                                <path
                                    id="prefix__path11219"
                                    d="M-40.446 161.39l64.044.195.02-60-63.79.177z"
                                    fillOpacity={0.8}
                                    fill="white"
                                    stroke="#52c41a"
                                    strokeWidth={index === 1?"3":"0"}
                                >
                                    <title id="prefix__title11225">{"image2"}</title>
                                </path>
                                <path
                                    id="prefix__path11229"
                                    d="M-40.446 224.29l64.044.195.02-60-63.79.177z"
                                    fillOpacity={0.8}
                                    fill="white"
                                    stroke="#52c41a"
                                    strokeWidth={index === 2?"3":"0"}
                                >
                                    <title id="prefix__title11227">{"image3"}</title>
                                </path>
                                <path
                                    id="prefix__path11237"
                                    d="M-40.446 287.79l64.044.195.02-60-63.79.176z"
                                    fillOpacity={0.8}
                                    fill="white"
                                    stroke="#52c41a"
                                    strokeWidth={index === 3?"3":"0"}
                                >
                                    <title id="prefix__title11235">{"image4"}</title>
                                </path>
                            </g>
                            <path
                                id="prefix__rect1514"
                                fillOpacity={0.647}
                                strokeWidth={0.28}
                                d="M-46.356 31.059h75.329v31.907h-75.329z"
                            />
                            <path
                                id="prefix__rect10380"
                                fillOpacity={0.647}
                                strokeWidth={0.289}
                                d="M-46.424 269.66h76.18v33.609h-76.18z"
                            />
                            <image
                                className="cursor" onClick={()=>slideUp()}
                                id="prefix__btn-up"
                                x={-31.742}
                                y={28.835}
                                width={46.084}
                                height={32.499}
                                preserveAspectRatio="none"
                                xlinkHref="../../btn_up.png"
                            />
                            <image
                                className="cursor" onClick={()=>slideDown()}
                                id="prefix__btn-down"
                                transform="scale(-1)"
                                x={-14.342}
                                y={-303.17}
                                width={46.084}
                                height={32.499}
                                preserveAspectRatio="none"
                                xlinkHref="../../btn_up.png"/>
                            <image
                                id="prefix__image12085"
                                x="236.71283"
                                y="242.57033"
                                width="42"
                                height="50"
                                preserveAspectRatio="none"
                                xlinkHref="../../chrono.png"
                            />

                            <path
                                onClick={()=>setIsModalChrono(true)}
                                id="prefix__chrono"
                                d="M232.79 269.87v12.769h36.178l-.851-14.897h-36.604z"
                                fill="url(#timer)"
                                strokeWidth={0.265}
                            />
                            <path
                                id="prefix__drop-zone"
                                d="M29.792 30.743l-.036 272.53 181.75-2.33 5.959-52.352 10.64-7.235 62.569-3.405.846-171.4-47.665-8.218-2.128-25.963z"
                                fill="none"
                            />
                            <path
                                fill="url(#spin)"
                                fillOpacity="1" strokeWidth="0.265" d="M-45.2 1.448H10.435000000000002V29.811H-65.2z"></path>



                                <image
                                    onClick={(e,data)=>{displayQuestion(e,data,0)}}
                                    key={'d1'}
                                    width="45"
                                    height="40"
                                    x="-34"
                                    y="55"
                                    preserveAspectRatio="xMidYMid meet"
                                    href={slide1 === ""?"":"../../move/"+slide1}
                                ></image>


                                <image
                                    onClick={(e,data)=>{displayQuestion(e,data,1)}}
                                    key={'d2'}
                                    width="50"
                                    height="40"
                                    x="-34"
                                    y="110.499"
                                    preserveAspectRatio="xMidYMid meet"
                                    href={slide2 === ""?"":"../../move/"+slide2}
                                ></image>


                                <image
                                    onClick={(e,data)=>{displayQuestion(e,data,2)}}
                                    key={'d3'}
                                    width="50"
                                    height="40"
                                    x="-34"
                                    y="174.499"
                                    preserveAspectRatio="xMidYMid meet"
                                    href={slide3 === ""?"":"../../move/"+slide3}
                                ></image>


                                <image
                                    onClick={(e,data)=>{displayQuestion(e,data,3)}}
                                    key={'d4'}
                                    width="50"
                                    height="40"
                                    x="-34"
                                    y="238.499"
                                    preserveAspectRatio="xMidYMid meet"
                                    href={slide4 === ""?"":"../../move/"+slide4}
                                ></image>



                        </g>
                        <defs>
                            <pattern
                                id="timer"
                                width="1"
                                height="2"
                            >                             {/* <---- these attributes needed here */}
                                <text x={20}
                                      y={6} fontSize="5" ><Countdown date={dateNow*1000 +  (session.session?.should_end_date - dateNow)*1000} renderer={renderer}  /></text>
                            </pattern>
                        </defs>
                        <defs>
                            <pattern
                                id="spin"
                                width="5"
                                height="10"
                            >                             {/* <---- these attributes needed here */}
                                <text x={5}
                                      y={9} fontSize="10" style={{strokeWidth: '0.5',stroke: 'white'}} ></text>
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
