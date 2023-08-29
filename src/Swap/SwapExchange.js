import { useState } from "react";
import Web3 from "web3";

function SwapExchange() {
  const [left_index, setLeft_index] = useState(0);
  const [right_index, setRight_index] = useState(1);
  const [swap, setSwap] = useState(false);
  const [ava_data] = useState([]);
  const [left, setLeft] = useState(false);
  const [leftContent, setLeftContent] = useState(0);
  const [rightContent, setRightContent] = useState(0);
  const [rate, setRate] = useState(0);
  const data = [
    {
      key: 1,
      name: "TBNB",
      icon: "https://etherscan.io/images/main/empty-token.png",
      id: 0,
      element: "WBNB_data",
      describe: "Wrapped BNB",
      ratio: 1,
      contract: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    },
    {
      key: 2,
      name: "BTCB",
      id: 1,
      element: "BTCB_data",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      describe: "Bitcoin BEP2",
      ratio: 1 / 0.485103,
      contract: "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8",
    },
    {
      key: 3,
      name: "TSP",
      element: "TSP_data",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS76GLWQuV45A8nbFVO4r3KrozwOy6zyh6UfA&usqp=CAU",
      id: 2,
      describe: "TSP",
      ratio: 1,
      contract: "0x63cd42c0fB5593CE13FDF81c10087167332EA13E",
    },
    {
      key: 4,
      name: "WETH",
      id: 3,
      element: "KC2023_data",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
      describe: "Wrapped Ether",
      ratio: 1 / 1.29954,
      contract: "0x1EFf851e51C58A92Cb18e5e8B87bBbC3670A01Bf",
    },
    {
      key: 5,
      name: "DAI",
      element: "DAI_data",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png",
      id: 4,
      describe: "DAI",
      ratio: 1 / 4.87322,
      contract: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867",
    },
    {
      key: 6,
      name: "ETH",
      element: "ETH_data",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      id: 5,
      describe: "Ethereum",
      ratio: 1 / 0.023036,
      contract: "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378",
    },
    {
      key: 7,
      name: "USDC",
      element: "USDC_data",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
      id: 6,
      describe: "USD Coin",
      ratio: 1 / 1.48588,
      contract: "0x64544969ed7ebf5f083679233325356ebe738930",
    },
    {
      key: 8,
      name: "USDT",
      element: "USDT_data",
      icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      id: 7,
      describe: "Tether USD",
      ratio: 1 / 1.2727,
      contract: "0x221c5b1a293aac1187ed3a7d7d2d9ad7fe1f3fb0",
    },
  ]; // static data set of the tokens
  const [trade, setTrade] = useState(false);
  const USD = 64.07 / 0.2664; // price of tbnb to USD static
  const ABI = require("../swap.json"); // abi of the contract used
  const address = "0x9a489505a00cE272eAa5e07Dba6491314CaE3796"; // address of the contract used
  const deadline = 1695000000; // the deadline of the contract

  const TokenAdd = (side) => {
    document.querySelector(".token_added_div").style.transition =
      "visibility 0.25s";
    document.querySelector(".token_added_div").style.visibility = "visible";
    document.querySelector(".center_div").style.transition = "visibility 0.25s";
    document.querySelector(".center_div").style.visibility = "visible";
    side ? setLeft(true) : setLeft(false);
  }; //pop a UI for adding tokens

  function Generate() {
    while (ava_data.length) {
      ava_data.pop();
    }
    for (var i = 0; i < data.length; i++) {
      if (i !== left_index && i !== right_index) {
        ava_data.push(data[i]);
      }
    }
    return ava_data.map((items) => {
      var ratio = items.ratio.toFixed(2);
      return (
        <div className="token_choice_div">
          <button
            id={items.element}
            onClick={() => {
              Close();
              left ? setLeft_index(items.id) : setRight_index(items.id);
            }}
          >
            <div className="button_choice_div">
              <div>
                <div>
                  <img src={items.icon} alt="icon"></img>
                  {items.name} - {items.describe}
                </div>
              </div>
              <div>{data.indexOf(items) ? `Rate: 1 - ${ratio}` : <></>}</div>
            </div>
          </button>
        </div>
      );
    });
  } // Generate the inner token choices

  function Close() {
    document.querySelector(".token_added_div").style.visibility = "hidden";
    document.querySelector(".center_div").style.visibility = "hidden";
  } // Close the UI once user finish changing

  function Generateleft() {
    return (
      <div className="inner_swap">
        <div className="swap_label_div">
          <div>
            <label>{data[left_index].name} Payment</label>
          </div>
          <div>
            <button
              className="change_btn"
              onClick={() => TokenAdd(true)}
            ></button>
          </div>
        </div>
        <div className="swap_exchange_div">
          <div className="exchange">
            <div className="inner_exchange">
              <img
                src={data[left_index].icon}
                height={"30px"}
                width={"30px"}
                alt=""
              ></img>
              {data[left_index].name}
            </div>
            <div>
              <input
                className="inner_input"
                id="left"
                placeholder="0"
                value={leftContent}
                autoComplete="off"
                onChange={(event) => {
                  handleChange(event, true);
                }}
              ></input>
            </div>
          </div>
          <div className="exchange">
            <div>{data[left_index].describe}</div>
            <div>~ ${(USD * leftContent).toFixed(2)} USD</div>
          </div>
        </div>
      </div>
    );
  } // Generate left token div

  function GenerateRight() {
    return (
      <div className="inner_swap">
        <div className="swap_label_div">
          <div>
            <label>{data[right_index].name} Payment</label>
          </div>
          <div>
            <button
              className="change_btn"
              onClick={() => TokenAdd(false)}
            ></button>
          </div>
        </div>
        <div className="swap_exchange_div">
          <div className="exchange">
            <div className="inner_exchange">
              <img
                src={data[right_index].icon}
                height={"30px"}
                width={"30px"}
                alt=""
              ></img>
              {data[right_index].name}
            </div>
            <div>
              <input
                className="inner_input"
                id="right"
                placeholder="0"
                value={rightContent}
                autoComplete="off"
                onChange={(event) => {
                  handleChange(event, false);
                }}
              ></input>
            </div>
          </div>
          <div className="exchange">
            <div>{data[right_index].describe}</div>
            <div>~ ${(USD * leftContent).toFixed(2)} USD</div>
          </div>
        </div>
      </div>
    );
  } // Gnereate right token div

  function Switching() {
    var temp = left_index;
    setLeft_index(right_index);
    setRight_index(temp);
    temp = leftContent;
    setLeftContent(rightContent);
    setRightContent(temp);
  } // switch two tokens div

  async function swaping() {
    const your_acc = localStorage.getItem("acc");
    const web3 = new Web3(window.ethereum);
    const contract_used = new web3.eth.Contract(ABI, address, {
      from: your_acc,
    });
    const swap = contract_used.methods.swapExactTokensForTokens(
      web3.eth.abi.encodeParameter(
        "uint256",
        web3.utils.toWei(leftContent, "ether")
      ),
      web3.eth.abi.encodeParameter("uint256", web3.utils.toWei("0", "ether")),
      [data[left_index].contract, data[right_index].contract],
      your_acc,
      deadline
    );
    await swap
      .send({
        value: web3.eth.abi.encodeParameter(
          "uint256",
          web3.utils.toWei(leftContent, "ether")
        ),
      })
      .then(() => alert("Transition completed!"))
      .catch((err) => alert("Transition failed!"));
  } // Swap function (not yet done)

  function switching() {
    setSwap(!swap);
  } // switch the tokens

  function Trade() {
    !swap
      ? setRate(rightContent / leftContent)
      : setRate(leftContent / rightContent);
    return (
      <div className="trade_info">
        <div className="trade_content">
          <div className="trade_element">
            <div>Max slippage</div>
            <div>
              <select defaultValue={0.5}>
                <option>0.1%</option>
                <option value={0.5}>0.5%</option>
                <option>1%</option>
                <option>1.5%</option>
              </select>
            </div>
          </div>
          <div className="trade_element">
            <div>LP Fee</div>
            <div>Less than $0.0000001</div>
          </div>
          <div className="trade_element">
            <div>Rate</div>
            <div className="trade_rate">
              <div className="left_token">
                <div style={{ marginRight: "5px" }}>1</div>
                <div>
                  {!swap ? (
                    <div>{data[left_index].name}</div>
                  ) : (
                    <div>{data[right_index].name}</div>
                  )}
                </div>
              </div>
              <button>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpimXJzajN4wt4YpHVbFdUTtYFeN8qhi74JQ&usqp=CAU"
                  alt="none"
                  onClick={() => switching()}
                ></img>
              </button>
              <div className="right_token">
                <div style={{ marginRight: "5px" }}>
                  {rate ? rate.toFixed(4) : rate}
                </div>
                <div>
                  {swap ? (
                    <div>{data[left_index].name}</div>
                  ) : (
                    <div>{data[right_index].name}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="trade_element">
            <div>Minimum Receive</div>
            <div className="receiving">
              {!swap ? (
                <>
                  {Math.floor(rightContent)}
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[right_index].icon}
                    alt=""
                  ></img>
                </>
              ) : (
                <>
                  {Math.floor(leftContent)}
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[left_index].icon}
                    alt=""
                  ></img>
                </>
              )}
            </div>
          </div>
          <div className="trade_element">
            <div>Price impact</div>
            <div className="special">
              0.01%
              {!swap ? (
                <>
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[right_index].icon}
                    alt=""
                  ></img>
                </>
              ) : (
                <>
                  <img
                    height={"25px"}
                    style={{ borderRadius: "20px" }}
                    src={data[left_index].icon}
                    alt=""
                  ></img>
                </>
              )}
            </div>
          </div>
          <div className="trade_element">
            <div>Fee</div> <div>$0</div>
          </div>
        </div>
        <div className="trade_details">
          <button
            onClick={() => {
              setTrade(false);
            }}
          >
            <div>&#8592; Trade Details</div>
          </button>
        </div>
      </div>
    );
  } // return the details of the tokens

  function handleChange(event, left) {
    var result;
    if (left) {
      setLeftContent(event.target.value);
      result = (
        document.getElementById("left").value / data[right_index].ratio
      ).toFixed(5);
      setRightContent(result);
    } else {
      setRightContent(event.target.value);
      result = (
        document.getElementById("right").value * data[right_index].ratio
      ).toFixed(5);
      setLeftContent(result);
    }
  } // handle the input change of the amount of the tokens

  return (
    <div className="main_trade">
      {!trade ? (
        <div>
          <div className="swap_label">
            <div className="inner_swap_container">
              <Generateleft></Generateleft>
            </div>
            <div className="convert_div">
              <button className="swap_btn" onClick={() => Switching()}>
                <img
                  title="swap"
                  className="convert"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1svB9Ngre0z1T_L1A13Ncgmc3r1YtE3tVQ&usqp=CAU"
                  alt="converter"
                ></img>
              </button>
            </div>
            <div className="inner_swap_container">
              <GenerateRight></GenerateRight>
            </div>
          </div>
          <div className="outer_trade">
            <div className="Trade">
              <div>
                <button className="confirm_trade_btn" onClick={() => swaping()}>
                  Confirm
                </button>
              </div>
              <div>
                <button
                  className="trade_btn"
                  onClick={() => {
                    setTrade(true);
                  }}
                >
                  Trade Details &#8594;
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Trade></Trade>
      )}
      <div className="center_div">
        <div className="center_inner_div">
          <div>Change Tokens</div>
          <div>
            <button onClick={() => Close()}>X</button>
          </div>
        </div>
        <Generate></Generate>
      </div>
      <div className="token_added_div"></div>
    </div>
  ); //return the two tokens div
}
export default SwapExchange;
