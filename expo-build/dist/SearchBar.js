import * as React from "react";
import { View, Image, TextInput, } from "react-native";
import { Circle } from "react-native-animated-spinkit";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import styles, { _container, _textInputStyle } from "./SearchBar.style";
import {useLayoutEffect} from "react";
const defaultSearchIcon = require("./local-assets/search-icon.png");
const whiteSearchIcon = require("./local-assets/search-icon-white.png");
const defaultClearIcon = require("./local-assets/clear-icon.png");
const whiteClearIcon = require("./local-assets/clear-icon-white.png");
export default class SearchBar extends React.Component {
    inputRef = null;
    onRender = () => {
        if (this.props.focusOnLoad) {
            this.inputRef?.focus();
        }
    };
    handleSearchBarPress = () => {
        this.inputRef?.focus();
        this.props.onPress && this.props.onPress();
    };
    handleOnClearPress = () => {
        this.inputRef?.clear();
        this.props.onClearPress && this.props.onClearPress();
    };
    /* -------------------------------------------------------------------------- */
    /*                               Render Methods                               */
    /* -------------------------------------------------------------------------- */
    renderSpinner = () => {
        const { darkMode = false, spinnerSize = 15, SpinnerType = Circle, spinnerColor = darkMode ? "#fdfdfd" : "#19191a", spinnerVisibility = false, } = this.props;
        return (spinnerVisibility && (<View style={styles.spinnerContainer}>
          <SpinnerType size={spinnerSize} color={spinnerColor}/>
        </View>));
    };
    renderSearchIcon = () => {
        const { onSearchPress, darkMode = false, searchIconComponent, searchIconImageStyle, ImageComponent = Image, searchIconImageSource = darkMode ? whiteSearchIcon : defaultSearchIcon, } = this.props;
        return (<RNBounceable style={styles.searchContainer} onPress={onSearchPress}>
        {searchIconComponent || (<ImageComponent resizeMode="contain" source={searchIconImageSource} style={[styles.searchIconImageStyle, searchIconImageStyle]}/>)}
      </RNBounceable>);
    };
    renderTextInput = () => {
        const { onBlur, onFocus, textInputStyle, darkMode = false, placeholder = "Search here...", placeholderTextColor, } = this.props;
        let _placeholderTextColor = placeholderTextColor;
        if (!placeholderTextColor) {
            _placeholderTextColor = darkMode ? "#fdfdfd" : "#19191a";
        }
        return (<TextInput placeholderTextColor={_placeholderTextColor} {...this.props} onBlur={onBlur} onFocus={onFocus} ref={(ref) => (this.inputRef = ref)} style={[_textInputStyle(darkMode), textInputStyle]} placeholder={placeholder}/>);
    };
    renderClearIcon = () => {
        const { darkMode = false, clearIconComponent, clearIconImageStyle, ImageComponent = Image, clearIconImageSource = darkMode ? whiteClearIcon : defaultClearIcon, } = this.props;
        return (<RNBounceable bounceEffect={0.8} style={styles.clearIconContainer} onPress={this.handleOnClearPress}>
        {clearIconComponent || (<ImageComponent resizeMode="contain" source={clearIconImageSource} style={[styles.clearIconImageStyle, clearIconImageStyle]}/>)}
      </RNBounceable>);
    };
    render() {
        const { style, darkMode = false, spinnerVisibility, renderClearIcon, shadow = true, } = this.props;
        useLayoutEffect(() => {
            this.onRender();
        }, []);
        return (<RNBounceable {...this.props} bounceEffectIn={0.97} style={[_container(darkMode, shadow), style]} onPress={this.handleSearchBarPress}>
        {spinnerVisibility ? this.renderSpinner() : this.renderSearchIcon()}
        {this.renderTextInput()}
        {renderClearIcon && this.renderClearIcon()}
      </RNBounceable>);
    }
}
//# sourceMappingURL=SearchBar.js.map
//# sourceMappingURL=SearchBar.js.map
