import React from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading} = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <>
        {data?.total_results >5 ? <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endPoint={mediaType}
        />: <></>}
        </>

     
       
        
         

        
        
        
        
    );
};

export default Recommendation;