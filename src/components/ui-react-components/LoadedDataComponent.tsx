import React from "react";

interface LoadedDataProps{
    title: string;
    data: string;
}
export const LoadedDataComponent: React.FC<LoadedDataProps> = ({title,data })=>{
    return(
        <div>
            <h4>{title}</h4>
            <span>{data}</span>
        </div>
    )
}