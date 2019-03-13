import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    user: {
      username: "admi",
      password: "password",
      first_name: "admin",
      last_name: "istrator",
      email: "emaaasdf"
    },
    workout: {
      workout_name: "Monday crunche",
      workout_date: "1552321015541",
      workout_type: "Strength",
      workout_subtype: "General Strength",
      workout_sets: 10,
      workout_reps: 20,
      workout_time: 30,
      workout_distance: null,
      workout_notes:
        "Great workout. Remember to grab cheese and milk on the way home!",
      body_region: "Abdominal",
      max_weight: null,
      user_id: 1
    },
    progress_picture: null,
    profile_picture: null
  };
  handleFile = e => {
    this.setState(
      {
        ...this.state,
        progress_picture: e.target.files[0]
      },
      () => console.log(this.state)
    );
  };
  sendData = e => {
    e.preventDefault();

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTUyNDU0NTc0LCJleHAiOjE1NTI1NDA5NzR9.PZZghnNaR99fLjg_UDPt0F8aBcu57tzk6RZTGghlbPU";

    const reqOptions = {
      headers: { authorization: token },
      "Content-type": "application/json"
    };

    const formData = new FormData();
    // let rawData = { ...this.state.user };
    let rawData = { ...this.state.workout };
    rawData = JSON.stringify(rawData);
    // formData.append("user", rawData);
    formData.append("workout", rawData);
    // formData.append("image", this.state.profile_picture);
    formData.append("image", this.state.progress_picture);

    axios
      .put(
        "http://localhost:7000/api/restricted/workouts/1",
        formData,
        reqOptions
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <div className="App">
        <form
          onSubmit={this.sendData}
          method={"Post"}
          encType="multipart/form-data"
        >
          <input
            autoComplete="off"
            type="file"
            name="profile_photo"
            onChange={this.handleFile}
          />
          <div>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
