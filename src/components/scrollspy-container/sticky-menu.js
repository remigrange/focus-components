import React, {Component, PropTypes} from 'react';

// component default props.
const defaultProps = {
    affix: false,
    affixOffset: 100,
    menuList: []
};

// component props definition.
const propTypes = {
    affix: PropTypes.bool,
    affixOffset: PropTypes.number,
    menuList: PropTypes.array
};

/**
* Sticky menu component.
*/
class StickyMenu extends Component {
    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render() {
        const {affix, affixOffset, menuList, ...otherProps} = this.props;
        return (
            <nav data-affix={affix} data-focus='sticky-menu' style={affix ? {position: 'fixed', top: `${affixOffset}px`} : null} {...otherProps}>
                <ul>
                    {menuList.map((menu)=>{
                        const {label, nodeId, isActive, onClick} = menu;
                        return (
                            <li data-active={isActive} key={nodeId} onClick={onClick}>{label}</li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

//Static props.
StickyMenu.displayName = 'StickyMenu';
StickyMenu.defaultProps = defaultProps;
StickyMenu.propTypes = propTypes;

export default StickyMenu;
