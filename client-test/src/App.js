import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    user: {
      username: "thomas",
      password: "password",
      first_name: "admin",
      last_name: "istrator",
      email: "e"
    },
    profile_picture: null
  };
  handleFile = e => {
    this.setState(
      {
        ...this.state,
        profile_picture: e.target.files[0]
      },
      () => console.log(this.state)
    );
  };
  sendData = e => {
    e.preventDefault();

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTUyMzU0MjI0LCJleHAiOjE1NTI0NDA2MjR9.gO9bRJxkaXka2N0TQ7dEv7vllbzeL8DlkOPIKR0kdq4";

    const reqOptions = { headers: { authorization: token } };

    const formData = new FormData();
    formData.append("image", this.state.profile_picture);
    // formData.append("user", JSON.stringify(this.state.users));
    axios
      .post("http://localhost:7000/api/restricted/image", formData, reqOptions)
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
