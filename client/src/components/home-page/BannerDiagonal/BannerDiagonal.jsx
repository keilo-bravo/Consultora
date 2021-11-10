import React from "react";
import CardBanner from "../../CardBanner/CardBanner";
import ImgCard from "../assets/img/imgLealtad.jpg";
import "./BannerDiagonal.css";

const BannerDiagonal = (props) => {
  const {
    contenedorBannerDiagonal,
    bannerDirection,
    containBanner,
    bannerContent,
    bannerTitle,
    title,
    cardFlex
  } = props;
  return (
    <div className={contenedorBannerDiagonal}>
      <div className={bannerDirection}>
        <div className={containBanner}>
          <div className={bannerContent}>
            <div className={bannerTitle}>
              <h1 className="fw-bold">{title}</h1>
            </div>
            <div className={cardFlex}>
              {/* <div></div>
              <div></div>
              <div></div> */}
              <CardBanner nameStyle="card_banner" img={ImgCard} text="Leales" />
              <CardBanner nameStyle="card_banner" img={ImgCard} text="Leales" />
              <CardBanner nameStyle="card_banner" img={ImgCard} text="Leales" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDiagonal;
