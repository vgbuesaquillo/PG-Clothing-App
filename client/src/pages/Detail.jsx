import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import { BsFillXCircleFill } from "react-icons/bs";
import { MdShoppingBasket } from 'react-icons/md';
import RatingFive from "../components/RatingFive";
import './styles/Detail.css'
import logo from '../images/logoapp.svg'
import { localstorage } from '../redux/actions/storageActions'
import { postProducts, totalProduct } from '../redux/actions/allProductsActions'

const Detail = () => {
    const { storage } = useSelector(state => state.storageReducer);
    const dispatch = useDispatch();
    let { id } = useParams()

    const artworkDetail = useSelector(state => state.galleryReducer.allGallery);
    let artwork = artworkDetail.find(element => element.id === Number(id))


    useEffect(() => {
        // storing input name
        localStorage.setItem(`${storage?.id}`, JSON.stringify(storage));
        const allStorage = () => {

            var values = []
            var keys = Object.keys(localStorage)
            var i = keys.length;

            while (i--) {
                values.push(JSON.parse(localStorage.getItem(keys[i])));
            }

            dispatch(postProducts(values));
        }

        allStorage()
        dispatch(totalProduct())

    }, [storage]);

    const handleAddShop = () => {
        let findGallery = artworkDetail.find(element => element.id === Number(id))
        dispatch(localstorage(findGallery))
    }

    return (<div className="detail">
        <div className='detail__content'>
            <div className='detail__content--data'>
                <div className='detail__content--data--image'>
                    <img src={artwork?.images} alt="#" className='detail__content--data--image--style'></img>
                </div>
                <div className='detail__content--data--text'>
                    <div className='detail__content--data--text--header'>
                        <h3>{artwork?.title}</h3>
                        <h4>Pricing: $ {artwork?.price}</h4>
                        <p>
                            Creation date: {artwork?.creation_date}<br />
                            Department: <br />
                            Technique: <span>{artwork?.technique}</span>
                        </p>
                        <button className="detail__content--data--text--header--button" onClick={handleAddShop}><MdShoppingBasket /> Add in card</button>
                    </div>
                    <div className='detail__content--data--text--description'>
                        <p>{artwork?.description}</p>
                    </div>
                </div>
            </div>
            {/* <div className='detail__content--comment'>
                <div className='detail__content--comment--stars'>
                    <div className='detail__content--comment--stars--title'>
                        <h5>Comments</h5>
                    </div>
                    <div className="detail__content--comment--stars--data">
                        <div className="detail__content--comment--stars--data--img">
                            <img src={artwork?.images} alt="#"
                                className='detail__content--comment--stars--data--img--style'></img>
                        </div>
                        <div className="detail__content--comment--stars--data--text">
                            <h6>Mark</h6>
                            <p>
                                Awesone art picture, I buy <br />
                            </p>
                            <RatingFive />
                        </div>


                    </div>
                </div>
                <div className='detail__content--comment--write'>
                    <div className="detail__content--comment--write--img">
                        <img src={artwork?.images} alt="#"
                            className='detail__content--comment--write--img--style'>
                        </img>
                    </div>
                    <p className="detail__content--comment--write--text">
                        <input type="text" placeholder="Write a comment" />
                    </p>
                </div>
            </div> */}
        </div>
    </div>);
}

export default Detail;