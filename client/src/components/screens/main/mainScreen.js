import React, {useEffect} from "react";
import {Dimmer} from "semantic-ui-react";
import VerticalSlider from "./verticalSlider";
import TopCategoriesAndBrands from "./topCategoriesAndBrands";
import {StyledSegment, StyledDimmer} from "../../../styles/semanticUI/customStyles";
import {connect, useSelector} from "react-redux";
import {DocumentTitle} from "../../parts/documentTitle";
import {loadMainScreen} from "../../../actions";
import log from 'loglevel';

const MainScreen = props => {
    const {hover} = useSelector(state => state.tabHoverEventReducer)
    const mainScreenData = useSelector(state => state.mainScreenReducer)

    // Main screen API is loaded during Component Did mount
    useEffect(() => {
        log.info("[MainScreen]: component did mount and mainscreen API is called.")
        props.loadMainScreen();
    },[props]);

    // At first render we will get null data as it will render
    if(!mainScreenData) {
        log.debug("[MainScreen]: mainScreenData API is null.")
        return null;
    }

    log.info("[MainScreen]: Rendering MainScreen Component")
    return (
        <Dimmer.Dimmable as={StyledSegment} dimmed={hover}>
            <DocumentTitle title="Online Shopping for Women, Men, Kids Fashion & Lifestyle - Shoppers"/>
            <VerticalSlider carouselImages={mainScreenData.carousels}/>
            <TopCategoriesAndBrands brandImages={mainScreenData.brands} apparelImages={mainScreenData.apparels}/>
            <StyledDimmer active={hover}/>
        </Dimmer.Dimmable>
    )
}

export default connect(null, {loadMainScreen})(MainScreen);