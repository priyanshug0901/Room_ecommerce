import {Link} from 'react-router-dom'

const Error = ({message}) => {

    return(
        <div className="error">
            <h3>{message}</h3>
            <Link to="/" className="btn-primary">
                back to the main page
            </Link>
        </div>
    )
}

export default Error;