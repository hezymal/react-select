export const borders = {
    radius: ["5px"],
};

export const colors = {
    grey1: "#eeeeee",
    grey2: "#f3f3f3",
    blue1: "#8383f3",
    violet1: "#8383f3",
    violet2: "#6161cb",
};

export const span = (points: number, offsetInPixels = 0, pointsInPixels = 8) =>
    points * pointsInPixels + offsetInPixels + "px";

export const styles = { borders, colors, span };
