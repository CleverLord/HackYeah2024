import React, {useEffect} from 'react';

function Test1(props) {

    const [data, setData] = React.useState(5);
    useEffect(() => {



    },[data])


    return (
        <h1>
            Hello {data}

            <button onClick={() => setData("Lukasz")}>Button</button>
        </h1>
    );
}

export default Test1;