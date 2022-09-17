import PropTypes from "prop-types";

function Header({text}) {
    return (
        <header className='title'>
            <h1>{text}</h1>
        </header>
    )
}

Header.defaultProps = {
    text: "Loan Calculator"
}

Header.propTypes = {
    text: PropTypes.string
}

export default Header