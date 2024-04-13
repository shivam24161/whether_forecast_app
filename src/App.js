import React, { Component } from "react";
import "./App.css";
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      location: "",
      current: "",
      locationArr: [],
      currentArr: [],
      whether: ["cloudy", "mist", "rain", "clear", "sunny"],
      condition: "",
      flag: true,
    };
  }

  search = (event) => {
    var text = event.target.previousElementSibling.value;
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=$location=${text}`
    )
      // promise
      .then((res) => res.json())
      .then((json) => {
        this.setState(
          {
            data: json,
            flag: false,
          },
          () => {
            this.setState(
              {
                locationArr: [this.state.data.location],
                currentArr: [this.state.data.current],
              },
              () => {
                this.state.currentArr.map((i) => {
                  this.setState(
                    {
                      condition: i.condition.text,
                    },
                    () => {
                      var condition1 = this.state.condition.toLowerCase();
                      this.state.whether.map((i) => {
                        if (condition1.includes(i)) {
                          this.setState(
                            {
                              check: i,
                            },
                            () => {
                              console.log(this.state.check);
                            }
                          );
                        }
                        return null;
                      });
                    }
                  );
                  return null;
                });
              }
            );
          }
        );
      });
  };

  render() {
    const { locationArr, currentArr, check } = this.state;
    return (
      <div id={check} className="app-wrapper">
        <input
          type="text"
          style={{ width: "100%" }}
          className="p-3 mt-1"
          placeholder="Search by Country city name"
          id="inputBox"
        />
        <button className="btn btn-warning mt-3" id="btn" onClick={this.search}>
          Check Whether
        </button>
        {/* Checking condition  */}
        <div className="container">
          {/* Getting location details */}
          {locationArr.map((i) => {
            if (i.name === "Machichaan's Location") {
              alert("Entered city not match ... , this is default result!");
            }
            return (
              <>
                <h2 className="text-center mt-4">
                  {i.name},{i.country}
                </h2>
                <h2 className="text-center">{i.localtime}</h2>
              </>
            );
          })}
          {/* Getting various current details */}
          {currentArr.map((j,index) => {
            return (
              <React.Fragment key={index}>
                <p className="text-center mt-2">
                  <span className="text-dark h3">Tempearture : </span>
                  <span className="text-warning h2">{j.temp_c} &#8451;</span>
                </p>
                <p className="text-center mt-5">
                  <span className="text-dark h3">Whether Condition : </span>
                  <span className="text-warning h2">{j.condition.text}</span>
                </p>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
