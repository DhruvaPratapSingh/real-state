// import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data=useLoaderData();

  return( <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        <Suspense fallback={<p>Loading...</p>}>
         <Await resolve={data.postResponce}
         errorElement={<div>Error in loading page</div>}>
          {({postResponce})=>(
            /* console.log(data.postResponce), */
            data.postResponce.map(item=>(
              <Card key={item.id} item={item}/>
            ))
          )}
         </Await>
        </Suspense>
      </div>
    </div>
    <div className="mapContainer">
    <Suspense fallback={<p>Loading...</p>}>
         <Await resolve={data.postResponce}
         errorElement={<div>Error in loading page</div>}>
          {()=>(
              <Map  items={data.postResponce}/>
          )}
         </Await>
        </Suspense>
    </div>
  </div>
  )
}

export default ListPage; 