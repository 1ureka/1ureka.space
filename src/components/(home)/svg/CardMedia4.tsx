import { Box } from "@mui/material";

export default function CardMedia() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: 1,
        height: 1,
        maskImage: "linear-gradient(#000, #0000)",
      }}
    >
      <svg
        width="1061"
        height="937"
        viewBox="0 0 1061 937"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="index-card-media-4-svg"
        style={{ position: "absolute", width: "90%", left: "10%" }}
      >
        <path
          d="M510.158 133.829L673.566 186.924C682.758 189.91 692.631 184.88 695.618 175.688L709.439 133.15C711.572 126.584 718.624 122.991 725.19 125.124L767.728 138.946C774.294 141.079 777.887 148.131 775.754 154.697L531.012 907.934C528.879 914.499 521.827 918.093 515.261 915.959L472.723 902.138C466.158 900.004 462.564 892.952 464.698 886.387L478.519 843.849C481.506 834.657 476.475 824.784 467.283 821.797L303.875 768.703C266.099 756.429 245.228 715.466 257.502 677.691L419.146 180.202C431.42 142.427 472.382 121.555 510.158 133.829ZM367.426 676.75L500.376 719.948C509.568 722.934 519.441 717.904 522.428 708.712L574.266 549.171C579.324 533.605 562.149 520.234 548.298 528.954L363.51 645.297C350.954 653.202 353.315 672.165 367.426 676.75ZM844.238 242.378L1007.65 295.473C1045.42 307.747 1066.29 348.709 1054.02 386.485L892.375 883.974C880.101 921.749 839.139 942.62 801.364 930.347L637.955 877.252C631.389 875.118 627.796 868.067 629.929 861.501L716.405 595.355C720.018 584.236 735.556 583.72 739.899 594.575L817.518 788.582C823.598 803.778 845.352 803.056 850.409 787.489L983.069 379.204C986.056 370.012 981.026 360.139 971.834 357.152L822.691 308.693C816.125 306.56 812.532 299.508 814.665 292.942L828.487 250.404C830.62 243.838 837.672 240.245 844.238 242.378Z"
          strokeWidth="5"
        />
      </svg>
    </Box>
  );
}
