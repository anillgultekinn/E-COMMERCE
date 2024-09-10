import React from 'react'
import "../css/Product.css"
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { id, price, image, title, description, category } = product;

    const navigate = useNavigate();

    const truncatedTitle = title.length > 50 ? `${title.substring(0, 50)}...` : title;

    return (
        <div className='card'>
            <img className='image' src={image} alt="" />
            <div>
                <p style={{ textAlign: 'center', height: '50px' }}> {truncatedTitle} </p>
                <h3 style={{ textAlign: 'center' }}> {price} ₺ </h3>
            </div>
            <div className='flex-row'>
                <button onClick={() => navigate("/product-details/" + id)} className='detail-button' >Detaya Git</button>
            </div>
        </div >
    )
}

export default Product