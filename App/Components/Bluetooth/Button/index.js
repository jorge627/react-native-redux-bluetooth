import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import Styles from './styles'

const Button = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity style={[Styles.button, style]} onPress={onPress}>
    <Text style={[Styles.buttonText, textStyle]}>{title.toUpperCase()}</Text>
  </TouchableOpacity>
)

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object,
}

export default Button
