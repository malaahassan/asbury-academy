

function PieChartSkeleton() {
    return (
        <div
            style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
        >
            <div
                className="skeleton-picture"
                style={{ clipPath: "circle(35% at 50% 50%)" }}
            />
            <div
                style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0
                }}
            >
                <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    margin: "auto",
                    width: 3,
                    height: "100%",
                    transform: "rotate(-64deg)"
                }}
                >
                <div
                    style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "50%",
                    background: "#FFF"
                    }}
                />
                </div>
                <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    margin: "auto",
                    width: 3,
                    height: "100%",
                    transform: "rotate(212deg)"
                }}
                >
                <div
                    style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "50%",
                    background: "#FFF"
                    }}
                />
                </div>
                <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    margin: "auto",
                    width: 3,
                    height: "100%",
                    transform: "rotate(57deg)"
                }}
                >
                <div
                    style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "50%",
                    background: "#FFF"
                    }}
                />
                </div>
                <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    margin: "auto",
                    width: 3,
                    height: "100%",
                    transform: "rotate(1deg)"
                }}
                >
                <div
                    style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "50%",
                    background: "#FFF"
                    }}
                />
                </div>
            </div>
            </div>

    );
  }
  
  export default PieChartSkeleton;
  