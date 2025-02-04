import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData } from "react-router-dom";
import DOMpurify from "dompurify";
function SinglePage() {
  const post=useLoaderData();
  console.log(post);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.post.address}</span>
                </div>
                <div className="price">$ {post.post.price}</div>
              </div>
              <div className="user">
                <img src={post.post.user.avatar} alt="" />
                <span>{post.post.user.username}</span>
              </div>
            </div>
            {/* <div className="bottom">{post.post.postDetail.desc}</div> */}
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMpurify.sanitize(post.post.postDetail.desc),
              }}></div> 
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post.post.postDetail.utilities==="owner"?<p>Owner pays for all utilities</p>:<p>Tenant pays for all utilities</p>  
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
               {
                  post.post.postDetail.pet==="allowed"?<p>Pets are allowed</p>:<p>Pets are not allowed</p>
               }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.post.postDetail.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.post.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.post.bathroom}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.post.postDetail.school} m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.post.postDetail?.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.post.postDetail.res?post.post.postDetail.res:100}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post.post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button>
              <img src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
