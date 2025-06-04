

function DonutChartSkeleton() {
    return (
        <div
            style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 425
            }}
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
                inset: 0,
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
                    background: "rgb(255, 255, 255)"
                }}
                />
            </div>
            <div
                style={{
                position: "absolute",
                inset: 0,
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
                    background: "rgb(255, 255, 255)"
                }}
                />
            </div>
            <div
                style={{
                position: "absolute",
                inset: 0,
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
                    background: "rgb(255, 255, 255)"
                }}
                />
            </div>
            <div
                style={{
                position: "absolute",
                inset: 0,
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
                    background: "rgb(255, 255, 255)"
                }}
                />
            </div>
            <div
                style={{
                position: "absolute",
                inset: 0,
                margin: "auto",
                width: "35%",
                aspectRatio: 1,
                borderRadius: "50%",
                background: "#FFF"
                }}
            />
            </div>
        </div>

    );
  }
  
  export default DonutChartSkeleton;
  