export default function houseCards({list}){
    return(
        <div className="card">
              <div className="cards ">
                <span className="house-name">
                  Address: {list[0]}
                </span>
                <div className="">
                  State: {convertState(list[3])}
                </div>
                <div className="">
                  House Number:{" "}
                  {parseInt(list[1]._hex, 16)}
                </div>
                <div className="">
                  Asking Price:{" "}
                  {ethers.utils.formatEther(list[2]) + " ETH"}
                </div>
                <div className="">
                  Owned by: {list[4]}
                </div>
                </div>
                </div>
    );
}