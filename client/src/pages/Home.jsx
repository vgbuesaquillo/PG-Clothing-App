import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import Landing from '../components/Landing'
import './styles/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllGallery } from '../redux/actions/galleryActions'
import Pagination from '../components/Pagination'
import Categories from '../components/Categories';
import image from '../images/undraw_page_not_found_re_e9o6.svg'
import GalleryCard from '../components/GalleryCard'
import { postProducts, totalProduct } from '../redux/actions/allProductsActions'


const Home = () => {

    const dispatch = useDispatch()
    const { allGallery } = useSelector(state => state.galleryReducer)

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [gallery, setgallery] = useState([]);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentGalleries = allGallery.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        dispatch(getAllGallery())
        //activa nuevo render de la página con allGallery ordenado
        if (allGallery !== gallery) {
            setgallery(allGallery)
        }

    }, [dispatch, gallery])

    return (<div className='home'>
        <TopBar />
        <Landing />
        <Categories />
        {
            currentGalleries.length === 0 ?
                <div className='home--validation'>
                    <img src={image} alt='404 not found' className='home--notfound' />
                    <label>La busqueda no tuvo resultados</label>
                </div> :
                <div className='galleryGrid'>
                    {

                        currentGalleries.map(art => {
                            if(art.stock === true){
                                return <GalleryCard img={art.images} title={art.title.length > 20 ? art.title.slice(0, 30) + "..." : art.title}
                                price={art.price} id={art.id} key={art.id} />

                            }else{
                                return <GalleryCard img={art.images} title={"SOLD"}  
                                price={0} id={art.id} key={art.id} />
                            }

                            
                        })
                    }
                </div>
        }
        <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPosts={allGallery.length}
            paginate={paginate} />
    </div>);
}

export default Home;
