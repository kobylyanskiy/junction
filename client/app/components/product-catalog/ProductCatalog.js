import { getWindowHeight } from './../../api/general-usage';


class ProductCatalog extends React.Component {
    constructor(props) {
        super();
        this.state = {
            elementHeight: getWindowHeight() - 48 + 'px',
        }
    }

    render() {
        return (
            <div className="product-wrapper" style={{height: this.state.elementHeight}}>
                {this.props.children}
            </div>
        );
    }
}

ProductCatalog.propTypes = {
    children: PropTypes.array.isRequired
}

export default ProductCatalog;
