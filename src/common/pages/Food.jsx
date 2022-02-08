import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const Food = () => {
    const {foodName} = useParams()

    useEffect(() => {
        console.log(foodName)
    }, [])

    return (
        <div>
            {foodName}
        </div>
    );
}

export default Food;
