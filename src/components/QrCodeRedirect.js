import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchReworksByUiCode } from '../redux/rework/actions/reworkAction';
import { fetchSalesByUiCode } from '../redux/sales/actions/salesAction';
import { fetchWarehouseByUicode } from '../redux/warehouse/actions/warehouseAction';
import { fetchZoneByUicode } from '../redux/zones/actions/zonesAction';

import { useDispatch } from 'react-redux';


const QrCodeRedirect = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [noPage, setNoPage] = useState(false);

    useEffect(() => {
        if (id) {
            // if id has the word "Rework" in it, then it is a rework
            if (id.includes("REWORK")) {
                dispatch(fetchReworksByUiCode(id));
                navigate('/view-rework');
            } else if (id.includes("SALES")) {
                dispatch(fetchSalesByUiCode(id));
                navigate('/view-sales');
            } else if (id.includes("WAREHOUSE") && !id.includes("REWORK") && !id.includes("SALES")) {
                dispatch(fetchWarehouseByUicode(id));
                navigate('/view-warehouse');
            } else if (id.includes("ZONE") && !id.includes("WAREHOUSE")) {
                dispatch(fetchZoneByUicode(id));
                navigate('/view-zone');
            } else {
                setNoPage(true);
            }
        }
    }, [dispatch, id, navigate]);

    return (
        <>
            {noPage && <h1>Product not found!</h1>}
        </>
    );
};

export default QrCodeRedirect;
