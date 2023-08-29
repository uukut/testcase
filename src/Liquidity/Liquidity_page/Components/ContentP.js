function ContentP() {
  var hasLQT = localStorage.getItem("LQT") || false;
  return hasLQT ? (
    <div className="content">
      <p>You have added liquidity, you can view on BSCscan now!</p>
    </div>
  ) : (
    <div className="content">
      <p>You do not have any liquidity yet, create a one now!</p>
    </div>
  );
} // return the paragraph of the Liquidity

export default ContentP;
