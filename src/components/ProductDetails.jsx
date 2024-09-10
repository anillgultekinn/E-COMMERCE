import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectProduct } from '../redux/slices/productSlice';
import { CiCircleMinus } from 'react-icons/ci';
import { CiCirclePlus } from 'react-icons/ci';
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';

function ProductDetails() {

    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product)

    const { price, image, title, description, category } = selectedProduct;

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addToBasket(payload));
        dispatch(calculateBasket());
    }


    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectProduct(product));
            }
        })
    }

    return (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div style={{ marginRight: '40px' }}>
                <img src={image} width={300} height={400} alt="" />
            </div >

            <div>
                <h1 style={{ fontFamily: 'arial' }}> {title}</h1>
                <p style={{ fontFamily: 'arial', fontSize: '20px' }}> {description}</p>
                <h1 style={{
                    fontFamily: 'arial', fontSize: '50px', fontWeight: 'bold', color: 'rgb(185,76,76)'
                }}> {price} ₺ </h1>
                < div style={{ display: 'flex', alignItems: 'center' }}  >
                    <CiCirclePlus onClick={increment} style={{ fontSize: '40px', marginRight: '16px', cursor: 'pointer' }} />  <span style={{ fontSize: '36px' }}  > {count} </span>
                    <CiCircleMinus onClick={decrement} style={{ fontSize: '40px', marginLeft: '16px', cursor: 'pointer' }} />
                </div>
                <div>
                    <button
                        onClick={addBasket}
                        style={{
                            marginTop: '24px',
                            border: 'none',
                            padding: '12px',
                            backgroundColor: 'rgb(185,76,76)',
                            color: '#fff',
                            borderRadius: '4px',
                            cursor: 'pointer'

                        }}  >Sepete Ekle</button>
                </div>

            </div>



        </div >
    )
}

export default ProductDetails