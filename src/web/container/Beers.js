import React, { Component } from "react";

import Modal from "react-modal";
import { connect } from "react-redux";
import { getUserWallet, getBeers } from "../../utils/api";
import { ln } from "../../utils/language";
import { selectBeer } from "../../redux/actions/Auth";
import ReactLoading from "react-loading";

// import style files
import "../../Assets/css/HomePage.css";

//import images
import Menu from "../../Assets/images/new/menu.png";
import Beer from "../../Assets/images/new/beer.svg";
import More from "../../Assets/images/new/more.png";
import Remove from "../../Assets/images/new/remove.png";

const width = window.innerWidth;
const height = window.innerHeight;

class Beers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: null,
      selectedBeerCat: "all",
      showAddToCart: false,
      showCartModal: false,
      MyCart: [],
      beers: null,
      pageSize: "80",
      pageNum: "2"
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //close modal callback
  openModal = () => {};

  //after open modal callback
  afterOpenModal = () => {};

  //close modal callback
  closeModal = () => {
    this.setState({
      showAddToCart: false,
      showCartModal: false
    });
  };
  componentDidMount() {
    const { pageSize, pageNum } = this.state;
    let MyAsyncCart = JSON.parse(localStorage.getItem("myCart"));
    if (MyAsyncCart) this.setState({ MyCart: MyAsyncCart });

    //get all beers
    getBeers(pageSize, pageNum)
      .then(response => {
        console.log("didmount getBeers then", response);
        this.setState({ beers: response, allBeers: response });
      })
      .catch(err => {
        console.log("didmount getBeers catch", err);
      });
  }

  //helper method to check the existance of a element in array
  searchInArray = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].beer.name === nameKey) {
        return myArray[i];
      }
    }
    return -1;
  };

  //filter beers paired by pizza
  searchPizzaType = (nameKey, myArray) => {
    console.log("searchPizzaType action ", nameKey, myArray);
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] == nameKey) {
        console.log("i foind  ", myArray[i], nameKey);
        return myArray[i];
      }
    }
    return -1;
  };

  //add a product to cart handler
  handleAddToCart = async beer => {
    const { MyCart } = this.state;
    let myNewCart = MyCart;
    let tempCartItems = MyCart;
    let check = this.searchInArray(beer.name, tempCartItems);
    if (check == -1) {
      tempCartItems.push({ beer, count: 1 });
    } else {
      myNewCart = tempCartItems.map((newItem, index) => {
        if (check.beer.id == newItem.beer.id) {
          return { beer: newItem.beer, count: Number(newItem.count) + 1 };
        } else {
          return newItem;
        }
      });
    }
    await localStorage.setItem("myCart", JSON.stringify(myNewCart));
    this.setState({ MyCart: myNewCart });
  };

  //remove one product from cart
  handleRemoveFromCart = async item => {
    const { MyCart } = this.state;
    let myNewCart = MyCart;
    myNewCart = MyCart.map(cartItem => {
      if (cartItem.beer.id == item.beer.id) {
        if (cartItem.count >= 1) {
          return { beer: cartItem.beer, count: Number(cartItem.count) - 1 };
        } else {
          return cartItem;
        }
      } else {
        return cartItem;
      }
    });
    await localStorage.setItem("myCart", JSON.stringify(myNewCart));
    this.setState({ MyCart: myNewCart });
  };

  //delete a product from cart with it's all count
  handleDeleteFromCart = async item => {
    const { MyCart } = this.state;
    let myNewCart = [];
    MyCart.map(cartItem => {
      if (cartItem.beer.id == item.beer.id) {
      } else {
        myNewCart.push(cartItem);
      }
    });
    console.log("final handleDeleteFromCart ", myNewCart, MyCart);
    await localStorage.setItem("myCart", JSON.stringify(myNewCart));
    this.setState({ MyCart: myNewCart });
  };

  //filter beers paired with foods
  handlePairedBeers = async type => {
    const { beers, allBeers } = this.state;
    let newBeers = [];
    this.setState({ selectedBeerCat: type });
    if (type == "all") {
      newBeers = allBeers;
    } else {
      allBeers.map(beer => {
        beer.food_pairing.map(item => {
          if (item.includes(type) > 0) {
            let check = this.searchPizzaType(item, newBeers);
            if (check == -1) {
              newBeers.push(beer);
            }
          }
        });
      });
    }

    await this.setState({ beers: newBeers });
  };

  render() {
    const { selectedBeerCat, beers, showCartModal, showAddToCart } = this.state;

    const { selectedBeer } = this.props;

    let AsyncCartItems = JSON.parse(localStorage.getItem("myCart"));

    //check cartItems number
    let totalAmount = 0;
    if (AsyncCartItems) {
      AsyncCartItems.map(item => {
        totalAmount += item.count * item.beer.abv;
      });
    }

    return (
      <div
        style={{
          height: height,
          width: width,
          backgroundColor: "rgb(245, 246,247)"
        }}
      >
        {/* add to cart modal */}
        <Modal
          isOpen={showAddToCart}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeTimeoutMS={2000}
          style={{
            overlay: {
              backgroundColor: "rgb(57,68,83,.5)",
              transition: "2s",
              transform: "2s"
            },
            content: {
              width: "90%",
              transition: "2s",
              transform: "2s",
              height: 0.38 * height,
              top: "40%",
              left: "50%",
              right: "auto",
              fontFamily: "Shabnam",
              bottom: "auto",
              padding: "0%",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "20px",
              backgroundColor: "transparent",
              border: "1px solid rgb(154,154,154,.25)",
              fontFamily: "Shabnam",
              color: "rgb(46,64,87)"
            }
          }}
        >
          <div
            className="closeAddToCart"
            onClick={() => {
              this.setState({ showAddToCart: false });
              this.props.selectBeer(null);
            }}
          >
            Close
          </div>
          <div
          className="cartItemModalBox"
            style={{
              width: "95%",
              height: "70%",
              margin: "2% auto 0% auto",
              borderRadius: "2vh",
              backgroundColor: "rgb(54,53,54)",
              flexDirection: "row",
              display: "flex",
              color: "#fff"
            }}
          >
            <div
              style={{
                width: "60%",
                paddingTop: "4%",
                height: "100%",
                paddingLeft: "4%"
              }}
            >
              <div
                style={{
                  height: "20%",
                  fontSize: "2vh",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                {selectedBeer && selectedBeer.name}
              </div>
              <div
                style={{
                  height: "10%",
                  fontSize: "1.6vh",
                  marginTop: "7%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                {selectedBeer && selectedBeer.tagline}
              </div>
              <div
                style={{
                  height: "10%",
                  fontSize: "1.6vh",
                  marginTop: "5%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                {selectedBeer && selectedBeer.abv.toFixed(2)}
              </div>
              <div
                style={{
                  height: "5%",
                  fontSize: "1.6vh",
                  overflow: "scroll",
                  display: "flex",
                  marginTop: "5%",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              ></div>
              <div
                style={{
                  height: "20%",
                  fontSize: "1.6vh",
                  marginTop: "5%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                {selectedBeer && selectedBeer.food_pairing}
              </div>
              <div
                style={{
                  height: "20%",
                  fontSize: "1.6vh",
                  marginTop: "5%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              ></div>
            </div>
            <div
              style={{
                width: "40%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "2vh",
                  display: "flex",
                  marginTop: "10%",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70%",
                  height: "60%"
                }}
              >
                <img
                  src={selectedBeer && selectedBeer.image_url}
                  style={{ width: "70%", height: "80%" }}
                />
              </div>
              <div
                onClick={() => {
                  this.handleAddToCart(selectedBeer);
                  this.setState({ showAddToCart: false, showCartModal: true });
                }}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "1.5vh",
                  display: "flex",
                  marginTop: "9%",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "90%",
                  height: "20%",
                  color: "rgb(30,33,38)",
                  fontSize: "1.7vh"
                }}
              >
                ADD TO CART
              </div>
            </div>
          </div>
        </Modal>

        {/* show myCart modal */}
        <Modal
          isOpen={showCartModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            overlay: { backgroundColor: "rgb(57,68,83,.5)" },
            content: {
              width: "100%",
              height: 0.93 * height,
              top: "74%",
              left: "50%",
              right: "auto",
              fontFamily: "Shabnam",
              bottom: "auto",
              padding: "0%",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "20px",
              backgroundColor: "transparent",
              border: "1px solid rgb(154,154,154,.25)",
              fontFamily: "Shabnam",
              color: "rgb(46,64,87)"
            }
          }}
        >
          <div
            style={{
              backgroundColor: "rgb(37,37,46)",
              borderTopRightRadius: "2vh",
              borderTopLeftRadius: "2vh",
              height: "80%"
            }}
          >
            <div
              onClick={() => {
                this.setState({ showCartModal: !showCartModal });
              }}
              style={{
                height: "6%",
                fontSize: "2.3vh",
                color: "#fff",
                justifyContent: "center",
                display: "flex",
                alignItems: "center"
              }}
            >
              Shopping Cart
            </div>
            <div
              style={{
                height: "35%",
                overflow: "scroll",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {AsyncCartItems && AsyncCartItems.length > 0 ? (
                AsyncCartItems.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        height: "55%",
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <div
                        style={{
                          width: "20%",
                          height: "90%",
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <img
                          src={item && item.beer.image_url}
                          style={{
                            width: "80%",
                            height: "95%"
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "35%",
                          justifyContent: "flex-start",
                          display: "flex",
                          alignItems: "center",
                          color: "#fff",
                          fontSize: "2vh",
                          flexDirection: "column"
                        }}
                      >
                        <div
                          style={{
                            width: "30%",
                            height: "20%",
                            fontSize: "1.7vh",
                            backgroundColor: "rgb(231,197,31)",
                            borderRadius: ".5vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {item.count * item.beer.abv.toFixed(2)} $
                        </div>
                        <div
                          style={{
                            width: "90%",
                            height: "80%",
                            fontSize: "1.7vh"
                          }}
                        >
                          {item && item.beer.name}{" "}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "35%",

                          height: "25%",
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "row",
                            border: "1px solid #fff",
                            borderRadius: "1vh"
                          }}
                        >
                          <div
                            onClick={() => {
                              this.handleRemoveFromCart(item);
                            }}
                            style={{
                              width: "33%",
                              height: "100%",
                              justifyContent: "center",
                              display: "flex",
                              color: "#fff",
                              alignItems: "center"
                            }}
                          >
                            -
                          </div>
                          <div
                            style={{
                              width: "33%",
                              height: "100%",
                              justifyContent: "center",
                              display: "flex",
                              color: "#fff",
                              alignItems: "center"
                            }}
                          >
                            {item.count}
                          </div>
                          <div
                            onClick={() => {
                              this.handleAddToCart(item.beer);
                            }}
                            style={{
                              width: "33%",
                              height: "100%",
                              color: "#fff",
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          this.handleDeleteFromCart(item);
                        }}
                        style={{ width: "10%" }}
                      >
                        <img
                          src={Remove}
                          style={{ width: 0.095 * width, height: 0.11 * width }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "3vh"
                  }}
                >
                  No cart item exists.
                </div>
              )}
            </div>
            <div
              style={{ height: "10%", width: "90%", margin: "4% auto 0% auto" }}
            >
              <div style={{ fontSize: "2vh", color: "#fff", height: "20%" }}>
                Tips for Waiters
              </div>
              <div
                style={{
                  marginTop: "5%",
                  height: "80%",
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <div
                  style={{
                    width: "19%",
                    height: "100%",
                    justifyContent: "center",
                    display: "flex",
                    fontSize: "2vh",
                    alignItems: "center",
                    borderTopLeftRadius: "1.5vh",
                    borderBottomLeftRadius: "1.5vh",
                    color: "rgb(64,49,18)",
                    backgroundColor: "rgb(236,196,66)"
                  }}
                >
                  ZERO
                </div>
                <div
                  style={{
                    width: "28%",
                    height: "100%",
                    fontSize: "2vh",
                    justifyContent: "center",
                    display: "flex",
                    color: "rgb(64,49,18)",
                    alignItems: "center",
                    backgroundColor: "rgb(236,196,66)"
                  }}
                >
                  ROUND UP
                </div>
                <div
                  style={{
                    width: "19%",
                    height: "100%",
                    color: "rgb(64,49,18)",
                    fontSize: "2vh",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgb(236,196,66)"
                  }}
                >
                  10%
                </div>
                <div
                  style={{
                    width: "28%",
                    color: "rgb(64,49,18)",
                    height: "100%",
                    fontSize: "2vh",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    borderTopRightRadius: "1.5vh",
                    borderBottomRightRadius: "1.5vh",
                    backgroundColor: "rgb(236,196,66)"
                  }}
                >
                  CUSTOP
                </div>
              </div>
            </div>
            <div
              style={{
                width: "80%",
                margin: "10% auto 0% auto",
                height: "100%",
                height: "4%",
                flexDirection: "row",
                display: "flex"
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  color: "#fff",
                  fontSize: "2vh"
                }}
              >
                Subtotal
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  color: "#fff",
                  fontSize: "2vh"
                }}
              >
                19.20$
              </div>
            </div>
            <div
              style={{
                width: "80%",
                margin: "2% auto 0% auto",
                height: "100%",
                height: "4%",
                flexDirection: "row",
                display: "flex"
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  color: "#fff",
                  fontSize: "2vh"
                }}
              >
                Tips
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  color: "#fff",
                  fontSize: "2vh"
                }}
              >
                2$
              </div>
            </div>
            <div
              style={{
                width: "80%",
                margin: "8% auto 0% auto",
                height: "100%",
                height: "4%",
                flexDirection: "row",
                display: "flex"
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  color: "#fff",
                  fontSize: "2vh"
                }}
              >
                Total
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  color: "#fff",
                  fontSize: "2vh"
                }}
              >
                {totalAmount.toFixed(2)} $
              </div>
            </div>
            <div
              onClick={() => {
                this.setState({ showAddToCart: false, showCartModal: false });
              }}
              style={{
                width: "80%",
                margin: "3% auto 0% auto",
                height: "100%",
                backgroundColor: "rgb(235,196,66)",
                borderRadius: "2.5vh",
                height: "9%",
                color: "rgb(64,49,18)",
                flexDirection: "row",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              Confirm Payment
            </div>
          </div>
        </Modal>

        <div
          style={{
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff"
          }}
        >
          <div
            style={{
              width: "94%",
              height: "80%",
              backgroundColor: "rgb(226,227,228)",
              borderRadius: "1.5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "rgb(185,189,192)",
              fontSize: "2vh"
            }}
          >
            Serch or Enter website name{" "}
          </div>
        </div>
        <div
          style={{
            height: "8%",
            width: "96%",
            margin: "0% auto",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div
            style={{
              height: "100%",
              width: "15%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                width: 0.13 * width,
                height: 0.13 * width,
                backgroundColor: "#fff",
                borderRadius: "1vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img src={Menu} style={{ width: "80%", height: "80%" }} />
            </div>
          </div>
          <div
            style={{
              height: "100%",
              width: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            DEPUT
          </div>
          <div
            style={{
              height: "100%",
              width: "15%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {" "}
            <div
              style={{
                width: 0.13 * width,
                height: 0.13 * width,
                backgroundColor: "#fff",
                borderRadius: "1vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img src={More} style={{ width: "80%", height: "80%" }} />
            </div>
          </div>
        </div>
        <div
          style={{
            height: "10%",
            display: "flex",
            flexDirection: "row",
            width: "94%",
            borderTopRightRadius: "2.5vh",
            borderTopLeftRadius: "2.5vh",
            backgroundColor: "#fff",
            margin: "3% auto 0% auto"
          }}
        >
          <div
            style={{
              width: "33%",
              height: "100%",
              display: "flex",
              fontSize: "2vh",
              color:
                selectedBeerCat == "all"
                  ? "rgb(73,143,199)"
                  : "rgb(105,111,130)",
              justifyContent: "center",
              borderLeft: "1px solid #eee",
              alignItems: "center",
              flexDirection: "column"
            }}
            onClick={() => this.handlePairedBeers("all")}
          >
            <img src={Beer} style={{ width: "25%", height: "40%" }} />
            All beers
          </div>
          <div
            style={{
              width: "33%",
              height: "100%",
              display: "flex",
              borderLeft: "1px solid #eee",
              color:
                selectedBeerCat == "steak"
                  ? "rgb(73,143,199)"
                  : "rgb(105,111,130)",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2vh",
              flexDirection: "column"
            }}
            onClick={() => this.handlePairedBeers("steak")}
          >
            <img src={Beer} style={{ width: "25%", height: "40%" }} />
            steak beers
          </div>
          <div
            style={{
              width: "33%",
              height: "100%",
              display: "flex",
              color:
                selectedBeerCat == "pizza"
                  ? "rgb(73,143,199)"
                  : "rgb(105,111,130)",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontSize: "2vh"
            }}
            onClick={() => this.handlePairedBeers("pizza")}
          >
            <img src={Beer} style={{ width: "25%", height: "40%" }} />
            pizza beers
          </div>
        </div>
        <div
          style={{
            height: "6%",
            width: "94%",
            margin: "2% auto 2% auto",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div
            style={{
              width: "33%",
              fontSize: "2vh",
              color: "rgb(22,137,197)",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              height: "100%"
            }}
          >
            Discounts
          </div>
          <div
            style={{
              width: "33%",
              fontSize: "2vh",
              color: "rgb(22,137,197)",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              height: "100%"
            }}
          >
            Happy Hours
          </div>
          <div
            style={{
              width: "33%",
              fontSize: "2vh",
              color: "rgb(22,137,197)",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              height: "100%"
            }}
          >
            Promotions
          </div>
        </div>
        {beers == null ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: "54%",
              border: "1px solid #eee",
              borderRadius: "2vh",
              overflow: "scroll"
            }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <ReactLoading
                type={"spin"}
                delay={0.1}
                color={"rgb(54, 120, 255)"}
                height={50}
                width={50}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              height: "54%",
              border: "1px solid #eee",
              borderRadius: "2vh",
              overflow: "scroll"
            }}
          >
            {beers &&
              beers.map((beer, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      this.props.selectBeer(beer);
                      this.setState({ showAddToCart: true });
                    }}
                    style={{
                      height: "45%",
                      borderRadius: "3vh",
                      backgroundColor: "#fff",
                      width: "94%",
                      margin: "0% auto",
                      border: "1px solid #eee",
                      display: "flex",
                      marginTop: "5%",
                      flexDirection: "row"
                    }}
                  >
                    <div style={{ width: "30%", height: "100%" }}>
                      <img
                        src={beer.image_url}
                        style={{
                          width: "100%",
                          height: "100%",
                          marginTop: "5%"
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: "70%",
                        height: "100%",
                        //   border: "1px solid red",
                        display: "flex",
                        paddingLeft: "2.5%",
                        paddingRight: "1.5%",
                        flexDirection: "column"
                      }}
                    >
                      <div
                        style={{
                          height: "25%",
                          display: "flex",
                          color: "rgb(5,5,5)",
                          fontSize: "2.2vh",
                          justifyContent: "flex-start",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {beer.name}
                      </div>
                      <div
                        style={{
                          height: "50%",
                          fontSize: "1.4vh",
                          color: "rgb(203,204,205)",
                          justifyContent: "flex-start",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {beer.description}
                      </div>
                      <div
                        style={{
                          height: "25%",
                          fontSize: "3vh",
                          color: "rgb(52,242,296)",
                          justifyContent: "flex-start",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {beer.abv.toFixed(2)} $
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        <div
          onClick={e => {
            this.setState({ showCartModal: !showCartModal });
            // this.onClickHandle(e);
          }}
          style={{
            height: "9%",
            // animationName: showCartModal == true ? "example" : "",
            // animationDuration: showCartModal == true ? "2s" : "",
            // animation: showCartModal == true ? "pulse 5s infinite" : "",
            // animation:'3s',
            // transition: '3s',
            // animationDuration:'4s',
            display: false == true ? "block" : "none",
            // marginTop: showCartModal == true ? "-25%" : "0%",
            backgroundColor: "rgb(58,61,62)",
            borderTopRightRadius: "3vh",
            borderTopLeftRadius: "3vh",
            flexDirection: "row",
            display: "flex"
          }}
        >
          <div
            style={{
              width: "33%",
              fontSize: "2vh",
              color: "#fff",
              height: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center"
            }}
          >
            Shopping Cart
          </div>
          <div
            style={{
              width: "33%",
              fontSize: "2vh",
              color: "rgb(118,121,122)",
              height: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center"
            }}
          >
            {AsyncCartItems && AsyncCartItems.length} items
          </div>
          <div
            style={{
              width: "33%",
              height: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center"
            }}
          >
            <div
              style={{
                width: "70%",
                height: "60%",
                borderRadius: "1.5vh",
                backgroundColor: "rgb(241,194,61)",
                color: "rgb(73,74,72)",
                fontSize: "2vh",
                justifyContent: "center",
                display: "flex",
                alignItems: "center"
              }}
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selectedBeer: state.Auth.selectedBeer
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  { selectBeer }
)(Beers);
