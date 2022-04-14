import Countdown from "react-countdown";
import React from "react";

<svg
    width="100%"
    height="100%"
    viewBox="0 0 722.84 541.87"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
>
    <g transform="translate(244.5 126.87)">
        <image
            x={-244.5}
            y={-126.87}
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            xlinkHref="../../secour-3.png"
        />
        <image
            x={353.13}
            y={275}
            width={100}
            height={115}
            preserveAspectRatio="none"
            xlinkHref="../../chrono.png"
        />
        <image
            className="cursor" onClick={()=>router.push('/roadmap').then((r)=>{})}
            x={410.37}
            y={-117.66}
            width={81.63}
            height={78.628}
            preserveAspectRatio="none"
            xlinkHref="../../btn-close.png"
        />

        <image
            className="cursor" onClick={()=>router.push('/secourisme/sec-2').then((r)=>{})}
            x={-234.83}
            y={80.77}
            width={70.273}
            height={115.15}
            preserveAspectRatio="none"
            xlinkHref="../../btn-prev.png"
        />


        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={317}
            y={-152.41}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("10")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={292.25}
            y={-148.47}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("9")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={265.08}
            y={-144.81}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("8")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={239.34}
            y={-141.64}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("7")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={214.35}
            y={-138.7}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("6")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={189.36}
            y={-135}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("5")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={164.375}
            y={-131}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("4")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={139.386}
            y={-128}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("3")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={114.604}
            y={-124.97}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("2")}
        />
        <image
            transform="matrix(.99163 .12913 -.28686 .95797 0 0)"
            x={88.593}
            y={-122.03}
            width={23}
            height={66.309}
            preserveAspectRatio="none"
            href={goodAnswer("1")}
        />
        <path opacity="0" id="malette" className="cursor" onClick={()=>displayQuestion('noyade_victime')} d="m-94.715 367.57-2.9084-89.435 37.083-5.8169 4.3627-23.995 59.623-4.3627 7.2711 27.63 34.901 2.9084 2.1813 99.614-138.88 2.9084z" />
        <path opacity="0" id="bouee" className="cursor" onClick={()=>displayQuestion('noyade')} d="m-179.06 376.29 26.176 4.3627 25.449-7.9982 8.7253-20.359-36.356-198.5-63.986 26.903 18.178 119.25 10.18 71.984 15.996 5.0898z" />
        <path opacity="0" id="surf" className="cursor" onClick={()=>displayQuestion('accidents_surf')} d="m377.18-96.331-38.537 23.268-33.447 90.162-8.7253 194.14 2.1813 125.06 22.54 36.356-2.9084-90.889 5.8169-24.722 90.889 0.7271 10.907-274.12z" />
        <path className="cursor" onClick={()=> setIsModalChrono(true)} d="m375.07 335.17v29.244l70.007-0.88617-2.6585-29.244z"  fill="url(#timer)" opacity="1"   />

    </g>
    <defs>
        <pattern
            id="timer"

            width="5"
            height="10"

        >                             {/* <---- these attributes needed here */}
            <text x={8}
                  y={12} fontSize="14" ><Countdown date={dateNow*1000 + (session.session?.should_end_date - dateNow)*1000} renderer={renderer}  /></text>
        </pattern>
    </defs>
</svg>
