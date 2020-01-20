import React, { Component } from "react";
import { ln } from "../../utils/language";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserWallet, getBeers } from "../../utils/api";

const width = window.innerWidth;
const height = window.innerHeight;

class BeerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { wallet: null, selectedBeer: "pizza" };
  }
  componentDidMount() {
    // let token = localStorage.getItem("token");
    getBeers()
      .then(response => {
        console.log("wallet diff: ", response);
        this.setState({ beers: response });
      })
      .catch(err => {
        // this.setState({ transactionLoading: false });
      });
  }

  render() {
    // const {  beers } = this.state;
    const { selectedBeer } = this.props;
    console.log("call Berrrers props: ", selectedBeer);
    return (
      <div
        style={{
          height: height,
          width: width,
          backgroundColor: "#fbfafd"
          //   border: "1px solid red"
        }}
      >
        <div
          style={{
            height: "50%",
            border: "1px solid #eee",
            borderRadius: "2vh",
            marginTop: "5%"
          }}
        >
          <div style={{ height: "10%", fontSize: "5vh" }}>Beer detail</div>
          <div style={{ height: "10%", fontSize: "2vh" }}>
            {" "}
            {selectedBeer.name}
          </div>
          <img
            src={selectedBeer.image_url}
            style={{ width: "25%", height: "50%" }}
          />
        </div>
      </div>
    );
  }
}
// export default BeerDetail;
const mapStateToProps = state => ({
  selectedBeer: state.Auth.selectedBeer
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  {}
)(BeerDetail);
