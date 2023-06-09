import { useOutlet, Navigate  } from "react-router-dom"

const Placeholder = () => {
    return (
        <>
            <div>Page does not exists...</div>
            <Navigate to="../" />
        </>
    );
}

export default function Root () {
    const outlet = useOutlet();

    return (
        <>
            {outlet || <Placeholder />}
        </>
    )
}