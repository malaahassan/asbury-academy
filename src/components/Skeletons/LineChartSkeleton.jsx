

function LineChartSkeleton() {
    return (
        <div
            style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}
        >
            <div
                className="skeleton-picture"
                style={{
                clipPath:
                    "polygon(0 100%, 0 83%, 18% 75%, 29% 64%, 41% 62%, 51% 71%, 74% 39%, 87% 31%, 100% 49%, 100% 100%)"
                }}
            />
        </div>

    );
  }
  
  export default LineChartSkeleton;
  