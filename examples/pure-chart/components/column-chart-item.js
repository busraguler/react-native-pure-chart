import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

export default class ColumnChartItem extends Component {

  render () {
  
    let renders = []
    let columnHeight = '';
    let columnColor = '';
    let seriesCount = this.props.seriesArray.length
    for (let seriesIndex = 0; seriesIndex < seriesCount; seriesIndex++) {
      let lastElementMarginRight = 0
      if (seriesIndex === (seriesCount - 1)) {
        lastElementMarginRight = this.props.defaultMargin
      }
      let borderRadius = 5;
      

      columnHeight = this.props.seriesArray[seriesIndex].data[this.props.dataIndex]['ratioY']

      if(this.props.isSelected !== null){
        columnColor = this.props.dataIndex === this.props.isSelected ? '#60034C' :this.props.seriesArray[seriesIndex].seriesColor;
      }
      else{
        columnColor =  (this.props.dataIndex === 3 || this.props.dataIndex === 11) ? '#60034C' : this.props.seriesArray[seriesIndex].seriesColor;      
      }

      if(this.props.isSkeletonChart){
        columnColor = '#cbcbcb',
        columnHeight = '50%'
      }
      else{
        if(this.props.seriesArray[seriesIndex].data[this.props.dataIndex]['ratioY'] === 0){
          columnHeight = '1%',
          columnColor = '#cbcbcb',
          borderRadius =0
        }
      }

      if(columnHeight < parseFloat(0.1)){
        columnHeight = '2%';
      }

      renders.push(
        <View key={seriesIndex} style={[styles.bar, {
          width: this.props.defaultWidth / seriesCount,
          height: columnHeight,
          marginRight: lastElementMarginRight,
          backgroundColor: columnColor,
          borderRadius: borderRadius,
          borderColor: 'red'
        }]} />
      )
    }

    return (
     
        <View style={{height: this.props.defaultHeight- 40}}>
          <TouchableWithoutFeedback onPressIn={(evt) => (this.props.onClick(evt), console.log(columnHeight))}>
            <View style={styles.chartView}>
              {renders}
            </View>
          </TouchableWithoutFeedback>
        </View>
     
    )
  }
}

const styles = StyleSheet.create({
  chartView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 20,
    height: '100%'
  },
  bar: {
    justifyContent: 'flex-end',
   // borderWidth: 1
  }
})

ColumnChartItem.propTypes = {
  seriesArray: PropTypes.array,
  onClick: PropTypes.func,
  defaultWidth: PropTypes.number,
  defaultHeight: PropTypes.number,
  defaultMargin: PropTypes.number,
  primaryColor: PropTypes.string,
  highlightColor: PropTypes.string,
  backgroundColor: PropTypes.string,
}

