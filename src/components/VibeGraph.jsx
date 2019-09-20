import React, { Component } from 'react';
// import { Input, Button } from 'semantic-ui-react'
import _ from "underscore";
import moment from "moment";

// Pond
import { TimeSeries, percentile, median } from "pondjs";

// Imports from the charts library

import {
  Baseline,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
  EventMarker,
  ScatterChart,
  BandChart,
  Resizable
} from "react-timeseries-charts";

//
// Styles
//

const baselineStyle = {
  line: {
      stroke: "#595C61",
      strokeWidth: 1
  }
};

const bandStyle = styler([{ key: "score", color: "blue", width: 1, opacity: 0.5 }]);

const style = styler([
  { key: "score", color: "#4f91f9", width: 1 },
]);

const NullMarker = props => {
  return <g />;
};

class VibeGraph extends Component {
  state = {
    trackerValue: null,
    trackerEvent: null,
    trackerText: null,
    trackerTime: null,
    markerMode: "point",
    timeSeries: false,
    timeSeriesRange: null
  };

  componentDidMount() {
    setTimeout(() => {
      let temperatureSeries =  this.temperatureSeries();
      this.setState({timeSeries: temperatureSeries, timeSeriesRange: temperatureSeries.range()})
    }, 2000);
  }

  temperatureSeries() {
    let vibes = this.props.match_vibe_data.match_twitter_vibes
    const points = [];
    _.each(vibes, val => {
      const time = moment(val.twitter_created_at).valueOf();
      const score = val.score;
      const full_text = val.twitter_full_text;
      points.push([time, score, full_text]);
    });

    const timeSeries = new TimeSeries({
        name: "scores",
        columns: ["time", "score", "full_text"],
        points
    });
    return timeSeries;
  }

  handleMouseNear(t) {
    if (t) {
      let e = t.event;
      const eventTime = e.timestamp();
      const eventValue = e.get("score");
      const eventText = e.get("full_text");
      const v = `${eventValue > 0 ? "+" : ""}${eventValue}`;
      this.setState({ trackerValue: v, trackerText: eventText, trackerEvent: e, trackerTime: eventTime });
    } else {
      this.setState({ trackerValue: null, trackerEvent: null, trackerText: null, trackerTime: null });
    }
  }

  renderMarker() {
    if (!this.state.trackerValue) {
      return <NullMarker />;
    }
    return (
      <EventMarker
          type="point"
          axis="axis"
          event={this.state.trackerEvent}
          column="score"
          markerLabel={this.state.trackerValue}
          markerLabelAlign="right"
          markerLabelStyle={{ fill: "#2db3d1", stroke: "white" }}
          markerRadius={3}
          markerStyle={{ fill: "#2db3d1" }}
      />
    );
  }

  renderChart() {
    const min = -1;
    const max = 1.0;

    const axisStyle = {
      values: {
        labelColor: "white",
        labelWeight: 300,
        labelSize: 11
      },
      axis: {
        axisColor: "white",
        axisWidth: 1
      }
    };
    return (
      <ChartContainer
        timeRange={this.state.timeSeriesRange}
        timeAxisStyle={axisStyle}
        enablePanZoom={true}
        onTimeRangeChanged={timeSeriesRange => this.setState({ timeSeriesRange })}
      >
        <ChartRow height="300">
          <YAxis
            id="axis"
            label="SCORE"
            transition={300}
            style={axisStyle}
            labelOffset={0}
            min={min}
            max={max}
            format=",.1f"
            width="60"
            type="linear"
          />
          <Charts>
            <BandChart
              axis="axis"
              series={this.state.timeSeries}
              style={bandStyle}
              column="score"
              aggregation={{
                size: "30m",
                reducers: {
                  outer: [percentile(5), percentile(95)],
                  inner: [percentile(25), percentile(75)],
                  center: median(),
                }
              }}
              interpolation="curveBasis"
            />
            <ScatterChart
              axis="axis"
              series={this.state.timeSeries}
              columns={["score"]}
              style={style}
              onMouseNear={p => this.handleMouseNear(p)}
            />
            <Baseline
              axis="axis"
              value={0.0}
              label="Neutral"
              style={baselineStyle}
            />
            {this.renderMarker()}
          </Charts>
        </ChartRow>
      </ChartContainer>
    );
  };

  render() {
    const tweetStyle = {
      display: "flex",
      alignItems: "center",
      lineHeight: "1.3",
      color: "black",
      backgroundColor: "white",
      padding: "16px",
      minHeight: "200px"
    }
    const marginAutoStyle = {
      marginLeft: "auto",
      marginRight: "auto"
    }
    const graphPreview = {
      imageRendering: "pixelated"
    }
    const logoWrapper = {
      textAlign: "center",
      position: "absolute",
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      left: "0",
      right: "0",
      marginTop: "100px"
    }
    let showGraph = this.state.timeSeries;
    let color = "black";
    if(this.state.trackerValue) {
      if(this.state.trackerValue.indexOf('+') != -1) {
        color = "#5AD674"
      } else if(this.state.trackerValue.indexOf('-') != -1) {
        color = "#FA5C62"
      }
    }
    const trackerValueStyle = {
      color: color
    }
    let trackerValue = this.state.trackerValue == 0 ? "Neutral" : this.state.trackerValue;
    return (
      <div>
        {showGraph &&
          <div style={{width: '100%'}}>
            <hr />
            <div style={{width: '100%'}}>
              <Resizable>{this.renderChart()}</Resizable>
            </div>
            <div>
              <div style={tweetStyle}>
                {this.state.trackerText &&
                  <div style={marginAutoStyle}>
                    <div>
                      <span><strong style={trackerValueStyle}>{trackerValue}</strong></span>
                      <span> : <strong>{moment(this.state.trackerTime).format('MMMM Do YYYY, h:mm:ss a')}</strong></span>
                    </div>
                    <span>{this.state.trackerText}</span>
                  </div>
                }
                {!this.state.trackerText &&
                  <span style={marginAutoStyle}>Hover over the graph and check out some vibes 🤘</span>
                }
              </div>
            </div>
          </div>
        }
        {!showGraph &&
          <div style={{width: '100%'}}>
            <div className="spin" style={logoWrapper}>
              <img className="pulse" src="/fc_barcelona_crest_transparent.png" width="100px" />
            </div>
            <img style={graphPreview} src="/graph_preview.png" width="100%"/>
          </div>
        }
      </div>
    );
  }
}

export default VibeGraph;
