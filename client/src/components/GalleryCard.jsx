import React, { useEffect } from "react";
import './styles/GalleryCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavorite, MdShoppingBasket } from 'react-icons/md'
import { localstorage } from '../redux/actions/storageActions'
import { postProducts, totalProduct } from '../redux/actions/allProductsActions'
// import { postOrder } from '../redux/actions/orderAction'
import { NavLink } from 'react-router-dom';
import Img from "react-cool-img";
// import Cookies from "universal-cookie";
import { Card, Button } from 'antd';
import 'antd/dist/antd.min.css';


const GalleryCard = (props) => {
    const dispatch = useDispatch();
    const artworkShop = useSelector(state => state.galleryReducer.allGallery);
    const { storage } = useSelector(state => state.storageReducer);
    const { Meta } = Card;
    // const cookies = new Cookies();
    const user = localStorage?.session ? JSON.parse(localStorage.session) : null;
    
    useEffect(() => {
        // storing input name

        localStorage.setItem(`${storage?.id}`, JSON.stringify(storage));
        
        const allStorage = () => {
            var values = []
            var keys = Object.keys(localStorage)
            var i = keys.length;
            
            while (i--) {
                
                if (parseInt(keys[i])) {
                    values.push(JSON?.parse(localStorage?.getItem(keys[i])));
                }

            }

            dispatch(postProducts(values));
        }

        allStorage()
        dispatch(totalProduct())

    }, [storage, dispatch]);

    // const handleAddShop = () => {
    //     let hoy = new Date();
    //     let id = props.id
    //     let findGallery = artworkShop.find(element => element.id === Number(id))
    //     let arr = []
    //     let arr2 = []
    //     arr.push(props.id)
    //     arr2.push(hoy)
    //     dispatch(localstorage(findGallery))
    //     dispatch(postOrder(arr2, props.price, user[0].id, arr, findGallery.images))
    // }
    const handleAddShop = () => {
        let id = props.id
        let findGallery = artworkShop.find(element => element.id === Number(id))
        dispatch(localstorage(findGallery))
    }

    return (
        <Card
            style={{ width: 230 }}
            cover={
                <Img
                    alt="example"
                    src={props.img}
                    className='card__img-avatar'
                />
            }
            actions={
                user !== null ? !user[0]?.roles?.includes('ROLE_ADMIN') ? [
                    <Button className="detail__content--data--text--header--button" onClick={handleAddShop} type="text"><MdShoppingBasket style={{ fontSize: '18px', color: '#A3DA8D' }} />Add To Cart</Button>
                ] : null : [
                    <Button className="detail__content--data--text--header--button" onClick={handleAddShop} type="text"><MdShoppingBasket style={{ fontSize: '18px', color: '#A3DA8D' }} /></Button>
                ]}
        >
            <NavLink to={`/${props.id}`} >
                <Meta
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={props.title}
                    description={<span className='gallery_card-price'>$ {props.price}</span>}
                />
            </NavLink>
        </Card>
    );
}

export default GalleryCard;

