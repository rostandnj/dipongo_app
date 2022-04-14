import {Layout, Spin} from "antd";
import React from "react";
import {LoadingOutlined} from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 100,color:'#1d893c',marginTop:30 }} spin />;

export default function EmptyData(){
    return(
        <Layout className="bgapp onboard-layout background-image-body">
            <section className="hv100 column flex itemcenter justcenter mask ">

                <Spin style={{marginTop: '20px'}} indicator={antIcon} />


            </section>
        </Layout>);
}
