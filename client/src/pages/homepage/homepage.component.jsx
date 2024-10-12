import React, { Component } from "react";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
// import { createStructuredSelector } from "reselect";
// import { selectCollectionForPreview,shopSelectorCollection } from "../../redux/shop/shop.selector";
// import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import FeatureCarousel from "../../components/feature-carousel/feature-carousel";
import Footer from "../../components/footer/footer.component";
import "./homepage.styles.scss";

const CarouselData = [
  {
    image:
      "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
];
// const SHOP_DATA = [
//   {
//     id: 1,
//     title: 'Hats',
//     routeName: 'hats',
//     linkUrl:"shop/hats",
//     image : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
//     row :3,
//     col :0
//   },
//   {
//     id: 2,
//     title: 'Sneakers',
//     routeName: 'sneakers',
//     linkUrl:"shop/sneakers",
//     image : "https://fashionspk.com/wp-content/uploads/2013/11/Nishat-Linen-Women-Winter-Pret-Collection-Fashion-2013-14.jpg",
//     row :0,
//     col :2
//   },
//   {
//     id: 3,
//     title: 'Jackets',
//     routeName: 'jackets',
//     linkUrl:"shop/jackets",
//     image : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80",
//     row :2,
//     col :2
//   },
//   // {
//   //   id: 4,
//   //   title: 'Womens',
//   //   routeName: 'womens',
//   //   linkUrl:"shop/womens",
//   //   image : '',
//   //   renderType :2,
//   //   renderSequence :1

//   // },
//   // {
//   //   id: 5,
//   //   title: 'Mens',
//   //   routeName: 'mens',
//   //   linkUrl:"shop/mens",
//   //   image : '',
//   //   renderType :2,
//   //   renderSequene :2
//   // }
// ];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      paused: false,
    };
  }
  // https://www.youtube.com/watch?v=exb2ab72Xhs
  componentDidMount() {
    setInterval(() => {
      if (this.state.paused === false) {
        let newSlide =
          this.state.currentSlide === CarouselData.length - 1
            ? 0
            : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
      }
    }, 3000);
  }

  nextSlide = () => {
    let newSlide =
      this.state.currentSlide === CarouselData.length - 1
        ? 0
        : this.state.currentSlide + 1;
    this.setState({ currentSlide: newSlide });
  };

  prevSlide = () => {
    let newSlide =
      this.state.currentSlide === 0
        ? CarouselData.length - 1
        : this.state.currentSlide - 1;
    this.setState({ currentSlide: newSlide });
  };

  setCurrentSlide = (index) => {
    this.setState({ currentSlide: index });
  };

  render() {
    return (
      <div className="mt-8">
        {/* carousel for large */}
        <div className="hidden md:block w-full h-screen flex overflow-hidden relative">
          <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
            {CarouselData.map((slide, index) => {
              return (
                <img
                  src={slide.image}
                  alt="This is a carousel slide"
                  key={index}
                  className={
                    index === this.state.currentSlide
                      ? "absolute block w-full h-screen object-cover"
                      : "hidden"
                  }
                  onMouseEnter={() => {
                    this.setState({ paused: true });
                  }}
                  onMouseLeave={() => {
                    this.setState({ paused: false });
                  }}
                />
              );
            })}
          </Swipe>

          {/* small devices carousel */}
          <div className="absolute w-full flex justify-center bottom-0">
            {CarouselData.map((element, index) => {
              return (
                <div
                  className={
                    index === this.state.currentSlide
                      ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                      : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    this.setCurrentSlide(index);
                  }}
                ></div>
              );
            })}
          </div>
          <svg
            class="absolute left-0 inset-y-1/2 text-3xl text-white cursor-pointer w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            ></path>
          </svg>
          <svg
            onClick={this.nextSlide}
            className="absolute right-0 inset-y-1/2 text-3xl text-white cursor-pointer w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
            <path
              fill-rule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        {/* Carousel for mobile and Small size Devices */}
        <CarouselProvider
          className="block md:hidden"
          naturalSlideWidth={100}
          isIntrinsicHeight={true}
          totalSlides={3}
          visibleSlides={1}
          step={1}
          infinite={true}
        >
          <div className="w-full relative flex items-center justify-center">
            <ButtonBack
              role="button"
              aria-label="slide backward"
              className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
              id="prev"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1L1 7L7 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonBack>
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
              <Slider>
                <div
                  id="slider"
                  className="h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700"
                >
                  <Slide index={0}>
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                      <img
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        alt="black chair and white table"
                        className="object-cover object-center w-full"
                      />
                      <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                          Catalog 1
                        </h2>
                        <div className="flex h-full items-end pb-6">
                          <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                            Minimal Interior
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={1}>
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                      <img
                        src="https://fashionspk.com/wp-content/uploads/2013/11/Nishat-Linen-Women-Winter-Pret-Collection-Fashion-2013-14.jpg"
                        alt="sitting area"
                        className="object-cover object-center w-full"
                      />
                      <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                          Catalog 2
                        </h2>
                        <div className="flex h-full items-end pb-6">
                          <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                            Minimal Interior
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={2}>
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                      <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                        alt="sitting area"
                        className="object-cover object-center w-full"
                      />
                      <div className="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                        <h2 className="lg:text-xl leading-4 text-base lg:leading-5 text-white">
                          Catalog 2
                        </h2>
                        <div className="flex h-full items-end pb-6">
                          <h3 className="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white">
                            Minimal Interior
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Slide>
                </div>
              </Slider>
            </div>
            <ButtonNext
              role="button"
              aria-label="slide forward"
              className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              id="next"
            >
              <svg
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L1 13"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          </div>
        </CarouselProvider>
        {/* category  */}
        <section class="overflow-hidden text-gray-700">
          <div class="px-5 py-2 mx-auto lg:pt-24 lg:px-20">
            <div class="flex flex-wrap -m-1 md:-m-2">
              <div class="flex flex-wrap w-1/2">
                {/* <div class="w-1/2 p-1 md:p-2">
                    <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"/>
                  </div>
                  <div class="w-1/2 p-1 md:p-2">
                    <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"/>
                  </div> */}
                <div class="hovereffect">
                  <img
                    alt="gallery"
                    class="block object-cover object-center w-full h-full rounded-lg"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                  />
                  <div class="overlay" style={{ top: "40%" }}>
                    <h2>Hats</h2>
                    <p>
                      <Link to="shop/hats">See More</Link>
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap w-1/2">
                <div class="hovereffect mx-2">
                  <img
                    alt="gallery"
                    class="block object-cover object-center w-full h-full rounded-lg"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                  />
                  <div class="overlay">
                    <h2>Hats</h2>
                    <p>
                      <Link to="shop/all/hats">See More</Link>
                    </p>
                  </div>
                </div>
                <div class="w-1/2 p-1 md:p-2">
                  <div className="hovereffect">
                    <img
                      alt="gallery"
                      class="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                    />
                    <div
                      class="overlay"
                      style={{
                        position: "absolute",
                        top: "15%",
                        padding: "0 0",
                      }}
                    >
                      <h2>Women</h2>
                      <p>
                        <a href="#">LINK HERE</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-1/2 p-1 md:p-2">
                  <div className="hovereffect">
                    <img
                      alt="gallery"
                      class="block object-cover object-center w-full h-full rounded-lg"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"
                    />
                    <div
                      class="overlay"
                      style={{
                        position: "absolute",
                        top: "15%",
                        padding: "0 0",
                      }}
                    >
                      <h2>Mens</h2>
                      <p>
                        <Link to="/shop/v1.0/hats">LINK HERE</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-col md:mx-20 md:py-3 px-5 md:flex-row relative">
          <div className="py-2 px-5 md:px-2">
            <img
              className="inset-0 w-full h-full bg-cover bg-center z-0 cursor-pointer"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              alt="image"
              title="Hats"
            />
          </div>
          <div className="py-2 px-5 md:px-2">
            <img
              className="inset-0 w-full h-full bg-cover bg-center z-0 cursor-pointer"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              alt="image"
              title="Hats"
            />
          </div>
          <div className="py-2 px-5 md:px-2">
            <img
              className="inset-0 w-full h-full bg-cover bg-center z-0 cursor-pointer"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              alt="image"
              title="Hats"
            />
          </div>
        </div>
        <div class="px-10 md:mx-20 md:px-7 relative">
          <div class="grid grid-cols-3 gap-4">
            <div className="relative col-span-3 md:col-span-2 showDisplay">
              <Link to="shop/hats">
                <img
                  className="inset-0 w-full h-full bg-cover bg-center z-0 cursor-pointer"
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                  alt="image"
                  title="Hats"
                />
                {/* <span className="transition ease-out delay-300 duration-100 opacity-0 hover:opacity-100 hover:-translate-y-1 duration-300 absolute inset-0 z-10 flex justify-center items-end mb-5 text-3xl text-dark font-semibold">Hats</span> */}
              </Link>
              {/* <div className='imageOverlay'>
                        <h3 className="imageOverlayTitle">Hats</h3>
                    </div> */}
            </div>
            <div class="col-span-3 md:col-span-1">
              <Link to="shop/sneakers">
                <img
                  className="inset-0 h-full bg-cover bg-center z-0 cursor-pointer"
                  src="https://fashionspk.com/wp-content/uploads/2013/11/Nishat-Linen-Women-Winter-Pret-Collection-Fashion-2013-14.jpg"
                  alt="image"
                  title="sneakers"
                />
              </Link>
            </div>
            <div class="col-span-3 md:col-span-1">
              <Link to="shop/sneakers">
                <img
                  className="inset-0 h-full bg-cover bg-center z-0 cursor-pointer"
                  src="https://fashionspk.com/wp-content/uploads/2013/11/Nishat-Linen-Women-Winter-Pret-Collection-Fashion-2013-14.jpg"
                  alt="image"
                  title="Hats"
                />
              </Link>
            </div>
            <div class="col-span-3 md:col-span-2">
              <Link to="shop/sneakers">
                <img
                  className="inset-0 h-full bg-cover bg-center z-0 cursor-pointer"
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                  alt="image"
                  title="Hats"
                />
              </Link>
            </div>

            {/* <div class="w-full rounded">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="image"/>
        </div>
        <div class="w-full rounded">
            <img src="https://fashionspk.com/wp-content/uploads/2013/11/Nishat-Linen-Women-Winter-Pret-Collection-Fashion-2013-14.jpg"
                alt="image"/>
        </div>
        <div class="w-full rounded">
            <img src="https://fashionspk.com/wp-content/uploads/2013/11/Nishat-Linen-Women-Winter-Pret-Collection-Fashion-2013-14.jpg"
                alt="image"/>
        </div>
        <div class="w-full rounded">
            <img src="https://fashionspk.com/wp-content/uploads/2013/11/Nishat-Linen-Women-Winter-Pret-Collection-Fashion-2013-14.jpg"
                alt="image"/>
        </div>  */}
          </div>
        </div>
        {/* {Feature Carosuel} */}
        <div className="3xl:container 3xl:mx-auto 3xl:px-0 -mt-10 px-10">
          <FeatureCarousel />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default HomePage;
