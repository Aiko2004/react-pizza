import NotFoundBlock from "../components/NotFoundBlock";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <NotFoundBlock />
            <Link to="/">
                <button className="button button--black button--center">вернуться назад</button>
            </Link>
        </>
    );
}

export default NotFound;