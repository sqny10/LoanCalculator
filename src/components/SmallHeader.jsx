import PropTypes from "prop-types";

function SmallHeader({text}) {
    return (
        <h3 className="small-title">{text}</h3>
    )
}

SmallHeader.defaultProps = {
    text: "Need A Loan?"
}

SmallHeader.propTypes = {
    text: PropTypes.string
}

export default SmallHeader