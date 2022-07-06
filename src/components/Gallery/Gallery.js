import "../Gallery/Gallery.css";
import "../../App.css";
import Nav from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import Upload from "./Upload";
import axios from "axios";

export default function Gallery() {

  const config = {
    headers:{
        "Content-Type":"application/json"
    }
}

  const [imageIds, setImageIds] = useState();
  const loadImages = async () => {
      try {
          const {data} = await axios.get('/gallery',config);
          setImageIds(data);
          console.log(data);
      } catch (err) {
          console.error(err);
      }
  };
  useEffect(() => {
      loadImages();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <div className="page-title">
          <h1>Photo Gallery</h1>
        </div>
        <div class="gallery">
            {imageIds &&
              imageIds?.map((imageId, index) => (
              <div class="image">
                <Link to={"/watch"}>
                  <div class="thumbnail">
                  <Image
                          key={index}
                          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                          publicId={imageId.publicId}
                          width="300"
                          crop="scale"
                  />
                  </div>
                </Link>
                <div class="details">
                    <div class="title">
                      <Link to={"/watch"}>
                        <h3>{imageId.title}</h3>
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
        </div>
        <div>
          <Upload/>
        </div>
      </main>
      <Footer />
    </>
  );
}
